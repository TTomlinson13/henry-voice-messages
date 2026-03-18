# Exa Trial Lane (Fast Research Path)

## Goal
Stand up a fast research lane for agent tasks (competitor scans, carrier intel, lender screening) and compare against current workflow.

## Scope (Phase 1)
- Provider: Exa Instant
- Use cases:
  1) Competitor/market scans
  2) Lender credibility checks
  3) Carrier/news research
- Success criteria:
  - Faster end-to-end research cycle
  - Equal or better relevance/quality

## Required Setup
1. Create/confirm Exa account.
2. Generate API key.
3. Add env variable:
   - `EXA_API_KEY=...`

## Quick Test Prompts
- "Top Florida homeowners insurance ad competitors this week"
- "Credibility screen for paylessfunding.net"
- "Recent updates on Exa Instant launch"

## Measurement
Track per run:
- Query latency
- Result relevance (1-5)
- Source quality (1-5)
- Decision usefulness (1-5)

## Decision Rule
Adopt Exa lane as default for research tasks if:
- Median latency improves by >=30%, and
- Quality score is >= current lane on average.

## Next Actions
- Add API key
- Run 10-query benchmark set
- Publish green/yellow/red recommendation
