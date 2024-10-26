from sqlalchemy import Column, Integer, String, ForeignKey, Float, Enum
from sqlalchemy.orm import relationship
from .database import Base
from enum import Enum as PyEnum

class StatusEnum(PyEnum):
    APPROVED = "Approved"
    DENIED = "Denied"
    PENDING = "Pending"

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    # Contact info columns
    contact_info_email = Column(String, unique=True, nullable=False)
    contact_info_phone = Column(String, nullable=False)
    contact_info_address = Column(String, nullable=False)
    
    # Relationship
    driving_sessions = relationship("DrivingSession", back_populates="customer")

class DrivingSession(Base):
    __tablename__ = "driving_sessions"

    id = Column(Integer, primary_key=True, index=True)  # Changed from session_id to id
    customer_id = Column(Integer, ForeignKey("customers.id"))
    driver_score = Column(Float, default=50)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    
    # Relationship
    customer = relationship("Customer", back_populates="driving_sessions")