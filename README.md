# Tiger Framework CLI 🐅

> **Command-line based full-stack meta-framework designed to accelerate project setup, API design, version control, and deployment for modern web applications.**

---

## Architecture & Features

Tiger Framework delivers a unified developer experience from first scaffold to production deployment:

- 🚀 **Interactive CLI Scaffolding (`tiger create-app`)**: Fast project bootstrap with **Python (FastAPI)** or **Node.js (Express)**, configured databases (**PostgreSQL**, **MySQL**, **SQLite**), and **Next.js 14 App Router**.
- 💎 **3D Glassmorphism UI Injection (`tiger make:ui`)**: Library of modern Tailwind CSS widgets with dark mode, hardware-accelerated 3D perspective tilting, dynamic specular lighting, and reactive neon glows (`GlassCard`, `GlassNavbar`, `GlassButton`, `GlassModal`, `GlassStats`).
- 🔄 **Version Control Automation (`tiger push`)**: Single-command Git repository checks, auto-initialization, staging, interactive commit messages, and remote push.
- 🗄️ **Database Management Toolkit (`tiger db`)**: Connection configuration (`tiger db init`), connection pooling in `.env`, and schema migration orchestrator (`tiger db migrate`).
- 🤖 **AI Co-Pilot Integration (`tiger ai`)**: Natural language route generator (`tiger ai route`) and intelligent terminal debugger (`tiger ai debug`).
- 🐳 **Production Deployment**: Automated multi-stage Dockerfiles and `docker-compose.yml` service orchestration.

---

## Directory Structure

```
tiger-cli/
├── pyproject.toml              # Build config, dependencies, and 'tiger' console script
├── .gitignore                  # Git ignore rules
├── README.md                   # Full framework guide
├── main.py                     # Main Typer entry point
├── core/
│   ├── __init__.py             # Core package init
│   ├── scafold.py              # Scaffolding blueprint logic & boilerplate generator
│   ├── scaffold.py             # Alias module
│   ├── git_tools.py            # Git repository check, init, commit, and push automation
│   ├── ui_library.py           # 3D Glassmorphism & dark mode UI component library
│   ├── db_tools.py             # Database connector generator & migrations orchestrator
│   └── ai_copilot.py           # LLM route generator & error diagnosis engine
├── cli/
│   ├── __init__.py             # CLI package init
│   └── commands.py             # Typer command definitions
└── tests/
    └── test_scaffold.py        # Automated test suite
```

---

## Quickstart & Installation

### 1. Prerequisites
- Python 3.9+ (Python 3.10+ recommended)
- Git

### 2. Setup Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install in Editable Mode
```bash
pip install -e .
```

---

## Command Reference

### 1. Create a Full-Stack Project
```bash
tiger create-app my-saas
```
Follow the interactive prompts to choose backend, database, and Next.js frontend with 3D Glassmorphism.

### 2. Git Automation (Tiger Git)
```bash
tiger push
# Or provide message directly:
tiger push -m "feat: user authentication routes"
```
Automatically initializes git if not present, stages all files, commits, and pushes to remote.

### 3. Inject 3D Glassmorphism UI Components
```bash
tiger make:ui
# Or specify component directly:
tiger make:ui GlassCard
tiger make:ui GlassNavbar
tiger make:ui GlassButton
tiger make:ui GlassModal
tiger make:ui GlassStats
```
Components are injected into `frontend/src/components/ui/` with TypeScript types and Tailwind styling.

### 4. Database Toolkit
```bash
# Initialize database connection and migration directory
tiger db init --type PostgreSQL --name my_app_db

# Execute migrations and synchronize schema
tiger db migrate --message "add_users_table"
```

### 5. AI Co-Pilot
```bash
# Generate API routes from natural language
tiger ai route "Create a route to manage products with title, price, and inventory"

# Diagnose errors or stack traces
tiger ai debug "RuntimeError: Task was destroyed but it is pending! coroutine was never awaited"
```

---

## Running Automated Tests

```bash
pytest -v
```
