## Пример 1 — Три запроса, ожидаемые один за другим

Загрузчик дашборда ожидает три независимых запроса последовательно и считает каждый ответ успешным. Объясните обе проблемы, затем сделайте ожидания перекрывающимися, а сбои — видимыми.

```js
async function loadDashboard(id) {
  const user = await loadUser(id);      // 300ms
  const orders = await loadOrders(id);  // 400ms
  const alerts = await loadAlerts(id);  // 200ms
  return { user, orders, alerts };
}
// итого: ~900ms

const response = await fetch("/api/orders/" + id);
const orders = await response.json();   // ответ 500 разбирается как успешный
```

### Решение

```js
async function loadOrders(id) {
  const response = await fetch("/api/orders/" + id);
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}

async function loadDashboard(id) {
  const [user, orders, alerts] = await Promise.all([
    loadUser(id), loadOrders(id), loadAlerts(id),
  ]);
  return { user, orders, alerts };
}
// итого: ~400ms — самая медленная операция, а не сумма
```

Ожидание по очереди заставляет страницу ждать суммы трёх длительностей, хотя запросы вовсе не зависят друг от друга; `Promise.all` ждёт только самую долгую операцию и отклоняется, если упала хотя бы одна из них. Вторая проблема тише: `fetch` отклоняется при сетевом сбое, но переходит в fulfilled при 404 или 500, поэтому разбор JSON выполняется по телу ошибки и падает с сообщением, указывающим не туда. Проверка `response.ok` превращает непонятную ошибку разбора в названный статус.

## Пример 2 — Поиск, в котором побеждает самый медленный ответ

Каждое нажатие клавиши запускает запрос, и результат отрисовывается, когда бы он ни пришёл. Набор слова «keyboard» может в итоге показать результаты для «key». Скажите, что здесь соревнуется, затем остановите брошенный запрос.

```js
async function search(term) {
  const response = await fetch("/api/search?q=" + term);
  const results = await response.json();
  render(results);
}

input.addEventListener("input", () => search(input.value));
// ответ для более раннего, короткого запроса может прийти последним
```

### Решение

```js
let controller = null;

async function search(term) {
  if (controller) controller.abort();
  controller = new AbortController();

  try {
    const response = await fetch("/api/search?q=" + term, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    render(await response.json());
  } catch (error) {
    if (error.name === "AbortError") return;   // это отмена, а не сбой
    showError(error);
  }
}

input.addEventListener("input", () => search(input.value));
```

Промис отменить нельзя, но запрос под ним — можно, для этого и нужен `AbortController`: начало нового поиска прерывает тот, что в полёте, поэтому устаревший ответ больше не может перезаписать свежий. Отмена тоже приходит как ошибка, поэтому её нужно отличать от настоящего сбоя, иначе каждое нажатие клавиши показывало бы сообщение об ошибке.
