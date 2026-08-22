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

  // Orchestrate the animation timeline
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "idle") {
      timeout = setTimeout(() => setPhase("intercepting"), 800);
    } else if (phase === "intercepting") {
      timeout = setTimeout(() => setPhase("analyzing"), 1200);
    } else if (phase === "analyzing") {
      if (analysisStep < 4) {
        timeout = setTimeout(() => setAnalysisStep((s) => s + 1), 700);
      } else {
        timeout = setTimeout(() => setPhase("calculating"), 500);
      }
    } else if (phase === "calculating") {
      // Rapid score rollup effect
      let currentScore = 0;
      const interval = setInterval(() => {
        currentScore += Math.floor(Math.random() * 12) + 4;
        if (currentScore >= 91) {
          setScore(91);
          clearInterval(interval);
          setTimeout(() => setPhase("result"), 400);
        } else {
          setScore(currentScore);
        }
      }, 80);
      return () => clearInterval(interval);
    } else if (phase === "result") {
      // Sequentially reveal evidence and AI text
      if (indicatorStep < 4) {
        timeout = setTimeout(() => setIndicatorStep((s) => s + 1), 400);
      } else if (aiStep < 3) {
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

  // Determine dynamic colors based on threat state
  const getStatusColor = () => {
    if (phase === "result")
      return "bg-[var(--color-danger)] shadow-[0_0_12px_var(--color-danger)]";
    if (phase === "calculating" || analysisStep > 2)
      return "bg-[var(--color-suspicious)] shadow-[0_0_12px_var(--color-suspicious)]";
    return "bg-[var(--purple-bright)] shadow-[0_0_12px_var(--purple-bright)]";
  };

  return (
    <div className="relative w-full">
      {/* CSS for the subtle scanning line overlay */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 2s linear infinite; }
      `,
        }}
      />

      {/* Tiny System Metadata */}
      <div className="absolute -top-6 left-2 flex gap-4 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-60">
        <span>Node_01</span>
        <span>Secure_CH</span>
        <span className={phase !== "idle" ? "text-[var(--purple-bright)]" : ""}>
          ENG_ONLINE
        </span>
      </div>

      <div className="shield-card relative flex w-full flex-col overflow-hidden font-mono text-sm shadow-2xl transition-all duration-500 min-h-[380px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-3">
          <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)]">
            SHIELDSENSE /{" "}
            {phase === "result" ? "ANALYSIS_COMPLETE" : "LIVE_ANALYSIS"}
          </span>
          <span
            className={`h-2 w-2 rounded-full animate-pulse transition-colors duration-500 ${getStatusColor()}`}
          ></span>
        </div>

        {/* Dynamic Body */}
        <div className="relative flex flex-1 flex-col gap-6 p-6">
          {/* Scanning Line Effect */}
          {(phase === "intercepting" ||
            phase === "analyzing" ||
            phase === "calculating") && (
            <div className="animate-scan absolute left-0 right-0 h-[1px] bg-[var(--purple-bright)] opacity-50 z-20 pointer-events-none shadow-[0_0_8px_var(--purple-bright)]" />
          )}

          {/* Phase: Intercepting & Analyzing */}
          {phase !== "result" && phase !== "idle" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              {/* Incoming Block */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-[var(--text-muted)]">
                  INCOMING INTERCEPTED
                </span>
                <div className="rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 text-[var(--text-secondary)] shadow-inner">
                  <p className="mb-3 text-[var(--text-primary)]">
                    "Your account requires immediate verification."
                  </p>
                  <p className="truncate text-xs text-[var(--color-danger)]">
                    https://secure-bank-verification.example/login
                  </p>
                </div>
              </div>

              {/* Analysis Block */}
              {(phase === "analyzing" || phase === "calculating") && (
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <span className="text-xs font-bold tracking-widest text-[var(--text-muted)]">
                    ANALYSIS ENGINE
                  </span>

                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                      <span className="text-[var(--text-secondary)]">
                        URL STRUCTURE
                      </span>
                      <span
                        className={
                          analysisStep >= 1
                            ? "text-[var(--purple-light)]"
                            : "text-[var(--text-muted)]"
                        }
                      >
                        {analysisStep >= 1 ? "[ FOUND ]" : "[ SCANNING ]"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                      <span className="text-[var(--text-secondary)]">
                        DOMAIN REPUTATION
                      </span>
                      <span
                        className={
                          analysisStep >= 2
                            ? "text-[var(--purple-light)]"
                            : "text-[var(--text-muted)]"
                        }
                      >
                        {analysisStep >= 2 ? "[ FOUND ]" : "[ PENDING ]"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                      <span className="text-[var(--text-secondary)]">
                        LANGUAGE INTENT
                      </span>
                      <span
                        className={
                          analysisStep >= 3
                            ? "text-[var(--color-suspicious)]"
                            : "text-[var(--text-muted)]"
                        }
                      >
                        {analysisStep >= 3 ? "[ FOUND ]" : "[ PENDING ]"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[var(--text-secondary)]">
                        BRAND IMPERSONATION
                      </span>
                      <span
                        className={
                          analysisStep >= 4
                            ? "text-[var(--color-suspicious)]"
                            : "text-[var(--text-muted)]"
                        }
                      >
                        {analysisStep >= 4 ? "[ FOUND ]" : "[ PENDING ]"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculating Block */}
              {phase === "calculating" && (
                <div className="mt-2 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 animate-in fade-in duration-300">
                  <span className="text-xs font-bold tracking-widest text-[var(--purple-bright)] animate-pulse">
                    CALCULATING RISK...
                  </span>
                  <span className="text-lg font-bold text-white">{score}</span>
                </div>
              )}
            </div>
          )}

          {/* Phase: Result */}
          {phase === "result" && (
            <div className="flex flex-col gap-5 animate-in zoom-in-95 fade-in duration-500">
              {/* Score Header */}
              <div className="flex flex-col items-center justify-center rounded bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] py-4">
                <span className="text-3xl font-extrabold text-[var(--color-danger)] drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                  91{" "}
                  <span className="text-lg text-[var(--color-danger)]/70">
                    / 100
                  </span>
                </span>
                <span className="mt-1 text-xs font-bold tracking-[0.2em] text-[var(--color-danger)]">
                  DANGEROUS
                </span>
              </div>

              {/* Indicators */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.65rem] font-bold tracking-widest text-[var(--text-muted)] uppercase">
                  Threat Indicators
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-[var(--text-secondary)]">
                  {indicatorStep > 0 && (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <span className="text-[var(--color-danger)]">+30</span>{" "}
                      Lookalike domain
                    </div>
                  )}
                  {indicatorStep > 1 && (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <span className="text-[var(--color-danger)]">+20</span>{" "}
                      Credential request
                    </div>
                  )}
                  {indicatorStep > 2 && (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <span className="text-[var(--color-danger)]">+15</span>{" "}
                      Urgency language
                    </div>
                  )}
                  {indicatorStep > 3 && (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <span className="text-[var(--color-danger)]">+10</span>{" "}
                      Brand impersonation
                    </div>
                  )}
                </div>
              </div>

              {/* AI Explanation */}
              <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-4">
                <span className="flex items-center gap-2 text-[0.65rem] font-bold tracking-widest text-[var(--purple-bright)] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-bright)]"></span>{" "}
                  AI Assessment
                </span>
                <p className="text-xs leading-relaxed text-[var(--text-primary)]">
                  {aiStep > 0 && (
                    <span className="animate-in fade-in">
                      This appears to be a phishing attempt designed to capture
                      account credentials.{" "}
                    </span>
                  )}
                  {aiStep > 1 && (
                    <span className="animate-in fade-in text-[var(--text-secondary)]">
                      It uses urgency and impersonates a legitimate financial
                      service to pressure the user.
                    </span>
                  )}
                </p>
              </div>

              {/* Action Button */}
              {aiStep > 2 && (
                <button className="mt-2 w-full rounded bg-[var(--color-danger)] py-2.5 text-xs font-bold tracking-widest text-white shadow-[0_0_15px_var(--color-danger-glow)] transition-all hover:bg-red-500 animate-in fade-in slide-in-from-bottom-2">
                  BLOCK THREAT
                </button>
              )}
            </div>
          )}

          {/* Idle State (Waiting to loop) */}
          {phase === "idle" && (
            <div className="flex h-full flex-col items-center justify-center opacity-30">
              <span className="text-xs tracking-widest text-[var(--text-muted)] animate-pulse">
                AWAITING INPUT...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
