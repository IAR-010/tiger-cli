"""Comprehensive test suite for Tiger Framework CLI (Phase 1 & Phase 2)."""

import tempfile
from pathlib import Path
from typer.testing import CliRunner

from main import app
from core.scafold import ProjectConfig, get_project_blueprint, write_project_boilerplate
from core.ui_library import list_available_ui_components, inject_ui_component
from core.ai_copilot import generate_api_route, diagnose_code_issue
from core.db_tools import init_database, execute_migration

runner = CliRunner()


def test_cli_version():
    """Verify --version returns 0.1.0."""
    result = runner.invoke(app, ["--version"])
    assert result.exit_code == 0
    assert "0.1.0" in result.output


def test_cli_help_includes_all_commands():
    """Verify all PRD commands are present in --help."""
    result = runner.invoke(app, ["--help"])
    assert result.exit_code == 0
    assert "create-app" in result.output
    assert "push" in result.output
    assert "make:ui" in result.output
    assert "db" in result.output
    assert "ai" in result.output


def test_boilerplate_generation_and_files():
    """Verify physical project boilerplate generation."""
    with tempfile.TemporaryDirectory() as tmpdir:
        target = Path(tmpdir) / "test_app"
        config = ProjectConfig(
            project_name="test_app",
            backend="Python (FastAPI)",
            database="PostgreSQL",
            include_frontend=True,
            target_dir=target,
        )
        write_project_boilerplate(config)

        # Check root files
        assert (target / "tiger.config.json").exists()
        assert (target / "docker-compose.yml").exists()
        assert (target / "README.md").exists()
        assert (target / ".gitignore").exists()

        # Check backend files
        assert (target / "backend" / "app" / "main.py").exists()
        assert (target / "backend" / "app" / "core" / "database.py").exists()
        assert (target / "backend" / "requirements.txt").exists()

        # Check frontend files
        assert (target / "frontend" / "package.json").exists()
        assert (target / "frontend" / "src" / "app" / "page.tsx").exists()
        assert (target / "frontend" / "src" / "components" / "ui" / "GlassCard.tsx").exists()


def test_ui_library_components():
    """Verify UI library lists components and injects properly."""
    comps = list_available_ui_components()
    assert "GlassCard" in comps
    assert "GlassNavbar" in comps
    assert "GlassButton" in comps

    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        dest = inject_ui_component("GlassNavbar", root)
        assert dest.exists()
        assert "GlassNavbar" in dest.read_text(encoding="utf-8")


def test_db_init_and_migrate():
    """Verify database configuration and migration generation."""
    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        backend = root / "backend"
        backend.mkdir()

        res_init = init_database(root, "PostgreSQL", "test_db")
        assert res_init["db_name"] == "test_db"
        assert (backend / ".env").exists()
        assert (backend / "alembic.ini").exists()

        res_migrate = execute_migration(root, message="test_schema")
        assert res_migrate["status"] == "success"
        assert "file" in res_migrate


def test_ai_copilot_route_and_debug():
    """Verify AI Co-Pilot route generation and debugging."""
    res_route = generate_api_route("Create a route to manage products with title and price", "fastapi")
    assert "product" in res_route["filename"]
    assert "APIRouter" in res_route["code"]
    assert "ProductCreate" in res_route["code"]

    res_diag = diagnose_code_issue("RuntimeError: Task was destroyed! coroutine was never awaited")
    assert "Un-awaited Coroutine" in res_diag["root_cause"]
