"use client";

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
