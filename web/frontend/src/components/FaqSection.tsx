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
      'Tiger CLI can be installed directly through official package managers without GitHub scripts. For Node.js/JavaScript developers, run: npm install -g tiger-cli. For Python developers, run: pip install tiger-cli. You can also run it instantly without global installation using NPX: npx tiger-cli create-app my-project.',
    keywords: ['npm install tiger-cli', 'pip install tiger-cli', 'NPX zero-install'],
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
    <section id="faq" className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-400" /> FAQ & Technical Specification
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Architecture, workflow, and engineering details behind Tiger Framework and <a href="https://x010.tech" target="_blank" rel="noopener noreferrer" className="text-zinc-200 underline underline-offset-4 hover:text-white">x010.tech</a>.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-colors overflow-hidden reveal-item reveal-delay-${(idx % 6) + 1} ${
                isOpen
                  ? 'border-zinc-700 bg-zinc-900/60'
                  : 'border-zinc-800 bg-zinc-900/20 hover:border-zinc-700/60'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 select-none"
              >
                <span className="text-sm sm:text-base font-semibold text-zinc-200">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 space-y-3 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  <p className="pt-3">{faq.answer}</p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-zinc-600">Tags:</span>
                    {faq.keywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded bg-zinc-800/50 border border-zinc-700/40 text-[10px] font-mono text-zinc-400"
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