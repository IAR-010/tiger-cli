"""Version Control Automation (Tiger Git) for Tiger Framework."""

import subprocess
from pathlib import Path
from typing import Optional, Tuple
from rich.console import Console

console = Console(safe_box=True)


def run_git_cmd(args: list[str], cwd: Path) -> Tuple[int, str, str]:
    """Helper to run a git subprocess command cleanly."""
    try:
        proc = subprocess.run(
            ["git"] + args,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            check=False,
        )
        return proc.returncode, proc.stdout.strip(), proc.stderr.strip()
    except FileNotFoundError:
        return 127, "", "git executable not found in PATH"
    except Exception as e:
        return 1, "", str(e)


def is_git_installed() -> bool:
    """Checks if git CLI is accessible."""
    code, out, _ = run_git_cmd(["--version"], Path.cwd())
    return code == 0


def is_git_repo(path: Path) -> bool:
    """Checks if specified directory is inside an active git repository."""
    code, out, _ = run_git_cmd(["rev-parse", "--is-inside-work-tree"], path)
    return code == 0 and out.strip() == "true"


def init_git_repo(path: Path, default_branch: str = "main") -> bool:
    """Initializes a new git repository with default branch."""
    code, _, err = run_git_cmd(["init"], path)
    if code != 0:
        console.print(f"[bold red]Failed to initialize git repository: [/bold red]{err}")
        return False
    run_git_cmd(["branch", "-M", default_branch], path)
    return True


def has_remote(path: Path) -> bool:
    """Checks if at least one remote repository is configured."""
    code, out, _ = run_git_cmd(["remote"], path)
    return code == 0 and len(out.strip()) > 0


def execute_tiger_push(
    repo_path: Path,
    commit_message: str,
    target_remote: str = "origin",
    target_branch: Optional[str] = None
) -> Tuple[bool, str]:
    """
    Executes repository check, auto-initialization, add, commit, and push operations sequentially.
    """
    if not is_git_installed():
        return False, "Git is not installed or not available in the system PATH."

    # 1. Repository check & auto-initialization
    if not is_git_repo(repo_path):
        console.print("[dim]No git repository detected. Automatically running git init...[/dim]")
        if not init_git_repo(repo_path):
            return False, "Failed to initialize git repository."
        console.print("[bold green]✔ Initialized new git repository (main branch).[/bold green]")

    # 2. Stage changes (git add -A)
    console.print("[dim]Staging changes with git add -A...[/dim]")
    code, _, err = run_git_cmd(["add", "-A"], repo_path)
    if code != 0:
        return False, f"git add failed: {err}"

    # Check if there are changes to commit
    code, out, _ = run_git_cmd(["status", "--porcelain"], repo_path)
    if not out.strip():
        console.print("[yellow]Working directory is clean. No new changes to commit.[/yellow]")
    else:
        # 3. Commit changes (git commit -m ...)
        console.print(f"[dim]Committing changes with message: '{commit_message}'...[/dim]")
        code, commit_out, err = run_git_cmd(["commit", "-m", commit_message], repo_path)
        if code != 0 and "nothing to commit" not in err:
            return False, f"git commit failed: {err}"
        console.print("[bold green]✔ Changes committed successfully.[/bold green]")

    # 4. Check remote and push
    if not has_remote(repo_path):
        console.print("\n[bold yellow]Notice:[/bold yellow] No git remote is configured yet.")
        console.print("[dim]To link to a remote GitHub repository, run:[/dim]")
        console.print(f"  [cyan]git remote add origin https://github.com/<username>/<repo>.git[/cyan]")
        console.print(f"  [cyan]git push -u origin main[/cyan]")
        return True, "Committed locally. To push to GitHub, add a remote origin."

    # Determine branch
    branch = target_branch
    if not branch:
        code, branch_out, _ = run_git_cmd(["rev-parse", "--abbrev-ref", "HEAD"], repo_path)
        branch = branch_out.strip() if code == 0 else "main"

    console.print(f"[dim]Pushing to {target_remote}/{branch}...[/dim]")
    code, push_out, err = run_git_cmd(["push", "-u", target_remote, branch], repo_path)
    if code != 0:
        return False, f"git push encountered an issue: {err or push_out}"

    return True, f"Successfully pushed to {target_remote}/{branch}!"
