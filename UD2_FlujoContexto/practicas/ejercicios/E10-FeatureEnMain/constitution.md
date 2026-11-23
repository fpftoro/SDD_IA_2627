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

## Tecnología

- API en Node.js con módulos ES y Express 5.
- Página en HTML y JavaScript sin framework, servida por la misma
  aplicación de Express.
- Pruebas con Vitest; las de la API, con supertest.
- No se añaden otras dependencias sin acordarlo antes.

## Pruebas

- Los tests se escriben antes que el código, a partir de los criterios de
  aceptación y los edge cases de la spec.
- Cada identificador de la spec tiene su test, o una comprobación a mano
  escrita en el plan.
- Ningún cambio llega a main con la integración continua en rojo.

## Specs

- Una spec por feature, en `docs/specs/<prefijo>-<nombre>/spec.md`.
- Los requisitos y los *edge cases* se escriben en EARS, en español.
- Los criterios de aceptación se escriben en Gherkin, con `# language: es`
  y el identificador en el nombre del escenario (`Escenario: AC-01 …`).
- La spec dice qué hace el sistema y en qué condiciones; el cómo va en el
  plan.
