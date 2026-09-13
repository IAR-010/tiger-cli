"""3D Glassmorphism and Dark Mode UI Component Library for Tiger Framework."""

from pathlib import Path
from typing import Dict, List, Optional
from rich.console import Console

console = Console(safe_box=True)

GLASS_CARD_TSX = '''"use client";

import React, { useState } from "react";

interface GlassCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "emerald" | "amber";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  glowColor = "cyan",
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const glowStyles = {
    cyan: "hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] border-cyan-500/20",
    purple: "hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] border-purple-500/20",
    emerald: "hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] border-emerald-500/20",
    amber: "hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] border-amber-500/20",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -7);
    setRotateY(((x - centerX) / centerX) * 7);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="transition-transform duration-300 ease-out"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] 
          backdrop-blur-xl border p-6 transition-all duration-300 ease-out
          text-slate-100 shadow-2xl ${glowStyles[glowColor]} ${className}`}
      >
        {/* Ambient Specular Highlight */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        {title && (
          <div className="mb-4">
            <h3 className="text-xl font-bold tracking-tight text-white">{title}</h3>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default GlassCard;
'''

GLASS_NAVBAR_TSX = '''"use client";

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
'''

GLASS_BUTTON_TSX = '''"use client";

import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-amber-500/20 border-amber-400/40 text-amber-200 hover:bg-amber-500/30 hover:border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    secondary:
      "bg-white/[0.08] border-white/20 text-slate-100 hover:bg-white/[0.15] hover:border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    danger:
      "bg-rose-500/20 border-rose-400/40 text-rose-200 hover:bg-rose-500/30 hover:border-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  };

  return (
    <button
      className={`relative inline-flex items-center justify-center font-semibold rounded-xl 
        border backdrop-blur-md transition-all duration-200 ease-out active:scale-95 
        disabled:opacity-50 disabled:pointer-events-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlassButton;
'''

GLASS_MODAL_TSX = '''"use client";

import React from "react";

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const GlassModal: React.FC<GlassModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-2xl text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default GlassModal;
'''

GLASS_STATS_TSX = '''"use client";

import React from "react";

interface GlassStatsProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export const GlassStats: React.FC<GlassStatsProps> = ({
  label,
  value,
  change,
  isPositive = true,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-3xl font-extrabold text-white">{value}</p>
        {change && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default GlassStats;
'''

COMPONENTS_REGISTRY: Dict[str, Dict[str, str]] = {
    "GlassCard": {
        "filename": "GlassCard.tsx",
        "content": GLASS_CARD_TSX,
        "description": "Interactive 3D perspective tilt card with translucent glass & neon glow",
    },
    "GlassNavbar": {
        "filename": "GlassNavbar.tsx",
        "content": GLASS_NAVBAR_TSX,
        "description": "Frosted glass floating navigation bar with dark mode responsive menu",
    },
    "GlassButton": {
        "filename": "GlassButton.tsx",
        "content": GLASS_BUTTON_TSX,
        "description": "Tactile glowing glass button with animated feedback",
    },
    "GlassModal": {
        "filename": "GlassModal.tsx",
        "content": GLASS_MODAL_TSX,
        "description": "Translucent dialog modal with backdrop blur overlay",
    },
    "GlassStats": {
        "filename": "GlassStats.tsx",
        "content": GLASS_STATS_TSX,
        "description": "Metric dashboard card with frosted background and delta badge",
    },
}


def list_available_ui_components() -> List[str]:
    """Returns list of all available Glassmorphic UI components."""
    return list(COMPONENTS_REGISTRY.keys())


def inject_ui_component(component_name: str, target_root: Path) -> Path:
    """Injects a predefined Glassmorphic component into frontend/src/components/ui/."""
    # Find frontend directory
    comp_info = COMPONENTS_REGISTRY.get(component_name)
    if not comp_info:
        raise ValueError(f"Unknown component '{component_name}'. Available: {list_available_ui_components()}")

    # Determine destination
    if (target_root / "frontend" / "src" / "components" / "ui").exists():
        dest_dir = target_root / "frontend" / "src" / "components" / "ui"
    elif (target_root / "src" / "components" / "ui").exists():
        dest_dir = target_root / "src" / "components" / "ui"
    else:
        # Create standard location
        dest_dir = target_root / "frontend" / "src" / "components" / "ui"
        dest_dir.mkdir(parents=True, exist_ok=True)

    dest_file = dest_dir / comp_info["filename"]
    dest_file.write_text(comp_info["content"], encoding="utf-8")
    return dest_file
