'use client';

import React, { useState } from 'react';
import GlassNavbar from '@/components/ui/GlassNavbar';
import GlassStats from '@/components/ui/GlassStats';
import GlassButton from '@/components/ui/GlassButton';
import TerminalSimulator from '@/components/TerminalSimulator';
import Playground3D from '@/components/Playground3D';
import CommandDocs from '@/components/CommandDocs';
import FrameworkComparison from '@/components/FrameworkComparison';
import {
  Sparkles,
  Terminal,
  Layers,
  Copy,
  Check,
  Github,
  Zap,
  ShieldCheck,
  Cpu,
  Globe,
  Flame,
  Code2
} from 'lucide-react';

type InstallTab = 'ps' | 'sh' | 'npx';

export default function Home() {
  const [installTab, setInstallTab] = useState<InstallTab>('ps');
  const [copiedInstall, setCopiedInstall] = useState(false);

  const installCommands = {
    ps: 'irm https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.ps1 | iex',
    sh: 'curl -fsSL https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.sh | bash',
    npx: 'npx tiger-cli create-app my-saas',
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCommands[installTab]);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-black text-slate-100 overflow-x-hidden">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-amber-500/15 blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[800px] -left-48 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[1600px] -right-48 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* Top Banner with Parent Backlink */}
      <div className="w-full bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-amber-950/60 border-b border-white/5 py-2 px-4 text-center text-xs text-slate-300 backdrop-blur-md fixed top-0 inset-x-0 z-50">
        <span className="inline-flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
            RELEASE v0.1.0
          </span>
          <span>Tiger Framework is now live & open source!</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">An open innovation by</span>
          <a
            href="https://x010.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:decoration-cyan-400 transition-colors inline-flex items-center gap-1"
          >
            x010.tech ↗
          </a>
        </span>
      </div>

      {/* Glass Navigation Bar */}
      <GlassNavbar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-36 pb-24 space-y-32">
        {/* ============================================================ */}
        {/* 1. HERO SECTION */}
        {/* ============================================================ */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-6">
          {/* 3D Glowing Tiger Logo Badge */}
          <div className="flex justify-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse-glow" />
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950/80 border border-cyan-500/40 p-3.5 shadow-[0_0_50px_rgba(6,182,212,0.4)] backdrop-blur-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Tiger Framework Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.7)] animate-float"
                />
              </div>
            </div>
          </div>

          {/* Badge & Parent Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-semibold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Full-Stack Meta-Framework & CLI Toolchain
            </div>
            <a
              href="https://x010.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold hover:bg-amber-500/20 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Powered by x010.tech
            </a>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Build Full-Stack Apps at the{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-400">
              Speed of a Roar
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            The command-line full-stack framework combining <strong>Python (FastAPI)</strong> or <strong>Node.js (Express)</strong> with <strong>Next.js 14 App Router</strong>, automated Git pipelines, Alembic migrations, and 3D Glassmorphism.
          </p>

          {/* 1-Click Interactive Installer Switcher Box */}
          <div id="install" className="max-w-xl mx-auto rounded-2xl border border-cyan-500/30 bg-slate-950/90 backdrop-blur-2xl p-4 shadow-[0_0_40px_rgba(6,182,212,0.2)] space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/5 text-xs font-mono">
                <button
                  onClick={() => setInstallTab('ps')}
                  className={installTab === 'ps' ? 'px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'px-3 py-1 rounded-lg text-slate-400 hover:text-white'}
                >
                  PowerShell (Win)
                </button>
                <button
                  onClick={() => setInstallTab('sh')}
                  className={installTab === 'sh' ? 'px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'px-3 py-1 rounded-lg text-slate-400 hover:text-white'}
                >
                  curl (Mac/Linux)
                </button>
                <button
                  onClick={() => setInstallTab('npx')}
                  className={installTab === 'npx' ? 'px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'px-3 py-1 rounded-lg text-slate-400 hover:text-white'}
                >
                  NPX (No Install)
                </button>
              </div>

              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            {/* Install Command Display & Copy */}
            <div className="flex items-center justify-between gap-3 bg-slate-900/90 rounded-xl px-4 py-3 border border-white/5 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto">
              <span className="text-slate-500 select-none">$</span>
              <span className="truncate flex-1 text-left">{installCommands[installTab]}</span>
              <button
                onClick={handleCopyInstall}
                className="shrink-0 p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5 text-xs font-mono font-medium"
              >
                {copiedInstall ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href="#terminal">
              <GlassButton size="lg" variant="primary">
                <Terminal className="w-4 h-4 mr-2" /> Try Live Terminal
              </GlassButton>
            </a>
            <a
              href="https://github.com/IAR-010/tiger-cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="lg" variant="secondary">
                <Github className="w-4 h-4 mr-2" /> Star on GitHub
              </GlassButton>
            </a>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. LIVE METRICS BAR */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassStats label="Scaffold Velocity" value="< 2 sec" change="10x Faster" isPositive={true} />
          <GlassStats label="Async API Latency" value="1.8 ms" change="FastAPI Engine" isPositive={true} />
          <GlassStats label="3D UI Components" value="5 Injected" change="Tailwind CSS" isPositive={true} />
          <GlassStats label="Test Health Score" value="100%" change="12/12 Automated" isPositive={true} />
        </section>

        {/* ============================================================ */}
        {/* 3. INTERACTIVE TERMINAL SIMULATOR */}
        {/* ============================================================ */}
        <section id="terminal" className="space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" /> Live Browser Terminal Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Experience the Terminal Powerhouse
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Test real CLI workflows right inside your browser without installing anything.
            </p>
          </div>

          <TerminalSimulator />
        </section>

        {/* ============================================================ */}
        {/* 4. 3D GLASSMORPHIC PLAYGROUND */}
        {/* ============================================================ */}
        <section id="playground" className="space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
              <Layers className="w-3.5 h-3.5" /> Realtime 3D Design Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Next-Gen 3D Glassmorphism Playground
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Adjust backdrop blur, surface translucency, and reactive specular lighting in realtime. Injected directly into your app via <code className="text-cyan-300 font-mono">tiger make:ui</code>.
            </p>
          </div>

          <Playground3D />
        </section>

        {/* ============================================================ */}
        {/* 5. SIX PILLARS OF TIGER FRAMEWORK */}
        {/* ============================================================ */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
              <Flame className="w-3.5 h-3.5" /> Complete Developer Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Engineered for End-to-End Velocity
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Everything you need to go from an idea to production deployment in one unified framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-amber-400" />,
                title: 'Instant Scaffolding',
                cmd: 'tiger create-app',
                desc: 'Generate complete projects with FastAPI/Express, PostgreSQL/MySQL, and Next.js 14 in under two seconds.',
              },
              {
                icon: <Code2 className="w-6 h-6 text-cyan-400" />,
                title: '3D UI Component Library',
                cmd: 'tiger make:ui',
                desc: 'Inject GlassCard, GlassNavbar, GlassButton, GlassModal, and GlassStats with hardware-accelerated transforms.',
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-400" />,
                title: 'Autonomous Git Pipeline',
                cmd: 'tiger push',
                desc: 'Single command repository initialization, file staging, commit generation, and remote push to GitHub.',
              },
              {
                icon: <Cpu className="w-6 h-6 text-blue-400" />,
                title: 'Database & Migrations',
                cmd: 'tiger db init | migrate',
                desc: 'Automatic connection pooling configuration in .env and Alembic schema synchronization.',
              },
              {
                icon: <Sparkles className="w-6 h-6 text-purple-400" />,
                title: 'Integrated AI Co-Pilot',
                cmd: 'tiger ai route | debug',
                desc: 'Synthesize FastAPI/Express routes from plain English and diagnose runtime stack traces automatically.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
                title: 'Hardened Deployment',
                cmd: 'tiger deploy nginx | docker',
                desc: 'Production-ready Nginx SSL reverse proxies, multi-stage Dockerfiles, and automated GitHub Actions CI/CD.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 space-y-4 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">{pillar.icon}</div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-950/80 border border-white/5 text-cyan-300">
                    {pillar.cmd}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. FULL COMMAND DOCUMENTATION MATRIX */}
        {/* ============================================================ */}
        <section id="commands" className="space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
              <Terminal className="w-3.5 h-3.5" /> Command Reference Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Comprehensive CLI Documentation
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Explore commands, flags, and production parameters available in Tiger CLI.
            </p>
          </div>

          <CommandDocs />
        </section>

        {/* ============================================================ */}
        {/* 7. BENCHMARK & COMPARISON */}
        {/* ============================================================ */}
        <section id="comparison" className="space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Framework Benchmark
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Architectural Comparison
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              See how Tiger Framework delivers 10x velocity compared to fragmented stacks.
            </p>
          </div>

          <FrameworkComparison />
        </section>

        {/* ============================================================ */}
        {/* 8. OPEN SOURCE & COMMUNITY CALLOUT */}
        {/* ============================================================ */}
        <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950 to-black p-8 sm:p-12 text-center space-y-6 shadow-[0_0_60px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-900 border border-cyan-500/40 p-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <img src="/logo.png" alt="Tiger Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Open Source. Built for the Community.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Tiger Framework is 100% open source under the MIT License, hosted on GitHub under the <strong>IAR-010</strong> organization and proudly powered by <strong>x010.tech</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://github.com/IAR-010/tiger-cli"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="lg" variant="primary">
                <Github className="w-4 h-4 mr-2" /> View on GitHub (IAR-010/tiger-cli)
              </GlassButton>
            </a>
            <a
              href="https://x010.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton size="lg" variant="secondary">
                Visit x010.tech ↗
              </GlassButton>
            </a>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 9. PRODUCTION FOOTER WITH PROMINENT PARENT BACKLINK */}
      {/* ============================================================ */}
      <footer className="border-t border-white/10 bg-slate-950/90 backdrop-blur-2xl py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Parent Company */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/30 p-1 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">
                TIGER <span className="text-cyan-400 font-light">FRAMEWORK</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Command-line based full-stack meta-framework designed to accelerate project setup, API design, version control, and deployment.
            </p>
            {/* Prominent x010.tech Parent Company Backlink Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 max-w-sm flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Parent Company</div>
                <a
                  href="https://x010.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1"
                >
                  x010.tech ↗
                </a>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/30">
                Official Innovation
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Ecosystem</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#terminal" className="hover:text-cyan-300 transition-colors">Terminal Demo</a></li>
              <li><a href="#playground" className="hover:text-cyan-300 transition-colors">3D Glassmorphic UI Kit</a></li>
              <li><a href="#commands" className="hover:text-cyan-300 transition-colors">CLI Command Matrix</a></li>
              <li><a href="#comparison" className="hover:text-cyan-300 transition-colors">Performance Benchmark</a></li>
            </ul>
          </div>

          {/* Col 3: Open Source & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Community & Code</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://github.com/IAR-010/tiger-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  GitHub: IAR-010/tiger-cli ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/IAR-010/tiger-cli/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Contribution Guidelines
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/IAR-010/tiger-cli/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://x010.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors font-medium"
                >
                  Visit x010.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Tiger Framework Authors. Powered by{' '}
            <a
              href="https://x010.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-semibold"
            >
              x010.tech
            </a>{' '}
            &{' '}
            <a
              href="https://github.com/IAR-010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:underline"
            >
              IAR-010
            </a>
            .
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}