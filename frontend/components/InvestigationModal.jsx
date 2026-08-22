import React, { useState } from "react";
import RiskBadge from "./RiskBadge";
import EvidenceList from "./EvidenceList";
import ActionButtons from "./ActionButtons";
import { chatWithSecurityAgent } from "../api/shieldsenseApi";

export default function InvestigationModal({ result, onClose }) {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  if (!result) return null;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    const updatedHistory = [...messages, { role: "user", content: userMsg }];
    setMessages(updatedHistory);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await chatWithSecurityAgent(
        userMsg,
        result.scan_id,
        messages,
      );
      setMessages([
        ...updatedHistory,
        { role: "assistant", content: res.reply },
      ]);
    } catch (err) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl text-slate-100 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              ShieldSense Investigation
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5 truncate max-w-lg">
              {result.target_summary}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Risk & Classification Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <RiskBadge level={result.risk_level} score={result.risk_score} />
            <span className="text-xs font-mono text-slate-400">
              Threat:{" "}
              <strong className="text-slate-200">{result.threat_type}</strong>
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Model: {result.model_used}
          </span>
        </div>

        {/* AI Explanation */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <span className="text-cyan-400">⚡</span> AI Security Assessment
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {result.explanation}
          </p>
          {result.ai_agent_reasoning && (
            <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800 leading-relaxed">
              {result.ai_agent_reasoning}
            </p>
          )}
        </div>

        {/* Indicators List */}
        <div className="mt-4">
          <EvidenceList indicators={result.indicators} />
        </div>

        {/* Simulated Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <ActionButtons
            scanId={result.scan_id}
            recommendedAction={result.recommendation}
          />
        </div>

        {/* Interactive Chat Box */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            💬 Ask AI Security Advisor
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto mb-3 pr-1">
            {messages.length === 0 && (
              <p className="text-xs text-slate-500 italic">
                Ask anything about this scan (e.g. "Why is this link
                dangerous?", "What should I do?").
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-cyan-950/50 text-cyan-200 ml-8 border border-cyan-800/40"
                    : "bg-slate-900 text-slate-300 mr-8 border border-slate-800"
                }`}
              >
                <strong>{m.role === "user" ? "You: " : "ShieldSense: "}</strong>
                {m.content}
              </div>
            ))}
            {chatLoading && (
              <div className="text-xs text-cyan-400 animate-pulse">
                ShieldSense is reasoning...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question about this threat..."
              className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-50 transition"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
