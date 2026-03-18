# Gateway Runbook

## Health Check
```bash
openclaw gateway status
```

## Restart
```bash
openclaw gateway restart
```

## Local Browser Access (from your machine)
```bash
ssh -N -L 18789:127.0.0.1:18789 todd@100.119.64.11
```
Then open:
`http://127.0.0.1:18789/`

## Config File
- `/home/todd/.openclaw/openclaw.json`

## Post-Restart Verification
1. Gateway status healthy
2. Hooks still active
3. Cron jobs listed
4. Gmail ingress still delivering to chat
