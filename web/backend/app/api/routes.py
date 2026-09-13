from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ItemSchema(BaseModel):
    title: str
    description: str = ""

@router.get("/items")
async def list_items():
    return [
        {"id": 1, "title": "Welcome to Tiger Framework", "description": "Rapid full-stack meta-framework boilerplate"},
        {"id": 2, "title": "3D Glassmorphism UI", "description": "Built-in responsive dark-mode widgets"}
    ]

@router.post("/items")
async def create_item(payload: ItemSchema):
    return {"id": 3, "title": payload.title, "description": payload.description, "status": "created"}
