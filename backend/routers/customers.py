from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db
from typing import List, Optional
import os
from fastapi.responses import FileResponse

router = APIRouter()

SHARED_FILE_PATH = os.path.join(os.path.dirname(__file__), "invoice_INV-00002.pdf")

@router.get("/", response_model=List[schemas.Customer])
def get_customers(db: Session = Depends(get_db), search: Optional[str] = None):
    return crud.get_customers(db, search=search)

@router.get("/{customer_id}", response_model=List[schemas.DrivingSession])
def get_customer_sessions(customer_id: int, db: Session = Depends(get_db)):
    sessions = crud.get_customer_sessions(db, customer_id=customer_id)
    if sessions is None:
        raise HTTPException(status_code=404, detail="Sessions not found")
    return sessions

@router.post("/", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db, customer=customer)

@router.put("/{customer_id}", response_model=schemas.Customer)
def update_customer(customer_id: int, updated_data: schemas.CustomerUpdate, db: Session = Depends(get_db)):
    db_customer = crud.get_customer(db, customer_id=customer_id)
    if db_customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return crud.update_customer(db, customer_id=customer_id, updated_data=updated_data)

@router.get("/customer/{customer_id}", response_model=List[schemas.DrivingSession])
def get_customer_sessions(customer_id: int, db: Session = Depends(get_db)):
    sessions = crud.get_customer_sessions(db, customer_id=customer_id)
    if sessions is None:
        raise HTTPException(status_code=404, detail="Sessions not found")
    return sessions
