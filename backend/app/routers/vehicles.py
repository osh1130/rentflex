from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from ..schemas import vehicle as vehicle_schema
from ..services import car_service
from ..database import get_session
from ..utils import get_admin_user


router = APIRouter(
    tags=["Vehicles"]
)

# 用户接口 - 按租期筛选可用车辆
@router.get("/vehicles", response_model=list[vehicle_schema.Vehicle])
async def get_vehicles(
    start: str = Query(..., description="Start date", example="2024-06-01"),
    end: str = Query(..., description="End date", example="2024-06-10"),
    session: AsyncSession = Depends(get_session)
):
    return await car_service.get_available_vehicles(session, start, end)

# 管理员接口
@router.get("/admin/vehicles", response_model=list[vehicle_schema.Vehicle], dependencies=[Depends(get_admin_user)])
async def admin_get_all_vehicles(session: AsyncSession = Depends(get_session)):
    return await car_service.get_all_vehicles(session)

@router.post("/admin/vehicles", response_model=vehicle_schema.Vehicle, status_code=201, dependencies=[Depends(get_admin_user)])
async def admin_add_vehicle(vehicle: vehicle_schema.VehicleCreate, session: AsyncSession = Depends(get_session)):
    return await car_service.create_vehicle(session, vehicle)

@router.put("/admin/vehicles/{id}", response_model=vehicle_schema.Vehicle, dependencies=[Depends(get_admin_user)])
async def admin_update_vehicle(id: int, vehicle: vehicle_schema.VehicleUpdate, session: AsyncSession = Depends(get_session)):
    db_vehicle = await car_service.update_vehicle(session, id, vehicle)
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

@router.delete("/admin/vehicles/{id}", status_code=204, dependencies=[Depends(get_admin_user)])
async def admin_delete_vehicle(id: int, session: AsyncSession = Depends(get_session)):
    db_vehicle = await car_service.delete_vehicle(session, id)
    if not db_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return None
