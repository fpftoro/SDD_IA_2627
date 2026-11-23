# Constitución — Préstamo de portátiles

Principios del proyecto. No se negocian en cada tarea: si alguno tiene que
cambiar, se acuerda con el equipo y se cambia aquí primero.

## Arquitectura

Capas: rutas → controladores → servicios → repositorios. Los controladores
no contienen lógica de negocio: traducen la petición al servicio y el
resultado a la respuesta. Solo los repositorios acceden a los datos.

## API

- Todas las respuestas son JSON.
- Las rutas empiezan por `/api/` y están en español.
- Los errores devuelven `{ error: "mensaje" }`, con el mensaje en español
  y el código HTTP adecuado.

## Datos

- Los préstamos y las reservas no se borran nunca: se cambia su estado.
- Las fechas se guardan y se devuelven en formato ISO 8601, en UTC.
- La aplicación no guarda datos personales del alumnado.

## Tecnología

- API en Node.js con módulos ES y Express 5.
- Datos en memoria, dentro de los repositorios, hasta que una spec pida
  que sobrevivan a un reinicio.
- Pruebas con Vitest; las de la API, con supertest.
- No se añaden otras dependencias sin acordarlo antes.

## Specs

- Una spec por feature, en `docs/specs/<prefijo>-<nombre>/spec.md`.
- Los requisitos y los *edge cases* se escriben en EARS, en español.
- Los criterios de aceptación se escriben en Gherkin, con `# language: es`
  y el identificador en el nombre del escenario (`Escenario: AC-01 …`).
- La spec dice qué hace el sistema y en qué condiciones; el cómo va en el
  plan.

## Pruebas

- Los tests se escriben antes que el código que comprueban.
- Cada requisito, criterio de aceptación y *edge case* de la spec tiene su
  test, o una comprobación a mano escrita en el plan.
