# PRD‑Tech – Trivia SaaS B2B (Backlog Técnico)

*Monorepo React + Tailwind + shadcn/ui + Next.js Edge API – MVP 100 % funcional*

---

## 0. Principios Guía

* **KISS & SOLID:** simpleza primero, refactor después.
* **Mono‑repo:** Turborepo + pnpm workspaces.
* **Convención > Configuración:** ESLint, Prettier, Husky, Commitlint.
* **CI/CD Automático:** GitHub Actions → Vercel preview & prod.
* **100 % Typescript end‑to‑end.**

## 1. Estructura del Repositorio

```txt
root/
 ├─ apps/
 │   ├─ admin‑web/          # portal B2B (Next.js)
 │   ├─ trivia‑widget/      # package embebible (React UMD/ESM)
 │   └─ kiosk/              # PWA fullscreen (expo spots)
 ├─ packages/
 │   ├─ ui‑kit/             # shadcn + diseño de marca
 │   ├─ api/                # lógica de acceso a BD & Edge API wrappers
 │   ├─ hooks/              # React shared hooks
 │   └─ config/             # tailwind, eslint, tsconfig bases
 ├─ .github/workflows/      # CI pipelines
 └─ infra/                  # scripts, seeders, db‑schema (Prisma)
```

### Tareas

| ID | Descripción                                                 | DOD                    | Prioridad |
| -- | ----------------------------------------------------------- | ---------------------- | --------- |
| R1 | Inicializar turborepo + pnpm workspaces                     | monorepo boot + README | P0        |
| R2 | Configurar ESLint, Prettier, Husky, Commitlint, lint‑staged | lint pasa en CI        | P0        |
| R3 | Configurar Tailwind base + tokens de diseño                 | estilos compilando     | P0        |
| R4 | Setup shadcn/ui & storybook en `ui‑kit`                     | historias visibles     | P1        |

## 2. Infra & Base de Datos (Postgres)

### Modelo inicial (Prisma)

* Company, User, Trivia, Question, Lead, Response.

### Tareas

| ID  | Descripción                                          | DOD                         |    |
| --- | ---------------------------------------------------- | --------------------------- | -- |
| DB1 | Definir esquema Prisma v0.1                          | migraciones generan tablas  | P0 |
| DB2 | Seed de datos dummy                                  | script `pnpm db:seed` corre | P1 |
| DB3 | Configurar PlanetScale/Vercel PG para staging & prod | conexión `.env` ok          | P1 |
| DB4 | Policy RLS básica (tenant isolation)                 | pruebas passing             | P1 |

## 3. API Layer (Next.js Edge Functions)

### Endpoints MVP

* `POST /api/auth/*` (Clerk/Auth0 callback).
* `GET /api/trivias`  – list paginada.
* `POST /api/trivias` – crear/duplicar.
* `PATCH /api/trivias/:id` – update.
* `GET /api/trivias/:id/embed` – JSON schema para widget.
* `POST /api/leads` – recibe respuestas.

### Tareas

| ID   | Endpoint / Service               | DOD                   | Pri |
| ---- | -------------------------------- | --------------------- | --- |
| API1 | Auth middleware (JWT → ctx.user) | pruebas unitarias     | P0  |
| API2 | CRUD Trivia                      | cobertura 80 % tests  | P0  |
| API3 | Lead ingest + webhook dispatch   | webhook mock recibido | P0  |
| API4 | Rate‑limit (10 RPS/IP embed)     | tests en CI           | P1  |
| API5 | Swagger/OpenAPI autogen          | `/api/docs` live      | P2  |

## 4. Frontend – Admin Portal (`admin‑web`)

### Módulos MVP

1. **Dashboard Home** – KPIs, CTA “Crear trivia”.
2. **Wizard Crear Trivia** (multi‑step): plantilla → branding → preguntas → capturar datos → publicar.
3. **Listado de Trivias** – search, duplica, status.
4. **Analytics** – tabla leads, export CSV.
5. **Settings** – perfil empresa, integraciones.

### Tareas clave

| ID  | Pantalla / Feature                          | DOD                       | Pri |
| --- | ------------------------------------------- | ------------------------- | --- |
| FE1 | Layout Shell + auth guard                   | roteo protegido funciona  | P0  |
| FE2 | Wizard paso‑a‑paso (formik + zod)           | puede guardar borrador    | P0  |
| FE3 | Editor de preguntas drag‑and‑drop (dnd‑kit) | reordena, modifica, borra | P0  |
| FE4 | Branding live preview (tailwind tokens)     | coincide con producción   | P1  |
| FE5 | Dashboard KPI cards (swr realtime)          | números coinciden con BD  | P1  |
| FE6 | Lead export CSV                             | descarga válida           | P1  |

## 5. Trivia Widget (`trivia‑widget`)

* Bundle UMD < 50 kB gz.
* Sin dependencias pesadas; usa Preact compat.

| ID | Descripción                                  | DOD                     |    |
| -- | -------------------------------------------- | ----------------------- | -- |
| W1 | Loader `<script src>` genera div target      | embed en ejemplo simple | P0 |
| W2 | Runtime fetch `/api/trivias/:id/embed`       | preguntas renderizan    | P0 |
| W3 | Animaciones de progreso (framer‑motion lite) | FPS > 60                | P1 |
| W4 | Embebido seguro CSP                          | no bloquea webpage      | P1 |

## 6. Kiosk PWA (`kiosk`)

| ID | Descripción                                | DOD                    |    |
| -- | ------------------------------------------ | ---------------------- | -- |
| K1 | PWA fullscreen + offline cache trivia JSON | lighthouse 100 offline | P1 |
| K2 | QR generator CLI (`pnpm make:qr`)          | QR PNG exporta         | P2 |

## 7. Integraciones & Webhooks

| ID   | Descripción                       |    |
| ---- | --------------------------------- | -- |
| INT1 | Zapier webhook genérico POST JSON | P1 |
| INT2 | HubSpot OAuth + push lead         | P2 |
| INT3 | Salesforce REST bulk insert       | P2 |

## 8. DevOps / CI

| ID  | Descripción                                         | DOD                      |    |
| --- | --------------------------------------------------- | ------------------------ | -- |
| CI1 | GitHub Actions: lint → unit tests → build → preview | merge a `main` despliega | P0 |
| CI2 | Cypress e2e nightly en Vercel preview               | tests verdes             | P1 |
| CI3 | Sentry JS + SourceMaps upload                       | errores trazables        | P1 |

## 9. Calidad & Testing

* **Unit:** Vitest + React Testing Library.
* **e2e:** Cypress Cloud.
* **Contract:** Pact for API clients.

| ID  | Meta                                            | KPI           |    |
| --- | ----------------------------------------------- | ------------- | -- |
| QA1 | Cobertura unit ≥ 70 %                           | badge verde   |    |
| QA2 | Tests e2e críticos (login, crear trivia, jugar) | pipeline pasa | P0 |

## 10. Seguridad & Compliance

| ID   | Acción                        | DOD               |    |
| ---- | ----------------------------- | ----------------- | -- |
| SEC1 | Dependabot + audit fix weekly | sin CVE high      | P0 |
| SEC2 | OWASP zap scan en CI          | score ≥ A         | P1 |
| SEC3 | GDPR export / delete endpoint | pasa prueba legal | P1 |

## 11. Documentación & DX

| ID   | Descripción                           |    |
| ---- | ------------------------------------- | -- |
| DOC1 | `CONTRIBUTING.md` + commit convention | P0 |
| DOC2 | Storybook design tokens docs          | P1 |
| DOC3 | Postman collection `/api`             | P2 |

## 12. Sprints MVP (6 semanas)

| Sprint     | Objetivos                                  | Tickets clave      |
| ---------- | ------------------------------------------ | ------------------ |
| S0 (1 sem) | Repo setup, CI, DB schema                  | R1‑R3, DB1, CI1    |
| S1 (1 sem) | Auth + CRUD Trivia + Wizard v0             | API1‑API2, FE1‑FE3 |
| S2 (1 sem) | Widget básico + lead ingest                | W1‑W3, API3, QA2   |
| S3 (1 sem) | Dashboard KPIs + CSV export                | FE5‑FE6, INT1      |
| S4 (1 sem) | Kiosk PWA + branding preview               | K1, FE4            |
| S5 (1 sem) | Integraciones HubSpot + Sentry + hardening | INT2, CI3, SEC2    |

---

**Definición de Hecho (DoD)**: Código tipeado, lint sin errores, PR aprobado ×2, tests verdes, desplegado a preview.

> *v0.3 – 17 May 2025*
