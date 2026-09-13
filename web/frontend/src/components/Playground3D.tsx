'use client';

import React, { useState, useRef } from 'react';
import GlassCard from './ui/GlassCard';
import GlassButton from './ui/GlassButton';
import GlassStats from './ui/GlassStats';
import GlassModal from './ui/GlassModal';
import { Sliders, Sparkles, ShieldCheck } from 'lucide-react';

type ActiveTab = 'card' | 'stats' | 'button' | 'modal';
type GlowColor = 'cyan' | 'amber' | 'purple' | 'emerald';

export default function Playground3D() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('card');
  const [blurValue, setBlurValue] = useState(16);
  const [opacityValue, setOpacityValue] = useState(6);
  const [glowColor, setGlowColor] = useState<GlowColor>('cyan');
  const [modalOpen, setModalOpen] = useState(false);

  // 3D tilt interaction state
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const glowStyles = {
    cyan: 'border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.25)] text-cyan-400',
    amber: 'border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.25)] text-amber-400',
    purple: 'border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.25)] text-purple-400',
    emerald: 'border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.25)] text-emerald-400',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Control Panel */}
      <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold border-b border-white/10 pb-3">
          <Sliders className="w-5 h-5" />
          <span>Realtime 3D Glass Customizer</span>
        </div>

        {/* Component Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Component</label>
          <div className="grid grid-cols-2 gap-2">
            {(['card', 'stats', 'button', 'modal'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                  activeTab === tab
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-800/50 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Glass{tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Backdrop Blur Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Backdrop Blur</span>
            <span className="text-cyan-400">{blurValue}px</span>
          </div>
          <input
            type="range"
            min="4"
            max="36"
            value={blurValue}
            onChange={(e) => setBlurValue(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Background Opacity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Surface Opacity</span>
            <span className="text-cyan-400">{opacityValue}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={opacityValue}
            onChange={(e) => setOpacityValue(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Glow Color Selector */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Neon Glow Accent</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'cyan', bg: 'bg-cyan-400', label: 'Cyan' },
              { id: 'amber', bg: 'bg-amber-400', label: 'Amber' },
              { id: 'purple', bg: 'bg-purple-400', label: 'Violet' },
              { id: 'emerald', bg: 'bg-emerald-400', label: 'Emerald' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setGlowColor(c.id as GlowColor)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                  glowColor === c.id
                    ? 'border-white/40 bg-white/10 text-white'
                    : 'border-white/5 bg-slate-800/40 text-slate-400'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${c.bg}`} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Import Hint */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 font-mono text-xs text-slate-400 space-y-1">
          <div className="text-cyan-300 font-semibold">// Inject directly with Tiger CLI</div>
          <div className="text-slate-300">tiger make:ui Glass{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</div>
        </div>
      </div>

      {/* Right Interactive Preview Canvas */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/90 via-slate-950 to-black relative min-h-[420px] overflow-hidden">
        {/* 3D Perspective Canvas with Live Tilt */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-md transition-all duration-75 select-none"
        >
          {activeTab === 'card' && (
            <div
              style={{
                backdropFilter: `blur(${blurValue}px)`,
                backgroundColor: `rgba(255, 255, 255, ${opacityValue / 100})`,
              }}
              className={`p-6 rounded-2xl border ${glowStyles[glowColor]} transition-colors duration-300 space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  3D GlassCard Preview
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Hardware Accelerated 3D
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Move your cursor across this card to experience responsive perspective rotation, reactive lighting, and customizable specular highlights.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-xs text-slate-400 font-mono">Tilt: {Math.round(rotateX)}° / {Math.round(rotateY)}°</span>
                <GlassButton size="sm" variant="primary">Interactive</GlassButton>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div
              style={{
                backdropFilter: `blur(${blurValue}px)`,
                backgroundColor: `rgba(255, 255, 255, ${opacityValue / 100})`,
              }}
              className={`p-6 rounded-2xl border ${glowStyles[glowColor]} transition-colors duration-300`}
            >
              <GlassStats
                label="Framework Build Velocity"
                value="1.2 ms"
                change="+480% faster"
                isPositive={true}
              />
            </div>
          )}

          {activeTab === 'button' && (
            <div
              style={{
                backdropFilter: `blur(${blurValue}px)`,
                backgroundColor: `rgba(255, 255, 255, ${opacityValue / 100})`,
              }}
              className={`p-10 rounded-2xl border ${glowStyles[glowColor]} transition-colors duration-300 flex flex-col items-center justify-center gap-4`}
            >
              <GlassButton size="lg" variant="primary">
                Primary Glow Button
              </GlassButton>
              <GlassButton size="md" variant="secondary">
                Secondary Glass
              </GlassButton>
            </div>
          )}

          {activeTab === 'modal' && (
            <div
              style={{
                backdropFilter: `blur(${blurValue}px)`,
                backgroundColor: `rgba(255, 255, 255, ${opacityValue / 100})`,
              }}
              className={`p-8 rounded-2xl border ${glowStyles[glowColor]} text-center space-y-4`}
            >
              <ShieldCheck className="w-10 h-10 mx-auto text-cyan-400" />
              <h4 className="text-lg font-bold text-white">3D Glass Modal</h4>
              <p className="text-xs text-slate-300">Trigger modal dialogs with smooth translucent backdrop blur.</p>
              <GlassButton size="sm" variant="primary" onClick={() => setModalOpen(true)}>
                Open Live Modal
              </GlassButton>

              <GlassModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Tiger Framework Modal"
              >
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">
                    This modal is rendered with deep backdrop blur and hardware acceleration. Injected straight from your Tiger CLI toolchain!
                  </p>
                  <div className="flex justify-end">
                    <GlassButton size="sm" variant="primary" onClick={() => setModalOpen(false)}>
                      Got It!
                    </GlassButton>
                  </div>
                </div>
              </GlassModal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}