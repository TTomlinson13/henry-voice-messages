# Client Dynamics Kanban SLA Card (Homeowner Pilot)

## Board Columns
1. New
2. Contact Attempted
3. Engaged
4. Quote Ready
5. Proposal Sent
6. Won/Lost

---

## WIP Limits (Starting Values)
- **New:** 40
- **Contact Attempted:** 60
- **Engaged:** 35
- **Quote Ready:** 25
- **Proposal Sent:** 20
- **Won/Lost:** Unlimited archive

> Tune WIP limits after 2 weeks of real lead volume and conversion data.

---

## SLA Timers + Color Rules

## 1) New
- **SLA:** First touch within 30 minutes (business hours)
- **Green:** <15 min
- **Yellow:** 15–30 min
- **Red:** >30 min

## 2) Contact Attempted
- **SLA:** Next follow-up within 24 hours
- **Green:** <12h
- **Yellow:** 12–24h
- **Red:** >24h

## 3) Engaged
- **SLA:** Move to Quote Ready same day
- **Green:** same day
- **Yellow:** +1 day
- **Red:** >1 day

## 4) Quote Ready
- **SLA:** Proposal prep/send within 24 hours
- **Green:** <12h
- **Yellow:** 12–24h
- **Red:** >24h

## 5) Proposal Sent
- **SLA:** Follow-up within 48 hours
- **Green:** <24h
- **Yellow:** 24–48h
- **Red:** >48h

## 6) Won/Lost
- **SLA:** N/A (final state)
- **Rule:** Outcome fields required

---

## Required Stage-Gate Fields
- **Contact Attempted:** channel + attempt timestamp
- **Engaged:** last response timestamp + next action date
- **Quote Ready:** required intake fields complete
- **Proposal Sent:** proposal sent timestamp + reference
- **Lost:** reason code required

---

## Suggested Lost Reason Codes
- Price
- Coverage mismatch
- No response
- Timing
- Not eligible
- Chose competitor
- Duplicate/invalid lead

---

## Daily Operator Checklist
- [ ] Clear all red cards first
- [ ] Reassign stale cards lacking owner
- [ ] Validate stage-gate fields before moving cards
- [ ] Verify DNC/TCPA/quiet-hours suppression on outbound steps
