import React from "react";

export default function RiskBadge({ level, score }) {
  const getBadgeStyle = () => {
    switch (level?.toUpperCase()) {
      case "SAFE":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "SUSPICIOUS":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "DANGEROUS":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider border ${getBadgeStyle()}`}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {level || "UNKNOWN"} {typeof score === "number" ? `— ${score}/100` : ""}
    </span>
  );
}
