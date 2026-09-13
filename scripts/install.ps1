# Tiger Framework - Windows Terminal One-Line Installer
# Usage: irm https://raw.githubusercontent.com/<user>/tiger-cli/main/scripts/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "  _____ _                 " -ForegroundColor Yellow
Write-Host " |_   _(_) __ _  ___ _ __ " -ForegroundColor Yellow
Write-Host "   | | | |/ _` |/ _ \ '__|" -ForegroundColor Yellow
Write-Host "   | | | | (_| |  __/ |   " -ForegroundColor Yellow
Write-Host "   |_| |_|\__, |\___|_|   " -ForegroundColor Yellow
Write-Host "          |___/           " -ForegroundColor Yellow
Write-Host "   Tiger Framework CLI Installer for Windows" -ForegroundColor Cyan
Write-Host ""

# 1. Check Python installation
$pythonCmd = Get-Command "python" -ErrorAction SilentlyContinue
if (-not $pythonCmd) {
    $pythonCmd = Get-Command "py" -ErrorAction SilentlyContinue
}

if (-not $pythonCmd) {
    Write-Host "Error: Python 3.9+ was not found on your system." -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/downloads/ or Microsoft Store." -ForegroundColor Yellow
    Exit 1
}

$pyExe = $pythonCmd.Source
Write-Host "Found Python: $pyExe" -ForegroundColor Green

# 2. Setup Tiger directory in user home
$tigerHome = Join-Path $HOME ".tiger"
$venvDir = Join-Path $tigerHome "venv"
$binDir = Join-Path $tigerHome "bin"

New-Item -ItemType Directory -Force -Path $tigerHome | Out-Null
New-Item -ItemType Directory -Force -Path $binDir | Out-Null

Write-Host "Configuring Tiger environment in $tigerHome..." -ForegroundColor Cyan

# 3. Create virtual environment
if (-not (Test-Path $venvDir)) {
    Write-Host "Creating isolated virtual environment..." -ForegroundColor Gray
    & $pyExe -m venv $venvDir
}

$venvPython = Join-Path $venvDir "Scripts\python.exe"
$venvPip = Join-Path $venvDir "Scripts\pip.exe"

# 4. Install dependencies and Tiger CLI
Write-Host "Installing Tiger Framework..." -ForegroundColor Cyan
& $venvPython -m pip install --quiet --upgrade pip
& $venvPython -m pip install --quiet typer questionary rich

# Check if running from local tiger-cli repository or remote
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoDir = Split-Path -Parent $scriptDir
if (Test-Path (Join-Path $repoDir "pyproject.toml")) {
    & $venvPython -m pip install --quiet -e $repoDir
} else {
    & $venvPython -m pip install --quiet tiger-cli 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installing latest release from GitHub..." -ForegroundColor Gray
        & $venvPython -m pip install --quiet git+https://github.com/IAR-010/tiger-cli.git
    }
}

# 5. Create executable wrapper in .tiger\bin
$tigerExe = Join-Path $venvDir "Scripts\tiger.exe"
$cmdShim = Join-Path $binDir "tiger.cmd"
$psShim = Join-Path $binDir "tiger.ps1"

Set-Content -Path $cmdShim -Value "@echo off`r`n`"$tigerExe`" %*" -Encoding ASCII
Set-Content -Path $psShim -Value "& `"$tigerExe`" `$args" -Encoding ASCII

# 6. Add .tiger\bin to User PATH if not present
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$binDir*") {
    Write-Host "Adding Tiger to your User PATH..." -ForegroundColor Cyan
    $newPath = "$userPath;$binDir"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    $env:PATH += ";$binDir"
}

Write-Host ""
Write-Host "✔ Tiger Framework successfully installed!" -ForegroundColor Green
Write-Host ""
Write-Host "Quickstart:" -ForegroundColor Yellow
Write-Host "  tiger --help" -ForegroundColor White
Write-Host "  tiger create-app my-new-saas" -ForegroundColor White
Write-Host "  tiger studio" -ForegroundColor White
Write-Host ""
