from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import TaskCreate, TaskResponse
import crud
import session 

# Actual API app obj
app = FastAPI()

# Frontend Connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Allows requests from front-end address
    allow_methods=["*"],
    allow_headers=["*"],
)

#Defining the commonly called requests first: POST (Create Task), DELETE (Delete Task), PUT (Update Task)

@app.post("/api/tasks/", response_model=TaskResponse, status_code = 201)
async def create_new_task(task_in: TaskCreate, db: AsyncSession = Depends(session.get_db)):
    new_task = await crud.create_task(db=db, title=task_in.title, description=task_in.description)
    return new_task

@app.delete("/api/tasks/{task_id}", status_code=204)
async def deletion_of_task(task_id: int, db: AsyncSession = Depends(session.get_db)):
    await crud.delete_task(db=db, task_id=task_id)
    return
    # If the crud function tells us the task didn't exist, return a 404 error.
    # if task did not exist... (invalid task_id)
        # Raise error here...
    # *** Add implementation soon***     

@app.put("/api/tasks/{task_id}", response_model=TaskResponse)
async def update_a_task(task_id: int, task_in: TaskCreate, db: AsyncSession = Depends(session.get_db)):
    updated_task = await crud.update_task(db=db, task_id=task_id, **task_in.model_dump())
    return updated_task
    # task_in.model_dump() creates a dictionary like {'title': '...', 'description': '...', ...}.
    # The ** before it unpacks the dictionary into keyword arguments.