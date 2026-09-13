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
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform overflow-hidden p-1">
            <img src="/logo.png" alt="Tiger Logo" className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
          </div>
          <span className="text-lg font-black tracking-wider text-white">
            {brandName} <span className="text-cyan-400 font-light">FRAMEWORK</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all">
            Get Started
          </button>
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
