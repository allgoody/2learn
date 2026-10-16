## Пример 1 — Замена конкретной зависимости интерфейсом

Сервис заказов сам создаёт своего платёжного клиента, поэтому каждый тест, который размещает заказ, обращается к настоящему, и класс нельзя переиспользовать с другим провайдером. Введите контракт, от которого сервис на самом деле зависит, и подставьте подделку.

```java
class OrderService {
    private final StripeGateway gateway = new StripeGateway();

    Receipt place(Order order) {
        return gateway.charge(order.total());
    }
}
```

### Решение

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

Интерфейс говорит, на что может опираться код, который его вызывает, и ничего не говорит о том, как выполняется платёж. Поэтому тест идёт без настоящего помощника, а рабочий путь по-прежнему им пользуется. Однако ошибка — вводить интерфейс с единственной реализацией и без перспектив второй: тогда косвенность ничего не даёт и лишь добавляет файл. Выделяйте её, когда появилась вторая реализация или она нужна тесту.

## Пример 2 — Неизменяемый класс значения

Тип суммы передаётся между потоками, и суммы иногда меняются после того, как экземпляр уже стал ключом отображения, поэтому поиск не находит запись. Ничто в классе этому не мешает. Сделайте значение безопасным для совместного использования.

```java
class Money {
    public long cents;
    public String currency;
}
```

### Решение

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

Класс, состояние которого нельзя изменить после создания, безопасно разделять между потоками и безопасно использовать как ключ: никто не может изменить то, что видит другой. Арифметика возвращает новое значение вместо изменения на месте, поэтому ключ отображения остаётся стабильным. Публичные поля — обычная ошибка: внутренности становятся всеобщим делом, и любое будущее изменение ломает совместимость.
