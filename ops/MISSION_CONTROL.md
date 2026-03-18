# Mission Control

_Last updated: 2026-02-11 UTC_

## 1) System Health
- Gateway: ✅ expected healthy (`openclaw gateway status`)
- Last major restart: config patch apply (2026-02-11 04:21 UTC)
- Gmail webhook mapping: ✅ enabled (`hooks.mappings` path `gmail`, `deliver: true`, `channel: "last"`)
- Gmail watcher: ✅ healthy (history advancing; seen 2956+)
- Tunnel hint (local browser): `ssh -N -L 18789:127.0.0.1:18789 todd@100.119.64.11`

## 2) Automations
- `daily-weather-32714` — 6:30 AM ET (`America/New_York`) — ✅ active
- Next: add daily Mission Control summary (optional)

## 3) Inbox / Comms
- Gmail account: `henry@usicna.com` (canonical)
- Inbound: ✅ delivered to chat via hooks
- Outbound: ✅ tested after keyring/passphrase fix

## 4) Projects
### NOW
- [ ] Build and use this Mission Control operating rhythm
- [ ] Define/implement Kiro (if still desired)

### NEXT
- [ ] Add cron: daily summary post (health + top 3 priorities)
- [ ] Add weekly review summary (done/carryover/risks)

### BLOCKED
- [ ] Kiro definition pending (persona/model/integration specifics)

### DONE
- [x] Gmail Pub/Sub + webhook delivery stabilized
- [x] Tailscale funnel path setup for Gmail pubsub
- [x] Keyring passphrase/systemd env fix for gog unlock
- [x] Weather cron scheduled for 32714 at 6:30 AM ET
- [x] Model triage agreed: Codex/Gemini/Grok/Opus

## 5) Docs & Runbooks
- Projects tracker: `ops/PROJECTS.md`
- Gmail runbook: `ops/runbooks/gmail.md`
- Gateway runbook: `ops/runbooks/gateway.md`
- Cron runbook: `ops/runbooks/cron.md`
- Model routing runbook: `ops/runbooks/model-routing.md`

## 6) Model Router (Live Rule)
- **Codex (main):** coding, implementation, debugging, execution
- **Gemini (sub-agent):** general web research/search + synthesis
- **Grok (sub-agent):** social/X trend + discourse signal
- **Opus (sub-agent):** deep-think, strategy, planning, nuanced judgment

## Daily 5-Minute Loop
1. Check `openclaw gateway status`
2. Check cron list/runs for failures
3. Review new inbox events
4. Update `ops/PROJECTS.md` (move cards)
5. Pick ONE Now task and execute
