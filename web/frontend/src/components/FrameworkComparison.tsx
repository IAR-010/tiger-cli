'use client';

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function FrameworkComparison() {
  const rows = [
    { feature: 'Instant Full-Stack Scaffold (FastAPI/Express + Next.js 14)', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Built-in 3D Glassmorphism UI Component Library', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Autonomous Git Pipeline (tiger push auto-stage & push)', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Multi-DB Connector & Automated Migrations', tiger: true, nextjs: false, django: true, laravel: true },
    { feature: 'Integrated AI Route Synthesizer & Error Diagnosis', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Hardened Production Nginx SSL & Docker Orchestration', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Interactive In-Terminal Studio Dashboard', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Scaffold Generation Benchmark', tigerText: '< 2 sec', nextText: '~45 sec', djangoText: '~60 sec', laravelText: '~90 sec' },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-400" />
            Framework Architecture & Velocity Comparison
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Compare full-stack developer velocity against traditional frameworks.
          </p>
        </div>
        <div className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono">
          x010.tech benchmark
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-400 font-mono text-xs">
              <th className="py-3 px-5 font-medium">Capabilities</th>
              <th className="py-3 px-5 font-semibold text-white bg-zinc-800/40 border-x border-zinc-800 text-center">
                Tiger Framework
              </th>
              <th className="py-3 px-5 text-center">Next.js (Manual)</th>
              <th className="py-3 px-5 text-center">Django</th>
              <th className="py-3 px-5 text-center">Laravel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 font-mono text-xs">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                <td className="py-3.5 px-5 font-sans text-xs text-zinc-300 font-normal">
                  {row.feature}
                </td>
                <td className="py-3.5 px-5 text-center bg-zinc-800/20 border-x border-zinc-800 font-medium text-white">
                  {row.tigerText ? (
                    <span className="text-zinc-100 font-semibold">{row.tigerText}</span>
                  ) : (
                    <Check className="w-4 h-4 mx-auto text-zinc-100" />
                  )}
                </td>
                <td className="py-3.5 px-5 text-center text-zinc-500">
                  {row.nextText ? row.nextText : <X className="w-3.5 h-3.5 mx-auto text-zinc-600" />}
                </td>
                <td className="py-3.5 px-5 text-center text-zinc-500">
                  {row.djangoText ? row.djangoText : row.django ? <Check className="w-3.5 h-3.5 mx-auto text-zinc-400" /> : <X className="w-3.5 h-3.5 mx-auto text-zinc-600" />}
                </td>
                <td className="py-3.5 px-5 text-center text-zinc-500">
                  {row.laravelText ? row.laravelText : row.laravel ? <Check className="w-3.5 h-3.5 mx-auto text-zinc-400" /> : <X className="w-3.5 h-3.5 mx-auto text-zinc-600" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}