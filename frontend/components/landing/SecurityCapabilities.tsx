import React from "react";

export default function SecurityCapabilities() {
  return (
    <section className="relative flex flex-col items-center py-24 bg-[var(--bg-base)]">
      <div className="shield-container flex w-full flex-col items-center text-center gap-16">
        {/* 1. Header Area */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-[var(--purple-bright)] opacity-50"></span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--purple-bright)]">
              Security Intelligence
            </span>
            <span className="h-[1px] w-6 bg-[var(--purple-bright)] opacity-50"></span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            One shield. Multiple layers of defense.
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            ShieldSense examines the signals hidden inside the content you
            interact with, then turns those signals into evidence you can
            understand.
          </p>
        </div>

        {/* 2. Capability Grid (2x2) */}
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 01: URL Intelligence */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-purple)] hover:shadow-[0_8px_30px_-10px_var(--purple-glow)]">
            <div>
              <h3 className="mb-2 text-sm font-bold tracking-widest text-[var(--text-primary)]">
                URL INTELLIGENCE
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Detect suspicious domains, URL structures, redirects, and
                lookalike patterns before you follow the link.
              </p>
            </div>

            <div className="mt-8 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 font-mono text-xs text-[var(--text-secondary)] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:border-[var(--border-purple)]">
              <div className="truncate text-white">
                https://
                <span className="border-b border-[var(--color-danger)] text-[var(--color-danger)] font-bold">
                  secure-bank-verification
                </span>
                .example
              </div>
              <div className="mt-4 flex flex-col gap-2 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">DOMAIN</span>{" "}
                  <span className="text-[var(--color-danger)]">
                    ⚠ LOOKALIKE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">STRUCTURE</span>{" "}
                  <span className="text-[var(--color-safe)]">✓ CHECKED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">REDIRECTS</span>{" "}
                  <span className="text-[var(--color-suspicious)]">
                    ⚠ FLAGGED
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] font-bold tracking-widest text-[var(--purple-bright)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              EXPLORE →
            </div>
          </div>

          {/* Card 02: Message Intelligence */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-purple)] hover:shadow-[0_8px_30px_-10px_var(--purple-glow)]">
            <div>
              <h3 className="mb-2 text-sm font-bold tracking-widest text-[var(--text-primary)]">
                MESSAGE INTELLIGENCE
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Identify urgency, fear, credential requests, financial pressure,
                and impersonation patterns hidden in messages.
              </p>
            </div>

            <div className="mt-8 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 font-mono text-xs text-[var(--text-secondary)] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:border-[var(--border-purple)]">
              <div className="border-b border-dashed border-[var(--border-subtle)] pb-3 text-[var(--text-primary)]">
                "Your account will be suspended. Verify immediately."
              </div>
              <div className="mt-3 flex flex-col gap-2 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">URGENCY</span>{" "}
                  <span className="text-[var(--color-danger)] transition-all delay-100 group-hover:scale-110">
                    ⚠ DETECTED
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">CREDENTIAL</span>{" "}
                  <span className="text-[var(--color-danger)] transition-all delay-200 group-hover:scale-110">
                    ⚠ REQUEST
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">
                    IMPERSONATION
                  </span>{" "}
                  <span className="text-[var(--color-danger)] transition-all delay-300 group-hover:scale-110">
                    ⚠ FLAGGED
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] font-bold tracking-widest text-[var(--purple-bright)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              EXPLORE →
            </div>
          </div>

          {/* Card 03: File Intelligence */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-purple)] hover:shadow-[0_8px_30px_-10px_var(--purple-glow)]">
            <div>
              <h3 className="mb-2 text-sm font-bold tracking-widest text-[var(--text-primary)]">
                FILE INTELLIGENCE
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Inspect suspicious files using static analysis without executing
                them to identify mismatches and malware signatures.
              </p>
            </div>

            <div className="mt-8 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 font-mono text-xs text-[var(--text-secondary)] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:border-[var(--border-purple)]">
              <div className="flex items-center gap-2 pb-2 text-[var(--text-primary)]">
                <span className="text-[var(--text-muted)]">📄</span>{" "}
                suspicious_document.pdf
                <span className="text-[var(--color-danger)] font-bold">
                  .exe
                </span>
              </div>
              <div className="mt-2 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-3 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">HASH</span>{" "}
                  <span>7f3a8b...91c</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">TYPE</span>{" "}
                  <span className="text-[var(--color-danger)]">EXECUTABLE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">STATUS</span>{" "}
                  <span className="text-[var(--color-danger)]">
                    ⚠ SUSPICIOUS
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] font-bold tracking-widest text-[var(--purple-bright)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              EXPLORE →
            </div>
          </div>

          {/* Card 04: AI Security Reasoning (Visually Stronger) */}
          <div className="group relative flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-8 text-left shadow-[0_0_30px_-15px_var(--purple-glow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-purple-bright)] hover:shadow-[0_8px_40px_-10px_var(--purple-glow-strong)]">
            {/* Subtle connecting glow behind the card */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-[var(--purple-glow)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold tracking-widest text-white">
                  AI SECURITY REASONING
                </h3>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple-bright)] animate-pulse shadow-[0_0_8px_var(--purple-bright)]"></span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Turn technical evidence into clear reasoning, risk context, and
                an actionable recommendation.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center rounded-md border border-[var(--border-purple)] bg-[var(--bg-base)] p-4 font-mono text-xs opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_15px_var(--purple-glow)]">
              <span className="text-[0.55rem] font-bold tracking-widest text-[var(--text-muted)]">
                EVIDENCE
              </span>
              <span className="my-1 text-[var(--purple-bright)]">↓</span>
              <div className="flex w-full flex-col gap-1 rounded bg-[var(--bg-primary)] p-2 text-[10px] text-[var(--text-secondary)]">
                <span className="truncate">Lookalike domain</span>
                <span className="truncate">Urgency language</span>
              </div>
              <span className="my-1 text-[var(--purple-bright)]">↓</span>
              <span className="text-[0.55rem] font-bold tracking-widest text-[var(--purple-bright)]">
                AI REASONING
              </span>
              <span className="my-1 text-[var(--purple-bright)]">↓</span>
              <div className="w-full rounded bg-[var(--color-danger-bg)] p-2 text-center text-[10px] font-bold text-[var(--color-danger)]">
                RECOMMENDED: BLOCK
              </div>
            </div>

            <div className="mt-6 text-[10px] font-bold tracking-widest text-[var(--purple-bright)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              SEE INVESTIGATION →
            </div>
          </div>
        </div>

        {/* 3. Bottom Statements */}
        <div className="mt-4 flex flex-col items-center gap-6">
          <div className="flex justify-center gap-4 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-60">
            <span>MULTI-SIGNAL ANALYSIS</span>
            <span>•</span>
            <span>EVIDENCE-DRIVEN</span>
            <span>•</span>
            <span>EXPLAINABLE</span>
            <span>•</span>
            <span className="text-[var(--text-primary)]">ACTIONABLE</span>
          </div>

          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Security shouldn't just say "no."{" "}
            <span className="text-white">It should tell you why.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
