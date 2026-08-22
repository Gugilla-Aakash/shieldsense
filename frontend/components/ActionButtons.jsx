import React, { useState } from "react";
import { simulateAction } from "../api/shieldsenseApi";

export default function ActionButtons({
  scanId,
  recommendedAction,
  onActionComplete,
}) {
  const [loading, setLoading] = useState(false);
  const [actionDone, setActionDone] = useState(null);

  const handleSimulate = async (action) => {
    setLoading(true);
    try {
      const res = await simulateAction(scanId, action);
      setActionDone(res);
      if (onActionComplete) onActionComplete(res);
    } catch (err) {
      alert("Error simulating action: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (actionDone) {
    return (
      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-300 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Action Applied: {actionDone.action_applied}
        </div>
        <p className="text-xs text-slate-300 mt-1">{actionDone.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Recommended Action:{" "}
        <span className="text-cyan-400">{recommendedAction}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {recommendedAction === "BLOCK" && (
          <button
            onClick={() => handleSimulate("BLOCK")}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition disabled:opacity-50"
          >
            {loading ? "Executing..." : "🚫 Block Link / File"}
          </button>
        )}
        {recommendedAction === "WARN" && (
          <button
            onClick={() => handleSimulate("WARN")}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition disabled:opacity-50"
          >
            {loading ? "Executing..." : "⚠️ Apply Security Warning"}
          </button>
        )}
        <button
          onClick={() => handleSimulate("QUARANTINE")}
          disabled={loading}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition disabled:opacity-50"
        >
          📦 Quarantine
        </button>
        <button
          onClick={() => handleSimulate("ALLOW")}
          disabled={loading}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition disabled:opacity-50"
        >
          ✓ Allow Anyway
        </button>
      </div>
    </div>
  );
}
