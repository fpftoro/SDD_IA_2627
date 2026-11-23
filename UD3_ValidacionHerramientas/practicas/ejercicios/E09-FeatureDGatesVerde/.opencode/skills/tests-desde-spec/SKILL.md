---
name: tests-desde-spec
description: Procedimiento para escribir los tests de una feature a partir de los identificadores de su spec y de la estrategia de pruebas de su plan. Úsala cuando una task pida escribir tests (en tasks.md, las que empiezan por «Tests de…» o «Pruebas de…»).
---

# Tests desde la spec

## Antes de escribir

1. Lee en `tasks.md` la línea **Cubre** de la task: son los
   identificadores que tienes que comprobar.
2. Busca cada identificador en la **estrategia de pruebas** del plan:
   dice el nivel (unitario, integración o e2e) y el fichero.
3. Lee cada identificador en la spec. Apunta el valor exacto que la spec
   fija: el código HTTP, el mensaje de error, el límite, el texto.

## Al escribir

4. Un test por cada caso, con la letra de la feature y el identificador
   al principio del nombre (`D-EC-01: …`). En Playwright, un `test.step`
   por identificador.
5. En los límites, prueba los dos lados.
6. Elige datos que distingan la implementación correcta de las
   incorrectas razonables.
7. El valor esperado sale de la spec o del propio test, nunca del código
   de la aplicación.
8. Para provocar un fallo interno, sustituye la función del repositorio
   con `vi.spyOn` y restáurala en `afterEach` con `vi.restoreAllMocks()`.
9. Cada test prepara su propio estado (`vaciar()` en `beforeEach`).

## Al terminar

10. Ejecuta `npm test` y `npm run e2e`. Los tests nuevos tienen que
    fallar, y por el motivo correcto.
11. Comprueba que cada identificador de la línea **Cubre** tiene al menos
    un test.
