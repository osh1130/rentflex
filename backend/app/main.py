from fastapi import FastAPI
from app.database import engine, Base
from app.routers import vehicles, auth ,booking


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth.router, prefix="/api")
app.include_router(vehicles.router, prefix="/api")
app.include_router(booking.router, prefix="/api")

