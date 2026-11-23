# AGENTS.md

Módulo de avisos de devolución del préstamo de portátiles, en Node.js. Los
principios están en `constitution.md`.

## Comandos

- Instalar: `npm install`
- Tests: `npm test`
- Probar con datos de ejemplo: `node ejemplo.js`
- Comprobar que el índice coincide con el estado de cada spec:
  `npm run estado`

## Estructura

- `src/avisos.js`: la función `generarAvisos`, punto de entrada del módulo.
- `tests/`: los tests de caracterización (`avisos.caracterizacion.test.js`).
- `docs/specs/G-avisos-devolucion/`: la spec de la feature G.
- `openspec/specs/`: la spec vigente de cada capacidad, en el formato de
  OpenSpec. `openspec/changes/`: los cambios en curso.

## Refactorizar y cambiar

- Una refactorización no cambia el comportamiento: los tests de
  caracterización que ya estaban en verde se quedan **intactos** y siguen en
  verde. Si alguno falla, el cambio de comportamiento no es de ese ciclo.
- Un cambio de comportamiento se hace con OpenSpec: propuesta, tests,
  implementación y archivo, en un ciclo distinto del de la refactorización.
- Al implementar un cambio, la spec de la feature en `docs/specs/` sube de
  versión con lo que cambia, en el mismo commit que el código.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No modifiques los tests para que pasen: propón el cambio.
- No cambies el estado de una spec ni del índice: lo cambia una persona.
