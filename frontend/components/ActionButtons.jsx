"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  LockKeyhole,
  Package,
  ShieldBan,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

import { simulateAction } from "../api/shieldsenseApi";

export default function ActionButtons({
  scanId,
  recommendedAction,
  onActionComplete,
}) {
  const [loading, setLoading] = useState(false);
  const [actionDone, setActionDone] = useState(null);

  const handleSimulate = async (action) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await simulateAction(scanId, action);

      setActionDone({
        ...response,
        error: false,
      });

      if (onActionComplete) {
        onActionComplete(response);
      }
    } catch (error) {
      setActionDone({
        action_applied: action,
        message: error?.message || "Unable to apply the simulated action.",
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * ------------------------------------------------------------
   * ACTION COMPLETED
   * ------------------------------------------------------------
   */

  if (actionDone) {
    const failed = actionDone.error;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="action-result"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl ${
            failed
              ? "border-red-400/15 bg-red-500/[0.035]"
              : "border-emerald-400/15 bg-emerald-500/[0.035]"
          }`}
        >
          {/* Ambient glow */}
          <div
            className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl ${
              failed ? "bg-red-500/[0.10]" : "bg-emerald-400/[0.10]"
            }`}
          />

          {/* Animated scan sweep */}
          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
            }}
            className={`pointer-events-none absolute inset-y-0 w-24 -skew-x-12 blur-xl ${
              failed ? "bg-red-400/[0.06]" : "bg-emerald-400/[0.06]"
            }`}
          />

          <div className="relative">
            {/* Status header */}
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-2 text-sm font-semibold ${
                  failed ? "text-red-300" : "text-emerald-300"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                    failed
                      ? "border-red-400/15 bg-red-500/[0.06]"
                      : "border-emerald-400/15 bg-emerald-500/[0.06]"
                  }`}
                >
                  {failed ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </div>

                {failed ? "ACTION FAILED" : "ACTION APPLIED"}
              </div>

              <Sparkles
                className={`h-3.5 w-3.5 ${
                  failed ? "text-red-400/30" : "text-emerald-400/30"
                }`}
              />
            </div>

            {/* Action */}
            <div className="mt-4 rounded-xl border border-white/[0.05] bg-black/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <Terminal className="h-3 w-3 text-white/20" />

                <span className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-white/20">
                  EXECUTED PROTOCOL
                </span>
              </div>

              <div
                className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
                  failed ? "text-red-300/70" : "text-emerald-300/70"
                }`}
              >
                {actionDone.action_applied}
              </div>
            </div>

            {/* Message */}
            <p className="mt-3 text-xs leading-6 text-white/35">
              {actionDone.message}
            </p>

            {/* Return */}
            <button
              type="button"
              onClick={() => setActionDone(null)}
              className="mt-4 inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-white/20 transition hover:text-white/55"
            >
              <span className="h-1 w-1 rounded-full bg-violet-400/50" />
              Return to actions
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  /*
   * ------------------------------------------------------------
   * ACTIONS
   * ------------------------------------------------------------
   */

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/10 bg-violet-500/[0.04]">
          <LockKeyhole className="h-3.5 w-3.5 text-violet-300/55" />
        </div>

        <div className="font-mono text-[8px] font-bold tracking-[0.18em] text-white/25">
          RECOMMENDED ACTION
        </div>

        <span className="text-white/[0.08]">//</span>

        <motion.span
          key={recommendedAction || "REVIEW"}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono text-[8px] font-bold tracking-[0.15em] text-violet-300/65"
        >
          {recommendedAction || "REVIEW"}
        </motion.span>
      </div>

      {/* Action grid */}
      <div className="flex flex-wrap gap-2.5">
        {/* BLOCK */}
        {recommendedAction === "BLOCK" && (
          <ActionButton
            label={loading ? "EXECUTING..." : "BLOCK CONNECTION"}
            icon={<ShieldBan className="h-3.5 w-3.5" />}
            tone="danger"
            disabled={loading}
            onClick={() => handleSimulate("BLOCK")}
          />
        )}

        {/* WARN */}
        {recommendedAction === "WARN" && (
          <ActionButton
            label={loading ? "EXECUTING..." : "ISSUE WARNING"}
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            tone="warning"
            disabled={loading}
            onClick={() => handleSimulate("WARN")}
          />
        )}

        {/* QUARANTINE */}
        <ActionButton
          label={loading ? "PROCESSING..." : "QUARANTINE"}
          icon={<Package className="h-3.5 w-3.5" />}
          disabled={loading}
          onClick={() => handleSimulate("QUARANTINE")}
        />

        {/* ALLOW */}
        <ActionButton
          label="ALLOW"
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          tone="muted"
          disabled={loading}
          onClick={() => handleSimulate("ALLOW")}
        />
      </div>

      {/* Simulation indicator */}
      <div className="mt-5 flex items-center gap-2 font-mono text-[6px] tracking-[0.16em] text-white/12">
        <motion.span
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="h-1 w-1 rounded-full bg-violet-400/50"
        />
        ACTIONS ARE SIMULATED
      </div>
    </div>
  );
}

/* ================================================================
   ACTION BUTTON
================================================================ */

function ActionButton({
  label,
  icon,
  tone = "default",
  disabled = false,
  onClick,
}) {
  const toneClasses = {
    danger: {
      base: "border-red-400/15 bg-red-500/[0.055] text-red-300",
      hover: "hover:border-red-400/30 hover:bg-red-500/[0.11]",
      glow: "group-hover:shadow-[0_0_25px_rgba(239,68,68,0.12)]",
      icon: "border-red-400/10 bg-red-400/[0.05] text-red-300",
    },

    warning: {
      base: "border-amber-400/15 bg-amber-500/[0.05] text-amber-300",
      hover: "hover:border-amber-400/30 hover:bg-amber-500/[0.10]",
      glow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.10)]",
      icon: "border-amber-400/10 bg-amber-400/[0.05] text-amber-300",
    },

    muted: {
      base: "border-white/[0.06] bg-white/[0.018] text-white/30",
      hover:
        "hover:border-white/[0.13] hover:bg-white/[0.035] hover:text-white/55",
      glow: "group-hover:shadow-[0_0_25px_rgba(255,255,255,0.03)]",
      icon: "border-white/[0.05] bg-white/[0.025] text-white/25",
    },

    default: {
      base: "border-white/[0.07] bg-white/[0.025] text-white/40",
      hover:
        "hover:border-violet-400/20 hover:bg-violet-500/[0.035] hover:text-white/75",
      glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
      icon: "border-violet-400/10 bg-violet-500/[0.04] text-violet-300/60",
    },
  };

  const styles = toneClasses[tone];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{
        duration: 0.18,
      }}
      className={[
        "group relative inline-flex items-center gap-2.5",
        "overflow-hidden rounded-xl border px-4 py-2.5",
        "text-[8px] font-bold uppercase tracking-[0.15em]",
        "transition-all duration-250",
        styles.base,
        styles.hover,
        styles.glow,
        "disabled:cursor-not-allowed disabled:opacity-30",
      ].join(" ")}
    >
      {/* Hover sweep */}
      <span className="pointer-events-none absolute inset-y-0 left-[-50%] w-1/3 -skew-x-12 bg-white/[0.07] opacity-0 blur-md transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100" />

      {/* Icon */}
      <span
        className={[
          "relative flex h-6 w-6 items-center justify-center rounded-lg border",
          "transition-all duration-200",
          styles.icon,
          "group-hover:scale-105",
        ].join(" ")}
      >
        <span className="transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      </span>

      {/* Text */}
      <span className="relative">{label}</span>

      {/* Tiny status dot */}
      <span
        className={`relative ml-1 h-1 w-1 rounded-full opacity-30 transition-opacity group-hover:opacity-70 ${
          tone === "danger"
            ? "bg-red-400"
            : tone === "warning"
              ? "bg-amber-400"
              : tone === "muted"
                ? "bg-white"
                : "bg-violet-400"
        }`}
      />
    </motion.button>
  );
}
