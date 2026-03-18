# Gmail Runbook

## Purpose
Keep `henry@usicna.com` ingestion + delivery healthy.

## Quick Checks
```bash
openclaw gateway status
```
- Expect RPC probe healthy.

Check recent logs for watcher health indicators:
- `watch started for henry@usicna.com`
- `history_id` advancing

## Known-Good State
- Project: `genial-union-486906-e6`
- Hook path: `/hooks/gmail`
- Funnel path: `/gmail-pubsub`
- Mapping: `match.path = "gmail"`, `action = "agent"`, `deliver = true`, `channel = "last"`

## Common Failures
1) `no TTY available for keyring file backend password prompt`
- Ensure `GOG_KEYRING_PASSWORD` is set in:
  - `~/.config/openclaw/gog.env`
  - systemd override for gateway service

2) `aes.KeyUnwrap(): integrity check failed`
- Passphrase mismatch. Re-auth gog and update env to exact passphrase.
- Restart gateway after env updates.

## Done-When Verification
- Inbound test email appears in chat delivery
- Outbound test send succeeds
- Watcher logs show advancing history
