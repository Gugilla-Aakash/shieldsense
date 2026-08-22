"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  AlertTriangle,
  ShieldX,
  Fingerprint,
  Lock,
  Zap,
} from "lucide-react";

export default function ProblemSection() {
  const [stage, setStage] = useState(0);

  // Auto-play the threat reveal when the component mounts
  useEffect(() => {
    const sequence = async () => {
      setTimeout(() => setStage(1), 500); // Load message
      setTimeout(() => setStage(2), 1500); // Highlight URL
      setTimeout(() => setStage(3), 2500); // Show evidence tags
      setTimeout(() => setStage(4), 3500); // Mark as malicious
    };
    sequence();
  }, []);

  return (
    <section className="relative flex flex-col items-center bg-bg-base py-40 md:py-56 overflow-hidden">
      {/* Massive Max-Width Container with Expansive Spacing */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-28 px-6 text-center">
        {/* Section Header with Generous Breathing Room */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-purple-bright opacity-50"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-bright">
              The Security Gap
            </span>
            <span className="h-[1px] w-12 bg-purple-bright opacity-50"></span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            <span className="block text-text-muted mb-4">
              The problem isn't seeing the threat.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
              It's knowing what to trust.
            </span>
          </h2>
        </motion.div>

        {/* Threat Demonstration Card Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex w-full max-w-3xl flex-col items-center gap-12 pt-6 pb-12"
        >
          <div
            className={`w-full rounded-2xl border p-8 md:p-12 text-left shadow-2xl transition-all duration-700 ${
              stage >= 4
                ? "border-red-500/50 bg-red-950/20 shadow-[0_0_60px_-15px_rgba(239,68,68,0.3)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {/* Message Header */}
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3 text-white">
                <Mail className="h-5 w-5 text-text-secondary" />
                <span className="text-sm font-bold tracking-widest">
                  SECURITY ALERT
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted">
                  02:41 PM
                </span>
                <span
                  className={`rounded px-3 py-1 text-[0.65rem] font-bold tracking-widest transition-colors duration-500 ${
                    stage >= 4
                      ? "bg-red-500 text-white"
                      : "bg-white/10 text-text-muted"
                  }`}
                >
                  {stage >= 4 ? "CRITICAL RISK" : "SCANNING..."}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-6 text-sm md:text-base text-text-secondary">
              <p className="font-semibold text-white">
                Your account requires immediate verification.
              </p>
              <p className="leading-relaxed">
                Unusual activity was detected on your account. Verify your
                identity to prevent suspension.
              </p>
              <button className="mt-2 w-fit rounded bg-white px-6 py-3 text-xs font-bold text-black opacity-50 cursor-not-allowed">
                Verify Account
              </button>

              {/* Suspicious URL */}
              <p className="mt-6 font-mono text-xs md:text-sm truncate">
                https://
                <span
                  className={`rounded px-2 py-1 transition-colors duration-500 ${
                    stage >= 2
                      ? "border border-red-500/50 bg-red-500/20 font-bold text-red-400"
                      : ""
                  }`}
                >
                  secure-bank-verification
                </span>
                .example/login
              </p>
            </div>
          </div>

          {/* Threat Indicators */}
          <div className="flex flex-wrap justify-center gap-4 w-full pt-4">
            {[
              "LOOKALIKE DOMAIN",
              "URGENCY LANGUAGE",
              "CREDENTIAL HARVESTING",
            ].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: stage >= 3 ? 1 : 0,
                  y: stage >= 3 ? 0 : 10,
                }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-[#07090E] px-4 py-2.5 text-xs font-bold tracking-widest text-red-400 shadow-xl"
              >
                <AlertTriangle className="h-4 w-4" /> {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Architectural Comparison with Expansive Spacing */}
        <div className="mt-20 flex w-full max-w-5xl flex-col items-stretch gap-10 lg:flex-row">
          {/* Traditional */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex flex-1 flex-col items-center rounded-3xl border border-white/5 bg-white/[0.01] p-10 md:p-12 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 shadow-2xl"
          >
            <h3 className="mb-10 text-xs font-bold tracking-widest text-text-muted">
              TRADITIONAL SECURITY
            </h3>
            <div className="flex flex-col items-center gap-8 font-mono text-sm text-text-secondary">
              <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-3">
                Known signature?
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[10px]">YES</span>
                  <div className="rounded-lg bg-red-500/20 px-6 py-3 text-red-400 border border-red-500/30 font-bold">
                    BLOCK
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[10px]">NO</span>
                  <div className="rounded-lg bg-green-500/20 px-6 py-3 text-green-400 border border-green-500/30 font-bold">
                    ALLOW
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ShieldSense AI */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex flex-1 flex-col items-center rounded-3xl border border-purple-primary/40 bg-purple-900/10 p-10 md:p-12 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-primary to-transparent opacity-50" />
            <h3 className="mb-10 text-xs font-bold tracking-widest text-purple-bright flex items-center gap-2">
              <Zap className="h-4 w-4" /> SHIELDSENSE NEURAL ENGINE
            </h3>
            <div className="flex flex-col gap-4 text-sm font-medium text-white w-full max-w-sm">
              {[
                {
                  text: "What is its intent?",
                  icon: <Fingerprint className="h-4 w-4 text-purple-400" />,
                },
                {
                  text: "What evidence exists?",
                  icon: <ShieldX className="h-4 w-4 text-purple-400" />,
                },
                {
                  text: "How risky is the context?",
                  icon: <AlertTriangle className="h-4 w-4 text-purple-400" />,
                },
                {
                  text: "Provide explainable reasoning.",
                  icon: <Lock className="h-4 w-4 text-purple-400" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl bg-white/5 p-4 border border-white/5"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
