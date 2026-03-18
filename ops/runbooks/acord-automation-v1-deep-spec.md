# Commercial Intake-to-ACORD Automation (v1 Deep Spec)

## Objective
Build a production-ready v1 system that converts commercial client intake into review-ready ACORD forms with high data quality, clear exception handling, and full auditability.

Initial form scope:
- ACORD 125 (Commercial Insurance Application)
- ACORD 126 (Commercial General Liability Section)
- ACORD 140 (Property Section)

---

## 1) Product Scope and Non-Negotiables

### In Scope (v1)
- Intake capture (web form + document upload + optional email ingestion)
- Canonical data model for commercial submission data
- Mapping engine from canonical model to ACORD field set
- Prefill output package for 125/126/140
- Human QA/review workflow (Maria/team approval)
- Exception queue for missing/conflicting fields
- Export package + activity/audit logs

### Out of Scope (v1)
- Full carrier appetite recommendation engine
- Fully autonomous bind workflow
- E-sign/package automation beyond prefill outputs

### Non-Negotiables
- No form leaves review without human approval
- Required fields enforced before “Quote Ready”
- Every transformation is traceable (audit log)

---

## 2) Required Canonical Data Model

## A) Account-Level (Insured)
- account_id
- legal_name
- dba_name
- fein
- years_in_business
- website
- naics_code
- operations_description
- contact_name
- contact_title
- email
- mobile
- mailing_address

## B) Location-Level
- location_id
- location_address
- occupancy_type
- construction_type
- year_built
- square_footage
- protection_class
- sprinklered (yes/no)
- burglar_alarm (yes/no)
- fire_alarm (yes/no)

## C) Exposure-Level
- annual_revenue
- payroll_total
- employee_count
- subcontractor_costs
- gross_sales_split (if needed)
- prior_carrier
- prior_premium
- requested_effective_date

## D) Loss/Claims
- claims_5yr_count
- claims_5yr_total_paid
- open_claims_count
- claim_detail_items[] (date, cause, paid/incurred)

## E) Coverage Intent
- lines_requested (GL, Property, etc.)
- limit_preferences
- deductible_preferences
- additional_insured_requirements
- certificate_requirements

## F) Producer/Workflow Meta
- lead_source
- owner_user
- intake_completed_at
- confidence_score
- missing_fields[]
- exception_flags[]

---

## 3) Form Mapping Tables (v1)

## ACORD 125 Core Mapping (examples)
- Canonical `legal_name` -> ACORD 125 Applicant Name
- `mailing_address` -> Mailing Address block
- `naics_code` + `operations_description` -> Business Description / Classification
- `years_in_business` -> Yrs in Business
- `requested_effective_date` -> Proposed Effective Date
- `prior_carrier` / `prior_premium` -> Prior Coverage section

## ACORD 126 Core Mapping (examples)
- `lines_requested` includes GL -> enable 126 section
- `annual_revenue`, `payroll_total`, `employee_count` -> exposure basis fields
- `claims_5yr_*` + claim_detail_items -> Loss History fields
- `subcontractor_costs` -> subcontractor exposure fields
- `additional_insured_requirements` -> AI/COI section inputs

## ACORD 140 Core Mapping (examples)
- `location_*` -> Location schedule blocks
- `construction_type`, `occupancy_type`, `year_built`, `square_footage` -> property details
- `sprinklered`, `fire_alarm`, `burglar_alarm` -> protection details
- deductible/limit preferences -> requested terms

Note: Maintain mapping table as versioned config (YAML/JSON), not hardcoded logic.

---

## 4) Intake Requirements (Quote-Ready Gate)

Minimum required for Quote Ready:
1) Legal insured name
2) Primary contact + email/phone
3) Operations description + NAICS (or class code proxy)
4) Revenue + payroll
5) At least one location with address and occupancy/construction basics
6) Requested effective date
7) Prior carrier/premium (or explicit unknown flag)
8) Basic 5-year loss summary (or no-loss attestation)

Gate rule:
- If any required field missing -> status remains Engaged, create exception task.

---

## 5) QA and Confidence Rules

## Confidence Scoring
- Start score at 1.0
- Deduct for each missing required field
- Deduct for contradictory values (e.g., payroll present, employee count = 0)
- Deduct for low-quality document extraction

Bands:
- High: >=0.90 (fast review)
- Medium: 0.75–0.89 (standard review)
- Low: <0.75 (manual rebuild required)

## Validation Rules (examples)
- FEIN format check
- Effective date not in past unless renewal flow
- Revenue/payroll non-negative and reasonable ranges
- Location addresses valid format
- Claims totals align with claim items

## Review Checklist
- Field completeness
- Exposure consistency
- Coverage intent captured
- Loss narrative adequacy
- Producer notes added

---

## 6) Exception Queue Design

Exception categories:
- Missing required data
- Conflicting values
- Mapping ambiguity
- Unsupported document format
- Carrier-specific requirement missing

Routing:
- CSR/Intake owner -> data completion
- Maria -> commercial underwriting quality review
- Producer -> final coverage strategy decisions

SLA:
- High-severity missing data: same business day
- Standard exceptions: within 24 hours

---

## 7) Workflow States and Triggers

Lifecycle alignment:
- New -> Contact Attempted -> Engaged -> Quote Ready -> Proposal Sent -> Won/Lost

Automation triggers (v1):
1) Intake completed event -> run validation + mapping
2) If Quote Ready -> create ACORD package + assign review task
3) If exceptions -> create task + send missing-data request template
4) Review approved -> export package + notify producer queue

---

## 8) Output Package Specification

For each submission, generate:
- Prefilled ACORD 125 PDF (or structured payload)
- Prefilled ACORD 126 PDF
- Prefilled ACORD 140 PDF
- Missing/assumption report
- Submission summary sheet (key exposures + notes)

Naming convention:
`{AccountName}-{YYYYMMDD}-ACORD-PACK-v{N}`

Storage:
- Canonical folder by account/year in Drive/CD document storage
- Immutable copy of original source docs

---

## 9) Security, Compliance, and Audit

- Role-based access (intake vs reviewer vs producer)
- PII minimization in notifications
- Audit log entries for:
  - source ingest
  - field transforms
  - manual edits
  - approvals/exports
- Retention policy for source and generated artifacts

---

## 10) Implementation Plan (Manus + Team)

## Phase 1 (Week 1-2)
- Finalize canonical schema
- Build 125 mapping + validator
- Stand up exception queue
- Pilot with 10 real submissions

## Phase 2 (Week 3-4)
- Add 126 + 140 mappings
- Improve extraction quality/rules
- Add review dashboard + confidence sorting

## Phase 3 (Week 5-6)
- Tighten workflow automation in CD/QuoteRUSH
- Add carrier-specific requirement templates
- Expand pilot volume and measure KPIs

---

## 11) KPI Targets (First 60 Days)
- >=85% submissions reach review-ready in first pass
- <=24h median exception resolution time
- >=50% reduction in manual rekey time
- >=90% reviewer satisfaction on data completeness

---

## 12) Immediate Next Actions
1) Confirm field dictionary with Maria for commercial quoting reality
2) Lock required vs optional fields list for Quote Ready gate
3) Build mapping config v0.1 (125 first)
4) Run first 10-file pilot and tune exceptions
5) Publish weekly quality scorecard
