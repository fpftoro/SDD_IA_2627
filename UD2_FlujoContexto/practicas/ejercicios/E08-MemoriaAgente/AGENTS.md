# AGENTS.md

API del préstamo de portátiles del centro, en Node.js con Express. El
proyecto todavía no tiene código: de momento solo hay specs.

## Comandos

- Instalar: `npm install`
- Tests: `npm test`
- Tests en modo vigilancia: `npm run test:watch`
- Revisar el estilo: `npm run lint`
- Arrancar: `npm start` (en http://localhost:8080)

## Estructura

- `src/models/`: los modelos de datos.
- `src/`: rutas, controladores, servicios y repositorios.
- `test/`: los tests, uno por módulo.
- `docs/specs/<letra>-<nombre>/`: spec, plan y tasks de cada feature.

## Principios

- Capas: rutas → controladores → servicios → repositorios.
- Todas las respuestas son JSON.
- Las fechas se guardan en ISO 8601, en UTC.
- La aplicación no guarda datos personales del alumnado.
- Los préstamos y las reservas no se borran nunca.

## Convenciones

- Escribe buen código y que sea fácil de mantener.
- Valida los datos de la petición en el controlador, antes de llamar al
  servicio.
- Los errores se devuelven como `{ message: "..." }`.

## Al terminar

- Cuando termines el último grupo de tasks de una feature, cambia el
  estado de su spec y del índice a `Implementada`.

## Prohibiciones

- Puedes añadir las dependencias que necesites si te ahorran trabajo.
- No modifiques una spec aprobada sin que se te pida: propón el cambio.
