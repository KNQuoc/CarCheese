from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import customers, sessions
from backend.database import Base, engine
from fastapi.responses import FileResponse
import os


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

@app.get("/files")
def download_file():
    file_path = os.path.join("file", "invoice_INV-00002.pdf")  # Adjust the file path as needed
    return FileResponse(file_path, filename="invoice_INV-00002.pdf")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routers with appropriate prefixes
app.include_router(customers.router, prefix="/api/customers", tags=["Customers"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["Sessions"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}
