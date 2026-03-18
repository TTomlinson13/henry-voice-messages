# Homeowner Lead Agent Blueprint v1

## Objective
Automate lead engagement from first touch to proposal-ready status, while keeping outreach compliant, human, and non-annoying.

## Stack Context
- Intake: **Canopy Connect**
- Agency workflow/quoting: **QuoteRUSH (+ Client Dynamics)**
- Messaging/orchestration: **OpenClaw agents + cron + channel routing**

---

## 1) Agent Architecture (5-agent model)

### A) Lead Intake Agent
**Role:** Start conversation and gather quote-ready data.

**Triggers:**
- New lead from Canopy / ad / partner / expired database import

**Actions:**
- Send first-touch SMS/email
- Ask structured questions in sequence
- Confirm missing fields
- Mark lead `quote_ready` when minimum data complete

**Output:**
- Structured lead payload + status update in QuoteRUSH/CRM

---

### B) Follow-Up Agent
**Role:** Persistent but polite follow-up until engagement or timeout.

**Triggers:**
- Lead in `new`, `incomplete`, `quoted-not-bound`

**Actions:**
- Execute cadence (below)
- Personalize by source (partner/ad/reactivation)
- Pause/stop on response, bind, opt-out

**Output:**
- Next-touch task, engagement score, do-not-contact flags

---

### C) Proposal Orchestration Agent
**Role:** Move quote-ready leads to proposal quickly.

**Triggers:**
- Lead status changes to `quote_ready`
- Producer task overdue

**Actions:**
- Notify assigned producer/CSR
- Enforce SLA timers
- Remind until quote sent
- Trigger post-quote follow-up sequence

**Output:**
- Reduced lead-to-quote time, fewer stalled files

---

### D) Compliance Guardrail Agent
**Role:** Keep all outreach compliant and safe.

**Triggers:**
- Before every outbound message/call task

**Actions:**
- Validate DNC/TCPA/opt-out/quiet-hour rules
- Block disallowed channel
- Log consent and suppression events

**Output:**
- Pass/block decision + audit log

---

### E) Pipeline Coach Agent
**Role:** Management visibility + next best actions.

**Triggers:**
- Daily 8 AM + mid-day + end-of-day

**Actions:**
- Summarize stuck leads
- Rank top opportunities
- Recommend today’s top actions (Todd + team + Henry)

**Output:**
- Clear daily execution priorities

---

## 2) Lead Lifecycle States
1. `new`
2. `contact_attempted`
3. `engaged`
4. `incomplete_data`
5. `quote_ready`
6. `quoted`
7. `followup_post_quote`
8. `bound`
9. `lost`
10. `do_not_contact`

---

## 3) Minimum Data Required for “Quote Ready”
- Full name
- Property address
- Email + mobile
- DOB
- Prior/current carrier info (if available)
- Coverage intent / occupancy basics
- Preferred effective date

(Adjust by line/state as needed.)

---

## 4) Follow-Up Cadence (non-bothersome default)

### If no response:
- **T0 (immediate):** Intro + quick value + link
- **T+1 day:** gentle reminder
- **T+3 days:** value message (coverage/rate angle)
- **T+7 days:** “still want help?” checkpoint
- **T+14 days:** final nudge + archive option

### Rules:
- Max 5 touches in 14 days
- Stop immediately on opt-out
- Pause when engaged
- Resume only if lead goes cold after X days

---

## 5) Message Policy

### Tone
- Helpful, local, concise
- No pressure language
- One CTA per message

### Channel order
1) SMS (fastest response)
2) Email (detail/supporting info)
3) Human call task (if high intent or quote-ready stall)

---

## 6) Compliance Controls (must-have)
- Quiet hours by lead timezone
- DNC suppression list check pre-send
- TCPA consent check for SMS/calls
- Auto-honor STOP/UNSUBSCRIBE
- Full outbound/inbound event logging

---

## 7) Scoring Model (simple v1)
- +3 responds to message
- +4 completes key intake fields
- +5 requests quote today
- -3 no response after 3 touches
- -5 explicit not interested
- -10 opt-out

Use score to prioritize producer effort.

---

## 8) KPI Dashboard (weekly)
- New leads
- Contact rate
- Response rate
- Quote-ready rate
- Lead-to-quote time
- Quote-to-bind rate
- Unsubscribe rate
- Overdue follow-up count
- Revenue per lead source

---

## 9) 14-Day Implementation Plan

### Days 1–3
- Define fields + state machine
- Build compliance checks
- Build first-touch templates

### Days 4–7
- Enable intake + follow-up agents
- Connect status updates to QuoteRUSH
- Start pilot with one source (e.g., ad leads)

### Days 8–10
- Add proposal orchestration + SLA reminders
- Activate daily pipeline coach summary

### Days 11–14
- Tune cadence based on response/opt-out
- Expand to partner + expired lead segments

---

## 10) Human-in-the-loop points
- Producer approval before final proposal send (optional policy)
- Manual takeover trigger on high-value leads
- Escalation queue for confused/complex replies
