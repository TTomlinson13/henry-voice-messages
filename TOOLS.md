# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## Connectivity

- **SSH Tunnel to Gateway:**
  `ssh -N -L 18789:127.0.0.1:18789 todd@100.119.64.11`
  (Keep terminal open to access dashboard at http://127.0.0.1:18789)

- **Gateway Bookmark (Auto-Auth):**
  `http://127.0.0.1:18789/?token=yXeCfnyRSx1ZdyU7kUn0gA1AmWU5mCQDldP9JYrcyB0`

## Integrations

- **Gmail (Henry):**
  - Account: `henry@usicna.com`
  - Inbound: Pub/Sub hook (`/hooks/gmail`) -> Chat delivery enabled.
  - Outbound: `gog gmail send` via `gog.env` keyring unlock.
  - Watcher: Managed by `openclaw-gateway.service`.

- **Canopy Connect:**
  - Agency link: `https://app.usecanopy.com/c/tomlinson-and-co`

- **Weather:**
  - Daily cron: `daily-weather-32714` (6:30 AM ET) for Altamonte Springs.

- **TTS (Voice Routing):**
  - Primary: ElevenLabs
  - Preferred ElevenLabs Voice ID: `ZthjuvLPty3kTMaNKVKb`
  - Previous Voice ID: `6sFKzaJr574YWVu4UuJF`
  - Fallback: Google TTS

## Services

- **Client Dynamics:**
  - URL: `https://tomlinson-and-co.clientdynamics.com/index.php`
  - User: `henry@usicna.com`
  - Pass: `Henry$111`

- **QuoteRUSH:**
  - URL: `https://web.quoterush.com/qr-login.php?location=%2Fqr-index.php`
  - User: `henry@usicna.com`
  - Pass: `Henry$111`

- **Branchagent.com:**
  - User: `henry@usicna.com`
  - Pass: `Henry$111`

- **8x8:**
  - Pass: `Henry$111` (Preferred)

- **Canva:**
  - User: `henry@usicna.com`
  - Pass: `Henry$111` (Logged in through Google)

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific


## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
