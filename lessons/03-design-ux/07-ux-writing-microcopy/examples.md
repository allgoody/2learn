## Example 1 — Buttons that make the user guess

A settings screen ships buttons named after their internal functions. The strings and the question a person has at each moment are below. Rewrite every label so it answers its question in the user's own words, without growing longer.

```text
Button            Internal name
Submit            persist_preferences
Authenticate      sso_login
Proceed           initiate_payment
Cancel            abort_transaction
```

### Solution

```text
Question                          Label
What happens if I press this?     Save preferences
Where does this sign me in?       Sign in with work account
What will this charge me?         Pay now
What will this stop?              Cancel plan
```

Each label answers the question the person actually has at that moment: "Save preferences" says what changes, "Pay now" says that money moves, and "Cancel plan" names the action instead of asking whether they are sure. The internal names mean nothing outside the team, so swapping them for the words people use in tickets costs nothing and removes the guess. The mistake is to shorten a label for space by making it vaguer — "Submit" fits anywhere, and that is the problem.

## Example 2 — An error and an empty state

A checkout rejects a postcode, and a new account's orders list has nothing in it. The two shipped strings are below. Rewrite both, so the error says what happened and what to do, and the empty state says what will appear here and how to start.

```text
Error:   Error 422: invalid input. Please try again.
Screen:  No results.
```

### Solution

```text
Error:   We could not save your address because the postcode is
         incomplete. Check the postcode and try again - your other
         details are saved.

Empty:   Your orders will appear here after your first purchase.
         (Start a purchase)   Example: order 1042, delivered 3 March
```

Both strings keep the user's work: the error names the field, says what to do, and confirms that everything else was saved, so nobody re-enters the whole form. The empty state is the first screen a new buyer sees, so it says what belongs here and offers the one action that fills it. The mistake is to put an error code or "No results" in the string, which reports what the system called the problem instead of telling the person what to do.
