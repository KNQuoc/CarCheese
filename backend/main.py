from fastapi import FastAPI
from backend.routers import customers_router, sessions_router  # Ensure the paths are correct
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers for customers and sessions
app.include_router(customers_router, prefix="/customers", tags=["Customers"])
app.include_router(sessions_router, prefix="/sessions", tags=["Driving Sessions"])

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}
