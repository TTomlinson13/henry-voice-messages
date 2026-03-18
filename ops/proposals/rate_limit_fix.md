# Rate Limit Hardening Proposal
**Date:** 2026-03-18
**Status:** Draft

## 1. The Root Cause
The `API rate limit reached` error is triggered by the **Tokens Per Minute (TPM)** limit (500,000 TPM for this Org), not just the number of requests.
*   **Current State:** Cron jobs run in the `main` session.
*   **Context Payload:** Each runs carries the full main session history (~230k tokens).
*   **The Math:** 2 concurrent jobs = 460k tokens. A 3rd job or a user message spikes over 500k. Boom.

## 2. The Fix: Lean Contexts (High Impact)
**Strategy:** Move polling/background tasks from `main` to `isolated` session targets.
*   **Impact:** Request size drops from ~230k tokens to ~2k-5k tokens.
*   **Result:** You can run ~50 concurrent checking jobs without hitting the rate limit.

**Proposed Patches (Cron Config):**

| Job Name | Current Target | New Target | Action |
| :--- | :--- | :--- | :--- |
| `second-brain-overdue-alert` | `main` | `isolated` | **Update** |
| `mission-control-snapshot` | `main` | `isolated` | **Update** |
| `homeowner-lead-pilot-*` | `main` | `isolated` | **Update** |
| `daily-weather-*` | `main` | `isolated` | **Update** |

*Note: Isolated sessions start fresh. They can still read files (`PROJECTS.md`, etc.), but they won't "remember" the last chat you had unless you write it to a file.*

## 3. Backoff Strategy (Backstop)
If bursts still occur (e.g. during heavy complex reasoning tasks), execute this retry logic:

**Backoff Table:**
| Attempt | Delay | Jitter (Random) | Purpose |
| :--- | :--- | :--- | :--- |
| 1 (429 Error) | 2 sec | ±500ms | Immediate transient glitch |
| 2 | 5 sec | ±1 sec | Short buffer |
| 3 | 15 sec | ±3 sec | Clear queue congestion |
| 4 | 45 sec | ±5 sec | Major backoff |
| 5 | **Fail** | - | Stop cascading failure |

## 4. Priority Queue (Conceptual)
To protect user output:
1.  **User Interactive Messages:** Priority 1 (Always Main Session).
2.  **Critical Alerts (Inbox/Server):** Priority 2 (Isolated Session).
3.  **Background Summaries (Weather/Daily):** Priority 3 (Isolated Session + Staggered).

**Implementation Plan:**
1.  Run the cron updates to switch checking tasks to `isolated`.
2.  Verify the prompt text in those jobs is self-contained (e.g., "Read ops/PROJECTS.md and check for..." instead of "Check what we talked about").
