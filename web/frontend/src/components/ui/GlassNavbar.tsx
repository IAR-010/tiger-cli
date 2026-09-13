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
  items = [
    { label: "Features", href: "#features" },
    { label: "Docs", href: "#docs" },
    { label: "Architecture", href: "#architecture" },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto max-w-6xl px-4">
      <nav className="relative flex items-center justify-between rounded-2xl border border-white/10 
        bg-slate-950/40 px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
        backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300">
        
        {/* Brand Logo & Parent Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform overflow-hidden p-1">
              <img src="/logo.png" alt="Tiger Logo" className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
            </div>
            <span className="text-lg font-black tracking-wider text-white">
              TIGER <span className="text-cyan-400 font-light">FRAMEWORK</span>
            </span>
          </Link>
          <a
            href="https://x010.tech"
            target="_blank"
            rel="noopener noreferrer"
            title="Parent Company: x010.tech"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-mono font-medium text-cyan-300 transition-all hover:scale-105"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            by x010.tech
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="#terminal" className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors">
            Terminal
          </Link>
          <Link href="#playground" className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors">
            3D UI Kit
          </Link>
          <Link href="#commands" className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors">
            CLI Docs
          </Link>
          <Link href="#comparison" className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors">
            Benchmark
          </Link>
          <a
            href="https://github.com/IAR-010/tiger-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            GitHub ★
          </a>
          <a
            href="#install"
            className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            Install CLI
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>
    </header>
  );
};

export default GlassNavbar;
