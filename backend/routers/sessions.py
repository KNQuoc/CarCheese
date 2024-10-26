from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import SessionLocal, get_db

router = APIRouter()

@router.post("/", response_model=schemas.DrivingSessionBase)
def create_driving_session(session: schemas.DrivingSessionCreate, db: Session = Depends(get_db)):
    return crud.create_driving_session(db, session=session)

@router.get("/customer/{customer_id}", response_model=List[schemas.DrivingSessionBase])
def get_customer_sessions(customer_id: int, db: Session = Depends(get_db)):
    return crud.get_customer_sessions(db, customer_id=customer_id)
