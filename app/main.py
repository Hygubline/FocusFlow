from fastapi import FastAPI
from app.routers import tasks
from app.config import settings

app = FastAPI(title="FocusFlow API")

app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {"message": "FocusFlow backend is live"}