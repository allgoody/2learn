## Example 1 — A benchmark that measures the interpreter

A team measures a change with a single timed run of a few thousand iterations, then argues about a result that moves by a factor of two between runs. Rewrite the measurement so it reports steady state.

```java
public class Bench {
    public static void main(String[] args) {
        long start = System.nanoTime();
        long total = 0;
        for (int i = 0; i < 10_000; i++) total += work(i);
        System.out.println((System.nanoTime() - start) / 1_000_000 + " ms");
    }

    static long work(int i) { return i % 7; }
}
```

### Solution

```java
public class Bench {
    static final int BATCHES = 20;
    static final int PER_BATCH = 100_000;

    public static void main(String[] args) {
        long total = 0;
        for (int b = 0; b < BATCHES; b++) {
            long start = System.nanoTime();
            for (int i = 0; i < PER_BATCH; i++) total += work(i);
            long ms = (System.nanoTime() - start) / 1_000_000;
            if (b >= 3) System.out.println("batch " + b + ": " + ms + " ms");
        }
        System.out.println(total);
    }

    static long work(int i) { return i % 7; }
}
```

Code starts interpreted and hot paths are compiled once the runtime has observed them, so the early batches measure the interpreter and the later ones measure the program; printing each batch shows where the numbers stop improving. The usual mistake is to average the warm-up into the result, or to compare two numbers that are both still falling. Figure values are illustrative; measure your own load.

## Example 2 — A dependency missing only at runtime

The project compiles on the build machine, but the artifact's classpath is assembled separately. One path uses a class from a library needed only to compile, and it fails inside a request long after a clean startup. Identify what is missing and why it arrived then.

```java
import com.example.payments.PaymentClient;   // compile-only, absent at run time

public class OrderService {
    private final PaymentClient client = new PaymentClient();

    Receipt place(Order order) {
        return client.charge(order.total());
    }
}
```

Substitute your own library's coordinates for the placeholder above.

### Solution

```text
java.lang.NoClassDefFoundError: com/example/payments/PaymentClient
    at OrderService.<init>(OrderService.java:4)

# classes load on first use, so an absent or incompatible one fails here,
# not at startup
```

The error names the class, and that is the whole diagnostic: it points at the declaration that should have brought the class onto the runtime classpath. A compile-time dependency is an annotation processor or an API stub; everything else must be present when the program runs. The mistake is to assume that anything which compiles is there at runtime, and to leave the tree uninspected until a request fails.
