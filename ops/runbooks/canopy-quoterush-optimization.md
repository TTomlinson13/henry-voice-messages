# Canopy Connect → QuoteRUSH Optimization Runbook

## Objective
Maximize lead quality, speed-to-quote, and close rate by tightening the Canopy Connect to QuoteRUSH workflow.

---

## A) Intake & Mapping QA (Day 1)

1. Confirm required fields always map into QuoteRUSH:
   - Applicant name
   - DOB
   - Address/ZIP
   - Contact info (email/phone)
   - Vehicle/property details
   - Current carrier/policy dates (if collected)

2. Validate field formats:
   - Phone normalization
   - Date format consistency
   - Address standardization

3. Test 5 real-world scenarios:
   - New business auto
   - Homeowners rewrite
   - Multi-vehicle household
   - Condo/tenant
   - Partial/incomplete intake

---

## B) Lead Quality Controls (Day 1–2)

4. Duplicate prevention rules:
   - Match on email + phone + address
   - Flag probable duplicates for review queue

5. Missing-data flags:
   - Auto-tag "Needs Follow-up" when critical fields are missing

6. Source tagging:
   - Mark Canopy-origin leads in QuoteRUSH for performance tracking

---

## C) Workflow Speed (Day 2)

7. Auto-routing rules:
   - Route by line of business + state + producer queue

8. SLA timers:
   - First-touch alert at 10–15 minutes
   - Escalation if untouched at 30 minutes

9. Standard status flow:
   - New → Working → Quoted → Bound/Lost

---

## D) Producer/CSR Enablement (Day 2–3)

10. One-page SOP:
   - "What to check first when Canopy lead arrives"
   - "What to do if data is incomplete"
   - "When to call vs text vs email"

11. Templates:
   - Missing info follow-up script
   - Quote-ready confirmation script
   - "Need docs" checklist message

---

## E) Conversion Tracking (Weekly)

12. Track these KPIs by Canopy source:
   - Lead-to-quote %
   - Quote-to-bind %
   - Avg response time
   - Time-to-quote
   - Close rate by producer

13. Weekly review:
   - Top 3 blockers
   - Top 3 wins
   - 1 workflow tweak for next week

---

## F) Automation Opportunities (Phase 2)

14. Auto-create follow-up tasks when:
   - Lead incomplete
   - Quote not sent in X hours
   - Renewal window opens

15. Daily manager digest:
   - Canopy leads received
   - Worked/unworked
   - Overdue follow-ups
   - Binds won

---

## Scorecard Template (Weekly)

- Week of: __________
- Total Canopy leads: __________
- Leads worked within SLA: __________
- Lead-to-quote %: __________
- Quote-to-bind %: __________
- Avg response time: __________
- Time-to-quote: __________
- Top blocker: __________
- This week’s process change: __________
