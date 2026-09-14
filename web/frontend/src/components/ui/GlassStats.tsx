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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
        {change && (
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};


export default GlassStats;
