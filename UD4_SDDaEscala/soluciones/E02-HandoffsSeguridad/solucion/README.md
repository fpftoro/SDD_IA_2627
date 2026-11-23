# Handoffs y seguridad

## Encargos

| Encargo | Qué le falta o qué está mal | Encargo reescrito |
|---------|-----------------------------|-------------------|
| 1 (a *explore*) | No dice qué se quiere saber («qué opinas» no es una pregunta que *explore* pueda contestar), ni dónde buscar, ni en qué formato responder. Un subagente no tiene la conversación | «Objetivo: voy a planificar la feature D (devolución) y necesito saber cómo se crean y se guardan hoy los préstamos. Busca en `src/`: 1. Qué funciones exporta `repositorio-prestamos.js`. 2. Qué servicio las usa y qué errores lanza. 3. Si ya existe `ErrorNoEncontrado`. Límites: solo lectura. Devuélveme una lista con fichero, función y una línea de descripción; si algo no existe, dilo expresamente» |
| 2 (al `implementador`) | «Lo de la devolución» no apunta a ninguna spec ni task, no limita el alcance (¿toda la feature?) y no dice cuándo parar ni qué devolver | «Objetivo: implementa el grupo 2 de `docs/specs/D-registrar-devolucion/tasks.md` (T-02 y T-03). Lee `spec.md` 1.0, `plan.md` y ese grupo. Los tests del grupo 1 ya existen y fallan: no los toques. Límites: solo los ficheros de la línea «Ficheros»; sin dependencias nuevas. Para cuando pasen los tests del servicio. Devuélveme los ficheros cambiados y el resultado de `npm test`» |
| 3 (al `artesano`) | «Todo el proyecto» no es un alcance, y «arregla» **contradice sus permisos**: el `artesano` tiene `edit: deny` y no puede arreglar nada, solo proponer | «Objetivo: revisa cómo traducen los controladores los errores de dominio a respuestas HTTP. Mira `src/controladores/` y `constitution.md`. Límites: solo lectura; no cambies nada. Devuélveme los duplicados que encuentres, con fichero y línea, y para cada uno si nace en el código o en una primitiva, con un cambio propuesto. Los cambios los decide una persona» |

## *Handoff*

```text
Del arquitecto al implementador · feature D · grupo 2

Objetivo: implementar el repositorio y el servicio de la devolución
  (T-02 y T-03).
Documentos: docs/specs/D-registrar-devolucion/spec.md (1.0, aprobada),
  plan.md y el grupo 2 de tasks.md (aprobados).
Estado: spec, plan y tasks aprobados. Los tests del grupo 1 existen, los
  revisó una persona y fallan. No hay código de D. Los tests de A, B y C
  pasan.
Límites: solo los ficheros de la línea «Ficheros» de T-02 y T-03. No
  toques los tests, la spec ni el plan. Si crees que un test está mal o
  que falta algo, para y dilo.
Devuelve: los ficheros cambiados, qué tasks cubre cada uno y la salida de
  npm test (deben pasar los tests del servicio).
```

- **Qué falta en el plan:** nada cubre **EC-02** (devolver un préstamo ya devuelto: 409). El plan no tiene decisión para ese error ni fila en la estrategia de pruebas, y T-01 no lo cita. Si el *handoff* tuviera que contarlo («además, haz que dé 409»), estaría explicando una decisión que debía estar en el plan.
- **Dónde se corrige:** en el **plan** (decisión sobre el 409 y fila de pruebas con EC-02) y en las **tasks** (T-01 cubre EC-02 y T-03 lanza el error). El *handoff* no se amplía.

## Agujeros

| Agente | Fallo | Qué podría hacer | Regla corregida |
|--------|-------|------------------|-----------------|
| `revisor` | `subagent` en `allow` para `*` | Encargar trabajo a *general*, que puede editar: un revisor «de solo lectura» que modifica ficheros | `subagent` en `deny` |
| `documentador` | La regla de `edit` con `*` en `allow` está **al final**: gana la última regla que coincide, así que anula los `deny` de specs, PRD y `src/` | Editar el código, las specs y el PRD | `edit` con `*` en `deny` primero; después `README.md` y `docs/**` en `allow`, y `docs/specs/**` y `docs/prd.md` en `deny` |
| `documentador` | No cierra `subagent` | Encargar trabajo a *general* | `subagent` en `deny` |
| `implementador` | `edit` con `*` en `allow` | Modificar los tests, las specs y la configuración (y hacer pasar un test cambiándolo) | `edit` con `*` en `deny` y `src/**` en `allow` |
| `implementador` | `shell` con `*` en `allow` | Ejecutar cualquier comando: instalar dependencias, `git push`, borrar ficheros | `shell` con `*` en `ask`, y `allow` solo para tests, lint y Git de lectura |
| `consultor` | `webfetch` y `websearch` en `allow` | Seguir enlaces de una incidencia y leer una **instrucción escondida** en la página; sin terminal ni edición, el daño sería menor, pero el riesgo existe | `webfetch` y `websearch` en `deny` (las incidencias están en `docs/`) |
| `consultor` | `edit` con `docs/**` en `allow` seguido de `*` en `deny` | **Nada**, porque la última regla, la de `*` en `deny`, anula el `allow`. Es un falso positivo: engaña al leer, pero no abre nada | Una sola regla `edit` con `*` en `deny`, que dice lo mismo sin confundir |
| `arquitecto` | `edit` con `docs/specs/**` en `allow` | Editar la spec, el estado y el índice: aprobar sus propios documentos | Solo `docs/specs/*/plan.md` y `docs/specs/*/tasks.md` |

## Agentes corregidos

```text
revisor (subagent)
  *         *                            allow
  edit      *                            deny
  shell     *                            deny
  shell     npm test                     allow
  shell     git diff *                   allow
  shell     git log *                    allow
  subagent  *                            deny
  webfetch  *                            deny
  websearch *                            deny
documentador (subagent)
  *         *                            allow
  edit      *                            deny
  edit      README.md                    allow
  edit      docs/**                      allow
  edit      docs/specs/**                deny
  edit      docs/prd.md                  deny
  subagent  *                            deny
  shell     *                            deny
  shell     git diff *                   allow
  shell     git log *                    allow
  webfetch  *                            deny
  websearch *                            deny
implementador (subagent)
  *         *                            allow
  edit      *                            deny
  edit      src/**                       allow
  shell     *                            ask
  shell     npm test                     allow
  shell     npm run lint                 allow
  shell     git status                   allow
  shell     git diff *                   allow
  shell     git log *                    allow
  subagent  *                            deny
  webfetch  *                            deny
  websearch *                            deny
consultor (subagent)
  *         *                            allow
  edit      *                            deny
  shell     *                            deny
  subagent  *                            deny
  webfetch  *                            deny
  websearch *                            deny
arquitecto (primary)
  *         *                            allow
  edit      *                            deny
  edit      docs/specs/*/plan.md         allow
  edit      docs/specs/*/tasks.md        allow
  shell     *                            deny
  shell     git status                   allow
  shell     git diff *                   allow
  shell     git log *                    allow
  subagent  *                            deny
  subagent  explore                      allow
  webfetch  *                            deny
  websearch *                            deny
```

## Personas y agentes

| # | Quién | Por qué |
|---|-------|---------|
| 1 | Persona | Aprobar es un punto de control: un agente que aprueba sus documentos se salta el control |
| 2 | Agente con persona que revisa | Lo escribe el `implementador` en ciclos cortos y una persona revisa cada ciclo antes del commit |
| 3 | Persona | La fusión llega a `main` con la CI en verde; la hace una persona (con `--no-ff`) |
| 4 | Agente | Es una búsqueda de solo lectura: *explore* en su propia ventana |
| 5 | Persona | Las dependencias las decide el equipo (constitución); el agente solo avisa de que hacen falta |
| 6 | Agente con persona que revisa | El `documentador` lo escribe y una persona revisa el diff antes de fusionar |

- **(a) Mensaje de commit:** `Plan de la feature D (borrador; arquitecto)`. El commit lo hace la persona, pero el nombre del agente queda en el mensaje cuando no es el de siempre.
- **(b) Dónde queda la decisión:** en el **plan**, como una decisión `D-nn` con su alternativa descartada y el motivo (y en la PR del plan, si el equipo la comenta). No queda en la conversación con el agente.
