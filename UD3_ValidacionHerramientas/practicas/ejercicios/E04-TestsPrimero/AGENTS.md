# AGENTS.md

API del préstamo de portátiles del centro, en Node.js con Express. Los
principios están en `constitution.md`, y el porqué, en `docs/prd.md`.

## Al empezar una sesión

- Lee `docs/specs/README.md` para saber qué features están implementadas.

## Comandos

- Instalar: `npm install`
- Tests: `npm test`
- Arrancar: `npm start` (en http://localhost:3000)
- Comprobar el índice de features: `npm run estado`

## Flujo de una feature

- Los tests de la feature se escriben con `/escribir-tests` y una persona
  los revisa antes de implementar.
- El código se escribe con `/implementar`, con el agente `implementador`,
  que no puede modificar los tests.

## Estructura

- `src/`: rutas, controladores, servicios, repositorios y errores.
- `tests/`: un fichero de tests por módulo.
- `docs/specs/<letra>-<nombre>/`: spec, plan y tasks de cada feature.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No modifiques una spec aprobada: propón el cambio.
- No cambies el estado de una spec ni del índice.
