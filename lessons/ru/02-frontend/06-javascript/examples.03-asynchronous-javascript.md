## Пример 1 — Три запроса, ожидаемые один за другим

Загрузчик дашборда ожидает три независимых запроса по очереди и считает успешным каждый ответ. Объясните обе проблемы, затем сделайте так, чтобы ожидания перекрывались, а сбои были видны.

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

Когда запросы ждут по очереди, страница дожидается суммы трёх длительностей, хотя друг от друга эти запросы не зависят вовсе; `Promise.all` ждёт только самую долгую операцию и отклоняется, если упала хотя бы одна. Вторая проблема тише: при сетевом сбое `fetch` отклоняется, однако при 404 или 500 переходит в fulfilled, поэтому JSON разбирают по телу ошибки и получают сообщение, указывающее не туда. Проверка `response.ok` превращает непонятную ошибку разбора в названный статус.

## Пример 2 — Поиск, в котором побеждает самый медленный ответ

Запрос запускается на каждое нажатие клавиши. Результат отрисовывается, когда бы он ни пришёл. Набрав «keyboard», можно в итоге увидеть результаты для «key». Скажите, что здесь соревнуется, и заставьте брошенный запрос остановиться.

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

Промис отменить нельзя, а вот запрос под ним — можно. `AbortController` существует ровно для этого: начало нового поиска прерывает тот, что уже в полёте, поэтому устаревший ответ больше не перезапишет свежий. Отмена тоже приходит как ошибка, поэтому её нужно отличать от настоящего сбоя, иначе сообщение об ошибке показывалось бы на каждое нажатие клавиши.
