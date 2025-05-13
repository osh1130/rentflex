from pydantic import BaseModel

class CarCreate(BaseModel):
    brand: str
    model: str
    year: int

class CarRead(CarCreate):
    id: int

    class Config:
        orm_mode = True