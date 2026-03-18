# Insurance Commission Reconciliation — Buy vs Build Scorecard

## Decision Goal
Select the best path to launch a reliable commission reconciliation capability for Tomlinson & Co (100+ carriers) with measurable ROI in 90 days.

---

## Options Compared
- **Option A: Buy (single vendor platform)**
- **Option B: Build in-house (Manus/OpenClaw/Lindy + internal workflow stack)**
- **Option C: Hybrid (buy for ingestion + build internal exception workflow/reporting)**

---

## Weighted Criteria (100 points total)

| Criterion | Weight | Why it matters |
|---|---:|---|
| Carrier format coverage | 15 | 100+ carriers means ingestion breadth is critical |
| Match accuracy + rules flexibility | 15 | Policy-level trust determines adoption |
| Exception workflow quality | 12 | Recovery depends on fast, assignable exception handling |
| Split/override complexity support | 10 | Producer compensation integrity |
| Integrations (CD/QuoteRUSH/Drive/Email) | 10 | Must fit existing operating stack |
| Time-to-value | 10 | Need operational gains quickly |
| Total cost of ownership (12 months) | 10 | Budget discipline vs hidden effort |
| Reporting + auditability | 8 | Management visibility + controls |
| Security/compliance posture | 5 | Data and access governance |
| Portability/vendor lock risk | 5 | Exit options and data ownership |

---

## Scoring Scale
- 1 = poor
- 3 = acceptable
- 5 = strong

Weighted Score = (Score / 5) * Weight

---

## Initial Scorecard (Draft)

| Criterion | Weight | Buy | Build | Hybrid |
|---|---:|---:|---:|---:|
| Carrier format coverage | 15 | 4 | 2 | 4 |
| Match accuracy + rules flexibility | 15 | 3 | 4 | 4 |
| Exception workflow quality | 12 | 3 | 4 | 5 |
| Split/override support | 10 | 4 | 3 | 4 |
| Integrations fit | 10 | 3 | 5 | 4 |
| Time-to-value | 10 | 4 | 2 | 4 |
| 12-mo TCO | 10 | 2 | 4 | 3 |
| Reporting + auditability | 8 | 4 | 4 | 5 |
| Security/compliance | 5 | 4 | 3 | 4 |
| Portability/lock risk | 5 | 2 | 5 | 4 |
| **Total (out of 100)** |  | **66.4** | **70.4** | **84.0** |

---

## Interpretation
- **Hybrid currently scores best**: fastest practical path without giving up control.
- **Build-only** can win long-term but slower first value.
- **Buy-only** can launch quickly but may create lock-in and integration compromises.

---

## Recommendation (Current)
### Choose **Hybrid** for v1-v2
1. Use vendor capabilities for high-friction ingestion/parsing where they are strongest.
2. Keep exception queue, workflow routing, and management reporting in your internal stack.
3. Preserve normalized internal data model so you can swap vendors later.

---

## 90-Day Plan by Option

## If Hybrid (recommended)
- **Days 1–14:** Pilot top 10–20 carriers with clear match/variance metrics
- **Days 15–45:** Add exception routing + owner SLA + dispute templates
- **Days 46–90:** Expand to majority carrier volume; publish weekly recovery dashboard

## If Build-only
- **Days 1–30:** Ingestion + canonical schema + exact match
- **Days 31–60:** Fuzzy match + exception Kanban + reporting
- **Days 61–90:** Scale carrier coverage + optimize recovery workflow

## If Buy-only
- **Days 1–14:** Vendor onboarding + data mapping
- **Days 15–45:** Validate match rates + split logic + exception handling
- **Days 46–90:** Lock governance + exit/data export safeguards

---

## Vendor Due Diligence Questions (Use in demos)
1. What policy-level match rate do clients achieve at 30/60/90 days?
2. How do you handle carrier statement format drift over time?
3. Can we customize tolerance and reason-code logic per carrier?
4. How are producer splits/overrides versioned and audited?
5. What are full export options (raw + normalized + audit logs)?
6. What implementation support is included vs paid add-on?
7. Can we keep our own exception workflow while using your ingestion layer?
8. Contract: term, auto-renewal, overages, termination, data return SLA?

---

## KPI Benchmarks to Track (avoid marketing fluff)
- Policy-level match rate
- Net variance recovered ($)
- Exception aging (median days)
- Manual hours reduced
- Close-cycle time reduction
- Carrier dispute win rate

---

## Final Decision Gate
Proceed with selected path only if pilot meets:
- >=85% policy-level match on pilot carriers
- <=5 business days median exception resolution
- Demonstrable monthly recovery value
- Acceptable 12-month TCO and operational fit
