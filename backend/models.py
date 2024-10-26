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
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)
    driving_sessions = relationship("DrivingSession", back_populates="customer")

class DrivingSession(Base):
    __tablename__ = "driving_sessions"
    session_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    driver_score = Column(Float, default=50)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    customer = relationship("Customer", back_populates="driving_sessions")
