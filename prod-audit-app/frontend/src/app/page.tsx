import React from "react";
import GlassNavbar from "@/components/ui/GlassNavbar";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";
import GlassStats from "@/components/ui/GlassStats";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white selection:bg-amber-400 selection:text-slate-950 overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-cyan-500/15 to-purple-500/20 blur-[130px] pointer-events-none" />

      <GlassNavbar brandName="PROD-AUDIT-APP" />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-20">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-2 shadow-[0_0_40px_rgba(6,182,212,0.35)] backdrop-blur-xl hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Tiger Logo" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-wide">
            Tiger Framework Meta-Stack
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Crafted for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500">Unmatched Speed</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Your full-stack foundation with <strong>Python (FastAPI)</strong>, <strong>PostgreSQL</strong>, and <strong>Next.js 14 App Router</strong> with 3D Glassmorphic components.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <GlassButton variant="primary" size="lg">Explore Docs</GlassButton>
            <GlassButton variant="secondary" size="lg">View Architecture</GlassButton>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <GlassStats label="API Latency" value="1.8 ms" change="-24%" isPositive={true} />
          <GlassStats label="Scaffold Velocity" value="< 2 sec" change="10x Faster" isPositive={true} />
          <GlassStats label="Stack Health" value="100%" change="Production Ready" isPositive={true} />
        </div>

        {/* 3D Glass Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <GlassCard
            title="Backend Integration"
            subtitle="Python (FastAPI) + PostgreSQL"
            glowColor="amber"
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              Auto-configured ORM models, async database connection pooling, OpenAPI interactive docs, and containerized deployment.
            </p>
          </GlassCard>

          <GlassCard
            title="3D Glassmorphism System"
            subtitle="Tailwind CSS + Hardware-Accelerated Transforms"
            glowColor="cyan"
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              Perspective tilting, dynamic specular lighting, and customizable neon glows designed for high-end SaaS applications.
            </p>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
