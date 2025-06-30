## Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/HyguBline/FocusFlow.git
   cd FocusFlow/backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # or
   source venv/bin/activate  # On Mac/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Firebase credentials**
   - Download your Firebase service account JSON.
   - Place it in the backend folder.
   - Update `FIREBASE_CREDENTIALS` in `app/config.py` or your `.env` file.

5. **Run the server**
   ```bash
   python -m uvicorn app.main:app --reload
   ```

6. **Open API docs**
   - Go to [http://localhost:8000/docs](http://localhost:8000/docs)

## 🛠️ API Endpoints

- `POST /tasks/` — Create a task
- `GET /tasks/` — List all tasks
- `GET /tasks/{task_id}` — Get a single task
- `PUT /tasks/{task_id}` — Update a task
- `DELETE /tasks/{task_id}` — Delete a task

## 📝 License

MIT
