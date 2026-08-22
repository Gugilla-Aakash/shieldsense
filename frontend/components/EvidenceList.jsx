import React from "react";

export default function EvidenceList({ indicators = [] }) {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-sm flex items-center gap-2">
        <svg
          className="w-5 h-5 text-emerald-400 shrink-0"
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
        No malicious or suspicious indicators detected.
      </div>
    );
  }

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "bg-rose-950/60 text-rose-300 border-rose-700/50";
      case "high":
        return "bg-orange-950/60 text-orange-300 border-orange-700/50";
      case "medium":
        return "bg-amber-950/60 text-amber-300 border-amber-700/50";
      default:
        return "bg-blue-950/60 text-blue-300 border-blue-700/50";
    }
  };

  return (
    <div className="space-y-2.5">
      <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
        Detected Evidence ({indicators.length})
      </h4>
      {indicators.map((ind, idx) => (
        <div
          key={idx}
          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-sm font-medium text-slate-200">
              {ind.label}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getSeverityBadge(ind.severity)}`}
              >
                {ind.severity}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                +{ind.weight}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {ind.description}
          </p>
        </div>
      ))}
    </div>
  );
}
