# E06-DeltaOpenSpec

## Un cambio con delta de OpenSpec

### Descripción

Solución del **Ejercicio 6** (autocorrección, con agente). Partiendo del módulo de avisos del ejercicio anterior, el alumno lo refactoriza con los tests intactos y especifica y hace el cambio que pidió producto con una delta de OpenSpec, en un ciclo aparte: propuesta, tests, implementación, archivo y fusión.

- Enunciado y material de partida: [`practicas/ejercicios/E06-DeltaOpenSpec`](../../practicas/ejercicios/E06-DeltaOpenSpec/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 6 | Un cambio con delta de OpenSpec | Refactorizar con los tests como contrato y especificar un cambio con una delta (OA4 d) |

### Estructura

```text
E06-DeltaOpenSpec/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/         ← el proyecto al terminar, con el cambio archivado
    ├── README.md     ← respuesta modelo
    ├── src/ y tests/ ← capas, 8 tests CAR y 8 tests CAMBIO
    ├── docs/specs/G-avisos-devolucion/spec.md   ← 1.1
    └── openspec/
        ├── specs/avisos-devolucion/spec.md      ← la vigente, con los requisitos nuevos
        └── changes/archive/2026-11-04-avisos-ordenados-y-robustos/
```

### Clave

- **Dos ciclos:** primero la refactorización (14 tests intactos, `git diff --stat main -- tests` vacío) y después el cambio.
- **`MODIFIED` copia el requisito entero y conserva todos sus escenarios.** Si un escenario cambia de contenido, mantiene el nombre; la validación en modo estricto lo exige.
- **Se retiran 6 tests** (`CAR-09` a `CAR-14`) y se escriben 8 (`CAMBIO-01` a `CAMBIO-08`); `CAMBIO-07` ya se cumplía antes de implementar.
- **Estado final:** 16 tests en verde, `openspec validate --all --strict` sin errores, la spec 1.1 coherente con `openspec/specs/`.

El flujo completo (inicializar OpenSpec, refactorizar, validar la delta con su error real, tests en rojo, implementar, archivar y fusionar) se ha ejecutado de principio a fin en Docker (`node:24-bookworm`, Vitest 5, **OpenSpec 1.16.0**). **Sin probar:** la sesión con el agente (propuesta de refactorización con un proveedor real) ni `/opsx-propose` con OpenCode.

### Errores frecuentes

- **Arreglar el orden durante la refactorización.** Rompe los tests `CAR-09` a `CAR-11` y mezcla los dos ciclos.
- **Modificar los tests para que pasen** en la refactorización.
- **Usar `ADDED` para el orden**: duplica un requisito que ya existe.
- **Una delta que repite la spec entera** o un `MODIFIED` con solo la frase que cambia.
- **Perder un escenario del requisito modificado.** La validación estricta lo detecta (*omits scenario(s) the current spec still has*).
- **Escribir los tests después del código** o no comprobar que fallan.
- **Archivar sin subir la spec de `docs/specs/` a la 1.1**, o al revés.
- **Validar la fecha de un préstamo devuelto** (el aviso no existe, no hay nada que validar).
- **Fusionar sin `--no-ff`.**

### Otras soluciones válidas

- Otro reparto de funciones entre los ficheros, mientras `generarAvisos` siga siendo el punto de entrada y la selección y el orden estén en el servicio.
- Hacer la propuesta con `/opsx-propose` y revisarla (en vez de escribirla a mano), si se corrige hasta que valide.
- Un solo error con dos mensajes, o `Error` en vez de `ErrorValidacion`, si se razona.
- Comparar con `localeCompare` o con `toLowerCase()` y `<`.
- Tests con `test.each`, manteniendo un identificador por caso.
