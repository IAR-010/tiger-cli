'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ExternalLink } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  keywords: string[];
}

const FAQS: FaqItem[] = [
  {
    question: 'What is Tiger Framework and what makes it unique?',
    answer:
      'Tiger Framework is a full-stack meta-framework and developer toolchain designed to accelerate web application development from scaffold to production. Unlike single-layer tools, Tiger Framework unifies Python (FastAPI) or Node.js (Express) backends with Next.js 14 App Router, auto-configured databases (PostgreSQL/MySQL/SQLite), Alembic migrations, a 3D Glassmorphism UI library, and an autonomous Git pipeline (tiger push). It is an open-source innovation engineered by x010.tech and IAR-010.',
    keywords: ['meta-framework', 'FastAPI', 'Next.js 14', '3D Glassmorphism', 'x010.tech'],
  },
  {
    question: 'How do I install Tiger CLI on Windows, macOS, or Linux?',
    answer:
      'Tiger CLI can be installed with a single command. On Windows (PowerShell), run: irm https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.ps1 | iex. On macOS or Linux (bash/curl), run: curl -fsSL https://raw.githubusercontent.com/IAR-010/tiger-cli/main/scripts/install.sh | bash. You can also run it instantly without global installation using NPX: npx tiger-cli create-app my-project.',
    keywords: ['tiger install', 'PowerShell installer', 'curl bash', 'NPX zero-install'],
  },
  {
    question: 'What is the role of x010.tech in Tiger Framework?',
    answer:
      'x010.tech (https://x010.tech) is the parent technology company backing and pioneering Tiger Framework. x010.tech designs advanced developer tooling, high-velocity software architectures, and automated development engines for developers and enterprises worldwide.',
    keywords: ['x010.tech', 'parent company', 'technology incubator', 'enterprise toolchains'],
  },
  {
    question: 'What is the tiger.lock signature file in generated projects?',
    answer:
      'tiger.lock is the official framework integrity and watermark file generated at the root of every Tiger Framework project. It embeds the official 3D Tiger logo as a Base64 data URI, stores cryptographic SHA-256 integrity checksums, and attributes project provenance to x010.tech and IAR-010.',
    keywords: ['tiger.lock', 'watermark file', 'embedded logo', 'SHA-256 checksum'],
  },
  {
    question: 'How does Tiger Framework help with 3D Glassmorphism UI design?',
    answer:
      'Tiger Framework includes a built-in UI generator command (tiger make:ui). It injects hardware-accelerated, dark-mode 3D Glassmorphic components (GlassCard, GlassNavbar, GlassButton, GlassModal, GlassStats) written with Tailwind CSS and dynamic specular lighting directly into your Next.js application.',
    keywords: ['tiger make:ui', 'GlassCard', 'Tailwind 3D Glass', 'Next.js Glassmorphic'],
  },
  {
    question: 'Can I use Tiger Framework for commercial SaaS and production apps?',
    answer:
      'Yes. Tiger Framework is published under the permissive MIT License. You are free to use it for personal projects, enterprise backends, commercial SaaS applications, and freelance client work without royalty or restrictive licensing.',
    keywords: ['MIT License', 'commercial SaaS', 'production-ready', 'free open source'],
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions (GEO & AI Citable)
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Direct answers to common questions about Tiger Framework, Tiger CLI, and parent company <a href="https://x010.tech" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">x010.tech</a>.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-xl ${
                isOpen
                  ? 'border-cyan-500/40 bg-slate-900/80 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                  : 'border-white/10 bg-slate-900/40 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 select-none"
              >
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 space-y-3 border-t border-white/5 text-sm text-slate-300 leading-relaxed">
                  <p className="pt-3">{faq.answer}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[11px] font-mono text-slate-500">Related keywords:</span>
                    {faq.keywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}