"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger the reveal animation once when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)] py-32 lg:py-40"
    >
      {/* --- BACKGROUND ATMOSPHERE --- */}
      {/* 1. Central Radial Glow (Originating from behind the button area) */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--purple-glow-strong)] blur-[120px] opacity-40 pointer-events-none"></div>

      {/* 2. Concentric Security Rings */}
      <div className="absolute left-1/2 top-1/2 -z-20 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="absolute h-[300px] w-[300px] rounded-full border border-[var(--purple-bright)] animate-[ping_8s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="absolute h-[500px] w-[500px] rounded-full border border-[var(--purple-primary)] opacity-50"></div>
        <div className="absolute h-[800px] w-[800px] rounded-full border border-[var(--border-purple)] opacity-30"></div>
        <div className="absolute h-[1100px] w-[1100px] rounded-full border border-[var(--border-subtle)] opacity-20"></div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="shield-container relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div
          className={`transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--purple-bright)]">
            Ready to Investigate?
          </span>
        </div>

        {/* Main Heading */}
        <h2
          className={`mt-6 flex flex-col text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl transition-all duration-700 delay-100 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="text-white">Before you trust it.</span>
          <span className="mt-2 bg-gradient-to-r from-[var(--purple-light)] to-[var(--purple-primary)] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            Ask ShieldSense.
          </span>
        </h2>

        {/* Description */}
        <p
          className={`mt-6 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base transition-all duration-700 delay-200 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          Investigate suspicious links, messages, and files before they become a
          security problem.
        </p>

        {/* Primary CTA Button */}
        <div
          className={`mt-10 transition-all duration-700 delay-300 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <Link
            href="/scan"
            className="group relative inline-flex items-center justify-center gap-3 rounded-md bg-[var(--purple-primary)] px-10 py-4 text-sm font-bold text-white shadow-[0_0_20px_var(--purple-glow-strong)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--purple-bright)] hover:shadow-[0_0_35px_var(--purple-glow-strong)]"
          >
            Start Investigation
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>

        {/* Trust Strip */}
        <div
          className={`mt-12 flex flex-wrap justify-center gap-4 text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-60 transition-all duration-700 delay-500 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span>NO ACCOUNT REQUIRED</span>
          <span className="hidden sm:inline">•</span>
          <span>EXPLAINABLE RESULTS</span>
          <span className="hidden sm:inline">•</span>
          <span>EVIDENCE-DRIVEN ANALYSIS</span>
        </div>

        {/* System Status */}
        <div
          className={`mt-16 flex items-center justify-center gap-2 transition-all duration-1000 delay-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-safe)] animate-pulse glow-safe"></span>
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
            SHIELDSENSE ENGINE READY
          </span>
        </div>
      </div>
    </section>
  );
}
