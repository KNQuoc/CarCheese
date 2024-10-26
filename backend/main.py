from fastapi import FastAPI
from .routers import customers, sessions
from .database import engine, Base

# Initialize FastAPI app
app = FastAPI()

# Include routers
app.include_router(customers.router, prefix="/customers", tags=["Customers"])
app.include_router(sessions.router, prefix="/sessions", tags=["Driving Sessions"])

# Optional database setup if using migrations
Base.metadata.create_all(bind=engine)
