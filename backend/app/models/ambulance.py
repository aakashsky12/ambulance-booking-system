from sqlalchemy import Column, Integer, String

from app.database import Base


class Ambulance(Base):
    __tablename__ = "ambulances"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_number = Column(String, unique=True)
    driver_name = Column(String)
    driver_phone = Column(String)
    status = Column(String, default="Available")