"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart,
  Cpu,
  File,
  FileText,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  Search,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

const STAGES = [
  {
    id: "01",
    title: "DETECT",
    desc: "Ingest and parse suspicious signals from the submitted content across multiple vectors.",
    icon: Search,
  },
  {
    id: "02",
    title: "INVESTIGATE",
    desc: "Execute deep sandbox analysis on URLs, language semantics, and sender identity.",
    icon: Cpu,
  },
  {
    id: "03",
    title: "SCORE",
    desc: "Compile multidimensional evidence into a deterministic 0–100 risk probability score.",
    icon: BarChart,
  },
  {
    id: "04",
    title: "EXPLAIN",
    desc: "Translate complex technical heuristics into human-readable AI reasoning.",
    icon: FileText,
  },
  {
    id: "05",
    title: "PROTECT",
    desc: "Deploy automated preventative measures and recommend the safest next action.",
    icon: ShieldCheck,
  },
];

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0);

  /*
   * Stable animation loop.
   * Dependency array never changes size.
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % STAGES.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const active = STAGES[activeStage];
  const ActiveIcon = active.icon;

  /*
   * Signal position is tied directly to the active stage.
   */
  const signalPosition = `${activeStage * 25}%`;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-white/[0.05] bg-[#07080c] py-28 sm:py-32 lg:py-36"
    >
      {/* Cyber grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.18) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 20%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-blue-500/[0.04] blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-purple-500/[0.05] blur-[120px]" />

      <div className="shield-container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-purple-400/40" />

            <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.28em] text-purple-300">
              <Terminal className="h-3.5 w-3.5" />
              Analysis Pipeline
            </span>

            <span className="h-px w-8 bg-purple-400/40" />
          </div>

          <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            From suspicious input to confident action.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
            ShieldSense doesn't just guess. It routes threats through a
            military-grade analytical pipeline, combining heuristic scanning
            with generative AI reasoning.
          </p>
        </div>

        {/* Pipeline */}
        <div className="mx-auto mt-16 max-w-6xl lg:mt-20">
          <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
            {/* LEFT */}
            <div className="relative">
              {/* Rail */}
              <div className="pointer-events-none absolute bottom-7 left-[23px] top-7 w-px bg-gradient-to-b from-blue-400/20 via-purple-400/25 to-emerald-400/20" />

              {/* Traveling signal */}
              <motion.div
                animate={{
                  top: signalPosition,
                  opacity: [0.5, 1, 0.5],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  top: {
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="pointer-events-none absolute left-[19px] z-20 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.95)]"
              />

              <div className="flex flex-col gap-2">
                {STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isActive = activeStage === idx;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStage(idx)}
                      className="group relative flex w-full items-center gap-4 text-left"
                    >
                      {/* Node */}
                      <motion.div
                        animate={{
                          scale: isActive ? [1, 1.08, 1] : 1,
                          borderColor: isActive
                            ? [
                                "rgba(168,85,247,0.35)",
                                "rgba(168,85,247,0.7)",
                                "rgba(168,85,247,0.35)",
                              ]
                            : "rgba(255,255,255,0.08)",
                        }}
                        transition={{
                          duration: isActive ? 1.8 : 0.2,
                          repeat: isActive ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                          isActive
                            ? "bg-purple-500/15 text-purple-200 shadow-[0_0_25px_rgba(139,92,246,0.18)]"
                            : "bg-[#0a0c11] text-white/30 group-hover:border-white/20 group-hover:text-white/60"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>

                      {/* Stage card */}
                      <motion.div
                        animate={{
                          x: isActive ? 4 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className={`min-w-0 flex-1 border px-4 py-3.5 transition-colors duration-300 ${
                          isActive
                            ? "border-purple-400/25 bg-purple-500/[0.045]"
                            : "border-white/[0.045] bg-white/[0.012] group-hover:border-white/[0.10] group-hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="mb-1 text-[8px] font-bold tracking-[0.18em] text-white/25">
                              STAGE_{stage.id}
                            </div>

                            <div
                              className={`text-[11px] font-bold tracking-[0.15em] ${
                                isActive
                                  ? "text-white"
                                  : "text-white/45 group-hover:text-white/75"
                              }`}
                            >
                              {stage.title}
                            </div>
                          </div>

                          <AnimatePresence>
                            {isActive && (
                              <motion.span
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 6 }}
                                className="flex items-center gap-1.5 text-[7px] font-bold tracking-[0.14em] text-purple-300"
                              >
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                                ACTIVE
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative min-h-[500px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#05070b]">
              {/* Grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(139,92,246,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.25) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Corner accents */}
              <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-purple-400/30" />
              <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-purple-400/30" />
              <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-purple-400/20" />
              <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-purple-400/20" />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <div className="flex items-center gap-2 text-[8px] tracking-[0.18em] text-white/30">
                  <Activity className="h-3 w-3 text-blue-400" />
                  SHIELDSENSE://PIPELINE
                </div>

                <div className="flex items-center gap-2 text-[7px] tracking-[0.14em] text-emerald-400/60">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  ENGINE ONLINE
                </div>
              </div>

              {/* Analysis content */}
              <div className="relative z-10 flex min-h-[445px] flex-col justify-center px-7 py-10 sm:px-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{
                      opacity: 0,
                      y: 16,
                      filter: "blur(4px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -16,
                      filter: "blur(4px)",
                    }}
                    transition={{
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-purple-400" />

                        <span className="text-[8px] font-bold tracking-[0.22em] text-purple-300">
                          EXECUTING PHASE
                        </span>
                      </div>

                      <span className="font-mono text-[8px] tracking-[0.16em] text-white/20">
                        0{activeStage + 1} / 05
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      key={`icon-${activeStage}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-400/25 bg-purple-500/[0.06] shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                    >
                      <ActiveIcon className="h-9 w-9 text-purple-300" />
                    </motion.div>

                    <h3 className="mt-8 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                      {active.title} PHASE
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-8 text-text-secondary">
                      {active.desc}
                    </p>

                    {/* Trace */}
                    <div className="mt-9 border border-white/[0.06] bg-black/30 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[7px] font-bold tracking-[0.18em] text-white/25">
                          EXECUTION TRACE
                        </span>

                        <span className="flex items-center gap-1.5 text-[7px] tracking-[0.12em] text-purple-400/60">
                          <span className="h-1 w-1 animate-pulse rounded-full bg-purple-400" />
                          LIVE
                        </span>
                      </div>

                      <div className="space-y-2 text-[9px] tracking-[0.05em]">
                        <TraceLine
                          text={`> node.${active.id.toLowerCase()} initialized`}
                        />
                        <TraceLine
                          text={`> ${active.title.toLowerCase()} engine executing`}
                        />
                        <TraceLine text="> evidence stream synchronized" />
                        <TraceLine text="> awaiting next stage..." />
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-7">
                      <div className="mb-2 flex justify-between text-[7px] tracking-[0.16em] text-white/20">
                        <span>PIPELINE PROGRESS</span>

                        <span>
                          {Math.round(
                            ((activeStage + 1) / STAGES.length) * 100,
                          )}
                          %
                        </span>
                      </div>

                      <div className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          animate={{
                            width: `${((activeStage + 1) / STAGES.length) * 100}%`,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
                        />

                        <motion.div
                          animate={{
                            x: ["-100%", "350%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-y-0 w-1/4 bg-white/35 blur-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/[0.06] bg-white/[0.015] px-5 py-3">
                <span className="text-[7px] tracking-[0.18em] text-white/20">
                  HEURISTIC_ENGINE / ACTIVE
                </span>

                <span className="text-[7px] tracking-[0.16em] text-purple-400/40">
                  SECURE_PIPELINE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Threat vectors */}
        <div className="mx-auto mt-16 max-w-6xl border-t border-white/[0.06] pt-12">
          <div className="mb-7 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
              <ShieldCheck className="h-3.5 w-3.5 text-purple-400/70" />
              Supported Threat Vectors
            </span>

            <span className="hidden text-[7px] tracking-[0.18em] text-white/15 sm:block">
              MULTI_VECTOR INPUT
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "MALICIOUS LINKS", icon: LinkIcon },
              { label: "PHISHING EMAILS", icon: Mail },
              { label: "SUSPICIOUS FILES", icon: File },
              { label: "SOCIAL ENGINEERING", icon: MessageSquare },
            ].map((type, index) => {
              const Icon = type.icon;

              return (
                <motion.div
                  key={type.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="group flex items-center gap-3 border border-white/[0.06] bg-white/[0.015] px-4 py-4 transition-colors hover:border-purple-400/25 hover:bg-purple-500/[0.025]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/[0.07] bg-white/[0.025]">
                    <Icon className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-purple-300" />
                  </div>

                  <div>
                    <div className="text-[9px] font-bold tracking-[0.12em] text-white/45 transition-colors group-hover:text-white/75">
                      {type.label}
                    </div>

                    <div className="mt-1 text-[7px] tracking-[0.12em] text-white/15">
                      VECTOR_0{index + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TraceLine({ text }: { text: string }) {
  return (
    <div className="text-white/35">
      <span className="mr-2 text-purple-400/50">●</span>
      {text}
    </div>
  );
}
