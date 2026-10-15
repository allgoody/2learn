## Example 1 — Replacing a concrete dependency with an interface

An order service builds its payment client itself, so every test that places an order talks to the real one and the class cannot be reused with a different provider. Introduce the contract the service actually depends on, and supply a fake.

```java
class OrderService {
    private final StripeGateway gateway = new StripeGateway();

    Receipt place(Order order) {
        return gateway.charge(order.total());
    }
}
```

### Solution

```java
interface PaymentGateway {
    Receipt charge(Money amount);
}

class OrderService {
    private final PaymentGateway gateway;

    OrderService(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    Receipt place(Order order) {
        return gateway.charge(order.total());
    }
}

class FakeGateway implements PaymentGateway {
    public Receipt charge(Money amount) { return new Receipt("test"); }
}
```

The interface states what a caller may rely on and says nothing about how the charge is made, so the test runs without the real collaborator while the production path keeps using it. Introducing an interface with one implementation and no prospect of a second is the mistake: the indirection then has no benefit and only adds a file. Extract it when a second implementation exists or a test needs one.

## Example 2 — Making a value class immutable

A money type is passed between threads, and amounts occasionally change after an instance has been stored as a map key, so lookups miss. Nothing in the class prevents it. Make the value safe to share.

```java
class Money {
    public long cents;
    public String currency;
}
```

### Solution

```java
final class Money {
    private final long cents;
    private final String currency;

    Money(long cents, String currency) {
        this.cents = cents;
        this.currency = currency;
    }

    long cents() { return cents; }
    String currency() { return currency; }
    Money plus(Money other) { return new Money(cents + other.cents, currency); }
}
```

A class whose state cannot change after construction is safe to share between threads and safe to use as a key, because no caller can alter what another caller sees. Arithmetic returns a new value rather than mutating in place, so the map key stays stable. Leaving the fields public is the usual mistake: the internals become everybody's business and every future change becomes a breaking one.
