# backend/routers/sessions.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db
from typing import List

router = APIRouter()

@router.get("/customer/{customer_id}", response_model=List[schemas.DrivingSession])
def get_customer_sessions(customer_id: int, db: Session = Depends(get_db)):
    sessions = crud.get_customer_sessions(db, customer_id=customer_id)
    if sessions is None:
        raise HTTPException(status_code=404, detail="Sessions not found")
    return sessions

@router.post("/", response_model=schemas.DrivingSession)
def create_driving_session(session: schemas.DrivingSessionCreate, db: Session = Depends(get_db)):
    return crud.create_driving_session(db, session=session)

