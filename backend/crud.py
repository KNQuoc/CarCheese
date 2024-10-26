# crud.py
from sqlalchemy.orm import Session
from . import models, schemas

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
