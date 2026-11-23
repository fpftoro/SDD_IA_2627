# Ampliar un proyecto existente

> Solución de referencia. Las sesiones con el agente no son deterministas: los planes y el código del alumno serán distintos. Los resultados de Git y de los tests, sí son reproducibles.

## Gobierno

| Punto de control | Aprueba | Participa | Qué mira |
|-----------------|---------|-----------|----------|
| 1 · Spec | Producto | Calidad (*edge cases*) | ¿Qué ve el equipo si la tarea no existe o ya está hecha? |
| 2 · Plan | Arquitectura | Desarrollo | ¿Cumple la constitución? ¿Reutiliza lo que hay? ¿Una prueba por identificador? |
| 3 · Tasks | Desarrollo | Calidad (tasks de tests) | ¿Los tests van antes y cada task tiene un criterio objetivo? |
| 4 · Ciclos | Desarrollo (otra persona) | — | ¿Hace la task y nada más? Ficheros, tests y `git diff` |
| Fusión | Desarrollo, con la CI en verde | Calidad | ¿Pasan los tests de todas las features? |

`.github/CODEOWNERS` y la plantilla de la PR de la spec: ver [`.github/`](./.github/).

## Seguridad

```text
implementador (subagent)
  *         *                            allow
  shell     *                            ask
  shell     npm test                     allow
  shell     npm run estado               allow
  shell     npm run trampas              allow
  shell     git status                   allow
  shell     git diff *                   allow
  shell     git log *                    allow
  shell     git push *                   deny
  shell     rm *                         deny
  edit      *                            deny
  edit      src/**                       allow
  shell     *                            ask
  shell     npm test                     allow
  shell     npm run lint                 allow
  shell     git status                   allow
  shell     git diff *                   allow
  shell     git log *                    allow
  subagent  *                            deny
  webfetch  *                            deny
  websearch *                            deny
```

- **Por qué `subagent` en `deny`:** un agente que no puede editar tests pero sí encargar trabajo a *general* los editaría a través de él. Con `subagent` cerrado vale lo que dicen sus permisos.
- **Si pudiera editar `tests/`:** podría hacer pasar un test cambiándolo en lugar de arreglar el código; el punto de control de los tests no serviría.
- **Agentes que no pueden editar código:** el `arquitecto` (solo `plan.md` y `tasks.md`) y el `artesano` (nada).

## Comparación de los planes

### Ficheros

| Fichero | C | D | ¿Choca? |
|---------|---|---|---------|
| `src/errores/error-no-encontrado.js` | Nuevo | Nuevo | **Sí** (agregar/agregar) |
| `src/repositorios/repositorio-tareas.js` | Modificado (`buscarPorId`, `actualizar`) | Modificado (`buscarPorId`, `eliminar`) | **Sí**: los dos añaden `buscarPorId` en el mismo sitio |
| `src/servicios/servicio-tareas.js` | Modificado (`completarTarea`) | Modificado (`borrarTarea`) | **Sí**: los dos añaden al final y cambian los `import` |
| `src/controladores/controlador-tareas.js` | Modificado (`completarTareaHttp` y 404) | Modificado (`borrarTareaHttp` y 404) | **Sí** |
| `src/rutas/tareas.js` | Modificado | Modificado | **Sí**: líneas adyacentes |
| `tests/api-completar.test.js` / `tests/api-borrar.test.js` | Nuevo | Nuevo | No: cada uno el suyo |

### Decisiones que toman los dos

| Qué se decide | En el plan de C | En el plan de D |
|---------------|-----------------|-----------------|
| Una clase `ErrorNoEncontrado` nueva | D-03 | D-03 |
| Buscar una tarea por su id en el repositorio | D-04 (`buscarPorId`) | D-04 (`buscarPorId`) |
| Traducir el error a 404 con «La tarea no existe» en el controlador | D-03 | D-03 |

## Orden y replanificación

- **Va primero:** C. Borrar es lo más delicado (no se deshace): conviene que la búsqueda y el error estén ya probados cuando D se apoye en ellos. D primero también sería válido si se razona.
- **Qué se puede hacer en paralelo y qué no:** los **planes** (ya hecho) y los tests, que están escritos. No la implementación: las dos tocan los mismos cinco ficheros y deciden lo mismo.
- **Qué cambia en el plan de la segunda:** D-03 y D-04 pasan a **reutilizar** `ErrorNoEncontrado` y `buscarPorId` de C; el repositorio solo añade `eliminar`; T-02 solo toca el repositorio. El plan de D 1.1 se aprueba **después** de traer `main`.

## *Handoffs*

```text
Del arquitecto al implementador · feature C · grupo 3

Objetivo: implementar el servicio completarTarea, su controlador y la ruta
  POST /tareas/:id/hecha (T-03).
Documentos: docs/specs/C-marcar-hecha/spec.md (1.0, aprobada), plan.md y
  el grupo 3 de tasks.md (aprobados).
Estado: los tests de tests/api-completar.test.js existen, los revisó una
  persona y fallan. El repositorio ya tiene buscarPorId y actualizar, y
  existe ErrorNoEncontrado (grupo 2, hecho). Los 29 tests de A y B pasan.
Límites: solo los ficheros de la línea «Ficheros» de T-03. No toques los
  tests, la spec ni el plan. Sin dependencias nuevas. Si algo no encaja,
  para y dilo.
Devuelve: los ficheros cambiados, qué decisiones del plan cubre cada uno y
  la salida de npm test (deben pasar los 33).
```

## Constitución

```markdown
## Cambio de la constitución

- **Qué cambia:** sección nueva «Errores». Los errores de dominio son
  clases de src/errores/ (ErrorValidacion, 400; ErrorNoEncontrado, 404),
  cualquier otro error responde 500 y una feature nueva reutiliza las
  clases antes de crear otra.
- **Por qué:** los planes de C y D decidieron cada uno por su cuenta crear
  ErrorNoEncontrado y traducirlo a 404. Es una decisión que se repite.
- **A qué afecta:** al código existente, a nada: A y B solo usan
  ErrorValidacion. A las features en curso, a ninguna: C y D están
  fusionadas.
- **Qué hay que hacer:** nada en las ramas; los planes nuevos la citan en
  su comprobación de la constitución.
```

## Auditoría

```text
$ npm run trampas
✅ Sin trampas

$ npm run estado
✅ A-añadir-tarea: Implementada
✅ B-ver-lista: Implementada
✅ C-marcar-hecha: ✅ Implementada
✅ D-borrar-tarea: ✅ Implementada

$ git log --oneline --first-parent main
11e0db9 Replanificación tras las features C y D: clases de error en la constitución
2acb43e Fusiona la feature D: borrar una tarea
5c36533 Fusiona la feature C: marcar una tarea como hecha
54f8cf0 Gobierno: CODEOWNERS y plantilla de PR de las specs
05f44e0 Proyecto de partida
```

(Hashes de ejemplo.)

### Antipatrones

| Antipatrón | Lo tuve o lo evité | Evidencia | Qué lo evitó o lo corrigió |
|------------|--------------------|-----------|----------------------------|
| Decisiones duplicadas al planificar en paralelo | **Lo tuve** | El plan de D en `Borrador` creaba `ErrorNoEncontrado` y `buscarPorId`, que ya creaba el de C | Comparar los planes, fusionar C primero y replanificar D (`Replanificación de la feature D…`) |
| Todas las tasks de golpe | **Lo evité** | `git log`: un commit por grupo (`Feature C, grupo 2`, `grupo 3`) | `/implementar` con el grupo como argumento |
| El agente cambia los tests | **Lo evité** | `git diff --stat main -- tests` solo muestra ficheros nuevos, ninguno modificado | `implementador` con `edit` solo en `src/` y los tests en un commit anterior |

### Qué leí

| Cambio | Riesgo | Cuánto leí |
|--------|--------|------------|
| `eliminar` del repositorio (D) | Alto: borra datos y no se deshace | Entero, y comprobé que borra solo la tarea pedida |
| `completarTarea` (C) | Medio: cambia el estado, pero lo cubren los tests y se puede deshacer | El servicio y el controlador; los tests, siempre |
| La sección «Errores» de la constitución | Medio: es solo texto, pero condiciona todas las features futuras | Entera, y comprobé que no recoge nada de una sola feature |

### Avalancha

Con cinco personas y cinco features a la vez, frenaría **antes** de que los agentes empiecen: specs aprobadas antes de lanzar ninguna (una comprobación mecánica en la PR), un límite de PR abiertas por persona (por ejemplo, dos), planes comparados antes de aprobar ninguno, rebanadas pequeñas y PR de una sola idea. El orden de fusión lo decide producto, no el orden en que terminan los agentes.

## Sesión con el agente

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | `arquitecto` (plan de C) | `/planificar C-marcar-hecha` | Plan y tasks de C en `Borrador` | Quitar un código dentro del plan; fijar que el servicio lanza el error |
| 2 | `arquitecto` (plan de D) | `/planificar D-borrar-tarea` | Plan y tasks de D con su propio `ErrorNoEncontrado` | Nada: es lo que se quiere ver chocar |
| 3 | `implementador` (C) | `/implementar C-marcar-hecha 3` | Servicio, controlador y ruta | Una función auxiliar que no estaba en las tasks: la quité |
| 4 | `arquitecto` (replanificar D) | «Trae main y rehaz el plan y las tasks de D reutilizando lo de C» | Plan y tasks de D 1.1 | Comprobar que ya no toca `app.js` ni crea clases |
| 5 | `implementador` (D) | `/implementar D-borrar-tarea 3` | `eliminar`, servicio, controlador y ruta | Que `borrarTarea` no devolviera nada (204) |

(Ejemplo de cómo rellenarlo: la sesión real depende del modelo.)

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| C: `actualizar(tarea)` en el repositorio | Aceptada | Evita mutar el objeto compartido |
| D: crear `ErrorNoEncontrado` | Rechazada en la replanificación | Lo crea C |
| D: `marcarBorrada` en lugar de borrar | Rechazada | La spec dice que la tarea deja de aparecer, y esta constitución sí permite borrar |

## Commits

```text
$ git log --oneline --graph
* 11e0db9 Replanificación tras las features C y D: clases de error en la constitución
*   2acb43e Fusiona la feature D: borrar una tarea
|\
| * 9b71275 Feature D: spec e índice en Implementada
| * ccdcc53 Feature D, grupo 3: servicio, controlador y ruta
| * ad07e60 Feature D, grupo 2: eliminar en el repositorio
| * 2492af5 Tests de la feature D (revisados)
| * 90b839c Plan de la feature D 1.1 (aprobado)
| * fd943bc Replanificación de la feature D tras traer main con la feature C (borrador; arquitecto)
| *   79c3d2a Trae main con la feature C
| |\
|/ /
* |   5c36533 Fusiona la feature C: marcar una tarea como hecha
|\ \
| * | 9287466 Feature C: spec e índice en Implementada
| * | 9e2db83 Feature C, grupo 3: servicio, controlador y ruta
| * | b31ee08 Feature C, grupo 2: ErrorNoEncontrado, buscarPorId y actualizar
| * | 5e10ac7 Tests de la feature C (revisados)
| * | 14647d4 Plan de la feature C (aprobado)
| * | d650ba8 Plan de la feature C (borrador; arquitecto)
|/ /
| * ab236b6 Plan de la feature D (borrador; arquitecto)
|/
* 54f8cf0 Gobierno: CODEOWNERS y plantilla de PR de las specs
* 05f44e0 Proyecto de partida
```

(Hashes de ejemplo.)
