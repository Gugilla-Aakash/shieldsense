import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
// import SecurityCapabilities from '../components/landing/SecurityCapabilities';
// import FinalCTA from '../components/landing/FinalCTA';
// import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. NAVIGATION */}
      <Navbar />

      <main className="flex flex-1 flex-col">
        {/* 2. HERO: "Something suspicious just arrived." */}
        <Hero />

        {/* 4. PROBLEM: "Why can't normal security catch this?" */}
        <ProblemSection />

        {/* 5. HOW IT WORKS: Detect → Investigate → Explain → Protect */}
        <HowItWorks />

        {/* 6. CAPABILITIES: Links / Emails / Files / Messages */}
        <section className="py-24 text-center text-[var(--text-muted)]">
          [ SECURITY CAPABILITIES ]
        </section>

        {/* 7. CTA: "Ready to investigate?" */}
        <section className="bg-gradient-to-b from-transparent to-[var(--bg-tertiary)] py-24 text-center text-[var(--text-muted)]">
          [ FINAL CTA ]
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs text-[var(--text-muted)]">
        [ FOOTER ]
      </footer>
    </div>
  );
}
