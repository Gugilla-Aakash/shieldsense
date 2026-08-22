import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bg-base pt-20 pb-10">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-primary/50 to-transparent opacity-50" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 lg:px-8">
        {/* Top Grid: Brand & Navigation */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 md:max-w-xs">
            <Link
              href="/"
              className="group flex items-center gap-3 text-base font-bold tracking-[0.15em] text-white transition-colors hover:text-purple-bright"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-primary/30 bg-purple-primary/10 text-purple-bright shadow-[0_0_10px_rgba(139,92,246,0.2)] transition-all group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <span className="text-lg leading-none">◈</span>
              </div>
              SHIELDSENSE
            </Link>
            <p className="text-xs leading-relaxed text-text-muted">
              AI-powered security intelligence. <br />
              Investigate, explain, and decide with confidence.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="flex gap-16 sm:gap-24">
            {/* Product Links */}
            <div className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
                Product
              </span>
              <div className="flex flex-col gap-3 text-xs text-text-muted">
                <Link
                  href="/scan"
                  className="transition-colors hover:text-purple-bright"
                >
                  Scan
                </Link>
                <Link
                  href="#how-it-works"
                  className="transition-colors hover:text-purple-bright"
                >
                  How It Works
                </Link>
                <Link
                  href="/history"
                  className="transition-colors hover:text-purple-bright"
                >
                  History
                </Link>
              </div>
            </div>

            {/* Security Links */}
            <div className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
                Security
              </span>
              <div className="flex flex-col gap-3 text-xs text-text-muted">
                <Link
                  href="#url-intelligence"
                  className="transition-colors hover:text-purple-bright"
                >
                  URL Intelligence
                </Link>
                <Link
                  href="#message-intelligence"
                  className="transition-colors hover:text-purple-bright"
                >
                  Message Intelligence
                </Link>
                <Link
                  href="#file-intelligence"
                  className="transition-colors hover:text-purple-bright"
                >
                  File Intelligence
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:gap-4">
          {/* Copyright */}
          <span className="text-[0.65rem] font-medium tracking-wider text-text-muted">
            © 2026 ShieldSense
          </span>

          {/* Core Philosophy Line */}
          <div className="hidden text-[0.55rem] font-bold uppercase tracking-[0.25em] text-text-muted opacity-60 sm:flex gap-4">
            <span className="hover:text-white transition-colors cursor-default">
              SECURE
            </span>
            <span className="text-purple-primary/50">•</span>
            <span className="hover:text-white transition-colors cursor-default">
              EXPLAINABLE
            </span>
            <span className="text-purple-primary/50">•</span>
            <span className="hover:text-white transition-colors cursor-default">
              ACTIONABLE
            </span>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-text-secondary">
              SYSTEM READY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
