# Insurance Commission Reconciliation System (v1)

## Objective
Create a repeatable, auditable reconciliation system for monthly commission activity across 100+ insurance carriers, reducing leakage, disputes, and manual rework.

---

## 1) Core Outcomes
- Match expected commissions vs carrier-paid commissions at policy level.
- Identify underpayments, overpayments, missing payments, and timing variances.
- Route exceptions to owners with clear next actions.
- Produce monthly close package for management.

---

## 2) Scope (v1)

### In Scope
- Monthly commission statement ingestion (carrier files/emails/portals)
- Policy-level matching logic
- Exception classification and queue
- Summary reporting by carrier/producer/LOB

### Out of Scope (v1)
- Full ERP accounting automation
- Complex retroactive compensation model redesign
- Real-time carrier API sync (where unavailable)

---

## 3) Data Sources
1. **Carrier commission statements** (PDF/CSV/XLS/email attachments/portal exports)
2. **Agency source of truth** (Client Dynamics/QuoteRUSH exports)
3. **Policy transaction feed** (new, renewal, endorsement, cancel)
4. **Commission schedule table** (expected split and rate by carrier/product/producer)

---

## 4) Canonical Data Model (Minimum Fields)

## Policy/Transaction Keys
- carrier_name
- policy_number
- insured_name
- effective_date
- transaction_type (new/renewal/endorsement/cancel)
- written_premium
- agency_commission_rate_expected
- expected_commission_amount
- producer_split
- producer_commission_expected

## Carrier Paid Fields
- statement_month
- carrier_paid_date
- carrier_paid_commission_amount
- carrier_statement_ref
- policy_number_paid
- transaction_code_paid

## Reconciliation Output Fields
- reconciliation_status (matched/variance/missing/overpaid/underpaid/timing)
- variance_amount
- variance_pct
- reason_code
- owner
- due_date
- resolution_notes

---

## 5) Matching Logic (v1)

## Step A: Exact Match
Match by:
- carrier + policy number + transaction month

## Step B: Fuzzy Assist (if exact fails)
Try by:
- insured name + effective date + premium band

## Step C: Variance Rules
- **Matched:** variance within tolerance (e.g., <= $5 or <=1%)
- **Underpaid:** paid < expected beyond tolerance
- **Overpaid:** paid > expected beyond tolerance
- **Missing:** expected exists, no carrier payment
- **Unexpected Paid:** payment exists without expected record
- **Timing Difference:** expected and paid cross month boundary

---

## 6) Exception Queue Design

### Priority
1. Missing payments > $1,000
2. Underpayment > $500
3. Cancel/rewrite anomalies
4. Producer split discrepancies

### Ownership
- Carrier dispute owner (ops)
- Producer owner (book context)
- Accounting owner (month-end close)

### SLA
- High priority exceptions: 2 business days
- Standard exceptions: 5 business days

---

## 7) Monthly Operating Cadence

### Week 1 (Statement Intake)
- Ingest all available carrier statements
- Run first pass reconciliation

### Week 2 (Exception Handling)
- Work priority queue
- Open carrier tickets/disputes where needed

### Week 3 (Resolution + Rerun)
- Apply resolutions/adjustments
- Rerun reconciliation

### Week 4 (Close + Reporting)
- Final variance rollup
- Producer/carrier summary
- CFO/owner close packet

---

## 8) Reporting (Must-Have)
- Reconciliation rate (% matched)
- Net variance ($ and %)
- Missing commission by carrier
- Under/over payment trend by carrier
- Open exception aging
- Producer variance summary

---

## 9) Controls & Auditability
- Preserve original statements in immutable archive
- Log transformation/mapping steps
- Keep change history on resolved exceptions
- Role-based approval for write-offs/adjustments

---

## 10) Implementation Plan (Phased)

## Phase 1 (2–4 weeks): Foundation
- Build canonical schema
- Ingest top 20 carriers by volume
- Run monthly reconciliation prototype

## Phase 2 (4–8 weeks): Scale
- Expand to 100+ carriers
- Add fuzzy match and exception SLA routing
- Standardize dispute templates

## Phase 3 (8–12 weeks): Optimization
- Add dashboard and trend analytics
- Add automated alerts for high-value misses
- Add scorecard by carrier accuracy/timeliness

---

## 11) Suggested Tooling Pattern
- Intake automation: email/portal fetch jobs
- Transformation: parsing + normalization pipeline
- Storage: structured reconciliation table
- Workflow: Kanban exception board (matched/exception/in dispute/resolved)
- Delivery: daily ops digest + monthly close packet

---

## 12) Day-1 Pilot Checklist
- [ ] Pick top 10 carriers by commission volume
- [ ] Define expected commission schedule table
- [ ] Export prior 2 months of policy transactions
- [ ] Load carrier statements for same period
- [ ] Run first match and produce exception queue
- [ ] Validate top 25 exceptions manually
- [ ] Tune tolerance thresholds
- [ ] Publish first management summary

---

## 13) Success Metrics (90-Day)
- >=90% policy-level match rate on top 20 carriers
- <=5 business days median exception resolution time
- >=50% reduction in manual reconciliation hours
- Measurable recovery of missed commissions
