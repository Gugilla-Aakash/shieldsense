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
  Activity,
  ScanLine,
  Lock,
  Radar,
  Cpu,
  Sparkles,
  Crosshair,
  Terminal,
  ChevronRight,
  Database,
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

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const q = params.get("q");

    if (type === "url" || type === "text" || type === "file") {
      setActiveTab(type as "url" | "text" | "file");
    }

    if (q && (type === "url" || type === "text")) {
      setInputValue(q);
      window.history.replaceState({}, document.title, window.location.pathname);
      executeScan(type, q, null);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const executeScan = async (
    targetType: string,
    textValue: string,
    fileData: File | null,
  ) => {
    setScanState("scanning");
    setError(null);
    setMessages([]);

    try {
      let result;

      if (targetType === "url") {
        if (!textValue) throw new Error("Please enter a URL to scan");
        result = await scanUrl(textValue);
      } else if (targetType === "text") {
        if (!textValue) throw new Error("Please enter email/message text");
        result = await scanText(textValue);
      } else if (targetType === "file") {
        if (!fileData) throw new Error("Please select a file to scan");
        result = await scanFile(fileData);
      }

      setScanResult(result);

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

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    executeScan(activeTab, inputValue.trim(), selectedFile);
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
      await simulateAction(scanResult.scan_id, action);
      alert(`Successfully applied: ${action}`);
    } catch (e: any) {
      alert("Failed to apply action.");
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-emerald-400 stroke-emerald-400";
    if (score < 60) return "text-amber-400 stroke-amber-400";
    return "text-rose-500 stroke-rose-500";
  };

  const getRiskGlow = (score: number) => {
    if (score < 30) return "shadow-[0_0_80px_rgba(16,185,129,0.18)]";
    if (score < 60) return "shadow-[0_0_80px_rgba(245,158,11,0.18)]";
    return "shadow-[0_0_100px_rgba(244,63,94,0.22)]";
  };

  const tabs = [
    {
      id: "url",
      icon: LinkIcon,
      label: "URL",
      description: "Web destination",
    },
    {
      id: "text",
      icon: MessageSquare,
      label: "TEXT",
      description: "Message / email",
    },
    {
      id: "file",
      icon: FileText,
      label: "FILE",
      description: "Digital artifact",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#030305] font-sans text-slate-100 selection:bg-violet-500/25">
      {/* ========================================================= */}
      {/* ATMOSPHERE                                                */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.13),transparent_38%)]" />

        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/[0.06] blur-[140px]" />

        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -40, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[10%] top-[25%] h-64 w-64 rounded-full bg-cyan-500/[0.035] blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -100, 40, 0],
            y: [0, 50, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[45%] h-72 w-72 rounded-full bg-violet-600/[0.05] blur-[120px]"
        />

        {/* Perspective grid */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-[0.12] [perspective:700px]">
          <div
            className="absolute inset-0 [transform:rotateX(62deg)_scale(1.8)]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.22) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.22) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage: "linear-gradient(to top, black, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to top, black, transparent 90%)",
            }}
          />
        </div>

        {/* Scan line */}
        <motion.div
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* ========================================================= */}
      {/* NAVBAR                                                    */}
      {/* ========================================================= */}

      <header className="relative z-50 flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.06] bg-black/30 px-5 backdrop-blur-2xl md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ x: -3 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition group-hover:border-violet-400/30 group-hover:bg-violet-500/10"
          >
            <ArrowLeft className="h-4 w-4 text-slate-400 transition group-hover:text-white" />
          </motion.div>

          <div>
            <div className="text-[11px] font-black tracking-[0.28em] text-white">
              SHIELDSENSE
            </div>
            <div className="hidden text-[8px] font-mono tracking-[0.2em] text-slate-600 sm:block">
              THREAT INTELLIGENCE SYSTEM
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 md:flex">
            <Activity className="h-3 w-3" />
            SECURE CHANNEL
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[9px] font-mono font-bold tracking-[0.16em] text-emerald-400">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            />
            ENGINE ONLINE
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN                                                      */}
      {/* ========================================================= */}

      <main className="relative z-10 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* ===================================================== */}
          {/* IDLE                                                   */}
          {/* ===================================================== */}

          {scanState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 py-12"
            >
              {/* Hero */}
              <div className="relative mb-10 text-center">
                <motion.div
                  animate={{
                    rotate: [0, 2, -2, 0],
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative mx-auto mb-8 h-28 w-28"
                >
                  {/* Outer rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-6 rounded-full border border-violet-500/10"
                  />

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-3 rounded-full border border-dashed border-cyan-400/15"
                  />

                  <div className="absolute inset-0 rounded-[2rem] bg-violet-600/20 blur-2xl" />

                  <div className="relative flex h-full w-full items-center justify-center rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-black/70 to-cyan-500/10 shadow-[0_0_80px_rgba(124,58,237,0.2)] backdrop-blur-xl">
                    <Shield className="h-12 w-12 text-violet-300 drop-shadow-[0_0_20px_rgba(167,139,250,0.8)]" />

                    <motion.div
                      animate={{ opacity: [0.2, 0.7, 0.2] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 rounded-[2rem] border border-violet-400"
                    />
                  </div>
                </motion.div>

                <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-violet-400/70">
                  <Crosshair className="h-3 w-3" />
                  Autonomous Threat Analysis
                  <Crosshair className="h-3 w-3" />
                </div>

                <h1 className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
                  Deep{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                    Threat Scanner
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                  Deploy ShieldSense intelligence against suspicious URLs,
                  messages, and digital artifacts.
                </p>
              </div>

              {/* Scanner console */}
              <div className="relative w-full max-w-3xl">
                {/* glow */}
                <div className="absolute -inset-10 rounded-[3rem] bg-violet-600/[0.04] blur-3xl" />

                <div className="relative rounded-[2rem] border border-white/[0.08] bg-[#08090d]/80 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                  {/* top chrome */}
                  <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-400/50" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/50" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/50" />
                      </div>

                      <span className="ml-2 font-mono text-[9px] tracking-[0.18em] text-slate-600">
                        SHIELDSENSE://SCAN_NODE
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[8px] tracking-widest text-slate-600">
                      <Lock className="h-3 w-3" />
                      ENCRYPTED
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-3 gap-1 rounded-xl bg-black/30 p-1.5">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const active = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() =>
                            setActiveTab(tab.id as "url" | "text" | "file")
                          }
                          className="group relative rounded-xl px-3 py-3 text-left transition"
                        >
                          {active && (
                            <motion.div
                              layoutId="active-tab"
                              className="absolute inset-0 rounded-xl border border-violet-400/20 bg-violet-500/[0.09] shadow-[0_0_30px_rgba(124,58,237,0.1)]"
                            />
                          )}

                          <div className="relative flex items-center justify-center gap-2">
                            <Icon
                              className={`h-4 w-4 ${
                                active
                                  ? "text-violet-300"
                                  : "text-slate-600 group-hover:text-slate-400"
                              }`}
                            />

                            <div>
                              <div
                                className={`text-[10px] font-bold tracking-wider ${
                                  active
                                    ? "text-white"
                                    : "text-slate-500 group-hover:text-slate-300"
                                }`}
                              >
                                {tab.label}
                              </div>

                              <div className="hidden text-[8px] text-slate-700 sm:block">
                                {tab.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleScan} className="p-3">
                    {/* Input */}
                    {activeTab === "url" && (
                      <div className="group relative">
                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-cyan-500/0 opacity-0 blur-sm transition group-focus-within:opacity-100" />

                        <div className="relative flex items-center rounded-2xl border border-white/[0.07] bg-black/30">
                          <div className="pl-4 text-violet-400/60">
                            <LinkIcon className="h-4 w-4" />
                          </div>

                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Paste suspicious URL..."
                            className="w-full bg-transparent px-4 py-5 text-sm text-white outline-none placeholder:text-slate-700"
                          />

                          <div className="mr-4 hidden rounded-md border border-white/[0.05] px-2 py-1 font-mono text-[8px] text-slate-700 sm:block">
                            URL
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "text" && (
                      <div className="group relative">
                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-cyan-500/0 opacity-0 blur-sm transition group-focus-within:opacity-100" />

                        <textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          rows={5}
                          placeholder="Paste email or message body..."
                          className="relative w-full resize-none rounded-2xl border border-white/[0.07] bg-black/30 px-5 py-5 text-sm leading-7 text-white outline-none placeholder:text-slate-700 focus:border-violet-500/20"
                        />
                      </div>
                    )}

                    {activeTab === "file" && (
                      <label className="group relative block cursor-pointer">
                        <div className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.09] bg-black/20 transition group-hover:border-violet-400/30 group-hover:bg-violet-500/[0.02]">
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/[0.06]">
                            <FileText className="h-5 w-5 text-violet-300/70" />
                          </div>

                          <span className="text-xs font-semibold text-slate-300">
                            {selectedFile
                              ? selectedFile.name
                              : "Drop digital artifact here"}
                          </span>

                          <span className="mt-1 text-[9px] font-mono uppercase tracking-widest text-slate-700">
                            Click to browse
                          </span>

                          <input
                            type="file"
                            onChange={(e) =>
                              setSelectedFile(e.target.files?.[0] || null)
                            }
                            className="hidden"
                          />
                        </div>
                      </label>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.05] px-4 py-3 text-center text-xs text-rose-400"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.985 }}
                      type="submit"
                      className="group relative mt-3 w-full overflow-hidden rounded-2xl bg-white py-4 text-black shadow-[0_10px_40px_rgba(255,255,255,0.08)] transition"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-violet-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.18em]">
                        <ScanLine className="h-4 w-4" />
                        Initialize Scan
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </form>

                  {/* footer telemetry */}
                  <div className="flex items-center justify-between px-4 pb-3 pt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-slate-700">
                    <span>HEURISTIC ENGINE READY</span>
                    <span>AI / RULE / CONTEXT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================== */}
          {/* SCANNING                                                */}
          {/* ===================================================== */}

          {scanState === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex min-h-[calc(100vh-72px)] flex-col items-center justify-center"
            >
              <div className="relative h-64 w-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-violet-400/20 border-t-violet-300"
                />

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                  }}
                  className="absolute inset-8 rounded-full border border-cyan-400/20 border-b-cyan-300 border-l-cyan-300"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-16 rounded-full bg-violet-500/10 blur-2xl"
                />

                <div className="absolute inset-20 flex items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/[0.05]">
                  <Shield className="h-8 w-8 text-violet-300 drop-shadow-[0_0_20px_rgba(167,139,250,0.8)]" />
                </div>

                {/* radar sweep */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-gradient-to-t from-violet-400/80 to-transparent"
                />
              </div>

              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-10 flex items-center gap-3"
              >
                <Radar className="h-4 w-4 text-violet-400" />

                <span className="font-mono text-xs font-bold tracking-[0.3em] text-violet-300">
                  ANALYZING ARTIFACT
                </span>

                <span className="flex gap-1">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-violet-400" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-violet-400 [animation-delay:100ms]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-violet-400 [animation-delay:200ms]" />
                </span>
              </motion.div>

              <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-700">
                Correlating threat intelligence
              </div>
            </motion.div>
          )}

          {/* ===================================================== */}
          {/* RESULTS                                                 */}
          {/* ===================================================== */}

          {scanState === "complete" && scanResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto grid h-[calc(100vh-72px)] w-full max-w-[1700px] grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-12 lg:p-5"
            >
              {/* ================================================= */}
              {/* AI ADVISOR                                        */}
              {/* ================================================= */}

              <div className="relative flex min-h-[500px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#08090d]/80 shadow-2xl backdrop-blur-2xl lg:col-span-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.10),transparent_35%)]" />

                <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.07]">
                      <Cpu className="h-4 w-4 text-violet-300" />

                      <motion.div
                        animate={{ opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-xl border border-violet-400/40"
                      />
                    </div>

                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white">
                        AI Security Advisor
                      </h3>

                      <div className="mt-1 flex items-center gap-2 text-[8px] font-mono uppercase tracking-widest text-emerald-400/70">
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        Context linked
                      </div>
                    </div>
                  </div>

                  <Terminal className="h-4 w-4 text-slate-700" />
                </div>

                <div className="relative flex-1 overflow-y-auto p-5 custom-scrollbar">
                  <div className="space-y-5">
                    {messages.map((m, i) => (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                          x: m.role === "user" ? 10 : -10,
                        }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.3 }}
                        key={i}
                        className={`flex flex-col ${
                          m.role === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div className="mb-1 px-1 text-[7px] font-mono uppercase tracking-widest text-slate-700">
                          {m.role === "user" ? "OPERATOR" : "SHIELDSENSE AI"}
                        </div>

                        <div
                          className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-6 ${
                            m.role === "user"
                              ? "rounded-br-sm border border-violet-400/20 bg-violet-500/15 text-violet-50"
                              : "rounded-bl-sm border border-white/[0.06] bg-white/[0.025] text-slate-300"
                          }`}
                        >
                          {m.content}
                        </div>
                      </motion.div>
                    ))}

                    {chatLoading && (
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <Sparkles className="h-3 w-3 text-violet-400" />
                        </motion.div>

                        <span className="font-mono text-[9px] uppercase tracking-widest">
                          Analyzing context...
                        </span>
                      </div>
                    )}

                    <div ref={chatEndRef} />
                  </div>
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="relative border-t border-white/[0.06] bg-black/20 p-3"
                >
                  <div className="flex gap-2 rounded-xl border border-white/[0.07] bg-black/30 p-1.5">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about this threat..."
                      className="min-w-0 flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-slate-700"
                    />

                    <button
                      type="submit"
                      disabled={chatLoading || !chatInput.trim()}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white shadow-[0_0_25px_rgba(124,58,237,0.2)] transition hover:bg-violet-500 disabled:opacity-30"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* ================================================= */}
              {/* ANALYTICS                                          */}
              {/* ================================================= */}

              <div className="lg:col-span-8 h-full overflow-y-auto pr-1 custom-scrollbar">
                <div className="space-y-4 pb-5">
                  {/* Top stats */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Risk */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className={`relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#08090d]/80 p-6 backdrop-blur-2xl ${getRiskGlow(
                        scanResult.risk_score,
                      )}`}
                    >
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.06] blur-3xl" />

                      <div className="relative flex items-center justify-between">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                            Calculated Risk
                          </div>
                          <div className="mt-1 text-[8px] font-mono uppercase tracking-widest text-slate-700">
                            Threat probability
                          </div>
                        </div>

                        <Activity className="h-4 w-4 text-slate-700" />
                      </div>

                      <div className="relative mx-auto mt-5 h-36 w-36">
                        <svg
                          className="h-full w-full -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="stroke-white/[0.05]"
                            strokeWidth="7"
                            fill="none"
                          />

                          <motion.circle
                            initial={{
                              strokeDasharray: "0, 251.2",
                            }}
                            animate={{
                              strokeDasharray: `${
                                (scanResult.risk_score / 100) * 251.2
                              }, 251.2`,
                            }}
                            transition={{
                              duration: 1.8,
                              ease: "easeOut",
                            }}
                            cx="50"
                            cy="50"
                            r="40"
                            className={getRiskColor(scanResult.risk_score)}
                            strokeWidth="7"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span
                            className={`text-4xl font-black tracking-tight ${
                              getRiskColor(scanResult.risk_score).split(" ")[0]
                            }`}
                          >
                            {scanResult.risk_score}
                          </span>

                          <span className="text-[8px] font-mono uppercase tracking-widest text-slate-700">
                            / 100
                          </span>
                        </div>
                      </div>

                      <div className="relative mt-3 flex justify-center">
                        <span
                          className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.18em] ${
                            scanResult.risk_level === "SAFE"
                              ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
                              : "border-rose-400/20 bg-rose-400/[0.06] text-rose-400"
                          }`}
                        >
                          {scanResult.risk_level}
                        </span>
                      </div>
                    </motion.div>

                    {/* Target */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#08090d]/80 p-6 backdrop-blur-2xl md:col-span-2"
                    >
                      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-500/[0.035] blur-3xl" />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                              Target Analyzed
                            </div>

                            <div className="mt-1 text-[8px] font-mono uppercase tracking-widest text-slate-700">
                              Artifact intelligence
                            </div>
                          </div>

                          <Database className="h-4 w-4 text-slate-700" />
                        </div>

                        <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3">
                          <p className="truncate font-mono text-xs text-slate-300">
                            {scanResult.target_summary}
                          </p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-5">
                          <div>
                            <span className="text-[8px] font-mono uppercase tracking-widest text-slate-700">
                              Threat classification
                            </span>

                            <div className="mt-2 text-xs font-bold capitalize text-white">
                              {scanResult.threat_type.replace(/_/g, " ")}
                            </div>
                          </div>

                          <div>
                            <span className="text-[8px] font-mono uppercase tracking-widest text-slate-700">
                              Analysis engine
                            </span>

                            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-cyan-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                              {scanResult.model_used}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* AI Summary */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="relative overflow-hidden rounded-[1.75rem] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.09] via-[#08090d]/90 to-cyan-500/[0.025] p-6 backdrop-blur-2xl"
                  >
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/[0.08] blur-3xl" />

                    <div className="relative">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08]">
                            <Sparkles className="h-4 w-4 text-violet-300" />
                          </div>

                          <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-200">
                              AI Investigation Summary
                            </h3>

                            <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-violet-400/40">
                              Machine-generated intelligence
                            </div>
                          </div>
                        </div>

                        <Zap className="h-4 w-4 text-violet-400/40" />
                      </div>

                      <p className="text-sm leading-7 text-slate-200">
                        {scanResult.explanation}
                      </p>

                      <div className="mt-5 border-t border-violet-400/[0.08] pt-5">
                        <p className="text-xs leading-6 text-slate-500">
                          {scanResult.ai_agent_reasoning}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Indicators */}
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#08090d]/80 p-6 backdrop-blur-2xl">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                          Detected Heuristics
                        </h3>

                        <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-slate-700">
                          Pattern analysis matrix
                        </div>
                      </div>

                      <ScanLine className="h-4 w-4 text-slate-700" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {scanResult.indicators.length === 0 ? (
                        <div className="col-span-full flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4 text-xs text-emerald-400">
                          <CheckCircle className="h-5 w-5" />
                          No malicious patterns detected by heuristic engine.
                        </div>
                      ) : (
                        scanResult.indicators.map((ind: any, idx: number) => (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: idx * 0.05,
                            }}
                            whileHover={{ y: -2 }}
                            key={idx}
                            className="group rounded-xl border border-white/[0.06] bg-black/20 p-4 transition hover:border-violet-400/10 hover:bg-violet-500/[0.025]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-xs font-bold text-slate-200">
                                {ind.label}
                              </span>

                              <span
                                className={`shrink-0 rounded border px-2 py-0.5 text-[7px] font-black uppercase tracking-widest ${
                                  ind.severity === "critical"
                                    ? "border-rose-400/20 bg-rose-400/[0.05] text-rose-400"
                                    : "border-amber-400/20 bg-amber-400/[0.05] text-amber-400"
                                }`}
                              >
                                {ind.severity}
                              </span>
                            </div>

                            <p className="mt-3 text-[11px] leading-5 text-slate-600 group-hover:text-slate-500">
                              {ind.description}
                            </p>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#08090d]/80 p-6 backdrop-blur-2xl">
                    <div className="mb-5">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        Recommended Response
                      </h3>

                      <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-slate-700">
                        Execute security protocol
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {scanResult.recommendation === "BLOCK" && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => executeAction("BLOCK")}
                          className="rounded-xl border border-rose-400/20 bg-rose-500/10 px-5 py-3 text-xs font-black text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.08)] transition hover:bg-rose-500/20"
                        >
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Block Connection
                          </span>
                        </motion.button>
                      )}

                      {scanResult.recommendation === "WARN" && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => executeAction("WARN")}
                          className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-5 py-3 text-xs font-black text-amber-300 transition hover:bg-amber-500/20"
                        >
                          <span className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Issue Security Warning
                          </span>
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => executeAction("QUARANTINE")}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-5 py-3 text-xs font-bold text-slate-300 transition hover:border-violet-400/20 hover:bg-violet-500/[0.06]"
                      >
                        Quarantine Data
                      </motion.button>

                      <button
                        onClick={() => setScanState("idle")}
                        className="ml-auto flex items-center gap-2 rounded-xl px-3 py-3 text-[9px] font-bold uppercase tracking-widest text-slate-600 transition hover:text-white"
                      >
                        New Scan
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ========================================================= */}
      {/* GLOBAL SCROLLBAR                                          */}
      {/* ========================================================= */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 5px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(139, 92, 246, 0.16);
              border-radius: 999px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(139, 92, 246, 0.32);
            }

            ::selection {
              background: rgba(139, 92, 246, 0.25);
            }
          `,
        }}
      />
    </div>
  );
}
