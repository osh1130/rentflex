from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound
from fastapi import HTTPException, status
from ..models import Booking, Vehicle, BookingStatus
from ..schemas.booking import BookingCreate, BookingOut
from sqlalchemy.orm import selectinload

async def create_booking(session: AsyncSession, user_id: int, booking_in: BookingCreate):
    # 检查车辆是否存在且可用
    vehicle = await session.get(Vehicle, booking_in.vehicle_id)
    if not vehicle or not vehicle.available_now:
        raise HTTPException(status_code=400, detail="Invalid input or unavailable vehicle")

    # 检查时间逻辑
    if booking_in.end_date < booking_in.start_date:
        raise HTTPException(status_code=400, detail="End date must be after start date")

    # 检查时间冲突
    query = select(Booking).where(
        Booking.vehicle_id == booking_in.vehicle_id,
        Booking.status.in_([BookingStatus.pending, BookingStatus.approved]),
        Booking.end_date >= booking_in.start_date,
        Booking.start_date <= booking_in.end_date
    )

    result = await session.execute(query)
    conflict = result.scalars().first()
    if conflict:
        raise HTTPException(status_code=400, detail="Vehicle is already booked for the selected dates")
    # 创建
    booking = Booking(
        user_id=user_id,
        vehicle_id=booking_in.vehicle_id,
        start_date=booking_in.start_date,
        end_date=booking_in.end_date,
        status=BookingStatus.pending,
    )
    session.add(booking)
    await session.commit()
    await session.refresh(booking)
    result = await session.execute(
        select(Booking)
        .options(
            selectinload(Booking.vehicle),
            selectinload(Booking.user)
        )
        .where(Booking.id == booking.id)
    )
    booking_full = result.scalar_one()
    return BookingOut.model_validate(booking_full)

async def get_user_bookings(session: AsyncSession, user_id: int):
    result = await session.execute(
        select(Booking)
        .options(
            selectinload(Booking.vehicle),
            selectinload(Booking.user)
        )
        .where(Booking.user_id == user_id))
    bookings = result.scalars().all()
    return [BookingOut.model_validate(b) for b in bookings]

async def cancel_booking(session: AsyncSession, user_id: int, booking_id: int):
    booking = await session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.user_id != user_id:
        raise HTTPException(status_code=403, detail="Forbidden, not owner or not cancellable")
    if booking.status not in [BookingStatus.pending, BookingStatus.approved]:
        raise HTTPException(status_code=403, detail="Booking cannot be cancelled")
    booking.status = BookingStatus.cancelled
    await session.commit()
