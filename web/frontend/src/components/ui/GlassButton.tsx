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
      "bg-zinc-100 text-zinc-950 hover:bg-white border-zinc-200 shadow-sm",
    secondary:
      "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white",
    danger:
      "bg-red-950/40 border-red-900/60 text-red-300 hover:bg-red-900/50",
  };

  return (
    <button
      className={`relative inline-flex items-center justify-center gap-2 font-medium rounded-lg 
        border transition-colors duration-150 active:scale-[0.98] 
        disabled:opacity-50 disabled:pointer-events-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};



export default GlassButton;
