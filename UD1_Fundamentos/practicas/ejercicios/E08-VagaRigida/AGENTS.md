# AGENTS.md

Préstamo de portátiles del centro. En este repositorio están las specs del
proyecto: todavía no hay código. Los principios están en `constitution.md`.

## Comandos

- Instalar las dependencias: `npm install`
- Comprobar la sintaxis de los escenarios de Gherkin: `npm run validar`

## Estructura

- `docs/specs/README.md`: índice de features y su estado.
- `docs/specs/<prefijo>-<nombre>/spec.md`: la spec de cada feature.
- `herramientas/`: scripts de comprobación.

## Prohibiciones

- No modifiques una spec si no se te pide expresamente: propón los cambios.
- No modifiques `constitution.md`.
- No añadas dependencias sin preguntar antes.
