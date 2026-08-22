import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-md">
      <div className="shield-container flex h-20 items-center justify-between">
        {/* Left: Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold tracking-[0.15em] text-[var(--text-primary)]"
        >
          <span className="text-[var(--purple-bright)] text-xl leading-none">
            ◈
          </span>
          SHIELDSENSE
        </Link>

        {/* Center: Navigation Links (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#product"
            className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            Product
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            How It Works
          </Link>
          <Link
            href="#security"
            className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            Security
          </Link>
        </nav>

        {/* Right: Status & CTA */}
        <div className="flex items-center gap-6">
          {/* System Status Indicator (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-safe)] glow-safe animate-pulse"></span>
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              System Ready
            </span>
          </div>

          {/* CTA Button */}
          <button className="hidden md:inline-flex items-center justify-center rounded-md bg-[var(--purple-primary)] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[var(--purple-bright)] glow-purple-sm">
            Scan Now
          </button>

          {/* Mobile Menu Icon (Visible only on mobile) */}
          <button className="p-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] md:hidden">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
