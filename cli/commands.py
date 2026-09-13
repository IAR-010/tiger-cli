"""CLI command definitions for Tiger Framework."""

import sys
from pathlib import Path
from typing import Optional, List

import questionary
import typer
from rich.console import Console
from rich.panel import Panel
from rich.syntax import Syntax
from rich.table import Table
from rich import box

from core.scafold import (
    ProjectConfig,
    display_scaffold_preview,
    write_project_boilerplate,
)
from core.git_tools import execute_tiger_push
from core.ui_library import (
    inject_ui_component,
    list_available_ui_components,
    COMPONENTS_REGISTRY,
)
from core.db_tools import init_database, execute_migration
from core.ai_copilot import generate_api_route, diagnose_code_issue

console = Console(safe_box=True)

db_app = typer.Typer(help="Database initialization and migration toolkit", no_args_is_help=True)
ai_app = typer.Typer(help="AI Co-Pilot for route generation and terminal debugging", no_args_is_help=True)


def _ask_choice(message: str, choices: list) -> Optional[str]:
    """Prompts the user with Questionary, falling back gracefully if no console buffer exists."""
    try:
        return questionary.select(
            message,
            choices=choices,
            style=questionary.Style([
                ("qmark", "fg:#e5c07b bold"),
                ("question", "bold"),
                ("selected", "fg:#61afef bold"),
                ("pointer", "fg:#61afef bold"),
            ]),
        ).ask()
    except Exception:
        from rich.prompt import Prompt
        return Prompt.ask(f"[bold]{message}[/bold]", choices=choices, default=choices[0])


def prompt_user_selections(project_name: str) -> Optional[ProjectConfig]:
    """Runs interactive Questionary menus to collect project configuration."""
    console.print(f"\n[bold yellow]Initializing project setup for:[/bold yellow] [bold cyan]{project_name}[/bold cyan]\n")

    # Question 1: Backend Stack
    backend = _ask_choice(
        "What backend stack do you want to use?",
        choices=[
            "Python (FastAPI)",
            "Node.js (Express)",
        ],
    )
    if backend is None:
        console.print("\n[yellow]Project creation cancelled.[/yellow]")
        return None

    # Question 2: Database
    database = _ask_choice(
        "What database?",
        choices=[
            "PostgreSQL",
            "MySQL",
            "SQLite",
        ],
    )
    if database is None:
        console.print("\n[yellow]Project creation cancelled.[/yellow]")
        return None

    # Question 3: Frontend
    frontend_answer = _ask_choice(
        "Include Next.js frontend with Tailwind and Glassmorphism?",
        choices=[
            "Yes (Recommended)",
            "No",
        ],
    )
    if frontend_answer is None:
        console.print("\n[yellow]Project creation cancelled.[/yellow]")
        return None

    include_frontend = "Yes" in frontend_answer
    target_dir = Path.cwd() / project_name

    return ProjectConfig(
        project_name=project_name,
        backend=backend,
        database=database,
        include_frontend=include_frontend,
        target_dir=target_dir,
    )


# --- 1. create-app command ---
def create_app(
    project_name: str = typer.Argument(
        ...,
        help="The name of the project to create.",
        metavar="<projectName>"
    ),
    backend: Optional[str] = typer.Option(
        None,
        "--backend",
        "-b",
        help="Backend stack [Python (FastAPI), Node.js (Express)]."
    ),
    database: Optional[str] = typer.Option(
        None,
        "--database",
        "-d",
        help="Database [PostgreSQL, MySQL, SQLite]."
    ),
    frontend: Optional[bool] = typer.Option(
        None,
        "--frontend/--no-frontend",
        help="Include Next.js frontend with Tailwind and Glassmorphism."
    ),
    generate: bool = typer.Option(
        True,
        "--generate/--dry-run",
        help="Write boilerplate files to disk, or dry-run blueprint preview only."
    ),
    non_interactive: bool = typer.Option(
        False,
        "--non-interactive",
        help="Run without interactive prompts (uses flags or defaults)."
    )
) -> None:
    """
    Create a new full-stack project with Tiger Framework.
    """
    if non_interactive or (backend is not None and database is not None and frontend is not None):
        selected_backend = backend or "Python (FastAPI)"
        selected_database = database or "PostgreSQL"
        include_frontend = frontend if frontend is not None else True
        target_dir = Path.cwd() / project_name

        config = ProjectConfig(
            project_name=project_name,
            backend=selected_backend,
            database=selected_database,
            include_frontend=include_frontend,
            target_dir=target_dir,
        )
    else:
        config = prompt_user_selections(project_name)
        if config is None:
            raise typer.Exit(code=1)

    # Display preview tree & summary
    display_scaffold_preview(config)

    # Generate files if requested
    if generate:
        console.print(f"\n[dim]Generating project boilerplate in[/dim] [bold cyan]{config.target_dir.resolve()}[/bold cyan]...")
        write_project_boilerplate(config)
        console.print(
            Panel(
                f"[bold green]✔ Successfully created {config.project_name}![/bold green]\n\n"
                f"[yellow]Next steps:[/yellow]\n"
                f"  1. [cyan]cd {config.project_name}[/cyan]\n"
                f"  2. [cyan]docker compose up -d[/cyan]  (or run locally)\n"
                f"  3. [cyan]tiger push[/cyan]               (single-command git setup)",
                border_style="green",
                box=box.ROUNDED,
            )
        )


# --- 2. tiger push command ---
def push(
    message: Optional[str] = typer.Option(
        None,
        "--message",
        "-m",
        help="Git commit message."
    ),
    remote: str = typer.Option(
        "origin",
        "--remote",
        "-r",
        help="Git remote repository name."
    ),
    branch: Optional[str] = typer.Option(
        None,
        "--branch",
        "-b",
        help="Target branch to push to (defaults to current branch/main)."
    )
) -> None:
    """
    Automate Git repository initialization, staging, committing, and pushing.
    """
    if not message:
        try:
            message = questionary.text("Enter commit message:").ask()
        except Exception:
            from rich.prompt import Prompt
            message = Prompt.ask("[bold]Enter commit message[/bold]", default="Update project files via Tiger CLI")

    if not message or not message.strip():
        console.print("[yellow]Aborted: Commit message is required.[/yellow]")
        raise typer.Exit(code=1)

    repo_path = Path.cwd()
    success, result_msg = execute_tiger_push(
        repo_path=repo_path,
        commit_message=message.strip(),
        target_remote=remote,
        target_branch=branch,
    )

    if not success:
        console.print(f"\n[bold red]✖ {result_msg}[/bold red]")
        raise typer.Exit(code=1)
    else:
        console.print(f"\n[bold green]✔ {result_msg}[/bold green]")


# --- 3. tiger make:ui command ---
def make_ui(
    component: Optional[str] = typer.Argument(
        None,
        help="Name of the 3D Glassmorphism component to inject (e.g. GlassCard, GlassNavbar)."
    )
) -> None:
    """
    Inject 3D Glassmorphism and dark mode UI components into the frontend.
    """
    available = list_available_ui_components()

    if not component or component not in available:
        console.print("[bold cyan]Available 3D Glassmorphic UI Components:[/bold cyan]")
        table = Table(box=box.ROUNDED, show_header=True)
        table.add_column("Component", style="bold yellow")
        table.add_column("Description", style="dim white")
        for comp in available:
            table.add_row(comp, COMPONENTS_REGISTRY[comp]["description"])
        console.print(table)

        selected = _ask_choice(
            "Select UI component to inject:",
            choices=available,
        )
        if not selected:
            raise typer.Exit(code=1)
        component = selected

    try:
        dest_path = inject_ui_component(component, Path.cwd())
        console.print(
            Panel(
                f"[bold green]✔ Injected {component} successfully![/bold green]\n"
                f"[dim]File path:[/dim] [white]{dest_path}[/white]\n\n"
                f"[yellow]Usage in React/Next.js:[/yellow]\n"
                f"  [cyan]import {{ {component} }} from \"@/components/ui/{component}\";[/cyan]",
                border_style="green",
                box=box.ROUNDED,
            )
        )
    except Exception as e:
        console.print(f"[bold red]Failed to inject component: [/bold red]{e}")
        raise typer.Exit(code=1)


# --- 4. Database Commands (tiger db init, tiger db migrate) ---
@db_app.command(name="init")
def db_init(
    db_type: Optional[str] = typer.Option(
        None,
        "--type",
        "-t",
        help="Database type [PostgreSQL, MySQL, SQLite]."
    ),
    db_name: Optional[str] = typer.Option(
        None,
        "--name",
        "-n",
        help="Database name."
    )
) -> None:
    """
    Configure default database connections and initialize migration scaffolding.
    """
    if not db_type:
        db_type = _ask_choice(
            "Select database engine:",
            choices=["PostgreSQL", "MySQL", "SQLite"],
        )
        if not db_type:
            raise typer.Exit(code=1)

    result = init_database(Path.cwd(), db_type=db_type, db_name=db_name)
    console.print(
        Panel(
            f"[bold green]✔ Database initialized successfully![/bold green]\n"
            f"[dim]Engine:   [/dim][bold white]{result['db_type']}[/bold white]\n"
            f"[dim]Database: [/dim][cyan]{result['db_name']}[/cyan]\n"
            f"[dim]URL:      [/dim][white]{result['db_url']}[/white]\n"
            f"[dim]Docker:   [/dim][white]{result['docker_image'] or 'Embedded SQLite'}[/white]\n\n"
            f"[yellow]Next:[/yellow] Run [cyan]tiger db migrate[/cyan] to synchronize database schemas.",
            border_style="green",
            box=box.ROUNDED,
        )
    )


@db_app.command(name="migrate")
def db_migrate(
    message: str = typer.Option(
        "update_schema",
        "--message",
        "-m",
        help="Migration revision description."
    )
) -> None:
    """
    Execute schema updates and table migrations.
    """
    console.print("[dim]Checking database schema status...[/dim]")
    result = execute_migration(Path.cwd(), message=message)
    console.print(
        Panel(
            f"[bold green]✔ {result['message']}[/bold green]\n"
            + (f"[dim]Migration file:[/dim] [white]{result['file']}[/white]\n" if "file" in result else "")
            + f"[dim]Database:[/dim] [cyan]{result['db_type']}[/cyan]",
            border_style="green",
            box=box.ROUNDED,
        )
    )


# --- 5. AI Commands (tiger ai route, tiger ai debug) ---
@ai_app.command(name="route")
def ai_route(
    prompt: str = typer.Argument(
        ...,
        help="Natural language prompt describing the API route to generate."
    ),
    save: bool = typer.Option(
        True,
        "--save/--print-only",
        help="Save generated route file directly into the backend or print only."
    ),
    backend_type: str = typer.Option(
        "fastapi",
        "--backend",
        "-b",
        help="Backend type [fastapi, express]."
    )
) -> None:
    """
    Generate API routing logic and code snippets using AI Co-Pilot.
    """
    console.print(f"\n[bold yellow]🤖 Tiger AI Co-Pilot generating route for:[/bold yellow] \"{prompt}\"...\n")
    gen = generate_api_route(prompt, backend_type)

    # Highlighted code preview
    syntax = Syntax(
        gen["code"],
        "python" if "fastapi" in backend_type.lower() else "typescript",
        theme="monokai",
        line_numbers=True
    )
    console.print(
        Panel(
            syntax,
            title=f"[bold green]Generated Route: {gen['filename']}[/bold green]",
            border_style="cyan",
            box=box.ROUNDED,
        )
    )

    if save:
        dest_file = Path.cwd() / gen["dest_rel"]
        dest_file.parent.mkdir(parents=True, exist_ok=True)
        dest_file.write_text(gen["code"], encoding="utf-8")
        console.print(f"[bold green]✔ Saved to:[/bold green] [white]{dest_file.resolve()}[/white]")


@ai_app.command(name="debug")
def ai_debug(
    target: str = typer.Argument(
        ...,
        help="Error text, log snippet, or path to file containing errors."
    )
) -> None:
    """
    Analyze terminal errors and code snippets with AI debugging diagnostics.
    """
    content = target
    target_path = Path(target)
    if target_path.exists() and target_path.is_file():
        content = target_path.read_text(encoding="utf-8")

    diag = diagnose_code_issue(content)

    console.print(
        Panel(
            f"[bold red]Diagnostic:[/bold red] [bold white]{diag['root_cause']}[/bold white]\n\n"
            f"[yellow]Root Cause Analysis:[/yellow]\n{diag['explanation']}\n\n"
            f"[bold green]Recommended Fix:[/bold green]\n{diag['suggestion']}",
            title="[bold yellow]Tiger AI Debugger[/bold yellow]",
            border_style="yellow",
            box=box.ROUNDED,
        )
    )


# --- 6. Deployment Commands (tiger deploy nginx, docker, cloud) ---
deploy_app = typer.Typer(
    help="Production deployment configuration generator (Docker, Nginx, Cloud)",
    no_args_is_help=True
)


@deploy_app.command(name="nginx")
def deploy_nginx(
    domain: str = typer.Option(
        "example.com",
        "--domain",
        "-d",
        help="Production domain name for Nginx."
    ),
    ssl: bool = typer.Option(
        False,
        "--ssl/--no-ssl",
        help="Enable Let's Encrypt SSL/TLS reverse proxy blocks."
    )
) -> None:
    """Generate production-ready Nginx reverse proxy configuration."""
    from core.deploy_tools import write_nginx_config

    conf_file = write_nginx_config(Path.cwd(), domain=domain, enable_ssl=ssl)
    console.print(
        Panel(
            f"[bold green]✔ Nginx configuration generated successfully![/bold green]\n"
            f"[dim]File path:[/dim] [white]{conf_file.resolve()}[/white]\n"
            f"[dim]Domain:[/dim]    [cyan]{domain}[/cyan]\n"
            f"[dim]SSL/TLS:[/dim]   {'[bold green]Enabled (Port 443)[/bold green]' if ssl else '[yellow]HTTP (Port 80)[/yellow]'}",
            border_style="green",
            box=box.ROUNDED,
        )
    )


@deploy_app.command(name="docker")
def deploy_docker(
    database: str = typer.Option(
        "PostgreSQL",
        "--database",
        "-d",
        help="Database engine [PostgreSQL, MySQL, SQLite]."
    )
) -> None:
    """Generate production-hardened multi-stage docker-compose.prod.yml configuration."""
    from core.deploy_tools import write_docker_prod_compose

    compose_file = write_docker_prod_compose(Path.cwd(), database=database)
    console.print(
        Panel(
            f"[bold green]✔ Production Docker Compose generated successfully![/bold green]\n"
            f"[dim]File path:[/dim] [white]{compose_file.resolve()}[/white]\n\n"
            f"[yellow]To deploy:[/yellow]\n"
            f"  [cyan]docker compose -f docker-compose.prod.yml up -d --build[/cyan]",
            border_style="green",
            box=box.ROUNDED,
        )
    )


@deploy_app.command(name="cloud")
def deploy_cloud(
    provider: Optional[str] = typer.Option(
        None,
        "--provider",
        "-p",
        help="Target cloud provider [Cloud Run, Fly.io, Render, Railway, AWS ECS]."
    )
) -> None:
    """Generate Cloud deployment templates and automated GitHub Actions CI/CD workflows."""
    from core.deploy_tools import write_cloud_deployment

    if not provider:
        provider = _ask_choice(
            "Select target cloud provider:",
            choices=["Cloud Run", "Fly.io", "Render", "Railway", "AWS ECS"],
        )
        if not provider:
            raise typer.Exit(code=1)

    files = write_cloud_deployment(Path.cwd(), provider=provider)
    console.print(
        Panel(
            f"[bold green]✔ Cloud deployment & CI/CD workflow generated for {provider}![/bold green]\n"
            f"[dim]Workflow:[/dim] [white]{files['workflow'].resolve()}[/white]\n"
            + (f"[dim]Config:[/dim]   [white]{files['config'].resolve()}[/white]\n" if "config" in files else "")
            + f"\n[yellow]Continuous Deployment:[/yellow] Any push to [cyan]main[/cyan] branch triggers automated build & deploy.",
            border_style="green",
            box=box.ROUNDED,
        )
    )


# --- 7. Diagnostics Command (tiger doctor) ---
def doctor() -> None:
    """Inspect developer toolchain, versions, and system health."""
    from core.doctor import display_diagnostics_report

    all_ok = display_diagnostics_report()
    if not all_ok:
        raise typer.Exit(code=1)


# --- Registration Helper ---
def register_commands(app: typer.Typer) -> None:
    """Registers all commands onto the main Typer application."""
    app.command(name="create-app", help="Scaffold a new full-stack project with interactive setup.")(create_app)
    app.command(name="push", help="Automate Git repo initialization, commit, and push.")(push)
    app.command(name="make:ui", help="Inject 3D Glassmorphism & dark mode UI components.")(make_ui)
    app.command(name="doctor", help="Inspect developer toolchain and environment health.")(doctor)
    app.add_typer(db_app, name="db")
    app.add_typer(ai_app, name="ai")
    app.add_typer(deploy_app, name="deploy")
