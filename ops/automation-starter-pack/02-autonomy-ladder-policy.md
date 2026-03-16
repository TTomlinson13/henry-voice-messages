# Autonomy Ladder Policy (Email + Call-Driven Actions)

## Objective
Allow safe automation while preserving compliance, client trust, and auditability.

## Levels

### L0 — Observe Only
- Agent may classify and summarize.
- No draft, no send.

### L1 — Draft Only (Default Start)
- Agent drafts reply/callback plan.
- Human approval required before send.
- Applies to most intents initially.

### L2 — Conditional Auto-Send (Narrow)
- Allowed only for explicitly approved low-risk intents.
- Must pass all gates:
  1) confidence >= 0.90
  2) required fields complete
  3) no prohibited keywords
  4) approved template only
  5) audit log write succeeds

### L3 — Human Mandatory
- Never auto-send.
- Includes legal threats, complaints, coverage disputes, cancellation conflicts, claim severity ambiguity.

## Initial L2 Candidate Intents
1. Appointment/meeting confirmations
2. Document receipt acknowledgements
3. Simple status updates (no coverage interpretation)
4. Reminder nudges for missing standard docs

## Approval & Governance
- Policy owner: Todd
- Operational owner: Henry
- Weekly review cadence: every Monday
- Rollback rule: any significant miss -> revert intent to L1 immediately

## Required Logging for Every Outbound Action
- timestamp
- source item id (email thread/call id)
- intent + priority
- autonomy level used
- template id/version
- human approver (if L1/L3)
- final outbound content hash
- delivery outcome
