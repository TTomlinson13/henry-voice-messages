# Homeowner First-Touch Templates (Deploy-Ready)

## SMS Sequence (Compliance-Safe)

### SMS #1 (Initial)
Hi {{first_name}}, this is {{agent_name}} with Tomlinson & Co. Thanks for your homeowners quote request — I can help you finish in about 2 minutes. Want to do it now?

### SMS #2 (Follow-up, 24–48h)
Hi {{first_name}} — quick follow-up from Tomlinson & Co on your homeowners quote. If you still want options, I can help you complete the remaining details fast. Reply YES and I’ll send the next step.

### SMS #3 (Final gentle close)
Hi {{first_name}}, this is my final follow-up on your homeowners quote request. If you’d like to continue, reply QUOTE and we’ll pick up where you left off. If not, no problem at all.

### SMS Opt-out line (append where required)
Reply STOP to opt out.

---

## Email Sequence

### Email #1 (Initial)
**Subject:** Quick next step for your homeowners quote

Hi {{first_name}},

Thanks for reaching out to Tomlinson & Co for a homeowners quote.

You’re close — we just need a few details to prepare your options.  
Reply to this email or use this secure link: {{intake_link}}

If easier, we can do it by text in 2–3 minutes.

Thanks,  
{{agent_name}}  
Tomlinson & Co  
{{phone}}

---

### Email #2 (Follow-up)
**Subject:** Still want homeowners quote options?

Hi {{first_name}},

Just checking in on your homeowners quote request.  
If you still want options, we can finish your intake quickly here: {{intake_link}}

If now isn’t the right time, just let me know and I’ll pause follow-up.

Best,  
{{agent_name}}  
Tomlinson & Co  
{{phone}}

---

### Email #3 (Final gentle close)
**Subject:** Final follow-up on your homeowners quote request

Hi {{first_name}},

This is a final courteous follow-up regarding your homeowners quote request.

If you want to continue, use this link and we’ll take it from there: {{intake_link}}  
If not, no problem — we can close this out for now.

Thank you,  
{{agent_name}}  
Tomlinson & Co  
{{phone}}

---

## Suggested Send Cadence
- Day 0: SMS #1 + Email #1
- Day 2: SMS #2
- Day 4: Email #2
- Day 7: SMS #3 or Email #3 (not both same day)

## Compliance Notes
- Respect opt-out immediately.
- Enforce quiet hours before all sends.
- Do not send after explicit “not interested” response.
