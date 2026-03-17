---
name: universal-atlasbridge-policy
description: Open Universal/AtlasBridge policy notifications from Gmail, launch the AtlasBridge portal, and retrieve the referenced client policy/documents. Use when emails from donotreply@universalproperty.com indicate new agency mail and you need fast policy lookup, download, and handoff notes for servicing staff.
---

# Universal AtlasBridge Policy Retrieval

## Quick workflow

1. Find the target Universal alert email in Gmail.
2. Extract client/policy clues from subject/snippet and message timing.
3. Open AtlasBridge and log in.
4. Search policy by policy number (preferred) or insured name.
5. Open the policy/file package and collect key details.
6. Return a concise handoff summary (what was found + what to do next).

## Steps

### 1) Pull the right email first

Use `gog` to isolate the newest relevant alert:

```bash
gog gmail messages search "from:donotreply@universalproperty.com subject:(New agency mail available on atlasbridge.com) in:inbox" --max 20 --json
```

If a policy number is present in message metadata/body, use that as the primary lookup key.

### 2) Launch AtlasBridge

Use browser automation and keep all actions in the same tab.

- Open login page: `https://atlasbridge.com` (or the tenant URL in the email)
- Authenticate with agency credentials
- Wait for dashboard load before searching

### 3) Retrieve the policy/documents

Search order:

1. Policy number
2. Named insured
3. Effective date + insured (fallback)

Open the matching account/policy and capture:

- Policy number
- Named insured
- Effective/expiration dates
- Product/line (HO, DP, etc.)
- Any pending tasks, notices, cancellations, or underwriting requests
- Document names downloaded/viewed

### 4) Produce handoff summary

Return a short operations-ready summary:

- **Client/Policy:**
- **Status:** active/pending/cancel risk/underwriting follow-up
- **New docs/tasks:**
- **Deadline or SLA risk:**
- **Recommended next step:**

## Guardrails

- Never guess policy identity when multiple close matches exist; ask for confirmation.
- Prefer portal data over email assumptions.
- If login fails or session expires, report exactly where it failed.
- Redact sensitive personal data unless explicitly requested for internal processing.
- Do not send external messages without explicit approval.

## Fallback

If AtlasBridge is unavailable:

1. Save the failed step (URL/page/action).
2. Capture the target policy clues from email.
3. Return a blocker summary + exact retry action for staff.
