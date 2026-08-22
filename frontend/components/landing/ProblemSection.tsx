"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  BrainCircuit,
  Fingerprint,
  Lock,
  Mail,
  ScanLine,
  ShieldX,
  Zap,
} from "lucide-react";

const threatSignals = [
  {
    label: "LOOKALIKE DOMAIN",
    description: "Domain structure mimics a trusted service.",
    icon: Fingerprint,
  },
  {
    label: "URGENCY LANGUAGE",
    description: "Pressure tactics attempt to force rapid action.",
    icon: AlertTriangle,
  },
  {
    label: "CREDENTIAL HARVESTING",
    description: "The destination is designed to capture secrets.",
    icon: ShieldX,
  },
];

const reasoningSignals = [
  { label: "INTENT", value: "Credential theft" },
  { label: "CONTEXT", value: "High risk" },
  { label: "EVIDENCE", value: "4 signals" },
  { label: "VERDICT", value: "Malicious" },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * Smooth one scroll signal and derive the entire scene from it.
   * This is much cheaper than independently reacting to scroll
   * in every child.
   */
  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 30,
    mass: 0.25,
  });

  /* ============================================================
     SCROLL MOTION
  ============================================================ */

  const headerY = useTransform(progress, [0, 0.2], [45, 0]);
  const headerOpacity = useTransform(progress, [0, 0.18], [0, 1]);

  const sceneY = useTransform(progress, [0, 1], [40, -40]);

  const sceneRotateX = useTransform(progress, [0, 0.5, 1], [5, 0, -4]);

  const sceneRotateY = useTransform(progress, [0, 0.5, 1], [-3, 0, 3]);

  const sceneScale = useTransform(progress, [0, 0.45, 1], [0.95, 1, 0.97]);

  const cardX = useTransform(progress, [0.08, 0.4], [65, 0]);

  const cardRotate = useTransform(progress, [0.08, 0.4], [-2.5, 0]);

  const cardOpacity = useTransform(progress, [0.08, 0.2], [0, 1]);

  const scanScale = useTransform(progress, [0.15, 0.5], [0.7, 1]);

  const scanOpacity = useTransform(
    progress,
    [0.15, 0.28, 0.75],
    [0, 0.8, 0.15],
  );

  const signalOpacity = useTransform(progress, [0.28, 0.5], [0.25, 1]);

  const verdictY = useTransform(progress, [0.48, 0.72], [45, 0]);

  const verdictOpacity = useTransform(progress, [0.48, 0.64], [0, 1]);

  const comparisonY = useTransform(progress, [0.68, 0.9], [50, 0]);

  const comparisonOpacity = useTransform(progress, [0.68, 0.82], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative min-h-[175vh] overflow-hidden bg-[#050507]"
      style={{ perspective: "1400px" }}
    >
      {/* ============================================================
          STATIC ATMOSPHERE
      ============================================================ */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[15%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-600/[0.05] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.14) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 72% 60% at 50% 40%, black 15%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 60% at 50% 40%, black 15%, transparent 78%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/10 to-transparent" />
      </div>

      {/* ============================================================
          STICKY SCENE
      ============================================================ */}

      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] px-6 py-16 sm:px-8 lg:px-12 xl:px-16">
          {/* ========================================================
              HEADER
          ======================================================== */}

          <motion.div
            style={{
              y: headerY,
              opacity: headerOpacity,
            }}
            className="relative z-20 mx-auto mb-10 max-w-3xl text-center sm:mb-12"
          >
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-violet-400/30 sm:w-12" />

              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-violet-300/65 sm:text-[9px]">
                THE SECURITY GAP
              </span>

              <span className="h-px w-10 bg-violet-400/30 sm:w-12" />
            </div>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              <span className="block text-white/25">
                The problem isn&apos;t seeing
              </span>

              <span className="mt-2 block bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
                the threat.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/32 sm:text-[15px] sm:leading-7">
              A suspicious message can look harmless in isolation. The real
              question is whether the evidence tells a different story.
            </p>
          </motion.div>

          {/* ========================================================
              MAIN 3D SCENE
          ======================================================== */}

          <motion.div
            style={{
              y: sceneY,
              rotateX: sceneRotateX,
              rotateY: sceneRotateY,
              scale: sceneScale,
              transformStyle: "preserve-3d",
            }}
            className="relative mx-auto w-full max-w-[980px] will-change-transform"
          >
            {/* Static depth ring */}
            <motion.div
              style={{
                scale: scanScale,
                opacity: scanOpacity,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/[0.07] will-change-transform"
            />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-400/[0.045]" />

            {/* Static signal markers */}
            <OrbitNode className="left-[4%] top-[24%]" />
            <OrbitNode className="right-[4%] top-[19%]" />
            <OrbitNode className="left-[10%] bottom-[18%]" />
            <OrbitNode className="right-[10%] bottom-[15%]" />

            {/* ======================================================
                THREAT CARD
            ====================================================== */}

            <motion.div
              style={{
                x: cardX,
                rotateZ: cardRotate,
                opacity: cardOpacity,
              }}
              className="relative z-10 mx-auto w-full max-w-[760px] will-change-transform"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#08080d] shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
                {/* Lightweight scan beam */}
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-px overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-full w-1/4 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent will-change-transform"
                  />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.055] px-5 py-4 sm:px-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/[0.06]">
                      <Mail className="h-4 w-4 text-violet-300" />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-[9px] font-bold tracking-[0.2em] text-white/65">
                        SECURITY ALERT
                      </div>

                      <div className="mt-1 font-mono text-[7px] tracking-[0.16em] text-white/20">
                        INBOUND_MESSAGE // 02:41 PM
                      </div>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-red-400/15 bg-red-500/[0.05] px-2.5 py-1.5 font-mono text-[7px] font-bold tracking-[0.14em] text-red-300/65">
                    HIGH RISK
                  </span>
                </div>

                {/* Body */}
                <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
                        MESSAGE
                      </span>

                      <p className="mt-2 text-sm font-semibold text-white/85 sm:text-base">
                        Your account requires immediate verification.
                      </p>
                    </div>

                    <p className="max-w-xl text-[13px] leading-6 text-white/38">
                      Unusual activity was detected on your account. Verify your
                      identity to prevent suspension.
                    </p>

                    <button
                      type="button"
                      disabled
                      className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-4 py-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white/20"
                    >
                      Verify Account
                    </button>

                    <div className="border-t border-white/[0.055] pt-4">
                      <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
                        DESTINATION
                      </span>

                      <div className="mt-2 rounded-lg border border-red-400/15 bg-red-500/[0.025] px-3.5 py-2.5">
                        <p className="break-all font-mono text-[9px] leading-5 text-white/35">
                          https://
                          <span className="font-semibold text-red-300">
                            secure-bank-verification
                          </span>
                          .example/login
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Evidence panel */}
                  <div className="relative">
                    <div className="rounded-xl border border-red-400/12 bg-red-500/[0.02] p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ScanLine className="h-3.5 w-3.5 text-red-300/60" />

                          <span className="font-mono text-[7px] font-bold tracking-[0.18em] text-red-300/60">
                            THREAT SIGNALS
                          </span>
                        </div>

                        <span className="font-mono text-[7px] text-red-300/35">
                          03
                        </span>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {threatSignals.map((signal, index) => {
                          const Icon = signal.icon;

                          return (
                            <motion.div
                              key={signal.label}
                              style={{
                                opacity: signalOpacity,
                              }}
                              className="rounded-lg border border-white/[0.055] bg-black/20 p-3 will-change-[opacity]"
                            >
                              <div className="flex items-start gap-2.5">
                                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300/60" />

                                <div className="min-w-0">
                                  <div className="font-mono text-[7px] font-bold tracking-[0.1em] text-white/60">
                                    {signal.label}
                                  </div>

                                  <div className="mt-1 text-[9px] leading-4 text-white/22">
                                    {signal.description}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-2.5 h-px bg-white/[0.045]">
                                <div
                                  className="h-full bg-red-400/40"
                                  style={{
                                    width: `${55 + index * 15}%`,
                                  }}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.055] px-5 py-3.5 sm:px-7">
                  <div className="flex items-center gap-2 font-mono text-[7px] tracking-[0.14em] text-white/18">
                    <Lock className="h-3 w-3" />
                    ENCRYPTED ANALYSIS
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[7px] tracking-[0.14em] text-red-300/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.7)]" />
                    THREAT DETECTED
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ======================================================
                REASONING
            ====================================================== */}

            <motion.div
              style={{
                y: verdictY,
                opacity: verdictOpacity,
              }}
              className="relative z-20 mx-auto mt-5 max-w-[760px] will-change-transform"
            >
              <div className="rounded-[18px] border border-violet-400/12 bg-violet-500/[0.025] p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/[0.06]">
                      <BrainCircuit className="h-4 w-4 text-violet-300" />
                    </div>

                    <div>
                      <div className="font-mono text-[7px] font-bold tracking-[0.18em] text-violet-300/60">
                        SHIELDSENSE REASONING
                      </div>

                      <div className="mt-1 text-[11px] text-white/40">
                        The evidence tells a different story.
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {reasoningSignals.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-white/[0.05] bg-black/15 px-2.5 py-2"
                      >
                        <div className="font-mono text-[6px] tracking-[0.15em] text-white/18">
                          {item.label}
                        </div>

                        <div className="mt-1 text-[7px] font-semibold text-violet-200/55">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================================
              COMPARISON
          ======================================================== */}

          <motion.div
            style={{
              y: comparisonY,
              opacity: comparisonOpacity,
            }}
            className="relative z-20 mx-auto mt-10 grid w-full max-w-[980px] gap-4 lg:grid-cols-2 will-change-transform"
          >
            <ComparisonCard
              title="TRADITIONAL SECURITY"
              icon={<ShieldX className="h-3.5 w-3.5" />}
              muted
            >
              <div className="space-y-3">
                <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3.5 font-mono text-[9px] text-white/28">
                  Known signature?
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg border border-red-400/10 bg-red-500/[0.025] p-3 text-center font-mono text-[8px] text-red-300/40">
                    BLOCK
                  </div>

                  <div className="rounded-lg border border-emerald-400/10 bg-emerald-500/[0.02] p-3 text-center font-mono text-[8px] text-emerald-300/40">
                    ALLOW
                  </div>
                </div>
              </div>
            </ComparisonCard>

            <ComparisonCard
              title="SHIELDSENSE NEURAL ENGINE"
              icon={<Zap className="h-3.5 w-3.5" />}
              accent
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  {
                    icon: Fingerprint,
                    text: "Understand intent",
                  },
                  {
                    icon: ShieldX,
                    text: "Inspect evidence",
                  },
                  {
                    icon: AlertTriangle,
                    text: "Evaluate context",
                  },
                  {
                    icon: Lock,
                    text: "Explain reasoning",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-[9px] text-white/45"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-violet-300/60" />
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </ComparisonCard>
          </motion.div>

          {/* ========================================================
              SCROLL CUE
          ======================================================== */}

          <div className="mt-7 flex justify-center">
            <div className="flex items-center gap-2 font-mono text-[7px] tracking-[0.24em] text-white/12">
              CONTINUE DEEPER
              <ArrowDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitNode({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70 shadow-[0_0_8px_rgba(196,132,252,0.65)]" />

        <span className="font-mono text-[6px] tracking-[0.16em] text-violet-300/20">
          SIGNAL
        </span>
      </div>
    </div>
  );
}

function ComparisonCard({
  title,
  icon,
  children,
  muted = false,
  accent = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className={[
        "relative overflow-hidden rounded-[18px] border p-5",
        accent
          ? "border-violet-400/15 bg-violet-500/[0.025]"
          : "border-white/[0.055] bg-white/[0.01]",
        muted ? "opacity-65" : "",
      ].join(" ")}
    >
      {accent && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      )}

      <div
        className={[
          "mb-5 flex items-center gap-2 text-[8px] font-bold tracking-[0.18em]",
          accent ? "text-violet-300/60" : "text-white/22",
        ].join(" ")}
      >
        {icon}
        {title}
      </div>

      {children}
    </motion.div>
  );
}
