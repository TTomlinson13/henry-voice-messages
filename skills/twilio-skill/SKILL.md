---
name: twilio-skill
description: Send SMS alerts using Twilio. Trigger when you need to send urgent notifications to your phone.
---

# Twilio Skill

Use this skill to send SMS alerts through your Twilio account.

## Setup
1. Install dependencies:
   `pip install twilio`
2. Set environment variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER` (your Twilio number, e.g., +18882677801)

## Commands
```bash
python scripts/twilio_client.py <to_number> "<message>"
```

## Example
```bash
python scripts/twilio_client.py +15551234567 "Hello from OpenClaw!"
```
