# Projects (Lean Kanban)

## NOW
- [ ] 🔴 TOP PRIORITY: Commercial Intake-to-ACORD Compiler (v1) — ACORD 125 first, then 126/140 (Todd + Maria + Henry)
  - Owner: Henry
  - Next action (2026-03-18): Lock ACORD 125 required input field list + output schema draft in one page.
- [ ] Mission Control board active daily
  - Owner: Henry
  - Next action (2026-03-18): Post one end-of-day status line (health, inbox, now-task complete/incomplete).
- [ ] Decide what “Kiro” is (persona/sub-agent/model wrapper), then implement
  - Owner: Todd + Henry
  - Next action (2026-03-18): Finalize Kiro definition in 5 bullets (purpose, model, runtime, tools, done-when).

## NEXT
- [ ] Build/create Insurance Commission Reconciliation System (agency-wide)
- [ ] Daily Mission summary automation
- [ ] Weekly review automation
- [ ] Optional visual dashboard (`ops/dashboard.html`)

## BLOCKED
- [ ] Kiro build blocked on definition details

## KIRO DRAFT SPEC (v0.1 — 2026-03-18)
- **Purpose:** Kiro is the execution coordinator for insurance ops follow-through (inbox-to-action), turning priority signals into concrete next actions with owner + status.
- **Runtime:** Persistent helper lane (`main` + optional thread-bound sub-agent for heavy implementation tasks).
- **Model:** Primary `openai-codex/gpt-5.3-codex` for execution; escalate to Opus only for deep strategy decisions.
- **Tool scope:** Gmail triage (read/label/archive), calendar checks, project file updates (`ops/*.md`), and OpenClaw health checks. No outbound external sends without explicit approval.
- **Done when:** (1) daily top-3 priorities posted, (2) each priority has owner/next action/date, (3) stale tasks cleaned weekly, (4) urgent inbox items converted to tracked actions same day.

## KIRO IMPLEMENTATION CHECKLIST (v0.2)
- [ ] Finalize Kiro scope statement (one paragraph) and approve owner.
- [ ] Create Kiro run mode: main-session triage + optional sub-agent execution lane.
- [ ] Define trigger rules (priority inbox hits, stale project cards, daily snapshot windows).
- [ ] Define output format standard: `priority -> owner -> next action -> due/date -> status`.
- [ ] Add daily Kiro update block to Mission Control routine.
- [ ] Add weekly stale-card cleanup rule (auto-flag tasks older than 7 days without update).
- [ ] Add safety guardrails: no external sends/changes without explicit approval.
- [ ] Pilot for 3 business days and measure: response latency, closure rate, noise level.
- [ ] Review pilot results with Todd and lock v1 behavior.

## DONE
- [x] Gmail integration stable (inbound + outbound)
- [x] Gmail chat delivery mapping enabled (`deliver: true`)
- [x] Weather automation at 6:30 AM ET
- [x] Model triage policy documented

---

## Card Template
- **Task:**
- **Owner:** Henry
- **Next action:**
- **Done when:**
- **Notes:**
