import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import SecurityCapabilities from "../components/landing/SecurityCapabilities";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#050507]">
      <Navbar />

      <main className="relative">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <SecurityCapabilities />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
