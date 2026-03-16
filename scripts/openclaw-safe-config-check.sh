#!/usr/bin/env bash
set -euo pipefail

CONFIG="${OPENCLAW_CONFIG_PATH:-$HOME/.openclaw/openclaw.json}"
TS="$(date +%F-%H%M%S)"
BACKUP_DIR="${HOME}/.openclaw/backups"
BACKUP_PATH="${BACKUP_DIR}/openclaw.json.bak.${TS}"

mkdir -p "$BACKUP_DIR"
cp "$CONFIG" "$BACKUP_PATH"

echo "Backup: $BACKUP_PATH"

python3 - <<'PY'
import json, os, sys
p = os.environ.get('OPENCLAW_CONFIG_PATH') or os.path.expanduser('~/.openclaw/openclaw.json')

with open(p) as f:
    d = json.load(f)

defaults = d.setdefault('agents', {}).setdefault('defaults', {})
model = defaults.setdefault('model', {})
models = defaults.setdefault('models', {})
bad = ('anthropic/', 'openrouter/anthropic/')
changed = False

primary = model.get('primary', '')
if isinstance(primary, str) and primary.startswith(bad):
    model['primary'] = 'openai-codex/gpt-5.3-codex'
    changed = True

fallbacks = model.get('fallbacks', [])
if isinstance(fallbacks, list):
    filtered = [x for x in fallbacks if isinstance(x, str) and not x.startswith(bad)]
    if filtered != fallbacks:
        model['fallbacks'] = filtered
        changed = True

for k in list(models.keys()):
    if isinstance(k, str) and k.startswith(bad):
        models.pop(k, None)
        changed = True

for m in ('openai-codex/gpt-5.3-codex', 'openai/gpt-5.3-codex', 'openrouter/auto'):
    if m not in models:
        models[m] = {}
        changed = True

commands = d.get('commands')
if isinstance(commands, dict) and 'ownerDisplay' in commands:
    commands.pop('ownerDisplay', None)
    changed = True

with open(p, 'w') as f:
    json.dump(d, f, indent=2)

print('patched' if changed else 'no-op')
PY

echo "Restarting gateway..."
openclaw gateway restart

echo "---- models status ----"
openclaw models status

echo "---- gateway status ----"
openclaw gateway status

echo "Done."
