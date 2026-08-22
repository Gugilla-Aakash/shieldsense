"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Link2,
  MessageSquare,
  FileCode2,
  BrainCircuit,
  Activity,
} from "lucide-react";

export default function SecurityCapabilities() {
  return (
    <section className="relative w-full bg-[#030407] py-48 md:py-64 overflow-hidden border-t border-b border-white/[0.04]">
      {/* Background Ambient Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* Massive Max-Width Container with Huge Spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-36"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-md">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-[0.3em] text-purple-300 uppercase">
              MODULE // 01_DEFENSE_MATRIX
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-8">
            One unified shield. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500">
              Multiple lines of absolute defense.
            </span>
          </h2>

          <p className="max-w-3xl text-lg md:text-xl text-gray-400 font-normal leading-relaxed">
            ShieldSense doesn't just scan; it isolates, dismembers, and
            cross-analyzes incoming telemetry across dedicated high-performance
            security pipelines.
          </p>
        </motion.div>

        {/* FEATURE STACK: Massive Vertical Separation (Space to Breathe) */}
        <div className="w-full flex flex-col gap-32">
          {/* BLOCK 1: URL INTELLIGENCE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center p-10 md:p-16 rounded-[2.5rem] border border-white/[0.08] bg-[#07090E]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500"
          >
            <div className="absolute top-6 right-8 font-mono text-xs text-gray-600 tracking-widest">
              PIPE_01 // URL_ANALYSIS
            </div>

            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-8 group-hover:scale-110 transition-transform">
                <Link2 className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-4">
                URL Intelligence & Homoglyph Tracking
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-6">
                Intercepts weaponized unicode characters, Cyrillic spoofing,
                cloaked multi-tier redirection chains, and fresh zero-day domain
                registrations before browser execution.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <span>LATENCY: 12ms</span>
                <span>•</span>
                <span>PRECISION: 99.9%</span>
              </div>
            </div>

            <div className="lg:col-span-7 w-full rounded-2xl border border-white/10 bg-black/80 p-6 md:p-8 font-mono text-sm shadow-inner">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  LIVE TARGET URI INSPECTION
                </span>
                <span className="text-red-400 font-bold">
                  THREAT MATCH FOUND
                </span>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4 text-gray-200 mb-6 break-all border border-white/5">
                https://
                <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/40 font-bold">
                  secure-bаnk
                </span>
                .com/auth
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-gray-500 block mb-1">
                    CYRILLIC HOMOGLYPH
                  </span>
                  <span className="text-red-400 font-bold">
                    DETECTED ('а' U+0430)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-gray-500 block mb-1">
                    DNS RECORD AGE
                  </span>
                  <span className="text-amber-400 font-bold">
                    42 MINUTES OLD
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BLOCK 2: MESSAGE & NLP INTELLIGENCE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center p-10 md:p-16 rounded-[2.5rem] border border-white/[0.08] bg-[#07090E]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500"
          >
            <div className="absolute top-6 right-8 font-mono text-xs text-gray-600 tracking-widest">
              PIPE_02 // NLP_HEURISTICS
            </div>

            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-8 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-4">
                Social Engineering & NLP Analysis
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-6">
                Scans textual context for sophisticated manipulation vectors,
                psychological urgency triggers, coercive phrasing, and corporate
                executive impersonation.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <span>MODEL: LLAMA-SEC-V4</span>
                <span>•</span>
                <span>TOKEN_SPEED: 450t/s</span>
              </div>
            </div>

            <div className="lg:col-span-7 w-full rounded-2xl border border-white/10 bg-black/80 p-6 md:p-8 font-mono text-sm shadow-inner">
              <div className="text-gray-300 text-sm italic bg-white/[0.03] p-4 rounded-xl border-l-4 border-amber-400 mb-6">
                "URGENT: Payroll transfer authentication required immediately to
                prevent account termination."
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-gray-400">
                    MANIPULATION COEFFICIENT
                  </span>
                  <span className="text-red-400 font-bold">
                    96.8% HIGH RISK
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-gray-400">IMPERSONATION VENDOR</span>
                  <span className="text-amber-400 font-bold">
                    EXECUTIVE FRAUD PATTERN
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BLOCK 3: FILE & PAYLOAD INTELLIGENCE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center p-10 md:p-16 rounded-[2.5rem] border border-white/[0.08] bg-[#07090E]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500"
          >
            <div className="absolute top-6 right-8 font-mono text-xs text-gray-600 tracking-widest">
              PIPE_03 // BYTECODE
            </div>

            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-8 group-hover:scale-110 transition-transform">
                <FileCode2 className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-4">
                Static File & Payload Dissection
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-6">
                Inspects file signatures, hidden executable extensions,
                obfuscated macro code, and entropy anomalies inside a secure,
                zero-execution sandbox environment.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <span>SANDBOX: ISOLATED</span>
                <span>•</span>
                <span>ZERO RETENTION</span>
              </div>
            </div>

            <div className="lg:col-span-7 w-full rounded-2xl border border-white/10 bg-black/80 p-6 md:p-8 font-mono text-sm shadow-inner">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-gray-300 font-bold">
                  Q3_Financial_Statement.pdf
                  <span className="text-red-400">.exe</span>
                </span>
                <span className="text-xs px-3 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                  MIME SPOOFED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-gray-500 block mb-1">
                    ENTROPY RATING
                  </span>
                  <span className="text-red-400 font-bold">
                    7.98 (HEAVY PACKED)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-gray-500 block mb-1">
                    SIGNATURE STATUS
                  </span>
                  <span className="text-amber-400 font-bold">
                    INVALID CERTIFICATE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BLOCK 4: AI REASONING CORE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center p-10 md:p-20 rounded-[2.5rem] border border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-[#07090E] to-[#07090E] backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(168,85,247,0.2)] relative overflow-hidden"
          >
            <div className="absolute top-6 right-8 flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              CORE_ACTIVE
            </div>

            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 mb-8 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-4">
                Explainable AI Security Reasoning
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-6">
                Translates complex, disparate security indicators into
                unambiguous human reasoning, definitive risk factors, and
                immediate automated playbooks.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                <span>DECISION ENGINE: DETERMINISTIC</span>
              </div>
            </div>

            <div className="lg:col-span-7 w-full rounded-2xl border border-purple-500/30 bg-black/80 p-6 md:p-8 font-mono text-sm shadow-inner">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                <div className="w-full flex-1 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                    Signal Intake
                  </div>
                  <div className="text-white font-bold text-xs">
                    DNS + NLP + MIME
                  </div>
                </div>
                <span className="text-purple-400 font-bold text-lg">→</span>
                <div className="w-full flex-1 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="text-[10px] text-purple-300 uppercase tracking-widest mb-1">
                    Neural Fusion
                  </div>
                  <div className="text-purple-200 font-bold text-xs">
                    Zero-Day Correlation
                  </div>
                </div>
                <span className="text-purple-400 font-bold text-lg">→</span>
                <div className="w-full flex-1 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <div className="text-[10px] text-red-400 uppercase tracking-widest mb-1">
                    Direct Action
                  </div>
                  <div className="text-red-300 font-bold text-xs">
                    BLOCK & ISOLATE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
