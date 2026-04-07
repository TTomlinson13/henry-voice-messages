---
name: lark-cli
description: Work with Lark/Feishu (LarkSuite) data and workflows via the official lark-cli tool. Trigger whenever you need to read or update Lark calendars, docs, Base tables, Sheets, mail, messenger chats, wiki, tasks, or meetings from within OpenClaw.
---

# Lark CLI Skill

Use this skill any time the task touches LarkSuite (aka Feishu) assets—docs, Base apps, calendars, mail, messenger chats, tasks, wiki, or meeting notes. It explains how to invoke the `lark-cli` binary, how to refresh auth, and the high-value command patterns most agents will run.

## Prerequisites
- Node.js ≥ 18 with npm available.
- Global install of `@larksuite/cli` and the bundled skills (`npx skills add larksuite/cli -y -g`). The binary lives at `/usr/local/bin/lark-cli` on this host.
- Network access to the Lark/Feishu tenant.

Verify the install at any time:
```bash
lark-cli version
```

## Authentication (one-time per tenant)
1. **Configure the app**
   ```bash
   lark-cli config init --new
   ```
   The CLI prints a device-authorization URL (in Chinese). Copy the link into chat so the human can finish the browser flow. Wait for the command to exit.
2. **Log in with recommended scopes**
   ```bash
   lark-cli auth login --recommend
   ```
   Again, copy the URL + code to the user and wait for completion.
3. **Verify token**
   ```bash
   lark-cli auth status
   ```
   Confirm `tokenStatus` is `valid`, note the expiry, and mention it in chat. Tokens live in `~/.lark-cli/` and refresh automatically until the refresh expiry.
4. If auth ever breaks, repeat steps 2–3 (no need to re-run `config init` unless the app ID changes).

## Core Command Patterns
All commands support machine-readable output (`--format json`) and colored pretty output (`--format pretty`). Use the shortest command that solves the task.

| Domain | When to use | Example commands |
| --- | --- | --- |
| Calendar | Agenda checks, event CRUD, free/busy | `lark-cli calendar +agenda`, `lark-cli calendar event create --title "" --start 2026-03-31T15:00:00-04:00 --end ... --attendee <email>` |
| Docs / Docx | Read/update docs, export PDFs, manage comments | `lark-cli docs search "pricing memo" --max 5`, `lark-cli docs read <docId> --format pretty`, `lark-cli docx write <docId> --file note.md` |
| Base | Inspect or update operational tables | `lark-cli base table list --app <appId>`, `lark-cli base record create --app <appId> --table <tableId> --data '{"Stage":"Won"}'` |
| Sheets | Reporting and lightweight data edits | `lark-cli sheets spreadsheet append --sheet <id> --range A1 --values '[["Date","Note"]]'` |
| Messenger | Send nudges, read chats, download attachments | `lark-cli im chat list`, `lark-cli im message send --chat-id <id> --text "Heads up"` |
| Mail | Read/send Feishu mail inbox items | `lark-cli mail message list --label INBOX --max 20`, `lark-cli mail send --to ... --subject ... --body ...` |
| Tasks | Create/complete Lark tasks | `lark-cli task create --title "Prep agenda" --due 2026-03-31T17:00:00-04:00` |
| Wiki / Drive | Pull specs or upload files | `lark-cli wiki node list --space <spaceId>`, `lark-cli drive file upload --path ./brief.pdf --parent <folderId>` |

> Tip: many commands have “shortcut” aliases (the `+something` syntax). Run `lark-cli <domain> --help` or `lark-cli <domain> +shortcut --help` to see supported flags.

## Recommended Workflows
1. **Daily agenda sync** – `lark-cli calendar +agenda --format pretty` and summarize upcoming events or detect conflicts.
2. **Doc hunting** – `lark-cli docs search "<keyword>" --max 10` → read/export relevant docs.
3. **Base pipeline updates** – read the table, update specific records, then confirm results.
4. **Messenger pings** – send updates directly into team chats without leaving OpenClaw.
5. **Meeting minutes / recordings** – `lark-cli minutes list --meeting-id <id>` to pull summaries.

Document any repeatable workflow in `ops/` scripts if it grows beyond a single command (so we can call it from crons).

## Safety & Guardrails
- Only touch the calendars/spaces explicitly assigned to Todd/Tomlinson & Co. If in doubt, ask before writing.
- Avoid destructive ops (`delete`, `remove`, `revoke`) unless the user is explicit.
- Redact sensitive content before pasting into chat. If the command dumps large JSON, summarize key fields instead of pasting raw output.
- Log every cross-system change in chat (what table/doc/chat was touched and why) for auditability.

Keep this skill lean: if you need detailed references (e.g., Base table schemas or standard calendar IDs), add them under `skills/lark-cli/references/` and link them here so future agents know where to look.
