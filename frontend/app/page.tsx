"use client";

import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import ProblemSection from "../components/landing/ProblemSection";
import HowItWorks from "../components/landing/HowItWorks";
import SecurityCapabilities from "../components/landing/SecurityCapabilities";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";
import InvestigationModal from "../components/InvestigationModal";
import { scanUrl, scanText, scanFile } from "../api/shieldsenseApi";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"url" | "text" | "file">("url");
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (activeTab === "url") {
        if (!inputValue.trim()) throw new Error("Please enter a URL to scan");
        result = await scanUrl(inputValue.trim());
      } else if (activeTab === "text") {
        if (!inputValue.trim())
          throw new Error("Please enter email/message text");
        result = await scanText(inputValue.trim());
      } else if (activeTab === "file") {
        if (!selectedFile) throw new Error("Please select a file to scan");
        result = await scanFile(selectedFile);
      }
      setScanResult(result);
    } catch (err: any) {
      setError(err.message || "An error occurred during scan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#050507] text-slate-100">
      <Navbar />

      <main className="relative">
        <Hero />

        {/* Live Interactive Scanner Section */}
        <section
          id="scanner"
          className="relative py-12 px-4 max-w-4xl mx-auto z-10"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Live Threat Scanner
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Test ShieldSense against suspicious URLs, emails, or files in
              real-time.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0b0c10]/90 border border-slate-800/80 p-6 shadow-2xl backdrop-blur-md">
            {/* Input Type Tabs */}
            <div className="flex border-b border-slate-800 mb-6">
              {(["url", "text", "file"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setError(null);
                  }}
                  className={`flex-1 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider transition ${
                    activeTab === tab
                      ? "border-b-2 border-cyan-400 text-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab === "url" && "🔗 URL"}
                  {tab === "text" && "📧 Email / Text"}
                  {tab === "file" && "📁 File"}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleScan} className="space-y-4">
              {activeTab === "url" && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Paste URL (e.g., http://paypa1-security-verification.com/login)"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[#050507] border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              )}

              {activeTab === "text" && (
                <textarea
                  rows={4}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Paste suspicious email or message body here..."
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[#050507] border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              )}

              {activeTab === "file" && (
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[#050507] border border-slate-800 text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 transition"
                />
              )}

              {error && (
                <div className="text-xs text-rose-400 bg-rose-950/30 p-3 rounded-lg border border-rose-800/40">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-semibold text-sm tracking-wide shadow-lg shadow-cyan-950/50 transition disabled:opacity-50"
              >
                {loading ? "ShieldSense is Investigating..." : "🛡️ Scan Threat"}
              </button>
            </form>
          </div>
        </section>

        <ProblemSection />
        <HowItWorks />
        <SecurityCapabilities />
        <FinalCTA />
      </main>

      <Footer />

      {/* Pop-up Investigation Modal */}
      {scanResult && (
        <InvestigationModal
          result={scanResult}
          onClose={() => setScanResult(null)}
        />
      )}
    </div>
  );
}
