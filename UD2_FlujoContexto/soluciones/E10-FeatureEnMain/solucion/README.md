# De la spec aprobada a `main` (integrador)

Feature C: [`docs/specs/C-marcar-hecha/`](./docs/specs/C-marcar-hecha/) · Sesiones: `sesiones/` (no incluidas)

Proveedor y modelo: <proveedor>/<modelo>

> Ejemplo comentado. El código, los tests, la spec 1.1, el plan y las tasks de esta carpeta son una versión de referencia, comprobada (49 tests en verde, 20 de C; la página, con jsdom). Las sesiones con el agente son distintas en cada caso.

## Recorrido

| Fase | Sesión exportada | Agente o comando | Artefacto | Punto de control | Commit |
|------|------------------|------------------|-----------|------------------|--------|
| Plan | `sesiones/plan.md` | `/planificar C-marcar-hecha` (*plan*); *build* para guardar | `plan.md`, y la spec 1.1 | 2: constitución, cobertura, decisiones y viabilidad | `Spec de la feature C 1.1: …`, `Plan de la feature C (aprobado)` |
| Tasks | `sesiones/tasks.md` | *plan* con el prompt del tema 3; *build* para guardar | `tasks.md` | 3: tamaño, orden, cobertura y verificabilidad | `Tasks de la feature C (aprobadas)` |
| Ciclo 1 | `sesiones/ciclo-1.md` | `/implementar C-marcar-hecha 1` | Servicio, error y repositorio, con sus tests | 4 | `Feature C: T-01 y T-02, servicio de marcar tareas` |
| Ciclo 2 | `sesiones/ciclo-2.md` | `/implementar C-marcar-hecha 2` | Controlador y ruta, con sus tests | 4 | `Feature C: T-03 y T-04, PATCH /tareas/:id` |
| Ciclo 3 | `sesiones/ciclo-3.md` | `/implementar C-marcar-hecha 3` | La página | 4, con la comprobación a mano | `Feature C: T-05, casilla y texto tachado (implementada)` |
| Fusión | — | — | — | Comprobación final y CI en verde | `Fusiona la feature C: marcar una tarea como hecha` |
| Replanificación | — | A mano | `AGENTS.md`, skill `tests-desde-spec` | 0 | `Replanificación tras la feature C: errores en AGENTS.md y fechas en la skill de tests` |

## Estado

```text
# Antes de empezar (main)
✅ A-añadir-tarea: Implementada
✅ B-ver-lista: Implementada
✅ C-marcar-hecha: Aprobada

# Durante los ciclos (rama)
✅ A-añadir-tarea: Implementada
✅ B-ver-lista: Implementada
✅ C-marcar-hecha: En implementación

# Después de fusionar (main)
✅ A-añadir-tarea: Implementada
✅ B-ver-lista: Implementada
✅ C-marcar-hecha: Implementada
```

## Hueco de la spec

**En la fase del plan.** La spec dice que se guarda «la fecha y hora en que se completó» (RF-02) y que al desmarcar se deja «vacía (null)» (RF-04), pero no dice **cómo se llama el campo** en la respuesta. Quien use la API lo ve: es la misma situación que el nombre de los campos de la feature A (tema 3). El agente propuso `completadaEn` en una decisión del plan; no lo acepté en el plan.

**Decisión:** `fechaCompletado`, en la línea de `fechaCreacion` de la feature A. Spec 1.1: RF-02 y RF-04 nombran el campo.

**Un segundo hueco**, que marcó el agente: si la tarea no existe y `hecha` no es válido, ¿404 o 400? Lo decidí en la misma versión: primero el cuerpo (EC-08, nuevo).

Los dos, con su test (`C-RF-01, C-RF-02…` y `C-EC-08`).

## Decisiones

| Fase | Propuesta del agente | Aceptada o rechazada | Motivo |
|------|----------------------|----------------------|--------|
| Plan | `completadaEn` como nombre del campo | Rechazada en el plan | Se ve desde fuera: lo decidí en la spec 1.1 |
| Plan | Recargar la lista entera tras cada cambio en la página | Rechazada | RF-07 pide mostrar el cambio sin recargar, y una petición basta |
| Plan | Un test de concurrencia para EC-05 | Rechazada | Con datos en memoria y un solo proceso, las peticiones se atienden de una en una; queda justificado en D-07 |
| Plan | `ErrorNoEncontrado` nuevo | Aceptada | No existía; sigue el patrón de `ErrorValidacion` |
| Tasks | Un grupo final con todos los tests | Rechazada | La constitución pide los tests antes del código de cada grupo |
| Ciclo 2 | Cambiar el manejador de JSON mal formado de `app.js` para PATCH | Rechazada | No está en la task ni en la spec de C |

## Puntos de control

| Ciclo | Rojo → verde | CI | Qué encontré | Qué hice |
|-------|--------------|----|--------------|----------|
| 1 | 10 → 10 | Verde | Los tests de C-EC-03 no fijaban la hora, así que no comprobaban que la fecha no cambia | Pedí que usaran `vi.setSystemTime` con dos horas distintas |
| 2 | 10 → 10 | Verde | El agente quería tocar `app.js` (ver «Decisiones») | Lo rechacé; solo los ficheros de las tasks |
| 3 | — (a mano) | Verde | La casilla no tenía etiqueta accesible | Pedí un `aria-label` con el texto de la tarea |

Comprobación a mano de la página (con `npm start`):

- [x] Al marcar «Comprar leche», el texto se tacha y dice «(hecha)» sin recargar (RF-06, RF-07, AC-05).
- [x] Al desmarcarla, vuelve a «(pendiente)» y deja de estar tachada.
- [x] Al recargar la página, la tarea conserva su estado.

## Contexto

| Fase | Contexto que di | Lo que dejé fuera | Estrategias usadas |
|------|-----------------|-------------------|--------------------|
| Plan | El comando `/planificar`: índice, spec de C, plan de B como ejemplo, y *explore* para el código reutilizable | El código entero, las specs de A y B | Sesión nueva; *explore* para no llenar la ventana |
| Tasks | `@` al plan aprobado y a la spec | El código y la conversación del plan | Sesión nueva |
| Ciclos | `/implementar` con la feature y el grupo; la skill de tests y `tests/AGENTS.md` se cargaron solos | Las tasks de otros grupos y el historial de ciclos anteriores | Sesión nueva por ciclo; un `/undo` en el ciclo 1, cuando mi primer mensaje no decía que fijara la hora |

## Replanificación

| Pregunta | Respuesta | Qué cambié y dónde |
|----------|-----------|--------------------|
| ¿La siguiente feature sigue siendo la D? | Sí: borrar una tarea es lo siguiente que pide el equipo | Nada |
| ¿He corregido la misma decisión varias veces? | No en esta feature | Nada |
| ¿El agente ha tropezado con algo? | En el plan propuso crear `ErrorNoEncontrado` como si fuera a ser nuevo en cada feature: no sabía qué errores había | `AGENTS.md`: «`errores/` (`ErrorValidacion` para el 400 y `ErrorNoEncontrado` para el 404)» |
| ¿He repetido algún prompt? | En el ciclo 1 tuve que pedir que los tests fijaran la hora, y en el siguiente ciclo lo habría vuelto a pedir | Paso 8 de la skill `tests-desde-spec`: las fechas se fijan con `vi.setSystemTime`, y para comprobar que algo no cambia, con dos horas distintas |

## Commits

```text
* <hash> README del E10
* <hash> Replanificación tras la feature C: errores en AGENTS.md y fechas en la skill de tests
*   <hash> Fusiona la feature C: marcar una tarea como hecha
|\
| * <hash> Feature C: T-05, casilla y texto tachado (implementada)
| * <hash> Feature C: T-03 y T-04, PATCH /tareas/:id
| * <hash> Feature C: T-01 y T-02, servicio de marcar tareas
| * <hash> Tasks de la feature C (aprobadas)
| * <hash> Plan de la feature C (aprobado)
| * <hash> Spec de la feature C 1.1: campo fechaCompletado y orden de los errores (aprobada)
|/
* <hash> Proyecto de partida
```
