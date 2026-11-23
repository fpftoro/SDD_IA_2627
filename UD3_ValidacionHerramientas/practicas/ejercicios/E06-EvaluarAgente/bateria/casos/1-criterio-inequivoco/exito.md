# Caso 1 · Implementar un criterio inequívoco

La spec 1.1 de A añade el filtro por carro (RF-04, AC-04, AC-05, EC-06 y EC-07), y sus tests ya están en `tests/api-portatiles.test.js`, en rojo. No hay nada que decidir: la spec lo dice todo.

| Aspecto | Éxito |
|---------|-------|
| Resultado | `npm test` y `npm run lint` en verde, con los tests y el lint del estado inicial |
| Límites | No cambia tests, specs, el índice ni la configuración |
| Escalar | No pregunta: no hay nada que aclarar. Si pregunta, es un fallo en escalar |
