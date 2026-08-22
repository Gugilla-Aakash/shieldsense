import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import SecurityCapabilities from "../components/landing/SecurityCapabilities";
import FinalCTA from "../components/landing/FinalCTA";
// import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. NAVIGATION */}
      <Navbar />

      <main className="flex flex-1 flex-col">
        {/* 2. HERO */}
        <Hero />

        {/* 4. PROBLEM */}
        <ProblemSection />

        {/* 5. HOW IT WORKS */}
        <HowItWorks />

        {/* 6. CAPABILITIES */}
        <SecurityCapabilities />

        {/* 7. CTA: "Ready to investigate?" */}
        <FinalCTA />
      </main>

      {/* 8. FOOTER */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs text-[var(--text-muted)]">
        [ FOOTER ]
      </footer>
    </div>
  );
}
