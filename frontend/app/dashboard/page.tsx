"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

  // Calculate basic stats for the dashboard
  const totalScans = history.length;
  const safeScans = history.filter((s) => s.risk_level === "SAFE").length;
  const threatsDetected = history.filter(
    (s) => s.risk_level === "DANGEROUS" || s.risk_level === "SUSPICIOUS",
  ).length;

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Security Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Monitor your digital threat investigations.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition"
          >
            ← Back to Scanner
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-[#0b0c10] border border-slate-800/80 shadow-lg">
            <h3 className="text-sm font-medium text-slate-400">Total Scans</h3>
            <p className="text-3xl font-bold text-white mt-2">
              {loading ? "-" : totalScans}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0b0c10] border border-rose-900/30 shadow-lg">
            <h3 className="text-sm font-medium text-slate-400">
              Threats Detected
            </h3>
            <p className="text-3xl font-bold text-rose-400 mt-2">
              {loading ? "-" : threatsDetected}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0b0c10] border border-emerald-900/30 shadow-lg">
            <h3 className="text-sm font-medium text-slate-400">Safe Items</h3>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {loading ? "-" : safeScans}
            </p>
          </div>
        </div>

        {/* History Table */}
        <div className="rounded-2xl bg-[#0b0c10] border border-slate-800/80 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <button
              onClick={fetchHistory}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-500 animate-pulse">
                Loading history...
              </div>
            ) : error ? (
              <div className="p-8 text-center text-sm text-rose-400">
                {error}
              </div>
            ) : history.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No scans recorded yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <th className="p-4 font-semibold">Time</th>
                    <th className="p-4 font-semibold">Type</th>
                    <th className="p-4 font-semibold">Target</th>
                    <th className="p-4 font-semibold">Risk Level</th>
                    <th className="p-4 font-semibold">Action Taken</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-800/50">
                  {history.map((scan) => (
                    <tr
                      key={scan.scan_id}
                      className="hover:bg-slate-900/30 transition"
                    >
                      <td className="p-4 text-slate-400 whitespace-nowrap">
                        {new Date(scan.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4 text-slate-300 uppercase text-xs font-bold tracking-wider">
                        {scan.input_type}
                      </td>
                      <td className="p-4 text-slate-200 truncate max-w-[200px] md:max-w-md">
                        {scan.target_summary}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <RiskBadge
                          level={scan.risk_level}
                          score={scan.risk_score}
                        />
                      </td>
                      <td className="p-4">
                        {scan.action_taken ? (
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                            {scan.action_taken}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600 italic">
                            None
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
