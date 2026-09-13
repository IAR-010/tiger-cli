"""AI Co-Pilot for Tiger Framework: Route generation and code debugging."""

import os
import re
from pathlib import Path
from typing import Dict, Any, Optional
from rich.console import Console

console = Console(safe_box=True)


def extract_resource_name(prompt: str) -> str:
    """Extracts the primary entity/resource name from a natural language prompt."""
    prompt_clean = prompt.lower()
    stop_words = {
        "a", "an", "the", "new", "route", "routes", "api", "endpoint",
        "endpoints", "to", "for", "with", "and", "service", "crud", "app",
    }

    # Match actions followed by resource nouns
    matches = re.findall(r'(?:manage|create|build|handle|for|about)\s+([a-zA-Z_-]+)', prompt_clean)
    for m in matches:
        word = m.rstrip('s')
        if word not in stop_words and len(word) > 1:
            return word

    # Fallback to first non-stopword noun
    words = [
        w for w in re.findall(r'[a-zA-Z]+', prompt_clean)
        if w not in stop_words and w not in ("create", "manage", "build", "handle", "backend")
    ]
    return words[0].rstrip('s') if words else "item"


def generate_fastapi_route(prompt: str) -> str:
    """Generates a complete FastAPI route file based on natural language prompt."""
    resource = extract_resource_name(prompt)
    class_name = resource.capitalize()
    plural = f"{resource}s"

    return f'''"""Auto-generated route for {resource} by Tiger AI Co-Pilot.
Prompt: "{prompt}"
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/{plural}", tags=["{class_name}"])


# --- Schemas ---
class {class_name}Base(BaseModel):
    title: str = Field(..., description="Title or name of the {resource}")
    description: Optional[str] = Field(None, description="Detailed description")
    is_active: bool = Field(True, description="Status flag")


class {class_name}Create({class_name}Base):
    pass


class {class_name}Response({class_name}Base):
    id: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


# --- In-memory Store (Mock / Prototype) ---
_{plural}_db: List[dict] = []
_id_counter = 1


# --- Route Handlers ---
@router.get("/", response_model=List[{class_name}Response])
async def list_{plural}():
    """Retrieve all {plural}."""
    return _{plural}_db


@router.post("/", response_model={class_name}Response, status_code=status.HTTP_201_CREATED)
async def create_{resource}(payload: {class_name}Create):
    """Create a new {resource}."""
    global _id_counter
    item = payload.model_dump()
    item["id"] = _id_counter
    item["created_at"] = datetime.utcnow()
    _id_counter += 1
    _{plural}_db.append(item)
    return item


@router.get("/{{item_id}}", response_model={class_name}Response)
async def get_{resource}(item_id: int):
    """Fetch a specific {resource} by ID."""
    for item in _{plural}_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="{class_name} not found")


@router.delete("/{{item_id}}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_{resource}(item_id: int):
    """Delete a {resource} by ID."""
    global _{plural}_db
    initial_len = len(_{plural}_db)
    _{plural}_db = [i for i in _{plural}_db if i["id"] != item_id]
    if len(_{plural}_db) == initial_len:
        raise HTTPException(status_code=404, detail="{class_name} not found")
'''


def generate_express_route(prompt: str) -> str:
    """Generates a complete Express TypeScript route handler based on natural language prompt."""
    resource = extract_resource_name(prompt)
    class_name = resource.capitalize()
    plural = f"{resource}s"

    return f'''/**
 * Auto-generated route for {resource} by Tiger AI Co-Pilot.
 * Prompt: "{prompt}"
 */

import {{ Router, Request, Response }} from "express";

const router = Router();

export interface I{class_name} {{
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
}}

let {plural}Db: I{class_name}[] = [];
let idCounter = 1;

// GET /{plural}
router.get("/", (req: Request, res: Response) => {{
  res.json({plural}Db);
}});

// POST /{plural}
router.post("/", (req: Request, res: Response) => {{
  const {{ title, description }} = req.body;
  if (!title) {{
    return res.status(400).json({{ error: "Title is required" }});
  }}
  const newItem: I{class_name} = {{
    id: idCounter++,
    title,
    description,
    createdAt: new Date(),
  }};
  {plural}Db.push(newItem);
  res.status(201).json(newItem);
}});

// GET /{plural}/:id
router.get("/:id", (req: Request, res: Response) => {{
  const id = parseInt(req.params.id, 10);
  const item = {plural}Db.find((i) => i.id === id);
  if (!item) {{
    return res.status(404).json({{ error: "{class_name} not found" }});
  }}
  res.json(item);
}});

// DELETE /{plural}/:id
router.delete("/:id", (req: Request, res: Response) => {{
  const id = parseInt(req.params.id, 10);
  const initialLen = {plural}Db.length;
  {plural}Db = {plural}Db.filter((i) => i.id !== id);
  if ({plural}Db.length === initialLen) {{
    return res.status(404).json({{ error: "{class_name} not found" }});
  }}
  res.status(204).send();
}});

export default router;
'''


import json
import urllib.request
import urllib.error


def query_llm_api(prompt: str, system_prompt: str) -> Optional[str]:
    """Queries live LLM APIs (Gemini or OpenAI) if API keys are configured."""
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    if gemini_key:
        model = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={gemini_key}"
        full_prompt = f"{system_prompt}\n\nTask:\n{prompt}"
        payload = {"contents": [{"parts": [{"text": full_prompt}]}]}
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                # Strip markdown code fences if LLM wrapped it
                return re.sub(r"^```[a-zA-Z]*\n|```$", "", text.strip())
        except Exception:
            return None

    elif openai_key:
        model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        url = "https://api.openai.com/v1/chat/completions"
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {openai_key}"
            },
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=12) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                text = data["choices"][0]["message"]["content"]
                return re.sub(r"^```[a-zA-Z]*\n|```$", "", text.strip())
        except Exception:
            return None

    return None


def generate_api_route(prompt: str, backend_type: str = "fastapi") -> Dict[str, str]:
    """Generates code and recommended target filepath for the requested API route."""
    resource = extract_resource_name(prompt)
    is_express = "express" in backend_type.lower() or "node" in backend_type.lower()

    if is_express:
        filename = f"{resource}Routes.ts"
        dest_rel = f"backend/src/routes/{filename}"
    else:
        filename = f"{resource}_routes.py"
        dest_rel = f"backend/app/api/{filename}"

    # Check for live LLM response
    system_prompt = (
        f"You are Tiger Framework AI Co-Pilot. Write clean, complete, typed code for a "
        f"{'Express TypeScript router' if is_express else 'FastAPI APIRouter'} module "
        f"matching the prompt. Output ONLY valid executable code without markdown explanations."
    )
    llm_code = query_llm_api(prompt, system_prompt)

    if llm_code and len(llm_code) > 80:
        code = llm_code
    else:
        code = generate_express_route(prompt) if is_express else generate_fastapi_route(prompt)

    return {
        "resource": resource,
        "filename": filename,
        "dest_rel": dest_rel,
        "code": code,
    }


def diagnose_code_issue(error_text_or_snippet: str) -> Dict[str, str]:
    """Analyzes code or error logs and provides actionable debugging diagnosis."""
    text = error_text_or_snippet.lower()

    if "coroutine" in text and "was never awaited" in text:
        return {
            "root_cause": "Un-awaited Coroutine in Async Function",
            "explanation": "An asynchronous operation was invoked without the 'await' keyword.",
            "suggestion": "Add 'await' before calling the async database or client method: e.g., result = await db.execute(...)",
        }
    elif "validation error" in text or "pydantic" in text:
        return {
            "root_cause": "Pydantic Schema Validation Failure",
            "explanation": "Incoming JSON request body does not match the fields or data types defined in the request model.",
            "suggestion": "Verify request payload headers ('Content-Type: application/json') and verify required model fields.",
        }
    elif "connection refused" in text or "5432" in text or "3306" in text:
        return {
            "root_cause": "Database Connection Refused",
            "explanation": "The application cannot reach the database server on the specified host/port.",
            "suggestion": "Ensure the database container is running via 'docker compose up -d' and verify DATABASE_URL in .env.",
        }
    elif "cors" in text or "access-control-allow-origin" in text:
        return {
            "root_cause": "CORS Policy Rejection",
            "explanation": "The frontend origin is not present in the backend allowed CORS origins list.",
            "suggestion": "Update CORSMiddleware in backend/app/main.py: allow_origins=['http://localhost:3000'].",
        }
    else:
        return {
            "root_cause": "General Syntax or Configuration Anomaly",
            "explanation": "The reported snippet contains an unhandled exception or configuration mismatch.",
            "suggestion": "Inspect stack trace line numbers, ensure all required environment variables are set in .env, and restart the server.",
        }
