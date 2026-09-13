"""Environment Diagnostics Suite (Tiger Doctor) for developer prerequisite checks."""

import shutil
import subprocess
import sys
from typing import List, Dict, Any
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich import box

console = Console(safe_box=True)


def _check_command(cmd: List[str]) -> Dict[str, Any]:
    """Executes a version check command and captures output."""
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, check=False)
        if proc.returncode == 0:
            out = proc.stdout.strip() or proc.stderr.strip()
            # Return first line
            first_line = out.splitlines()[0] if out else "Installed"
            return {"status": "ok", "version": first_line}
        return {"status": "error", "message": proc.stderr.strip() or f"Exited with code {proc.returncode}"}
    except FileNotFoundError:
        return {"status": "missing", "message": "Command not found in PATH"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def run_diagnostics() -> Dict[str, Any]:
    """Runs all environment and toolchain diagnostic checks."""
    checks = {}

    # 1. Python
    py_ver = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    in_venv = hasattr(sys, "real_prefix") or (hasattr(sys, "base_prefix") and sys.base_prefix != sys.prefix)
    checks["Python"] = {
        "status": "ok" if sys.version_info >= (3, 9) else "warning",
        "detail": f"v{py_ver} ({'virtualenv active' if in_venv else 'global'})",
        "required": True,
    }

    # 2. Git
    git_res = _check_command(["git", "--version"])
    checks["Git"] = {
        "status": git_res["status"],
        "detail": git_res.get("version", git_res.get("message")),
        "required": True,
    }

    # 3. Node.js
    node_res = _check_command(["node", "--version"])
    checks["Node.js"] = {
        "status": node_res["status"],
        "detail": node_res.get("version", node_res.get("message")),
        "required": False,
    }

    # 4. npm
    npm_res = _check_command(["npm", "--version"])
    checks["npm"] = {
        "status": npm_res["status"],
        "detail": f"v{npm_res['version']}" if "version" in npm_res else npm_res.get("message"),
        "required": False,
    }

    # 5. Docker
    docker_res = _check_command(["docker", "--version"])
    checks["Docker"] = {
        "status": docker_res["status"],
        "detail": docker_res.get("version", docker_res.get("message")),
        "required": False,
    }

    # 6. Docker Compose
    compose_res = _check_command(["docker", "compose", "version"])
    checks["Docker Compose"] = {
        "status": compose_res["status"],
        "detail": compose_res.get("version", compose_res.get("message")),
        "required": False,
    }

    return checks


def display_diagnostics_report() -> bool:
    """Renders formatted diagnostics table and summary."""
    console.print("\n[bold yellow]🩺 Tiger Framework Health Check (tiger doctor)[/bold yellow]\n")

    checks = run_diagnostics()
    table = Table(box=box.ROUNDED, show_header=True)
    table.add_column("Component", style="bold cyan", width=18)
    table.add_column("Status", width=12)
    table.add_column("Details", style="white")

    all_required_ok = True
    for name, info in checks.items():
        st = info["status"]
        if st == "ok":
            status_text = "[bold green]✔ OK[/bold green]"
        elif st == "warning":
            status_text = "[bold yellow]⚠ Warning[/bold yellow]"
        elif st == "missing" and not info["required"]:
            status_text = "[dim yellow]Optional (Missing)[/dim yellow]"
        else:
            status_text = "[bold red]✖ Missing[/bold red]"
            if info["required"]:
                all_required_ok = False

        table.add_row(name, status_text, info["detail"])

    console.print(table)

    if all_required_ok:
        console.print(
            Panel(
                "[bold green]✔ All core prerequisites are met![/bold green]\n"
                "[dim]Your system is configured to build, scaffold, and run Tiger Framework applications.[/dim]",
                border_style="green",
                box=box.ROUNDED,
            )
        )
    else:
        console.print(
            Panel(
                "[bold red]✖ Some required prerequisites are missing or need attention.[/bold red]\n"
                "[dim]Please install or update the missing tools listed above.[/dim]",
                border_style="red",
                box=box.ROUNDED,
            )
        )

    return all_required_ok
