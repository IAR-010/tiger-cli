"""Auto-generated route for customer by Tiger AI Co-Pilot.
Prompt: "Create a route for customer orders with total, status, and items"
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/customers", tags=["Customer"])


# --- Schemas ---
class CustomerBase(BaseModel):
    title: str = Field(..., description="Title or name of the customer")
    description: Optional[str] = Field(None, description="Detailed description")
    is_active: bool = Field(True, description="Status flag")


class CustomerCreate(CustomerBase):
    pass


class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


# --- In-memory Store (Mock / Prototype) ---
_customers_db: List[dict] = []
_id_counter = 1


# --- Route Handlers ---
@router.get("/", response_model=List[CustomerResponse])
async def list_customers():
    """Retrieve all customers."""
    return _customers_db


@router.post("/", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(payload: CustomerCreate):
    """Create a new customer."""
    global _id_counter
    item = payload.model_dump()
    item["id"] = _id_counter
    item["created_at"] = datetime.utcnow()
    _id_counter += 1
    _customers_db.append(item)
    return item


@router.get("/{item_id}", response_model=CustomerResponse)
async def get_customer(item_id: int):
    """Fetch a specific customer by ID."""
    for item in _customers_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Customer not found")


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_customer(item_id: int):
    """Delete a customer by ID."""
    global _customers_db
    initial_len = len(_customers_db)
    _customers_db = [i for i in _customers_db if i["id"] != item_id]
    if len(_customers_db) == initial_len:
        raise HTTPException(status_code=404, detail="Customer not found")
