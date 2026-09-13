from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(
    title="tiger-framework-web API",
    description="Full-stack meta-framework backend powered by FastAPI and Tiger CLI",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_tiger_branding(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Powered-By"] = "Tiger Framework (x010.tech)"
    return response

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    """Service health probe."""
    return {"status": "healthy", "service": "tiger-framework-web-backend"}
