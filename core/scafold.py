"""Scaffolding logic and project directory planning for Tiger Framework."""

import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Any
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.tree import Tree
from rich import box

# Ensure UTF-8 output on Windows streams if possible
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
            sys.stderr.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

console = Console(safe_box=True)

def _get_symbols() -> Dict[str, str]:
    """Return encoding-safe icons for directory tree display."""
    encoding = getattr(sys.stdout, "encoding", "") or "utf-8"
    try:
        "📦📁📄✔".encode(encoding)
        return {
            "pkg": "📦 ",
            "dir": "📁 ",
            "file": "📄 ",
            "check": "✔",
            "cross": "✖",
        }
    except (UnicodeEncodeError, LookupError):
        return {
            "pkg": "",
            "dir": "[DIR] ",
            "file": "[FILE] ",
            "check": "[OK]",
            "cross": "[X]",
        }

TIGER_BANNER = r"""
 [bold yellow]  _____ _                 [/bold yellow]
 [bold yellow] |_   _(_) __ _  ___ _ __ [/bold yellow]
 [bold yellow]   | | | |/ _` |/ _ \ '__|[/bold yellow]
 [bold yellow]   | | | | (_| |  __/ |   [/bold yellow]
 [bold yellow]   |_| |_|\__, |\___|_|   [/bold yellow]
 [bold yellow]          |___/           [/bold yellow]
 [bold cyan]   Meta-Framework CLI v0.1.0[/bold cyan]
"""


@dataclass
class ProjectConfig:
    """Stores user configuration for the new project."""
    project_name: str
    backend: str
    database: str
    include_frontend: bool
    target_dir: Path

    @property
    def is_fastapi(self) -> bool:
        return "FastAPI" in self.backend

    @property
    def is_express(self) -> bool:
        return "Express" in self.backend


def get_project_blueprint(config: ProjectConfig) -> Dict[str, Any]:
    """Generates the planned directory and file tree based on user selections."""
    root_name = config.project_name
    tree: Dict[str, Any] = {
        "name": root_name,
        "type": "directory",
        "children": [
            {"name": "docker-compose.yml", "type": "file", "desc": f"Multi-container orchestration ({config.database.lower()} + services)"},
            {"name": "tiger.config.json", "type": "file", "desc": "Tiger meta-framework project manifest"},
            {"name": ".env.example", "type": "file", "desc": "Environment variables template"},
            {"name": ".gitignore", "type": "file", "desc": "Git ignore rules"},
            {"name": "README.md", "type": "file", "desc": "Project documentation & runbook"},
        ]
    }

    # Backend blueprint
    backend_children: List[Dict[str, Any]] = []
    if config.is_fastapi:
        backend_children = [
            {
                "name": "app",
                "type": "directory",
                "children": [
                    {"name": "__init__.py", "type": "file"},
                    {"name": "main.py", "type": "file", "desc": "FastAPI entrypoint with OpenAPI docs"},
                    {
                        "name": "api",
                        "type": "directory",
                        "children": [
                            {"name": "__init__.py", "type": "file"},
                            {"name": "routes.py", "type": "file", "desc": "API route handlers"},
                        ]
                    },
                    {
                        "name": "core",
                        "type": "directory",
                        "children": [
                            {"name": "__init__.py", "type": "file"},
                            {"name": "config.py", "type": "file", "desc": "Pydantic settings"},
                            {"name": "database.py", "type": "file", "desc": f"SQLAlchemy engine ({config.database})"},
                        ]
                    },
                    {
                        "name": "models",
                        "type": "directory",
                        "children": [
                            {"name": "__init__.py", "type": "file"},
                            {"name": "item.py", "type": "file", "desc": "ORM database models"},
                        ]
                    },
                ]
            },
            {"name": "requirements.txt", "type": "file", "desc": "Python dependencies (FastAPI, SQLAlchemy, etc.)"},
            {"name": "Dockerfile", "type": "file", "desc": "Production container specification"},
            {"name": ".env", "type": "file", "desc": "Backend secrets"},
        ]
    else:
        # Node.js (Express)
        backend_children = [
            {
                "name": "src",
                "type": "directory",
                "children": [
                    {"name": "index.ts", "type": "file", "desc": "Express application bootstrap"},
                    {
                        "name": "routes",
                        "type": "directory",
                        "children": [
                            {"name": "api.ts", "type": "file", "desc": "Express router handlers"},
                        ]
                    },
                    {
                        "name": "controllers",
                        "type": "directory",
                        "children": [
                            {"name": "itemController.ts", "type": "file"},
                        ]
                    },
                    {
                        "name": "config",
                        "type": "directory",
                        "children": [
                            {"name": "db.ts", "type": "file", "desc": f"Connection pool ({config.database})"},
                        ]
                    },
                ]
            },
            {"name": "package.json", "type": "file", "desc": "Node dependencies & scripts"},
            {"name": "tsconfig.json", "type": "file", "desc": "TypeScript configuration"},
            {"name": "Dockerfile", "type": "file", "desc": "Node multi-stage build container"},
            {"name": ".env", "type": "file", "desc": "Backend environment"},
        ]

    backend_folder = {
        "name": "backend",
        "type": "directory",
        "children": backend_children
    }
    tree["children"].insert(0, backend_folder)

    # Frontend blueprint (Next.js with Tailwind and Glassmorphism)
    if config.include_frontend:
        frontend_folder = {
            "name": "frontend",
            "type": "directory",
            "children": [
                {
                    "name": "src",
                    "type": "directory",
                    "children": [
                        {
                            "name": "app",
                            "type": "directory",
                            "children": [
                                {"name": "layout.tsx", "type": "file", "desc": "Root layout with dark theme"},
                                {"name": "page.tsx", "type": "file", "desc": "Hero landing with 3D Glassmorphism"},
                                {"name": "globals.css", "type": "file", "desc": "Tailwind CSS & glass utility classes"},
                            ]
                        },
                        {
                            "name": "components",
                            "type": "directory",
                            "children": [
                                {
                                    "name": "ui",
                                    "type": "directory",
                                    "children": [
                                        {"name": "GlassCard.tsx", "type": "file", "desc": "3D Glassmorphism container"},
                                        {"name": "GlassNavbar.tsx", "type": "file", "desc": "Translucent navigation"},
                                        {"name": "Button.tsx", "type": "file", "desc": "Interactive glow button"},
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {"name": "public", "type": "directory", "children": []},
                {"name": "tailwind.config.js", "type": "file", "desc": "Tailwind configuration with glass presets"},
                {"name": "next.config.js", "type": "file", "desc": "Next.js configuration"},
                {"name": "package.json", "type": "file", "desc": "Next.js, React, Lucide, Tailwind"},
                {"name": "Dockerfile", "type": "file", "desc": "Standalone Next.js runner"},
            ]
        }
        tree["children"].insert(1, frontend_folder)

    return tree


def _populate_rich_tree(node: Tree, data: Dict[str, Any], sym: Dict[str, str]) -> None:
    """Recursively populates a Rich Tree with directory structure."""
    children = data.get("children", [])
    dirs = [c for c in children if c.get("type") == "directory"]
    files = [c for c in children if c.get("type") == "file"]

    for d in sorted(dirs, key=lambda x: x["name"]):
        branch = node.add(f"[bold blue]{sym['dir']}{d['name']}/[/bold blue]")
        _populate_rich_tree(branch, d, sym)

    for f in sorted(files, key=lambda x: x["name"]):
        desc = f" [dim]# {f['desc']}[/dim]" if "desc" in f else ""
        node.add(f"[green]{sym['file']}{f['name']}[/green]{desc}")


def display_scaffold_preview(config: ProjectConfig) -> None:
    """Renders the formatted summary and tree structure for the project."""
    sym = _get_symbols()
    console.print(TIGER_BANNER)

    # Configuration Summary Table
    table = Table(
        title="[bold yellow]Project Configuration Summary[/bold yellow]",
        box=box.ROUNDED,
        show_header=True,
        header_style="bold magenta",
        title_justify="left"
    )
    table.add_column("Parameter", style="cyan", width=26)
    table.add_column("Selection", style="bold white")

    table.add_row("Project Name", config.project_name)
    table.add_row("Target Directory", str(config.target_dir.resolve()))
    table.add_row("Backend Stack", config.backend)
    table.add_row("Database", config.database)
    table.add_row(
        "Next.js Frontend",
        "[bold green]Included (Tailwind + 3D Glassmorphism)[/bold green]"
        if config.include_frontend
        else "[dim red]Excluded[/dim red]"
    )

    console.print(table)
    console.print()

    # Projected Directory Tree
    blueprint = get_project_blueprint(config)
    tree_root = Tree(f"[bold yellow]{sym['pkg']}{config.project_name}/[/bold yellow] [dim]({config.target_dir.resolve()})[/dim]")
    _populate_rich_tree(tree_root, blueprint, sym)

    console.print(
        Panel(
            tree_root,
            title="[bold green]Planned Project Blueprint (Phase 1 Preview)[/bold green]",
            subtitle="[dim cyan]Tiger Framework Scaffolder[/dim cyan]",
            border_style="green",
            box=box.ROUNDED
        )
    )

    # Status notice
    console.print(
        Panel(
            f"[bold green]{sym['check']} Scaffolding plan successfully generated![/bold green]\n"
            f"[dim]Project: [/dim][bold cyan]{config.project_name}[/bold cyan]\n"
            f"[dim]Destination: [/dim][white]{config.target_dir.resolve()}[/white]",
            border_style="green",
            box=box.ROUNDED
        )
    )


def write_project_boilerplate(config: ProjectConfig) -> Path:
    """Physically creates all boilerplate files and directories on disk."""
    import json
    from core.ui_library import inject_ui_component, list_available_ui_components
    from core.db_tools import init_database

    root = config.target_dir
    root.mkdir(parents=True, exist_ok=True)

    # 1. Project Manifest
    manifest = {
        "name": config.project_name,
        "framework": "tiger",
        "version": "0.1.0",
        "backend": config.backend,
        "database": config.database,
        "frontend": config.include_frontend,
    }
    (root / "tiger.config.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    # 2. .gitignore
    gitignore_content = """# Tiger Framework
node_modules/
.next/
out/
__pycache__/
*.py[cod]
.venv/
env/
.env
dist/
build/
*.db
.DS_Store
"""
    (root / ".gitignore").write_text(gitignore_content, encoding="utf-8")

    # 3. docker-compose.yml
    db_service = ""
    if "PostgreSQL" in config.database:
        db_service = f"""
  postgres:
    image: postgres:16-alpine
    container_name: {config.project_name}-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: {config.project_name.replace('-', '_')}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
"""
    elif "MySQL" in config.database:
        db_service = f"""
  mysql:
    image: mysql:8.0
    container_name: {config.project_name}-mysql
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: {config.project_name.replace('-', '_')}
    ports:
      - "3306:3306"
    volumes:
      - mysqldata:/var/lib/mysql
"""

    docker_compose = f"""version: '3.8'

services:{db_service}
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: {config.project_name}-backend
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: {config.project_name}-frontend
    ports:
      - "3000:3000"
    restart: unless-stopped

volumes:
  pgdata:
  mysqldata:
"""
    (root / "docker-compose.yml").write_text(docker_compose, encoding="utf-8")

    # 4. Backend Boilerplate
    backend_dir = root / "backend"
    backend_dir.mkdir(parents=True, exist_ok=True)

    if config.is_fastapi:
        # Requirements
        db_driver = "asyncpg>=0.29.0" if "PostgreSQL" in config.database else ("aiomysql>=0.2.0" if "MySQL" in config.database else "aiosqlite>=0.19.0")
        (backend_dir / "requirements.txt").write_text(
            f"fastapi>=0.110.0\nuvicorn[standard]>=0.29.0\nsqlalchemy>=2.0.28\npydantic>=2.6.4\npydantic-settings>=2.2.1\npython-dotenv>=1.0.1\n{db_driver}\n",
            encoding="utf-8"
        )
        # Dockerfile
        (backend_dir / "Dockerfile").write_text(
            """FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
""",
            encoding="utf-8"
        )
        # App structure
        app_dir = backend_dir / "app"
        app_dir.mkdir(parents=True, exist_ok=True)
        (app_dir / "__init__.py").write_text("", encoding="utf-8")

        # main.py
        (app_dir / "main.py").write_text(
            f'''"""FastAPI application generated by Tiger Framework."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(
    title="{config.project_name} API",
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

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    """Service health probe."""
    return {{"status": "healthy", "service": "{config.project_name}-backend"}}
''',
            encoding="utf-8"
        )

        # Core
        core_dir = app_dir / "core"
        core_dir.mkdir(parents=True, exist_ok=True)
        (core_dir / "__init__.py").write_text("", encoding="utf-8")
        (core_dir / "config.py").write_text(
            '''import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Tiger App"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./tiger.db")

    class Config:
        env_file = ".env"

settings = Settings()
''',
            encoding="utf-8"
        )
        (core_dir / "database.py").write_text(
            '''from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
''',
            encoding="utf-8"
        )

        # Models
        models_dir = app_dir / "models"
        models_dir.mkdir(parents=True, exist_ok=True)
        (models_dir / "__init__.py").write_text("", encoding="utf-8")
        (models_dir / "item.py").write_text(
            '''from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.core.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
''',
            encoding="utf-8"
        )

        # API Routes
        api_dir = app_dir / "api"
        api_dir.mkdir(parents=True, exist_ok=True)
        (api_dir / "__init__.py").write_text("", encoding="utf-8")
        (api_dir / "routes.py").write_text(
            '''from fastapi import APIRouter
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
''',
            encoding="utf-8"
        )

    else:
        # Express (Node.js)
        (backend_dir / "package.json").write_text(
            f'''{{
  "name": "{config.project_name}-backend",
  "version": "0.1.0",
  "main": "src/index.ts",
  "scripts": {{
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }},
  "dependencies": {{
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5"
  }},
  "devDependencies": {{
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.11.30",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.3"
  }}
}}''',
            encoding="utf-8"
        )
        (backend_dir / "tsconfig.json").write_text(
            '''{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}''',
            encoding="utf-8"
        )
        src_dir = backend_dir / "src"
        src_dir.mkdir(parents=True, exist_ok=True)
        (src_dir / "index.ts").write_text(
            f'''import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({{ origin: "http://localhost:3000" }}));
app.use(express.json());

app.get("/health", (req, res) => {{
  res.json({{ status: "healthy", service: "{config.project_name}-backend" }});
}});

app.get("/api/v1/items", (req, res) => {{
  res.json([
    {{ id: 1, title: "Tiger Express Server", description: "Node.js + Express backend" }},
    {{ id: 2, title: "Database Connected", description: "Configured for {config.database}" }}
  ]);
}});

app.listen(PORT, () => {{
  console.log(`[Tiger] Server running on http://localhost:${{PORT}}`);
}});
''',
            encoding="utf-8"
        )
        (backend_dir / "Dockerfile").write_text(
            """FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
""",
            encoding="utf-8"
        )

    # Initialize Database configuration
    init_database(root, config.database)

    # 5. Frontend Boilerplate (Next.js + 3D Glassmorphism)
    if config.include_frontend:
        frontend_dir = root / "frontend"
        frontend_dir.mkdir(parents=True, exist_ok=True)

        (frontend_dir / "package.json").write_text(
            f'''{{
  "name": "{config.project_name}-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }},
  "dependencies": {{
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.378.0"
  }},
  "devDependencies": {{
    "@types/node": "^20.12.7",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5"
  }}
}}''',
            encoding="utf-8"
        )

        (frontend_dir / "tailwind.config.js").write_text(
            '''/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#f9fafb",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
''',
            encoding="utf-8"
        )

        (frontend_dir / "postcss.config.js").write_text(
            '''module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
''',
            encoding="utf-8"
        )

        (frontend_dir / "next.config.js").write_text(
            '''/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
''',
            encoding="utf-8"
        )

        app_route_dir = frontend_dir / "src" / "app"
        app_route_dir.mkdir(parents=True, exist_ok=True)

        (app_route_dir / "globals.css").write_text(
            '''@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #030712;
  --foreground: #f9fafb;
}

body {
  color: var(--foreground);
  background: var(--background);
  min-height: 100vh;
}

/* 3D Glassmorphism Utilities */
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
''',
            encoding="utf-8"
        )

        (app_route_dir / "layout.tsx").write_text(
            '''import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiger Framework App",
  description: "Accelerated full-stack application with 3D Glassmorphism and dark mode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
''',
            encoding="utf-8"
        )

        (app_route_dir / "page.tsx").write_text(
            f'''import React from "react";
import GlassNavbar from "@/components/ui/GlassNavbar";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import GlassStats from "@/components/ui/GlassStats";

export default function Home() {{
  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white selection:bg-amber-400 selection:text-slate-950 overflow-hidden">
      {{/* Background Ambient Glowing Orbs */}}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-cyan-500/15 to-purple-500/20 blur-[130px] pointer-events-none" />

      <GlassNavbar brandName="{config.project_name.upper()}" />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-20">
        {{/* Hero Section */}}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold tracking-wide">
            🐅 Tiger Framework Meta-Stack
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Crafted for <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Unmatched Speed</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Your full-stack foundation with <strong>{config.backend}</strong>, <strong>{config.database}</strong>, and <strong>Next.js 14 App Router</strong> with 3D Glassmorphic components.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <GlassButton variant="primary" size="lg">Explore Docs</GlassButton>
            <GlassButton variant="secondary" size="lg">View Architecture</GlassButton>
          </div>
        </div>

        {{/* Live Metrics Grid */}}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <GlassStats label="API Latency" value="1.8 ms" change="-24%" isPositive={{true}} />
          <GlassStats label="Scaffold Velocity" value="< 2 sec" change="10x Faster" isPositive={{true}} />
          <GlassStats label="Stack Health" value="100%" change="Production Ready" isPositive={{true}} />
        </div>

        {{/* 3D Glass Cards Showcase */}}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <GlassCard
            title="Backend Integration"
            subtitle="{config.backend} + {config.database}"
            glowColor="amber"
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              Auto-configured ORM models, async database connection pooling, OpenAPI interactive docs, and containerized deployment.
            </p>
          </GlassCard>

          <GlassCard
            title="3D Glassmorphism System"
            subtitle="Tailwind CSS + Hardware-Accelerated Transforms"
            glowColor="cyan"
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              Perspective tilting, dynamic specular lighting, and customizable neon glows designed for high-end SaaS applications.
            </p>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}}
''',
            encoding="utf-8"
        )

        # Inject all 3D Glassmorphism UI components into frontend/src/components/ui/
        for comp_name in list_available_ui_components():
            inject_ui_component(comp_name, root)

        (frontend_dir / "Dockerfile").write_text(
            """FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
""",
            encoding="utf-8"
        )

    # 6. Top-level README.md
    readme_content = f"""# {config.project_name} 🐅

Full-stack application built with **Tiger Framework**.

- **Backend**: {config.backend}
- **Database**: {config.database}
- **Frontend**: {'Next.js with Tailwind CSS & 3D Glassmorphism' if config.include_frontend else 'None'}

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
"""
    (root / "README.md").write_text(readme_content, encoding="utf-8")

    return root
