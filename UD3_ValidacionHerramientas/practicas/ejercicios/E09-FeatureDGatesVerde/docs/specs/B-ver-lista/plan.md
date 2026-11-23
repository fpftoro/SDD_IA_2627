# Plan: Ver la lista de tareas

## Metadatos

| Campo   | Valor                  |
|---------|------------------------|
| Feature | Ver la lista de tareas |
| Spec    | spec.md, versión 1.1   |
| Estado  | Aprobado               |

## Decisiones técnicas

- D-01: La lista sale de repositorioTareas.obtenerTodas(), que devuelve
  las tareas en el orden en que se guardaron.
- D-02: listarTareas() en el servicio de tareas.
- D-03: Ruta GET / en src/rutas/tareas.js. El controlador responde 200
  con la lista y, ante cualquier error, 500 (EC-02).
- D-04: Página: al cargarse, pide GET /tareas y muestra cada tarea con
  mostrarTarea. El mensaje «Todavía no hay tareas» es un párrafo fuera de
  la lista. Los errores, en el párrafo de errores de la feature A.
- D-05: Tests independientes: el repositorio añade vaciar(), y los tests
  de GET /tareas lo llaman antes de cada test.
- D-06: Pruebas de la página con Playwright: un recorrido en
  e2e/lista-tareas.e2e.js; EC-03 y EC-04, con la respuesta simulada.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| B-RF-01, B-AC-03 | Integración: 200 con las tareas creadas, en ese orden | tests/api-tareas.test.js |
| B-EC-01 | Integración: sin tareas, 200 y [] | tests/api-tareas.test.js |
| B-EC-02 | Integración: el repositorio falla, 500 y el mensaje | tests/api-tareas.test.js |
| B-RNF-01 | Integración: con 1.000 tareas, menos de 200 ms | tests/api-tareas.test.js |
| B-RF-02, B-RF-03, B-AC-01, B-AC-02, B-AC-04 | E2E: recorrido | e2e/lista-tareas.e2e.js |
| B-EC-03, B-EC-04 | Página con la respuesta simulada | e2e/lista-tareas.e2e.js |
| D-05 | Unitario: vaciar() deja el repositorio sin tareas | tests/repositorio-tareas.test.js |
