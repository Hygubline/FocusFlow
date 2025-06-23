# FocusFlow Backend

**FocusFlow** is a task‑management API designed to help students stay organized and on track by combining traditional to‑do lists with AI‑driven scheduling, reminders, and task relationships.

## Why FocusFlow?
Students often juggle multiple assignments, study sessions, and personal commitments without clear guidance on what to tackle next. FocusFlow uses a combination of graph relationships and AI heuristics to suggest optimal task order, send timed notifications, and adapt to changing priorities.

## 🚀 Getting Started
Follow these steps to run the backend locally.

### 1. Clone the Repository

git clone <repo-url>
cd FocusFlow/backend


### 2. Create & Activate a Virtual Environment

# Windows PowerShell
git checkout main
py -3 -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
. .\venv\Scripts\Activate.ps1

# macOS/Linux
py3 -m venv venv
source venv/bin/activate

### 3. Install Dependencies

pip install -r requirements.txt

### 4. Configure Environment Variables
   POSTGRES_DSN=postgresql+asyncpg://user:pass@localhost/focusflow
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASS=your_neo4j_password
   REDIS_URL=redis://localhost:6379/0
   JWT_SECRET=your_jwt_secret

### 5. Initialize & Migrate the Database

# Initialize Alembic (one-time)
alembic init alembic

# Configure alembic/env.py to use settings.POSTGRES_DSN

# Generate migration from models
alembic revision --autogenerate -m "create tasks table"
# Apply migration
alembic upgrade head

### 6. Run the Server
uvicorn app.main:app --reload
Open your browser at http://localhost:8000 to confirm:

{"message":"FocusFlow backend is live"}

## 🔧 Project Structure

FocusFlow/backend/
├─ app/
│  ├─ db/
│  │  ├─ models.py       # SQLAlchemy ORM definitions
│  │  ├─ session.py      # Async engine & get_db() dependency
│  │  └─ crud.py         # Task CRUD functions
│  ├─ firebase.py        # (Optional) Firebase Admin SDK init
│  ├─ neo4j_service.py   # Async Neo4j helpers
│  ├─ tasks.py           # FastAPI routers for /tasks
│  └─ main.py            # FastAPI app entrypoint
├─ alembic/
│  ├─ env.py             # Alembic setup (reads .env)
│  └─ versions/          # Auto-generated migration scripts
├─ .env.example          # Template for environment variables
├─ requirements.txt      # Locked dependencies
└─ README.md             # This file

## 📈 Progress This Week
- **Environment setup:** Created `.env`, configured Pydantic settings, and installed all dependencies in a virtual environment.
- **Persistence layer:** Defined the `Task` model, set up async SQLAlchemy engine and session, and implemented CRUD functions.
- **Database migrations:** Initialized Alembic and applied the first migration to create the `tasks` table.
- **Graph relationships:** Added Neo4j helper for creating task-to-task relationships.
- **Authentication integration:** Integrated Firebase Auth on the backend with a `get_current_user` dependency to protect routes.

## 🛠 Next Steps
1. Add user registration, login, and role-based access control.  
2. Implement Redis-backed timers and background notification tasks.  
3. Write unit and integration tests for all services and endpoints.  
4. Containerize with Docker and set up a CI/CD pipeline for automated builds and tests.
