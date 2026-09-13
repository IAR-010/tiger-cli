"use client";

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
