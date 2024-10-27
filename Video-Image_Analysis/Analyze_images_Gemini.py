import streamlit as st
import os
from PIL import Image
import google.generativeai as genai

# Configure the Google API key and the Gemini model
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'driver-activity-detection-1dd70de47ef9.json'

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Function to get response from Gemini model
def get_gemini_response(prompt, image_data, additional_text):
    response = model.generate_content([prompt, image_data[0], additional_text])
    return response.text

# Function to prepare image data for the API call
def input_image_setup(uploaded_file):
    bytes_data = uploaded_file.getvalue()
    image_parts = [
        {
            "mime_type": uploaded_file.type,
            "data": bytes_data
        }
    ]
    return image_parts

# Streamlit page configuration
st.set_page_config(page_title="Driver Distraction Detection", layout="wide")
st.title("Driver Distraction Detection - Image Analysis")

# Input prompt for the AI model
input_prompt = """
You are an expert in analyzing pictures. We will upload an image of a driver in a car, and you will need to determine which category among below the driver belongs to.
Category 1- Safe driving, Points = 0
Category 2- Texting, Points = +3
Category 3 - Talking on the phone without bluetooth, Points = +3
Category 4- operating the radio, Points = +0.5
Category 5 - drinking, Points = +4
Category 6- Moving around/turning back, Points = +5
Category 8 - Talking to passenger, Points = +2
Format of the output should be "Category {} -{}, Points={}". Nothing else.
"""
input_text = "Tell me what the person is doing in the image."

# Allow multiple image uploads
uploaded_files = st.file_uploader("Choose images...", type=["jpg", "jpeg", "png"], accept_multiple_files=True)

# Display results only if files have been uploaded
if uploaded_files:
    for uploaded_file in uploaded_files:
        # Split layout into two columns
        col1, col2 = st.columns([1, 1])

        # Display the image in the left column
        with col1:
            image = Image.open(uploaded_file)
            st.image(image, caption=f"Uploaded Image: {uploaded_file.name}", use_column_width=True)

        # Process image data and display the result in the right column
        with col2:
            try:
                # Prepare image data and analyze it
                image_data = input_image_setup(uploaded_file)
                response = get_gemini_response(input_prompt, image_data, input_text)
                
                # Display the response in bold
                st.markdown(f"Analysis for {uploaded_file.name}:")
                #st.markdown(f"**{response}**")
                st.markdown(f"""
                <div class="response-box">
                    {f"*{response}*"}
                </div>
                """, unsafe_allow_html=True)

            except FileNotFoundError:
                st.write(f"File not found: {uploaded_file.name}")
else:
    st.write("Please upload images to analyze.")
