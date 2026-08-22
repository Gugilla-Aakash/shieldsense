"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Ban,
  Check,
  ChevronRight,
  Circle,
  Cpu,
  LockKeyhole,
  Network,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  Terminal,
  Wifi,
  X,
} from "lucide-react";

type Phase =
  "boot" | "incoming" | "intercepted" | "analyzing" | "verdict" | "contained";

const TERMINAL_LINES = [
  {
    type: "blue",
    text: "[NET] Incoming connection detected",
  },
  {
    type: "blue",
    text: "[NET] Source: 185.XX.XX.42",
  },
  {
    type: "orange",
    text: "[WARN] Payload signature requires inspection",
  },
  {
    type: "orange",
    text: "[SCAN] Domain reputation: LOW",
  },
  {
    type: "red",
    text: "[FLAG] Credential harvesting pattern",
  },
  {
    type: "red",
    text: "[FLAG] Brand impersonation detected",
  },
  {
    type: "orange",
    text: "[SCAN] Urgency language: HIGH",
  },
  {
    type: "red",
    text: "[THREAT] Malicious intent confirmed",
  },
];

const ANALYSIS_STEPS = [
  "URL STRUCTURE",
  "DOMAIN REPUTATION",
  "LANGUAGE INTENT",
  "BRAND IMPERSONATION",
];

export default function ThreatDemo() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [terminalStep, setTerminalStep] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [score, setScore] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((value) => !value);
    }, 550);

    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    let interval: NodeJS.Timeout | undefined;

    if (phase === "boot") {
      timeout = setTimeout(() => setPhase("incoming"), 900);
    }

    if (phase === "incoming") {
      timeout = setTimeout(() => setPhase("intercepted"), 1200);
    }

    if (phase === "intercepted") {
      if (terminalStep < TERMINAL_LINES.length) {
        timeout = setTimeout(() => {
          setTerminalStep((step) => step + 1);
        }, 420);
      } else {
        timeout = setTimeout(() => setPhase("analyzing"), 700);
      }
    }

    if (phase === "analyzing") {
      if (analysisStep < ANALYSIS_STEPS.length) {
        timeout = setTimeout(() => {
          setAnalysisStep((step) => step + 1);
        }, 600);
      } else {
        let currentScore = 0;

        interval = setInterval(() => {
          currentScore += Math.floor(Math.random() * 8) + 5;

          if (currentScore >= 91) {
            setScore(91);

            if (interval) clearInterval(interval);

            timeout = setTimeout(() => {
              setPhase("verdict");
            }, 700);

            return;
          }

          setScore(currentScore);
        }, 80);
      }
    }

    if (phase === "verdict") {
      timeout = setTimeout(() => {
        setPhase("contained");
      }, 4000);
    }

    if (phase === "contained") {
      timeout = setTimeout(() => {
        setPhase("boot");
        setTerminalStep(0);
        setAnalysisStep(0);
        setScore(0);
      }, 4500);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [phase, terminalStep, analysisStep]);

  const progress = useMemo(() => {
    if (phase === "boot") return 2;
    if (phase === "incoming") return 12;
    if (phase === "intercepted") {
      return Math.min(45, 18 + terminalStep * 4);
    }
    if (phase === "analyzing") {
      return Math.min(82, 48 + analysisStep * 8);
    }
    if (phase === "verdict" || phase === "contained") return 100;

    return 0;
  }, [phase, terminalStep, analysisStep]);

  const isThreat =
    phase === "verdict" ||
    phase === "contained" ||
    (phase === "analyzing" && score > 60);

  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      {/* Ambient threat glow */}
      <motion.div
        animate={{
          opacity: isThreat ? [0.12, 0.28, 0.12] : [0.06, 0.14, 0.06],
          scale: isThreat ? [0.98, 1.05, 0.98] : [1, 1.02, 1],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`pointer-events-none absolute inset-[-10%] blur-[100px] ${
          isThreat ? "bg-red-500/20" : "bg-blue-500/10"
        }`}
      />

      {/* Terminal frame */}
      <div
        className={`relative overflow-hidden border bg-[#030508] font-mono transition-all duration-700 ${
          isThreat
            ? "border-red-500/45 shadow-[0_0_80px_-25px_rgba(239,68,68,0.65)]"
            : "border-blue-400/20 shadow-[0_0_80px_-35px_rgba(59,130,246,0.5)]"
        }`}
      >
        {/* Matrix-style background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Moving scan line */}
        <motion.div
          animate={{ y: ["-20%", "120%"] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`pointer-events-none absolute left-0 top-0 z-20 h-20 w-full bg-gradient-to-b from-transparent ${
            isThreat ? "via-red-500/[0.07]" : "via-blue-500/[0.06]"
          } to-transparent`}
        />

        {/* CRT noise */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-screen">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 3px)",
            }}
          />
        </div>

        {/* Terminal header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.07] bg-white/[0.015] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-blue-400/25 bg-blue-500/[0.07]">
              <Terminal className="h-4 w-4 text-blue-400" />
            </div>

            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-white/80">
                SHIELDSENSE
              </div>

              <div className="mt-1 flex items-center gap-2 text-[8px] tracking-[0.18em] text-white/25">
                <span>DEFENSE_NODE_07</span>
                <span>•</span>
                <span className="text-blue-400">LIVE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-[8px] tracking-[0.15em] text-white/25 sm:flex">
              <Network className="h-3 w-3" />
              SECURE_TUNNEL
            </div>

            <motion.div
              animate={{
                opacity: [0.25, 1, 0.25],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className={`h-2 w-2 rounded-full ${
                isThreat ? "bg-red-500" : "bg-blue-400"
              }`}
            />
          </div>
        </div>

        {/* Terminal body */}
        <div className="relative z-10 p-6 sm:p-8">
          <div className="min-h-[535px]">
            <AnimatePresence mode="wait">
              {/* BOOT */}
              {phase === "boot" && (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[535px] flex-col justify-between"
                >
                  <div>
                    <div className="mb-8 text-[10px] tracking-[0.22em] text-blue-400">
                      INITIALIZING DEFENSE PROTOCOL
                    </div>

                    <div className="space-y-3 text-[11px] leading-6">
                      <TerminalLine color="blue">
                        booting ShieldSense core...
                      </TerminalLine>

                      <TerminalLine color="blue">
                        loading heuristic engine...
                      </TerminalLine>

                      <TerminalLine color="orange">
                        monitoring external traffic...
                      </TerminalLine>

                      <TerminalLine color="green">
                        defense layer online
                      </TerminalLine>

                      <TerminalLine color="blue">
                        awaiting incoming activity
                      </TerminalLine>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] tracking-[0.18em] text-white/25">
                    <span>{">"}</span>
                    <span>LISTENING</span>

                    <span
                      className={`h-3 w-[6px] bg-blue-400 ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </motion.div>
              )}

              {/* INCOMING */}
              {phase === "incoming" && (
                <motion.div
                  key="incoming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[535px] flex-col"
                >
                  <div className="mb-8 flex items-center gap-3 border-b border-white/[0.06] pb-4">
                    <Wifi className="h-4 w-4 text-blue-400" />

                    <span className="text-[10px] font-bold tracking-[0.22em] text-blue-300">
                      INCOMING CONNECTION
                    </span>
                  </div>

                  <div className="space-y-5 text-[11px]">
                    <TerminalLine color="blue">
                      source: 185.XX.XX.42
                    </TerminalLine>

                    <TerminalLine color="blue">
                      protocol: HTTPS / TCP
                    </TerminalLine>

                    <TerminalLine color="orange">
                      payload: suspicious
                    </TerminalLine>

                    <TerminalLine color="orange">
                      destination: secure-bank-verification.example
                    </TerminalLine>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="mt-8 border border-orange-500/20 bg-orange-500/[0.035] p-5"
                    >
                      <div className="mb-3 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-orange-400">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        ANOMALY DETECTED
                      </div>

                      <p className="text-[10px] leading-6 text-white/50">
                        Incoming request contains indicators associated with
                        credential harvesting and impersonation.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* TERMINAL ANALYSIS */}
              {phase === "intercepted" && (
                <motion.div
                  key="intercepted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[535px] flex-col"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-red-400">
                      THREAT INTERCEPTED
                    </span>

                    <span className="text-[8px] tracking-[0.16em] text-white/25">
                      ANALYSIS STREAM
                    </span>
                  </div>

                  <div className="flex-1 space-y-3">
                    {TERMINAL_LINES.slice(0, terminalStep).map(
                      (line, index) => (
                        <motion.div
                          key={`${line.text}-${index}`}
                          initial={{
                            opacity: 0,
                            x: -12,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          className={`text-[10px] leading-6 ${
                            line.type === "red"
                              ? "text-red-400"
                              : line.type === "orange"
                                ? "text-orange-300"
                                : "text-blue-300"
                          }`}
                        >
                          <span className="mr-2 text-white/20">{">"}</span>

                          {line.text}
                        </motion.div>
                      ),
                    )}

                    <div className="flex items-center gap-2 pt-2 text-[10px] text-white/35">
                      <span>{">"}</span>

                      <span
                        className={`h-3 w-[6px] bg-blue-400 ${
                          cursorVisible ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-auto pt-8">
                    <div className="mb-3 flex justify-between text-[8px] tracking-[0.16em] text-white/25">
                      <span>INTERCEPTION PROGRESS</span>
                      <span>{progress}%</span>
                    </div>

                    <div className="h-[3px] bg-white/[0.06]">
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ANALYSIS */}
              {phase === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[535px] flex-col"
                >
                  <div className="mb-7 flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-purple-400" />

                      <span className="text-[10px] font-bold tracking-[0.2em] text-purple-300">
                        HEURISTIC ANALYSIS
                      </span>
                    </div>

                    <span className="text-[8px] tracking-[0.14em] text-purple-400/60">
                      ENGINE_ACTIVE
                    </span>
                  </div>

                  <div className="space-y-5">
                    {ANALYSIS_STEPS.map((step, index) => {
                      const visible = analysisStep > index;

                      return (
                        <motion.div
                          key={step}
                          animate={{
                            opacity: visible ? 1 : 0.25,
                          }}
                          className="grid grid-cols-[1fr_auto] items-center gap-4"
                        >
                          <div>
                            <div className="text-[10px] tracking-[0.12em] text-white/65">
                              {step}
                            </div>

                            <div className="mt-1 text-[8px] tracking-[0.12em] text-white/20">
                              {visible
                                ? "SIGNAL EVALUATED"
                                : "WAITING FOR ENGINE"}
                            </div>
                          </div>

                          {visible ? (
                            <motion.span
                              initial={{
                                opacity: 0,
                                scale: 0.7,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              className={`flex items-center gap-1.5 text-[8px] font-bold tracking-[0.12em] ${
                                index === 0 ? "text-blue-400" : "text-red-400"
                              }`}
                            >
                              {index === 0 ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <AlertTriangle className="h-3 w-3" />
                              )}

                              {index === 0 ? "CLEAR" : "FLAGGED"}
                            </motion.span>
                          ) : (
                            <span className="text-[8px] tracking-[0.12em] text-white/20">
                              SCANNING
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-10">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[8px] tracking-[0.18em] text-white/25">
                        RISK CALCULATION
                      </span>

                      <span
                        className={`text-[10px] font-bold ${
                          score > 60 ? "text-red-400" : "text-orange-400"
                        }`}
                      >
                        {score}%
                      </span>
                    </div>

                    <div className="relative h-1 bg-white/[0.06]">
                      <motion.div
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.25 }}
                        className={`h-full ${
                          score > 60
                            ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.75)]"
                            : "bg-orange-400"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VERDICT */}
              {phase === "verdict" && (
                <motion.div
                  key="verdict"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex min-h-[535px] flex-col"
                >
                  <div className="flex flex-col items-center pt-2 text-center">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      className="relative flex h-32 w-32 items-center justify-center"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.12, 1],
                          opacity: [0.15, 0.35, 0.15],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                        }}
                        className="absolute inset-3 rounded-full bg-red-500 blur-2xl"
                      />

                      <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="44"
                          fill="none"
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth="2"
                        />

                        <motion.circle
                          cx="50"
                          cy="50"
                          r="44"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="276"
                          initial={{
                            strokeDashoffset: 276,
                          }}
                          animate={{
                            strokeDashoffset: 276 - (276 * score) / 100,
                          }}
                          transition={{
                            duration: 1.1,
                          }}
                          className="drop-shadow-[0_0_10px_rgba(239,68,68,0.85)]"
                        />
                      </svg>

                      <div className="relative z-10">
                        <div className="text-4xl font-black text-white">
                          {score}
                        </div>

                        <div className="mt-1 text-[7px] tracking-[0.25em] text-white/30">
                          RISK SCORE
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.35,
                      }}
                      className="mt-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.26em] text-red-400"
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                      CRITICAL THREAT
                    </motion.div>
                  </div>

                  <div className="mt-10 space-y-4">
                    <VerdictRow
                      label="Credential harvesting"
                      value="DETECTED"
                    />
                    <VerdictRow label="Domain impersonation" value="DETECTED" />
                    <VerdictRow label="Urgency manipulation" value="DETECTED" />
                    <VerdictRow label="Malicious intent" value="CONFIRMED" />
                  </div>

                  <div className="mt-auto pt-8">
                    <div className="mb-3 flex items-center gap-2 text-[8px] tracking-[0.16em] text-white/25">
                      <ShieldAlert className="h-3 w-3 text-red-400" />
                      DEFENSIVE ACTION REQUIRED
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <ActionButton
                        icon={<ShieldBan className="h-3.5 w-3.5" />}
                        label="BLOCK"
                        danger
                      />

                      <ActionButton
                        icon={<ShieldCheck className="h-3.5 w-3.5" />}
                        label="ISOLATE"
                      />

                      <ActionButton
                        icon={<ShieldCheck className="h-3.5 w-3.5" />}
                        label="ALLOW"
                        muted
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CONTAINED */}
              {phase === "contained" && (
                <motion.div
                  key="contained"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex min-h-[535px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                    }}
                    className="flex h-20 w-20 items-center justify-center border border-emerald-400/30 bg-emerald-500/[0.08]"
                  >
                    <ShieldCheck className="h-9 w-9 text-emerald-400" />
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="mt-7"
                  >
                    <div className="text-sm font-bold tracking-[0.22em] text-emerald-400">
                      THREAT CONTAINED
                    </div>

                    <p className="mx-auto mt-4 max-w-sm text-[10px] leading-6 text-white/40">
                      ShieldSense intercepted the malicious request before
                      execution and isolated the threat from the protected
                      environment.
                    </p>
                  </motion.div>

                  <div className="mt-10 w-full max-w-md border border-emerald-500/15 bg-emerald-500/[0.025] p-5 text-left">
                    <div className="mb-3 text-[8px] font-bold tracking-[0.18em] text-emerald-400">
                      DEFENSE LOG
                    </div>

                    <div className="space-y-2 text-[9px] tracking-[0.06em] text-white/35">
                      <div>&gt; malicious request blocked</div>
                      <div>&gt; payload isolated</div>
                      <div>&gt; credentials protected</div>
                      <div>&gt; user environment safe</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
          <div className="flex items-center gap-4 text-[7px] tracking-[0.18em] text-white/20">
            <span className="flex items-center gap-1.5">
              <Activity className="h-3 w-3" />
              REAL_TIME
            </span>

            <span className="flex items-center gap-1.5">
              <LockKeyhole className="h-3 w-3" />
              ENCRYPTED
            </span>
          </div>

          <span
            className={`text-[7px] tracking-[0.2em] ${
              isThreat ? "text-red-400/60" : "text-blue-400/50"
            }`}
          >
            {phase === "contained"
              ? "DEFENSE_COMPLETE"
              : "SHIELDSENSE_ENGINE_01"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TERMINAL LINE
   ========================================================= */

function TerminalLine({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "blue" | "orange" | "red" | "green";
}) {
  const colorClass = {
    blue: "text-blue-300",
    orange: "text-orange-300",
    red: "text-red-400",
    green: "text-emerald-400",
  }[color];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -8,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className={colorClass}
    >
      <span className="mr-2 text-white/20">&gt;</span>
      {children}
    </motion.div>
  );
}

/* =========================================================
   VERDICT ROW
   ========================================================= */

function VerdictRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -10,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="flex items-center justify-between border-b border-white/[0.05] pb-3"
    >
      <span className="text-[9px] tracking-[0.1em] text-white/45">{label}</span>

      <span className="flex items-center gap-1.5 text-[8px] font-bold tracking-[0.12em] text-red-400">
        <AlertTriangle className="h-3 w-3" />
        {value}
      </span>
    </motion.div>
  );
}

/* =========================================================
   ACTION BUTTON
   ========================================================= */

function ActionButton({
  icon,
  label,
  danger = false,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  muted?: boolean;
}) {
  return (
    <motion.button
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`flex h-11 items-center justify-center gap-2 border text-[8px] font-bold tracking-[0.18em] transition-all ${
        danger
          ? "border-red-500/45 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          : muted
            ? "border-white/[0.07] bg-white/[0.02] text-white/30 hover:border-white/15 hover:text-white/60"
            : "border-orange-400/25 bg-orange-400/[0.05] text-orange-300 hover:bg-orange-400/10"
      }`}
    >
      {icon}
      {label}

      {!muted && <ChevronRight className="h-3 w-3 opacity-40" />}
    </motion.button>
  );
}
