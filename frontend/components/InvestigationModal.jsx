"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  MessageSquare,
  Send,
  Shield,
  X,
  Activity,
  ScanLine,
  Cpu,
  LockKeyhole,
  Radar,
  Sparkles,
  Terminal,
  Crosshair,
  CircleDot,
} from "lucide-react";

import RiskBadge from "./RiskBadge";
import EvidenceList from "./EvidenceList";
import ActionButtons from "./ActionButtons";
import { chatWithSecurityAgent } from "../api/shieldsenseApi";

export default function InvestigationModal({ result, onClose }) {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  if (!result) {
    return null;
  }

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!chatInput.trim() || chatLoading) {
      return;
    }

    const userMessage = chatInput.trim();

    const updatedHistory = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];

    setMessages(updatedHistory);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await chatWithSecurityAgent(
        userMessage,
        result.scan_id,
        updatedHistory,
      );

      setMessages([
        ...updatedHistory,
        {
          role: "assistant",
          content: response.reply,
        },
      ]);
    } catch (error) {
      setMessages([
        ...updatedHistory,
        {
          role: "assistant",
          content:
            "Error contacting advisor: " + (error?.message || "Unknown error"),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#020204]/90 p-3 backdrop-blur-2xl sm:p-5">
      {/* ============================================================
          CINEMATIC BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {/* Central atmosphere */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.055] blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -50, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-cyan-500/[0.025] blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-violet-600/[0.035] blur-[130px]"
        />

        {/* Perspective grid */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] opacity-[0.11] [perspective:800px]">
          <div
            className="absolute inset-0 [transform:rotateX(62deg)_scale(1.7)]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.22) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.22) 1px, transparent 1px)
              `,
              backgroundSize: "55px 55px",
              maskImage: "linear-gradient(to top, black, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to top, black, transparent 90%)",
            }}
          />
        </div>

        {/* Animated scan line */}
        <motion.div
          animate={{ y: ["-5vh", "105vh"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,0.72)_100%)]" />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.018] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.45%22/%3E%3C/svg%3E')]" />
      </div>

      {/* ============================================================
          MODAL
      ============================================================ */}

      <div className="flex min-h-full items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.965,
            rotateX: 2,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.98,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#07080c]/90 shadow-[0_50px_140px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
        >
          {/* ======================================================
              OUTER LIGHTING
          ====================================================== */}

          <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-b from-violet-400/[0.12] via-transparent to-transparent" />

          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/[0.025] blur-[100px]" />

          {/* Top laser line */}
          <motion.div
            animate={{
              opacity: [0.25, 0.75, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent"
          />

          {/* Technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* ======================================================
              HEADER
          ====================================================== */}

          <div className="relative z-10 flex items-start justify-between border-b border-white/[0.055] p-5 sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              {/* Holographic shield */}
              <motion.div
                animate={{
                  y: [0, -2, 0],
                  boxShadow: [
                    "0 0 20px rgba(139,92,246,0.05)",
                    "0 0 35px rgba(139,92,246,0.16)",
                    "0 0 20px rgba(139,92,246,0.05)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/[0.06]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-1 rounded-xl border border-dashed border-violet-400/15"
                />

                <div className="absolute inset-2 rounded-lg border border-violet-400/[0.08]" />

                <Shield className="relative z-10 h-5 w-5 text-violet-300 drop-shadow-[0_0_12px_rgba(167,139,250,0.7)]" />
              </motion.div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-mono text-[7px] font-bold uppercase tracking-[0.24em] text-violet-300/65">
                    SHIELDSENSE INVESTIGATION
                  </div>

                  <span className="h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                </div>

                <h2 className="mt-1.5 max-w-[650px] truncate text-base font-bold tracking-[-0.02em] text-white sm:text-lg">
                  {result.target_summary}
                </h2>

                <div className="mt-1 flex items-center gap-2 font-mono text-[6px] uppercase tracking-[0.16em] text-white/15">
                  <LockKeyhole className="h-2.5 w-2.5" />
                  SECURE INVESTIGATION CHANNEL
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close investigation"
              className="group ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.015] text-white/25 transition duration-200 hover:border-violet-400/20 hover:bg-violet-500/[0.05] hover:text-white"
            >
              <X className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </div>

          {/* ======================================================
              CONTENT
          ====================================================== */}

          <div className="relative z-10 space-y-4 p-5 sm:p-6">
            {/* ====================================================
                RISK / CLASSIFICATION
            ==================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.055] bg-black/20 p-4 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-violet-500/[0.04] to-transparent" />

              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <RiskBadge
                    level={result.risk_level}
                    score={result.risk_score}
                  />

                  <div className="hidden h-6 w-px bg-white/[0.05] sm:block" />

                  <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.15em] text-white/20">
                    <Crosshair className="h-3 w-3 text-violet-400/35" />
                    THREAT
                    <span className="text-white/60">{result.threat_type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[6px] uppercase tracking-[0.17em] text-white/15">
                  <Cpu className="h-3 w-3 text-cyan-400/30" />
                  MODEL // {result.model_used}
                </div>
              </div>
            </motion.div>

            {/* ====================================================
                AI ASSESSMENT
            ==================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="relative overflow-hidden rounded-2xl border border-violet-400/12 bg-gradient-to-br from-violet-500/[0.055] via-violet-500/[0.02] to-transparent p-5 backdrop-blur-xl"
            >
              {/* Top signal */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
              />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.05]">
                      <BrainCircuit className="h-4 w-4 text-violet-300" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-mono text-[8px] font-bold tracking-[0.18em] text-violet-300/70">
                        AI SECURITY ASSESSMENT
                        <span className="h-1 w-1 rounded-full bg-violet-400" />
                      </div>

                      <div className="mt-1 font-mono text-[6px] uppercase tracking-[0.15em] text-white/15">
                        Autonomous threat reasoning
                      </div>
                    </div>
                  </div>

                  <Sparkles className="h-4 w-4 text-violet-400/30" />
                </div>

                <p className="text-sm leading-7 text-white/65">
                  {result.explanation}
                </p>

                {result.ai_agent_reasoning && (
                  <div className="mt-5 border-t border-violet-400/[0.08] pt-5">
                    <div className="mb-2 flex items-center gap-2 font-mono text-[7px] font-bold tracking-[0.16em] text-white/18">
                      <Terminal className="h-3 w-3" />
                      REASONING TRACE
                    </div>

                    <p className="text-xs leading-6 text-white/30">
                      {result.ai_agent_reasoning}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ====================================================
                EVIDENCE
            ==================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl border border-white/[0.06] bg-black/15 p-5 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/[0.025] blur-3xl" />

              <EvidenceList indicators={result.indicators} />
            </motion.div>

            {/* ====================================================
                ACTIONS
            ==================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/15 p-5 backdrop-blur-xl"
            >
              <ActionButtons
                scanId={result.scan_id}
                recommendedAction={result.recommendation}
              />
            </motion.div>

            {/* ====================================================
                AI CHAT
            ==================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/15 p-5 backdrop-blur-xl"
            >
              {/* ambient glow */}
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-violet-600/[0.04] blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.05]">
                      <MessageSquare className="h-4 w-4 text-violet-300" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-mono text-[8px] font-bold tracking-[0.18em] text-violet-300/65">
                        AI SECURITY ADVISOR
                        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                      </div>

                      <div className="mt-1 font-mono text-[6px] uppercase tracking-[0.15em] text-white/15">
                        Interactive threat intelligence
                      </div>
                    </div>
                  </div>

                  <Radar className="h-4 w-4 text-violet-400/20" />
                </div>

                {/* Chat window */}
                <div className="mb-4 max-h-64 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                  {messages.length === 0 && (
                    <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-4">
                      <div className="mb-2 flex items-center gap-2 font-mono text-[6px] uppercase tracking-[0.15em] text-violet-300/35">
                        <CircleDot className="h-2.5 w-2.5" />
                        AWAITING QUERY
                      </div>

                      <p className="text-xs leading-6 text-white/20">
                        Ask why the threat was detected, what the evidence
                        means, or what action should be taken.
                      </p>
                    </div>
                  )}

                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <motion.div
                        key={`${message.role}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 8,
                          x: message.role === "user" ? 8 : -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className={`relative rounded-xl border p-3 text-xs leading-6 ${
                          message.role === "user"
                            ? "ml-8 border-violet-400/15 bg-violet-500/[0.06] text-violet-100"
                            : "mr-8 border-white/[0.055] bg-white/[0.025] text-white/45"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-mono text-[6px] font-bold uppercase tracking-[0.14em] text-white/20">
                            {message.role === "user"
                              ? "OPERATOR"
                              : "SHIELDSENSE AI"}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-violet-400/30" />
                        </div>

                        {message.content}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {chatLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 px-2 font-mono text-[7px] tracking-[0.16em] text-violet-300/50"
                    >
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Activity className="h-3 w-3" />
                      </motion.div>
                      SHIELDSENSE IS REASONING...
                    </motion.div>
                  )}
                </div>

                {/* Chat input */}
                <form
                  onSubmit={handleSendMessage}
                  className="relative flex gap-2"
                >
                  <div className="group relative flex min-w-0 flex-1">
                    <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-cyan-500/0 opacity-0 blur-sm transition-opacity group-focus-within:opacity-100" />

                    <input
                      type="text"
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      placeholder="Ask a question about this threat..."
                      className="relative min-w-0 w-full rounded-xl border border-white/[0.07] bg-black/30 px-4 text-xs text-white outline-none placeholder:text-white/15 transition focus:border-violet-400/25 focus:bg-violet-500/[0.02]"
                    />
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.04,
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-400/20 bg-violet-500/[0.08] text-violet-200 shadow-[0_0_25px_rgba(139,92,246,0.08)] transition hover:border-violet-400/30 hover:bg-violet-500/[0.14] disabled:cursor-not-allowed disabled:opacity-25"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/[0.08] skew-x-12 transition-transform duration-500 hover:translate-x-full" />

                    <Send className="relative h-3.5 w-3.5" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* ======================================================
              FOOTER
          ====================================================== */}

          <div className="relative z-10 flex items-center justify-between border-t border-white/[0.04] px-5 py-3 font-mono text-[6px] tracking-[0.16em] text-white/12 sm:px-6">
            <div className="flex items-center gap-3">
              <ScanLine className="h-3 w-3 text-violet-400/25" />
              SHIELDSENSE // INVESTIGATION_NODE
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400/70 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              SECURE
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================
          SCROLLBAR
      ============================================================ */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(139, 92, 246, 0.15);
              border-radius: 999px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(139, 92, 246, 0.3);
            }
          `,
        }}
      />
    </div>
  );
}
