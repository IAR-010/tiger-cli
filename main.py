"""Main entry point for the Tiger Framework CLI application."""

import sys
from pathlib import Path
from typing import Optional

# Ensure tiger-cli directory is in sys.path for local executions
sys.path.insert(0, str(Path(__file__).resolve().parent))

import typer
from rich.console import Console
from cli.commands import register_commands, create_app

__version__ = "0.1.0"
console = Console()


def version_callback(value: bool) -> None:
    """Callback to print the Tiger CLI version and exit."""
    if value:
        console.print(f"[bold yellow]Tiger Framework CLI[/bold yellow] version: [bold cyan]{__version__}[/bold cyan]")
        raise typer.Exit()


app = typer.Typer(
    name="tiger",
    help="Tiger Framework - Command-line based full-stack meta-framework for scalable modern web apps.",
    add_completion=False,
    no_args_is_help=True,
    rich_markup_mode="rich",
)


@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        help="Show the application version and exit.",
        callback=version_callback,
        is_eager=True,
    ),
) -> None:
    """
    Tiger Framework CLI: Rapid full-stack scaffolding, database tools, git automation, and deployment.
    """
    pass


# Register commands from cli/commands.py
register_commands(app)


if __name__ == "__main__":
    app()
