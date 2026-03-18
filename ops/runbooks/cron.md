# Cron Runbook

## List Jobs
Use OpenClaw cron tooling to verify enabled jobs and schedules.

Current expected critical job:
- `daily-weather-32714` @ `30 6 * * *` tz `America/New_York`

## Validate Runs
- Check latest run history for failures.
- If missed, run ad-hoc and confirm delivery.

## Recommended Additions
- Daily Mission summary (AM)
- Weekly review summary

## Done-When Verification
- Jobs enabled
- Next run times correct for ET
- Recent runs successful
