import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-base)] pt-20 pb-10">
      <div className="shield-container flex flex-col">
        {/* Top Grid: Brand & Navigation */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 md:max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-3 text-base font-bold tracking-[0.15em] text-[var(--text-primary)] transition-colors hover:text-[var(--purple-light)]"
            >
              <span className="text-[var(--purple-bright)] text-lg leading-none">
                ◈
              </span>
              SHIELDSENSE
            </Link>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              AI-powered security intelligence. <br />
              Investigate, explain, and decide with confidence.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="flex gap-16 sm:gap-24">
            {/* Product Links */}
            <div className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-primary)]">
                Product
              </span>
              <div className="flex flex-col gap-3 text-xs text-[var(--text-muted)]">
                <Link
                  href="/scan"
                  className="transition-colors hover:text-[var(--purple-bright)]"
                >
                  Scan
                </Link>
                <Link
                  href="#how-it-works"
                  className="transition-colors hover:text-[var(--purple-bright)]"
                >
                  How It Works
                </Link>
                <Link
                  href="/history"
                  className="transition-colors hover:text-[var(--purple-bright)]"
                >
                  History
                </Link>
              </div>
            </div>

            {/* Security Links */}
            <div className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-primary)]">
                Security
              </span>
              <div className="flex flex-col gap-3 text-xs text-[var(--text-muted)]">
                <Link
                  href="#url-intelligence"
                  className="transition-colors hover:text-[var(--purple-bright)]"
                >
                  URL Intelligence
                </Link>
                <Link
                  href="#message-intelligence"
                  className="transition-colors hover:text-[var(--purple-bright)]"
                >
                  Message Intelligence
                </Link>
                <Link
                  href="#file-intelligence"
                  className="transition-colors hover:text-[var(--purple-bright)]"
                >
                  File Intelligence
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[var(--border-subtle)] pt-8 md:flex-row md:gap-4">
          {/* Copyright */}
          <span className="text-[0.65rem] font-medium tracking-wider text-[var(--text-muted)]">
            © 2026 ShieldSense
          </span>

          {/* Core Philosophy Line (Hidden on small mobile screens to keep it clean) */}
          <div className="hidden text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-60 sm:flex gap-4">
            <span>SECURE</span>
            <span>•</span>
            <span>EXPLAINABLE</span>
            <span>•</span>
            <span>ACTIONABLE</span>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-safe)] animate-pulse glow-safe"></span>
            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              SYSTEM READY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
