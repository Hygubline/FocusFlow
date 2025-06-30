from pydantic import BaseModel
import os

class Settings(BaseModel):
    FIREBASE_CREDENTIALS: str = os.getenv("FIREBASE_CREDENTIALS", "C:/Users/hy126/Desktop/FocusFlow/backend/firebase_credentials.json")
    FIREBASE_PROJECT_ID: str = os.getenv("FIREBASE_PROJECT_ID", "your-firebase-project-id")
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASS: str = "password"
    REDIS_URL: str = "redis://localhost:6379"
    JWT_SECRET: str = "your-secret-key"

settings = Settings()
