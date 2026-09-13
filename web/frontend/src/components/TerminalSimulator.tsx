'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string[];
}

const PRESET_COMMANDS: Record<string, string[]> = {
  'tiger help': [
    'Tiger Framework Meta-Framework CLI v0.1.0',
    'Usage: tiger [OPTIONS] COMMAND [ARGS]...',
    '',
    'Commands:',
    '  create-app   Scaffold new full-stack app (FastAPI/Express + Next.js + DB)',
    '  make:ui      Inject 3D Glassmorphic UI components into frontend',
    '  push         One-command git init, stage, commit, and remote push',
    '  db           Database initialization & Alembic schema migrations',
    '  ai           AI route generator (tiger ai route) & debugger (tiger ai debug)',
    '  deploy       Generate production Nginx, Docker Compose, & CI/CD configs',
    '  doctor       Platform & toolchain diagnostics (Python, Git, Docker, Node)',
    '  studio       Launch interactive full-screen terminal management console',
  ],
  'tiger create-app my-saas': [
    'Initializing project setup for: my-saas',
    'Backend Stack: Python (FastAPI)',
    'Database: PostgreSQL',
    'Next.js Frontend: Included (Tailwind + 3D Glassmorphism)',
    '',
    'Generating project blueprint...',
    'Writing boilerplate files to my-saas...',
    '  [DIR]  backend/app/api',
    '  [FILE] backend/app/main.py',
    '  [DIR]  frontend/src/components/ui',
    '  [FILE] frontend/public/logo.png',
    '  [FILE] docker-compose.yml',
    '',
    '✔ Successfully created my-saas in 1.4s! Roar into production.',
  ],
  'tiger make:ui GlassCard': [
    'Scanning project configuration...',
    'Target directory: frontend/src/components/ui/GlassCard.tsx',
    '',
    'Injecting 3D Glassmorphic component [GlassCard]...',
    '  - Hardware-accelerated perspective transforms: enabled',
    '  - Reactive specular lighting: enabled',
    '  - Tailwind CSS dark-mode presets: injected',
    '',
    '✔ Injected GlassCard successfully!',
    'Usage: import { GlassCard } from "@/components/ui/GlassCard";',
  ],
  'tiger push': [
    'Staging changes with git add -A...',
    'Committing changes with message: "feat: autonomous tiger push"...',
    '✔ Changes committed successfully.',
    'Pushing to origin/main...',
    '✔ Successfully pushed to origin/main! (100% automated)',
  ],
  'tiger doctor': [
    'Diagnosing developer environment toolchain...',
    '  ✔ Python 3.13: Installed (e:/Tiger FramWork/tiger-cli/.venv)',
    '  ✔ Git: 2.45.0.windows.1 configured',
    '  ✔ Node.js: v22.14.0 & npm 10.9.2 ready',
    '  ✔ Docker: Docker Engine & Compose operational',
    '',
    'Tiger Health Score: 100% — System fully primed for high-velocity coding.',
  ],
  'tiger studio': [
    'Launching Tiger Studio Terminal GUI...',
    '  ┌────────────────────────────────────────────────────────┐',
    '  │  TIGER STUDIO v0.1.0 - Interactive Project Dashboard   │',
    '  │  Active Project: tiger-framework-web                   │',
    '  │  Backend: FastAPI | DB: PostgreSQL | UI: 3D Glass      │',
    '  ├────────────────────────────────────────────────────────┤',
    '  │  [1] Run DB Migrations        [4] Commit with Tiger Push│',
    '  │  [2] Inject UI Components     [5] Launch Dev Servers   │',
    '  │  [3] Generate AI API Route    [6] Exit Studio          │',
    '  └────────────────────────────────────────────────────────┘',
  ],
};

export default function TerminalSimulator() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'tiger create-app my-saas',
      output: PRESET_COMMANDS['tiger create-app my-saas'],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleRunCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const matchedKey = Object.keys(PRESET_COMMANDS).find(
      (k) => k.toLowerCase() === trimmed.toLowerCase()
    );

    const result = matchedKey
      ? PRESET_COMMANDS[matchedKey]
      : [
          `bash: command not recognized: "${trimmed}"`,
          'Type "tiger help" or choose a quick command button below.',
        ];

    setHistory((prev) => [...prev, { command: trimmed, output: result }]);
    setInputVal('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const copyTerminalText = () => {
    const fullText = history
      .map((h) => `$ ${h.command}\n${h.output.join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            tiger-shell — bash — 80x24
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={copyTerminalText}
            title="Copy Output"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <div className="p-5 font-mono text-xs md:text-sm text-slate-300 min-h-[320px] max-h-[440px] overflow-y-auto space-y-4">
        <div className="text-slate-500 text-xs">
          Tiger Framework Web Terminal Simulator [v0.1.0]
          <br />
          Type commands or click quick actions below to experience the velocity.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <span className="text-amber-400">tiger@developer</span>
              <span className="text-slate-500">:</span>
              <span className="text-blue-400">~/workspace</span>
              <span className="text-slate-500">$</span>
              <span>{item.command}</span>
            </div>
            <div className="text-slate-300 pl-4 border-l border-white/5 space-y-0.5">
              {item.output.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={
                    line.includes('✔')
                      ? 'text-emerald-400 font-medium'
                      : line.includes('Tiger Framework')
                      ? 'text-amber-300 font-bold'
                      : line.includes('Usage:') || line.includes('Commands:')
                      ? 'text-cyan-300'
                      : 'text-slate-300'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunCommand(inputVal);
          }}
          className="flex items-center gap-2 text-cyan-400 pt-1"
        >
          <span className="text-amber-400">tiger@developer</span>
          <span className="text-slate-500">:</span>
          <span className="text-blue-400">~/workspace</span>
          <span className="text-slate-500">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'tiger help', 'tiger push', 'clear'..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="text-xs px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 flex items-center gap-1 border border-cyan-500/30"
          >
            <Play className="w-3 h-3" /> Run
          </button>
        </form>
        <div ref={bottomRef} />
      </div>

      <div className="p-3 bg-slate-900/60 border-t border-white/5 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-mono">Quick Actions:</span>
        {Object.keys(PRESET_COMMANDS).map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}