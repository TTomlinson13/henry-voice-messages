# 8x8 VCC Decision One-Pager

## Decision Needed
Proceed with VCC licensing now vs delay and use fallback non-VCC workflow.

## Why VCC Matters
- Enables webhook/event access for call automation
- Required for reliable inbound call-event ingestion
- Unlocks faster workflow automation in Mission Control/CD

## Buy Now (Pros)
- Full Mode A inbound event architecture becomes production-ready
- Less manual monitoring
- Better daily reconciliation quality
- Faster expansion to outbound/advanced automations later

## Delay (Cons)
- Manual workaround remains
- Lower call-event visibility
- Slower ops execution and more exceptions

## Decision Threshold
Approve VCC now if all are true:
1. Monthly license cost is within budget tolerance
2. Setup turnaround <= 2 weeks
3. Required admin access is confirmed in writing

## Fallback Path (If Delayed)
- Keep inbound-only manual triage
- Daily exception queue in CD
- Reassess after 30 days with measured operational drag

## Next Step for 8x8 Account Manager Call
Request in writing:
1. Exact VCC SKU + monthly cost
2. Required permissions and setup steps
3. ETA from purchase to webhook-ready
4. Any term commitment or early termination constraints
