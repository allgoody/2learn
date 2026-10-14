# Appendix A — Authoritative Inventory

**177 entries.** This table is the single source of truth for slugs, titles, types,
tiers and prerequisites. WP-2 transcribes it verbatim into `tools/inventory.json`.
No work package may invent, rename, re-tier or re-link an entry.

Column notes:

- **id** — `<topic>/<slug>`, the directory path under `lessons/`.
- **Title** — verbatim from `seed/<topic>.md`. Do not reword.
- **Type** — `skill` or `area`. Areas get an area page and never have children.
- **Tier** — `small` (0 children), `medium` (2 children), `large` (4 children).
  Areas are always `small`.
- **Prereqs** — inventory ids. `—` means an empty array. Cross-topic ids are valid.
- **Aliases** — alternative names, used for search and redirects. `—` means an
  empty array.

Totals: **15 large, 82 medium, 80 small/area** → 177 index pages + 224 child
lessons = **401 content files**.

---

## frontend — 31 entries (77 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `frontend/html` | Hypertext Markup Language (HTML) | skill | small | — | HTML |
| `frontend/css` | Cascading Style Sheets (CSS) | skill | large | `frontend/html` | CSS |
| `frontend/html-and-css` | HTML and CSS | area | small | — | — |
| `frontend/javascript` | Javascript | skill | large | `frontend/html` | JavaScript |
| `frontend/typescript` | TypeScript | skill | large | `frontend/javascript` | — |
| `frontend/responsive-web-design` | Responsive Web Design | skill | medium | `frontend/css` | — |
| `frontend/accessibility-wcag-a11y` | Accessibility (WCAG / a11y) | skill | medium | `frontend/html`, `frontend/css` | WCAG, a11y |
| `frontend/ui-components` | UI Components | skill | medium | `frontend/html`, `frontend/css` | — |
| `frontend/browser-compatibility` | Browser Compatibility | skill | small | `frontend/html`, `frontend/css`, `frontend/javascript` | — |
| `frontend/ajax` | Ajax | skill | small | `frontend/javascript` | AJAX |
| `frontend/react` | React | skill | large | `frontend/javascript`, `frontend/typescript` | React.js |
| `frontend/vuejs` | Vue.js | skill | medium | `frontend/javascript` | Vue |
| `frontend/angular` | Angular | skill | medium | `frontend/typescript` | — |
| `frontend/bootstrap` | Bootstrap (Front-End Framework) | skill | small | `frontend/css` | — |
| `frontend/tailwind-css` | Tailwind CSS | skill | medium | `frontend/css` | — |
| `frontend/sass` | Sass | skill | small | `frontend/css` | SCSS |
| `frontend/state-management` | State Management | skill | medium | `frontend/javascript` | — |
| `frontend/motion-design` | Motion Design | skill | medium | `frontend/css` | — |
| `frontend/svg-icon-systems` | SVG & Icon Systems | skill | medium | `frontend/html`, `frontend/css` | — |
| `frontend/web-typography` | Web Typography | skill | medium | `frontend/css` | — |
| `frontend/responsive-images` | Responsive Images | skill | small | `frontend/html` | — |
| `frontend/package-management-npm` | Package Management (npm) | skill | medium | — | npm |
| `frontend/webpack` | Webpack | skill | small | `frontend/javascript`, `frontend/package-management-npm` | — |
| `frontend/vite` | Vite | skill | small | `frontend/package-management-npm` | — |
| `frontend/seo` | SEO | skill | medium | `frontend/html` | Search Engine Optimization |
| `frontend/generative-engine-optimization-geo` | Generative Engine Optimization (GEO) | skill | small | `frontend/seo` | GEO |
| `frontend/progressive-web-apps-pwa` | Progressive Web Apps (PWA) | skill | medium | `frontend/javascript` | PWA |
| `frontend/web-performance-core-web-vitals` | Web Performance (Core Web Vitals) | skill | medium | `frontend/javascript`, `frontend/css` | Core Web Vitals |
| `frontend/lighthouse` | Lighthouse | skill | small | `frontend/browser-devtools` | — |
| `frontend/browser-devtools` | Browser DevTools | skill | medium | `frontend/javascript` | DevTools |
| `frontend/front-end-web-development` | Front-End Web Development | area | small | — | Front-End Development |

---

## cs-fundamentals — 27 entries (63 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `cs-fundamentals/computer-science` | Computer Science | area | small | — | CS |
| `cs-fundamentals/data-structures` | Data Structures | skill | medium | — | — |
| `cs-fundamentals/algorithms-big-o` | Algorithms & Big-O | skill | medium | `cs-fundamentals/data-structures` | Big-O |
| `cs-fundamentals/operating-systems` | Operating Systems | skill | medium | `cs-fundamentals/data-structures` | OS |
| `cs-fundamentals/computer-networks` | Computer Networks | skill | medium | — | — |
| `cs-fundamentals/database-internals` | Database Internals | skill | small | `backend-data/sql-relational-databases` | — |
| `cs-fundamentals/concurrency-async-programming` | Concurrency & Async Programming | skill | medium | — | — |
| `cs-fundamentals/regular-expressions-regex` | Regular Expressions (Regex) | skill | small | — | Regex |
| `cs-fundamentals/pseudocode` | Pseudocode | skill | small | — | — |
| `cs-fundamentals/clean-code` | Clean Code | skill | medium | — | — |
| `cs-fundamentals/code-reusability` | Code Reusability | skill | small | `cs-fundamentals/clean-code` | — |
| `cs-fundamentals/refactoring` | Refactoring | skill | medium | `cs-fundamentals/clean-code`, `cs-fundamentals/unit-testing` | — |
| `cs-fundamentals/design-patterns` | Design Patterns | skill | medium | `cs-fundamentals/solid-principles` | — |
| `cs-fundamentals/solid-principles` | SOLID Principles | skill | small | — | SOLID |
| `cs-fundamentals/code-review` | Code Review | skill | medium | `cs-fundamentals/clean-code` | — |
| `cs-fundamentals/software-architecture` | Software Architecture | skill | large | `cs-fundamentals/design-patterns`, `cs-fundamentals/clean-code` | — |
| `cs-fundamentals/unit-testing` | Unit Testing | skill | medium | — | — |
| `cs-fundamentals/test-driven-development-tdd` | Test-Driven Development (TDD) | skill | medium | `cs-fundamentals/unit-testing` | TDD |
| `cs-fundamentals/integration-testing` | Integration Testing | skill | medium | `cs-fundamentals/unit-testing` | — |
| `cs-fundamentals/end-to-end-testing` | End-to-End Testing | skill | medium | `cs-fundamentals/integration-testing` | E2E |
| `cs-fundamentals/playwright` | Playwright | skill | small | `cs-fundamentals/end-to-end-testing` | — |
| `cs-fundamentals/debugging` | Debugging | skill | medium | — | — |
| `cs-fundamentals/git` | Git (Version Control System) | skill | medium | — | Git |
| `cs-fundamentals/git-branching-strategies` | Git Branching Strategies | skill | small | `cs-fundamentals/git` | — |
| `cs-fundamentals/github` | GitHub | skill | small | `cs-fundamentals/git` | — |
| `cs-fundamentals/unix-shell` | Unix Shell | skill | medium | — | Bash |
| `cs-fundamentals/command-line-interface` | Command-Line Interface | skill | small | `cs-fundamentals/unix-shell` | CLI |

---

## cloud-devops — 23 entries (59 files)

Sixteen seed entries collapse into these entries; the six cloud umbrellas merge into
`cloud-devops/cloud-computing` (see `_index.md` merge table).

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `cloud-devops/cloud-computing` | Cloud Computing | area | small | — | Cloud Infrastructure, Cloud Development, Cloud Applications, Cloud Deployment, Application Deployment |
| `cloud-devops/aws` | AWS | skill | large | `cloud-devops/cloud-computing` | Amazon Web Services |
| `cloud-devops/microsoft-azure` | Microsoft Azure | skill | medium | `cloud-devops/cloud-computing` | Azure |
| `cloud-devops/google-cloud-platform-gcp` | Google Cloud Platform (GCP) | skill | medium | `cloud-devops/cloud-computing` | GCP |
| `cloud-devops/cloud-cost-management` | Cloud Cost Management | skill | small | `cloud-devops/aws` | FinOps |
| `cloud-devops/serverless-computing` | Serverless Computing | skill | medium | `cloud-devops/cloud-computing` | — |
| `cloud-devops/cloud-native-computing` | Cloud-Native Computing | skill | medium | `cloud-devops/cloud-computing`, `cloud-devops/docker` | — |
| `cloud-devops/docker` | Docker | skill | medium | — | — |
| `cloud-devops/kubernetes` | Kubernetes | skill | large | `cloud-devops/docker` | k8s |
| `cloud-devops/openshift` | OpenShift | skill | small | `cloud-devops/kubernetes` | — |
| `cloud-devops/helm` | Helm | skill | small | `cloud-devops/kubernetes` | — |
| `cloud-devops/istio` | Istio | skill | small | `cloud-devops/kubernetes`, `cloud-devops/networking-fundamentals-http-dns-tls` | — |
| `cloud-devops/terraform` | Terraform | skill | medium | `cloud-devops/cloud-computing` | — |
| `cloud-devops/ci-cd` | CI/CD | skill | medium | `cs-fundamentals/git` | Continuous Integration, Continuous Delivery |
| `cloud-devops/github-actions` | GitHub Actions | skill | medium | `cloud-devops/ci-cd`, `cs-fundamentals/github` | — |
| `cloud-devops/jenkins` | Jenkins | skill | small | `cloud-devops/ci-cd` | — |
| `cloud-devops/azure-devops` | Azure DevOps | skill | small | `cloud-devops/ci-cd` | — |
| `cloud-devops/nginx` | Nginx | skill | small | `cloud-devops/networking-fundamentals-http-dns-tls` | — |
| `cloud-devops/linux-administration` | Linux Administration | skill | large | — | — |
| `cloud-devops/networking-fundamentals-http-dns-tls` | Networking Fundamentals (HTTP / DNS / TLS) | skill | medium | `cs-fundamentals/computer-networks` | HTTP, DNS, TLS |
| `cloud-devops/monitoring-observability-prometheus-grafana` | Monitoring & Observability (Prometheus / Grafana) | skill | medium | `cloud-devops/linux-administration` | Prometheus, Grafana |
| `cloud-devops/site-reliability-engineering` | Site Reliability Engineering | skill | medium | `cloud-devops/monitoring-observability-prometheus-grafana` | SRE |
| `cloud-devops/cloud-security-iam` | Cloud Security & IAM | skill | medium | `cloud-devops/aws` | IAM |

---

## backend-data — 19 entries (53 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `backend-data/nodejs` | Node.JS | skill | medium | `frontend/javascript` | Node.js, Node |
| `backend-data/expressjs` | Express.js | skill | small | `backend-data/nodejs` | Express |
| `backend-data/python-programming` | Python Programming | skill | large | — | Python |
| `backend-data/java` | Java | skill | large | — | — |
| `backend-data/go` | Go | skill | medium | — | Golang |
| `backend-data/server-side` | Server Side | area | small | — | Server-Side Development |
| `backend-data/restful-api` | Restful API | skill | medium | — | REST |
| `backend-data/api-design-openapi-swagger` | API Design (OpenAPI / Swagger) | skill | medium | `backend-data/restful-api` | OpenAPI, Swagger |
| `backend-data/authentication-authorization-oauth2-jwt` | Authentication & Authorization (OAuth2 / JWT) | skill | medium | `backend-data/restful-api` | OAuth2, JWT |
| `backend-data/websockets` | WebSockets | skill | small | `backend-data/restful-api` | — |
| `backend-data/sql-relational-databases` | SQL & Relational Databases | skill | large | — | SQL |
| `backend-data/nosql` | NoSQL | skill | medium | `backend-data/sql-relational-databases` | — |
| `backend-data/mongodb` | MongoDB | skill | medium | `backend-data/nosql` | — |
| `backend-data/database-design` | Database Design | skill | medium | `backend-data/sql-relational-databases` | — |
| `backend-data/object-relational-mapping` | Object-Relational Mapping | skill | small | `backend-data/sql-relational-databases` | ORM |
| `backend-data/prisma-orm` | Prisma ORM | skill | small | `backend-data/object-relational-mapping`, `backend-data/nodejs` | Prisma |
| `backend-data/caching-redis` | Caching (Redis) | skill | medium | `backend-data/sql-relational-databases` | Redis |
| `backend-data/microservices` | Microservices | skill | medium | `backend-data/restful-api` | — |
| `backend-data/message-queues-kafka-rabbitmq` | Message Queues (Kafka / RabbitMQ) | skill | medium | `backend-data/microservices` | Kafka, RabbitMQ |

---

## design-ux — 44 entries (88 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `design-ux/design-thinking` | Design Thinking | skill | medium | — | — |
| `design-ux/user-centered-design` | User Centered Design | skill | small | `design-ux/design-thinking` | User-Centred Design |
| `design-ux/lean-ux` | Lean UX | skill | small | `design-ux/user-centered-design` | — |
| `design-ux/jobs-to-be-done` | Jobs-to-be-Done | skill | small | `design-ux/user-research` | JTBD |
| `design-ux/service-design` | Service Design | skill | medium | `design-ux/journey-mapping` | — |
| `design-ux/facilitation-workshop-design` | Facilitation & Workshop Design | skill | small | — | — |
| `design-ux/storyboarding` | Storyboarding | skill | small | `design-ux/sketching` | — |
| `design-ux/sketching` | Sketching | skill | small | — | — |
| `design-ux/user-research` | User Research | skill | large | — | — |
| `design-ux/ui-ux-research` | UI/UX Research | skill | small | `design-ux/user-research` | — |
| `design-ux/design-research` | Design Research | skill | small | `design-ux/user-research` | — |
| `design-ux/user-interviews` | User Interviews | skill | medium | `design-ux/user-research` | — |
| `design-ux/survey-design` | Survey Design | skill | medium | `design-ux/user-research` | — |
| `design-ux/card-sorting` | Card Sorting | skill | small | `design-ux/information-architecture` | — |
| `design-ux/journey-mapping` | Journey Mapping | skill | medium | `design-ux/user-research` | — |
| `design-ux/persona-user-experience` | Persona (User Experience) | skill | small | `design-ux/user-research` | Persona |
| `design-ux/quantitative-ux-research` | Quantitative UX Research | skill | medium | `design-ux/user-research` | — |
| `design-ux/ab-testing` | A/B Testing | skill | medium | `design-ux/quantitative-ux-research` | — |
| `design-ux/google-analytics-4-ga4` | Google Analytics 4 (GA4) | skill | medium | — | GA4 |
| `design-ux/ux-writing-microcopy` | UX Writing & Microcopy | skill | small | — | Microcopy |
| `design-ux/content-strategy` | Content Strategy | skill | medium | — | — |
| `design-ux/information-architecture` | Information Architecture | skill | large | — | IA |
| `design-ux/wireframing` | Wireframing | skill | small | `design-ux/information-architecture` | — |
| `design-ux/prototyping` | Prototyping | skill | medium | `design-ux/wireframing` | — |
| `design-ux/interaction-design` | Interaction Design | skill | medium | `design-ux/prototyping` | IxD |
| `design-ux/visual-design` | Visual Design | skill | medium | — | — |
| `design-ux/typography` | Typography | skill | medium | `design-ux/visual-design` | — |
| `design-ux/color-theory` | Color Theory | skill | small | `design-ux/visual-design` | Colour Theory |
| `design-ux/layout-grid-systems` | Layout & Grid Systems | skill | medium | `design-ux/visual-design` | — |
| `design-ux/data-visualization` | Data Visualization | skill | medium | `design-ux/visual-design` | — |
| `design-ux/design-systems` | Design Systems | skill | large | `design-ux/visual-design`, `frontend/ui-components` | — |
| `design-ux/design-tokens` | Design Tokens | skill | small | `design-ux/design-systems` | — |
| `design-ux/design-handoff-specs` | Design Handoff & Specs | skill | small | `design-ux/design-systems` | — |
| `design-ux/usability` | Usability | skill | small | — | — |
| `design-ux/usability-testing` | Usability Testing | skill | medium | `design-ux/usability` | — |
| `design-ux/heuristic-evaluation` | Heuristic Evaluation | skill | small | `design-ux/usability` | — |
| `design-ux/figma` | Figma (Design Software) | skill | small | — | Figma |
| `design-ux/adobe-xd` | Adobe XD | skill | small | `design-ux/figma` | — |
| `design-ux/framer` | Framer | skill | small | `design-ux/figma` | — |
| `design-ux/miro` | Miro | skill | small | — | — |
| `design-ux/maze` | Maze | skill | small | `design-ux/usability-testing` | — |
| `design-ux/notion` | Notion | skill | small | — | — |
| `design-ux/hotjar` | Hotjar | skill | small | `design-ux/google-analytics-4-ga4` | — |
| `design-ux/ui-ux-design` | User Interface and User Experience (UI/UX) Design | area | small | — | UI/UX Design, UI, User Experience, User Experience Design |

---

## product-process — 17 entries (35 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `product-process/agile-methodology` | Agile Methodology | skill | medium | — | Agile |
| `product-process/agile-software-development` | Agile Software Development | skill | small | `product-process/agile-methodology` | — |
| `product-process/scrum-software-development` | Scrum (Software Development) | skill | medium | `product-process/agile-methodology` | Scrum |
| `product-process/kanban` | Kanban | skill | small | `product-process/agile-methodology` | — |
| `product-process/user-story` | User Story | skill | small | `product-process/agile-methodology` | — |
| `product-process/estimation-story-points` | Estimation & Story Points | skill | small | `product-process/user-story` | Story Points |
| `product-process/jira-confluence` | Jira & Confluence | skill | small | `product-process/agile-methodology` | Jira, Confluence |
| `product-process/product-management` | Product Management | skill | large | — | — |
| `product-process/product-discovery` | Product Discovery | skill | medium | `design-ux/user-research` | — |
| `product-process/roadmapping` | Roadmapping | skill | small | `product-process/product-management` | — |
| `product-process/prioritization-frameworks-rice-moscow` | Prioritization Frameworks (RICE / MoSCoW) | skill | small | `product-process/product-management` | RICE, MoSCoW |
| `product-process/requirements-engineering` | Requirements Engineering | skill | medium | — | — |
| `product-process/business-analysis` | Business Analysis | skill | medium | — | — |
| `product-process/stakeholder-management` | Stakeholder Management | skill | medium | — | — |
| `product-process/user-acceptance-testing` | User Acceptance Testing | skill | small | `product-process/requirements-engineering` | UAT |
| `product-process/technical-writing` | Technical Writing | skill | medium | — | — |
| `product-process/software-development` | Software Development | area | small | — | Application Development, Software Development Life Cycle, SDLC |

---

## security — 7 entries (13 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `security/web-security-owasp-top-10` | Web Security (OWASP Top 10) | skill | medium | — | OWASP |
| `security/https-tls` | HTTPS & TLS | skill | medium | `cloud-devops/networking-fundamentals-http-dns-tls` | TLS |
| `security/content-security-policy-csp` | Content Security Policy (CSP) | skill | small | `security/web-security-owasp-top-10`, `security/https-tls` | CSP |
| `security/secrets-management` | Secrets Management | skill | small | — | — |
| `security/dependency-scanning-sca` | Dependency Scanning (SCA) | skill | small | `frontend/package-management-npm` | SCA |
| `security/gdpr-data-privacy` | GDPR & Data Privacy | skill | medium | — | GDPR |
| `security/data-ethics` | Data Ethics | skill | small | `security/gdpr-data-privacy` | — |

---

## soft-skills — 9 entries (13 files)

| id | Title | Type | Tier | Prereqs | Aliases |
| --- | --- | --- | --- | --- | --- |
| `soft-skills/communication` | Communication | skill | medium | — | — |
| `soft-skills/teamwork-collaboration` | Teamwork & Collaboration | skill | small | — | — |
| `soft-skills/mentoring` | Mentoring | skill | small | — | — |
| `soft-skills/problem-solving` | Problem Solving | skill | small | — | — |
| `soft-skills/time-management` | Time Management | skill | small | — | — |
| `soft-skills/technical-presentation` | Technical Presentation | skill | small | `soft-skills/communication` | — |
| `soft-skills/portfolio-building` | Portfolio Building | skill | small | — | — |
| `soft-skills/interview-prep-whiteboarding` | Interview Prep & Whiteboarding | skill | small | — | Whiteboarding |
| `soft-skills/freelancing-client-work` | Freelancing & Client Work | skill | medium | — | Freelancing |
