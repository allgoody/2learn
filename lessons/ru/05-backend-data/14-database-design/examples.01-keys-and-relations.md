## Пример 1 — Ключи и поведение при удалении

Первая схема магазина использовала адрес электронной почты клиента как первичный ключ, а связи оставляла приложению. Теперь клиент хочет сменить этот адрес, и у запроса нет ограниченной стоимости. Переработайте схему так, чтобы идентичность была устойчивой, ссылка поддерживалась, а каждое удаление говорило, что оно значит.

```sql
create table customers (
  email text primary key,
  name  text not null
);

create table orders (
  id       bigint primary key,
  customer text not null,       -- указывает на customers.email
  total    numeric not null
);
```

### Решение

```sql
create table customers (
  id        bigint generated always as identity primary key,
  public_id uuid not null unique,
  email     text not null unique,   -- ограничено, но не идентифицирует
  name      text not null
);

create table orders (
  id          bigint generated always as identity primary key,
  public_id   uuid not null unique,
  customer_id bigint not null references customers (id) on delete restrict,
  total       numeric not null
);
```

Электронная почта становится ограничением уникальности, а не идентичностью, поэтому её изменение больше не затрагивает таблицу заказов, а публичный идентификатор держит последовательный ключ вне любого интерфейса. Поведение при удалении теперь выбрано: клиенту, у которого ещё есть заказы, отказывают. Обычно ошибаются в том, что объявляют внешний ключ и никогда не выбирают действие при удалении.

## Пример 2 — Связь «многие ко многим» без дубликатов

У товара может быть много тегов, и тег встречается у многих товаров. Первая попытка хранила имена тегов списком в строке товара, и это делало невозможным вопрос, какие товары делят один тег. Смоделируйте пару как собственную таблицу и скажите, что должно делать каждое удаление.

```sql
create table products (
  id   bigint generated always as identity primary key,
  name text not null
);

create table tags (
  id   bigint generated always as identity primary key,
  name text not null unique
);

-- пока так: products.tags text[]  -- список внутри одной строки
```

### Решение

```sql
create table product_tags (
  product_id bigint not null references products (id) on delete cascade,
  tag_id     bigint not null references tags (id) on delete cascade,
  primary key (product_id, tag_id)     -- пара и есть идентичность
);

create index product_tags_by_tag on product_tags (tag_id, product_id);
```

Таблица-связка даёт связи собственную идентичность: пара в роли первичного ключа отклоняет один и тот же товар и тег дважды, а обратный индекс отвечает, какие товары несут тег. Обе стороны каскадны, потому что пара без товара или тега не описывает ничего. Обычная ошибка — пропустить индекс в другом порядке столбцов, и тогда одно направление поиска сканирует всю таблицу.
