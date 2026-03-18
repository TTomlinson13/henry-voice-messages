# QuoteRUSH Lifecycle Implementation Checklist

## Goal
Implement the lifecycle map in QuoteRUSH with clean transitions, mandatory fields, and automation-safe triggers.

---

## 1) Status Setup
- [ ] Create/confirm statuses:
  - [ ] New
  - [ ] Contact Attempted
  - [ ] Engaged
  - [ ] Quote Ready
  - [ ] Proposal Sent
  - [ ] Won
  - [ ] Lost
- [ ] Ensure status names are exact and standardized.
- [ ] Remove/archive duplicate legacy statuses.

## 2) Field Requirements by Stage
- [ ] Define mandatory fields for each stage.
- [ ] Add validation prompts/checklists for:
  - [ ] Contact Attempted (channel + timestamp)
  - [ ] Engaged (reply timestamp + next action)
  - [ ] Quote Ready (required intake complete)
  - [ ] Proposal Sent (send timestamp + reference)
  - [ ] Won/Lost (outcome date + reason/premium)

## 3) Transition Controls
- [ ] Enforce allowed transitions only.
- [ ] Block shortcuts that skip required work.
- [ ] Add warning for manual overrides.

## 4) Automation Hooks
- [ ] New -> create first-touch task
- [ ] Contact Attempted -> schedule follow-up task
- [ ] Engaged -> pause generic drip
- [ ] Quote Ready -> notify producer queue
- [ ] Proposal Sent -> set follow-up reminder
- [ ] Won -> onboarding checklist
- [ ] Lost -> reason capture + nurture eligibility

## 5) Compliance Controls
- [ ] DNC/TCPA suppression checked before outbound sends
- [ ] Quiet hours enforced (9PM–8AM local)
- [ ] Opt-out immediately suppresses automation
- [ ] Audit trail enabled for status changes and sends

## 6) SLA Timers
- [ ] First contact SLA set (<=30 min business hours)
- [ ] Quote Ready -> Proposal SLA set (<=24h)
- [ ] Proposal follow-up SLA set (24–48h)
- [ ] Alerts configured for stale records

## 7) Reporting Dashboard
- [ ] Build stage conversion report
- [ ] Build cycle-time by stage report
- [ ] Build lost-reason report
- [ ] Build owner workload report

## 8) QA Test Cases (Run Before Live)
- [ ] New lead created -> first-touch task generated
- [ ] Outbound logged -> status moves to Contact Attempted
- [ ] Inbound reply logged -> status moves to Engaged
- [ ] Required fields complete -> status moves to Quote Ready
- [ ] Proposal sent -> status moves to Proposal Sent
- [ ] Outcome set -> Won/Lost with required fields captured
- [ ] Opt-out event -> all outbound automation stops

## 9) Launch Plan
- [ ] Soft launch with small lead segment
- [ ] Daily QA review for first 7 days
- [ ] Fix edge cases quickly
- [ ] Full rollout after stable metrics

## 10) Ownership & Cadence
- [ ] Name primary owner for lifecycle governance
- [ ] Name backup owner
- [ ] Weekly 15-minute lifecycle health review scheduled
- [ ] Monthly cleanup of status/data anomalies
