#!/usr/bin/env bash
# Tiger Framework - macOS & Linux Terminal One-Line Installer
# Usage: curl -fsSL https://raw.githubusercontent.com/<user>/tiger-cli/main/scripts/install.sh | bash

set -e

echo ""
echo -e "\033[1;33m  _____ _                 \033[0m"
echo -e "\033[1;33m |_   _(_) __ _  ___ _ __ \033[0m"
echo -e "\033[1;33m   | | | |/ _\` |/ _ \ '__|\033[0m"
echo -e "\033[1;33m   | | | | (_| |  __/ |   \033[0m"
echo -e "\033[1;33m   |_| |_|\__, |\___|_|   \033[0m"
echo -e "\033[1;33m          |___/           \033[0m"
echo -e "\033[1;36m   Tiger Framework CLI Installer for macOS & Linux\033[0m"
echo ""

# 1. Check Python
PYTHON_BIN=""
for cmd in python3 python; do
  if command -v "$cmd" >/dev/null 2>&1; then
    PYTHON_BIN="$cmd"
    break
  fi
done

if [ -z "$PYTHON_BIN" ]; then
  echo -e "\033[1;31mError: Python 3.9+ was not found on your system.\033[0m"
  echo "Please install Python using your package manager (e.g., brew install python or apt install python3 python3-venv)."
  exit 1
fi

echo -e "\033[1;32mFound Python:\033[0m $($PYTHON_BIN --version)"

# 2. Setup directory
TIGER_HOME="$HOME/.tiger"
VENV_DIR="$TIGER_HOME/venv"
BIN_DIR="$TIGER_HOME/bin"

mkdir -p "$TIGER_HOME" "$BIN_DIR"

# 3. Virtualenv
if [ ! -d "$VENV_DIR" ]; then
  echo -e "\033[0;37mCreating isolated virtual environment in $VENV_DIR...\033[0m"
  $PYTHON_BIN -m venv "$VENV_DIR"
fi

VENV_PYTHON="$VENV_DIR/bin/python"
VENV_PIP="$VENV_DIR/bin/pip"

# 4. Install dependencies
echo -e "\033[1;36mInstalling Tiger Framework...\033[0m"
$VENV_PYTHON -m pip install --quiet --upgrade pip
$VENV_PYTHON -m pip install --quiet typer questionary rich

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "")"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
if [ -f "$REPO_DIR/pyproject.toml" ]; then
  $VENV_PYTHON -m pip install --quiet -e "$REPO_DIR"
else
  $VENV_PYTHON -m pip install --quiet tiger-cli
fi

# 5. Create wrapper in ~/.tiger/bin/tiger
cat << 'EOF' > "$BIN_DIR/tiger"
#!/usr/bin/env bash
exec "$HOME/.tiger/venv/bin/tiger" "$@"
EOF
chmod +x "$BIN_DIR/tiger"

# 6. Update PATH in shell profile
DETECTED_PROFILE=""
if [ -n "$ZSH_VERSION" ] || [ -f "$HOME/.zshrc" ]; then
  DETECTED_PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
  DETECTED_PROFILE="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
  DETECTED_PROFILE="$HOME/.bash_profile"
elif [ -f "$HOME/.profile" ]; then
  DETECTED_PROFILE="$HOME/.profile"
fi

if [ -n "$DETECTED_PROFILE" ]; then
  if ! grep -q ".tiger/bin" "$DETECTED_PROFILE"; then
    echo "" >> "$DETECTED_PROFILE"
    echo "# Tiger Framework CLI" >> "$DETECTED_PROFILE"
    echo 'export PATH="$HOME/.tiger/bin:$PATH"' >> "$DETECTED_PROFILE"
    echo -e "\033[1;36mAdded $BIN_DIR to $DETECTED_PROFILE\033[0m"
  fi
fi

echo ""
echo -e "\033[1;32m✔ Tiger Framework successfully installed!\033[0m"
echo ""
echo -e "\033[1;33mQuickstart:\033[0m"
echo "  export PATH=\"\$HOME/.tiger/bin:\$PATH\""
echo "  tiger --help"
echo "  tiger create-app my-new-saas"
echo "  tiger studio"
echo ""
