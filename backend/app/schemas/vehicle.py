from pydantic import BaseModel
from typing import Optional

class VehicleBase(BaseModel):
    make: str
    model: str
    year: int
    mileage: int
    available_now: bool
    minimum_rent_period: int
    maximum_rent_period: int
    seats: int
    price_per_day: float

class VehicleCreate(VehicleBase):
    pass

class VehicleOut(VehicleBase):
    id: int

    class Config:
        orm_mode = True
