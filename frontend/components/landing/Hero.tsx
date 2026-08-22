"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Shield,
  Zap,
  Lock,
  ChevronRight,
  ArrowUpRight,
  ScanLine,
} from "lucide-react";
import ThreatDemo from "./ThreatDemo";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 90,
    damping: 18,
    mass: 0.5,
  });

  const springY = useSpring(mouseY, {
    stiffness: 90,
    damping: 18,
    mass: 0.5,
  });

  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      const normalizedX = (x - 0.5) * 2;
      const normalizedY = (y - 0.5) * 2;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);

      setMouse({
        x: normalizedX,
        y: normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-[1500px] items-center px-6 pb-20 pt-28 sm:px-8 lg:px-12 xl:px-16"
      style={{ perspective: "1400px" }}
    >
      {/* ============================================================
          BACKGROUND ATMOSPHERE
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main purple atmosphere */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.34, 0.48, 0.34],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[62%] top-[36%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.10] blur-[140px]"
        />

        {/* Secondary atmosphere */}
        <motion.div
          animate={{
            x: [-20, 25, -20],
            y: [10, -15, 10],
            opacity: [0.16, 0.25, 0.16],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[10%] top-[65%] h-[380px] w-[380px] rounded-full bg-purple-700/[0.08] blur-[120px]"
        />

        {/* Top glow horizon */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139,92,246,0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.11) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 65% 46%, black 10%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 70% at 65% 46%, black 10%, transparent 75%)",
          }}
        />

        {/* Horizontal scan lines */}
        <motion.div
          animate={{
            y: ["-10%", "110%"],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-transparent via-violet-400/[0.035] to-transparent"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,7,0.65)_88%)]" />
      </div>

      {/* ============================================================
          HERO CONTENT
      ============================================================ */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1500px] items-center px-6 pb-20 pt-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
          {/* ========================================================
              LEFT — STORY
          ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20 flex max-w-2xl flex-col"
          >
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/60" />
                <span className="relative h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
              </span>

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300/80">
                AI THREAT INTELLIGENCE // ACTIVE
              </span>

              <span className="hidden h-px w-10 bg-gradient-to-r from-violet-400/40 to-transparent sm:block" />
            </motion.div>

            {/* Heading */}
            <h1 className="max-w-[760px] text-[3.7rem] font-black leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.7rem]">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="block"
              >
                Don&apos;t just know
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.7 }}
                className="block text-white/[0.28]"
              >
                it&apos;s dangerous.
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="mt-5 block bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
              >
                KNOW WHY.
              </motion.span>
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-8 h-px max-w-[480px] bg-gradient-to-r from-violet-400/40 via-white/[0.08] to-transparent"
            />

            {/* Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-7 max-w-xl text-[15px] leading-7 text-white/45 sm:text-base sm:leading-8"
            >
              ShieldSense reverse-engineers suspicious links, files, and emails
              before they become incidents — exposing the signals, reasoning,
              and evidence behind every threat verdict.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href="/scanner">
                <motion.button
                  whileHover={{
                    y: -2,
                    scale: 1.015,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-[10px] border border-violet-400/40 bg-violet-500 px-6 text-sm font-semibold text-white shadow-[0_0_36px_rgba(139,92,246,0.22)] transition-all duration-300 hover:border-violet-300 hover:bg-violet-500/90 hover:shadow-[0_0_55px_rgba(139,92,246,0.35)]"
                >
                  <motion.span
                    animate={{ x: ["-120%", "130%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  />

                  <span className="relative z-10">Start Investigation</span>
                  <ChevronRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <Link href="/scanner">
                <motion.button
                  whileHover={{ x: 3 }}
                  className="group inline-flex h-12 items-center gap-2 rounded-[10px] px-4 text-sm font-medium text-white/40 transition-colors duration-300 hover:text-white"
                >
                  View live analysis
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Capability rail */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-10 border-t border-white/[0.07] pt-6"
            >
              <div className="flex flex-wrap gap-x-7 gap-y-4">
                <Capability
                  icon={<Shield className="h-3.5 w-3.5" />}
                  label="Heuristic Analysis"
                />
                <Capability
                  icon={<Zap className="h-3.5 w-3.5" />}
                  label="Neural Reasoning"
                />
                <Capability
                  icon={<Lock className="h-3.5 w-3.5" />}
                  label="Encrypted Pipeline"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================================
              RIGHT — 3D THREAT ENVIRONMENT
          ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 42, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex min-h-[560px] items-center justify-center lg:min-h-[650px] lg:justify-end"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
              }}
              className="relative flex w-full max-w-[720px] items-center justify-center"
            >
              {/* Outer atmospheric field */}
              <motion.div
                animate={{
                  scale: [0.98, 1.04, 0.98],
                  opacity: [0.26, 0.36, 0.26],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[530px] w-[530px] rounded-full bg-violet-600/[0.06] blur-[100px]"
              />

              {/* Giant orbital ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 26,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute h-[600px] w-[600px] rounded-full border border-violet-400/[0.09]"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_18px_rgba(196,132,252,0.9)]" />
              </motion.div>

              {/* Counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute h-[470px] w-[470px] rounded-full border border-fuchsia-400/[0.08]"
              >
                <span className="absolute right-[7%] top-1/2 h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_15px_rgba(232,121,249,0.9)]" />
              </motion.div>

              {/* Tilted orbital ring */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute h-[390px] w-[540px] rounded-full border border-violet-500/[0.08]"
                style={{
                  transform: "rotateX(68deg) rotateZ(24deg)",
                }}
              />

              {/* Central 3D threat core */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Core glow */}
                <motion.div
                  animate={{
                    scale: [0.92, 1.08, 0.92],
                    opacity: [0.35, 0.6, 0.35],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[90px]"
                />

                {/* Hex shell */}
                <div
                  className="relative h-[340px] w-[340px] sm:h-[390px] sm:w-[390px]"
                  style={{
                    transform: `rotateX(${mouse.y * -4}deg) rotateY(${mouse.x * 5}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Back plate */}
                  <div className="absolute inset-[12%] rotate-45 rounded-[38px] border border-violet-400/[0.07] bg-violet-400/[0.015] shadow-[inset_0_0_80px_rgba(139,92,246,0.04)]" />

                  {/* Shield silhouette */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2"
                  >
                    <div
                      className="absolute inset-0 border border-violet-300/20 bg-gradient-to-br from-violet-500/[0.09] via-transparent to-fuchsia-500/[0.05]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 90% 18%, 90% 58%, 78% 78%, 50% 100%, 22% 78%, 10% 58%, 10% 18%)",
                      }}
                    />

                    <div
                      className="absolute inset-[9px] border border-violet-300/[0.10]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 90% 18%, 90% 58%, 78% 78%, 50% 100%, 22% 78%, 10% 58%, 10% 18%)",
                      }}
                    />

                    <div
                      className="absolute inset-[22px] border border-fuchsia-300/[0.08]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 90% 18%, 90% 58%, 78% 78%, 50% 100%, 22% 78%, 10% 58%, 10% 18%)",
                      }}
                    />
                  </motion.div>

                  {/* Core */}
                  <motion.div
                    animate={{
                      scale: [0.94, 1.06, 0.94],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/30 bg-violet-400/[0.06] shadow-[0_0_65px_rgba(139,92,246,0.22)]"
                  >
                    <div className="absolute inset-4 rounded-full border border-violet-300/20" />
                    <div className="absolute inset-8 rounded-full bg-violet-300 shadow-[0_0_30px_rgba(196,132,252,0.95),0_0_80px_rgba(139,92,246,0.45)]" />
                  </motion.div>

                  {/* Scan line */}
                  <motion.div
                    animate={{
                      y: [-145, 145],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 top-1/2 h-px w-[250px] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-300/80 to-transparent shadow-[0_0_14px_rgba(168,85,247,0.8)]"
                  />

                  {/* Threat nodes */}
                  <ThreatNode
                    className="left-[9%] top-[28%]"
                    delay={0}
                    label="SIGNAL"
                  />
                  <ThreatNode
                    className="right-[5%] top-[40%]"
                    delay={0.9}
                    label="ANALYSIS"
                  />
                  <ThreatNode
                    className="bottom-[20%] left-[24%]"
                    delay={1.8}
                    label="EVIDENCE"
                  />
                  <ThreatNode
                    className="bottom-[13%] right-[18%]"
                    delay={2.5}
                    label="VERDICT"
                  />
                </div>
              </motion.div>

              {/* Product analysis panel */}
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 left-1/2 z-30 w-[88%] max-w-[640px] -translate-x-1/2"
              >
                <div className="rounded-2xl border border-white/[0.08] bg-[#09090f]/85 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                  <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] px-2 pb-3">
                    <div className="flex items-center gap-2">
                      <ScanLine className="h-3.5 w-3.5 text-violet-300" />
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
                        LIVE THREAT ANALYSIS
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-emerald-300/60">
                        STREAMING
                      </span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl">
                    <ThreatDemo />
                  </div>
                </div>
              </motion.div>

              {/* Telemetry */}
              <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 xl:block">
                <Telemetry
                  side="left"
                  top="17%"
                  label="THREAT VECTOR"
                  value="ACTIVE"
                />
                <Telemetry
                  side="left"
                  top="68%"
                  label="SIGNAL DENSITY"
                  value="HIGH"
                />
              </div>

              <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 xl:block">
                <Telemetry
                  side="right"
                  top="24%"
                  label="ENGINE"
                  value="READY"
                />
                <Telemetry
                  side="right"
                  top="73%"
                  label="EVIDENCE"
                  value="VERIFIED"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM SCROLL SIGNAL
      ============================================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{
            y: [0, 7, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[7px] tracking-[0.3em] text-white/25">
            SCROLL TO EXPLORE
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-violet-400/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom atmospheric border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/15 to-transparent" />
    </section>
  );
}

/* ================================================================
   SMALL COMPONENTS
================================================================ */

function Capability({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
      <span className="text-violet-400">{icon}</span>
      {label}
    </span>
  );
}

function ThreatNode({
  className,
  delay,
  label,
}: {
  className: string;
  delay: number;
  label: string;
}) {
  return (
    <motion.div
      animate={{
        y: [-4, 4, -4],
        opacity: [0.45, 1, 0.45],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/40" />
          <span className="relative h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(196,132,252,0.9)]" />
        </span>

        <span className="font-mono text-[6px] tracking-[0.2em] text-violet-200/35">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function Telemetry({
  label,
  value,
  side,
  top,
}: {
  label: string;
  value: string;
  side: "left" | "right";
  top: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className={`absolute ${side === "left" ? "right-0" : "left-0"}`}
      style={{ top }}
    >
      <div
        className={`flex items-center gap-2 ${
          side === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[6px] tracking-[0.2em] text-white/20">
            {label}
          </span>
          <span className="font-mono text-[7px] font-semibold tracking-[0.16em] text-violet-300/50">
            {value}
          </span>
        </div>
        <div className="h-px w-8 bg-gradient-to-r from-violet-400/30 to-transparent" />
      </div>
    </motion.div>
  );
}
