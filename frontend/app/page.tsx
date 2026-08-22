import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import SecurityCapabilities from "../components/landing/SecurityCapabilities";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col">
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
