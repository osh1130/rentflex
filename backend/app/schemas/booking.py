# backend/app/schemas/booking.py

from pydantic import BaseModel
from datetime import date
import enum
from typing import Optional
from app.schemas.user import UserOut
from app.schemas.vehicle import VehicleOut

class BookingStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"

class BookingBase(BaseModel):
    start_date: date
    end_date: date
    status: BookingStatus = BookingStatus.pending

class BookingCreate(BookingBase):
    user_id: int
    vehicle_id: int

class BookingOut(BookingBase):
    id: int
    user: UserOut
    vehicle: VehicleOut

    class Config:
        orm_mode = True
