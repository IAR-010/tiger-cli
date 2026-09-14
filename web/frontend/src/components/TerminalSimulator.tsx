'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  Copy,
  Check,
  Folder,
  FileCode,
  Package,
  Database,
  CheckCircle2,
  Loader2,
  Sparkles
} from 'lucide-react';

interface TerminalLine {
  text: string;
  type?: 'info' | 'success' | 'dir' | 'file' | 'progress' | 'header';
  percent?: number;
  speed?: string;
  size?: string;
  gradient?: string;
}

interface CommandExecution {
  command: string;
  lines: TerminalLine[];
  isRunning?: boolean;
  isTyping?: boolean;
}

const getCreateAppFlow = (appName: string): TerminalLine[] => [
  { text: `⚡ Tiger Scaffold Engine v0.1.0 — Initializing: ${appName}`, type: 'header' },
  { text: '⚙️  Stack: Python (FastAPI) + PostgreSQL 16 + Next.js v16.3.5 (App Router)', type: 'info' },
  { text: '🌐 Connecting to package registry (npm / PyPI / tiger-cdn)...', type: 'info' },
  { text: 'Downloading core template package (fastapi-nextjs-starter.tar.gz)...', type: 'progress', percent: 18, speed: '14.2 MB/s', size: '2.5 MB / 14 MB' },
  { text: 'Downloading core template package (fastapi-nextjs-starter.tar.gz)...', type: 'progress', percent: 45, speed: '19.8 MB/s', size: '6.3 MB / 14 MB' },
  { text: 'Downloading core template package (fastapi-nextjs-starter.tar.gz)...', type: 'progress', percent: 74, speed: '22.4 MB/s', size: '10.4 MB / 14 MB' },
  { text: 'Downloading core template package (fastapi-nextjs-starter.tar.gz)...', type: 'progress', percent: 100, speed: '24.1 MB/s', size: '14.0 MB / 14 MB' },
  { text: `📁 ${appName}/backend/app/api (REST endpoint router)`, type: 'dir' },
  { text: `📁 ${appName}/backend/app/core (Config, DB session & security)`, type: 'dir' },
  { text: `📄 ${appName}/backend/app/main.py (FastAPI Async lifespan)`, type: 'file' },
  { text: `📁 ${appName}/frontend/src/app (Next.js 16.3.5 App Router)`, type: 'dir' },
  { text: `📁 ${appName}/frontend/src/components/ui (3D Glassmorphism library)`, type: 'dir' },
  { text: `📄 ${appName}/frontend/public/logo.png (3D Tiger brand asset)`, type: 'file' },
  { text: `📄 ${appName}/docker-compose.yml (PostgreSQL 16 + Nginx SSL proxy)`, type: 'file' },
  { text: `📄 ${appName}/tiger.lock (Cryptographic SHA-256 watermark signature)`, type: 'file' },
  { text: 'Installing NPM dependencies (next@16.3.5, react@latest, tailwindcss)...', type: 'progress', percent: 22, speed: '36 pkgs/s', size: '24 / 108 packages' },
  { text: 'Installing NPM dependencies (next@16.3.5, react@latest, tailwindcss)...', type: 'progress', percent: 55, speed: '52 pkgs/s', size: '60 / 108 packages' },
  { text: 'Installing NPM dependencies (next@16.3.5, react@latest, tailwindcss)...', type: 'progress', percent: 84, speed: '65 pkgs/s', size: '91 / 108 packages' },
  { text: 'Installing NPM dependencies (next@16.3.5, react@latest, tailwindcss)...', type: 'progress', percent: 100, speed: 'Complete', size: '108 packages installed' },
  { text: `✔ Project ${appName} created successfully in 1.4s! Roar into production.`, type: 'success' },
  { text: `👉 Get started: cd ${appName} && npm run dev`, type: 'info' },
];

const LIVE_COMMAND_FLOWS: Record<string, TerminalLine[]> = {
  'tiger create-app my-saas': getCreateAppFlow('my-saas'),
  'tiger make:ui GlassCard': [
    { text: '🔍 Scanning project structure: frontend/src/components/ui', type: 'header' },
    { text: 'Compiling hardware-accelerated 3D component [GlassCard]...', type: 'progress', percent: 30, speed: '60 fps', size: 'Compiling shaders' },
    { text: 'Compiling hardware-accelerated 3D component [GlassCard]...', type: 'progress', percent: 75, speed: '60 fps', size: 'Optimizing geometry' },
    { text: 'Compiling hardware-accelerated 3D component [GlassCard]...', type: 'progress', percent: 100, speed: '60 fps', size: 'Build complete' },
    { text: '📄 GlassCard.tsx (3D perspective transforms & specular lighting)', type: 'file' },
    { text: '✔ Injected GlassCard into your project successfully!', type: 'success' },
    { text: '💡 Usage: import { GlassCard } from "@/components/ui/GlassCard";', type: 'info' },
  ],

  'tiger push': [
    { text: '⚡ Scanning git working tree...', type: 'header' },
    { text: 'Staging files with git add -A...', type: 'info' },
    { text: 'Compressing objects & calculating deltas...', type: 'progress', percent: 35, speed: '4.8 MB/s', size: '4/12 objects' },
    { text: 'Compressing objects & calculating deltas...', type: 'progress', percent: 80, speed: '7.2 MB/s', size: '10/12 objects' },
    { text: 'Compressing objects & calculating deltas...', type: 'progress', percent: 100, speed: '8.6 MB/s', size: '12/12 objects done' },
    { text: 'Writing remote commit objects to origin/main...', type: 'progress', percent: 50, speed: '14.0 MB/s', size: 'Pushing branch main' },
    { text: 'Writing remote commit objects to origin/main...', type: 'progress', percent: 100, speed: '18.2 MB/s', size: 'Refs updated' },
    { text: '✔ Successfully pushed to origin/main! (100% automated)', type: 'success' },
  ],
  'tiger doctor': [
    { text: '🩺 Diagnosing developer environment toolchain...', type: 'header' },
    { text: 'Scanning installed CLI tools & system runtimes...', type: 'progress', percent: 35, speed: 'Checking python/node', size: '2/5 inspected' },
    { text: 'Scanning installed CLI tools & system runtimes...', type: 'progress', percent: 75, speed: 'Checking docker/git', size: '4/5 inspected' },
    { text: 'Scanning installed CLI tools & system runtimes...', type: 'progress', percent: 100, speed: 'Health: 100%', size: 'All systems green' },
    { text: '✔ Python 3.13: Operational (.venv runtime active)', type: 'success' },
    { text: '✔ Node.js: v22.14.0 & npm 10.9.2 configured', type: 'success' },
    { text: '✔ Git: 2.45.0 ready & verified', type: 'success' },
    { text: '✔ Docker: Docker Engine & Compose active', type: 'success' },
    { text: 'Health Score: 100% — System primed for high velocity.', type: 'info' },
  ],
  'tiger help': [
    { text: 'Tiger Framework Meta-Framework CLI v0.1.0', type: 'header' },
    { text: 'Usage: tiger [OPTIONS] COMMAND [ARGS]...', type: 'info' },
    { text: '  create-app   Scaffold new full-stack app (FastAPI/Express + Next.js + DB)', type: 'info' },
    { text: '  make:ui      Inject 3D Glassmorphic UI components into frontend', type: 'info' },
    { text: '  push         One-command git init, stage, commit, and remote push', type: 'info' },
    { text: '  db           Database initialization & Alembic schema migrations', type: 'info' },
    { text: '  ai           AI route generator (tiger ai route) & debugger', type: 'info' },
    { text: '  deploy       Generate production Nginx, Docker Compose, & CI/CD configs', type: 'info' },
    { text: '  doctor       Platform & toolchain diagnostics (Python, Git, Docker, Node)', type: 'info' },
    { text: '  studio       Launch interactive full-screen terminal management console', type: 'info' },
  ],
};

export default function TerminalSimulator() {
  const [history, setHistory] = useState<CommandExecution[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const runLiveFlow = (cmdName: string, animateType: boolean = true) => {
    const trimmed = cmdName.trim();
    if (!trimmed || isExecuting) return;

    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    // Support dynamic project names like "tiger create-app test-app"
    const createAppMatch = trimmed.match(/^tiger\s+create-app(?:\s+([a-zA-Z0-9_-]+))?$/i);
    let fullFlow: TerminalLine[];

    if (createAppMatch) {
      const appName = createAppMatch[1] || 'my-saas';
      fullFlow = getCreateAppFlow(appName);
    } else {
      const matchedFlow = Object.keys(LIVE_COMMAND_FLOWS).find(
        (k) => k.toLowerCase() === trimmed.toLowerCase()
      );

      fullFlow = matchedFlow
        ? LIVE_COMMAND_FLOWS[matchedFlow]
        : [
            { text: `bash: command not found: ${trimmed}`, type: 'info' as const },
            { text: 'Type "tiger help" or click a quick command below.', type: 'info' as const },
          ];
    }

    setIsExecuting(true);
    setInputVal('');

    const startLineStreaming = () => {
      let lineIdx = 0;
      const interval = setInterval(() => {
        if (lineIdx < fullFlow.length) {
          const nextLine = fullFlow[lineIdx];
          setHistory((prev) => {
            const updated = [...prev];
            const last = { ...updated[updated.length - 1] };
            
            // Replace last progress line if both are progress with same prefix task
            const lastLine = last.lines[last.lines.length - 1];
            const isSameProgressTask =
              nextLine.type === 'progress' &&
              lastLine &&
              lastLine.type === 'progress' &&
              lastLine.text.slice(0, 18) === nextLine.text.slice(0, 18);

            if (isSameProgressTask) {
              last.lines = [...last.lines.slice(0, -1), nextLine];
            } else {
              last.lines = [...last.lines, nextLine];
            }

            updated[updated.length - 1] = last;
            return updated;
          });
          lineIdx++;
        } else {
          clearInterval(interval);
          setHistory((prev) => {
            const updated = [...prev];
            if (updated.length > 0) {
              updated[updated.length - 1].isRunning = false;
              updated[updated.length - 1].isTyping = false;
            }
            return updated;
          });
          setIsExecuting(false);
        }
      }, 130);
    };

    if (animateType) {
      // Natural human typewriter effect for realistic developer feel
      const newEntry: CommandExecution = {
        command: '',
        lines: [],
        isRunning: true,
        isTyping: true,
      };

      setHistory((prev) => [...prev, newEntry]);

      let charIdx = 0;
      const typeInterval = setInterval(() => {
        charIdx++;
        if (charIdx <= trimmed.length) {
          setHistory((prev) => {
            const updated = [...prev];
            if (updated.length > 0) {
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                command: trimmed.slice(0, charIdx),
                isTyping: true,
              };
            }
            return updated;
          });
        } else {
          clearInterval(typeInterval);
          // Natural human pause after hitting Enter (260ms), then start live output stream
          setTimeout(() => {
            setHistory((prev) => {
              const updated = [...prev];
              if (updated.length > 0) {
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  command: trimmed,
                  isTyping: false,
                };
              }
              return updated;
            });
            startLineStreaming();
          }, 260);
        }
      }, 52); // ~52ms per character: realistic, natural human typing speed that is easy to read
    } else {
      // Direct execution when user already typed into the input field
      const newEntry: CommandExecution = {
        command: trimmed,
        lines: [],
        isRunning: true,
        isTyping: false,
      };

      setHistory((prev) => [...prev, newEntry]);
      startLineStreaming();
    }
  };

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const hasTriggeredInitial = useRef(false);

  // Run live scaffolding only when user actually scrolls into the terminal section
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredInitial.current) {
          hasTriggeredInitial.current = true;
          runLiveFlow('tiger create-app my-saas');
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // ONLY scroll the internal terminal container, NEVER hijack the whole page/window!
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);


  const copyTerminalText = async () => {
    const fullText = history
      .map((h) => `$ ${h.command}\n${h.lines.map((l) => l.text).join('\n')}`)
      .join('\n\n');

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch {
      // fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Terminal copy failed', e);
    }
  };

  const renderLine = (line: TerminalLine, idx: number) => {
    if (line.type === 'progress') {
      const pct = line.percent || 100;
      const isComplete = pct >= 100;

      return (
        <div key={idx} className="space-y-1.5 my-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="flex items-center gap-2 text-zinc-200 min-w-0">
              {isComplete ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
              )}
              <span className="text-zinc-300 truncate">{line.text}</span>
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono shrink-0 ml-auto">
              {line.size && <span className="text-zinc-500">{line.size}</span>}
              {line.speed && (
                <span className="text-zinc-400 text-[10px] font-mono">
                  {line.speed}
                </span>
              )}
              <span className="font-semibold text-emerald-400 font-mono">
                {pct}%
              </span>
            </div>
          </div>
          {/* Seamless CLI Green Gradient Progress Bar - No Outer Box, No Border Card */}
          <div className="w-full bg-zinc-900 rounded-sm h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 h-full rounded-sm transition-all duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    }



    if (line.type === 'dir') {
      return (
        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
          <Folder className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="font-medium text-zinc-200">{line.text.replace('📁 ', '')}</span>
          <span className="text-[10px] text-zinc-600 font-sans">[directory created]</span>
        </div>
      );
    }

    if (line.type === 'file') {
      return (
        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
          <FileCode className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span>{line.text.replace('📄 ', '')}</span>
          <span className="text-[10px] text-zinc-500 font-sans">written</span>
        </div>
      );
    }

    if (line.type === 'success') {
      return (
        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-white font-semibold pt-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{line.text}</span>
        </div>
      );
    }

    if (line.type === 'header') {
      return (
        <div key={idx} className="text-xs font-mono text-white font-semibold">
          {line.text}
        </div>
      );
    }

    return (
      <div key={idx} className="text-xs font-mono text-zinc-400">
        {line.text}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
      {/* macOS Terminal Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          {/* macOS traffic light buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block cursor-pointer" />
          </div>
          <span className="ml-3 text-xs font-mono text-zinc-400 flex items-center gap-2">
            <TerminalIcon className="w-3.5 h-3.5 text-zinc-500" />
            tiger-shell — zsh — 80×24
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE ENGINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isExecuting) return;
              setHistory([]);
              setTimeout(() => runLiveFlow('tiger create-app my-saas'), 80);
            }}
            disabled={isExecuting}
            title="Replay live scaffolding and download"
            className="px-2.5 py-1 text-xs font-mono rounded bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300 border border-emerald-800/50 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Replay Live</span>
          </button>
          <button
            onClick={() => setHistory([])}
            title="Clear Terminal"
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={copyTerminalText}
            title="Copy Output"
            className="p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-zinc-300" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div ref={terminalBodyRef} className="p-5 font-mono text-xs md:text-sm text-zinc-300 min-h-[340px] max-h-[460px] overflow-y-auto space-y-4">
        <div className="text-zinc-600 text-xs">
          Tiger Framework Live Terminal Execution Engine [v0.1.0]
          <br />
          Run commands or click quick presets to observe live download and file creation processes.
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-200">
              <span className="text-zinc-500">developer@workstation</span>
              <span className="text-zinc-600">:</span>
              <span className="text-zinc-400">~/projects</span>
              <span className="text-zinc-600">%</span>
              <span className="text-white font-semibold">{item.command}</span>
              {item.isTyping && (
                <span className="w-2 h-4 bg-emerald-400 inline-block align-middle ml-0.5 animate-cursor" />
              )}
              {item.isRunning && !item.isTyping && (
                <Loader2 className="w-3 h-3 text-zinc-400 animate-spin ml-1" />
              )}
            </div>

            <div className="text-zinc-400 pl-4 border-l border-zinc-800 space-y-1.5">
              {item.lines.map((line, lIdx) => renderLine(line, lIdx))}
            </div>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runLiveFlow(inputVal, false);
          }}
          className="flex items-center gap-2 text-zinc-200 pt-2"
        >
          <span className="text-zinc-500">developer@workstation</span>
          <span className="text-zinc-600">:</span>
          <span className="text-zinc-400">~/projects</span>
          <span className="text-zinc-600">%</span>
          <input
            type="text"
            value={inputVal}
            disabled={isExecuting}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isExecuting ? "Executing command..." : "tiger create-app my-saas, tiger push, tiger doctor..."}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-zinc-600 text-xs disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isExecuting}
            className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1.5 border border-zinc-700 transition-colors disabled:opacity-50"
          >
            {isExecuting ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            Run
          </button>
        </form>
      </div>

      {/* Preset Action Strip */}
      <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-zinc-500 font-mono">Live Demos:</span>
        {Object.keys(LIVE_COMMAND_FLOWS).map((cmd) => (
          <button
            key={cmd}
            disabled={isExecuting}
            onClick={() => runLiveFlow(cmd, true)}
            className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            <Play className="w-2.5 h-2.5 opacity-60 fill-current" />
            <span>{cmd}</span>
          </button>
        ))}
      </div>
    </div>
  );
}