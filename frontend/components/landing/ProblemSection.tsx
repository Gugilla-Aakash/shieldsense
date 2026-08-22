"use client";

import React, { useEffect, useState, useRef } from "react";

export default function ProblemSection() {
  const [stage, setStage] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Trigger the sequential animation exactly once
          setTimeout(() => setStage(1), 400); // Message appears
          setTimeout(() => setStage(2), 1400); // URL highlights
          setTimeout(() => setStage(3), 2200); // Evidence appears
          setTimeout(() => setStage(4), 3000); // State changes to SUSPICIOUS
        }
      },
      { threshold: 0.4 }, // Trigger when 40% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center py-24 bg-[var(--bg-base)]"
    >
      <div className="shield-container flex flex-col items-center text-center gap-16">
        {/* 1. Headers */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[var(--purple-bright)] opacity-50"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--purple-bright)]">
              The Security Gap
            </span>
            <span className="h-[1px] w-8 bg-[var(--purple-bright)] opacity-50"></span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="block text-[var(--text-muted)]">
              The problem isn't seeing the threat.
            </span>
            <span className="block mt-2 text-white">
              It's knowing what to trust.
            </span>
          </h2>
        </div>

        {/* 2. The Deceptive Threat Demonstration */}
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl relative">
          {/* Email/Message Card */}
          <div
            className={`w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 shadow-2xl text-left transition-all duration-700 ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${stage >= 4 ? "border-[var(--color-suspicious-border)] shadow-[0_0_30px_-5px_var(--color-suspicious-glow)]" : ""}`}
          >
            {/* Message Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-lg">✉</span>
                <span className="text-sm font-bold tracking-widest text-[var(--text-primary)]">
                  SECURITY ALERT
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  02:41 PM
                </span>
                {/* State Badge */}
                <span
                  className={`text-[0.65rem] font-bold tracking-widest px-2 py-1 rounded transition-colors duration-500 ${stage >= 4 ? "bg-[var(--color-suspicious)] text-[var(--bg-base)]" : "bg-[var(--surface-elevated)] text-[var(--text-muted)]"}`}
                >
                  {stage >= 4 ? "SUSPICIOUS" : "UNKNOWN"}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-4 text-sm text-[var(--text-secondary)]">
              <p className="font-semibold text-[var(--text-primary)]">
                Your account requires immediate verification.
              </p>
              <p>
                Unusual activity was detected on your account. Verify your
                identity to prevent suspension.
              </p>

              <button className="mt-2 w-fit rounded bg-[var(--text-primary)] px-6 py-2 text-xs font-bold text-[var(--bg-base)] pointer-events-none">
                Verify Account
              </button>

              {/* Suspicious URL */}
              <p className="mt-4 font-mono text-xs truncate">
                https://
                <span
                  className={`transition-colors duration-500 rounded px-1 ${stage >= 2 ? "bg-[var(--color-suspicious-bg)] text-[var(--color-suspicious)] font-bold border border-[var(--color-suspicious-border)]" : ""}`}
                >
                  secure-bank-verification
                </span>
                .example/login
              </p>
            </div>
          </div>

          {/* 3. Threat Indicators (Revealed at Stage 3) */}
          <div className="flex flex-wrap justify-center gap-3 absolute -bottom-4 z-10 w-full">
            <span
              className={`flex items-center gap-2 rounded border border-[var(--color-suspicious-border)] bg-[var(--surface)] px-3 py-1.5 text-[0.65rem] font-bold tracking-widest text-[var(--color-suspicious)] shadow-lg transition-all duration-500 ${stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              ⚠ LOOKALIKE DOMAIN
            </span>
            <span
              className={`flex items-center gap-2 rounded border border-[var(--color-suspicious-border)] bg-[var(--surface)] px-3 py-1.5 text-[0.65rem] font-bold tracking-widest text-[var(--color-suspicious)] shadow-lg transition-all duration-500 delay-100 ${stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              ⚠ URGENCY LANGUAGE
            </span>
            <span
              className={`flex items-center gap-2 rounded border border-[var(--color-suspicious-border)] bg-[var(--surface)] px-3 py-1.5 text-[0.65rem] font-bold tracking-widest text-[var(--color-suspicious)] shadow-lg transition-all duration-500 delay-200 ${stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              ⚠ CREDENTIAL REQUEST
            </span>
          </div>
        </div>

        {/* 4. The Architectural Comparison */}
        <div className="mt-8 flex w-full max-w-4xl flex-col items-stretch gap-8 lg:flex-row">
          {/* Traditional Security (Static, Binary) */}
          <div className="flex flex-1 flex-col items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 opacity-60 grayscale transition-opacity hover:opacity-100">
            <h3 className="mb-8 text-xs font-bold tracking-widest text-[var(--text-muted)]">
              TRADITIONAL SECURITY
            </h3>

            <div className="flex flex-col items-center gap-6 text-sm font-mono text-[var(--text-secondary)]">
              <div className="rounded border border-[var(--border-subtle)] px-4 py-2">
                Known threat?
              </div>

              <div className="flex w-full justify-center gap-12 relative">
                <div className="absolute top-0 left-1/2 h-[1px] w-24 -translate-x-1/2 bg-[var(--border-subtle)]"></div>
                <div className="absolute top-0 left-[calc(50%-3rem)] h-4 w-[1px] bg-[var(--border-subtle)]"></div>
                <div className="absolute top-0 right-[calc(50%-3rem)] h-4 w-[1px] bg-[var(--border-subtle)]"></div>

                <div className="flex flex-col items-center gap-3 pt-4">
                  <span className="text-[10px]">YES</span>
                  <div className="rounded bg-[var(--surface-elevated)] px-6 py-2 text-white">
                    BLOCK
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 pt-4">
                  <span className="text-[10px]">NO</span>
                  <div className="rounded bg-[var(--surface-elevated)] px-6 py-2 text-white">
                    ALLOW
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ShieldSense (Investigative, Contextual) */}
          <div className="flex flex-1 flex-col items-center rounded-xl border border-[var(--border-purple)] bg-[var(--surface-glass)] p-8 shadow-[0_0_30px_-10px_var(--purple-glow)]">
            <h3 className="mb-8 text-xs font-bold tracking-widest text-[var(--purple-bright)]">
              SHIELDSENSE
            </h3>

            <div className="flex flex-col gap-4 text-sm font-medium text-[var(--text-primary)]">
              <div className="flex items-center gap-4">
                <span className="text-[var(--purple-bright)]">↓</span> What is
                it?
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--purple-bright)]">↓</span> What is
                it trying to do?
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--purple-bright)]">↓</span> What
                evidence exists?
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--purple-bright)]">↓</span> How risky
                is it?
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--purple-bright)]">↓</span> Why?
              </div>
              <div className="flex items-center gap-4 text-white">
                <span className="text-[var(--purple-primary)]">↓</span> What
                should I do?
              </div>
            </div>
          </div>
        </div>

        {/* 5. Powerful Closing Statement */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-lg font-medium text-[var(--text-secondary)]">
            A warning tells you something is wrong.{" "}
            <span className="text-white font-bold">
              ShieldSense tells you why.
            </span>
          </p>
          <div className="mt-2 flex items-center gap-2 text-[var(--purple-bright)] opacity-60">
            <span className="font-mono text-xs tracking-[-0.15em]">
              ──────────────────────────────→
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
