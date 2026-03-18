# 8x8 Cutover Checklist (Mode A First)

## Objective
Deploy a dedicated 8x8 number for agent operations with compliance-first controls, inbound summarization, and escalation routing.

---

## Pre-Cutover (Planning)
- [ ] Confirm dedicated 8x8 DID to use for agent ops
- [ ] Confirm voice + SMS capability on the DID
- [ ] Confirm business hours and quiet hours
- [ ] Define escalation recipients (primary + backup)
- [ ] Define severity levels (urgent, normal, low)
- [ ] Confirm compliance policy (DNC/TCPA/quiet-hours)

## Ownership
- [ ] Business owner: Todd
- [ ] Technical owner: Henry agent workflow
- [ ] Compliance reviewer assigned

---

## 8x8 Admin Configuration

## Number + Routing
- [ ] Assign DID to automation endpoint/workflow target
- [ ] Enable inbound voice handling
- [ ] Enable inbound SMS handling (if licensed)
- [ ] Set fallback destination if workflow unavailable

## Call Handling
- [ ] Create call flow: inbound -> capture -> summarize -> notify
- [ ] Configure voicemail fallback
- [ ] Add caller ID preservation in event payloads
- [ ] Set ring/timeout thresholds for fallback transfer

## Messaging Handling
- [ ] Route inbound SMS to same summarization pipeline
- [ ] Enforce opt-out detection (STOP, UNSUBSCRIBE)
- [ ] Suppress outbound replies during quiet hours unless urgent

---

## OpenClaw / Workflow Configuration

## Inbound Processing
- [ ] Normalize payload fields (caller, time, transcript/body)
- [ ] Classify intent (service, sales, billing, urgent)
- [ ] Generate concise summary + next action recommendation

## Escalation Rules
- [ ] Urgent -> immediate Telegram alert to Todd
- [ ] Normal -> queue in digest + task list
- [ ] Low -> daily summary only

## Logging/Audit
- [ ] Store event ID, source number, timestamp, classification
- [ ] Store action taken and destination recipient
- [ ] Keep audit history for compliance review

---

## Compliance Guardrails (Must Pass)
- [ ] Quiet hours enforced (e.g., 9PM–8AM local)
- [ ] DNC/TCPA suppression checked before any outbound follow-up
- [ ] Opt-out immediately suppresses future outbound automation
- [ ] No autodial/outbound campaign in Mode A
- [ ] Manual approval required for first outbound workflows

---

## Testing (Go/No-Go)

## Test Set A: Inbound Voice
- [ ] Place test call from known number
- [ ] Verify event capture + transcript/summary
- [ ] Verify urgent/non-urgent classification logic
- [ ] Verify escalation routing and message formatting

## Test Set B: Inbound SMS
- [ ] Send test SMS with normal request
- [ ] Send test SMS with STOP keyword
- [ ] Verify suppression behavior and logging

## Test Set C: Failure/Fallback
- [ ] Simulate workflow failure
- [ ] Verify fallback route triggers correctly
- [ ] Verify no message loss in failure mode

---

## Cutover Execution
- [ ] Freeze config changes 15 min before cutover
- [ ] Enable production routing on DID
- [ ] Confirm first live event processed end-to-end
- [ ] Monitor first hour with live checks every 10 minutes
- [ ] Record issues + hotfix actions

---

## Post-Cutover (First 7 Days)
- [ ] Daily review of alerts, misroutes, false urgents
- [ ] Tune classification prompts and escalation thresholds
- [ ] Validate compliance suppressions daily
- [ ] Weekly summary report: volume, routing accuracy, response times

---

## Mode B Readiness (Outbound Later)
Only proceed after Mode A is stable for 7+ days:
- [ ] Outbound consent model verified
- [ ] Approved templates loaded
- [ ] Quiet-hours and opt-out tested in production
- [ ] Manual approval gate removed only after compliance sign-off

---

## Final Sign-Off
- [ ] Technical sign-off
- [ ] Compliance sign-off
- [ ] Business sign-off
- [ ] Cutover complete date recorded
