from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import date
from enum import Enum

from ..schemas.user import UserResponse 
from ..schemas.vehicle import Vehicle

class BookingStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"

class BookingCreate(BaseModel):
    vehicle_id: int = Field(..., gt=0, description="ID of the vehicle to book")
    start_date: date = Field(..., description="Start date of the booking")
    end_date: date = Field(..., description="End date of the booking")

    @field_validator("end_date")
    @classmethod
    def validate_dates(cls, v, info):
        start = info.data.get("start_date")
        if start and v < start:
            raise ValueError("end_date must be after start_date")
        return v

    class Config:
        from_attributes = True

class BookingOut(BaseModel):
    id: int
    vehicle: Optional[Vehicle]
    user: Optional[UserResponse]
    start_date: date
    end_date: date
    status: BookingStatus

    class Config:
        from_attributes = True

