from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.booking import Booking
from app.models.ambulance import Ambulance
from app.models.user import User
from app.schemas.booking import BookingCreate
from app.auth import get_current_user

router = APIRouter()


@router.post("/bookings")
def create_booking(
    booking: BookingCreate,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Find the selected ambulance
    ambulance = db.query(Ambulance).filter(
        Ambulance.id == booking.ambulance_id
    ).first()

    if not ambulance:
        raise HTTPException(
            status_code=404,
            detail="Ambulance not found"
        )

    # Make sure ambulance is available
    print("AMBULANCE STATUS:", ambulance.status)

    # Find logged-in user
    db_user = db.query(User).filter(
        User.email == user["sub"]
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Create booking
    new_booking = Booking(
        user_id=db_user.id,
        ambulance_id=ambulance.id,
        patient_name=booking.patient_name,
        pickup_location=booking.pickup_location,
        destination=booking.destination
    )

    # Mark ambulance as busy
    ambulance.status = "Busy"

    db.add(new_booking)
    db.commit()

    db.refresh(new_booking)
    db.refresh(ambulance)

    return {
        "message": "Booking successful 🚑",
        "booking_id": new_booking.id,
        "ambulance": ambulance.vehicle_number,
        "driver": ambulance.driver_name
    }


@router.get("/bookings")
def get_all_bookings(
    db: Session = Depends(get_db)
):

    bookings = db.query(Booking).all()

    result = []

    for booking in bookings:

        ambulance = db.query(Ambulance).filter(
            Ambulance.id == booking.ambulance_id
        ).first()

        user = db.query(User).filter(
            User.id == booking.user_id
        ).first()

        result.append({
            "id": booking.id,
            "patient_name": booking.patient_name,
            "pickup_location": booking.pickup_location,
            "destination": booking.destination,
            "status": booking.status,
            "ambulance": ambulance.vehicle_number if ambulance else "N/A",
            "user": user.email if user else "N/A"
        })

    return result


@router.put("/bookings/{booking_id}/complete")
def complete_booking(
    booking_id: int,
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    ambulance = db.query(Ambulance).filter(
        Ambulance.id == booking.ambulance_id
    ).first()

    if not ambulance:
        raise HTTPException(
            status_code=404,
            detail="Ambulance not found"
        )

    booking.status = "Completed"
    ambulance.status = "Available"

    db.commit()
    db.refresh(booking)
    db.refresh(ambulance)

    return {
        "message": "Booking completed successfully ✅"
    }