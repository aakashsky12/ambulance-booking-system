from pydantic import BaseModel


class BookingCreate(BaseModel):
    patient_name: str
    pickup_location: str
    destination: str
    ambulance_id: int