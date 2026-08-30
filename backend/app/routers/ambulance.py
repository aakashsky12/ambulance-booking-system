from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.ambulance import Ambulance
from app.schemas.ambulance import AmbulanceCreate

router = APIRouter()


@router.post("/ambulances")
def add_ambulance(ambulance: AmbulanceCreate, db: Session = Depends(get_db)):

    new_ambulance = Ambulance(
        vehicle_number=ambulance.vehicle_number,
        driver_name=ambulance.driver_name,
        driver_phone=ambulance.driver_phone,
        status=ambulance.status
    )

    db.add(new_ambulance)
    db.commit()
    db.refresh(new_ambulance)

    return {
        "message": "Ambulance added successfully 🚑",
        "id": new_ambulance.id
    }

@router.get("/ambulances")
def get_all_ambulances(db: Session = Depends(get_db)):
    ambulances = db.query(Ambulance).all()

    return ambulances