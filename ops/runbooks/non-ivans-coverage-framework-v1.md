# Non-IVANS Coverage Framework v1

## Objective
Create a single daily operating view that combines IVANS and non-IVANS carrier activity so policy status, renewals, and transaction visibility are reliable across all carriers.

## Why This Is Needed
Current reality: only ~25-35% of carriers reliably update through IVANS. If we rely only on IVANS, we miss a large portion of policy movement and create false confidence.

---

## 1) Source-of-Truth Model
Use a **multi-source hierarchy**, not a single feed.

### Signal Tiers
1. **Tier 1 (High confidence):** Direct carrier confirmation (download file, portal evidence, issued policy docs)
2. **Tier 2 (Medium confidence):** IVANS transaction confirmations
3. **Tier 3 (Low confidence):** CRM/manual notes without supporting artifact

### Record-Level Status Labels
- Verified via Carrier (Tier 1)
- Verified via IVANS (Tier 2)
- Pending Non-IVANS Confirmation
- Exception: Missing Update

---

## 2) Daily Monitoring Architecture

## Feed A: IVANS Lane
- Failed transactions
- Canceled transactions
- Processed summary
- Timestamp + policy key mapping

## Feed B: Non-IVANS Lane
- Carrier portal download logs
- Carrier email docs (decs, binders, cancellation notices)
- Manual upload queue (for broker/carrier docs)
- QuoteRUSH/CD policy-change events where available

## Merge Logic
- Normalize by policy number + named insured + effective date
- Prefer Tier 1 over Tier 2 when conflicting
- Flag unresolved mismatches to exception queue

---

## 3) Daily Dashboard (Operational View)

### Section A: Verified Today
- Count of updates verified via carrier
- Count of updates verified via IVANS

### Section B: Pending Confirmation
- Policies with expected update but no Tier 1 evidence yet
- Aging buckets: <24h, 24-48h, >48h

### Section C: Exceptions Requiring Action
- Failed/canceled IVANS items
- Non-IVANS carriers with missing daily evidence
- Conflicts (IVANS says X, carrier artifact says Y)

### Section D: SLA Snapshot
- % verified within 24h
- % unresolved >48h
- By carrier and by line of business

---

## 4) Team Workflow

## Roles
- **Ops/CSR queue owner:** first-pass triage
- **Commercial reviewer (Maria):** underwriting-critical exceptions
- **Producer owner:** client-facing decision/escalation

## Daily Cadence
1) Morning: ingest and normalize both feeds
2) Midday: clear high-severity exceptions
3) EOD: unresolved list + owner assignment for next day

## SLA Targets (v1)
- High severity exceptions: same business day
- Standard exceptions: within 24h
- Aged >48h unresolved: mandatory escalation

---

## 5) Carrier Segmentation Strategy

### Segment 1: IVANS-Reliable Carriers
- Default auto-monitoring
- Minimal manual effort

### Segment 2: Partial-IVANS Carriers
- Hybrid checks (IVANS + portal/email validation)

### Segment 3: Non-IVANS Carriers
- Mandatory non-IVANS collection path
- Scheduled portal/email reconciliation

Maintain this mapping list as a living table and review monthly.

---

## 6) Data Model Additions (for CD/QuoteRUSH tracking)
Required fields to add/update per policy record:
- source_primary (carrier|ivans|manual)
- source_confidence (tier1|tier2|tier3)
- source_last_verified_at
- verification_artifact_link
- exception_code
- exception_owner
- exception_due_at
- sla_bucket

---

## 7) Automation Rules (v1)
1. If no Tier 1 artifact after expected update window -> set **Pending Non-IVANS Confirmation**
2. If unresolved >24h -> create task + assign owner
3. If unresolved >48h -> escalate to management queue
4. If conflict detected between feeds -> set **Exception: Data Conflict** and block auto-close

---

## 8) Reporting Outputs
Send daily summary to: **orlando@usicna.com**

Include:
- Verified counts by source
- Exception counts by type
- Top aged unresolved items
- Carrier breakdown (IVANS vs non-IVANS coverage)

---

## 9) Implementation Plan (2 Weeks)

### Week 1
- Define carrier segmentation table
- Add source-confidence fields
- Build merged daily report draft
- Start manual exception queue

### Week 2
- Add automation rules for aging/escalation
- Launch daily summary email output
- Review KPI baseline and tune thresholds

---

## 10) KPI Targets (First 30 Days)
- Increase verified daily visibility to >80% of total policy movement
- Reduce unresolved >48h exceptions by 40%
- Achieve 95% exception ownership assignment within same day

---

## Immediate Next Actions
1) Build carrier segmentation sheet (IVANS-reliable / partial / non-IVANS)
2) Add source-confidence fields to tracking workflow
3) Launch daily merged summary to `orlando@usicna.com`
4) Begin exception aging SLA tracking tomorrow
