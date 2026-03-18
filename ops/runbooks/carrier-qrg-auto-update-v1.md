# Carrier QRG Auto-Update v1 Runbook

## Objective
Automatically detect and ingest carrier Quick Reference Guide (QRG) updates into Google Drive without manual re-upload, while preserving compliance, quality control, and auditability.

---

## 1) Scope
- **In scope:** Carrier QRG PDFs/docs, underwriting bulletins, appetite/reference docs tied to carrier access workflows.
- **Out of scope (v1):** Deep policy form parsing, OCR-heavy scanned images with poor quality, non-authorized source scraping.

---

## 2) Source of Truth
Use Google Drive as canonical storage.

### Folder Standard
`/Carriers/{CarrierName}/QRG/`

### Naming Convention
`{CarrierName}-QRG-{YYYY-MM-DD}-v{N}.pdf`

### Required Metadata (stored in index sheet + file description)
- Carrier name
- Source URL
- Last checked timestamp
- Last changed timestamp
- Previous hash
- Current hash
- Change summary
- Confidence score (high/medium/low)
- Approval status (auto-approved/manual-approved/rejected)

---

## 3) Architecture (v1)

## A) Carrier Registry
Single registry table (Google Sheet or JSON) with one row per carrier source.

Fields:
- `carrier_name`
- `source_type` (public_url | portal_url | drive_link)
- `source_url`
- `auth_required` (yes/no)
- `check_frequency` (daily | mon-thu | weekly)
- `destination_drive_folder_id`
- `parser_type` (pdf_text | html_text | mixed)
- `auto_approve_threshold` (e.g., 0.85)
- `owner`
- `enabled`

## B) Watcher Agent (scheduled)
Runs by cron and loops enabled rows:
1. Pull source content
2. Normalize text
3. Compute checksum/hash
4. Compare with last known hash
5. If unchanged: log + exit row
6. If changed: save new file, run diff summary, score confidence
7. Route by approval rules

## C) Diff + QA Agent
- Extract text from previous and current versions
- Produce concise “What changed” bullets
- Score confidence:
  - **High:** structure and key sections matched
  - **Medium:** partial extraction or moderate structural changes
  - **Low:** extraction noise, access issues, or major ambiguity

## D) Approval Router
- If confidence >= threshold and source is trusted: **auto-approve**
- Else: send to Todd for approval (Telegram/email)

## E) Notification Layer
- Daily digest of changed carriers
- Immediate alert for high-impact changes (major appetite/underwriting updates)

---

## 4) Scheduling

### Default cadence
- Tier 1 carriers (top volume): **daily 7:15 AM ET**
- Tier 2 carriers: **Mon/Thu 7:30 AM ET**
- Tier 3 carriers: **weekly Fri 8:00 AM ET**

### Retry policy
- Retry failed source fetch up to 3 attempts with backoff
- After 3 failures, mark row `needs_attention` and notify owner

---

## 5) Approval Rules

## Auto-approve when all are true:
- Source is trusted and stable
- Confidence >= threshold
- Change type is minor/moderate (format refresh, section updates)

## Manual approval required when any are true:
- Confidence low/medium below threshold
- Auth/session anomaly
- Large structure change (possible parsing mismatch)
- New source/domain not previously approved

---

## 6) Security & Compliance Guardrails
- Only monitor sources you are authorized to access.
- Store credentials in secure vault; never hardcode in scripts.
- Enforce least privilege for agent service account.
- Log every access/update event with timestamp and actor.
- Preserve previous versions for rollback/comparison.

---

## 7) Google Drive + Index Design

## Drive
- Canonical folder per carrier
- Archive subfolder optional: `/Archive/`

## Index Sheet tabs
1. **Registry** (carrier source config)
2. **Runs** (each check run + outcome)
3. **Changes** (only changed docs + summaries)
4. **Approvals** (pending/approved/rejected)

---

## 8) OpenClaw Cron Plan (v1)

## Job 1: `carrier-qrg-watch-daily`
- Runs Tier 1 registry rows
- Sends summary and approval-needed queue

## Job 2: `carrier-qrg-watch-mon-thu`
- Runs Tier 2 rows

## Job 3: `carrier-qrg-watch-weekly`
- Runs Tier 3 rows

## Job 4: `carrier-qrg-approval-digest`
- Daily digest of pending approvals + stale failures

---

## 9) Suggested Agent Responsibilities (Tool Split)
- **OpenClaw:** scheduling, orchestration, notifications, run logging
- **Manus:** extraction + normalization + diff quality improvements
- **Lindy:** approval workflow (approve/reject), reminder follow-ups
- **Loveable (optional):** dashboard for registry, run status, and approvals

---

## 10) v1 Deliverables Checklist
- [ ] Carrier registry created
- [ ] Drive folder map completed
- [ ] Hash/diff engine configured
- [ ] Approval thresholds defined
- [ ] Cron jobs created
- [ ] Daily digest enabled
- [ ] Failure alerting enabled
- [ ] Pilot with 5 carriers completed

---

## 11) Pilot Rollout (first 14 days)

### Days 1–3
- Configure 5 highest-priority carriers
- Validate source access + parser behavior

### Days 4–7
- Enable auto-detect + diff summaries
- Keep approvals manual for all changes

### Days 8–14
- Turn on auto-approve for high-confidence trusted sources
- Track false positives/negatives and tune thresholds

---

## 12) Success Metrics
- % carriers checked on schedule
- % changes detected correctly
- False positive rate
- Mean time from source change -> Drive update
- Manual approval load per week
- Failed run rate

---

## 13) Immediate Next Actions (for Todd + Henry)
1. Select first **5 carriers** for pilot.
2. Create/confirm Drive folder IDs for each.
3. Build initial registry sheet (carrier, source URL, cadence, owner).
4. Define confidence threshold (start at 0.85).
5. Decide approval channel (Telegram + daily email digest).
6. Launch 2-week pilot and tune.
