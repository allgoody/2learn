# Глоссарий русского корпуса

Этот файл — единая точка решения для русского корпуса: заголовки записей и повторяющиеся термины берутся только отсюда и нигде не придумываются заново. Валидатор (V17) сверяет текст `**Заголовок**` в каждой ссылке с полем `title` целевого файла.

## Правила заголовков

- Названия продуктов и языков остаются латиницей: React, Git, Docker, Kubernetes, Figma, npm, TypeScript.
- Описательная часть переводится; аббревиатуры остаются латиницей там, где это общепринятая форма: HTML, CSS, SQL, API, CI/CD, AWS, GCP, SEO, TDD, PWA, GEO, IAM, CSP.
- Аббревиатуры из других языков (RICE, MoSCoW, SCA, GA4, OWASP, WCAG) не транслитерируются.
- Точка в конце заголовка не ставится.
- Регистр — как в русской орфографии: заглавная только у первого слова и у имён собственных.
- Дочерние уроки в таблицу не входят: их заголовки берутся из их собственного файла и должны держаться той же терминологии, что и заголовок родителя.
- Русский заголовок записи совпадает с `title` в её `index.md`; оба берутся из этой таблицы.

## Терминология

| English | Русский | Примечание |
| --- | --- | --- |
| lesson | урок | Единица содержимого: `index.md` или дочерний файл. |
| entry | запись | Директория `NN-slug` с её `index.md`; одноимённа id. |
| prerequisite | предварительное требование | Идёт в `prereqs` и в раздел `Предварительные требования`. |
| track | трек | Раздел каталога; в теле — `Что в этом треке`. |
| shape | форма | Одна из трёх: полный урок, трек-лендинг, раздел. |
| skill | навык | Тип записи; противоположен `area`. |
| area | раздел | Обзорная страница, `type: area`, всегда `small`. |
| tier | уровень | `small`, `medium` или `large`; задаёт число дочерних уроков. |
| alias | псевдоним | Устаревшее название в `aliases`, ведёт на страницу раздела. |
| practice | практика | Раздел `Практика` с упражнениями. |
| exercise | упражнение | Подраздел `###` внутри `Практика`. |
| core ideas | ключевые идеи | Раздел `Ключевые идеи`. |
| common mistakes | частые ошибки | Раздел `Частые ошибки`. |
| go deeper | что читать дальше | Раздел `Что читать дальше`. |
| spec | спецификация | Описание того, что нужно сделать; не путать с требованием. |
| requirement | требование | Проверяемое условие, которому должен удовлетворять результат. |
| stakeholder | стейкхолдер | Заинтересованная сторона; в отрасли английское слово закрепилось. |
| trade-off | компромисс | Выбор с потерей: что-то улучшается за счёт другого. |
| code review | код-ревью | Проверка чужого кода; дефис сохраняется. |
| refactoring | рефакторинг | Изменение структуры без изменения поведения. |
| latency | задержка | Время от запроса до первого ответа. |
| throughput | пропускная способность | Сколько операций система выполняет за единицу времени. |
| deployment | развёртывание | Также в отрасли говорят `деплой`; в текстах используем `развёртывание`. |
| rollback | откат | Возврат к предыдущей рабочей версии. |
| index (database) | индекс | Структура ускорения поиска; в русском всегда `индекс`. |
| query plan | план запроса | Порядок операций, который выбрал оптимизатор. |
| schema | схема | Описание таблиц, полей и связей. |
| migration | миграция | Версионированное изменение схемы данных. |
| cache | кэш | Быстрое хранилище повторно используемых данных; не `кеш`. |
| queue | очередь | Список задач, обрабатываемых по порядку. |
| retry | повторная попытка | Повтор неудавшейся операции. |
| timeout | тайм-аут | Предельное время ожидания, после которого операция прерывается. |
| endpoint | эндпоинт | Адрес, по которому API принимает запрос. |
| payload | полезная нагрузка | Тело запроса или ответа; при первом употреблении поясняется. |
| container | контейнер | Изолированный процесс с образом и файловой системой. |
| cluster | кластер | Группа машин, работающих как одна система. |
| secret | секрет | Пароль, ключ или токен, который нельзя коммитить. |
| token | токен | Краткоживущее подтверждение доступа. |
| hash | хеш | Результат необратимого преобразования; в русском `хеш`. |
| encryption | шифрование | Преобразование данных так, чтобы их прочёл только владелец ключа. |
| certificate | сертификат | Удостоверение подлинности сервера в TLS. |
| consent | согласие | Разрешение пользователя на обработку данных. |
| retention | хранение | Срок, в течение которого данные хранятся по правилам. |

## Названия записей

| id | English title | Русский заголовок |
| --- | --- | --- |
| `01-cs-fundamentals/01-computer-science` | Computer Science | Информатика |
| `01-cs-fundamentals/02-data-structures` | Data Structures | Структуры данных |
| `01-cs-fundamentals/03-computer-networks` | Computer Networks | Компьютерные сети |
| `01-cs-fundamentals/04-database-internals` | Database Internals | Внутреннее устройство баз данных |
| `01-cs-fundamentals/05-concurrency-async-programming` | Concurrency & Async Programming | Конкурентность и асинхронное программирование |
| `01-cs-fundamentals/06-regular-expressions-regex` | Regular Expressions (Regex) | Регулярные выражения (Regex) |
| `01-cs-fundamentals/07-pseudocode` | Pseudocode | Псевдокод |
| `01-cs-fundamentals/08-clean-code` | Clean Code | Чистый код |
| `01-cs-fundamentals/09-solid-principles` | SOLID Principles | Принципы SOLID |
| `01-cs-fundamentals/10-unit-testing` | Unit Testing | Модульное тестирование |
| `01-cs-fundamentals/11-debugging` | Debugging | Отладка |
| `01-cs-fundamentals/12-git` | Git (Version Control System) | Git (система контроля версий) |
| `01-cs-fundamentals/13-unix-shell` | Unix Shell | Командная оболочка Unix |
| `01-cs-fundamentals/14-algorithms-big-o` | Algorithms & Big-O | Алгоритмы и Big-O |
| `01-cs-fundamentals/15-operating-systems` | Operating Systems | Операционные системы |
| `01-cs-fundamentals/16-code-reusability` | Code Reusability | Переиспользование кода |
| `01-cs-fundamentals/17-code-review` | Code Review | Код-ревью |
| `01-cs-fundamentals/18-design-patterns` | Design Patterns | Паттерны проектирования |
| `01-cs-fundamentals/19-refactoring` | Refactoring | Рефакторинг |
| `01-cs-fundamentals/20-test-driven-development-tdd` | Test-Driven Development (TDD) | Разработка через тестирование (TDD) |
| `01-cs-fundamentals/21-integration-testing` | Integration Testing | Интеграционное тестирование |
| `01-cs-fundamentals/22-git-branching-strategies` | Git Branching Strategies | Стратегии ветвления в Git |
| `01-cs-fundamentals/23-github` | GitHub | GitHub |
| `01-cs-fundamentals/24-command-line-interface` | Command-Line Interface | Интерфейс командной строки |
| `01-cs-fundamentals/25-software-architecture` | Software Architecture | Архитектура программного обеспечения |
| `01-cs-fundamentals/26-end-to-end-testing` | End-to-End Testing | Сквозное тестирование |
| `01-cs-fundamentals/27-playwright` | Playwright | Playwright |
| `02-frontend/01-html-and-css` | HTML and CSS | HTML и CSS |
| `02-frontend/02-front-end-web-development` | Front-End Web Development | Фронтенд-разработка |
| `02-frontend/03-html` | Hypertext Markup Language (HTML) | Язык гипертекстовой разметки (HTML) |
| `02-frontend/04-package-management-npm` | Package Management (npm) | Управление пакетами (npm) |
| `02-frontend/05-css` | Cascading Style Sheets (CSS) | Каскадные таблицы стилей (CSS) |
| `02-frontend/06-javascript` | Javascript | JavaScript |
| `02-frontend/07-responsive-images` | Responsive Images | Адаптивные изображения |
| `02-frontend/08-seo` | SEO | SEO |
| `02-frontend/09-vite` | Vite | Vite |
| `02-frontend/10-responsive-web-design` | Responsive Web Design | Адаптивный веб-дизайн |
| `02-frontend/11-accessibility-wcag-a11y` | Accessibility (WCAG / a11y) | Доступность (WCAG / a11y) |
| `02-frontend/12-ui-components` | UI Components | UI-компоненты |
| `02-frontend/13-bootstrap` | Bootstrap (Front-End Framework) | Bootstrap (фронтенд-фреймворк) |
| `02-frontend/14-tailwind-css` | Tailwind CSS | Tailwind CSS |
| `02-frontend/15-sass` | Sass | Sass |
| `02-frontend/16-motion-design` | Motion Design | Моушн-дизайн |
| `02-frontend/17-svg-icon-systems` | SVG & Icon Systems | SVG и системы иконок |
| `02-frontend/18-web-typography` | Web Typography | Веб-типографика |
| `02-frontend/19-typescript` | TypeScript | TypeScript |
| `02-frontend/20-browser-compatibility` | Browser Compatibility | Совместимость с браузерами |
| `02-frontend/21-ajax` | Ajax | Ajax |
| `02-frontend/22-vuejs` | Vue.js | Vue.js |
| `02-frontend/23-state-management` | State Management | Управление состоянием |
| `02-frontend/24-webpack` | Webpack | Webpack |
| `02-frontend/25-progressive-web-apps-pwa` | Progressive Web Apps (PWA) | Прогрессивные веб-приложения (PWA) |
| `02-frontend/26-web-performance-core-web-vitals` | Web Performance (Core Web Vitals) | Веб-производительность (Core Web Vitals) |
| `02-frontend/27-browser-devtools` | Browser DevTools | Инструменты разработчика в браузере |
| `02-frontend/28-generative-engine-optimization-geo` | Generative Engine Optimization (GEO) | Оптимизация под генеративные движки (GEO) |
| `02-frontend/29-react` | React | React |
| `02-frontend/30-angular` | Angular | Angular |
| `02-frontend/31-lighthouse` | Lighthouse | Lighthouse |
| `03-design-ux/01-ui-ux-design` | User Interface and User Experience (UI/UX) Design | Дизайн пользовательских интерфейсов и опыта (UI/UX) |
| `03-design-ux/02-design-thinking` | Design Thinking | Дизайн-мышление |
| `03-design-ux/03-facilitation-workshop-design` | Facilitation & Workshop Design | Фасилитация и проектирование воркшопов |
| `03-design-ux/04-sketching` | Sketching | Скетчинг |
| `03-design-ux/05-user-research` | User Research | Пользовательские исследования |
| `03-design-ux/06-google-analytics-4-ga4` | Google Analytics 4 (GA4) | Google Analytics 4 (GA4) |
| `03-design-ux/07-ux-writing-microcopy` | UX Writing & Microcopy | UX-тексты и микрокопирайтинг |
| `03-design-ux/08-content-strategy` | Content Strategy | Контент-стратегия |
| `03-design-ux/09-information-architecture` | Information Architecture | Информационная архитектура |
| `03-design-ux/10-visual-design` | Visual Design | Визуальный дизайн |
| `03-design-ux/11-usability` | Usability | Юзабилити |
| `03-design-ux/12-figma` | Figma (Design Software) | Figma (программа для дизайна) |
| `03-design-ux/13-miro` | Miro | Miro |
| `03-design-ux/14-notion` | Notion | Notion |
| `03-design-ux/15-user-centered-design` | User Centered Design | Человеко-ориентированное проектирование |
| `03-design-ux/16-storyboarding` | Storyboarding | Сторибординг |
| `03-design-ux/17-jobs-to-be-done` | Jobs-to-be-Done | Jobs-to-be-Done |
| `03-design-ux/18-ui-ux-research` | UI/UX Research | Исследования UI/UX |
| `03-design-ux/19-design-research` | Design Research | Дизайн-исследования |
| `03-design-ux/20-user-interviews` | User Interviews | Пользовательские интервью |
| `03-design-ux/21-survey-design` | Survey Design | Проектирование опросов |
| `03-design-ux/22-journey-mapping` | Journey Mapping | Картирование пути пользователя |
| `03-design-ux/23-persona-user-experience` | Persona (User Experience) | Персона (пользовательский опыт) |
| `03-design-ux/24-quantitative-ux-research` | Quantitative UX Research | Количественные UX-исследования |
| `03-design-ux/25-hotjar` | Hotjar | Hotjar |
| `03-design-ux/26-card-sorting` | Card Sorting | Сортировка карточек |
| `03-design-ux/27-wireframing` | Wireframing | Вайрфрейминг |
| `03-design-ux/28-typography` | Typography | Типографика |
| `03-design-ux/29-color-theory` | Color Theory | Теория цвета |
| `03-design-ux/30-layout-grid-systems` | Layout & Grid Systems | Макетирование и сеточные системы |
| `03-design-ux/31-data-visualization` | Data Visualization | Визуализация данных |
| `03-design-ux/32-design-systems` | Design Systems | Дизайн-системы |
| `03-design-ux/33-usability-testing` | Usability Testing | Юзабилити-тестирование |
| `03-design-ux/34-heuristic-evaluation` | Heuristic Evaluation | Эвристическая оценка |
| `03-design-ux/35-adobe-xd` | Adobe XD | Adobe XD |
| `03-design-ux/36-framer` | Framer | Framer |
| `03-design-ux/37-lean-ux` | Lean UX | Lean UX |
| `03-design-ux/38-service-design` | Service Design | Сервис-дизайн |
| `03-design-ux/39-ab-testing` | A/B Testing | A/B-тестирование |
| `03-design-ux/40-prototyping` | Prototyping | Прототипирование |
| `03-design-ux/41-design-tokens` | Design Tokens | Дизайн-токены |
| `03-design-ux/42-design-handoff-specs` | Design Handoff & Specs | Передача дизайна и спецификации |
| `03-design-ux/43-maze` | Maze | Maze |
| `03-design-ux/44-interaction-design` | Interaction Design | Интерактивный дизайн |
| `04-product-process/01-software-development` | Software Development | Разработка программного обеспечения |
| `04-product-process/02-agile-methodology` | Agile Methodology | Методология Agile |
| `04-product-process/03-product-management` | Product Management | Управление продуктом |
| `04-product-process/04-product-discovery` | Product Discovery | Продуктовое исследование |
| `04-product-process/05-requirements-engineering` | Requirements Engineering | Инженерия требований |
| `04-product-process/06-business-analysis` | Business Analysis | Бизнес-анализ |
| `04-product-process/07-stakeholder-management` | Stakeholder Management | Работа со стейкхолдерами |
| `04-product-process/08-technical-writing` | Technical Writing | Техническое письмо |
| `04-product-process/09-agile-software-development` | Agile Software Development | Разработка ПО по Agile |
| `04-product-process/10-scrum-software-development` | Scrum (Software Development) | Scrum (разработка ПО) |
| `04-product-process/11-kanban` | Kanban | Kanban |
| `04-product-process/12-user-story` | User Story | Пользовательская история |
| `04-product-process/13-jira-confluence` | Jira & Confluence | Jira и Confluence |
| `04-product-process/14-roadmapping` | Roadmapping | Дорожная карта |
| `04-product-process/15-prioritization-frameworks-rice-moscow` | Prioritization Frameworks (RICE / MoSCoW) | Фреймворки приоритизации (RICE / MoSCoW) |
| `04-product-process/16-user-acceptance-testing` | User Acceptance Testing | Приёмочное тестирование пользователем |
| `04-product-process/17-estimation-story-points` | Estimation & Story Points | Оценка и story points |
| `05-backend-data/01-server-side` | Server Side | Серверная часть |
| `05-backend-data/02-nodejs` | Node.JS | Node.js |
| `05-backend-data/03-python-programming` | Python Programming | Программирование на Python |
| `05-backend-data/04-java` | Java | Java |
| `05-backend-data/05-go` | Go | Go |
| `05-backend-data/06-restful-api` | Restful API | RESTful API |
| `05-backend-data/07-sql-relational-databases` | SQL & Relational Databases | SQL и реляционные базы данных |
| `05-backend-data/08-expressjs` | Express.js | Express.js |
| `05-backend-data/09-api-design-openapi-swagger` | API Design (OpenAPI / Swagger) | Проектирование API (OpenAPI / Swagger) |
| `05-backend-data/10-authentication-authorization-oauth2-jwt` | Authentication & Authorization (OAuth2 / JWT) | Аутентификация и авторизация (OAuth2 / JWT) |
| `05-backend-data/11-websockets` | WebSockets | WebSockets |
| `05-backend-data/12-microservices` | Microservices | Микросервисы |
| `05-backend-data/13-nosql` | NoSQL | NoSQL |
| `05-backend-data/14-database-design` | Database Design | Проектирование баз данных |
| `05-backend-data/15-object-relational-mapping` | Object-Relational Mapping | Объектно-реляционное отображение |
| `05-backend-data/16-caching-redis` | Caching (Redis) | Кэширование (Redis) |
| `05-backend-data/17-message-queues-kafka-rabbitmq` | Message Queues (Kafka / RabbitMQ) | Очереди сообщений (Kafka / RabbitMQ) |
| `05-backend-data/18-mongodb` | MongoDB | MongoDB |
| `05-backend-data/19-prisma-orm` | Prisma ORM | Prisma ORM |
| `06-cloud-devops/01-cloud-computing` | Cloud Computing | Облачные вычисления |
| `06-cloud-devops/02-aws` | AWS | AWS |
| `06-cloud-devops/03-microsoft-azure` | Microsoft Azure | Microsoft Azure |
| `06-cloud-devops/04-google-cloud-platform-gcp` | Google Cloud Platform (GCP) | Google Cloud Platform (GCP) |
| `06-cloud-devops/05-serverless-computing` | Serverless Computing | Бессерверные вычисления |
| `06-cloud-devops/06-docker` | Docker | Docker |
| `06-cloud-devops/07-terraform` | Terraform | Terraform |
| `06-cloud-devops/08-ci-cd` | CI/CD | CI/CD |
| `06-cloud-devops/09-linux-administration` | Linux Administration | Администрирование Linux |
| `06-cloud-devops/10-networking-fundamentals-http-dns-tls` | Networking Fundamentals (HTTP / DNS / TLS) | Основы сетей (HTTP / DNS / TLS) |
| `06-cloud-devops/11-cloud-cost-management` | Cloud Cost Management | Управление затратами на облако |
| `06-cloud-devops/12-cloud-security-iam` | Cloud Security & IAM | Безопасность в облаке и IAM |
| `06-cloud-devops/13-cloud-native-computing` | Cloud-Native Computing | Облачно-нативные вычисления |
| `06-cloud-devops/14-kubernetes` | Kubernetes | Kubernetes |
| `06-cloud-devops/15-github-actions` | GitHub Actions | GitHub Actions |
| `06-cloud-devops/16-jenkins` | Jenkins | Jenkins |
| `06-cloud-devops/17-azure-devops` | Azure DevOps | Azure DevOps |
| `06-cloud-devops/18-monitoring-observability-prometheus-grafana` | Monitoring & Observability (Prometheus / Grafana) | Мониторинг и наблюдаемость (Prometheus / Grafana) |
| `06-cloud-devops/19-nginx` | Nginx | Nginx |
| `06-cloud-devops/20-openshift` | OpenShift | OpenShift |
| `06-cloud-devops/21-helm` | Helm | Helm |
| `06-cloud-devops/22-istio` | Istio | Istio |
| `06-cloud-devops/23-site-reliability-engineering` | Site Reliability Engineering | Обеспечение надёжности сайтов |
| `07-security/01-web-security-owasp-top-10` | Web Security (OWASP Top 10) | Веб-безопасность (OWASP Top 10) |
| `07-security/02-https-tls` | HTTPS & TLS | HTTPS и TLS |
| `07-security/03-secrets-management` | Secrets Management | Управление секретами |
| `07-security/04-dependency-scanning-sca` | Dependency Scanning (SCA) | Сканирование зависимостей (SCA) |
| `07-security/05-gdpr-data-privacy` | GDPR & Data Privacy | GDPR и приватность данных |
| `07-security/06-content-security-policy-csp` | Content Security Policy (CSP) | Content Security Policy (CSP) |
| `07-security/07-data-ethics` | Data Ethics | Этика данных |
| `08-soft-skills/01-communication` | Communication | Коммуникация |
| `08-soft-skills/02-teamwork-collaboration` | Teamwork & Collaboration | Командная работа и сотрудничество |
| `08-soft-skills/03-mentoring` | Mentoring | Наставничество |
| `08-soft-skills/04-problem-solving` | Problem Solving | Решение задач |
| `08-soft-skills/05-time-management` | Time Management | Управление временем |
| `08-soft-skills/06-portfolio-building` | Portfolio Building | Формирование портфолио |
| `08-soft-skills/07-interview-prep-whiteboarding` | Interview Prep & Whiteboarding | Подготовка к собеседованию и решение задач на доске |
| `08-soft-skills/08-freelancing-client-work` | Freelancing & Client Work | Фриланс и работа с клиентами |
| `08-soft-skills/09-technical-presentation` | Technical Presentation | Техническая презентация |
