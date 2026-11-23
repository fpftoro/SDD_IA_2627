---
name: tests-desde-spec
description: Procedimiento para escribir los tests de una feature a partir de los identificadores de su spec y de la estrategia de pruebas de su plan. Úsala cuando una task pida escribir tests.
---

# Tests desde la spec

## Antes de escribir

1. Lee en `tasks.md` la línea **Cubre** de la task.
2. Busca cada identificador en la **estrategia de pruebas** del plan: dice
   el nivel (unitario o integración) y el fichero.
3. Lee cada identificador en la spec y apunta el valor exacto: el código
   HTTP, el mensaje, el límite.

## Al escribir

4. Un test por caso, con la letra de la feature y el identificador al
   principio del nombre: `B-EC-02: …`.
5. Los límites, por los dos lados.
6. Datos que distingan la implementación correcta de las incorrectas.
7. El valor esperado sale de la spec o del propio test, nunca del código
   de la aplicación.
8. Para provocar un fallo interno, `vi.spyOn` sobre el repositorio, y
   `vi.restoreAllMocks()` en `afterEach`.
9. Sigue el estilo de `tests/api-portatiles.test.js`.

## Al terminar

10. Ejecuta `npm test`: los tests nuevos tienen que fallar por el motivo
    correcto.
11. Comprueba que cada identificador de **Cubre** tiene su test.
