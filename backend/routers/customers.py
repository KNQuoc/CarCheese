from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import SessionLocal, get_db

router = APIRouter()

@router.post("/", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    return crud.create_customer(db, customer=customer)

@router.get("/", response_model=List[schemas.Customer])
def read_customers(search: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.get_customers(db, search=search)
