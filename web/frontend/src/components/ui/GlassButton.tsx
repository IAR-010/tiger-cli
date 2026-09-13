"use client";

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
