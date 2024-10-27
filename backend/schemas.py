from pydantic import BaseModel, Field
from typing import Optional, List

class ContactInfo(BaseModel):
    email: str
    phone: str
    address: str
    
    class Config:
        alias_generator = lambda string: ''.join(
            word.capitalize() if i else word
            for i, word in enumerate(string.split('_'))
        )
        populate_by_name = True  # Updated for Pydantic v2

class DrivingSessionBase(BaseModel):
    driverScore: int = Field(alias='driver_score')
    status: str

    class Config:
        populate_by_name = True  # Updated for Pydantic v2

class DrivingSessionCreate(DrivingSessionBase):
    customerId: int = Field(alias='customer_id')  # Foreign key to link session to a specific customer

    class Config:
        populate_by_name = True  # Updated for Pydantic v2

class DrivingSession(DrivingSessionBase):
    id: int
    customerId: int = Field(alias='customer_id')

    class Config:
        from_attributes = True  # Updated for Pydantic v2
        populate_by_name = True

class CustomerBase(BaseModel):
    name: str
    age: int
    contactInfo: ContactInfo = Field(alias='contact_info')

    class Config:
        populate_by_name = True  # Updated for Pydantic v2

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    contactInfo: Optional[ContactInfo] = Field(alias='contact_info', default=None)

    class Config:
        populate_by_name = True  # Updated for Pydantic v2

class Customer(CustomerBase):
    id: int
    drivingSessions: List[DrivingSession] = Field(alias='driving_sessions', default_factory=list)

    class Config:
        from_attributes = True  # Updated for Pydantic v2
        populate_by_name = True

class ContactInfo(BaseModel):
    email: str
    phone: str
    address: str

class Customer(BaseModel):
    id: int
    name: str
    age: int
    contactInfo: ContactInfo  # Ensure this is correctly set

    class Config:
        orm_mode = True

