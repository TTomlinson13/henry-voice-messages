# Voice Routing Runbook

## Policy
- **Primary voice engine:** ElevenLabs
  - Use for: storytime, polished summaries, personality-rich narration, user-facing audio quality moments.
- **Fallback voice engine:** Google TTS
  - Use for: utility alerts, short reminders/notifications, failover when ElevenLabs is unavailable.

## Routing Rules
1. If request is expressive or presentation-quality -> route to **ElevenLabs**.
2. If request is operational/brief (alerts, quick updates) -> route to **Google TTS**.
3. If ElevenLabs fails, times out, or quota-limits -> auto-fallback to **Google TTS**.

## Output Style
- Keep audio responses concise unless explicitly asked for long-form narration.
- For alerts/reminders, prioritize clarity over style.

## Future Enhancements
- Add per-channel defaults (e.g., Telegram = shorter clips).
- Add named voice presets (e.g., warm, neutral, energetic).
- Add time-of-day policy (quieter/shorter overnight).
