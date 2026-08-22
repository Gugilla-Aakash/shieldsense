"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Check,
  Crosshair,
  Fingerprint,
  Radar,
  ShieldCheck,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative isolate flex min-h-[820px] items-center justify-center overflow-hidden bg-[#050507] py-32 sm:py-40 lg:min-h-[900px] lg:py-48">
      {/* =====================================================
          DEEP ATMOSPHERE
         ===================================================== */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(139,92,246,0.11),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_45%)]" />

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* =====================================================
          DEFENSE RADAR
         ===================================================== */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 flex h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-full w-full rounded-full border border-purple-400/[0.06]"
        >
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-purple-400/60 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
        </motion.div>

        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-[76%] w-[76%] rounded-full border border-dashed border-blue-400/[0.08]"
        >
          <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </motion.div>

        {/* Inner pulse */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[42%] w-[42%] rounded-full border border-purple-400/20 bg-purple-500/[0.025] shadow-[0_0_100px_rgba(139,92,246,0.12)]"
        />

        {/* Center target */}
        <div className="absolute flex h-28 w-28 items-center justify-center rounded-full border border-purple-400/15 bg-[#08080e]/70 backdrop-blur-md">
          <div className="absolute inset-3 rounded-full border border-white/[0.05]" />

          <motion.div
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.95)]"
          />

          <Crosshair className="absolute h-9 w-9 text-purple-300/30" />
        </div>
      </div>

      {/* Top/bottom technical accents */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-px w-[min(700px,70vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-px w-[min(700px,70vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />

      {/* =====================================================
          CONTENT
         ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Security label */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-purple-400/40" />
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-purple-300">
            <Radar className="h-3.5 w-3.5" />
            Ready to Investigate?
          </span>
          <span className="h-px w-8 bg-purple-400/40" />
        </div>

        {/* Main heading */}
        <h2 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="block">Before you trust it.</span>
          <span className="mt-4 block bg-gradient-to-r from-violet-300 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(139,92,246,0.28)]">
            Ask ShieldSense.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-9 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
          Investigate suspicious links, messages, and files before they become a
          security problem. Secure your digital life in seconds.
        </p>

        {/* CTA Button routing to /scanner */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
          className="mt-11"
        >
          <Link
            href="/scanner"
            className="group relative flex h-14 items-center gap-4 border border-purple-400/40 bg-purple-500/[0.08] px-8 text-sm font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.12)] backdrop-blur-md transition-all duration-300 hover:border-purple-300/70 hover:bg-purple-500/[0.15] hover:shadow-[0_0_55px_rgba(139,92,246,0.22)]"
          >
            {/* Corner accents */}
            <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-purple-300/80" />
            <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-purple-300/80" />

            <span>Start Investigation</span>
            <ArrowUpRight className="h-4 w-4 text-purple-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
            NO ACCOUNT REQUIRED
          </span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span className="flex items-center gap-2">
            <Fingerprint className="h-3.5 w-3.5 text-purple-400" />
            EXPLAINABLE RESULTS
          </span>
        </div>

        {/* Engine status */}
        <motion.div
          animate={{
            borderColor: [
              "rgba(255,255,255,0.06)",
              "rgba(168,85,247,0.18)",
              "rgba(255,255,255,0.06)",
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-16 flex items-center gap-3 border bg-white/[0.02] px-5 py-3 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          </span>

          <Activity className="h-3.5 w-3.5 text-emerald-400/70" />

          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">
            SHIELDSENSE ENGINE READY
          </span>

          <Check className="h-3 w-3 text-emerald-400/70" />
        </motion.div>

        {/* Bottom telemetry */}
        <div className="mt-8 flex items-center gap-5 text-[7px] tracking-[0.18em] text-white/15">
          <span>HEURISTIC ENGINE</span>
          <span>•</span>
          <span>REAL-TIME ANALYSIS</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">DEFENSE ACTIVE</span>
        </div>
      </motion.div>
    </section>
  );
}
