"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

interface GlassNavbarProps {
  brandName?: string;
  items?: NavItem[];
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  brandName = "TIGER",
  items = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo + Brand Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Tiger Framework Logo"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-semibold tracking-wider text-white uppercase group-hover:text-zinc-200 transition-colors">
              Tiger <span className="text-zinc-500 font-normal">Framework</span>
            </span>
          </Link>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <a
            href="https://x010.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            by x010.tech
          </a>
        </div>

        {/* Center/Right: Clean Minimal Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
          <a href="#terminal" onClick={(e) => scrollToSection(e, 'terminal')} className="hover:text-zinc-100 transition-colors">
            Terminal
          </a>
          <a href="#architecture" onClick={(e) => scrollToSection(e, 'architecture')} className="hover:text-zinc-100 transition-colors">
            Architecture
          </a>
          <a href="#commands" onClick={(e) => scrollToSection(e, 'commands')} className="hover:text-zinc-100 transition-colors">
            Commands
          </a>
          <a href="#benchmark" onClick={(e) => scrollToSection(e, 'benchmark')} className="hover:text-zinc-100 transition-colors">
            Benchmark
          </a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-zinc-100 transition-colors">
            FAQ
          </a>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/IAR-010/tiger-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="#install"
            onClick={(e) => scrollToSection(e, 'install')}
            className="px-3.5 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white p-1"
          aria-label="Toggle navigation"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-6 py-4 space-y-3 text-xs text-zinc-300">
          <div><a href="#terminal" onClick={(e) => scrollToSection(e, 'terminal')} className="block py-1 hover:text-white">Terminal</a></div>
          <div><a href="#architecture" onClick={(e) => scrollToSection(e, 'architecture')} className="block py-1 hover:text-white">Architecture</a></div>
          <div><a href="#commands" onClick={(e) => scrollToSection(e, 'commands')} className="block py-1 hover:text-white">Commands</a></div>
          <div><a href="#benchmark" onClick={(e) => scrollToSection(e, 'benchmark')} className="block py-1 hover:text-white">Benchmark</a></div>
          <div><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="block py-1 hover:text-white">FAQ</a></div>
          <div className="pt-2 border-t border-zinc-800 flex gap-2">
            <a
              href="https://github.com/IAR-010/tiger-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded border border-zinc-800 bg-zinc-900 text-zinc-300"
            >
              GitHub
            </a>
            <a
              href="#install"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2 rounded bg-zinc-100 text-zinc-950 font-medium"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlassNavbar;

