---
title: Designing across channels
prereqs: ["03-design-ux/38-service-design/01-frontstage-backstage-and-support-processes"]
---

## What it is

Most services are used through several channels — app, web, phone, email, a counter — and the customer experiences them as one thing. Designing across channels means deciding what each channel is for, what state moves between them, and what the customer never has to repeat.

## Why it matters

Channel boundaries are invisible to the organisation and extremely visible to the customer: they start on the phone, are asked to finish online, and are then asked for the same reference number a third time. Each channel team sees a complete journey and the customer sees three partial ones. Getting this right removes the commonest source of support calls, and it is a design decision, not an integration detail — the integration usually follows once the journey is written down.

## Core ideas

### Give each channel a job

Decide what each channel is best at and let it do that. Real-time help belongs on the phone; a record belongs where it can be reread; a quick repeat action belongs in the app.

```text
Channel   Best at                              Not for
phone     ambiguity, exceptions, upset customer  reference material
app       quick repeat actions, status checks    long forms
web       comparison, long forms, account history  moments of urgency
counter   identity, physical handover           anything outside opening hours
```

If two channels both claim the same job, the customer has to guess which one they meant.

### Carry state, not just identity

The customer should never re-enter what they already told another channel. Design the hand-over as data: the reference, the step reached, the open question, and the promise already made.

```text
Hand-over packet
- reference: 88213
- step reached: payment failed, cart intact
- open question: delivery address unknown
- promise made: "no charge until it ships"
```

### Let people switch without losing progress

Assume the customer will start on mobile and finish on a laptop, or start online and call. Persist progress server-side and make the reference available in every channel, including the phone.

### One promise, one voice

The wording of confirmations should be identical across channels. When the app says "arriving Tuesday" and the email says "within 3-5 days", the customer trusts neither.

## Practice

### Trace one journey across two channels

Pick a task that commonly starts in one channel and finishes in another. Write each hand-over as a packet — what is carried, what is lost, what the customer must repeat.

Done when: you have listed every repeated question the customer is asked, and marked which ones can be removed by carrying state.

### Write the cross-channel wording table

For one promise, write the exact string shown in each channel, then make them agree.

Done when: every channel shows the same promise in the same words, and one channel is not the only place a caveat appears.

## Common mistakes

- **Channel teams optimising separately** — each hits its own target while the customer repeats work; fix: map the whole journey once and assign hand-over owners.
- **Assuming the customer knows which channel to use** — they pick by convenience and hit a wall; fix: state each channel's job in the interface and route by task.
- **Handing over identity but not state** — the customer is recognised and then asked to start again; fix: pass the step reached and the open question with the reference.
- **Different wording for the same promise** — confidence drops and support calls rise; fix: keep one string, copied between channels, not rewritten per channel.
- **Making the phone the fallback for everything** — the queue absorbs the faults other channels design in; fix: treat every call as evidence of a broken hand-over and log the reason.

## Go deeper

- **Frontstage, backstage and support processes** (`03-design-ux/38-service-design/01-frontstage-backstage-and-support-processes`) — the layers each channel sits in front of.
- **Service Design** (`03-design-ux/38-service-design`) — where cross-channel work fits in the wider service.
- **Content Strategy** (`03-design-ux/08-content-strategy`) — keeping one voice across every channel.
- **UX Writing & Microcopy** (`03-design-ux/07-ux-writing-microcopy`) — the strings the customer actually reads.
