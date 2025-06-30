from app.db.firebase_client import init_firebase
from app.db.models import Task, TaskCreate, TaskUpdate
from typing import List, Optional
from uuid import uuid4
from datetime import datetime

db = init_firebase()

async def create_task(title: str, description: str) -> Task:
    task_id = str(uuid4())
    now = datetime.now()
    data = {
        "id": int(task_id.replace("-", "")[:9], 16),
        "title": title, 
        "description": description,
        "completed": False,
        "created_at": now,
        "updated_at": now
    }
    db.collection("tasks").document(task_id).set(data)
    return Task(**data)

async def get_task(task_id: str) -> Optional[Task]:
    doc = db.collection("tasks").document(task_id).get()
    if doc.exists:
        data = doc.to_dict()
        if data is None:
            return None
        # Ensure all required fields are present with correct types
        task_data = {
            "id": data.get("id", 0),
            "title": data.get("title", ""),
            "description": data.get("description") or None,
            "completed": data.get("completed", False),
            "created_at": data.get("created_at", datetime.now()),
            "updated_at": data.get("updated_at", datetime.now())
        }
        return Task(**task_data)
    return None

async def list_tasks() -> List[Task]:
    docs = db.collection("tasks").stream()
    tasks = []
    for doc in docs:
        data = doc.to_dict()
        if data is None:
            continue
        task_data = {
            "id": data.get("id", 0),
            "title": data.get("title", ""),
            "description": data.get("description") or None,
            "completed": data.get("completed", False),
            "created_at": data.get("created_at", datetime.now()),
            "updated_at": data.get("updated_at", datetime.now())
        }
        tasks.append(Task(**task_data))
    return tasks

async def update_task(task_id: str, **kwargs) -> Optional[Task]:
    doc_ref = db.collection("tasks").document(task_id)
    doc = doc_ref.get()
    if not doc.exists:
        return None
    # Add updated_at timestamp
    kwargs["updated_at"] = datetime.now()
    doc_ref.update(kwargs)
    updated_doc = doc_ref.get()
    data = updated_doc.to_dict()
    if data is None:
        return None
    task_data = {
        "id": data.get("id", 0),
        "title": data.get("title", ""),
        "description": data.get("description") or None,
        "completed": data.get("completed", False),
        "created_at": data.get("created_at", datetime.now()),
        "updated_at": data.get("updated_at", datetime.now())
    }
    return Task(**task_data)

async def delete_task(task_id: str):
    db.collection("tasks").document(task_id).delete()