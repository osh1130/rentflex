import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# 加载 .env 文件
load_dotenv()

# 从环境变量中读取数据库 URL
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL, echo=True)

async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

# FastAPI 依赖，用来获取数据库会话
async def get_session():
    async with async_session() as session:
        yield session
