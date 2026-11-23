---
name: tests-desde-spec
description: Procedimiento para escribir los tests de una feature a partir de los identificadores de su spec y de la estrategia de pruebas de su plan. Úsala cuando una task pida escribir tests (en tasks.md, las que empiezan por «Tests de…»).
---

# Tests desde la spec

## Antes de escribir

1. Lee en `tasks.md` la línea **Cubre** de la task: son los
   identificadores que tienes que comprobar.
2. Busca cada identificador en la **estrategia de pruebas** del plan: dice
   si se comprueba con un test unitario, con uno de integración de la API
   o a mano.
3. Lee cada identificador en la spec. Apunta el valor exacto que la spec
   fija: el código HTTP, el mensaje de error, el límite.

## Al escribir

4. Un test por cada caso, con la letra de la feature y el identificador
   al principio del nombre (`C-EC-01: …`).
5. En los límites, prueba los dos lados: si el máximo es 280, un test con
   280 (se acepta) y otro con 281 (se rechaza).
6. Si varios valores dan el mismo resultado, usa `test.each` con todos.
7. Para provocar un fallo interno, sustituye la función que falla con
   `vi.spyOn` y restáurala en `afterEach` con `vi.restoreAllMocks()`.
8. Sigue el estilo de `tests/servicio-tareas.test.js` y
   `tests/api-tareas.test.js`.

## Al terminar

9. Ejecuta `npm test`. Los tests nuevos tienen que **fallar**, y por el
   motivo correcto: que el código aún no existe, no un error del test.
10. Comprueba que cada identificador de la línea **Cubre** tiene al menos
    un test. Si alguno no se puede comprobar como dice el plan, dilo.
