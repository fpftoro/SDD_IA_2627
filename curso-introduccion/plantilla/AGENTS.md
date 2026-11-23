# AGENTS.md

Los principios del proyecto están en `constitution.md` y el porqué del producto, en `docs/prd.md`.

## Al empezar una sesión

- Lee `docs/specs/README.md` para saber qué features están hechas y cuál toca.

## Comandos (RELLENA)

- Instalar dependencias: `<comando o «ninguno»>`
- Arrancar: `<comando>`
- Tests: `<comando>`  ← el mismo que figura en `constitution.md`

## Estructura

- `docs/specs/<letra>-<nombre>/`: `spec.md`, `plan.md` y `tasks.md` de cada feature.
- `docs/plantillas/`: plantillas de spec, plan y tasks.
- Código y tests: según la sección «Tecnología» de la constitución.

## Flujo

- Spec aprobada → `/planificar` → `/escribir-tests` → `/implementar` → `/validar`.
- Una feature por rama: `feature/<carpeta>`.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No modifiques una spec aprobada: propón el cambio.
- No cambies el estado de una spec ni del índice: lo cambia una persona.
- No modifiques los tests para que pasen.
