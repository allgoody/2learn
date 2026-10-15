## Пример 1 — Service, который стоит ни перед чем

Deployment и service применили вместе. Pod'ы работают, но запросы к service истекают по тайм-ауту. Найдите недостающую связь и исправьте её.

```yaml
# service
spec:
  selector:
    app: api

# deployment
spec:
  template:
    metadata:
      labels:
        app: api-server
```

### Решение

```yaml
# service
spec:
  selector:
    app: api-server
```

```text
$ kubectl get endpoints api
NAME   ENDPOINTS   AGE
api    <none>      4m

$ kubectl get pods --show-labels
NAME         READY   STATUS    LABELS
api-6c9f9    1/1     Running   app=api-server
```

Ничто в Kubernetes не содержит указателя на что-либо другое; service находит pod'ы только там, где метка равна его селектору, поэтому несовпадающее значение оставило service с пустым списком endpoints. Опечатка — обычная ошибка, а здоровый pod рядом с пустыми endpoints — доказательство, отличающее её от упавшего приложения.

## Пример 2 — Правка, которая исчезает

Разработчик исправляет неверную настройку, правя работающий pod, видит, что изменение применилось, и закрывает задачу. Позже значение возвращается. Объясните, что произошло, и перенесите изменение туда, где оно выживет.

```bash
$ kubectl edit pod api-6c9f9
pod/api-6c9f9 edited
```

### Решение

```yaml
# шаблон pod'а deployment, а не работающий pod
spec:
  template:
    spec:
      containers:
        - name: api
          env:
            - name: LOG_LEVEL
              value: debug
```

```text
$ kubectl get pods
NAME         READY   STATUS    AGE
api-7d4b2    1/1     Running   12s
```

Pod — единица выполнения, но не та единица, которую пишут: им владеет контроллер и создаёт его заново из шаблона, поэтому pod, правленный руками, — это расхождение, которое контроллер и предназначен исправлять. Заменяющий pod был построен из неизменённого шаблона, потому значение и вернулось. Вносите изменение во владеющий объект: применённый файл — не то состояние, что работает.

Подставьте свои имена объектов и детали кластера там, где эти наброски используют заполнители.
