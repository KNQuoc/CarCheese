import os
import re
import cv2
import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()  
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/nithyasreekusakula/Documents/Driver Distraction Detection System/driver-activity-detection-1dd70de47ef9.json'

# Initialize Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Define category descriptions
category_descriptions = {
    "1": "Category 1 - Safe driving",
    "2": "Category 2 - Texting",
    "3": "Category 3 - Talking on the phone",
    "4": "Category 4 - Operating the radio",
    "5": "Category 5 - Drinking",
    "6": "Category 6 - Reaching behind/Moving around",
    "7": "Category 7 - Hair and makeup",
    "8": "Category 8 - Talking to passenger"
}

# Function to get response from Gemini model
def get_gemini_response(prompt, image_data, additional_text):
    response = model.generate_content([prompt, image_data[0], additional_text])
    return response.text

# Function to set up frame data for API call
def input_frame_setup(frame):
    # Convert the frame to bytes
    _, buffer = cv2.imencode(".jpg", frame)
    bytes_data = buffer.tobytes()
    image_parts = [{"mime_type": "image/jpeg", "data": bytes_data}]
    return image_parts

# Streamlit page configuration
st.set_page_config(page_title="Driver Distraction Detection - Video Analysis")
st.header("Driver Distraction Detection - Video Analysis")

# Input prompt for analysis
input_prompt = """
You are an expert in analyzing pictures. We will upload an image of a driver in a car, and you will need to determine which category among below the driver belongs to.
category 1- safe driving
category 2- texting 
category 3 - talking on the phone 
category 4 - operating the radio
category 5 - drinking
category 6 - reaching behind
category 7 - hair and makeup
category 8 - talking to passenger
Format of the output should be category {} -{}. Nothing else.
"""
input_text = "Tell me what the person is doing in the image"

# Upload video
uploaded_video = st.file_uploader("Upload a video", type=["mp4", "avi", "mov"])

# Display video
if uploaded_video:
    st.video(uploaded_video)

    # Save the uploaded video to a temporary location
    video_path = "/tmp/uploaded_video.mp4"
    with open(video_path, "wb") as f:
        f.write(uploaded_video.getbuffer())

    # Initialize video capture and variables for results
    cap = cv2.VideoCapture(video_path)
    frame_rate = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(frame_rate)  # Process every second
    frame_count = 0
    results = []

    # Regular expression to extract category number
    category_pattern = re.compile(r"category (\d)")

    # Loop through video frames
    while cap.isOpened():
        ret, frame = cap.read()
        
        if not ret:
            break

        # Process every nth frame
        if frame_count % frame_interval == 0:
            # Prepare the frame for analysis
            frame_data = input_frame_setup(frame)
            
            # Get response from the model and append to results list
            response = get_gemini_response(input_prompt, frame_data, input_text)
            match = category_pattern.search(response.lower())
            
            if match:
                category_number = match.group(1)
                full_description = category_descriptions.get(category_number, f"Unknown category {category_number}")
                
                # Add to results if category is valid
                results.append(full_description)
        
        frame_count += 1

    cap.release()

    # Aggregate results (count each category)
    summary = {}
    for result in results:
        summary[result] = summary.get(result, 0) + 1

    # Display the most frequent category and a breakdown of detections
    st.subheader("Summary of Driver Behavior for Entire Video:")
    
    if summary:
        most_frequent_category = max(summary, key=summary.get)
        st.write(f"Most frequent detected behavior: **{most_frequent_category}**")

        st.write("Breakdown of detections across the video:")
        for category, count in summary.items():
            st.write(f"{category}: {count} times")
    else:
        st.write("No valid categories detected.")
else:
    st.write("Please upload a video to analyze.")
