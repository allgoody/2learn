## Example 1 — Labels taken from the support queue

The account menu uses the words the team chose internally. The support-ticket phrases and the current labels are below. Produce candidate labels from the user's phrasing, and say what each change does for the reader.

```text
Support ticket phrasing     Current label
"where's my stuff"          Order tracking
"my bill"                   Billing documents
"cancel my plan"            Subscription management
"my details"                Profile configuration
```

### Solution

```text
Ticket phrasing          Was                       Now
"where's my stuff"       Order tracking            Your orders
"my bill"                Billing documents         Your plan and bills
"cancel my plan"         Subscription management   Cancel plan
"my details"             Profile configuration     Your details
```

Each new label uses a noun the person could say aloud, so the reader can predict what is behind it without opening anything: "Your plan and bills" answers the "my bill" search, and "Your details" drops the internal word "configuration". The old labels described the system's objects, documents and subscriptions, rather than the errand the person arrived with. The mistake is to pick the most familiar internal word by committee taste, which is how "Order tracking" survived at all.

## Example 2 — Testing two candidate labels

Two labels are still open for the same section, one vague and one concrete. Five people were asked what they expect behind each, with no context. Read the answers, keep one, and write the naming-table line for the pair.

```text
Label: "Manage"
Answers: "settings?"  "my account?"  "delete things?"  "not sure"

Label: "Your plan and bills"
Answers: "my subscription" (4 of 5), "what I pay"
```

### Solution

```text
Keep: "Your plan and bills" - four of five answered the intended thing
Drop: "Manage"              - four answers, four different destinations

Naming table
Concept   User-facing term     Banned
plan      Your plan and bills  manage, account settings
```

Asking what people expect behind a label before showing the destination turns a taste argument into a count, and four converging answers out of five is enough to keep a label. "Manage" invites four different destinations, so it fails even though it fits the narrowest screen comfortably. The mistake is to test a label inside a finished screen, where the surrounding layout quietly explains the word and the mismatch disappears.
