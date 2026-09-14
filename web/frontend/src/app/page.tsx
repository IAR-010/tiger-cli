'use client';

import React, { useState, useEffect, useRef } from 'react';
import GlassNavbar from '@/components/ui/GlassNavbar';
import GlassStats from '@/components/ui/GlassStats';
import GlassButton from '@/components/ui/GlassButton';
import TerminalSimulator from '@/components/TerminalSimulator';
import Playground3D from '@/components/Playground3D';
import CommandDocs from '@/components/CommandDocs';
import FrameworkComparison from '@/components/FrameworkComparison';
import FaqSection from '@/components/FaqSection';
import {
  Terminal,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Cpu,
  Globe,
  Code2,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  ChevronRight
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type InstallTab = 'npm' | 'pip' | 'npx';

export default function Home() {
  // Always keep user on Hero section on reload/refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const [installTab, setInstallTab] = useState<InstallTab>('npm');
  const [copiedInstall, setCopiedInstall] = useState(false);

  const installCommands = {
    npm: 'npm install -g tiger-cli',
    pip: 'pip install tiger-cli',
    npx: 'npx tiger-cli create-app my-saas',
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn('Navigator clipboard failed, using fallback', err);
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
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback copy failed', err);
      return false;
    }
  };

  const handleCopyInstall = async () => {
    const success = await copyToClipboard(installCommands[installTab]);
    if (success) {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  };



  const fullHeadline = 'Full-Stack Framework & CLI Toolchain.';
  const [typedHeadline, setTypedHeadline] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Typewriter effect for Orbitron Headline
  useEffect(() => {
    let index = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        index++;
        if (index <= fullHeadline.length) {
          setTypedHeadline(fullHeadline.slice(0, index));
        } else {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 48);

      return () => clearInterval(interval);
    }, 180);

    return () => clearTimeout(startTimer);
  }, []);

  // Scroll Reveal Intersection Observer setup for elements below the fold
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    });

    const elements = document.querySelectorAll('.reveal-item, .reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      {/* Top Fixed Full-Width Minimal Navbar */}
      <GlassNavbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-28">
        {/* ============================================================ */}
        {/* 1. HERO SECTION - CLEAN, SERIOUS & MONOCHROME */}
        {/* ============================================================ */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-4">
          {/* Subtle Project & Parent Label */}
          <div className="flex items-center justify-center gap-2 animate-hero-1">
            <a
              href="https://x010.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-300 text-xs font-mono hover:border-zinc-700 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>tiger-cli v0.1.0</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">by x010.tech</span>
              <ArrowRight className="w-3 h-3 text-zinc-500" />
            </a>
          </div>

          {/* Core Headline - Orbitron Bold 600 with Smooth Typewriter Animation */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.18] font-orbitron min-h-[70px] sm:min-h-[85px] flex items-center justify-center animate-hero-2">
            <span>
              {typedHeadline}
              <span
                className={`inline-block w-[3px] sm:w-[4px] h-[0.8em] ml-2 bg-emerald-400 align-middle -translate-y-[2px] ${
                  isTypingDone ? 'animate-cursor' : 'opacity-100'
                }`}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal animate-hero-3">
            Build high-performance web applications with <strong>FastAPI</strong> or <strong>Express</strong>, <strong>Next.js v16.3.5 App Router</strong>, automated migrations, and zero-configuration deployments.
          </p>

          {/* Quick Value Clarification: What is Tiger & What does it do */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto text-left pt-1">
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 animate-hero-4 hover:border-zinc-700/80 transition-colors">
              <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 font-mono">
                <span className="text-emerald-400 font-bold">01.</span> Scaffold
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                Next.js 16.3.5 App Router + FastAPI/Express in 1.4s.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 animate-hero-5 hover:border-zinc-700/80 transition-colors">
              <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 font-mono">
                <span className="text-emerald-400 font-bold">02.</span> Database
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                PostgreSQL 16, SQLAlchemy & automated Alembic migrations.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 animate-hero-6 hover:border-zinc-700/80 transition-colors">
              <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 font-mono">
                <span className="text-emerald-400 font-bold">03.</span> 1-Click Push
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                Autonomous <code className="text-zinc-300">tiger push</code>, Docker Compose & Nginx SSL.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 animate-hero-7 hover:border-zinc-700/80 transition-colors">
              <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 font-mono">
                <span className="text-emerald-400 font-bold">04.</span> 3D UI Kit
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                Hardware-accelerated 3D Glassmorphism components.
              </p>
            </div>
          </div>


          {/* ============================================================ */}
          {/* macOS STYLE INSTALLATION TERMINAL BOX */}
          {/* ============================================================ */}
          <div id="install" className="max-w-2xl mx-auto rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden text-left spotlight-card transition-all duration-300 animate-hero-8">
            {/* macOS Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                {/* 3 macOS Window Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block hover:opacity-80 transition-opacity cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block hover:opacity-80 transition-opacity cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <span className="ml-3 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
                  terminal — zsh
                </span>
              </div>

              {/* OS / Package Switcher Tabs */}
              <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded-md border border-zinc-800 text-[11px] font-mono">
                <button
                  onClick={() => setInstallTab('npm')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    installTab === 'npm'
                      ? 'bg-zinc-800 text-white font-medium shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  NPM
                </button>
                <button
                  onClick={() => setInstallTab('pip')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    installTab === 'pip'
                      ? 'bg-zinc-800 text-white font-medium shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  PIP (Python)
                </button>
                <button
                  onClick={() => setInstallTab('npx')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    installTab === 'npx'
                      ? 'bg-zinc-800 text-white font-medium shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  NPX (Instant)
                </button>
              </div>
            </div>

            {/* Terminal Command Line Output */}
            <div className="p-4 bg-zinc-950 flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-3 overflow-x-auto text-zinc-200">
                <span className="text-zinc-500 select-none">$</span>
                <span className="truncate font-medium">{installCommands[installTab]}</span>
                <span className="w-2 h-4 bg-zinc-400 inline-block animate-cursor" />
              </div>

              <button
                onClick={handleCopyInstall}
                className="shrink-0 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-mono"
              >
                {copiedInstall ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-zinc-100" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action CTAs - Icons and Text perfectly aligned inline */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 animate-hero-9">
            <button
              onClick={() => {
                document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="focus:outline-none"
            >
              <GlassButton size="md" variant="primary">
                <Terminal className="w-4 h-4 shrink-0" />
                <span>Live Terminal Simulator</span>
              </GlassButton>
            </button>
            <a
              href="https://github.com/IAR-010/tiger-cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="md" variant="secondary">
                <GithubIcon className="w-4 h-4 shrink-0" />
                <span>Star on GitHub</span>
              </GlassButton>
            </a>
          </div>
        </section>


        {/* ============================================================ */}
        {/* 2. LIVE METRICS BAR (CLEAN SLATE MONOCHROME WITH HOVER) */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="spotlight-card rounded-xl reveal-item reveal-delay-1">
            <GlassStats label="Scaffold Velocity" value="< 2 sec" change="10x Faster" isPositive={true} />
          </div>
          <div className="spotlight-card rounded-xl reveal-item reveal-delay-2">
            <GlassStats label="Async API Latency" value="1.8 ms" change="FastAPI Engine" isPositive={true} />
          </div>
          <div className="spotlight-card rounded-xl reveal-item reveal-delay-3">
            <GlassStats label="UI Components" value="5 Injected" change="Tailwind 3D" isPositive={true} />
          </div>
          <div className="spotlight-card rounded-xl reveal-item reveal-delay-4">
            <GlassStats label="Test Coverage" value="100%" change="12/12 Automated" isPositive={true} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. INTERACTIVE macOS TERMINAL SIMULATOR */}
        {/* ============================================================ */}
        <section id="terminal" className="space-y-4">
          <div className="text-left space-y-1 reveal-item reveal-delay-1">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Interactive Execution
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              In-Browser Terminal Engine
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Simulate actual Tiger CLI workflows directly inside your browser without installing anything.
            </p>
          </div>

          <div className="reveal-item reveal-delay-2">
            <TerminalSimulator />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. ARCHITECTURE & SIX PILLARS */}
        {/* ============================================================ */}
        <section id="architecture" className="space-y-6">
          <div className="text-left space-y-1 reveal-item">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Engineered for Complete Lifecycle Velocity
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Everything required to go from project inception to production infrastructure in one unified engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <Zap className="w-5 h-5 text-zinc-300" />,
                title: 'Instant Scaffolding',
                cmd: 'tiger create-app',
                desc: 'Generate complete projects with FastAPI/Express, PostgreSQL/MySQL, and Next.js 16.3.5 in under two seconds.',
              },
              {
                icon: <Code2 className="w-5 h-5 text-zinc-300" />,
                title: '3D UI Component Library',
                cmd: 'tiger make:ui',
                desc: 'Inject GlassCard, GlassNavbar, GlassButton, GlassModal, and GlassStats with hardware-accelerated transforms.',
              },
              {
                icon: <Globe className="w-5 h-5 text-zinc-300" />,
                title: 'Autonomous Git Pipeline',
                cmd: 'tiger push',
                desc: 'Single command repository initialization, file staging, commit generation, and remote push to GitHub.',
              },
              {
                icon: <Cpu className="w-5 h-5 text-zinc-300" />,
                title: 'Database & Migrations',
                cmd: 'tiger db init | migrate',
                desc: 'Automatic connection pooling configuration in .env and Alembic schema synchronization.',
              },
              {
                icon: <Sparkles className="w-5 h-5 text-zinc-300" />,
                title: 'Integrated AI Synthesizer',
                cmd: 'tiger ai route | debug',
                desc: 'Synthesize FastAPI/Express routes from plain English and diagnose runtime stack traces automatically.',
              },
              {
                icon: <Server className="w-5 h-5 text-zinc-300" />,
                title: 'Production Deployments',
                cmd: 'tiger deploy nginx | docker',
                desc: 'Production-ready Nginx SSL reverse proxies, multi-stage Dockerfiles, and automated GitHub Actions CI/CD.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className={`spotlight-card p-5 rounded-xl transition-all duration-200 space-y-3 reveal-item reveal-delay-${(idx % 6) + 1}`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-zinc-800/60 border border-zinc-700/50">{pillar.icon}</div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                    {pillar.cmd}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ============================================================ */}
        {/* 5. 3D COMPONENT INSPECTOR & PLAYGROUND */}
        {/* ============================================================ */}
        <section className="space-y-4">
          <div className="text-left space-y-1 reveal-item">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              UI System
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              3D Glassmorphic Component Playground
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Inspect responsive perspective transforms, opacity levels, and component states.
            </p>
          </div>

          <div className="reveal-item reveal-delay-2">
            <Playground3D />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. COMMAND DOCUMENTATION MATRIX */}
        {/* ============================================================ */}
        <section id="commands" className="space-y-4">
          <div className="text-left space-y-1 reveal-item">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              CLI Reference
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Complete Command Matrix
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explore commands, arguments, and deployment flags available across the toolchain.
            </p>
          </div>

          <div className="reveal-item reveal-delay-2">
            <CommandDocs />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. ARCHITECTURAL COMPARISON */}
        {/* ============================================================ */}
        <section id="benchmark" className="space-y-4">
          <div className="text-left space-y-1 reveal-item">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Industry Standard Benchmark
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Architectural & Velocity Benchmark
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Real-world comparison of scaffolding time and out-of-the-box capabilities.
            </p>
          </div>

          <div className="reveal-item reveal-delay-2">
            <FrameworkComparison />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. GEO & SEO FAQ SECTION */}
        {/* ============================================================ */}
        <div className="reveal-item">
          <FaqSection />
        </div>

        {/* ============================================================ */}
        {/* 9. OPEN SOURCE & REPOSITORY BANNER */}
        {/* ============================================================ */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 sm:p-12 text-center space-y-5 reveal-item">
          <img src="/logo.png" alt="Tiger Logo" className="w-14 h-14 mx-auto object-contain drop-shadow-md select-none" />
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Open Source. Engineered for Developers.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Tiger Framework is 100% open source under the MIT License, maintained on GitHub by <strong>IAR-010</strong> and backed by <strong>x010.tech</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://github.com/IAR-010/tiger-cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="md" variant="primary">
                <GithubIcon className="w-4 h-4 mr-2" /> View GitHub Repository
              </GlassButton>
            </a>
            <a
              href="https://x010.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="md" variant="secondary">
                Visit x010.tech ↗
              </GlassButton>
            </a>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 10. ENTERPRISE MINIMAL FOOTER */}
      {/* ============================================================ */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain shrink-0 select-none" />
              <span className="text-sm font-semibold tracking-wider text-white uppercase">
                Tiger <span className="text-zinc-500 font-normal">Framework</span>
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed text-xs">
              Unified command-line meta-framework designed to accelerate project scaffolding, database migrations, and autonomous deployments.
            </p>
            <div className="pt-2">
              <a
                href="https://x010.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[11px] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                Parent Company: x010.tech ↗
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-2">
            <h4 className="font-mono text-zinc-300 font-medium uppercase tracking-wider text-[11px]">Toolchain</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><a href="#terminal" className="hover:text-zinc-200 transition-colors">Terminal Simulator</a></li>
              <li><a href="#architecture" className="hover:text-zinc-200 transition-colors">Core Capabilities</a></li>
              <li><a href="#commands" className="hover:text-zinc-200 transition-colors">CLI Command Reference</a></li>
              <li><a href="#benchmark" className="hover:text-zinc-200 transition-colors">Framework Benchmark</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-2">
            <h4 className="font-mono text-zinc-300 font-medium uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><a href="https://github.com/IAR-010/tiger-cli" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">GitHub Repository</a></li>
              <li><a href="https://github.com/IAR-010/tiger-cli/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">MIT License</a></li>
              <li><a href="https://x010.tech" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">x010.tech Home</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © 2026 Tiger Framework Authors. Developed under{' '}
            <a href="https://github.com/IAR-010" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:underline">
              IAR-010
            </a>{' '}
            & backed by{' '}
            <a href="https://x010.tech" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:underline">
              x010.tech
            </a>.
          </div>
          <div className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> All Systems Operational
          </div>
        </div>
      </footer>
    </div>
  );
}