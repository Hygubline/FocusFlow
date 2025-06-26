from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Create the async engine
engine = create_async_engine(
    settings.POSTGRES_DSN,
    echo=True,
)

# Create a configured "AsyncSession" class
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Dependency
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session