# Constitución — Lista de tareas compartida

Principios del proyecto. No se negocian en cada tarea: si alguno tiene que
cambiar, se acuerda con el equipo y se cambia aquí primero.

## Arquitectura

Capas: controladores → servicios → repositorios. Los controladores no
contienen lógica de negocio. Solo los repositorios acceden al
almacenamiento.

## API

- Todas las respuestas son JSON.
- Los errores devuelven `{ error: "mensaje" }`, con el mensaje en español
  y el código HTTP adecuado.
- Las fechas se guardan y se devuelven en formato ISO 8601.

## Pruebas

Los tests se escriben antes que el código, a partir de los criterios de
aceptación de la spec.

## Specs

- Una spec por feature, en `docs/specs/<prefijo>-<nombre>/spec.md`.
- Los requisitos y los *edge cases* se escriben en EARS, en español.
- Los criterios de aceptación se escriben en Gherkin, con `# language: es`
  y el identificador en el nombre del escenario (`Escenario: AC-01 …`).
- La spec dice qué hace el sistema y en qué condiciones; el cómo va en el
  plan.
