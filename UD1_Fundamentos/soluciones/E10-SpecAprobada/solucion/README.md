# Lista de tareas compartida · De la idea a la spec aprobada

- Contexto del agente: [`AGENTS.md`](./AGENTS.md), [`constitution.md`](./constitution.md), [`opencode.json`](./opencode.json)
- Índice de features: [`docs/specs/README.md`](./docs/specs/README.md)
- Spec de la feature C: [`docs/specs/C-marcar-hecha/spec.md`](./docs/specs/C-marcar-hecha/spec.md)

## Entorno

| Dato | Valor |
|------|-------|
| Versión de OpenCode | 2.3.2 |
| Proveedor | *(el que use cada alumno)* |
| Modelo | *(un modelo del proveedor con buena capacidad de razonamiento)* |

| Pregunta al agente plan | Resumen de su respuesta | ¿Recoge AGENTS.md y la constitución? |
|-------------------------|-------------------------|--------------------------------------|
| ¿Qué principios tienes que respetar? | Capas controladores → servicios → repositorios, errores `{ error }` en español, fechas ISO 8601, tests antes que el código; y las prohibiciones de `AGENTS.md` (no tocar specs aprobadas ni la constitución, no añadir dependencias, no escribir claves) | Sí, las dos |
| ¿En qué notación se escriben las specs? | Requisitos y *edge cases* en EARS; criterios de aceptación en Gherkin con `# language: es` y el identificador en el nombre del escenario | Sí, la sección «Specs» de la constitución |

## Features

| Propuesta del agente | Revisión |
|----------------------|----------|
| Gestión de tareas | Rechazada: es el épico, no una feature |
| Configurar el servidor y el almacenamiento | Rechazada: técnica, sin valor propio; va en el plan de A |
| Añadir una tarea | Aceptada (A, ya aprobada) |
| Ver la lista de tareas | Aceptada (B) |
| Marcar una tarea como hecha | Aceptada (C) |
| Borrar una tarea | Aceptada (D) |
| Asignar tareas a personas | Rechazada: el PRD deja fuera los usuarios |

## Orden

A va primero: sin tareas no hay nada que ver, marcar ni borrar (y ya está aprobada). B va después, porque C y D necesitan ver la lista para marcar o borrar algo en la página. C va antes que D por **valor**: saber qué está hecho es el motivo del PRD (que el equipo deje el chat); borrar es más raro. Por **riesgo**, C también conviene antes: es la única con cambios de estado de ida y vuelta y con posibles cambios a la vez de dos personas.

## Borrador

Cada tarea de la lista tiene una casilla. Al marcarla, la tarea pasa a
hecha y se ve tachada; al desmarcarla, vuelve a pendiente. Se guarda cuándo
se completó. Si la tarea no existe, error. No se guarda quién la marcó,
porque no hay usuarios. Tiene que verse el cambio sin recargar la página.

## Sesión con el agente

| Paso | Fase | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|------|--------|--------|-------------|-----------------------|
| 1 | 1 | plan | `¿Qué principios y reglas tienes que respetar en este proyecto? ¿En qué notación se escriben las specs?` | El resumen de la tabla «Entorno» | Nada: recogía las dos capas |
| 2 | 2 | plan | `Lee @docs/prd.md. Propón cómo dividir el épico en features para desarrollarlas con SDD. Para cada una indica su nombre, qué valor aporta, de qué otras depende y una historia de usuario. No crees ningún fichero.` | Siete propuestas (tabla «Features») | Rechacé tres; escribí yo el índice |
| 3 | 3 | plan | `Convierte este borrador en la spec de la feature C con la plantilla del curso y la notación de @constitution.md. Usa @docs/specs/A-añadir-tarea/spec.md como modelo de formato y de nivel de detalle, y @docs/prd.md. Donde falte información, no la inventes: marca [NECESITA ACLARACIÓN] con la pregunta concreta.` + el borrador | Una spec con cinco marcadores (ver «Decisiones de producto») y un requisito sobre «el usuario que marca la tarea» | Quité ese requisito: el PRD deja fuera los usuarios |
| 4 | 3 | build | `Guarda en docs/specs/C-marcar-hecha/spec.md la spec que acabamos de revisar, con el estado Borrador y la versión 0.1, quitando el requisito sobre el usuario que marca la tarea. No cambies nada más.` | El fichero | Comprobé con `git diff` que solo había creado ese fichero |
| 5 | 4 | plan | Revisión de la spec (prompt del tema 6) | Seis propuestas (ver «Decisiones») | Apliqué las aceptadas a mano |

Sesiones exportadas: `sesiones/redaccion.md` y `sesiones/revision.md` (no se incluyen en la solución de referencia: cada alumno entrega las suyas).

## Decisiones de producto

| Dónde | Pregunta | Decisión | Motivo |
|-------|----------|----------|--------|
| RF-03 | ¿Se puede desmarcar una tarea hecha? | Sí, vuelve a pendiente | Marcar por error es fácil, y la lista es del equipo |
| EC-03 | ¿Qué pasa al marcar una tarea que ya está hecha? | 200 sin cambiar la fecha | Es lo que pasa si dos personas la marcan casi a la vez; no es un error |
| EC-05 | ¿Y si dos personas cambian la misma tarea a la vez? | Gana la última petición | El equipo es pequeño (3 a 10 personas): el caso es raro y no compensa bloquear |
| AC-05, RF-06 | ¿Cómo se ve una tarea hecha? ¿Se oculta? | Se ve tachada y no se oculta | Ocultarlas es filtrar la lista: va al fuera de alcance |
| Fuera de alcance | ¿Quién puede marcar una tarea? ¿Se guarda quién la marcó? | Cualquiera; no se guarda | El PRD deja fuera los usuarios y los permisos |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Separar «cambia el estado y guarda la fecha» en dos requisitos | Aceptada | Era compuesto (ahora RF-01 y RF-02) |
| Reescribir «se ve tachada» con *Mientras…* | Aceptada | Es un estado que dura, no un evento (RF-06) |
| Convertir los tres valores no válidos de AC-04 en un esquema | Aceptada | Mismo comportamiento con distintos datos |
| Usar `PUT` en lugar de `PATCH` | Rechazada | La ruta ya estaba acordada por el equipo y se ve desde fuera: no es una decisión del agente |
| Guardar la fecha de completado con `new Date().toISOString()` | Rechazada | Es implementación; la spec dice que la pone el servidor (RNF-02) y en qué formato (constitución) |
| Añadir un campo `completadaPor` | Rechazada | El PRD deja fuera los usuarios |

## Lista de comprobación

- [x] No queda ningún `[NECESITA ACLARACIÓN]`.
- [x] Cada requisito es atómico, verificable y sigue la notación acordada.
- [x] Cada criterio de aceptación es un escenario binario y concreto.
- [x] Cada *edge case* tiene una respuesta exacta.
- [x] No hay nombres de funciones, código ni estructuras internas.
- [x] El fuera de alcance cierra lo que el agente podría añadir por su cuenta.

## Validación

```text
> lista-tareas@0.1.0 validar
> node herramientas/validar-gherkin.mjs

✅ 2 documentos de Gherkin sin errores
```

## Commits

Ejemplo de historial (los identificadores cambian en cada repositorio):

```text
e5f6a7b Spec de la feature C (aprobada)
d4e5f6a Spec de la feature C (en revisión)
c3d4e5f Spec de la feature C (borrador)
a1b2c3d Features de la lista de tareas
9f8e7d6 Entorno y contexto de la lista de tareas
1a2b3c4 Initial commit
```
