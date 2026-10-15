## Example 1 — From a wish to a testable requirement

A review keeps flagging one line in the upload specification as untestable: "The system should handle large uploads reliably." The design team knows what they meant and says so out loud. Rewrite the line so that trigger, condition and response are all visible, then state the acceptance criterion.

```text
The system should handle large uploads reliably.
(large = bigger than the browser's own limit; unreliable = drops
 on mobile networks and has to be restarted from the beginning)
```

### Solution

```text
REQ-UPLOAD-07
When a user uploads a file larger than 100 MB (trigger, condition),
the system must resume the upload after a network interruption from
the last confirmed chunk, without asking the user to act (response).

Acceptance criterion
- A 150 MB upload interrupted after 40 MB resumes from chunk 40 and
  completes without a new file selection.
- An upload interrupted twice still completes.
- A 90 MB upload is under the threshold; no resume is required.
```

Every weasel word has become a number, and the sentence can fail in three observable ways, so a tester can run it without asking the author. The acceptance criterion reuses the same sentence as the check. The usual mistake is stopping at "large" and "reliably", which are not behaviours and cannot be tested.

## Example 2 — One requirement per sentence, with the failure case

A form requirement has been written as one long sentence with three "and"s, and it uses "should" for a legal obligation. Split it, choose each modal deliberately, and write the failure behaviour rather than only the happy path.

```text
The system should validate the form and email the user if it is
invalid, and be secure, and respond quickly.
```

### Solution

```text
REQ-FORM-01  When a user submits the form, the system must reject it
             within 200 ms if the email field is not a valid address,
             and show "Enter a valid email address".
REQ-FORM-02  When a submission is rejected, the system must not send
             any email to the entered address.
REQ-FORM-03  The system must store submitted data encrypted at rest
             with AES-256.
REQ-FORM-04  While the form service is unavailable, the system may
             queue the submission and retry for 15 minutes.
```

Each sentence now holds one actor, one condition and a response, with the rejected-submission case written rather than left to the build. The modals do real work: "must" marks the obligations and "may" the optional queue. The usual mistake is leaving "secure" and "quickly" as adjectives, which sound like requirements and can never fail.
