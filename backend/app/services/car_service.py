from backend.app.models import Car
from backend.app.schemas.user import CarCreate
from sqlalchemy.orm import Session

class CarService:
    def __init__(self, db: Session):
        self.db = db

    def create_car(self, car_data: CarCreate):
        new_car = Car(**car_data.dict())
        self.db.add(new_car)
        self.db.commit()
        self.db.refresh(new_car)
        return new_car

    def list_cars(self):
        return self.db.query(Car).all()