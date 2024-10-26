from sqlalchemy.orm import Session
from . import models, schemas
from typing import Optional

def get_customers(db: Session, search: Optional[str] = None):
    query = db.query(models.Customer)
    if search:
        query = query.filter(models.Customer.name.ilike(f"%{search}%"))
    return query.all()

def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()

def create_customer(db: Session, customer: schemas.CustomerCreate):
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
    return db_customer

def update_customer(db: Session, customer_id: int, updated_data: schemas.CustomerUpdate):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        return None  # Return None if customer not found
    
    # Update customer fields if provided
    if updated_data.name is not None:
        db_customer.name = updated_data.name
    if updated_data.age is not None:
        db_customer.age = updated_data.age
    if updated_data.contactInfo:
        db_customer.contact_info_email = updated_data.contactInfo.email
        db_customer.contact_info_phone = updated_data.contactInfo.phone
        db_customer.contact_info_address = updated_data.contactInfo.address

    db.commit()
    db.refresh(db_customer)
    return db_customer
