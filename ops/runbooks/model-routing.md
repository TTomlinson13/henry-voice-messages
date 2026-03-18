# Model Routing Runbook

## Routing Policy
- **Codex (main):** coding, implementation, debugging, execution
- **Claude Code (sub-agent):** secondary coding lane (implementation/refactor/test-heavy tasks)
- **Exa lane (default research):** general web research/search, source discovery, competitor scans, lender credibility checks
- **Gemini (sub-agent):** secondary lane for deeper synthesis/analysis after Exa retrieval
- **Grok (sub-agent):** social/X trend search + discourse signal
- **Opus (sub-agent):** deep-think, strategy, planning, nuanced judgment

## Execution Pattern
1. Keep main thread on Codex for build/execution.
2. Spawn focused sub-agent for non-coding research/analysis.
3. Return concise findings + actionable next steps into main.

## Quality Bar
- Sub-agent output should include:
  - concise summary
  - key evidence/links
  - recommended action
  - confidence + known gaps

## Research Preflight Checklist (Short)
Before any research task:
1. Confirm objective + decision needed (what answer is required).
2. Run Exa first (default retrieval lane).
3. Capture 3-5 credible sources with dates.
4. If synthesis is complex, hand off to Gemini for interpretation.
5. Return: recommendation, evidence links, confidence, and next action.

## Open-Source Routing Map ("Extra Muscle")
Use this when you want open-source workers alongside Codex/Gemini/Grok/Opus.

### Named Aliases (Operational)
- **oss-coder**
  - primary: `qwen/qwen-2.5-coder-32b-instruct`
  - fallback: `deepseek/deepseek-coder`
- **oss-reasoner**
  - primary: `meta-llama/llama-3.1-70b-instruct`
  - fallback: `moonshotai/kimi-k2` (Kimi K2.5 lane)
  - fallback-2: `qwen/qwen-2.5-72b-instruct`
- **oss-fast**
  - primary: `qwen/qwen-2.5-14b-instruct`
  - fallback: `meta-llama/llama-3.1-8b-instruct`
- **oss-reasoner-kimi**
  - primary: `moonshotai/kimi-k2`
  - fallback: `meta-llama/llama-3.1-70b-instruct`

### Worker Lanes
- **oss-coder (heavy)**
  - Use for: code generation, refactors, unit-test scaffolding, bug triage.
- **oss-reasoner (heavy)**
  - Use for: long-form analysis, architecture tradeoffs, docs synthesis.
- **oss-fast (cheap/fast)**
  - Use for: first-pass drafts, classification, extraction, batch transforms.

### Fallback Chain
1. Preferred lane model
2. Same lane alternate (in parentheses above)
3. Escalate to proprietary lane (Codex/Gemini/Grok/Opus) if quality/confidence is low

### Routing Triggers
- If task is **code+execution critical** -> keep **Codex main**.
- If task is **parallelizable grunt work** -> spawn **oss-fast** first.
- If task needs **deep code reasoning but not prod-critical** -> spawn **oss-coder**.
- If task needs **broad synthesis/strategy draft** -> spawn **oss-reasoner**, then validate with Opus if high impact.

### Output Contract for OSS Workers
Require each run to return:
1. Final answer (short)
2. Assumptions made
3. Confidence (0-100)
4. What to verify before acting

## Creative Media Lanes
Use these lanes for ad/media production workflows.

### Video Lane (Veo)
- **primary:** Google Veo
- **Use for:** short ad spots, social clips, explainer visuals, concept videos.
- **Input contract:** objective, audience, duration target, aspect ratio, style/tone, CTA.
- **Output contract:** prompt/script used, shot list, generated clips, edit notes, publish-ready variants.

### Image Lane (Nano Banana)
- **primary:** Nano Banana
- **Use for:** ad creatives, thumbnails, social image sets, concept boards.
- **Input contract:** campaign goal, format/sizes, brand tone, text overlays, visual references.
- **Output contract:** prompt set, image variants by size/channel, recommended top picks, alt options.

### Creative Routing Triggers
- If task is motion/video-first -> route to **Veo**.
- If task is static creative/image-first -> route to **Nano Banana**.
- If task needs full campaign pack -> use **Nano Banana first**, then **Veo** for matched motion variants.
