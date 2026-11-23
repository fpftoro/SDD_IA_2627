# Constitución — Préstamo de portátiles

## Arquitectura

Capas: rutas → controladores → servicios → repositorios. Los
controladores no contienen lógica de negocio. Solo los repositorios
acceden a los datos.

## API

Todas las respuestas son JSON. Los errores devuelven
{ error: "mensaje" }, en español, con el código HTTP adecuado.

## Datos

La aplicación no guarda datos personales del alumnado. Las fechas, en
formato AAAA-MM-DD.

## Tecnología

- Node.js con módulos ES y Express 5.
- Pruebas con Vitest; las de la API, con supertest.
- No se añaden otras dependencias sin acordarlo antes.

## Pruebas

- Cada criterio de aceptación y cada edge case tiene su test, con la
  letra de la feature y el identificador en el nombre (A-EC-02).
- Los tests de una feature se escriben y se revisan antes de
  implementarla.
