# Contributing to Tiger Framework

First off, thank you for considering contributing to Tiger Framework! It's people like you who make open-source development fun and powerful.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat everyone in the community with respect and courtesy.

---

## How Can I Contribute?

- **Reporting Bugs:** Submit clear bug reports with reproducible steps via [GitHub Issues](https://github.com/IAR-010/tiger-cli/issues).
- **Suggesting Features:** Propose ideas for new scaffolding templates, 3D Glassmorphism components, or deployment targets.
- **Submitting Code:** Pick up an open issue or implement improvements and submit a Pull Request.
- **Improving Documentation:** Clarify README guides, tutorials, or inline docstrings.

---

## Development Setup

### 1. Fork & Clone
Fork the repository on GitHub and clone your fork locally:
\\\ash
git clone https://github.com/IAR-010/tiger-cli.git
cd tiger-cli
\\\

### 2. Set Up Virtual Environment
\\\ash
# Create virtual environment
python -m venv .venv

# Activate environment
# On Windows (PowerShell):
.\\.venv\\Scripts\\Activate.ps1
# On macOS / Linux:
source .venv/bin/activate
\\\

### 3. Install in Editable Mode
\\\ash
pip install -e .
\\\

### 4. Run Automated Tests
Before making changes, verify that the existing test suite passes:
\\\ash
pytest -v
\\\

---

## Project Architecture

\\\
tiger-cli/
├── main.py                     # Typer CLI application entry point
├── cli/
│   └── commands.py             # CLI commands registration (create-app, push, make:ui, etc.)
├── core/
│   ├── scaffold.py             # Project blueprints & code generator
│   ├── ui_library.py           # 3D Glassmorphic UI components
│   ├── git_tools.py            # Git automation engine
│   ├── db_tools.py             # Database connector & Alembic migrations
│   ├── ai_copilot.py           # AI route generator & terminal debugger
│   ├── deploy_tools.py         # Nginx, Docker, & CI/CD deployment
│   ├── doctor.py               # Toolchain inspector & diagnostics
│   └── studio.py               # Interactive terminal dashboard
└── tests/
    └── test_scaffold.py        # Automated pytest suite
\\\

---

## Pull Request Workflow

1. Create a descriptive branch:
   \\\ash
   git checkout -b feat/my-awesome-feature
   \\\
2. Write clean, readable code with type annotations.
3. Add corresponding test cases in \	ests/\.
4. Ensure all tests pass:
   \\\ash
   pytest
   \\\
5. Commit and push your changes:
   \\\ash
   tiger push -m \"feat: implement new glassmorphic component\"
   \\\
6. Open a Pull Request on [IAR-010/tiger-cli](https://github.com/IAR-010/tiger-cli/pulls).

---

## Community & Support

- GitHub Issues: [https://github.com/IAR-010/tiger-cli/issues](https://github.com/IAR-010/tiger-cli/issues)
- Organization: [https://github.com/IAR-010](https://github.com/IAR-010)
