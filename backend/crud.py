# backend/crud.py
from typing import List, Optional
from sqlalchemy.orm import Session
from . import models, schemas

# Get all customers with optional search
def get_customers(db: Session, search: Optional[str] = None) -> List[schemas.Customer]:
    query = db.query(models.Customer)
    if search:
        query = query.filter(models.Customer.name.ilike(f"%{search}%"))
    return [
        schemas.Customer(
            id=customer.id,
            name=customer.name,
            age=customer.age,
            contactInfo=schemas.ContactInfo(
                email=customer.contact_info_email,
                phone=customer.contact_info_phone,
                address=customer.contact_info_address,
            ),
            drivingSessions=[
                schemas.DrivingSession(
                    id=session.id,
                    customerId=session.customer_id,
                    driverScore=session.driver_score,
                    status=session.status,
                ) for session in customer.driving_sessions
            ]
        )
        for customer in query.all()
    ]

# Create a new customer
def create_customer(db: Session, customer: schemas.CustomerCreate) -> schemas.Customer:
    db_customer = models.Customer(
        name=customer.name,
        age=customer.age,
        contact_info_email=customer.contactInfo.email,
        contact_info_phone=customer.contactInfo.phone,
        contact_info_address=customer.contactInfo.address,
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return schemas.Customer(
        id=db_customer.id,
        name=db_customer.name,
        age=db_customer.age,
        contactInfo=schemas.ContactInfo(
            email=db_customer.contact_info_email,
            phone=db_customer.contact_info_phone,
            address=db_customer.contact_info_address,
        ),
        drivingSessions=[]
    )

# Update an existing customer
def update_customer(db: Session, customer_id: int, updated_data: schemas.CustomerUpdate) -> Optional[schemas.Customer]:
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        return None  # Return None if customer not found

    # Update basic fields if provided
    if updated_data.name is not None:
        db_customer.name = updated_data.name
    if updated_data.age is not None:
        db_customer.age = updated_data.age

    # Update contact info fields if provided
    if updated_data.contactInfo:
        if updated_data.contactInfo.email:
            db_customer.contact_info_email = updated_data.contactInfo.email
        if updated_data.contactInfo.phone:
            db_customer.contact_info_phone = updated_data.contactInfo.phone
        if updated_data.contactInfo.address:
            db_customer.contact_info_address = updated_data.contactInfo.address

    db.commit()
    db.refresh(db_customer)

    # Return the updated customer as a schemas.Customer object
    return schemas.Customer(
        id=db_customer.id,
        name=db_customer.name,
        age=db_customer.age,
        contactInfo=schemas.ContactInfo(
            email=db_customer.contact_info_email,
            phone=db_customer.contact_info_phone,
            address=db_customer.contact_info_address,
        ),
        drivingSessions=[
            schemas.DrivingSession(
                id=session.id,
                customerId=session.customer_id,
                driverScore=session.driver_score,
                status=session.status,
            ) for session in db_customer.driving_sessions
        ]
    )

def create_driving_session(db: Session, session: schemas.DrivingSessionCreate):
    db_session = models.DrivingSession(
        customer_id=session.customerId,
        driver_score=session.driverScore,
        status=session.status
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

def get_customer_sessions(db: Session, customer_id: int):
    return db.query(models.DrivingSession).filter(models.DrivingSession.customer_id == customer_id).all()