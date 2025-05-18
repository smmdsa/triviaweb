# TODO List – PRD-Tech MVP

> Generated from `prd-tech.md` (v0.3 – 17 May 2025)

---

## Agent 1 – Repository & Base Config
- [ ] R1 Inicializar turborepo + pnpm workspaces *(DoD: monorepo boot + README, P0)*
- [ ] R2 Configurar ESLint, Prettier, Husky, Commitlint, lint-staged *(DoD: lint pasa en CI, P0)*
- [ ] R3 Configurar Tailwind base + tokens de diseño *(DoD: estilos compilando, P0)*
- [ ] R4 Setup shadcn/ui & Storybook en `ui-kit` *(DoD: historias visibles, P1)*

## Agent 2 – Infra & Base de Datos
- [ ] DB1 Definir esquema Prisma v0.1 *(migraciones generan tablas, P0)*
- [ ] DB2 Seed de datos dummy *(script `pnpm db:seed` corre, P1)*
- [ ] DB3 Configurar PlanetScale/Vercel PG para staging & prod *(conexión `.env` ok, P1)*
- [ ] DB4 Policy RLS básica (tenant isolation) *(pruebas passing, P1)*

## Agent 3 – API Layer
- [ ] API1 Auth middleware (JWT → ctx.user) *(pruebas unitarias, P0)*
- [ ] API2 CRUD Trivia *(cobertura 80 % tests, P0)*
- [ ] API3 Lead ingest + webhook dispatch *(webhook mock recibido, P0)*
- [ ] API4 Rate-limit (10 RPS/IP embed) *(tests en CI, P1)*
- [ ] API5 Swagger/OpenAPI autogen *(`/api/docs` live, P2)*

## Agent 4 – Frontend Admin Portal
- [ ] FE1 Layout Shell + auth guard *(roteo protegido funciona, P0)*
- [ ] FE2 Wizard paso-a-paso (formik + zod) *(puede guardar borrador, P0)*
- [ ] FE3 Editor de preguntas drag-and-drop (dnd-kit) *(reordena, modifica, borra, P0)*
- [ ] FE4 Branding live preview (tailwind tokens) *(coincide con producción, P1)*
- [ ] FE5 Dashboard KPI cards (swr realtime) *(números coinciden con BD, P1)*
- [ ] FE6 Lead export CSV *(descarga válida, P1)*

## Agent 5 – Trivia Widget
- [ ] W1 Loader `<script src>` genera div target *(embed en ejemplo simple, P0)*
- [ ] W2 Runtime fetch `/api/trivias/:id/embed` *(preguntas renderizan, P0)*
- [ ] W3 Animaciones de progreso (framer-motion lite) *(FPS > 60, P1)*
- [ ] W4 Embebido seguro CSP *(no bloquea webpage, P1)*

## Agent 6 – Kiosk PWA
- [ ] K1 PWA fullscreen + offline cache trivia JSON *(lighthouse 100 offline, P1)*
- [ ] K2 QR generator CLI (`pnpm make:qr`) *(QR PNG exporta, P2)*

## Agent 7 – Integraciones & Webhooks
- [ ] INT1 Zapier webhook genérico POST JSON *(P1)*
- [ ] INT2 HubSpot OAuth + push lead *(P2)*
- [ ] INT3 Salesforce REST bulk insert *(P2)*

## Agent 8 – DevOps / CI
- [ ] CI1 GitHub Actions: lint → unit tests → build → preview *(merge a `main` despliega, P0)*
- [ ] CI2 Cypress e2e nightly en Vercel preview *(tests verdes, P1)*
- [ ] CI3 Sentry JS + SourceMaps upload *(errores trazables, P1)*

## Agent 9 – Calidad & Seguridad
- [ ] QA1 Cobertura unit ≥ 70 % *(badge verde)*
- [ ] QA2 Tests e2e críticos (login, crear trivia, jugar) *(pipeline pasa, P0)*
- [ ] SEC1 Dependabot + audit fix weekly *(sin CVE high, P0)*
- [ ] SEC2 OWASP zap scan en CI *(score ≥ A, P1)*
- [ ] SEC3 GDPR export / delete endpoint *(pasa prueba legal, P1)*

## Agent 10 – Documentación & DX
- [ ] DOC1 `CONTRIBUTING.md` + commit convention *(P0)*
- [ ] DOC2 Storybook design tokens docs *(P1)*
- [ ] DOC3 Postman collection `/api` *(P2)*

---

### Sprint Roadmap (6 semanas)
| Sprint | Objetivos | Tickets clave |
| ------ | --------- | ------------- |
| **S0** | Repo setup, CI, DB schema | R1-R3, DB1, CI1 |
| **S1** | Auth + CRUD Trivia + Wizard v0 | API1-API2, FE1-FE3 |
| **S2** | Widget básico + lead ingest | W1-W3, API3, QA2 |
| **S3** | Dashboard KPIs + CSV export | FE5-FE6, INT1 |
| **S4** | Kiosk PWA + branding preview | K1, FE4 |
| **S5** | Integraciones HubSpot + Sentry + hardening | INT2, CI3, SEC2 |

> **DoD global:** Código tipeado, lint sin errores, PR aprobado ×2, tests verdes, desplegado a preview.