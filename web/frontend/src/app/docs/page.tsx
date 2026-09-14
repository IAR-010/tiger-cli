'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GlassNavbar from '@/components/ui/GlassNavbar';
import GlassButton from '@/components/ui/GlassButton';
import {
  BookOpen,
  Terminal,
  Zap,
  Code2,
  Database,
  Globe,
  Sparkles,
  Server,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Layers,
  FileCode,
  Folder
} from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  badge?: string;
}

const SECTIONS: DocSection[] = [
  { id: 'overview', title: '1. Overview & Architecture' },
  { id: 'installation', title: '2. Installation & Quickstart' },
  { id: 'scaffolding', title: '3. Scaffolding Engine (create-app)' },
  { id: 'backend', title: '4. Backend Architecture (FastAPI)' },
  { id: 'frontend', title: '5. Frontend (Next.js 16.3.5)' },
  { id: 'ui-kit', title: '6. 3D Glassmorphic UI Kit' },
  { id: 'git-pipeline', title: '7. Autonomous Git (tiger push)' },
  { id: 'database', title: '8. Database & Alembic Migrations' },
  { id: 'ai-copilot', title: '9. AI Route Synthesizer & Debugger' },
  { id: 'deployment', title: '10. Production Docker & Nginx SSL' },
  { id: 'tiger-lock', title: '11. Integrity Watermark (tiger.lock)' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const renderCodeBox = (code: string, id: string, language: string = 'bash') => (
    <div className="relative group rounded-xl border border-zinc-800 bg-zinc-950/90 overflow-hidden my-3 font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/60 border-b border-zinc-800/80 text-zinc-400 text-[11px]">
        <span>{language}</span>
        <button
          onClick={() => copyCode(code, id)}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          {copiedSnippet === id ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-zinc-200">
        <pre>{code}</pre>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      <GlassNavbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Top Header Banner */}
        <div className="py-8 border-b border-zinc-800/80 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <Link href="/" className="hover:text-white transition-colors">Tiger Framework</Link>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <span className="text-zinc-200">Documentation</span>
            <span className="ml-auto px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-[10px]">
              Next.js 16.3.5 Ready
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-orbitron tracking-tight">
            Official Technical Documentation
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            The definitive architectural manual and reference guide for Tiger Framework — the next-generation 3D Glassmorphic full-stack meta-framework engineered by <strong>x010.tech</strong> and <strong>IAR-010</strong>.
          </p>
        </div>

        {/* 2-Column Docs Layout: Sidebar Navigation + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sticky Scrollable Sidebar */}
          <aside className="lg:col-span-1 text-xs">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-1 p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 shadow-lg overscroll-contain pr-1.5 focus:outline-none">
              <div className="px-3 py-2 text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-semibold sticky top-0 bg-zinc-950/95 backdrop-blur-sm z-10 pb-1 border-b border-zinc-900">
                Table of Contents
              </div>
              <div className="pt-1.5 space-y-0.5">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(sec.id);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block px-3 py-2 rounded-lg transition-colors font-medium ${
                      activeSection === sec.id
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
              <div className="pt-3 mt-3 border-t border-zinc-800/60 px-3 pb-1">
                <a
                  href="https://github.com/IAR-010/tiger-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Docs Content Stream */}
          <article className="lg:col-span-3 space-y-16 text-sm text-zinc-300 leading-relaxed">
            {/* 1. Overview */}
            <section id="overview" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Chapter 1
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                1. Overview & Architecture
              </h2>
              <p>
                <strong>Tiger Framework</strong> is an open-source full-stack meta-framework built on top of the Tiger CLI toolchain. It unifies Python (FastAPI) or Node.js (Express) backends with <strong>Next.js v16.3.5 App Router</strong>, hardware-accelerated 3D Glassmorphism UI components, automatic database migrations (PostgreSQL/MySQL), and zero-configuration production deployment into a single cohesive developer ecosystem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-1">
                  <div className="text-xs font-mono text-emerald-400 font-semibold">FastAPI Async Lifespan</div>
                  <p className="text-xs text-zinc-400">High-throughput ASGI server with automated OpenAPI docs and Pydantic validation.</p>
                </div>
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-1">
                  <div className="text-xs font-mono text-emerald-400 font-semibold">Next.js 16.3.5 Turbopack</div>
                  <p className="text-xs text-zinc-400">Server Components, React 19, responsive 3D Glassmorphism, and instant HMR.</p>
                </div>
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-1">
                  <div className="text-xs font-mono text-emerald-400 font-semibold">Docker & Nginx SSL</div>
                  <p className="text-xs text-zinc-400">Hardened production reverse proxies with automated certificates and multi-stage builds.</p>
                </div>
              </div>
            </section>

            {/* 2. Installation */}
            <section id="installation" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Chapter 2
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                2. Installation & Quickstart
              </h2>
              <p>
                Tiger CLI can be installed through NPM or Python PyPI, or run instantly without installation using NPX:
              </p>
              <div>
                <h4 className="text-xs font-mono text-zinc-400 font-semibold uppercase">Option A: Global Install via NPM</h4>
                {renderCodeBox('npm install -g tiger-cli', 'inst-npm')}
              </div>
              <div>
                <h4 className="text-xs font-mono text-zinc-400 font-semibold uppercase">Option B: Global Install via Python (pip)</h4>
                {renderCodeBox('pip install tiger-cli', 'inst-pip')}
              </div>
              <div>
                <h4 className="text-xs font-mono text-zinc-400 font-semibold uppercase">Option C: Instant Zero-Install via NPX</h4>
                {renderCodeBox('npx tiger-cli create-app my-saas', 'inst-npx')}
              </div>
            </section>

            {/* 3. Scaffolding */}
            <section id="scaffolding" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Folder className="w-3.5 h-3.5 text-emerald-400" /> Chapter 3
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                3. Scaffolding Engine (`tiger create-app`)
              </h2>
              <p>
                Run <code className="text-emerald-400 font-mono">tiger create-app [name]</code> to generate a production-ready application in under 2 seconds:
              </p>
              {renderCodeBox('tiger create-app my-saas --backend "Python (FastAPI)" --database PostgreSQL', 'scaff-cmd')}
              <p className="text-xs text-zinc-400">
                This writes the complete project structure with isolated backend, frontend, Docker configuration, and cryptographic watermarks:
              </p>
              {renderCodeBox(
`my-saas/
├── backend/
│   ├── app/
│   │   ├── api/routes.py       # REST API endpoints
│   │   ├── core/config.py      # Pydantic settings & DB pooling
│   │   └── main.py             # FastAPI entrypoint
│   └── requirements.txt
├── frontend/
│   ├── src/app/                # Next.js 16.3.5 App Router
│   ├── src/components/ui/      # 3D Glassmorphic UI Kit
│   └── package.json            # React 19 + Tailwind CSS
├── docker-compose.yml          # PostgreSQL 16 + Nginx SSL proxy
├── tiger.lock                  # Cryptographic SHA-256 signature
└── .env.example                # Pre-configured environment variables`,
                'scaff-tree',
                'plaintext'
              )}
            </section>

            {/* 4. Backend */}
            <section id="backend" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Server className="w-3.5 h-3.5 text-emerald-400" /> Chapter 4
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                4. Backend Architecture (FastAPI Async)
              </h2>
              <p>
                The backend is built around an async lifespan router pattern with SQLAlchemy 2.0 connection pooling:
              </p>
              {renderCodeBox(
`from fastapi import FastAPI
from app.api.routes import router as api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    docs_url="/api/docs"
)

app.include_router(api_router, prefix="/api/v1")`,
                'fastapi-code',
                'python'
              )}
            </section>

            {/* 5. Frontend */}
            <section id="frontend" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Chapter 5
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                5. Frontend (Next.js 16.3.5 App Router)
              </h2>
              <p>
                The frontend uses the latest <strong>Next.js v16.3.5</strong> with <strong>React 19</strong>, hardware-accelerated Tailwind styling, and Turbopack support.
              </p>
              {renderCodeBox(
`cd my-saas/frontend
npm run dev`,
                'front-run'
              )}
            </section>

            {/* 6. UI Kit */}
            <section id="ui-kit" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Chapter 6
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                6. 3D Glassmorphic UI Kit (`tiger make:ui`)
              </h2>
              <p>
                Generate hardware-accelerated 3D components directly into your frontend without third-party heavy dependencies:
              </p>
              {renderCodeBox(
`# Inject components into frontend/src/components/ui
tiger make:ui GlassCard
tiger make:ui GlassNavbar
tiger make:ui GlassButton
tiger make:ui GlassModal
tiger make:ui GlassStats`,
                'make-ui-cmd'
              )}
            </section>

            {/* 7. Autonomous Git Pipeline */}
            <section id="git-pipeline" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Chapter 7
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                7. Autonomous Git Pipeline (`tiger push`)
              </h2>
              <p>
                Say goodbye to repetitive manual commands (<code className="text-zinc-400 font-mono">git add</code>, <code className="text-zinc-400 font-mono">git commit</code>, <code className="text-zinc-400 font-mono">git push</code>). With <code className="text-emerald-400 font-mono">tiger push</code>, repository initialization, stage check, commit creation, and remote branch pushing are automated:
              </p>
              {renderCodeBox(
`# One command stages all changes, creates a commit and pushes to origin/main
tiger push "feat: add user authentication API"`,
                'tiger-push-cmd'
              )}
            </section>

            {/* 8. Database */}
            <section id="database" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> Chapter 8
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                8. Database & Alembic Migrations
              </h2>
              <p>
                Configure databases and execute automated schema revisions:
              </p>
              {renderCodeBox(
`# Initialize database config
tiger db init --engine postgresql

# Generate and apply schema migrations
tiger db migrate "create_users_table"`,
                'tiger-db-cmd'
              )}
            </section>

            {/* 9. AI Copilot */}
            <section id="ai-copilot" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Chapter 9
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                9. Integrated AI Synthesizer (`tiger ai`)
              </h2>
              <p>
                Synthesize endpoint code from plain English and diagnose runtime error traces directly in your terminal:
              </p>
              {renderCodeBox(
`# Generate API route from natural language
tiger ai route "Create a Stripe webhook listener for checkout session completion"

# Diagnose terminal error stack trace
tiger ai debug`,
                'tiger-ai-cmd'
              )}
            </section>

            {/* 10. Deployment */}
            <section id="deployment" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <Server className="w-3.5 h-3.5 text-emerald-400" /> Chapter 10
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                10. Production Docker & Nginx SSL
              </h2>
              <p>
                Generate hardened Dockerfiles and Nginx SSL reverse proxies:
              </p>
              {renderCodeBox(
`# Generate Docker orchestration
tiger deploy docker

# Generate production Nginx reverse proxy with HTTPS
tiger deploy nginx --domain api.yourdomain.com`,
                'tiger-deploy-cmd'
              )}
            </section>

            {/* 11. Tiger Lock */}
            <section id="tiger-lock" className="space-y-4 scroll-mt-24">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Chapter 11
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                11. Integrity Watermark (`tiger.lock`) & x010.tech Provenance
              </h2>
              <p>
                Every generated project includes a cryptographic <code className="text-zinc-200 font-mono">tiger.lock</code> file. This file contains SHA-256 integrity signatures, the embedded official 3D Tiger logo, and authentic provenance by parent organization <strong>x010.tech</strong> and <strong>IAR-010</strong> under the MIT License.
              </p>
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Need support or enterprise customization?</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Explore open source discussions on GitHub or visit x010.tech.</div>
                </div>
                <a
                  href="https://x010.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-colors"
                >
                  Visit x010.tech ↗
                </a>
              </div>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
