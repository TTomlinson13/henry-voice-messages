# QuoteRUSH Lifecycle Status Spec v1

**Date:** 2026-02-18
**Owner:** Henry (for Todd)

## Status Flow (in order)
1. New
2. Contact Attempted
3. Engaged
4. Quote Ready
5. Proposal Sent
6. Bound (Won)
7. Lost

## Stage Definitions

### 1) New
- **Entry:** Lead created/imported.
- **Required fields:** Lead source, name, one contact method (phone or email), line of business.
- **Exit:** First outbound attempt is logged.

### 2) Contact Attempted
- **Entry:** At least one outbound call/text/email attempt.
- **Required fields:** Attempt timestamp, channel, owner.
- **Exit to Engaged:** Prospect responds two-way.

### 3) Engaged
- **Entry:** Prospect in active conversation.
- **Required fields:** Need summary and next-step date.
- **Exit to Quote Ready:** Minimum intake complete.

### 4) Quote Ready
- **Entry criteria (required):**
  - Named insured
  - Risk/property address
  - Coverage type and basic limits target
  - Effective date target
  - Loss history answer (or explicit pending note)
  - Consent to contact
- **Exit:** At least one valid quote/proposal generated.

### 5) Proposal Sent
- **Entry:** Proposal/quote delivered.
- **Required fields:** Sent timestamp, premium, carrier/options, follow-up date.
- **Exit to Bound:** Acceptance + bind/payment confirmation.
- **Exit to Lost:** Decline/no-fit after follow-up sequence.

### 6) Bound (Won)
- **Entry:** Coverage bound/issued.
- **Required fields:** Carrier, policy number (or pending note), effective date, premium.
- **Post-action:** Handoff to service/onboarding workflow.

### 7) Lost
- **Entry:** Opportunity no longer moving forward.
- **Required fields:** Lost reason code, date, notes.
- **Post-action:** Optional recycle/nurture tag.

## SLA Color Rules (active stages)
Apply to New, Contact Attempted, Engaged, Proposal Sent:
- **Green:** touched within 24h
- **Yellow:** 24–72h without activity
- **Red:** >72h without activity

## Standard Lost Reason Codes
- Price
- Coverage mismatch
- Ineligible risk
- No response
- Went with competitor
- Timing/budget
- Duplicate/not real lead
- Other (note required)

## Implementation Notes
- Keep this as v1 baseline and tune after 2 weeks of live usage.
- Report weekly by stage count, aging, win/loss conversion, and top lost reasons.
