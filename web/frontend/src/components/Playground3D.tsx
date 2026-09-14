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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Control Panel */}
      <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-5">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold border-b border-zinc-800 pb-3">
          <Sliders className="w-4 h-4 text-zinc-400" />
          <span className="text-sm">Component Inspector & Playground</span>
        </div>

        {/* Component Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Active Component</label>
          <div className="grid grid-cols-2 gap-2">
            {(['card', 'stats', 'button', 'modal'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize border transition-colors ${
                  activeTab === tab
                    ? 'bg-zinc-800 border-zinc-700 text-white'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200'
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
            <span className="text-zinc-400">Backdrop Blur</span>
            <span className="text-zinc-200">{blurValue}px</span>
          </div>
          <input
            type="range"
            min="4"
            max="36"
            value={blurValue}
            onChange={(e) => setBlurValue(Number(e.target.value))}
            className="w-full accent-zinc-200 bg-zinc-800 h-1 rounded cursor-pointer"
          />
        </div>

        {/* Background Opacity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">Surface Opacity</span>
            <span className="text-zinc-200">{opacityValue}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={opacityValue}
            onChange={(e) => setOpacityValue(Number(e.target.value))}
            className="w-full accent-zinc-200 bg-zinc-800 h-1 rounded cursor-pointer"
          />
        </div>

        {/* Command Injection Snippet */}
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-400 space-y-1">
          <div className="text-zinc-300 font-semibold">$ tiger make:ui Glass{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</div>
          <div className="text-[11px] text-zinc-500">Injects TypeScript + Tailwind component into frontend/src/components/ui</div>
        </div>
      </div>

      {/* Right Interactive Preview Canvas */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-xl border border-zinc-800 bg-zinc-950 relative min-h-[380px]">
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
              className="p-6 rounded-xl border border-zinc-700 bg-zinc-900/60 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                  GlassCard Preview
                </span>
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Hardware Accelerated 3D Engine
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Move your cursor across this card to experience responsive perspective rotation, reactive lighting, and customizable specular highlights.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                <span className="text-xs text-zinc-500 font-mono">Tilt: {Math.round(rotateX)}° / {Math.round(rotateY)}°</span>
                <GlassButton size="sm" variant="secondary">Interactive</GlassButton>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40">
              <GlassStats
                label="Scaffold Engine Velocity"
                value="1.2 ms"
                change="+480% faster"
                isPositive={true}
              />
            </div>
          )}

          {activeTab === 'button' && (
            <div className="p-10 rounded-xl border border-zinc-800 bg-zinc-900/40 flex flex-col items-center justify-center gap-3">
              <GlassButton size="md" variant="primary">
                Primary Button
              </GlassButton>
              <GlassButton size="md" variant="secondary">
                Secondary Outline
              </GlassButton>
            </div>
          )}

          {activeTab === 'modal' && (
            <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 text-center space-y-4">
              <ShieldCheck className="w-8 h-8 mx-auto text-zinc-300" />
              <h4 className="text-sm font-bold text-white">3D Glass Modal</h4>
              <p className="text-xs text-zinc-400">Trigger modal dialogs with smooth translucent backdrop blur.</p>
              <GlassButton size="sm" variant="primary" onClick={() => setModalOpen(true)}>
                Open Modal Preview
              </GlassButton>

              <GlassModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Tiger Framework Modal"
              >
                <div className="space-y-4">
                  <p className="text-xs text-zinc-300">
                    This modal is rendered with deep backdrop blur and hardware acceleration. Injected straight from your Tiger CLI toolchain.
                  </p>
                  <div className="flex justify-end">
                    <GlassButton size="sm" variant="primary" onClick={() => setModalOpen(false)}>
                      Close
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