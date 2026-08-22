"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ScanLine,
  Activity,
  ChevronRight,
  Crosshair,
} from "lucide-react";

export default function EvidenceList({ indicators = [] }) {
  if (!indicators || indicators.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-emerald-400/12 bg-emerald-500/[0.025] p-5 backdrop-blur-xl"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/[0.07] blur-3xl" />

        {/* Scan sweep */}
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-y-0 w-16 -skew-x-12 bg-emerald-300/[0.035] blur-md"
        />

        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/[0.05]">
            <CheckCircle2 className="h-5 w-5 text-emerald-300/80" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/80">
                No suspicious indicators detected
              </div>

              <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>

            <div className="mt-2 max-w-xl text-xs leading-6 text-white/25">
              The heuristic engine did not identify malicious patterns in this
              artifact.
            </div>

            <div className="mt-3 flex items-center gap-2 font-mono text-[6px] uppercase tracking-[0.16em] text-emerald-400/30">
              <Activity className="h-3 w-3" />
              ANALYSIS CLEAR
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return {
          badge: "border-red-400/20 bg-red-500/[0.06] text-red-300",
          icon: "border-red-400/15 bg-red-500/[0.045] text-red-300",
          bar: "bg-red-400",
          glow: "group-hover:shadow-[0_0_35px_rgba(239,68,68,0.08)]",
          accent: "bg-red-400",
          line: "bg-red-400/60",
        };

      case "high":
        return {
          badge: "border-orange-400/20 bg-orange-500/[0.055] text-orange-300",
          icon: "border-orange-400/15 bg-orange-500/[0.035] text-orange-300",
          bar: "bg-orange-400",
          glow: "group-hover:shadow-[0_0_35px_rgba(249,115,22,0.07)]",
          accent: "bg-orange-400",
          line: "bg-orange-400/60",
        };

      case "medium":
        return {
          badge: "border-amber-400/20 bg-amber-500/[0.05] text-amber-300",
          icon: "border-amber-400/15 bg-amber-500/[0.03] text-amber-300",
          bar: "bg-amber-400",
          glow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.06)]",
          accent: "bg-amber-400",
          line: "bg-amber-400/60",
        };

      default:
        return {
          badge: "border-violet-400/15 bg-violet-500/[0.035] text-violet-300",
          icon: "border-violet-400/15 bg-violet-500/[0.025] text-violet-300",
          bar: "bg-violet-400",
          glow: "group-hover:shadow-[0_0_35px_rgba(139,92,246,0.07)]",
          accent: "bg-violet-400",
          line: "bg-violet-400/60",
        };
    }
  };

  return (
    <div>
      {/* ============================================================
          HEADER
      ============================================================ */}

      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 rgba(139,92,246,0)",
                "0 0 20px rgba(139,92,246,0.12)",
                "0 0 0 rgba(139,92,246,0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/12 bg-violet-500/[0.04]"
          >
            <ScanLine className="h-4 w-4 text-violet-300/65" />
          </motion.div>

          <div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-[8px] font-bold tracking-[0.2em] text-white/40">
                DETECTED EVIDENCE
              </div>

              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="h-1 w-1 rounded-full bg-violet-400"
              />
            </div>

            <div className="mt-1 font-mono text-[6px] tracking-[0.17em] text-white/15">
              HEURISTIC SIGNAL MATRIX
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-500/[0.025] px-2.5 py-1.5">
          <span className="font-mono text-[6px] font-bold tracking-[0.14em] text-violet-300/40">
            {indicators.length} SIGNAL
            {indicators.length === 1 ? "" : "S"}
          </span>
        </div>
      </div>

      {/* ============================================================
          EVIDENCE LIST
      ============================================================ */}

      <div className="relative space-y-3">
        <AnimatePresence>
          {indicators.map((indicator, index) => {
            const style = getSeverityStyle(indicator?.severity);

            const weight = Math.min(
              Math.max(Number(indicator?.weight ?? 0), 8),
              100,
            );

            return (
              <motion.div
                key={`${indicator?.label || "signal"}-${index}`}
                initial={{
                  opacity: 0,
                  y: 14,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -2,
                  scale: 1.002,
                }}
                className={[
                  "group relative overflow-hidden",
                  "rounded-2xl border",
                  "bg-white/[0.012]",
                  "p-4",
                  "backdrop-blur-xl",
                  "transition-all duration-300",
                  style.glow,
                ].join(" ")}
              >
                {/* Severity rail */}
                <span
                  className={[
                    "absolute left-0 top-0 h-full w-px opacity-50",
                    style.line,
                  ].join(" ")}
                />

                {/* Hover glow */}
                <div
                  className={[
                    "pointer-events-none absolute -right-16 -top-16",
                    "h-32 w-32 rounded-full blur-3xl",
                    "opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100",
                  ].join(" ")}
                  style={{
                    backgroundColor:
                      indicator?.severity?.toLowerCase() === "critical"
                        ? "rgba(239,68,68,0.08)"
                        : indicator?.severity?.toLowerCase() === "high"
                          ? "rgba(249,115,22,0.07)"
                          : indicator?.severity?.toLowerCase() === "medium"
                            ? "rgba(245,158,11,0.06)"
                            : "rgba(139,92,246,0.07)",
                  }}
                />

                {/* Scan sweep */}
                <span className="pointer-events-none absolute inset-y-0 left-[-35%] w-[25%] -skew-x-12 bg-white/[0.035] opacity-0 blur-md transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      {/* Signal icon */}
                      <motion.div
                        whileHover={{
                          rotate: 5,
                          scale: 1.05,
                        }}
                        className={[
                          "relative flex h-9 w-9 shrink-0",
                          "items-center justify-center",
                          "rounded-xl border",
                          style.icon,
                        ].join(" ")}
                      >
                        {/* pulse */}
                        <motion.span
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.15, 0, 0.15],
                          }}
                          transition={{
                            duration:
                              indicator?.severity?.toLowerCase() === "critical"
                                ? 1.2
                                : 2,
                            repeat: Infinity,
                          }}
                          className={[
                            "absolute inset-1 rounded-lg",
                            style.accent,
                            "opacity-20 blur-sm",
                          ].join(" ")}
                        />

                        <AlertTriangle className="relative h-3.5 w-3.5" />
                      </motion.div>

                      {/* Text */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="truncate text-xs font-bold leading-5 text-white/75 transition-colors group-hover:text-white/90">
                            {indicator?.label || "Unknown signal"}
                          </div>

                          <ChevronRight className="h-3 w-3 shrink-0 text-white/10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/20" />
                        </div>

                        <p className="mt-1.5 text-[11px] leading-5 text-white/28 transition-colors group-hover:text-white/35">
                          {indicator?.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Severity */}
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span
                        className={[
                          "rounded-md border px-2 py-1",
                          "font-mono text-[6px] font-bold uppercase",
                          "tracking-[0.12em]",
                          style.badge,
                        ].join(" ")}
                      >
                        {indicator?.severity || "UNKNOWN"}
                      </span>

                      <span className="flex items-center gap-1 font-mono text-[6px] tracking-[0.12em] text-white/15">
                        <Crosshair className="h-2 w-2" />+
                        {indicator?.weight ?? 0}
                      </span>
                    </div>
                  </div>

                  {/* Signal strength */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between font-mono text-[6px] tracking-[0.14em] text-white/12">
                      <span className="flex items-center gap-2">
                        <Activity className="h-2.5 w-2.5" />
                        SIGNAL WEIGHT
                      </span>

                      <span>{indicator?.weight ?? 0}%</span>
                    </div>

                    <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.045]">
                      {/* background ticks */}
                      <div className="absolute inset-0 flex justify-between opacity-30">
                        {Array.from({ length: 10 }).map((_, tick) => (
                          <span
                            key={tick}
                            className="h-full w-px bg-white/10"
                          />
                        ))}
                      </div>

                      {/* strength */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${weight}%`,
                        }}
                        transition={{
                          delay: index * 0.08 + 0.2,
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                        className={[
                          "relative h-full",
                          style.bar,
                          "shadow-[0_0_10px_currentColor]",
                        ].join(" ")}
                      />
                    </div>
                  </div>

                  {/* Footer telemetry */}
                  <div className="mt-3 flex items-center justify-between font-mono text-[5px] uppercase tracking-[0.15em] text-white/10">
                    <span>SIGNAL #{String(index + 1).padStart(2, "0")}</span>

                    <span className="flex items-center gap-1">
                      <span
                        className={["h-1 w-1 rounded-full", style.accent].join(
                          " ",
                        )}
                      />
                      CORRELATED
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
