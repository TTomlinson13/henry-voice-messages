# QuoteRUSH Lifecycle Map (Homeowner Pilot)

## Objective
Standardize lead progression in QuoteRUSH so automation, producers, and reporting all use the same status logic.

---

## Lifecycle Stages
1. **New**
2. **Contact Attempted**
3. **Engaged**
4. **Quote Ready**
5. **Proposal Sent**
6. **Won** / **Lost**

---

## Stage Definitions + Entry Criteria

## 1) New
**Definition:** Lead created/imported; no outbound attempt yet.

**Enter when:**
- New lead arrives from Canopy/form/manual import.

**Required fields on entry:**
- Lead name
- Primary contact method (phone/email)
- Source/campaign
- Assigned owner

**Auto-actions:**
- Create first-touch task
- Set SLA timer (first contact within 15–30 min during business hours)

---

## 2) Contact Attempted
**Definition:** At least one outbound attempt made; no two-way response yet.

**Enter when:**
- SMS/email/call attempt logged.

**Required fields:**
- Attempt timestamp
- Channel used
- Attempt count

**Auto-actions:**
- Schedule next follow-up based on cadence
- Suppress if opt-out or DNC flag

---

## 3) Engaged
**Definition:** Lead responds or active conversation starts.

**Enter when:**
- Reply received (SMS/email/call) OR
- Appointment/meeting event set

**Required fields:**
- Engagement channel
- Last response timestamp
- Next action owner/date

**Auto-actions:**
- Pause generic drip sequence
- Trigger intake completion workflow

---

## 4) Quote Ready
**Definition:** Required underwriting/intake fields complete for quoting.

**Enter when (all true):**
- Required Canopy intake fields complete
- Contact info validated
- Target policy details captured

**Required fields (minimum):**
- Property address
- Current carrier (if known)
- Renewal/effective date
- Any major risk notes (roof/updates/claims context)

**Auto-actions:**
- Create producer quoting task
- Start quote SLA timer

---

## 5) Proposal Sent
**Definition:** Formal quote/proposal delivered to prospect.

**Enter when:**
- Proposal/quote package sent via approved channel.

**Required fields:**
- Proposal sent date/time
- Premium/option summary (or proposal reference)
- Follow-up due date

**Auto-actions:**
- Schedule proposal follow-up sequence
- Notify owner at stale threshold (e.g., no response 48h)

---

## 6) Won / Lost
**Won Definition:** Policy bound/accepted.
**Lost Definition:** Deal closed-lost (with reason).

**Enter Won when:**
- Bind confirmation recorded.

**Enter Lost when:**
- Explicit decline, no-fit, unable to reach after full sequence, or competitor win.

**Required fields:**
- Outcome date
- Lost reason code (if Lost)
- Bound premium (if Won)

**Auto-actions:**
- Won: trigger onboarding/checklist
- Lost: move to nurture/reactivation pool if eligible

---

## Transition Rules (Guardrails)
- **New -> Contact Attempted**: only after outbound event logged.
- **Contact Attempted -> Engaged**: only on two-way interaction.
- **Engaged -> Quote Ready**: only when required intake complete.
- **Quote Ready -> Proposal Sent**: only when quote/proposal actually sent.
- **Proposal Sent -> Won/Lost**: only with explicit outcome event.

Disallowed shortcuts:
- New -> Quote Ready (without intake)
- Contact Attempted -> Proposal Sent (without engagement/intake)

---

## SLA Targets (Pilot)
- First response: <= 30 min (business hours)
- From Engaged -> Quote Ready: same day target
- From Quote Ready -> Proposal Sent: <= 24h
- Proposal follow-up: within 24–48h

---

## Ownership Model
- **Automation owner:** first-touch + follow-up attempts
- **CSR/Agent owner:** intake completion + data quality
- **Producer owner:** quoting/proposal/close

---

## Required Reason Codes (Lost)
- Price
- Coverage mismatch
- No response
- Timing
- Not eligible
- Chose competitor
- Duplicate/invalid lead

---

## Reporting KPIs
- New -> Contact Attempted conversion
- Contact Attempted -> Engaged conversion
- Engaged -> Quote Ready conversion
- Quote Ready -> Proposal Sent conversion
- Proposal Sent -> Won conversion
- Cycle time by stage
- Lost reason distribution

---

## Pilot Notes
- Keep statuses strict; avoid ad-hoc custom status proliferation.
- Weekly audit of records with missing required fields.
- Enforce compliance suppressions before every outbound action.
