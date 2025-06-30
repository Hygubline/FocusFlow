from fastapi import APIRouter, HTTPException
from typing import List
from app.db.models import Task, TaskCreate, TaskUpdate
from app.db.crud import create_task, get_task, list_tasks, update_task, delete_task

router = APIRouter()

@router.post("/", response_model=Task)
async def create_new_task(task: TaskCreate):
    return await create_task(title=task.title, description=task.description or "")

@router.get("/", response_model=List[Task])
async def get_all_tasks():
    return await list_tasks()

@router.get("/{task_id}", response_model=Task)
async def get_single_task(task_id: str):
    task = await get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=Task)
async def update_existing_task(task_id: str, task_update: TaskUpdate):
    task = await update_task(task_id, **task_update.dict(exclude_unset=True))
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
async def delete_existing_task(task_id: str):
    task = await get_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    await delete_task(task_id)
    return {"message": "Task deleted successfully"}