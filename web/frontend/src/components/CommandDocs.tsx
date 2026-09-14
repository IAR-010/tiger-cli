'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, Database, Sparkles, Server, GitBranch, Stethoscope, Monitor } from 'lucide-react';

interface CommandItem {
  id: string;
  category: 'Scaffold' | 'Git' | 'UI' | 'Database' | 'AI' | 'Deploy' | 'Doctor';
  name: string;
  command: string;
  description: string;
  flags: string;
  example: string;
}

const COMMANDS_DATA: CommandItem[] = [
  {
    id: 'create-app',
    category: 'Scaffold',
    name: 'Scaffold Full-Stack App',
    command: 'tiger create-app <name>',
    description: 'Scaffold an enterprise full-stack app with FastAPI or Express, PostgreSQL/MySQL/SQLite, and Next.js 14 with 3D Glassmorphism.',
    flags: '--backend, --database, --frontend, --non-interactive',
    example: 'tiger create-app my-saas --backend "Python (FastAPI)" --database PostgreSQL',
  },
  {
    id: 'push',
    category: 'Git',
    name: 'Autonomous Tiger Git',
    command: 'tiger push [message]',
    description: 'Check git repository, initialize if absent, stage all files (git add -A), commit, and push sequentially to remote origin.',
    flags: '-m, --message',
    example: 'tiger push -m "feat: completed authentication system"',
  },
  {
    id: 'make-ui',
    category: 'UI',
    name: 'Inject 3D Glassmorphic UI',
    command: 'tiger make:ui [component]',
    description: 'Inject production-ready React 18+ Tailwind CSS 3D Glassmorphic components into your frontend/src/components/ui directory.',
    flags: 'GlassCard, GlassNavbar, GlassButton, GlassModal, GlassStats',
    example: 'tiger make:ui GlassCard',
  },
  {
    id: 'db-init',
    category: 'Database',
    name: 'Initialize Database & Migrations',
    command: 'tiger db init',
    description: 'Configure multi-database connection pooling in .env and create Alembic / ORM migration environment.',
    flags: '--type [PostgreSQL|MySQL|SQLite], --name <db_name>',
    example: 'tiger db init --type PostgreSQL --name production_db',
  },
  {
    id: 'db-migrate',
    category: 'Database',
    name: 'Execute Schema Migration',
    command: 'tiger db migrate',
    description: 'Autogenerate and run database migrations to keep database schema synchronized with code models.',
    flags: '-m, --message <migration_name>',
    example: 'tiger db migrate -m "create_users_table"',
  },
  {
    id: 'ai-route',
    category: 'AI',
    name: 'AI Route Synthesizer',
    command: 'tiger ai route <prompt>',
    description: 'Generate production-ready FastAPI or Express route handlers, Pydantic schemas, and error checks using natural language.',
    flags: 'Requires optional GEMINI_API_KEY or OPENAI_API_KEY (has offline fallback)',
    example: 'tiger ai route "Create CRUD endpoints for managing subscriptions"',
  },
  {
    id: 'ai-debug',
    category: 'AI',
    name: 'AI Terminal Stack Debugger',
    command: 'tiger ai debug <error>',
    description: 'Diagnose runtime exceptions, database connection failures, and async crashes with actionable root-cause fixes.',
    flags: 'Can take pasted stack traces or log lines',
    example: 'tiger ai debug "OperationalError: could not connect to server: Connection refused"',
  },
  {
    id: 'deploy-nginx',
    category: 'Deploy',
    name: 'Nginx SSL Reverse Proxy',
    command: 'tiger deploy nginx',
    description: 'Generate hardened production Nginx reverse proxy configurations with automatic SSL certificates and rate-limiting.',
    flags: '--domain <domain>, --ssl/--no-ssl',
    example: 'tiger deploy nginx --domain api.example.com --ssl',
  },
  {
    id: 'deploy-docker',
    category: 'Deploy',
    name: 'Production Docker Compose',
    command: 'tiger deploy docker',
    description: 'Generate multi-stage Dockerfiles and hardened docker-compose.prod.yml with health checks and restart policies.',
    flags: '--database [PostgreSQL|MySQL|SQLite]',
    example: 'tiger deploy docker --database PostgreSQL',
  },
  {
    id: 'doctor',
    category: 'Doctor',
    name: 'Platform Diagnostics',
    command: 'tiger doctor',
    description: 'Inspect toolchain health including Python version, Git status, Node.js, npm, Docker Engine, and Docker Compose.',
    flags: 'No flags required',
    example: 'tiger doctor',
  },
  {
    id: 'studio',
    category: 'Scaffold',
    name: 'Interactive Terminal Studio',
    command: 'tiger studio',
    description: 'Launch an interactive full-terminal management dashboard with mouse and key navigation for all project workflows.',
    flags: 'Interactive TUI console',
    example: 'tiger studio',
  },
];

export default function CommandDocs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Scaffold', 'Git', 'UI', 'Database', 'AI', 'Deploy', 'Doctor'];

  const filteredCommands = selectedCategory === 'All'
    ? COMMANDS_DATA
    : COMMANDS_DATA.filter((c) => c.category === selectedCategory);

  const copyCommand = async (id: string, text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        return;
      }
    } catch {
      // fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };


  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Scaffold': return <Terminal className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Git': return <GitBranch className="w-3.5 h-3.5 text-zinc-400" />;
      case 'UI': return <Sparkles className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Database': return <Database className="w-3.5 h-3.5 text-zinc-400" />;
      case 'AI': return <Sparkles className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Deploy': return <Server className="w-3.5 h-3.5 text-zinc-400" />;
      case 'Doctor': return <Stethoscope className="w-3.5 h-3.5 text-zinc-400" />;
      default: return <Monitor className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800 max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-zinc-800 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.id}
            className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/50 text-zinc-300">
                  {getCategoryIcon(cmd.category)}
                  {cmd.category}
                </span>
                <span className="text-xs font-medium text-zinc-400">
                  {cmd.name}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {cmd.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <div className="flex items-center justify-between bg-zinc-950 rounded-lg px-3 py-2 border border-zinc-800 font-mono text-xs text-zinc-200">
                <span className="truncate">$ {cmd.example}</span>
                <button
                  onClick={() => copyCommand(cmd.id, cmd.example)}
                  className="ml-2 p-1 text-zinc-500 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-colors shrink-0"
                  title="Copy command"
                >
                  {copiedId === cmd.id ? (
                    <Check className="w-3.5 h-3.5 text-zinc-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 truncate">
                <span className="text-zinc-400 font-medium">Options:</span> {cmd.flags}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}