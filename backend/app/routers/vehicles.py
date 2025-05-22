from fastapi import APIRouter, Depends
from typing import List
from app.schemas.vehicle import VehicleOut
from app.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import Vehicle
from sqlalchemy.future import select

router = APIRouter()

@router.get("/vehicles", response_model=List[VehicleOut])
async def read_vehicles(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Vehicle))
    vehicles = result.scalars().all()
    return vehicles
