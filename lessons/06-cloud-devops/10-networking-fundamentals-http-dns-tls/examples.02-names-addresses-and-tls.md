## Example 1 — A record change that seems not to have taken effect

You update a service's address record after a move. Hours later some clients still reach the old address while others use the new one. Describe the resolution steps, explain why the old answer persists, and state what to do before the next move.

```text
client -> resolver -> root -> top-level domain -> authoritative server
         each step caches the answer for the record's declared time to live
record changed: the address record for api.example.test
observed: internal clients follow the change; external clients keep the old address
```

### Solution

```text
cause: every resolver holds the previous answer until its time to live expires
before the next move: lower the record's time to live, wait for the old value to
                     expire everywhere, then change the address, then raise it again
separately: internal and external clients can receive different answers; check from
            the client's position, not from inside the same network
```

Each step of the walk caches the answer for the time the record declares, which is why adding a record is fast and changing one can take hours. Lowering the time to live before a migration is standard practice because it decides how long the old answer survives. The usual mistake is to change the record first and then diagnose propagation, while comparing the two answers from the wrong network.

## Example 2 — A handshake that fails on the name, not the dates

A client calls a service by one name and the handshake fails; the same service answers on another name. The certificate's dates and its chain are both valid. Explain the failure and give the two remedies.

```text
service answers on:  shop.example.test and www.shop.example.test
certificate covers:  shop.example.test and *.api.example.test
handshake result:    the requested name is not among those the certificate authenticates
```

### Solution

```text
cause:  the wildcard covers one label under api.example.test, not www.shop.example.test;
        a certificate for one name does not authenticate another
remedy A: obtain a certificate whose names include www.shop.example.test
remedy B: issue a separate certificate for that name and serve it on that listener
then:     automate renewal, so the new coverage is a non-event rather than a date to remember
```

The handshake proves the server holds the private key for its certificate, and the client accepts the result only if the name it asked for is among those the document covers. Dates and chain are checked, but neither rescues an absent name, which is why adding a name means changing the certificate. The usual mistake is to test with the name that is covered: it succeeds and hides the failing one.
