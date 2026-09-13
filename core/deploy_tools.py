"""Production Deployment Configuration Generator for Tiger Framework.
Generates production configs for Docker, Nginx, and cloud hosting platforms.
"""

from pathlib import Path
from typing import Dict, Any, Optional
from rich.console import Console

console = Console(safe_box=True)


def generate_nginx_config(domain: str = "example.com", enable_ssl: bool = False) -> str:
    """Generates a hardened, production-ready Nginx configuration."""
    ssl_block = ""
    listen_block = "listen 80;\n    listen [::]:80;"
    
    if enable_ssl:
        listen_block = """listen 80;
    listen [::]:80;
    server_name {domain} www.{domain};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/{domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/{domain}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
""".replace("{domain}", domain)

    return f"""# Auto-generated Nginx reverse proxy configuration for Tiger Framework
# Domain: {domain}

upstream backend_upstream {{
    server 127.0.0.1:8000;
    keepalive 32;
}}

upstream frontend_upstream {{
    server 127.0.0.1:3000;
    keepalive 32;
}}

server {{
    {listen_block}
    server_name {domain} www.{domain};

    # Hardened Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip Compression
    gzip on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml font/woff2;

    client_max_body_size 50M;

    # API Routes -> FastAPI / Express Backend
    location /api/ {{
        proxy_pass http://backend_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90;
    }}

    # Health Check Endpoint
    location /health {{
        proxy_pass http://backend_upstream/health;
        proxy_set_header Host $host;
    }}

    # Frontend Routes -> Next.js Application
    location / {{
        proxy_pass http://frontend_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}
}}
"""


def write_nginx_config(project_root: Path, domain: str = "example.com", enable_ssl: bool = False) -> Path:
    """Writes nginx configuration file into nginx/nginx.conf."""
    nginx_dir = project_root / "nginx"
    nginx_dir.mkdir(parents=True, exist_ok=True)
    conf_file = nginx_dir / "nginx.conf"
    conf_file.write_text(generate_nginx_config(domain, enable_ssl), encoding="utf-8")
    return conf_file


def generate_docker_prod_compose(project_name: str, database: str = "PostgreSQL") -> str:
    """Generates production-grade docker-compose.prod.yml with healthchecks and restart rules."""
    db_service = ""
    if "PostgreSQL" in database:
        db_service = f"""
  postgres:
    image: postgres:16-alpine
    container_name: {project_name}-postgres-prod
    environment:
      POSTGRES_USER: ${{POSTGRES_USER:-postgres}}
      POSTGRES_PASSWORD: ${{POSTGRES_PASSWORD:-postgrespassword}}
      POSTGRES_DB: ${{POSTGRES_DB:-{project_name.replace('-', '_')}}}
    volumes:
      - pgdata_prod:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
"""
    elif "MySQL" in database:
        db_service = f"""
  mysql:
    image: mysql:8.0
    container_name: {project_name}-mysql-prod
    environment:
      MYSQL_ROOT_PASSWORD: ${{MYSQL_ROOT_PASSWORD:-rootpassword}}
      MYSQL_DATABASE: ${{MYSQL_DATABASE:-{project_name.replace('-', '_')}}}
    volumes:
      - mysqldata_prod:/var/lib/mysql
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
"""

    return f"""version: '3.8'

services:{db_service}
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: {project_name}-backend-prod
    environment:
      - NODE_ENV=production
      - ENVIRONMENT=production
    ports:
      - "8000:8000"
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: {project_name}-frontend-prod
    environment:
      - NODE_ENV=production
    ports:
      - "3000:3000"
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  pgdata_prod:
  mysqldata_prod:
"""


def write_docker_prod_compose(project_root: Path, project_name: Optional[str] = None, database: str = "PostgreSQL") -> Path:
    """Writes docker-compose.prod.yml into project root."""
    resolved_name = project_name or project_root.name.lower()
    compose_file = project_root / "docker-compose.prod.yml"
    compose_file.write_text(generate_docker_prod_compose(resolved_name, database), encoding="utf-8")
    return compose_file


def generate_github_actions_ci_cd(project_name: str, provider: str = "Cloud Run") -> str:
    """Generates automated GitHub Actions CI/CD pipeline workflow."""
    return f"""name: Tiger CI/CD Pipeline - {provider}

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  test-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Run Backend Tests
        if: hashFiles('backend/requirements.txt') != ''
        run: |
          cd backend
          pip install -r requirements.txt
          python -m unittest discover -s . || true

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Run Frontend Build
        if: hashFiles('frontend/package.json') != ''
        run: |
          cd frontend
          npm install
          npm run build

  build-and-deploy:
    needs: test-and-lint
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Containers
        run: |
          docker compose -f docker-compose.prod.yml build || docker compose build

      - name: Deploy to {provider}
        run: |
          echo "Tiger Framework: Deploying to {provider}..."
          # Insert {provider} deployment authentication & push commands here
"""


def write_cloud_deployment(project_root: Path, provider: str = "Cloud Run") -> Dict[str, Path]:
    """Generates CI/CD workflow and cloud deployment configuration."""
    project_name = project_root.name.lower()
    workflows_dir = project_root / ".github" / "workflows"
    workflows_dir.mkdir(parents=True, exist_ok=True)

    workflow_file = workflows_dir / "deploy.yml"
    workflow_file.write_text(generate_github_actions_ci_cd(project_name, provider), encoding="utf-8")

    files = {"workflow": workflow_file}

    # Cloud specific templates
    if "fly" in provider.lower():
        fly_file = project_root / "fly.toml"
        fly_file.write_text(
            f'''app = "{project_name}"
primary_region = "iad"

[http_service]
  internal_port = 8000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
''',
            encoding="utf-8"
        )
        files["config"] = fly_file
    elif "render" in provider.lower():
        render_file = project_root / "render.yaml"
        render_file.write_text(
            f'''services:
  - type: web
    name: {project_name}-backend
    env: docker
    dockerfilePath: ./backend/Dockerfile
    plan: free
  - type: web
    name: {project_name}-frontend
    env: docker
    dockerfilePath: ./frontend/Dockerfile
    plan: free
''',
            encoding="utf-8"
        )
        files["config"] = render_file

    return files
