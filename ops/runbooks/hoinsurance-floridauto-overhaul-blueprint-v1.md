# HOInsurance + FloridaAuto Website Overhaul Blueprint (v1)

## Objective
Rebuild `hoinsurance.com` and `floridauto.com` into modern, high-conversion lead engines with shared backend operations and distinct brand positioning.

## Strategy
- Keep brand-specific front ends (separate domains, messaging, audience hooks)
- Use one standardized intake/data pipeline behind both sites
- Optimize for quote starts, contact quality, and speed-to-follow-up

---

## 1) Site Roles

### hoinsurance.com
Primary role: homeowners/flood-forward acquisition site

Positioning:
- Florida homeowners insurance guidance + fast quote path
- Coverage clarity and confidence-first messaging

### floridauto.com
Primary role: auto-focused acquisition site

Positioning:
- Fast compare flow for Florida drivers
- savings + service clarity (without overpromising)

---

## 2) Required v1 Page Map (both sites)
1. Home
2. Get a Quote (primary conversion page)
3. Coverage pages (Home/Auto/Flood depending on domain)
4. About / Why Us
5. Contact
6. Privacy + Disclosures

Optional v1.1:
- FAQ
- Reviews/Testimonials
- Resources/Blog

---

## 3) Conversion Architecture

### Hero Section Formula
- Clear promise
- Short subhead
- Single primary CTA
- trust marker row (years in business, local team, multi-carrier)

### CTA Stack
- Primary: Start Quote
- Secondary: Call Now
- Tertiary: Text Us

### Form Rules
- Keep above-the-fold form short (step 1)
- Progressive profiling for non-essential fields
- Require only must-have fields for quote-ready handoff

---

## 4) Design Direction
- Mobile-first layout
- Strong contrast, clean typography, no clutter
- Real local imagery where possible
- 3-second clarity test: visitor must instantly understand offer + next step

Reference influence: modern insurance lead-gen style similar to high-performing competitive funnels.

---

## 5) Tracking + Attribution
- UTM-tagged links for every campaign
- Separate source/campaign tracking per domain
- Events to track:
  - landing view
  - CTA click
  - form start
  - form submit
  - call click

Weekly KPI set:
- CTR
- quote start rate
- quote submit rate
- cost per lead
- speed-to-first-contact

---

## 6) Operational Integration
- Route all leads into the same intake workflow (CD/QuoteRUSH)
- Apply lifecycle states consistently:
  New -> Contact Attempted -> Engaged -> Quote Ready -> Proposal Sent -> Won/Lost
- Exception queue for incomplete/malformed submissions

---

## 7) Build Plan (Fast)

### Phase 1 (2-3 days)
- Information architecture
- wireframes
- copy skeleton

### Phase 2 (2-4 days)
- page build + responsive QA
- form integration + tracking
- legal/disclosure checks

### Phase 3 (1-2 days)
- launch + smoke tests
- first optimization pass after real traffic

---

## 8) Immediate Next Actions
1. Confirm preferred stack for rebuild (Squarespace, Webflow, or custom)
2. Approve v1 messaging for each site
3. Approve final form fields
4. Launch hoinsurance.com first, then floridauto.com in parallel sprint

---

## Recommendation
Start with **BranchAgencySolutions.com** as the authority anchor, then run **hoinsurance.com** for fastest visible conversion gain, and reuse the framework for **floridauto.com** with auto-specific messaging.
