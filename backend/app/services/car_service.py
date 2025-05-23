from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..models import Vehicle
from ..schemas.vehicle import VehicleCreate, VehicleUpdate

async def get_available_vehicles(session: AsyncSession, start_date, end_date):
    # 计算租期天数
    days = (end_date - start_date).days

    # 查询当前可用的车辆
    result = await session.execute(
        select(Vehicle).where(Vehicle.available_now == True)
    )
    vehicles = result.scalars().all()

    # 过滤可租天数范围
    available_vehicles = [
        v for v in vehicles
        if v.minimum_rent_period <= days <= v.maximum_rent_period
    ]
    return available_vehicles

async def get_vehicle_by_id(session: AsyncSession, vehicle_id: int):
    result = await session.execute(select(Vehicle).where(Vehicle.id == vehicle_id))
    return result.scalar_one_or_none()


async def get_all_vehicles(session: AsyncSession):
    result = await session.execute(select(Vehicle))
    return result.scalars().all()

async def create_vehicle(session: AsyncSession, vehicle: VehicleCreate):
    db_vehicle = Vehicle(
        make=vehicle.make,
        model=vehicle.model,
        year=vehicle.year,
        mileage=vehicle.mileage,
        available_now=vehicle.available_now,
        minimum_rent_period=vehicle.minimum_rent_period,
        maximum_rent_period=vehicle.maximum_rent_period,
        seats=vehicle.seats,
        price_per_day=vehicle.price_per_day,
        image_url=vehicle.image_url,
    )
    session.add(db_vehicle)
    await session.commit()
    await session.refresh(db_vehicle)
    return db_vehicle

async def update_vehicle(session: AsyncSession, vehicle_id: int, vehicle_update: VehicleUpdate):
    result = await session.execute(
        select(Vehicle).where(Vehicle.id == vehicle_id)
    )
    db_vehicle = result.scalar_one_or_none()
    if not db_vehicle:
        return None
    for field, value in vehicle_update.dict(exclude_unset=True).items():
        setattr(db_vehicle, field, value)
    await session.commit()
    await session.refresh(db_vehicle)
    return db_vehicle

async def delete_vehicle(session: AsyncSession, vehicle_id: int):
    result = await session.execute(
        select(Vehicle).where(Vehicle.id == vehicle_id)
    )
    db_vehicle = result.scalar_one_or_none()
    if not db_vehicle:
        return None
    await session.delete(db_vehicle)
    await session.commit()
    return db_vehicle
