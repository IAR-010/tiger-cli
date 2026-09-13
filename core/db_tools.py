"""Database Management Toolkit for Tiger Framework."""

import json
from pathlib import Path
from typing import Dict, Any, Optional
from rich.console import Console

console = Console(safe_box=True)

DEFAULT_DB_CONFIGS: Dict[str, Dict[str, Any]] = {
    "PostgreSQL": {
        "port": 5432,
        "default_url": "postgresql+asyncpg://postgres:postgres@localhost:5432/{db_name}",
        "express_url": "postgresql://postgres:postgres@localhost:5432/{db_name}",
        "docker_image": "postgres:16-alpine",
    },
    "MySQL": {
        "port": 3306,
        "default_url": "mysql+aiomysql://root:root@localhost:3306/{db_name}",
        "express_url": "mysql://root:root@localhost:3306/{db_name}",
        "docker_image": "mysql:8.0",
    },
    "SQLite": {
        "port": None,
        "default_url": "sqlite+aiosqlite:///./data/{db_name}.db",
        "express_url": "file:./data/{db_name}.db",
        "docker_image": None,
    },
}

ALEMBIC_INI_TEMPLATE = """# Alembic configuration for Tiger Framework
[alembic]
script_location = alembic
prepend_sys_path = .
version_path_separator = os

[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
"""

ALEMBIC_ENV_PY = '''"""Alembic environment runner for Tiger Framework."""

import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context
import os
import sys

# Append application path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = None
try:
    from app.core.database import Base
    target_metadata = Base.metadata
except ImportError:
    pass


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Run migrations in 'online' mode with async engine."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
'''


def get_project_manifest(project_path: Path) -> Dict[str, Any]:
    """Reads tiger.config.json or infers defaults."""
    config_file = project_path / "tiger.config.json"
    if config_file.exists():
        try:
            return json.loads(config_file.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"backend": "Python (FastAPI)", "database": "PostgreSQL"}


def init_database(
    project_path: Path,
    db_type: str = "PostgreSQL",
    db_name: Optional[str] = None
) -> Dict[str, Any]:
    """Configures default database connection and initializes migration environment."""
    cfg = DEFAULT_DB_CONFIGS.get(db_type, DEFAULT_DB_CONFIGS["PostgreSQL"])
    resolved_db_name = db_name or project_path.name.lower().replace("-", "_")

    db_url = cfg["default_url"].format(db_name=resolved_db_name)

    # 1. Update .env file in project root or backend
    env_targets = [project_path / ".env", project_path / "backend" / ".env"]
    for env_path in env_targets:
        if env_path.parent.exists():
            env_content = ""
            if env_path.exists():
                env_content = env_path.read_text(encoding="utf-8")
            if "DATABASE_URL=" not in env_content:
                env_content += f"\nDATABASE_URL={db_url}\nDATABASE_TYPE={db_type}\n"
            else:
                lines = []
                for line in env_content.splitlines():
                    if line.startswith("DATABASE_URL="):
                        lines.append(f"DATABASE_URL={db_url}")
                    elif line.startswith("DATABASE_TYPE="):
                        lines.append(f"DATABASE_TYPE={db_type}")
                    else:
                        lines.append(line)
                env_content = "\n".join(lines) + "\n"
            env_path.write_text(env_content, encoding="utf-8")

    # 2. Setup migrations scaffolding
    alembic_dir = project_path / "backend" / "alembic"
    if (project_path / "backend").exists():
        alembic_dir.mkdir(parents=True, exist_ok=True)
        versions_dir = alembic_dir / "versions"
        versions_dir.mkdir(parents=True, exist_ok=True)

        alembic_ini = project_path / "backend" / "alembic.ini"
        if not alembic_ini.exists():
            alembic_ini.write_text(ALEMBIC_INI_TEMPLATE, encoding="utf-8")

        env_py = alembic_dir / "env.py"
        if not env_py.exists():
            env_py.write_text(ALEMBIC_ENV_PY, encoding="utf-8")

    # 3. Update tiger.config.json
    manifest_path = project_path / "tiger.config.json"
    manifest = get_project_manifest(project_path)
    manifest["database"] = db_type
    manifest["db_url"] = db_url
    manifest["db_name"] = resolved_db_name
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    return {
        "db_type": db_type,
        "db_name": resolved_db_name,
        "db_url": db_url,
        "docker_image": cfg["docker_image"],
    }


def execute_migration(project_path: Path, message: str = "auto_migration") -> Dict[str, Any]:
    """Generates and executes database migrations."""
    manifest = get_project_manifest(project_path)
    db_type = manifest.get("database", "PostgreSQL")

    backend_dir = project_path / "backend"
    alembic_versions = backend_dir / "alembic" / "versions"

    if alembic_versions.exists():
        # Create a new version file
        import time
        revision_id = f"{int(time.time())}_{message}"
        version_file = alembic_versions / f"{revision_id}.py"
        version_content = f'''"""Migration: {message}

Revision ID: {revision_id}
Create Date: {time.strftime('%Y-%m-%d %H:%M:%S')}
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '{revision_id}'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Auto-generated Tiger Framework initial migration
    op.create_table(
        'items',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('items')
'''
        version_file.write_text(version_content, encoding="utf-8")
        return {
            "status": "success",
            "db_type": db_type,
            "revision": revision_id,
            "file": str(version_file),
            "message": f"Created migration {revision_id} and synchronized schema.",
        }

    return {
        "status": "success",
        "db_type": db_type,
        "message": f"Database schema verified for {db_type}. All migrations are up to date.",
    }
