"""Comprehensive test suite for Tiger Framework CLI (Phase 1, 2 & 3)."""

import tempfile
from pathlib import Path
from typer.testing import CliRunner

from main import app
from core.scafold import ProjectConfig, get_project_blueprint, write_project_boilerplate
from core.ui_library import list_available_ui_components, inject_ui_component
from core.ai_copilot import generate_api_route, diagnose_code_issue
from core.db_tools import init_database, execute_migration
from core.deploy_tools import (
    generate_nginx_config,
    write_nginx_config,
    generate_docker_prod_compose,
    write_docker_prod_compose,
    generate_github_actions_ci_cd,
    write_cloud_deployment,
)
from core.doctor import run_diagnostics

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
    assert "deploy" in result.output
    assert "doctor" in result.output


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


def test_deployment_nginx_generator():
    """Verify Nginx reverse proxy configuration generation."""
    conf = generate_nginx_config("mycustomdomain.com", enable_ssl=True)
    assert "upstream backend_upstream" in conf
    assert "ssl_certificate" in conf
    assert "mycustomdomain.com" in conf

    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        dest = write_nginx_config(root, "mycustomdomain.com", enable_ssl=False)
        assert dest.exists()
        assert "proxy_pass http://backend_upstream;" in dest.read_text(encoding="utf-8")


def test_deployment_docker_prod():
    """Verify production Docker Compose configuration generation."""
    compose = generate_docker_prod_compose("saas-prod", "PostgreSQL")
    assert "backend:" in compose
    assert "postgres:" in compose
    assert "healthcheck:" in compose
    assert "restart: always" in compose

    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        dest = write_docker_prod_compose(root, "saas-prod", "MySQL")
        assert dest.exists()
        assert "mysql:" in dest.read_text(encoding="utf-8")


def test_deployment_cloud_and_ci_cd():
    """Verify Cloud & GitHub Actions CI/CD generation."""
    workflow = generate_github_actions_ci_cd("test-app", "Cloud Run")
    assert "Tiger CI/CD Pipeline" in workflow
    assert "docker-compose.prod.yml" in workflow

    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        files = write_cloud_deployment(root, "Fly.io")
        assert files["workflow"].exists()
        assert files["config"].exists()
        assert "app = " in files["config"].read_text(encoding="utf-8")


def test_doctor_diagnostics():
    """Verify Tiger Doctor diagnostics report runs without exception."""
    diag = run_diagnostics()
    assert "Python" in diag
    assert "Git" in diag
    assert diag["Python"]["status"] == "ok"
    assert diag["Git"]["status"] == "ok"


def test_llm_query_fallback():
    """Verify LLM query handles lack of API keys with safe fallback."""
    from core.ai_copilot import query_llm_api
    # With no key set or mock prompt, should return None
    res = query_llm_api("Test prompt", "System instruction")
    assert res is None or isinstance(res, str)


def test_studio_header_rendering():
    """Verify Studio header renders without exception."""
    from core.studio import display_studio_header
    with tempfile.TemporaryDirectory() as tmpdir:
        display_studio_header({"name": "test_app"}, Path(tmpdir))
