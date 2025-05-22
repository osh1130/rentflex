from pydantic import BaseModel

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
    image_url: str 

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    make: str | None = None
    model: str | None = None
    year: int | None = None
    mileage: int | None = None
    available_now: bool | None = None
    minimum_rent_period: int | None = None
    maximum_rent_period: int | None = None
    seats: int | None = None
    price_per_day: float | None = None
    image_url: str | None = None

class Vehicle(VehicleBase):
    id: int

    class Config:
        orm_mode = True
