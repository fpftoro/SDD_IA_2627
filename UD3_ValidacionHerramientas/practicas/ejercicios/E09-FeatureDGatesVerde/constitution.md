# Constitución — Lista de tareas compartida

## Arquitectura

Capas: controladores → servicios → repositorios. Los controladores no
contienen lógica de negocio. Solo los repositorios acceden al
almacenamiento.

## API

Todas las respuestas son JSON. Los errores devuelven
{ error: "mensaje" } con el código HTTP adecuado.

## Tecnología

- API en Node.js con módulos ES y Express 5.
- Página en HTML y JavaScript sin framework, servida por la misma
  aplicación de Express.
- Pruebas con Vitest; las de la API, con supertest; las de la página,
  con Playwright.
- No se añaden otras dependencias sin acordarlo antes.

## Pruebas

- Cada criterio de aceptación y cada edge case tiene su test, en el
  nivel donde se ve el comportamiento.
- Los tests de una feature se escriben y se revisan antes de
  implementarla. El agente que implementa no los modifica.

## Calidad

- Ningún cambio llega a main con la integración continua en rojo.
- El lint no da errores. Las reglas de capas de eslint.config.js son
  las de la sección Arquitectura.
- Cobertura mínima del código de src/: 90 % de líneas y 80 % de ramas.
- Cada identificador de una spec en implementación o implementada tiene
  su test, o una comprobación a mano escrita en el plan.
