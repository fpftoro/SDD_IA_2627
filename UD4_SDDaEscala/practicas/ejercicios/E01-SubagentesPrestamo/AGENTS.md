# AGENTS.md

API del préstamo de portátiles del centro, en Node.js con Express. Los
principios están en `constitution.md`.

## Al empezar una sesión

- Lee `docs/specs/README.md` para saber qué features están implementadas.

## Comandos

- Tests: `npm test`
- Lint: `npm run lint`

## Estructura

- `src/`: rutas, controladores, servicios, repositorios y errores.
- `tests/`: un fichero de tests por módulo.
- `docs/specs/<letra>-<nombre>/`: spec, plan y tasks de cada feature.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No modifiques una spec aprobada: propón el cambio.
- No cambies el estado de una spec ni del índice.
