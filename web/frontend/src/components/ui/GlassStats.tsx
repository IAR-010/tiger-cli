"use client";

import React, { useState, useEffect, useRef } from "react";

interface GlassStatsProps {
  label: string;
  value?: string | number;
  targetNumber?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change?: string;
  isPositive?: boolean;
}

export const GlassStats: React.FC<GlassStatsProps> = ({
  label,
  value,
  targetNumber,
  prefix = "",
  suffix = "",
  decimals = 0,
  change,
  isPositive = true,
}) => {
  const [displayValue, setDisplayValue] = useState<string | number>(
    targetNumber !== undefined
      ? `${prefix}0${suffix}`
      : (value || "")
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (targetNumber === undefined) {
      if (value !== undefined) setDisplayValue(value);
      return;
    }

    const startCountAnimation = () => {
      const duration = 1400; // 1.4s silky smooth deceleration
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic curve: fast start, buttery soft stop
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = easeProgress * targetNumber;

        const formattedNumber =
          decimals > 0
            ? currentCount.toFixed(decimals)
            : Math.floor(currentCount).toString();

        setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          const finalNumber =
            decimals > 0
              ? targetNumber.toFixed(decimals)
              : targetNumber.toString();
          setDisplayValue(`${prefix}${finalNumber}${suffix}`);
        }
      };

      requestAnimationFrame(updateCounter);
    };

    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetNumber, prefix, suffix, decimals, value]);

  return (
    <div ref={containerRef} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-bold tracking-tight text-white font-mono">{displayValue}</p>
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
