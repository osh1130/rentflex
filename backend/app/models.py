from sqlalchemy import Column, Integer, String, Boolean, Float, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum

class UserRole(enum.Enum):
    admin = "admin"
    customer = "customer"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.customer)
    blocked = Column(Boolean, default=False)

    bookings = relationship("Booking", back_populates="user")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    make = Column(String(100), nullable=False)
    model = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
    mileage = Column(Integer, nullable=False)
    available_now = Column(Boolean, default=True)
    minimum_rent_period = Column(Integer, nullable=False)
    maximum_rent_period = Column(Integer, nullable=False)
    seats = Column(Integer, nullable=False)
    price_per_day = Column(Float, nullable=False)

    bookings = relationship("Booking", back_populates="vehicle")

class BookingStatus(enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(Enum(BookingStatus), default=BookingStatus.pending)

    user = relationship("User", back_populates="bookings")
    vehicle = relationship("Vehicle", back_populates="bookings")
