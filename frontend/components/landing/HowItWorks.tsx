"use client";

import React, { useState, useEffect } from "react";

const STAGES = [
  {
    id: "01",
    title: "DETECT",
    desc: "Find suspicious signals in the submitted content.",
  },
  {
    id: "02",
    title: "INVESTIGATE",
    desc: "Examine URLs, language, identity, and context.",
  },
  {
    id: "03",
    title: "SCORE",
    desc: "Combine evidence into a 0–100 risk score.",
  },
  {
    id: "04",
    title: "EXPLAIN",
    desc: "Turn technical evidence into understandable reasoning.",
  },
  { id: "05", title: "PROTECT", desc: "Recommend the safest next action." },
];

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0);

  // Synchronized animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 2500); // 2.5 seconds per stage
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-20 lg:py-24 overflow-hidden">
      <div className="shield-container flex w-full flex-col items-center text-center gap-16">
        {/* 1. Header Area */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-[var(--purple-bright)] opacity-50"></span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--purple-bright)]">
              How ShieldSense Thinks
            </span>
            <span className="h-[1px] w-6 bg-[var(--purple-bright)] opacity-50"></span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            From suspicious input to confident action.
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            ShieldSense combines security signals, investigation, risk scoring,
            and AI reasoning to turn uncertainty into an actionable decision.
          </p>
        </div>

        {/* 2. Pipeline Container */}
        <div className="w-full max-w-5xl relative">
          {/* Metadata */}
          <div className="mb-8 hidden w-full justify-between text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-60 md:flex">
            <span>ANALYSIS PIPELINE</span>
            <span className="text-[var(--purple-bright)]">
              NODE / 0{activeStage + 1}
            </span>
          </div>

          {/* 
            PIPELINE ARCHITECTURE
            Mobile: Vertical | Desktop: Horizontal
          */}
          <div className="relative flex flex-col gap-6 md:flex-row md:gap-0">
            {/* Background Line (Inactive) */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-[var(--bg-tertiary)] md:left-4 md:right-4 md:top-[27px] md:h-[2px] md:w-auto md:bottom-auto"></div>

            {/* Active Travelling Line */}
            <div
              className="absolute left-[27px] top-4 w-[2px] bg-[var(--purple-bright)] shadow-[0_0_10px_var(--purple-bright)] transition-all duration-700 ease-in-out md:left-4 md:top-[27px] md:h-[2px] md:w-auto md:bottom-auto"
              style={{
                height: `calc(${(activeStage / (STAGES.length - 1)) * 100}% - 2rem)`,
                width: `calc(${(activeStage / (STAGES.length - 1)) * 100}% - 2rem)`, // CSS will override based on media query via tailwind arbitrary values, handled mostly by standard layout, but doing inline trick:
              }}
            >
              {/* Desktop Width Override via inline style trickery for responsive - easiest to just let CSS handle the responsive axes */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                @media (min-width: 768px) {
                  .active-line { height: 2px !important; width: calc(${(activeStage / (STAGES.length - 1)) * 100}%) !important; }
                }
                @media (max-width: 767px) {
                  .active-line { width: 2px !important; height: calc(${(activeStage / (STAGES.length - 1)) * 100}%) !important; }
                }
              `,
                }}
              />
              <div className="active-line w-full h-full bg-[var(--purple-bright)] shadow-[0_0_10px_var(--purple-bright)] transition-all duration-700 ease-in-out absolute top-0 left-0" />
            </div>

            {/* Stages */}
            {STAGES.map((stage, index) => {
              const isActive = index === activeStage;
              const isPast = index <= activeStage;

              return (
                <div
                  key={stage.id}
                  className="relative z-10 flex flex-1 flex-row items-start gap-6 md:flex-col md:items-center md:gap-6"
                >
                  {/* Node Connector / Dot */}
                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[var(--bg-secondary)] bg-[var(--bg-primary)] transition-all duration-500 ${isActive ? "shadow-[0_0_20px_var(--purple-glow-strong)]" : ""}`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full transition-all duration-500 ${isPast ? "bg-[var(--purple-bright)] shadow-[0_0_10px_var(--purple-bright)] scale-100" : "bg-[var(--bg-tertiary)] scale-75"}`}
                    />

                    {/* Pulsing signal on active node */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border border-[var(--purple-bright)] animate-[ping_2s_ease-out_infinite] opacity-50"></div>
                    )}
                  </div>

                  {/* Stage Card */}
                  <div
                    className={`flex flex-col text-left transition-all duration-500 md:text-center ${isActive ? "scale-105 opacity-100" : "scale-95 opacity-50"} ${isActive ? "md:-translate-y-2" : ""}`}
                  >
                    <div
                      className={`rounded-xl border p-5 transition-colors duration-500 min-h-[140px] md:min-h-[160px] ${isActive ? "border-[var(--border-purple)] bg-[var(--surface-glass)] shadow-lg" : "border-[var(--border-subtle)] bg-[var(--bg-primary)]"}`}
                    >
                      <div className="mb-3 flex items-center justify-between md:justify-center">
                        <span
                          className={`text-[0.65rem] font-bold tracking-[0.2em] ${isActive ? "text-[var(--purple-light)]" : "text-[var(--text-muted)]"}`}
                        >
                          {stage.id}
                        </span>
                        {isActive && (
                          <span className="text-[0.55rem] font-bold uppercase tracking-widest text-[var(--purple-bright)] md:hidden">
                            ● Active
                          </span>
                        )}
                      </div>
                      <h3
                        className={`mb-2 text-sm font-bold tracking-widest ${isActive ? "text-white" : "text-[var(--text-secondary)]"}`}
                      >
                        {stage.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Metadata */}
          <div className="mt-12 flex justify-center gap-4 text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-60">
            <span>Multi-Signal Analysis</span>
            <span>•</span>
            <span>Evidence-Driven</span>
            <span>•</span>
            <span>Explainable</span>
          </div>
        </div>

        {/* 3. Input Types Footer */}
        <div className="mt-8 flex w-full max-w-4xl flex-col items-center gap-6 border-t border-[var(--border-subtle)] pt-12">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
            What can ShieldSense analyze?
          </span>

          <div className="flex flex-wrap justify-center gap-4 w-full">
            {["🔗 LINK", "✉ EMAIL", "📄 FILE", "💬 MESSAGE"].map((type) => (
              <div
                key={type}
                className="group flex flex-1 min-w-[140px] cursor-default items-center justify-center gap-2 rounded border border-[var(--border-subtle)] bg-[var(--surface)] px-6 py-4 transition-all hover:-translate-y-1 hover:border-[var(--border-purple)] hover:shadow-[0_4px_15px_var(--purple-glow)]"
              >
                <span className="text-xs font-bold tracking-widest text-[var(--text-muted)] transition-colors group-hover:text-[var(--purple-bright)]">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
