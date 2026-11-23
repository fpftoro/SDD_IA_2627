# Constitución — Préstamo de portátiles

Principios del proyecto. No se negocian en cada tarea: si alguno tiene que
cambiar, se acuerda con el equipo y se cambia aquí primero.

## Arquitectura

Capas: rutas → servicios → datos. Las rutas no contienen lógica de
negocio. Solo los servicios acceden a los datos.

## API

- Todas las respuestas son JSON.
- Las rutas empiezan por `/api/` y están en español.
- Los errores devuelven `{ error: "mensaje" }`, con el mensaje en español
  y el código HTTP adecuado.

## Datos

- Los préstamos y las reservas no se borran nunca: se cambia su estado.
- Las fechas se guardan y se devuelven en formato ISO 8601, en UTC.
- La aplicación no guarda datos personales del alumnado.

## Specs

- Una spec por feature, en `docs/specs/<prefijo>-<nombre>/spec.md`.
- Los requisitos y los *edge cases* se escriben en EARS, en español.
- Los criterios de aceptación se escriben en Gherkin, con `# language: es`
  y el identificador en el nombre del escenario (`Escenario: AC-01 …`).
- La spec dice qué hace el sistema y en qué condiciones; el cómo va en el
  plan.

## Pruebas

Cada función de un servicio tiene sus tests con Vitest.
