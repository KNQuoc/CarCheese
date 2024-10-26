from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db
from typing import List, Optional

router = APIRouter()

@router.get("/customer/{customer_id}", response_model=List[schemas.DrivingSession])
def get_customer_sessions(customer_id: int, db: Session = Depends(get_db)):
    return crud.get_customer_sessions(db, customer_id=customer_id)

@router.post("/", response_model=schemas.DrivingSession)
def create_driving_session(session: schemas.DrivingSessionCreate, db: Session = Depends(get_db)):
    return crud.create_driving_session(db, session=session)
