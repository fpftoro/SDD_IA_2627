# Constitución — Lista de tareas compartida

## Arquitectura

Capas: rutas → controladores → servicios → repositorios. Los controladores
no contienen lógica de negocio. Solo los repositorios acceden al
almacenamiento.

## API

Todas las respuestas son JSON, salvo las que no llevan cuerpo (204). Los
errores devuelven { error: "mensaje" } con el código HTTP adecuado.

## Tecnología

- API en Node.js con módulos ES y Express 5.
- Página en HTML y JavaScript sin framework, servida por la misma
  aplicación de Express.
- Pruebas con Vitest; las de la API, con supertest.
- No se añaden otras dependencias sin acordarlo antes.

## Pruebas

- Cada criterio de aceptación y cada edge case tiene su test.
- Los tests de una feature se escriben y se revisan antes de
  implementarla. El agente que implementa no los modifica.

## Calidad

- Ningún cambio llega a main con la integración continua en rojo.
- Cada identificador de una spec en implementación o implementada tiene
  su test.

## Errores

- Los errores de dominio son clases de `src/errores/`: `ErrorValidacion` (400) y `ErrorNoEncontrado` (404). Cualquier otro error responde 500.
- Una feature nueva reutiliza estas clases antes de crear otra.
