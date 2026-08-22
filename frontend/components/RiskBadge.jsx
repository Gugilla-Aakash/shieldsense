"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  TriangleAlert,
  Activity,
} from "lucide-react";

export default function RiskBadge({ level, score }) {
  const normalizedLevel = level?.toUpperCase();

  const config =
    normalizedLevel === "SAFE"
      ? {
          label: "SAFE",
          text: "text-emerald-300",
          border: "border-emerald-400/20",
          background: "bg-emerald-500/[0.045]",
          dot: "bg-emerald-400",
          icon: ShieldCheck,
          glow: "shadow-[0_0_24px_rgba(52,211,153,0.12)]",
          ring: "border-emerald-400/20",
          pulse: "bg-emerald-400/20",
        }
      : normalizedLevel === "SUSPICIOUS"
        ? {
            label: "SUSPICIOUS",
            text: "text-amber-300",
            border: "border-amber-400/20",
            background: "bg-amber-500/[0.045]",
            dot: "bg-amber-400",
            icon: TriangleAlert,
            glow: "shadow-[0_0_24px_rgba(251,191,36,0.12)]",
            ring: "border-amber-400/20",
            pulse: "bg-amber-400/20",
          }
        : normalizedLevel === "DANGEROUS"
          ? {
              label: "DANGEROUS",
              text: "text-rose-300",
              border: "border-rose-400/20",
              background: "bg-rose-500/[0.045]",
              dot: "bg-rose-400",
              icon: ShieldAlert,
              glow: "shadow-[0_0_30px_rgba(251,113,133,0.16)]",
              ring: "border-rose-400/20",
              pulse: "bg-rose-400/20",
            }
          : {
              label: "UNKNOWN",
              text: "text-white/50",
              border: "border-white/[0.08]",
              background: "bg-white/[0.025]",
              dot: "bg-white/40",
              icon: TriangleAlert,
              glow: "",
              ring: "border-white/10",
              pulse: "bg-white/10",
            };

  const Icon = config.icon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.035,
        y: -1,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={[
        "group relative inline-flex items-center gap-2",
        "overflow-hidden rounded-full border",
        "px-3 py-1.5",
        "font-mono text-[7px] font-bold",
        "tracking-[0.14em]",
        "backdrop-blur-xl",
        "transition-all duration-300",
        config.text,
        config.border,
        config.background,
        config.glow,
      ].join(" ")}
    >
      {/* Ambient status glow */}
      <motion.span
        animate={{
          scale: [0.8, 1.8, 0.8],
          opacity: [0.18, 0.04, 0.18],
        }}
        transition={{
          duration: normalizedLevel === "DANGEROUS" ? 1.2 : 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={[
          "pointer-events-none absolute left-2 top-1/2",
          "-translate-y-1/2 rounded-full",
          "blur-md",
          "h-3 w-3",
          config.pulse,
        ].join(" ")}
      />

      {/* Scan sweep */}
      <span className="pointer-events-none absolute inset-y-0 left-[-40%] w-[35%] -skew-x-12 bg-white/[0.09] opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

      {/* Status indicator */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <motion.span
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: normalizedLevel === "DANGEROUS" ? 1 : 2,
            repeat: Infinity,
          }}
          className={["absolute inset-0 rounded-full", config.dot].join(" ")}
        />

        <span
          className={[
            "relative h-1.5 w-1.5 rounded-full",
            "shadow-[0_0_7px_currentColor]",
            config.dot,
          ].join(" ")}
        />
      </span>

      {/* Icon */}
      <motion.span
        animate={{
          rotate: normalizedLevel === "DANGEROUS" ? [0, -4, 4, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: normalizedLevel === "DANGEROUS" ? Infinity : 0,
          repeatDelay: 2,
        }}
        className="relative"
      >
        <Icon className="h-3 w-3 shrink-0" />
      </motion.span>

      {/* Label */}
      <span className="relative">{config.label}</span>

      {/* Score */}
      {typeof score === "number" && (
        <>
          <span className="relative text-white/15">//</span>

          <span className="relative text-white/55">{score}/100</span>
        </>
      )}

      {/* Tiny telemetry indicator */}
      <Activity className="relative h-2.5 w-2.5 text-white/10 transition-colors group-hover:text-white/25" />

      {/* Inner highlight */}
      <span
        className={[
          "pointer-events-none absolute inset-0 rounded-full",
          "border opacity-50",
          config.ring,
        ].join(" ")}
      />
    </motion.span>
  );
}
