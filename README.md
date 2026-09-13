<div align="center">
  <img src="assets/logo.png" alt="Tiger Framework Logo" width="150" />
  <h1>Tiger Framework CLI</h1>
  <p><strong>Command-line based full-stack meta-framework designed to accelerate project setup, API design, version control, and deployment for modern web applications.</strong></p>

  <p>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
    <a href="https://github.com/IAR-010"><img src="https://img.shields.io/badge/Organization-IAR--010-black" alt="Organization: IAR-010" /></a>
    <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
    <img src="https://img.shields.io/badge/Python-3.9+-3776AB.svg" alt="Python 3.9+" />
    <img src="https://img.shields.io/badge/Next.js-14-black.svg" alt="Next.js 14" />
  </p>
</div>

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
├── assets/
│   └── logo.png                # Official Tiger Framework 3D Glassmorphic logo
├── pyproject.toml              # Build config, dependencies, and 'tiger' console script
├── .gitignore                  # Git ignore rules
├── README.md                   # Full framework guide
├── main.py                     # Main Typer entry point
├── core/
│   ├── assets/
│   │   └── logo.png            # Template logo asset for generated apps
│   ├── __init__.py             # Core package init
│   ├── scafold.py              # Scaffolding blueprint logic & boilerplate generator
│   ├── scaffold.py             # Alias module
│   ├── git_tools.py            # Git repository check, init, commit, and push automation
│   ├── ui_library.py           # 3D Glassmorphism & dark mode UI component library
│   ├── db_tools.py             # Database connector generator & migrations orchestrator
│   ├── ai_copilot.py           # LLM route generator & error diagnosis engine
│   ├── deploy_tools.py         # Production deployment generator (Nginx, Docker, Cloud)
│   ├── doctor.py               # Platform diagnostics suite
│   └── studio.py               # Interactive terminal management console
├── cli/
│   ├── __init__.py             # CLI package init
│   └── commands.py             # Typer command definitions
└── tests/
    └── test_scaffold.py        # Automated test suite
```

---

## Quickstart & Installation

### 1. One-Line Global Install (Recommended)

**Windows (PowerShell as Administrator or User):**
```powershell
irm https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.ps1 | iex
```

**macOS / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.sh | bash
```

**Via Node.js / NPX (Zero-install):**
```bash
npx tiger-cli create-app my-app
```

---

### 2. Manual / Developer Setup

#### Prerequisites
- Python 3.9+ (Python 3.10+ recommended)
- Git

**Windows (PowerShell):**
```powershell
git clone https://github.com/IAR-010/tiger-cli.git
cd tiger-cli
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e .
```

**macOS / Linux:**
```bash
git clone https://github.com/IAR-010/tiger-cli.git
cd tiger-cli
python3 -m venv .venv
source .venv/bin/activate
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

### 5. AI Co-Pilot (Live LLM & Built-in Engine)
```bash
# Optional: Set an API key for live LLM intelligence (Gemini or OpenAI)
export GEMINI_API_KEY="your-gemini-key"
# or: export OPENAI_API_KEY="your-openai-key"

# Generate API routes from natural language
tiger ai route "Create a route to manage products with title, price, and inventory"

# Diagnose terminal errors or stack traces
tiger ai debug "RuntimeError: Task was destroyed but it is pending! coroutine was never awaited"
```

### 6. Production Deployment Automation
```bash
# Generate production Nginx reverse proxy config with SSL
tiger deploy nginx --domain app.mydomain.com --ssl

# Generate hardened multi-stage Docker Compose production file
tiger deploy docker --database PostgreSQL

# Generate cloud configuration & automated GitHub Actions CI/CD
tiger deploy cloud --provider "Cloud Run"
```

### 7. Environment Health Check (Tiger Doctor)
```bash
tiger doctor
```
Inspects Python, Git, Node.js, npm, Docker, and Docker Compose readiness.

### 8. Interactive Terminal Dashboard (Tiger Studio)
```bash
tiger studio
```
Launches an interactive, full-terminal dashboard providing a unified GUI inside your terminal to run migrations, inject UI components, generate AI routes, commit changes, and monitor project status.

---

## Running Automated Tests

```bash
pytest -v
```
