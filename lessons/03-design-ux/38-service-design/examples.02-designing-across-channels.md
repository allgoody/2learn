## Example 1 — Assigning a job to each channel

A customer starts an order in the app, the payment fails, and they phone. Decide what each channel is for, then write the packet that moves with the customer between them.

```text
The call so far
Customer: "I tried to pay in the app and it failed. Can I do it now?"
Agent:    currently has the phone number and nothing else
```

### Solution

```text
Channel   Best at                            Not for
phone     exceptions, upset customer          reference material
app       repeat actions, status checks      long forms
web       comparison, long forms              moments of urgency
counter   identity, physical handover         anything outside opening hours

Hand-over packet, app to phone
reference 88213
step reached: payment failed, cart intact
open question: delivery address unknown
promise already made: "no charge until it ships"
```

Each channel now has one job, so the customer never has to guess which one to use, and the packet carries the step and the open question rather than only a name. The usual mistake is recognising the caller and then asking them to start again, which is the commonest source of the calls themselves.

## Example 2 — One promise, the same words in every channel

The delivery promise is currently written four times, once per team. Write it once and make every channel show it, including the agent who cannot see the app.

```text
App notification   "Arriving Tuesday — check the app for updates"
Email              "Usually within 3-5 working days"
Phone script       "I would guess Tuesday or Wednesday"
Account page       "Despatch within 48 hours"
```

### Solution

```text
App notification   "Arriving Tuesday 4 June. We charge when it ships."
Email              "Arriving Tuesday 4 June. We charge when it ships."
Phone script       "Arriving Tuesday 4 June. We charge when it ships."
Account page       "Arriving Tuesday 4 June. We charge when it ships."

Reference 88213 is shown in the account and read out by the agent
at the start of the call, so progress carries across.
```

One string copied between channels ends the disagreement about what was promised, and carrying the reference lets the customer switch from app to phone without losing their place. The usual mistake is rewriting the promise per channel, so the app and the email contradict each other and the customer trusts neither.
