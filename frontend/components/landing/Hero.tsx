import React from "react";
import ThreatDemo from "./ThreatDemo";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-[var(--bg-base)]">
      {/* Subtle Technical Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      <div className="shield-container relative z-10 flex flex-col items-center justify-between gap-16 py-16 lg:flex-row lg:py-24">
        {/* LEFT — MESSAGE (60%) */}
        <div className="flex w-full flex-col items-start gap-8 lg:w-[55%]">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[var(--purple-bright)] opacity-50"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--purple-bright)]">
              AI-Powered Digital Security
            </span>
          </div>

          <h1 className="flex flex-col text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span>Don't just know</span>
            <span className="text-[var(--text-secondary)]">
              it's dangerous.
            </span>
            <span className="mt-2 bg-gradient-to-r from-[var(--purple-light)] to-[var(--purple-primary)] bg-clip-text text-transparent drop-shadow-sm">
              KNOW WHY.
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            ShieldSense investigates suspicious links, files, emails, and
            messages using security analysis and AI reasoning — so you can make
            safer decisions before you click.
          </p>

          <div className="mt-2 flex w-full flex-col gap-4 sm:flex-row sm:items-center">
            <button className="glow-purple-sm group flex items-center justify-center gap-2 rounded-md bg-[var(--purple-primary)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--purple-bright)]">
              Start Investigation
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <button className="group flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-white">
              Explore the System
              <span className="transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)]">●</span> Heuristic
              Analysis
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)]">●</span> AI
              Reasoning
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)]">●</span>{" "}
              Explainable Results
            </span>
          </div>
        </div>

        {/* RIGHT — SECURITY SYSTEM CONSOLE (40%) */}
        <div className="relative w-full lg:w-[45%]">
          {/* Hero Background Radial Light */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--purple-glow)] blur-[100px] pointer-events-none" />

          {/* Security Signal pointing to the console */}
          <div className="absolute -left-12 top-16 hidden items-center gap-1 text-[var(--purple-bright)] opacity-60 lg:flex z-20">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-bright)] animate-pulse shadow-[0_0_8px_var(--purple-bright)]"></span>
            <span className="font-mono text-xs tracking-[-0.15em]">
              ────────────→
            </span>
          </div>

          {/* Animated Component */}
          <ThreatDemo />
        </div>
      </div>
    </section>
  );
}
