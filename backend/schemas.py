from pydantic import BaseModel
from typing import List, Optional
from .models import StatusEnum

class DrivingSessionBase(BaseModel):
    driver_score: float
    status: StatusEnum

class DrivingSessionCreate(DrivingSessionBase):
    customer_id: int

class CustomerBase(BaseModel):
    name: str
    age: int
    email: str
    phone: str
    address: str

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    driving_sessions: List[DrivingSessionBase] = []
    class Config:
        orm_mode = True
