# Intent Taxonomy (Insurance Ops)

Use this taxonomy for inbox + phone-call transcript classification.

## Priority Bands
- **P0 Critical:** immediate client risk, cancellation same-day, claim emergency, legal/regulatory threat.
- **P1 High:** coverage gap risk, binding deadline today, lender/doc deadline, billing cancellation warning.
- **P2 Normal:** standard service requests, quote follow-up, endorsements, COI requests.
- **P3 Low:** newsletters, vendor promos, non-action FYI.

## Core Intents

### Service / Account Management
1. **COI Request**
   - Required fields: insured name, holder name, holder address/email, additional insured wording, deadline.
2. **Policy Document Request** (Dec page, policy copy, ID card)
   - Required fields: client identity + policy identifier.
3. **Endorsement Change** (driver/vehicle/property updates)
   - Required fields: policy, requested change, effective date.
4. **Billing/Payment Question**
   - Required fields: policy/account number, carrier/bill source, issue summary.
5. **Cancellation Warning / Non-Pay**
   - Required fields: cancellation date/timezone, reinstatement terms if present.

### Sales / New Business
6. **New Quote Request**
   - Required fields: prospect contact, line of business, property/risk basics, target effective date.
7. **Quote Follow-Up**
   - Required fields: quote id/version, open questions, decision date.
8. **Renewal Shopping Request**
   - Required fields: renewal date, current carrier, loss history if available.

### Claims / Escalation
9. **Claim Status Inquiry**
   - Required fields: claim number, insured, date of loss.
10. **Urgent Loss Event**
   - Required fields: contact callback, location, event time, immediate safety concerns.
11. **Complaint / Legal Threat**
   - Required fields: complainant identity, complaint summary, any regulator/legal references.

### Internal / Ops
12. **Carrier/Broker Partner Request**
13. **Accounting/Commission Inquiry**
14. **Vendor/Marketing Noise**

## Routing Defaults
- P0/P1 -> human owner + immediate alert
- P2 -> draft queue (human approval unless approved L2 flow)
- P3 -> archive/summarize only

## Do-Not-Auto-Send Conditions (global)
- Legal/regulatory language ("attorney", "DFS", "complaint", "bad faith", "lawsuit")
- Ambiguous identity or missing required fields
- Coverage interpretation/dispute
- Cancellation disputes
- Any uncertainty about policyholder authorization
