## Пример 1 — Место вызова, которое никто не может прочесть

У функции ниже одно место вызова, и рецензент не может понять, что она делает, не прочитав тело. Скажите, какие две привычки она нарушает, затем перепишите функцию и вызов так, чтобы вызов читался как предложение.

```ts
function proc(u, a, f) {
  let r = [];
  for (const x of u) {
    if (x.s === "active") r.push(x);
  }
  if (f) r = r.slice(0, 10);
  if (a) r.sort((p, q) => q.c - p.c);
  return r;
}

const d = proc(users, true, false);
```

### Решение

```ts
function activeUsersBySpend(users, limit) {
  return users
    .filter((user) => user.status === "active")
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit);
}

const topActiveUsers = activeUsersBySpend(users, 10);
```

Старые имена не описывают ничего: `u`, `a` и `f` загоняют читателя в тело функции, а два булевых флага заставляют её делать четыре вещи в зависимости от того, как их выставили. Стоит назвать результат и передать предел значением вместо флага — и место вызова само становится предложением, так что открывать функцию читателю больше не нужно. Ловушка здесь в другом: версию с флагом написать легче, ведь обе ветки уже есть, а добавление булева значения выглядит меньшим изменением, чем разделение функции.

## Пример 2 — Функция, читающаяся как три функции

Тело ниже проверяет, преобразует и сохраняет в одном блоке. Скажите, как читатель может понять, что она делает больше одной вещи, затем перепишите её как шаги одного уровня.

```ts
async function handleUpload(file) {
  const text = await fs.readFile(file, "utf8");
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  const rows = [];
  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length < 3) continue;
    rows.push({ id: parts[0], name: parts[1], amount: Number(parts[2]) });
  }
  await db.insertMany(rows);
  return rows.length;
}
```

### Решение

```ts
async function handleUpload(file) {
  const rows = await readRows(file);
  return saveRows(rows);
}

async function readRows(file) {
  const text = await fs.readFile(file, "utf8");
  return text.split("\n").map(parseRow).filter(Boolean);
}

async function saveRows(rows) {
  await db.insertMany(rows);
  return rows.length;
}
```

Функция-координатор теперь читается как сводка — два вызова одного уровня, — а детали лежат на шаг глубже, где `parseRow` держит разбиение и преобразование суммы. Ловушка в том, что исходный блок выглядит эффективным: один проход и никаких лишних имён, — но при этом заставляет читателя держать в голове разом чтение файла, разбор, проверку и сохранение. Рецензент даже не скажет, к какому из четырёх шагов относится следующий комментарий.
