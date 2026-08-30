from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.booking import Booking
from app.models.ambulance import Ambulance
from app.auth import get_current_user

router = APIRouter(tags=["Dashboard"])


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    total_bookings = db.query(func.count(Booking.id)).scalar()

    pending_bookings = (
        db.query(func.count(Booking.id))
        .filter(Booking.status == "Pending")
        .scalar()
    )

    completed_bookings = (
        db.query(func.count(Booking.id))
        .filter(Booking.status == "Completed")
        .scalar()
    )

    available_ambulances = (
        db.query(func.count(Ambulance.id))
        .filter(Ambulance.status == "AVAILABLE")
        .scalar()
    )

    busy_ambulances = (
        db.query(func.count(Ambulance.id))
        .filter(Ambulance.status == "BUSY")
        .scalar()
    )

    return {
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "completed_bookings": completed_bookings,
        "available_ambulances": available_ambulances,
        "busy_ambulances": busy_ambulances,
    }