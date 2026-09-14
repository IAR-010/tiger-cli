"""Tiger Studio: Interactive full-terminal management dashboard."""

import subprocess
import sys
from pathlib import Path
from typing import Optional
import questionary
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich import box

from core.db_tools import get_project_manifest, execute_migration
from core.git_tools import is_git_repo, run_git_cmd
from core.ui_library import list_available_ui_components, inject_ui_component
from core.doctor import display_diagnostics_report
from core.deploy_tools import write_docker_prod_compose, write_nginx_config

console = Console(safe_box=True)


def display_studio_header(manifest: dict, cwd: Path) -> None:
    """Renders the top status bar in Tiger Studio."""
    console.clear()
    console.print(
        Panel(
            r"""[bold yellow]
  _______ _____ _____ ______ _____     _____ _______ _    _ _____ _____ ____  
 |__   __|_   _/ ____|  ____|  __ \   / ____|__   __| |  | |  __ \_   _/ __ \ 
    | |    | || |  __| |__  | |__) | | (___    | |  | |  | | |  | || || |  | |
    | |    | || | |_ |  __| |  _  /   \___ \   | |  | |  | | |  | || || |  | |
    | |   _| || |__| | |____| | \ \   ____) |  | |  | |__| | |__| || || |__| |
    |_|  |_____\_____|______|_|  \_\ |_____/   |_|   \____/|_____/_____\____/ 
[/bold yellow]
 [bold cyan]Interactive Full-Stack Meta-Framework Console v0.1.0[/bold cyan]""",
            box=box.ROUNDED,
            border_style="yellow",
        )
    )

    # Status table
    table = Table(box=box.ROUNDED, show_header=True)
    table.add_column("Property", style="bold cyan", width=20)
    table.add_column("Status / Value", style="white")

    table.add_row("Active Project", manifest.get("name", cwd.name))
    table.add_row("Backend Stack", manifest.get("backend", "Python (FastAPI)"))
    table.add_row("Database Engine", manifest.get("database", "PostgreSQL"))
    table.add_row(
        "Frontend",
        "Next.js 16.3.5 App Router (3D Glassmorphism)"
        if manifest.get("frontend", True)
        else "None"
    )

    # Git status
    if is_git_repo(cwd):
        code, branch, _ = run_git_cmd(["rev-parse", "--abbrev-ref", "HEAD"], cwd)
        table.add_row("Git Repository", f"[green]Active (branch: {branch})[/green]")
    else:
        table.add_row("Git Repository", "[dim yellow]Not initialized (run tiger push)[/dim yellow]")

    console.print(table)


def launch_studio(cwd: Path) -> None:
    """Main loop for Tiger Studio interactive session."""
    manifest = get_project_manifest(cwd)

    while True:
        display_studio_header(manifest, cwd)

        choices = [
            "1. Run Database Migrations (tiger db migrate)",
            "2. Inject 3D Glassmorphic Component (tiger make:ui)",
            "3. Generate API Route with AI Co-Pilot (tiger ai route)",
            "4. Stage, Commit & Push to Git (tiger push)",
            "5. Generate Production Deployment Config (tiger deploy)",
            "6. Inspect System Toolchains (tiger doctor)",
            "7. Exit Studio",
        ]

        try:
            choice = questionary.select(
                "Choose an action to execute:",
                choices=choices,
                style=questionary.Style([
                    ("qmark", "fg:#e5c07b bold"),
                    ("question", "bold"),
                    ("selected", "fg:#61afef bold"),
                    ("pointer", "fg:#61afef bold"),
                ])
            ).ask()
        except Exception:
            from rich.prompt import Prompt
            choice = Prompt.ask("[bold]Enter choice [1-7][/bold]", choices=["1", "2", "3", "4", "5", "6", "7"], default="7")
            choice = [c for c in choices if c.startswith(choice)][0]

        if not choice or "Exit" in choice:
            console.print("\n[bold yellow]Exiting Tiger Studio. Happy coding! 🐅[/bold yellow]\n")
            break

        if "Migrations" in choice:
            console.print("\n[dim]Executing database migration...[/dim]")
            res = execute_migration(cwd, message="studio_sync")
            console.print(f"[bold green]✔ {res['message']}[/bold green]")
            input("\nPress Enter to continue...")

        elif "Glassmorphic" in choice:
            available = list_available_ui_components()
            comp = questionary.select("Select component:", choices=available).ask()
            if comp:
                dest = inject_ui_component(comp, cwd)
                console.print(f"\n[bold green]✔ Injected {comp} into {dest}[/bold green]")
            input("\nPress Enter to continue...")

        elif "AI Co-Pilot" in choice:
            prompt = questionary.text("Describe the route to generate:").ask()
            if prompt:
                from core.ai_copilot import generate_api_route
                gen = generate_api_route(prompt, manifest.get("backend", "fastapi"))
                dest = cwd / gen["dest_rel"]
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(gen["code"], encoding="utf-8")
                console.print(f"\n[bold green]✔ Generated {gen['filename']} and saved to {dest}[/bold green]")
            input("\nPress Enter to continue...")

        elif "Push" in choice:
            msg = questionary.text("Commit message:").ask()
            if msg:
                from core.git_tools import execute_tiger_push
                ok, res_msg = execute_tiger_push(cwd, msg)
                console.print(f"\n{'[bold green]✔' if ok else '[bold red]✖'} {res_msg}[/]")
            input("\nPress Enter to continue...")

        elif "Deployment" in choice:
            sub = questionary.select(
                "Deployment target:",
                choices=["Docker Compose Production", "Nginx Reverse Proxy", "GitHub Actions CI/CD"]
            ).ask()
            if sub and "Docker" in sub:
                write_docker_prod_compose(cwd, database=manifest.get("database", "PostgreSQL"))
                console.print("\n[bold green]✔ Generated docker-compose.prod.yml[/bold green]")
            elif sub and "Nginx" in sub:
                domain = questionary.text("Domain name:", default="example.com").ask() or "example.com"
                write_nginx_config(cwd, domain=domain, enable_ssl=False)
                console.print("\n[bold green]✔ Generated nginx/nginx.conf[/bold green]")
            input("\nPress Enter to continue...")

        elif "Doctor" in choice:
            display_diagnostics_report()
            input("\nPress Enter to continue...")
