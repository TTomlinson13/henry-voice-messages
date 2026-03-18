# ACORD 125 Pilot Run #1 Playbook

## Goal
Execute first-pass mapping on 10 pilot records and produce a decision-ready quality scorecard.

## Inputs
- `ops/ACORD-125-PILOT-INTAKE-SHEET-TEMPLATE.csv`
- `ops/ACORD-125-PILOT-CANDIDATES-PULL-2026-02-17.csv`
- `ops/ACORD-125-PILOT-RUN-1-SCORECARD.csv`

## Run Sequence
1) Classify each pilot record:
- clean
- missing-fields
- edge/duplicate

2) Run mapping v0.1 for ACORD 125 fields.

3) Score each pilot:
- required_fields_complete_pct
- mapping_confidence_score
- manual_corrections_count
- exception_count

4) Apply Quote-Ready gate:
- pass if required fields present and no critical conflict
- fail -> exception with owner

5) Maria review:
- approve / revise / reject
- capture review_time_minutes

## Exception Codes (v1)
- MISSING_REQUIRED
- INVALID_FORMAT
- CONFLICTING_VALUES
- DUPLICATE_RECORD
- OUT_OF_SCOPE

## Output Targets
- First-pass quote-ready rate >= 70%
- Avg mapping confidence >= 0.80
- Avg review time <= 15 min per record

## Immediate Next
After run #1, tune top 3 recurring exception patterns and publish mapping v0.2.
