"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Database,
  History,
  RefreshCw,
  ScanLine,
  Shield,
  ShieldAlert,
  Terminal,
  Zap,
} from "lucide-react";

import { getScanHistory } from "../../api/shieldsenseApi";
import RiskBadge from "../../components/RiskBadge";

export default function DashboardPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getScanHistory(50);
      setHistory(data);
    } catch (err: any) {
      setError(err.message || "Failed to load scan history");
    } finally {
      setLoading(false);
    }
  };

  const totalScans = history.length;

  const safeScans = history.filter((s) => s.risk_level === "SAFE").length;

  const threatsDetected = history.filter(
    (s) => s.risk_level === "DANGEROUS" || s.risk_level === "SUSPICIOUS",
  ).length;

  const threatRate =
    totalScans > 0 ? Math.round((threatsDetected / totalScans) * 100) : 0;

  return (
    <div className="min-h-screen overflow-hidden bg-[#030305] font-sans text-slate-100 selection:bg-violet-500/25">
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-220px] h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-violet-700/[0.055] blur-[150px]" />

        <motion.div
          animate={{
            x: [0, 45, -20, 0],
            y: [0, -25, 35, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-5%] top-[30%] h-80 w-80 rounded-full bg-cyan-500/[0.018] blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 25, -20, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-5%] top-[48%] h-96 w-96 rounded-full bg-violet-600/[0.025] blur-[140px]"
        />

        {/* Subtle grid */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] opacity-[0.055] [perspective:900px]">
          <div
            className="absolute inset-0 [transform:rotateX(64deg)_scale(1.7)]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139,92,246,0.18) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139,92,246,0.18) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
              maskImage: "linear-gradient(to top, black, transparent 88%)",
              WebkitMaskImage:
                "linear-gradient(to top, black, transparent 88%)",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.58)_100%)]" />
      </div>

      {/* ============================================================
          NAVBAR
      ============================================================ */}

      <header className="relative z-20 border-b border-white/[0.055] bg-black/20 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.div
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition-colors hover:border-violet-400/20 hover:bg-violet-500/[0.05] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.div>
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-extrabold tracking-[0.18em] text-white">
                  SHIELDSENSE
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              </div>

              <div className="mt-0.5 text-[11px] text-slate-600">
                Threat intelligence dashboard
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs text-slate-700 sm:flex">
              <Database className="h-3.5 w-3.5" />
              Secure data channel
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-1.5 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              System online
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <main className="relative z-10">
        <div className="mx-auto max-w-7xl space-y-6 px-5 py-8 md:px-8 md:py-10">
          {/* ======================================================
              HERO
          ====================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#07080c]/75 p-6 backdrop-blur-2xl md:p-8"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/[0.05] blur-[100px]" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-violet-300/65">
                  <ScanLine className="h-4 w-4" />
                  Security operations center
                </div>

                <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">
                  Security{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
                  Monitor your digital threat investigations, analyze historical
                  scan activity, and track your security posture.
                </p>
              </div>

              <Link href="/scanner">
                <motion.div
                  whileHover={{
                    y: -2,
                    scale: 1.01,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                  }}
                  className="group inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/[0.065] px-5 py-3.5 text-sm font-semibold text-violet-100 shadow-[0_0_30px_rgba(139,92,246,0.06)] transition-colors hover:bg-violet-500/[0.09]"
                >
                  <Zap className="h-4 w-4" />

                  <span>New Investigation</span>

                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </motion.div>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.05] pt-4 text-[10px] text-slate-700">
              <span className="flex items-center gap-2">
                <Activity className="h-3 w-3" />
                Live threat telemetry
              </span>

              <span>Global node</span>

              <span>ShieldSense AI engine</span>
            </div>
          </motion.section>

          {/* ======================================================
              STATS
          ====================================================== */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard
              index={0}
              label="Total scans"
              description="Investigation volume"
              value={loading ? "-" : totalScans}
              icon={<ScanLine className="h-5 w-5" />}
              tone="violet"
            />

            <StatCard
              index={1}
              label="Threats detected"
              description={`${threatRate}% of total activity`}
              value={loading ? "-" : threatsDetected}
              icon={<ShieldAlert className="h-5 w-5" />}
              tone="rose"
            />

            <StatCard
              index={2}
              label="Safe items"
              description="No malicious indicators"
              value={loading ? "-" : safeScans}
              icon={<CheckCircle2 className="h-5 w-5" />}
              tone="emerald"
            />
          </div>

          {/* ======================================================
              ACTIVITY
          ====================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#07080c]/80 backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/[0.03] blur-3xl" />

            {/* Header */}
            <div className="relative flex flex-col gap-4 border-b border-white/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/12 bg-violet-500/[0.04]">
                  <History className="h-5 w-5 text-violet-300/70" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-white">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-sm text-slate-600">
                    Historical threat investigations
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={fetchHistory}
                disabled={loading}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 28,
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-violet-400/15 hover:bg-violet-500/[0.035] hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </motion.button>
            </div>

            {/* Content */}
            <div className="relative overflow-x-auto">
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState error={error} onRetry={fetchHistory} />
              ) : history.length === 0 ? (
                <EmptyState />
              ) : (
                <table className="w-full min-w-[850px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/[0.045] bg-white/[0.01]">
                      <th className="px-5 py-4 text-xs font-medium text-slate-600">
                        Time
                      </th>

                      <th className="px-5 py-4 text-xs font-medium text-slate-600">
                        Type
                      </th>

                      <th className="px-5 py-4 text-xs font-medium text-slate-600">
                        Target
                      </th>

                      <th className="px-5 py-4 text-xs font-medium text-slate-600">
                        Risk
                      </th>

                      <th className="px-5 py-4 text-xs font-medium text-slate-600">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <AnimatePresence initial={false}>
                      {history.map((scan, index) => (
                        <motion.tr
                          key={scan.scan_id}
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            delay: Math.min(index * 0.025, 0.25),
                          }}
                          className="group border-b border-white/[0.035] transition-colors hover:bg-violet-500/[0.018]"
                        >
                          <td className="whitespace-nowrap px-5 py-5">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-violet-400/30 transition group-hover:bg-violet-400" />

                              {new Date(scan.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>

                          <td className="px-5 py-5">
                            <span className="text-sm font-medium uppercase tracking-wide text-slate-400">
                              {scan.input_type}
                            </span>
                          </td>

                          <td className="max-w-[340px] px-5 py-5">
                            <div className="truncate text-sm text-slate-300 transition-colors group-hover:text-white">
                              {scan.target_summary}
                            </div>

                            <div className="mt-1 text-xs text-slate-700">
                              Scan {String(scan.scan_id).slice(0, 12)}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-5 py-5">
                            <RiskBadge
                              level={scan.risk_level}
                              score={scan.risk_score}
                            />
                          </td>

                          <td className="px-5 py-5">
                            {scan.action_taken ? (
                              <span className="inline-flex items-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-xs font-medium text-slate-400">
                                {scan.action_taken}
                              </span>
                            ) : (
                              <span className="text-sm text-slate-700">
                                None
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>

            {!loading && !error && history.length > 0 && (
              <div className="flex items-center justify-between border-t border-white/[0.04] px-5 py-4 text-xs text-slate-700">
                <span>
                  {history.length} record
                  {history.length === 1 ? "" : "s"} loaded
                </span>

                <span className="flex items-center gap-2">
                  <Activity className="h-3 w-3" />
                  Live dataset
                </span>
              </div>
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
}

/* ================================================================
   STAT CARD
================================================================ */

function StatCard({ label, description, value, icon, tone, index }) {
  const themes = {
    violet: {
      border: "border-violet-400/10",
      iconBg: "bg-violet-500/[0.06]",
      iconBorder: "border-violet-400/15",
      iconText: "text-violet-300",
      glow: "bg-violet-500/[0.045]",
      value: "text-white",
    },

    rose: {
      border: "border-rose-400/10",
      iconBg: "bg-rose-500/[0.05]",
      iconBorder: "border-rose-400/15",
      iconText: "text-rose-300",
      glow: "bg-rose-500/[0.035]",
      value: "text-rose-300",
    },

    emerald: {
      border: "border-emerald-400/10",
      iconBg: "bg-emerald-500/[0.05]",
      iconBorder: "border-emerald-400/15",
      iconText: "text-emerald-300",
      glow: "bg-emerald-500/[0.035]",
      value: "text-emerald-300",
    },
  };

  const theme = themes[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.08 + index * 0.07,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-[1.75rem] border bg-[#07080c]/80 p-5 backdrop-blur-2xl ${theme.border}`}
    >
      <div
        className={`pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full blur-3xl ${theme.glow}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-400">{label}</div>

            <div className="mt-1 text-xs text-slate-700">{description}</div>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${theme.iconBg} ${theme.iconBorder} ${theme.iconText}`}
          >
            {icon}
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between">
          <div
            className={`text-4xl font-extrabold tracking-tight ${theme.value}`}
          >
            {value}
          </div>

          <span className="text-xs text-slate-700">Live</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   LOADING
================================================================ */

function LoadingState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 border-t-violet-400 bg-violet-500/[0.035]"
      >
        <RefreshCw className="h-4 w-4 text-violet-300" />
      </motion.div>

      <p className="mt-5 text-sm font-medium text-slate-500">Loading history</p>

      <p className="mt-1 text-xs text-slate-700">
        Synchronizing threat telemetry
      </p>
    </div>
  );
}

/* ================================================================
   ERROR
================================================================ */

function ErrorState({ error, onRetry }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-400/15 bg-rose-500/[0.04]">
        <ShieldAlert className="h-5 w-5 text-rose-300/70" />
      </div>

      <p className="mt-5 text-sm font-semibold text-rose-300/80">
        Unable to load activity
      </p>

      <p className="mt-2 max-w-md text-sm leading-6 text-white/20">{error}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:border-violet-400/15 hover:bg-violet-500/[0.04] hover:text-violet-300"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}

/* ================================================================
   EMPTY
================================================================ */

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/[0.035]"
      >
        <Shield className="h-6 w-6 text-violet-300/50" />
      </motion.div>

      <p className="mt-5 text-sm font-semibold text-white/30">
        No investigations recorded
      </p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-white/15">
        Run your first ShieldSense scan to populate the security activity
        stream.
      </p>
    </div>
  );
}
