from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import vehicles, auth ,booking, admin_booking, admin_vehicles


app = FastAPI()

# 添加CORS中间件，允许前端开发端口访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 在应用启动时自动创建数据库表结构（如果不存在）
# 注意：这种方法适合开发环境，生产环境建议使用Alembic管理数据库迁移
# 数据填充通过docker-compose中的init.sql完成
@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth.router, prefix="/api")
app.include_router(vehicles.router, prefix="/api")
app.include_router(vehicles.router, prefix="/api")
app.include_router(admin_vehicles.router, prefix="/api")
app.include_router(booking.router, prefix="/api")
app.include_router(admin_booking.router, prefix="/api")

