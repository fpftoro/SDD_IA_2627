# Del plan a las tasks

Tasks de la feature B: [`docs/specs/B-reservar-carro/tasks.md`](./docs/specs/B-reservar-carro/tasks.md)

## Lista de comprobación

**Tamaño y orden**

- [x] Cada task toca uno o dos ficheros (o la excepción está justificada).
- [x] Ninguna task depende de otra que va después.
- [x] Las tasks de tests van antes que su implementación.

**Cobertura**

- [x] Cada decisión del plan aparece en alguna task.
- [x] Cada fila de la estrategia de pruebas está en alguna task de tests.
- [x] No faltan tasks «aburridas»: el `package.json`, el `.gitignore`, la configuración, la página, la comprobación manual.

**Verificabilidad**

- [x] Cada task tiene un criterio de terminado que se puede comprobar sin opinar.
- [x] Los grupos son lo bastante pequeños para revisarlos de una vez.

**Alcance**

- [x] No hay tasks que no vengan del plan.

Sobre las tasks «aburridas»: el proyecto ya tiene `package.json` y `.gitignore`, y B no añade dependencias ni página. La única que podía faltar es el montaje de las rutas en `src/app.js`, que está en T-06.

## Cobertura

| Fila de la estrategia de pruebas | Task de tests |
|----------------------------------|---------------|
| RF-01, RF-02, AC-01 | T-03 y T-05 |
| RF-03, AC-05 | T-03 y T-05 |
| RF-04, AC-04 | T-03 |
| AC-03 | T-05 |
| RNF-01 | T-05 |
| RNF-02, EC-11 | T-05 |
| RNF-03 | T-03 |
| RNF-04 | T-01 |
| EC-01 | T-05 |
| EC-02 | T-03 y T-05 |
| EC-03 | T-03 y T-05 |
| EC-04 | T-03 y T-05 |
| EC-05 | T-03 |
| EC-06 | T-03 |
| EC-07 | T-03 |
| EC-08 | T-03 |
| EC-09 | T-03 |
| EC-10, AC-02 | T-03 y T-05 |
| EC-12 | T-05 |
| EC-13 | T-03 y T-05 |
| EC-14 | T-05 |
| EC-15 | T-05 |
| EC-16 | T-03 |

## Errores

| # | Dónde | Error | Corrección |
|---|-------|-------|------------|
| 1 | T-01 | **Task enorme**: cuatro ficheros y toda la lógica de la feature | Dividirla siguiendo la secuencia del plan: ErrorPermiso y servicio; controlador y ruta |
| 2 | T-01 | **Criterio vago**: «la devolución funciona» | Qué tests pasan: los de la task de tests del servicio |
| 3 | T-01 | **Marcador `[P]` incorrecto**: el resto de tasks depende de ella | Quitar `[P]` |
| 4 | T-02 | **Task que no viene del plan**: un registro de actividad en un fichero de log, que además cambia lo que hace el sistema | Quitarla. Si alguien lo quiere, va primero a la spec y al plan |
| 5 | Grupo 2 | **Tests al final**: las tasks de tests van después de la implementación, en contra de la constitución | Cada task de tests, antes de la implementación que comprueba |
| 6 | T-03 | **Criterio de terminado al revés**: «los tests pasan». Una task de tests termina cuando los tests existen y **fallan** | «Los tests existen y fallan, porque registrarDevolucion aún no existe» |
| 7 | T-03 y T-04 | **Cobertura incompleta**: ninguna task cubre RF-06, RNF-01, RNF-02, RNF-03, EC-05, EC-07, EC-08 ni EC-09 | Añadir cada identificador a la task de tests que dice la estrategia de pruebas (unitaria, de integración o las dos) |
| 8 | T-04 | **Dependencia al revés**: depende de T-05, que va después | Que dependa de la implementación del servicio y vaya antes del controlador |
| 9 | T-05 | **Task microscópica** y que no viene del plan: renombrar una variable | Quitarla |
| 10 | T-06 | **Contradice la spec**: el mensaje de EC-05 es «No puedes registrar esta devolución», no «No tienes permiso». Además repite un fichero de T-01 | El mensaje exacto de la spec, dentro de la task del controlador |
| 11 | T-07 | **Duplicada y sin dependencias**: la ruta ya está en T-01, y una ruta necesita el controlador | Una sola task de controlador y ruta, que depende de los tests de la API |
| 12 | Todos los grupos | **Faltan los puntos de control** al final de cada grupo, y hay grupos que no se pueden revisar de una vez | Un punto de control por grupo, y grupos de dos tasks como máximo |
| 13 | Falta | Ninguna task cubre D-03 a D-09 por separado: T-01 dice «D-01 a D-09» pero no se puede comprobar | Repartir las decisiones entre las tasks del servicio y del controlador |

## Por qué importa el orden

1. **No verá nunca los tests en rojo.** T-03 llega después de T-01, cuando el código ya existe: los tests se escribirán para que pase lo que hay, y nadie sabrá si comprueban la spec o el código.
2. **T-04 no se puede empezar.** Depende de T-05, que está después; y T-05 no tiene nada que ver con los tests de la API. El compañero tendrá que saltarse el orden o adivinar.
3. **El primer punto de control será imposible.** Al terminar T-01 tendrá cuatro ficheros nuevos o cambiados, sin tests, con un criterio («funciona») que no se puede comprobar. Y cuando llegue a T-06, cambiará un mensaje que ya funcionaba por otro que contradice la spec, y ningún test lo detectará porque EC-05 no está en ninguna task de tests.
