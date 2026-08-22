"use client";

import React, { useState, useEffect } from "react";

export default function ThreatDemo() {
  // State machine: idle -> intercepting -> analyzing -> calculating -> result
  const [phase, setPhase] = useState<
    "idle" | "intercepting" | "analyzing" | "calculating" | "result"
  >("idle");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [score, setScore] = useState(0);
  const [indicatorStep, setIndicatorStep] = useState(0);
  const [aiStep, setAiStep] = useState(0);

  // Orchestrate the cinematic timeline
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "idle") {
      // Start almost immediately to avoid the user staring at an empty console
      timeout = setTimeout(() => setPhase("intercepting"), 400);
    } else if (phase === "intercepting") {
      timeout = setTimeout(() => setPhase("analyzing"), 1000);
    } else if (phase === "analyzing") {
      if (analysisStep < 4) {
        timeout = setTimeout(() => setAnalysisStep((s) => s + 1), 700);
      } else {
        timeout = setTimeout(() => setPhase("calculating"), 600);
      }
    } else if (phase === "calculating") {
      // Rapid score rollup effect
      let currentScore = 0;
      const interval = setInterval(() => {
        currentScore += Math.floor(Math.random() * 10) + 3;
        if (currentScore >= 91) {
          setScore(91);
          clearInterval(interval);
          timeout = setTimeout(() => setPhase("result"), 600);
        } else {
          setScore(currentScore);
        }
      }, 50);
      return () => clearInterval(interval);
    } else if (phase === "result") {
      // Sequentially reveal evidence and AI text
      if (indicatorStep < 4) {
        timeout = setTimeout(() => setIndicatorStep((s) => s + 1), 300);
      } else if (aiStep < 2) {
        timeout = setTimeout(() => setAiStep((s) => s + 1), 800);
      } else {
        // Hold on result, then reset to loop
        timeout = setTimeout(() => {
          setPhase("idle");
          setAnalysisStep(0);
          setScore(0);
          setIndicatorStep(0);
          setAiStep(0);
        }, 7000);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, analysisStep, indicatorStep, aiStep]);

  // Dynamic progress percentage
  const getProgress = () => {
    if (phase === "idle") return 0;
    if (phase === "intercepting") return 15;
    if (phase === "analyzing") return 15 + analysisStep * 15; // Up to 75%
    if (phase === "calculating") return 85 + Math.floor(score / 10);
    if (phase === "result") return 100;
    return 0;
  };

  // Helper for analysis row states
  const renderRowState = (stepRequired: number, isFlagged: boolean = true) => {
    if (
      phase === "intercepting" ||
      (phase === "analyzing" && analysisStep < stepRequired)
    ) {
      return (
        <span className="text-[var(--text-muted)] animate-pulse flex items-center gap-2">
          <span className="text-[10px]">◌</span> SCANNING
        </span>
      );
    }
    if (isFlagged) {
      return (
        <span className="text-[var(--color-danger)] flex items-center gap-2 animate-in zoom-in duration-300">
          <span className="text-[10px]">⚠</span> FLAGGED
        </span>
      );
    }
    return (
      <span className="text-[var(--color-safe)] flex items-center gap-2 animate-in zoom-in duration-300">
        <span className="text-[10px]">✓</span> CHECKED
      </span>
    );
  };

  const isDanger =
    phase === "result" || (phase === "calculating" && score > 60);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Investigation Telemetry (Almost invisible background details) */}
      <div className="absolute -top-6 left-0 flex w-full justify-between text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-50">
        <div className="flex gap-4">
          <span>NODE_01</span>
          <span
            className={phase !== "idle" ? "text-[var(--purple-bright)]" : ""}
          >
            ENG_v0.1
          </span>
        </div>
        <div className="flex gap-4">
          <span>SECURE_CH</span>
          <span>LATENCY 42ms</span>
        </div>
      </div>

      <div
        className={`shield-card relative flex w-full flex-col overflow-hidden font-mono text-sm shadow-2xl transition-all duration-700 min-h-[460px] ${isDanger ? "border-[var(--color-danger-border)] shadow-[0_0_30px_-5px_var(--color-danger-glow)]" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-3">
          <span className="flex items-center gap-3 text-xs font-semibold tracking-wider text-[var(--text-muted)]">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${isDanger ? "bg-[var(--color-danger)] glow-danger animate-pulse" : "bg-[var(--purple-bright)]"}`}
            ></span>
            SHIELDSENSE / LIVE_ANALYSIS
          </span>
          <span className="text-[0.65rem] tracking-widest text-[var(--text-muted)]">
            SYSTEM_ACTIVE
          </span>
        </div>

        {/* Dynamic Body */}
        <div className="relative flex flex-1 flex-col p-6">
          {/* Phase 1 & 2: Intercepting, Analyzing, Calculating */}
          {phase !== "result" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-500">
              {/* Threat Severity Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold tracking-[0.2em] text-[var(--text-muted)]">
                    THREAT INTERCEPTED
                  </span>
                  <span
                    className={`text-[0.65rem] font-bold tracking-[0.2em] transition-colors duration-500 ${analysisStep > 1 ? "text-[var(--color-suspicious)]" : "text-[var(--purple-bright)]"}`}
                  >
                    SUSPICIOUS ACTIVITY
                  </span>
                </div>

                {/* Visual Evidence Block */}
                <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 text-[var(--text-secondary)] shadow-inner relative overflow-hidden">
                  {phase === "analyzing" && (
                    <div className="absolute top-0 left-0 h-[1px] w-full bg-[var(--purple-bright)] opacity-50 animate-[scan_2s_linear_infinite]" />
                  )}
                  <p className="mb-3 text-sm text-[var(--text-primary)]">
                    "Your account requires immediate verification."
                  </p>
                  <p className="truncate text-xs opacity-80">
                    https://
                    <span className="text-[var(--color-danger)] font-bold bg-[var(--color-danger-bg)] px-1 rounded">
                      secure-bank-verification
                    </span>
                    .example/login
                  </p>
                </div>
              </div>

              {/* Analysis Engine */}
              <div className="flex flex-col gap-3">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-[var(--text-muted)] flex items-center justify-between">
                  <span>──────── ANALYSIS ENGINE ────────</span>
                </span>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">
                      URL STRUCTURE
                    </span>
                    {renderRowState(1, false)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">
                      DOMAIN REPUTATION
                    </span>
                    {renderRowState(2, true)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">
                      LANGUAGE INTENT
                    </span>
                    {renderRowState(3, true)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">
                      BRAND IMPERSONATION
                    </span>
                    {renderRowState(4, true)}
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-auto flex flex-col gap-2 pt-4">
                <div className="flex items-center justify-between text-[0.65rem] font-bold tracking-widest text-[var(--text-muted)]">
                  <span>INVESTIGATION PROGRESS</span>
                  <span>{getProgress()}%</span>
                </div>
                <div className="h-1 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${phase === "calculating" ? "bg-[var(--color-suspicious)]" : "bg-[var(--purple-primary)]"}`}
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Result (Cinematic Reveal) */}
          {phase === "result" && (
            <div className="flex flex-col h-full gap-5 animate-in slide-in-from-bottom-4 fade-in duration-700">
              {/* Risk Score Arc & Classification */}
              <div className="flex flex-col items-center justify-center pt-2 pb-4">
                <div className="relative flex items-center justify-center w-32 h-32">
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--bg-tertiary)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--color-danger)"
                      strokeWidth="4"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * score) / 100}
                      className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white tracking-tighter">
                      {score}
                    </span>
                    <span className="text-[0.65rem] font-bold text-[var(--text-muted)]">
                      / 100
                    </span>
                  </div>
                </div>
                <span className="mt-4 text-sm font-bold tracking-[0.3em] text-[var(--color-danger)] drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] animate-pulse">
                  DANGEROUS
                </span>
              </div>

              {/* Threat Indicators List */}
              <div className="flex flex-col gap-1.5 px-2">
                {indicatorStep > 0 && (
                  <div className="flex items-center justify-between text-xs animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-[var(--text-secondary)]">
                      Lookalike domain
                    </span>{" "}
                    <span className="text-[var(--color-danger)] font-bold">
                      +30
                    </span>
                  </div>
                )}
                {indicatorStep > 1 && (
                  <div className="flex items-center justify-between text-xs animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-[var(--text-secondary)]">
                      Credential request
                    </span>{" "}
                    <span className="text-[var(--color-danger)] font-bold">
                      +20
                    </span>
                  </div>
                )}
                {indicatorStep > 2 && (
                  <div className="flex items-center justify-between text-xs animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-[var(--text-secondary)]">
                      Urgency language
                    </span>{" "}
                    <span className="text-[var(--color-danger)] font-bold">
                      +15
                    </span>
                  </div>
                )}
                {indicatorStep > 3 && (
                  <div className="flex items-center justify-between text-xs animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-[var(--text-secondary)]">
                      Brand impersonation
                    </span>{" "}
                    <span className="text-[var(--color-danger)] font-bold">
                      +10
                    </span>
                  </div>
                )}
              </div>

              {/* AI Assessment Panel */}
              {aiStep > 0 && (
                <div className="mt-2 flex flex-col rounded-md border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-4 shadow-lg animate-in zoom-in-95 fade-in duration-500">
                  <div className="mb-2 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                    <span className="flex items-center gap-2 text-[0.65rem] font-bold tracking-widest text-[var(--purple-bright)]">
                      ✦ AI SECURITY ASSESSMENT
                    </span>
                    <span className="text-[0.55rem] tracking-widest text-[var(--text-muted)]">
                      CONFIDENCE:{" "}
                      <span className="text-[var(--color-danger)]">HIGH</span>
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--text-primary)]">
                    This appears to be a phishing attempt designed to capture
                    account credentials.
                    {aiStep > 1 && (
                      <span className="text-[var(--text-secondary)] animate-in fade-in duration-500">
                        {" "}
                        It uses urgency and impersonates a legitimate financial
                        service to pressure the user.
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Simulated Block Action */}
              {aiStep > 1 && (
                <button className="group mt-auto flex w-full items-center justify-center gap-2 rounded bg-[var(--color-danger)] py-3 text-xs font-bold tracking-[0.2em] text-white shadow-[0_0_15px_var(--color-danger-glow)] transition-all hover:bg-red-500 hover:shadow-[0_0_25px_var(--color-danger-glow)] hover:brightness-110 animate-in slide-in-from-bottom-2 fade-in duration-500">
                  <span className="text-base group-hover:rotate-12 transition-transform">
                    ⛨
                  </span>{" "}
                  BLOCK THREAT
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
