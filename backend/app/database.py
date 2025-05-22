from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# 替换用户名密码及数据库名
DATABASE_URL = "mysql+aiomysql://root:Ohsehun19981130!@localhost:3306/rentflexdb"

engine = create_async_engine(DATABASE_URL, echo=True)

async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

# FastAPI 依赖，用来获取数据库会话
async def get_session():
    async with async_session() as session:
        yield session
