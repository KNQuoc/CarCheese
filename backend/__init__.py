from fastapi import FastAPI
from .routers import customers_router, sessions_router  # Import from `routers/__init__.py`

app = FastAPI()

# Include routers
app.include_router(customers_router, prefix="/customers", tags=["Customers"])
app.include_router(sessions_router, prefix="/sessions", tags=["Driving Sessions"])
