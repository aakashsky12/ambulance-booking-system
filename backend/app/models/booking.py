from sqlalchemy import Column, Integer, String, ForeignKey

from app.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    ambulance_id = Column(Integer, ForeignKey("ambulances.id"))

    patient_name = Column(String)
    pickup_location = Column(String)
    destination = Column(String)

    status = Column(String, default="Pending")