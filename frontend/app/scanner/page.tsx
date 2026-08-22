"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  Send,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import {
  scanUrl,
  scanText,
  scanFile,
  chatWithSecurityAgent,
  simulateAction,
} from "../../api/shieldsenseApi";

export default function ScannerPage() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "complete">(
    "idle",
  );
  const [activeTab, setActiveTab] = useState<"url" | "text" | "file">("url");
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Chat State
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanState("scanning");
    setError(null);
    setMessages([]);

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
      // Auto-initialize chat with a greeting based on risk level
      setMessages([
        {
          role: "assistant",
          content: `Scan complete. I detected a risk score of ${result.risk_score}/100 (${result.risk_level}). What would you like to know about this threat?`,
        },
      ]);
      setScanState("complete");
    } catch (err: any) {
      setError(err.message || "An error occurred during scan");
      setScanState("idle");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading || !scanResult) return;

    const userMsg = chatInput.trim();
    const updatedHistory = [...messages, { role: "user", content: userMsg }];
    setMessages(updatedHistory);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await chatWithSecurityAgent(
        userMsg,
        scanResult.scan_id,
        updatedHistory,
      );
      setMessages([
        ...updatedHistory,
        { role: "assistant", content: res.reply },
      ]);
    } catch (err: any) {
      setMessages([
        ...updatedHistory,
        {
          role: "assistant",
          content: "Error contacting advisor: " + err.message,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const executeAction = async (action: string) => {
    try {
      alert(`Simulating action: ${action}...`);
      await simulateAction(scanResult.scan_id, action);
      alert(`Successfully applied: ${action}`);
    } catch (e: any) {
      alert("Failed to apply action.");
    }
  };

  // Helper for the circular risk graph
  const getRiskColor = (score: number) => {
    if (score < 30) return "text-emerald-400 stroke-emerald-400";
    if (score < 60) return "text-amber-400 stroke-amber-400";
    return "text-rose-500 stroke-rose-500";
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-4 md:px-8 border-b border-slate-800/80 bg-[#050507]/80 backdrop-blur-md z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          <span className="font-bold tracking-widest text-sm text-white">
            SHIELDSENSE
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/70 border border-emerald-900/30 bg-emerald-900/10 px-3 py-1.5 rounded-full">
          <Zap className="w-3 h-3" /> ENGINE ONLINE
        </div>
      </header>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* ================= IDLE STATE ================= */}
        <AnimatePresence mode="wait">
          {scanState === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-4 max-w-3xl mx-auto w-full"
            >
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-violet-500 mx-auto mb-4 opacity-80" />
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  Deep Threat Scanner
                </h1>
                <p className="text-slate-400">
                  Deploy AI heuristics to investigate suspicious digital
                  artifacts.
                </p>
              </div>

              <div className="w-full bg-[#0b0c10] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-2">
                <div className="flex p-1 mb-2 bg-slate-900/50 rounded-xl">
                  {[
                    { id: "url", icon: LinkIcon, label: "URL" },
                    { id: "text", icon: MessageSquare, label: "Text / Email" },
                    { id: "file", icon: FileText, label: "File" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleScan} className="p-2">
                  {activeTab === "url" && (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Paste suspicious URL..."
                      className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-4 focus:outline-none focus:border-violet-500 text-lg transition"
                    />
                  )}
                  {activeTab === "text" && (
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      rows={4}
                      placeholder="Paste email or message body..."
                      className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-4 focus:outline-none focus:border-violet-500 resize-none transition"
                    />
                  )}
                  {activeTab === "file" && (
                    <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center hover:border-violet-500 transition">
                      <input
                        type="file"
                        onChange={(e) =>
                          setSelectedFile(e.target.files?.[0] || null)
                        }
                        className="mx-auto block text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-500"
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-rose-400 text-sm mt-4 text-center">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-xl bg-white text-black font-bold tracking-wide hover:bg-slate-200 transition flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" /> Initialize Scan
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ================= SCANNING STATE ================= */}
          {scanState === "scanning" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-r-2 border-violet-500 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-4 border-b-2 border-l-2 border-cyan-400 rounded-full opacity-60"
                />
                <Shield className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-xl font-mono text-violet-400 animate-pulse tracking-widest">
                ANALYZING ARTIFACT...
              </h2>
            </motion.div>
          )}

          {/* ================= RESULTS STATE ================= */}
          {scanState === "complete" && scanResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden"
            >
              {/* LEFT COLUMN: AI CHAT (Spans 4 cols) */}
              <div className="lg:col-span-4 flex flex-col bg-[#0b0c10] border border-slate-800 rounded-2xl overflow-hidden h-[85vh]">
                <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-semibold text-sm tracking-wider uppercase">
                    AI Security Advisor
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${m.role === "user" ? "bg-violet-600 text-white rounded-br-none" : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"}`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex items-center gap-2 text-slate-400 text-sm ml-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Zap className="w-3 h-3" />
                      </motion.div>
                      Analyzing context...
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="p-3 bg-slate-900/50 border-t border-slate-800 flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about this threat..."
                    className="flex-1 bg-[#050507] border border-slate-700 rounded-xl px-4 text-sm focus:outline-none focus:border-violet-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="bg-violet-600 hover:bg-violet-500 text-white p-3 rounded-xl disabled:opacity-50 transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* RIGHT COLUMN: ANALYTICS (Spans 8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto h-[85vh] pr-2 custom-scrollbar">
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Circular Risk Graph */}
                  <div className="bg-[#0b0c10] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
                    <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4">
                      Calculated Risk
                    </h3>
                    <div className="relative w-32 h-32">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-slate-800"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          initial={{ strokeDasharray: "0, 251.2" }}
                          animate={{
                            strokeDasharray: `${(scanResult.risk_score / 100) * 251.2}, 251.2`,
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          cx="50"
                          cy="50"
                          r="40"
                          className={getRiskColor(scanResult.risk_score)}
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                          className={`text-4xl font-bold ${getRiskColor(scanResult.risk_score).split(" ")[0]}`}
                        >
                          {scanResult.risk_score}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`mt-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${scanResult.risk_level === "SAFE" ? "bg-emerald-900/30 border-emerald-500/30 text-emerald-400" : "bg-rose-900/30 border-rose-500/30 text-rose-400"}`}
                    >
                      {scanResult.risk_level}
                    </span>
                  </div>

                  {/* Threat Context */}
                  <div className="md:col-span-2 bg-[#0b0c10] border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-center">
                    <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Target Analyzed
                    </h3>
                    <p className="text-lg font-mono text-slate-200 truncate mb-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                      {scanResult.target_summary}
                    </p>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">
                          Threat Classification
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {scanResult.threat_type.replace(/_/g, " ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">
                          Analysis Engine
                        </span>
                        <span className="text-sm font-semibold text-cyan-400">
                          {scanResult.model_used}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Executive Summary */}
                <div className="bg-gradient-to-r from-violet-900/20 to-transparent border border-violet-900/50 rounded-2xl p-6 shadow-lg">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-violet-300 uppercase tracking-wider mb-3">
                    <Zap className="w-4 h-4" /> AI Investigation Summary
                  </h3>
                  <p className="text-slate-200 leading-relaxed">
                    {scanResult.explanation}
                  </p>
                  <p className="text-slate-400 text-sm mt-3 pt-3 border-t border-violet-900/30 leading-relaxed">
                    {scanResult.ai_agent_reasoning}
                  </p>
                </div>

                {/* Technical Indicators */}
                <div className="bg-[#0b0c10] border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Detected Heuristics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scanResult.indicators.length === 0 ? (
                      <div className="col-span-full flex items-center gap-2 text-emerald-400 bg-emerald-900/10 p-4 rounded-xl border border-emerald-900/30">
                        <CheckCircle className="w-5 h-5" /> No malicious
                        patterns detected by heuristic engine.
                      </div>
                    ) : (
                      scanResult.indicators.map((ind: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-sm text-slate-200">
                              {ind.label}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${ind.severity === "critical" ? "bg-rose-900/50 text-rose-400 border-rose-500/30" : "bg-amber-900/50 text-amber-400 border-amber-500/30"}`}
                            >
                              {ind.severity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            {ind.description}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Action System */}
                <div className="bg-[#0b0c10] border border-slate-800 rounded-2xl p-6 shadow-lg mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Recommended Response
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    {scanResult.recommendation === "BLOCK" && (
                      <button
                        onClick={() => executeAction("BLOCK")}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition shadow-lg shadow-rose-900/20"
                      >
                        <AlertTriangle className="w-5 h-5" /> Block Connection
                      </button>
                    )}
                    {scanResult.recommendation === "WARN" && (
                      <button
                        onClick={() => executeAction("WARN")}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition"
                      >
                        <AlertTriangle className="w-5 h-5" /> Issue Security
                        Warning
                      </button>
                    )}
                    <button
                      onClick={() => executeAction("QUARANTINE")}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition border border-slate-700"
                    >
                      Quarantine Data
                    </button>
                    <button
                      onClick={() => setScanState("idle")}
                      className="ml-auto text-sm text-slate-400 hover:text-white transition underline"
                    >
                      Run New Scan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Required for custom scrollbar in Tailwind */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `,
        }}
      />
    </div>
  );
}
