from fastapi import FastAPI
from controllers.car_controller import CarController
from database import engine, Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

car_controller = CarController()
app.include_router(car_controller.router, prefix="/api")