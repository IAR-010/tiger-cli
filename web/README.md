# tiger-framework-web 🐅

Full-stack application built with **Tiger Framework**.

- **Backend**: Python (FastAPI)
- **Database**: PostgreSQL
- **Frontend**: Next.js with Tailwind CSS & 3D Glassmorphism

---

## Getting Started

### 1. Run with Docker Compose
```bash
docker compose up -d
```
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

### 2. Local Backend Run
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 3. Local Frontend Run
```bash
cd frontend
npm install
npm run dev
```
