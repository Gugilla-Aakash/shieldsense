# ShieldSense — AI-Powered Digital Security Guard

> Don't just know it's dangerous. Know why.

ShieldSense is a full-stack AI security application that investigates suspicious URLs, messages, and files, then explains the verdict in plain language. It combines deterministic heuristic detectors with LLM reasoning (Gemini + Groq with offline fallback), risk scoring, scan history, and a security advisor chat.

**Live Demo:** https://shieldsense-pink.vercel.app/

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3-F55036)](https://groq.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [How Detection Works](#how-detection-works)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Limitations and Roadmap](#limitations-and-roadmap)
- [License](#license)

---

## Overview

Traditional security tools return a binary `BLOCK / ALLOW` with no context. That fails for zero-day phishing, lookalike domains, and social-engineering messages that look legitimate in isolation.

ShieldSense addresses this with an investigation pipeline:

```text
DETECT -> INVESTIGATE -> SCORE -> EXPLAIN -> PROTECT
```

1. **Detect:** Heuristic detectors extract signals from URLs, email/text, and file metadata.
2. **Investigate:** A security AI agent reviews the evidence and generates a grounded explanation.
3. **Score:** A risk engine aggregates weighted evidence into a 0–100 score with `SAFE / SUSPICIOUS / DANGEROUS` classification.
4. **Explain:** The UI presents risk dial, threat type, indicators, AI reasoning, and recommended action.
5. **Protect:** Users can simulate `ALLOW / WARN / BLOCK / QUARANTINE` actions and ask follow-up questions via advisor chat.

This repository demonstrates end-to-end product ownership: API design, detection logic, LLM orchestration with graceful degradation, persistence, and a production-grade Next.js UI.

---

## Key Features

### Multi-vector threat scanning

- **URL intelligence:** typosquat detection, brand impersonation in subdomains, IP-as-host, insecure HTTP, suspicious keywords, excessive subdomains, URL shorteners.
- **Message / email analysis:** urgency and psychological pressure, credential-harvesting language, sender-brand mismatch, embedded link detection.
- **File triage:** double-extension deception (e.g. `invoice.pdf.exe`), dangerous extensions, malware lure filenames.

### Explainable verdicts

- Risk score 0–100 with severity-weighted aggregation.
- Threat taxonomy: `CLEAN, PHISHING, BRAND_IMPERSONATION, MALWARE_DROPPER, SUSPICIOUS_CONTENT, SCAM, UNKNOWN`.
- Per-signal evidence list with code, label, description, weight, and severity.
- AI-generated explanation plus separate agent reasoning trace and `model_used` transparency.

### AI security advisor

- Primary: Google Gemini `gemini-1.5-flash`.
- Fallback: Groq `llama-3.3-70b-versatile`.
- Final fallback: deterministic rule-based explainer — the API never fails if keys are missing.
- Scan-grounded chat (`POST /api/v1/chat/`) that receives `scan_id` context and conversation history.

### Investigation workflow

- Scanner UI with `url | text | file` tabs, idle / scanning / complete states, risk visualization, and inline chat.
- Dashboard with totals, threat rate, safe count, and recent activity table backed by persistent history.
- Action simulation for safe response practice; result persisted as `action_taken`.

### Product UI

- Dark cyber-ops design system, glass surfaces, risk color semantics (emerald / amber / rose).
- Framer Motion throughout, scroll-driven storytelling on landing, live threat demo loop.
- Fully responsive App Router pages: `/`, `/scanner`, `/dashboard`.

---

## Live Demo

**Frontend:** https://shieldsense-pink.vercel.app/

- `/` — Marketing landing with pipeline explanation and live threat simulation.
- `/scanner` — Run URL, text, and file investigations. Supports deep links such as `/scanner?type=url&q=https://example.com`.
- `/dashboard` — View scan volume, threat rate, and history.

> Note: the deployed frontend requires a reachable backend via `NEXT_PUBLIC_API_URL`. For full functionality, run the backend locally as described in [Getting Started](#getting-started).

---

## Architecture

```text
                 Next.js 16 (App Router)
        / (landing)  /scanner  /dashboard
                        |
                        | fetch (api/shieldsenseApi.js)
                        v
              FastAPI (/api/v1 + /health)
                        |
        +---------------+---------------+
        |               |               |
   Scan Router    History/Action    Chat Router
        |                               |
   Detectors -> RiskEngine -> AI Agent -> Repository
   URL / Email / File   0-100 score  Gemini/Groq/  SQLite
                                         Heuristic   scan_records
```

Request flow for a scan:

```text
Client -> POST /api/v1/scan/{url,text,file}
      -> Detector.analyze() -> DetectionEvidence
      -> RiskEngine.evaluate() -> score, level, threat, action
      -> SecurityAIAgent.investigate() -> explanation, reasoning, model_used
      -> ScanRepository.save_scan() -> SQLite
      -> ScanResultResponse
```

Separation of concerns:

- `detectors/` — pure heuristic logic, no I/O.
- `scoring/` — aggregation and risk policy.
- `ai_agent/` — LLM orchestration and prompts.
- `db/` — SQLAlchemy session and repository.
- `api/routes/` — thin HTTP layer.
- `frontend/api/` — typed fetch wrapper with no external client dependency.

---

## Tech Stack

### Frontend (`frontend/`)

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript 5 (`strict: false`) |
| Styling | Tailwind CSS 4, PostCSS, custom CSS variables |
| Animation | Framer Motion 13 |
| Icons | Lucide React |
| 3D (installed) | Three.js, @react-three/fiber, @react-three/drei |
| Data fetching | Native `fetch`, local `useState`/`useEffect`, no global store |
| Deployment | Vercel |

### Backend (`backend/`)

| Area | Technology |
| --- | --- |
| Framework | FastAPI, Uvicorn |
| Language | Python 3.11-slim (Docker) |
| Validation | Pydantic v2, pydantic-settings |
| ORM | SQLAlchemy 2.0 |
| Database | SQLite (`shieldsense.db`, configurable via `DATABASE_URL`) |
| Parsing | tldextract, python-multipart, aiofiles |
| AI | google-generativeai (Gemini), groq (Llama) |
| Testing | pytest, pytest-asyncio, httpx |
| Docs | Auto-generated OpenAPI at `/docs` |

---

## How Detection Works

### Risk policy

Defined in `backend/app/core/config.py` and `backend/app/scoring/risk_engine.py`:

| Score | Level | Recommended Action |
| --- | --- | --- |
| 0–29 | SAFE | ALLOW |
| 30–59 | SUSPICIOUS | WARN |
| 60–100 | DANGEROUS | BLOCK |

Severity multipliers (`backend/app/scoring/weights_config.py`):

| Severity | Multiplier |
| --- | --- |
| critical | 1.2 |
| high | 1.0 |
| medium | 0.8 |
| low | 0.5 |

Total score is the clamped sum of `weight * multiplier` per indicator.

### Representative signals

URL (`backend/app/detectors/url_detector.py`):

- `TYPOSQUAT_LOOKALIKE` — character substitution against known brands.
- `BRAND_IMPERSONATION_SUBDOMAIN` — brand in subdomain but different registered domain.
- `IP_AS_HOST`, `INSECURE_HTTP`, `URL_SHORTENER`, `EXCESSIVE_SUBDOMAINS`, `SUSPICIOUS_KEYWORDS_URL`.

Email/Text (`backend/app/detectors/email_detector.py`):

- `URGENCY_PSYCHOLOGICAL_PRESSURE`, `CREDENTIAL_HARVESTING_LANGUAGE`, `SENDER_BRAND_MISMATCH`, `EMBEDDED_LINKS_DETECTED`.

File (`backend/app/detectors/file_detector.py`, metadata only):

- `DOUBLE_EXTENSION_DECEPTION`, `DANGEROUS_FILE_EXTENSION`, `MALWARE_LURE_FILENAME`.

Threat inference priority: `BRAND_IMPERSONATION > PHISHING > MALWARE_DROPPER > SUSPICIOUS_CONTENT > CLEAN`.

---

## API Reference

Base URL (local): `http://127.0.0.1:8000`
API prefix: `/api/v1`
Interactive docs: `http://127.0.0.1:8000/docs`
Health: `GET /health`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/scan/url` | Scan a URL. Body: `{"url": "https://..."}` |
| POST | `/api/v1/scan/text` | Scan message/email. Body: `{"content": "...", "sender": null, "subject": null}` |
| POST | `/api/v1/scan/file` | Scan file metadata. Multipart form with `file` field |
| GET | `/api/v1/history/?limit=50` | List recent scans, newest first |
| POST | `/api/v1/action/simulate` | Simulate response. Body: `{"scan_id": "...", "action": "BLOCK"}` |
| POST | `/api/v1/chat/` | Advisor chat. Body: `{"message": "...", "scan_id": null, "history": []}` |

Example:

```bash
curl -X POST http://127.0.0.1:8000/api/v1/scan/url \
  -H "Content-Type: application/json" \
  -d '{"url": "http://paypa1-secure-verification.com/login"}'
```

Example response (shape):

```json
{
  "scan_id": "uuid",
  "timestamp": "2026-09-16T00:00:00Z",
  "input_type": "URL",
  "target_summary": "http://paypa1-secure-verification.com/login",
  "risk_score": 78,
  "risk_level": "DANGEROUS",
  "threat_type": "BRAND_IMPERSONATION",
  "indicators": [
    {
      "code": "TYPOSQUAT_LOOKALIKE",
      "label": "Lookalike domain",
      "description": "...",
      "weight": 45,
      "severity": "critical"
    }
  ],
  "recommendation": "BLOCK",
  "explanation": "...",
  "ai_agent_reasoning": "...",
  "model_used": "Gemini (gemini-1.5-flash)"
}
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ and npm
- Optional: Docker
- Optional: `GEMINI_API_KEY` and `GROQ_API_KEY` (app works without them via heuristic fallback)

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend environment (`backend/.env`):

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
DATABASE_URL=sqlite:///./shieldsense.db
```

Docker alternative:

```bash
cd backend
docker build -t shieldsense-backend .
docker run -p 8000:8000 --env-file .env shieldsense-backend
```

Verify: `http://127.0.0.1:8000/health` and `http://127.0.0.1:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend environment (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

Open `http://localhost:3000`.

Production build:

```bash
npm run build
npm run start
npm run lint
```

---

## Project Structure

```text
shieldsense/
  backend/
    app/
      main.py                 # FastAPI app, CORS, router mounting, /health
      core/config.py          # Settings, thresholds, LLM/database config
      core/logging.py
      api/routes/scan.py      # POST /scan/url|text|file
      api/routes/history.py   # GET /history/
      api/routes/action.py    # POST /action/simulate
      api/routes/chat.py      # POST /chat/
      api/deps.py             # DB session dependency
      detectors/              # URL, email, file heuristics + keyword lists
      scoring/                # Risk engine, aggregator, weights
      ai_agent/               # Gemini/Groq orchestration, prompts, fallback
      models/schemas.py       # Pydantic contracts
      models/db_models.py     # ScanRecord table
      db/session.py
      db/repository.py
      actions/simulator.py
    tests/
    requirements.txt
    Dockerfile
  frontend/
    app/
      page.tsx                # Landing composition
      layout.tsx              # Metadata, Inter font, dark theme
      globals.css             # Design system
      scanner/page.tsx        # Scanner + results + advisor chat
      dashboard/page.tsx      # Stats + history table
    components/
      landing/                # Navbar, Hero, ThreatDemo, ProblemSection,
                              # HowItWorks, SecurityCapabilities, FinalCTA, Footer
      RiskBadge.jsx
      EvidenceList.jsx
      ActionButtons.jsx
      InvestigationModal.jsx
    api/shieldsenseApi.js     # Backend client
    tailwind.config.js
    tsconfig.json
  docs/
```

---

## Testing

Backend:

```bash
cd backend
pytest
```

Current coverage is intentionally narrow: URL detector happy-path and phishing cases are covered; risk engine and AI agent test files exist as placeholders. Good next steps are integration tests for `/scan/text`, `/scan/file`, history, action simulation, chat context, and repository persistence.

Frontend has no automated test suite; verification is via `npm run lint` and `npm run build`.

---

## Limitations and Roadmap

Current limitations (accurate to implementation):

- No authentication, authorization, or rate limiting; CORS allows all origins. Suitable for demo/local use only.
- SQLite single-table storage with no migrations.
- File scanning uses filename, size, and MIME type only — no hash, magic-byte, or content analysis.
- Action endpoint is simulation only; it does not enforce blocking.
- Frontend state is local only; no caching, retry, or offline persistence.

Planned improvements:

- Auth (API keys / OAuth), allowed-origins policy, rate limits.
- PostgreSQL + Alembic migrations + pagination.
- Real file inspection: SHA-256, MIME sniffing, sandbox/static analysis.
- Expanded pytest + frontend component/integration tests.
- Backend deployment with monitored LLM usage and cost controls.
- Removal or integration of unused Three.js dependencies and legacy modal.

---

## License

No license file is currently present in the repository. All rights reserved by the project owner unless a license is added.
