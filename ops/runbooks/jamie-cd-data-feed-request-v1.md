Subject: Request to Enable CD Data Feed for Daily Ops Automation (No Browser Dependency)

Hi Jamie,

We’re moving CD monitoring/ops checks to a data-feed model so we’re not dependent on browser relay sessions.

Can you help us stand up one of these access paths (in order of preference):

1) API access (preferred)
- Read access for contacts, policies, tasks, pipeline stages, messages, and status fields
- Ability to filter by updated date/time and status
- Endpoint auth details + rate limits

2) Scheduled report export (CSV/JSON)
- Automated exports at 5:30 AM, 11:30 AM, 6:00 PM ET
- Files delivered to a secure location (SFTP/Drive/shared endpoint)
- Include: pipeline stage counts, stale items aging, overdue tasks, cancellation/non-pay indicators, quote/proposal/bound status fields

3) Webhook/event feed
- Events for status changes (lead stage updates, policy status updates, cancellation/non-pay signals, task updates)
- Payload schema + retry behavior

Minimum fields requested (v1):
- Contact ID, Name, Owner, Source, Last Activity Date
- Pipeline Stage, Stage Entered Date, Current SLA/Aging
- Task ID, Due Date, Status, Assigned To
- Policy Number, Line, Carrier, Effective/Expiration, Policy Status
- Cancellation/Non-pay indicator fields (if available)
- Quote/Proposal Sent Date, Bound Date, Lost Reason

Business goal:
- Reliable CD health checks and daily action queues without tab-attach dependency
- Cleaner daily priorities for Todd + team

If helpful, we can do a quick 20-minute working session to finalize field mapping and delivery method.

Thanks,
Todd + Henry
