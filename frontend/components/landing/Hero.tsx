"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Lock,
  ChevronRight,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import ThreatDemo from "./ThreatDemo";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-bg-base">
      {/* Ambient security glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 68% 38%, rgba(139,92,246,0.14), transparent 28%), radial-gradient(circle at 18% 70%, rgba(124,58,237,0.08), transparent 28%)",
        }}
      />

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(139, 92, 246, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.12) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 45%, black 30%, transparent 100%)",
        }}
      />

      {/* Top atmospheric line */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-primary/50 to-transparent" />

      {/* Main hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 items-center px-6 pb-20 pt-32 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex max-w-2xl flex-col"
          >
            {/* Threat status */}
            <div className="mb-7 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-bright opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-bright" />
              </span>

              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-bright">
                AI THREAT INTELLIGENCE // ACTIVE
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-[3.8rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              <span className="block">Don't just know</span>

              <span className="block text-white/35">it's dangerous.</span>

              <span className="mt-3 block bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                KNOW WHY.
              </span>
            </h1>

            {/* Supporting copy */}
            <p className="mt-8 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              ShieldSense reverse-engineers suspicious links, files, and emails
              before they can become incidents — exposing the signals,
              reasoning, and evidence behind every threat verdict.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="group inline-flex h-12 items-center justify-center gap-3 border border-purple-400/50 bg-purple-primary px-6 text-sm font-semibold text-white shadow-[0_0_32px_rgba(139,92,246,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-600 hover:shadow-[0_0_42px_rgba(139,92,246,0.34)]">
                Start Investigation
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button className="group inline-flex h-12 items-center gap-2 px-4 text-sm font-medium text-text-muted transition-colors hover:text-white">
                View live analysis
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Capability rail */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/[0.07] pt-6">
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                <Shield className="h-3.5 w-3.5 text-purple-primary" />
                Heuristic Analysis
              </span>

              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                <Zap className="h-3.5 w-3.5 text-purple-primary" />
                Neural Reasoning
              </span>

              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                <Lock className="h-3.5 w-3.5 text-purple-primary" />
                Encrypted Pipeline
              </span>
            </div>
          </motion.div>

          {/* RIGHT — PRODUCT VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Controlled glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-glow/60 blur-[120px]" />

            {/* Fine orbit lines */}
            <div className="pointer-events-none absolute h-[88%] w-[88%] rounded-[2rem] border border-purple-primary/[0.08]" />
            <div className="pointer-events-none absolute h-[76%] w-[76%] rounded-[1.5rem] border border-purple-primary/[0.06]" />

            <div className="relative w-full max-w-[700px] lg:-mr-4 xl:-mr-8">
              <ThreatDemo />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust / performance rail */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.015]"
      >
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
          <div className="px-6 py-8 text-center sm:px-10">
            <h4 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              5M+
            </h4>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Identities Protected
            </p>
          </div>

          <div className="px-6 py-8 text-center sm:px-10">
            <h4 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              99.9%
            </h4>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Detection Availability
            </p>
          </div>

          <div className="px-6 py-8 text-center sm:px-10">
            <h4 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              150+
            </h4>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Countries Secured
            </p>
          </div>

          <div className="px-6 py-8 text-center sm:px-10">
            <h4 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              &lt; 200ms
            </h4>
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Average Threat Response
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
