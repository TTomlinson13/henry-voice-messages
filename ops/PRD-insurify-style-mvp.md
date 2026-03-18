# PRD — Insurance Quote Marketplace MVP (Insurify-Style)

## 1) Product Summary
Build a fast, conversion-focused insurance quote marketplace MVP that captures inbound consumer quote requests, routes leads to internal agents based on rules, and tracks funnel + SLA performance.

## 2) Goals
- Launch in 30 days with FL-first scope.
- Minimize quote-request friction.
- Route leads automatically with clear ownership.
- Measure speed-to-contact and conversion performance.

## 3) Non-Goals (MVP)
- Full national rollout.
- Deep carrier API quoting integrations.
- Advanced pricing engine.
- Complex call-center tooling.

## 4) MVP Scope
- Product lines: Auto + Home (initial)
- Geography: FL (expandable)
- Public pages:
  - Homepage
  - Auto page
  - Home page
  - Multi-step quote form
  - Thank-you page
- Internal pages:
  - Login
  - Lead dashboard
  - Routing rules manager
  - SLA alerts view

## 5) Users & Roles
- Consumer: submits quote request.
- Producer: receives/works assigned leads.
- CSR: supports service/follow-up.
- Admin/Ops: manages rules, users, monitoring.

## 6) User Stories
1. As a consumer, I can submit quote details in under 3 minutes.
2. As Ops, I can auto-route leads by state/product.
3. As a producer, I can see new leads and contact status.
4. As admin, I can detect untouched leads beyond SLA.
5. As leadership, I can see funnel metrics by source.

## 7) Functional Requirements
### 7.1 Public Funnel
- Multi-step form with validation
- Required fields:
  - name, phone, email, zip/state, product type
- Optional fields based on product path
- Progress indicator + save partial (optional if fast)

### 7.2 Lead Intake API
- POST /api/leads
- Validate + normalize phone/email
- Store UTM/source fields
- De-dupe window (configurable)

### 7.3 Routing Engine
- Rule dimensions:
  - state
  - product type
  - priority/order
- Assign lead to owner and record assignment reason

### 7.4 Notifications
- On assignment:
  - email to assignee
  - optional SMS alert
- On SLA breach:
  - escalate to ops/admin

### 7.5 Admin Dashboard
- Lead list + filters (new/assigned/contacted/closed)
- Detail pane with timeline/events
- Routing rules CRUD
- Users/roles management
- Export CSV

### 7.6 Metrics
- Lead response time
- Quote-start to completion rate
- Conversion by source
- Volume by state/product

## 8) Data Model (Core)
### leads
- id (uuid)
- created_at, updated_at
- full_name, email, phone
- state, zip
- product_type
- status (new/assigned/contacted/qualified/closed/lost)
- assigned_user_id
- source, utm_source, utm_medium, utm_campaign, utm_content, utm_term
- payload_json

### lead_events
- id, lead_id
- event_type
- actor_type (system/user)
- actor_id
- metadata_json
- created_at

### routing_rules
- id
- active
- state
- product_type
- assignee_user_id
- priority
- notes

### users
- id
- role (admin/producer/csr/ops)
- name
- email
- phone
- active

## 9) Tech Stack
- Frontend: Next.js + Tailwind
- Backend: Next API routes (or NestJS), Node
- DB: PostgreSQL + Prisma
- Auth: Clerk or Supabase Auth
- Email: Resend/SendGrid
- SMS: Twilio (or defer)
- Analytics: GA4 + PostHog
- Hosting: Vercel (frontend/api), managed Postgres

## 10) API Endpoints (MVP)
- POST /api/leads
- GET /api/leads
- GET /api/leads/:id
- PATCH /api/leads/:id
- GET/POST/PATCH /api/routing-rules
- GET/POST/PATCH /api/users
- GET /api/metrics/summary

## 11) SLA Rules
- New lead must be touched within X minutes (default 15)
- Breach triggers alert to ops + admin

## 12) Acceptance Criteria
- Consumer can complete form and submit successfully
- Lead is auto-assigned by rule
- Assignee receives notification
- Lead appears in dashboard immediately
- SLA breach alert fires correctly
- Metrics page shows daily counts and response times

## 13) QA Checklist
- Form validation paths
- Mobile responsiveness
- Duplicate lead handling
- Rule precedence correctness
- Notification delivery success/failure
- Role access restrictions

## 14) Launch Plan (30 Days)
- Week 1: IA/UI + DB schema + form scaffolding
- Week 2: intake API + routing + notification
- Week 3: dashboard + rules + SLA alerts
- Week 4: analytics + QA + FL pilot launch

## 15) Post-MVP Backlog
- Carrier API integrations
- Multi-state rollout tooling
- Advanced lead scoring
- Agent performance scoring
- Call automation (8x8 integration)
