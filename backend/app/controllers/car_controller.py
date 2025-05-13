from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.car_schema import CarCreate, CarRead
from services.car_service import CarService

class CarController:
    def __init__(self):
        self.router = APIRouter()
        self.router.post("/cars", response_model=CarRead)(self.create_car)
        self.router.get("/cars", response_model=list[CarRead])(self.get_cars)

    def create_car(self, car: CarCreate, db: Session = Depends(get_db)):
        return CarService(db).create_car(car)

    def get_cars(self, db: Session = Depends(get_db)):
        return CarService(db).list_cars()