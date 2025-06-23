from sqlalchemy.future import select
from sqlalchemy import update, delete
from app.db.models import Task
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

async def create_task(db: AsyncSession, title: str, description: Optional[str] = None) -> Task:
    new_task = Task(title=title, description=description)
    db.add(new_task)
    await db.commit()
    await db.refresh(new_task)
    return new_task

async def get_task(db: AsyncSession, task_id: int) -> Optional[Task]:
    result = await db.execute(select(Task).where(Task.id == task_id))
    return result.scalars().first()

async def list_tasks(db: AsyncSession) -> List[Task]:
    result = await db.execute(select(Task))
    return result.scalars().all()

async def update_task(db: AsyncSession, task_id: int, **fields) -> Optional[Task]:
    await db.execute(
        update(Task)
        .where(Task.id == task_id)
        .values(**fields)
    )
    await db.commit()
    return await get_task(db, task_id)

async def delete_task(db: AsyncSession, task_id: int) -> None:
    await db.execute(delete(Task).where(Task.id == task_id))
    await db.commit()