from pydantic import BaseModel


class AmbulanceCreate(BaseModel):
    vehicle_number: str
    driver_name: str
    driver_phone: str
    status: str
    