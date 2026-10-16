## Пример 1 — Три флага, которые могут противоречить друг другу

Логический флаг и два необязательных поля отслеживают состояние загрузки, а отрисовка читает `items`, прежде чем проверить, есть ли они. Скажите, какие сочетания допускает такой тип, затем сделайте невозможные сочетания непредставимыми.

```ts
type LoadState = { loading: boolean; items?: Item[]; error?: string };

function render(state: LoadState) {
  if (state.loading) return "Loading…";
  if (state.error) return showError(state.error);
  return listItems(state.items);   // Item[] | undefined
}
```

### Решение

```ts
type LoadState =
  | { status: "loading" }
  | { status: "ready"; items: Item[] }
  | { status: "error"; message: string };

function render(state: LoadState): string {
  switch (state.status) {
    case "loading": return "Loading…";
    case "ready": return listItems(state.items);
    case "error": return showError(state.message);
    default: {
      const unhandled: never = state;
      throw new Error(`unhandled state: ${JSON.stringify(unhandled)}`);
    }
  }
}
```

```text
// после добавления четвёртого варианта: | { status: "empty" }
const unhandled: never = state;
      ~~~~~~~~~
error TS2322: Type '{ status: "empty"; }' is not assignable to type 'never'.
```

Три отдельных факта могут противоречить друг другу: загрузка при наличии данных, ошибка без сообщения. Размеченное объединение хранит один факт, поэтому невозможные сочетания нельзя написать, а внутри ветки компилятор знает, какие поля существуют, — `state.items` доступно только там, где оно реально. Присваивание переменной типа `never` и делает исчерпываемость проверкой времени компиляции, а не соглашением: добавьте вариант, и каждый `switch`, обязанный его обработать, перестанет собираться, так что ничто не будет молча пропущено.

## Пример 2 — null, проходящий проверку на объект

Помощник принимает текст, список текстов или ничего и сужает значение через `typeof`, но случай `null` проскакивает в ту же ветку, что и список. Объясните, какой проверки не хватает, затем исправьте всё и вынесите проверку времени выполнения в отдельную функцию.

```ts
function length(value: string | string[] | null): number {
  if (typeof value === "object") return value.length;   // null — тоже объект
  return value.length;
}
```

### Решение

```ts
function length(value: string | string[] | null): number {
  if (value === null) return 0;
  return value.length;
}

type ApiResponse = { data: Item[] } | { error: string };

function isError(response: ApiResponse): response is { error: string } {
  return "error" in response;
}
```

`typeof null` равно `"object"`, поэтому для значения `null` выполняется ветка объекта, и сужение ошибается насчёт того, что оно доказало; проверка обязана сравнивать с `null` явно, прежде чем проверять тип. Повторяемая проверка времени выполнения должна жить в одной функции, возвращающей предикат типа, — тогда знание существует в одном месте, и каждый вызывающий код получает сужение, — а единственная ошибка, которой здесь нужно избегать, — страж, слишком охотно возвращающий `true`.
