# Manus + Loveable Routing Spec v1

Date: 2026-02-19
Owner: Henry (for Todd)
Status: Active

## Objective
Add Manus and Loveable as specialist execution lanes under one operating model, with Henry/OpenClaw as orchestrator.

## Team Roles

- Henry/OpenClaw (Orchestrator)
  - Intake, triage, routing, QA, operational execution
  - Final packaging and communication
  - System integration and runbook updates

- Manus (Autonomous Research + Build Lane)
  - Longer autonomous tasks, deep research, synthesis, strategic drafts
  - Multi-step discovery and structured recommendation outputs

- Loveable (Rapid Product/UI Lane)
  - Fast prototype generation, UI flows, app scaffolds, feature iteration
  - Visual/product-first implementation and quick iteration loops

## Routing Rules (Primary)

1) Send to Manus when task is:
- Long-form research or strategy
- Multi-source intelligence gathering
- Comparative analysis and recommendation drafting
- Multi-step autonomous execution where speed of parallel research matters

2) Send to Loveable when task is:
- UI/app prototype creation
- Front-end flow iteration
- Rapid concept-to-demo cycles
- Product UX packaging before engineering hardening

3) Keep with Henry/OpenClaw when task is:
- Production operations, infrastructure, automation, cron, messaging
- CD/QuoteRUSH/office relay workflows
- QA signoff, policy/compliance checks, rollout coordination
- Cross-lane consolidation and final decision support

## Escalation / Cross-Lane Pattern

- Manus -> Henry:
  - Research dossier, options, confidence, sources
- Loveable -> Henry:
  - Prototype artifacts, flow notes, implementation assumptions
- Henry -> Codex lane:
  - Production hardening, integration, refactor, tests, deployment steps

## Standard Handoff Contract (Required)

Every routed task should include:
1. Task goal in one sentence
2. Inputs and constraints
3. Output format required
4. Due time / urgency
5. Definition of done checklist

Template:
- Goal:
- Inputs:
- Constraints:
- Required Output:
- Deadline:
- Done When:

## Output Standards

- Must be concise, implementation-ready
- Include assumptions explicitly
- Include risks and blockers
- Include next 3 concrete actions

## Quality Gate (Before Return to Todd)

Henry validates:
- Accuracy and relevance
- Actionability
- Compliance fit (CAN-SPAM/TCPA/DNC/quiet-hours where applicable)
- Alignment with current agency priorities

## Delivery Modes

Priority order:
1) API/Webhook bridge (preferred)
2) Structured email workflows (fallback)
3) Manual handoff template (immediate mode)

## Immediate Operating Defaults

- Research-heavy tasks default to Manus
- Prototype-heavy tasks default to Loveable
- Final operationalization and rollout stay with Henry/OpenClaw

## Initial Use Cases

- Commercial prospecting NAICS + messaging strategy -> Manus
- Campaign landing/flow prototype -> Loveable
- CRM workflow + automation + monitoring rollout -> Henry/OpenClaw

## Review Cadence

- Weekly: adjust routing based on output quality and cycle time
- Monthly: update role boundaries and default triggers
