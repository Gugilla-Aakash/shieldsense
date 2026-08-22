"use client";

import Link from "next/link";
import { Activity, ChevronDown, Menu, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Atmospheric line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Soft backdrop */}
      <div className="absolute inset-0 border-b border-white/[0.06] bg-[#050507]/75 backdrop-blur-2xl" />

      <div className="relative mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-[clamp(1.25rem,3vw,4rem)]">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 6 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-9 w-9 items-center justify-center border border-purple-400/30 bg-purple-500/[0.07]"
          >
            <div className="absolute inset-1 border border-purple-400/10" />

            <Shield className="relative z-10 h-4 w-4 text-purple-300" />

            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
          </motion.div>

          <div className="flex flex-col">
            <span className="text-[13px] font-bold tracking-[0.22em] text-white transition-colors group-hover:text-purple-200">
              SHIELDSENSE
            </span>

            <span className="mt-0.5 hidden text-[7px] tracking-[0.2em] text-white/25 sm:block">
              THREAT INTELLIGENCE SYSTEM
            </span>
          </div>
        </Link>

        {/* Center navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          <NavItem href="#product" label="Product" />
          <NavItem href="#how-it-works" label="How It Works" />
          <NavItem href="#security" label="Security" />
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* System status */}
          <div className="hidden items-center gap-3 border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            </span>

            <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/60">
                SYSTEM
              </span>

              <span className="text-[7px] uppercase tracking-[0.12em] text-emerald-400/70">
                READY
              </span>
            </div>
          </div>

          {/* Network indicator */}
          <div className="hidden items-center gap-2 text-white/20 xl:flex">
            <Activity className="h-3.5 w-3.5 text-blue-400/70" />
            <span className="font-mono text-[7px] tracking-[0.16em]">
              NODE_07 / ONLINE
            </span>
          </div>

          {/* CTA */}
          <button className="group hidden h-10 items-center gap-2 border border-purple-400/35 bg-purple-500/[0.08] px-5 text-[9px] font-bold uppercase tracking-[0.17em] text-purple-200 transition-all duration-300 hover:border-purple-300/60 hover:bg-purple-500/[0.15] hover:text-white hover:shadow-[0_0_28px_rgba(139,92,246,0.18)] md:inline-flex">
            Scan Now
            <ChevronDown className="h-3 w-3 rotate-[-90deg] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex h-10 w-10 items-center justify-center border border-white/[0.08] bg-white/[0.025] text-white/50 transition-colors hover:border-purple-400/30 hover:text-white lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom telemetry strip */}
      <div className="relative hidden h-5 border-y border-white/[0.035] bg-black/20 lg:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-[clamp(1.25rem,3vw,4rem)]">
          <div className="flex items-center gap-5 text-[6px] tracking-[0.2em] text-white/15">
            <span>ENCRYPTED CHANNEL</span>
            <span>•</span>
            <span>HEURISTIC ENGINE ACTIVE</span>
          </div>

          <div className="font-mono text-[6px] tracking-[0.2em] text-purple-400/30">
            SHIELDSENSE // SECURE_LINK
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative px-4 py-2 text-[10px] font-medium tracking-[0.13em] text-white/40 transition-colors duration-200 hover:text-white"
    >
      <span>{label}</span>

      {/* active-style technical underline */}
      <span className="absolute bottom-0 left-4 right-4 h-px origin-left scale-x-0 bg-purple-400/70 transition-transform duration-300 group-hover:scale-x-100" />

      {/* corner marker */}
      <span className="absolute right-1 top-1 h-1 w-1 border-r border-t border-purple-400/0 transition-colors duration-300 group-hover:border-purple-400/60" />
    </Link>
  );
}
