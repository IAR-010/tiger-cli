'use client';

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function FrameworkComparison() {
  const rows = [
    { feature: 'Instant Full-Stack Scaffold (FastAPI/Express + Next.js 14)', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Built-in 3D Glassmorphism Hardware-Accelerated UI Kit', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Autonomous Git Pipeline (tiger push auto-init & push)', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Multi-DB Connector & Automated Alembic Migrations', tiger: true, nextjs: false, django: true, laravel: true },
    { feature: 'Integrated AI Route Synthesizer & Error Diagnosis', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Hardened Production Nginx SSL & Docker Orchestration', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Interactive In-Terminal Studio GUI (tiger studio)', tiger: true, nextjs: false, django: false, laravel: false },
    { feature: 'Scaffold Generation Speed', tigerText: '< 2 sec', nextText: '~45 sec', djangoText: '~60 sec', laravelText: '~90 sec' },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Why Developers Choose Tiger Framework
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Compare full-stack developer velocity against traditional frameworks.
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
          x010.tech benchmark
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/60 text-slate-400 font-mono text-xs">
              <th className="py-4 px-6 font-medium">Capabilities</th>
              <th className="py-4 px-6 font-bold text-cyan-400 bg-cyan-500/10 border-x border-cyan-500/20 text-center">
                Tiger Framework 🐅
              </th>
              <th className="py-4 px-6 text-center">Next.js (Manual)</th>
              <th className="py-4 px-6 text-center">Django</th>
              <th className="py-4 px-6 text-center">Laravel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono text-xs">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-sans text-xs md:text-sm text-slate-300 font-medium">
                  {row.feature}
                </td>
                <td className="py-4 px-6 text-center bg-cyan-500/[0.05] border-x border-cyan-500/20 font-bold text-cyan-300">
                  {row.tigerText ? (
                    <span className="text-emerald-400 font-bold">{row.tigerText}</span>
                  ) : (
                    <Check className="w-4 h-4 mx-auto text-emerald-400" />
                  )}
                </td>
                <td className="py-4 px-6 text-center text-slate-500">
                  {row.nextText ? row.nextText : <X className="w-4 h-4 mx-auto text-rose-500/60" />}
                </td>
                <td className="py-4 px-6 text-center text-slate-500">
                  {row.djangoText ? row.djangoText : row.django ? <Check className="w-4 h-4 mx-auto text-slate-400" /> : <X className="w-4 h-4 mx-auto text-rose-500/60" />}
                </td>
                <td className="py-4 px-6 text-center text-slate-500">
                  {row.laravelText ? row.laravelText : row.laravel ? <Check className="w-4 h-4 mx-auto text-slate-400" /> : <X className="w-4 h-4 mx-auto text-rose-500/60" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}