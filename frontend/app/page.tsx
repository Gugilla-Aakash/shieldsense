import Navbar from "../components/landing/Navbar";
// import Hero from '../components/landing/Hero';
// import ThreatDemo from '../components/landing/ThreatDemo';
// import ProblemSection from '../components/landing/ProblemSection';
// import HowItWorks from '../components/landing/HowItWorks';
// import SecurityCapabilities from '../components/landing/SecurityCapabilities';
// import FinalCTA from '../components/landing/FinalCTA';
// import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. NAVIGATION */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* 2. HERO: "Something suspicious just arrived." */}
        <section className="py-24 text-center text-[var(--text-muted)]">
          [ HERO SECTION ]
        </section>

        {/* 3. LIVE THREAT INVESTIGATION */}
        <section className="py-24 text-center text-[var(--text-muted)] bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
          [ THREAT DEMO ]
        </section>

        {/* 4. PROBLEM: "Why can't normal security catch this?" */}
        <section className="py-24 text-center text-[var(--text-muted)]">
          [ PROBLEM SECTION ]
        </section>

        {/* 5. HOW IT WORKS: Detect → Investigate → Explain → Protect */}
        <section className="py-24 text-center text-[var(--text-muted)] bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
          [ HOW IT WORKS ]
        </section>

        {/* 6. CAPABILITIES: Links / Emails / Files / Messages */}
        <section className="py-24 text-center text-[var(--text-muted)]">
          [ SECURITY CAPABILITIES ]
        </section>

        {/* 7. CTA: "Ready to investigate?" */}
        <section className="py-24 text-center text-[var(--text-muted)] bg-gradient-to-b from-transparent to-[var(--bg-tertiary)]">
          [ FINAL CTA ]
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="py-8 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)]">
        [ FOOTER ]
      </footer>
    </div>
  );
}
