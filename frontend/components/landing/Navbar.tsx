"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ArrowUpRight, Menu, Shield, X, Zap } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const navItems = [
  { href: "/scanner", label: "Scanner" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#security", label: "Security" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        {/* Ambient purple horizon */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden">
          <motion.div
            animate={{
              opacity: scrolled ? 0.35 : 0.65,
              scaleX: [1, 1.08, 1],
            }}
            transition={{
              scaleX: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/80 to-transparent blur-[1px]"
          />
          <div className="absolute left-1/2 top-0 h-24 w-[45%] -translate-x-1/2 rounded-full bg-violet-600/[0.07] blur-3xl" />
        </div>

        {/* Main glass shell */}
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(5,5,7,0.88)" : "rgba(5,5,7,0.62)",
            borderColor: scrolled
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.055)",
          }}
          transition={{ duration: 0.25 }}
          className="relative border-b backdrop-blur-2xl"
        >
          {/* Moving scan beam */}
          <motion.div
            animate={{ x: ["-120%", "220%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute top-0 h-px w-40 bg-gradient-to-r from-transparent via-violet-400/70 to-transparent blur-[1px]"
          />

          {/* Subtle technical grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              maskImage: "linear-gradient(to bottom, black, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />

          <div
            className={`relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-[clamp(1.25rem,3vw,4rem)] transition-all duration-300 ${
              scrolled ? "h-[64px]" : "h-[78px]"
            }`}
          >
            {/* BRAND */}
            <Link
              href="/"
              onClick={closeMobile}
              className="group relative z-10 flex items-center gap-3"
            >
              <div className="relative">
                {/* Outer pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.25, 0.08, 0.25],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-[-7px] rounded-xl bg-violet-500/30 blur-md"
                />

                {/* Shield box */}
                <motion.div
                  whileHover={{
                    rotateY: 10,
                    rotateX: -6,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[10px] border border-violet-400/30 bg-violet-500/[0.08] shadow-[0_0_30px_rgba(139,92,246,0.12)]"
                >
                  {/* Inner frame */}
                  <div className="absolute inset-[5px] rounded-[5px] border border-violet-400/10" />

                  {/* Rotating light */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute h-16 w-5 bg-gradient-to-b from-transparent via-violet-400/25 to-transparent blur-sm"
                  />

                  <Shield className="relative z-10 h-[17px] w-[17px] text-violet-300" />

                  {/* Status dot */}
                  <span className="absolute right-[4px] top-[4px] h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.9)]" />
                </motion.div>
              </div>

              <div className="flex flex-col">
                <span className="text-[13px] font-bold tracking-[0.24em] text-white transition-colors duration-200 group-hover:text-violet-200">
                  SHIELDSENSE
                </span>
                <span className="mt-0.5 hidden text-[7px] font-medium tracking-[0.24em] text-white/25 sm:block">
                  THREAT INTELLIGENCE SYSTEM
                </span>
              </div>
            </Link>

            {/* CENTER NAV */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:flex">
              <div className="flex items-center rounded-full border border-white/[0.055] bg-white/[0.02] p-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                  />
                ))}
              </div>
            </nav>

            {/* RIGHT SIDE */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-4">
              {/* Network */}
              <div className="hidden items-center gap-2 xl:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.8)]" />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[7px] tracking-[0.15em] text-white/30">
                    NODE_07
                  </span>
                  <span className="font-mono text-[6px] tracking-[0.18em] text-emerald-400/60">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* System status */}
              <div className="hidden items-center gap-2.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-2 sm:flex">
                <Zap className="h-3 w-3 text-emerald-300/80" />
                <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-emerald-300/70">
                  System Ready
                </span>
              </div>

              {/* CTA Desktop */}
              <Link href="/#scanner" passHref>
                <motion.button
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group hidden h-10 items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/[0.09] px-4 text-[9px] font-bold uppercase tracking-[0.16em] text-violet-200 transition-all duration-300 hover:border-violet-300/60 hover:bg-violet-500/[0.16] hover:text-white hover:shadow-[0_0_35px_rgba(139,92,246,0.2)] md:inline-flex"
                >
                  <span>Scan Now</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/55 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:text-white lg:hidden"
              >
                <motion.div
                  animate={{ rotate: mobileOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>

          {/* TELEMETRY STRIP */}
          <div className="hidden border-t border-white/[0.035] lg:block">
            <div className="mx-auto flex h-5 max-w-[1440px] items-center justify-between px-[clamp(1.25rem,3vw,4rem)]">
              <div className="flex items-center gap-4 text-[6px] font-medium tracking-[0.22em] text-white/15">
                <span>ENCRYPTED CHANNEL</span>
                <span className="text-violet-400/30">/</span>
                <span>HEURISTIC ENGINE ACTIVE</span>
                <span className="text-violet-400/30">/</span>
                <span>THREAT MONITORING ONLINE</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[6px] tracking-[0.2em] text-violet-400/30">
                <Activity className="h-2.5 w-2.5" />
                <span>SHIELDSENSE // SECURE_LINK</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MOBILE MENU */}
        <motion.div
          initial={false}
          animate={
            mobileOpen
              ? { opacity: 1, height: "auto", pointerEvents: "auto" }
              : { opacity: 0, height: 0, pointerEvents: "none" }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-b border-white/[0.06] bg-[#050507]/95 backdrop-blur-2xl lg:hidden"
        >
          <div className="mx-auto max-w-[1440px] px-[clamp(1.25rem,3vw,4rem)] py-5">
            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={
                    mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
                  }
                  transition={{
                    delay: mobileOpen ? index * 0.06 : 0,
                    duration: 0.25,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 transition-all duration-200 hover:bg-violet-500/[0.06] hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 text-violet-400/50" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 border-t border-white/[0.05] pt-4">
              <Link href="/#scanner" onClick={closeMobile} passHref>
                <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/[0.08] text-[9px] font-bold uppercase tracking-[0.16em] text-violet-200 transition-all hover:border-violet-300/50 hover:bg-violet-500/[0.14]">
                  Scan Now
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-between text-[6px] font-mono tracking-[0.16em] text-white/15">
              <span>NODE_07 / ONLINE</span>
              <span className="text-emerald-400/50">SYSTEM READY</span>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative rounded-full px-4 py-2.5 text-[9px] font-medium tracking-[0.13em] text-white/35 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
    >
      <span className="relative z-10">{label}</span>
      {/* Hover glow */}
      <motion.span
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent"
      />
      {/* Corner signal */}
      <span className="absolute right-1.5 top-1.5 h-1 w-1 border-r border-t border-violet-400/0 transition-colors duration-300 group-hover:border-violet-400/70" />
    </Link>
  );
}
