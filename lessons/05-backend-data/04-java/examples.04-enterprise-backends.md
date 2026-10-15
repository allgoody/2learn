## Example 1 — One user's data in another user's request

A support dashboard intermittently shows one customer's tickets to another account. The class below holds the customer of whoever is currently being served, and one copy of it is built when the application starts. Show the scope that causes the leak and the object that removes it.

```java
// constructed one per application and shared by every request
class RequestContext {
    private Customer current;

    void setCustomer(Customer customer) { this.current = customer; }
    Customer customer() { return current; }
}
```

### Solution

```java
// constructed one per request and injected into whatever serves it
class RequestContext {
    private final Customer current;

    RequestContext init(Customer customer) { ... }

    Customer customer() { return current; }
}
```

A framework normally offers one instance per request, one per application, and it wires the request-scoped object into the handler for that request; keeping the customer in the application-scoped copy is what lets a concurrent request overwrite it. The mistake is to reach for a shared holder because passing the value through is tedious, and to discover the leak only under concurrency. Decide the scope first and store request state only in it.

## Example 2 — A transaction boundary placed by convenience

A transfer debits one account and credits another. Each step is committed on its own because the boundary was taken around each method, so a failure between them leaves money missing. Move the boundary so the pair is atomic.

```java
// a boundary around each write: one transaction per call
void debit(Account account, Money amount) { ... }
void credit(Account account, Money amount) { ... }

void transfer(Account from, Account to, Money amount) {
    debit(from, amount);
    credit(to, amount);
}
```

### Solution

```java
// one boundary around the whole operation
void transfer(Account from, Account to, Money amount) {
    debit(from, amount);
    credit(to, amount);
}

void debit(Account account, Money amount) { ... }   // no boundary of its own
void credit(Account account, Money amount) { ... }
```

The boundary decides what is atomic, so taken around the pair both writes commit or neither does; taken one level too high it holds locks for the length of unrelated work instead. That is why the placement is a correctness decision rather than a configuration detail. The mistake is to leave the boundary wherever the annotation happened to sit and to find out only when a partial write appears.
