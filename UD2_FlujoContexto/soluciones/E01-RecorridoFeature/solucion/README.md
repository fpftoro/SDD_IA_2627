# El recorrido de una feature

## Mapa del recorrido

| Momento | Entra | Artefacto | Agente | Punto de control y pregunta | Decide | Rama |
|---------|-------|-----------|--------|-----------------------------|--------|------|
| Contexto del proyecto | El PRD y los acuerdos del equipo | `AGENTS.md` y `constitution.md`, una vez por proyecto (en C ya existen) | *plan* para revisarlos; *build* (o la persona) para guardarlos | 0: ¿están claros los principios del proyecto? | La persona (el equipo) | `main` |
| Especificar | La línea de C en el índice, el PRD y las notas de la coordinación TIC | `docs/specs/C-registrar-prestamo/spec.md`, en estado `Aprobada` | *plan* revisa, pregunta y propone *edge cases*; *build* guarda solo la spec | 1: ¿la spec dice lo que queremos? | Quien decide el producto | `main` |
| Planificar | La spec aprobada, la constitución y el código de A y B | `docs/specs/C-registrar-prestamo/plan.md`, `Aprobado` | *plan* propone el plan sin escribir código; *build* guarda solo `plan.md` | 2: ¿es la forma correcta de construirlo? | Quien conoce la arquitectura | `feature/C-registrar-prestamo`, que se crea al empezar el plan |
| Descomponer | El plan aprobado y la spec | `docs/specs/C-registrar-prestamo/tasks.md`, con las casillas sin marcar | *plan* propone las tasks; *build* guarda solo `tasks.md` | 3: ¿son pasos pequeños, ordenados y verificables? | Quien supervisa la implementación | `feature/C-registrar-prestamo` |
| Implementar | Las tasks aprobadas, con el plan y la spec de referencia | Código y tests, `tasks.md` marcado y un commit por grupo de tasks | *build*, con una sesión nueva por grupo | 4, en cada grupo: ¿el código cumple la task, la spec y la constitución? | La persona revisa, ejecuta los tests y hace el commit | `feature/C-registrar-prestamo` |
| Fusionar | La rama con todas las tasks hechas y revisadas | Ninguno: un commit de fusión en `main` | Ninguno | Comprobación final de toda la feature (`git status`, tests y `git diff --stat main...feature/C-registrar-prestamo`) | La persona | De la rama a `main` con `--no-ff`; después se borra la rama |
| Replanificar | Lo aprendido en la feature C | Ninguno nuevo: cambios en el índice, la constitución, `AGENTS.md` o `.opencode/`, en su propio commit | Ninguno (o *plan* para repasar el contexto) | 0 otra vez: ¿están claros los principios del proyecto?, con las cuatro preguntas | La persona | `main` |

## Dónde se corrige

| Situación | Nació en | Qué haces | Qué más revisas |
|-----------|----------|-----------|-----------------|
| S1 | Spec | Paro el plan. Si una reserva impide o no el préstamo se nota desde fuera, así que no lo decide el plan. Lo decide quien aprueba la spec; la spec sube a 1.1 (un *edge case* nuevo o una línea en el fuera de alcance) y se vuelve a aprobar | El plan: quitar el aviso inventado y, si la spec lo decide, añadir la decisión y su fila de pruebas |
| S2 | Plan | Rechazo la dependencia: la constitución no deja añadirlas sin acordarlo y `Date` basta para fijar las 14:30. La anoto como alternativa descartada | Nada más: «Dependencias» queda sin `moment` |
| S3 | Tasks | Divido la task en tasks de uno o dos ficheros, con la de tests antes de su implementación, y las agrupo | Nada: el plan sigue igual |
| S4 | Código | Paro el ciclo: no hay commit con tests en rojo. Pido en la misma sesión que el servicio compruebe el estado como dice D-03, y repito el punto de control con `npm test` ejecutado por mí. La task sigue abierta | Nada en los documentos: la spec y el plan ya lo decían. Compruebo que el agente no ha tocado los tests |
| S5 | Spec | Paro la implementación. Es un hueco que se nota desde fuera: lo decide quien aprueba la spec, no el agente. La spec sube a 1.1 en la rama y se vuelve a aprobar; el cambio va en el mismo commit que el código que lo implementa | El plan (decisión y fila de pruebas) y las tasks (el test y el código del caso nuevo) |
| S6 | Constitución | Corrijo el plan de C y llevo la regla a la constitución, en la sección «Tecnología»: los identificadores se generan con `crypto.randomUUID()` | Los planes siguientes ya no lo necesitarán; si el cambio va en la rama de C, se anota en el mensaje del commit |
| S7 | Spec | No la apruebo. Cambio «rápidamente» por un valor medible (un tiempo máximo de respuesta con un número de préstamos guardados) | Nada: todavía no hay plan |
| S8 | Tasks | Reordeno: los tests de la API van antes que el controlador y las rutas, como pide la constitución | Las líneas «Depende de» de las tasks afectadas |
| S9 | Código | Rechazo el cambio: deshago el test (EC-02 dice 409) y pido que se corrija el código, no el test | `git diff tests/` para ver que no ha cambiado ningún otro test; el prompt de implementar, que debe prohibirlo |
| S10 | Plan | Rechazo D-02: contradice la constitución, que no deja lógica de negocio en las rutas. La comprobación va en el servicio, y la propuesta queda como alternativa descartada | La estrategia de pruebas: el 409 se comprueba en el servicio (unitario) y en la API (integración) |

## Fallos del historial

| # | Commits | Regla que se salta | Qué problema causa | Cómo se debió hacer |
|---|---------|--------------------|--------------------|---------------------|
| 1 | `1c81104` | El código va después del plan y de las tasks, y en la rama de la feature | Decisiones técnicas tomadas en el código sin que nadie las revise, y `main` con una feature a medias | Crear la rama al empezar el plan; escribir el servicio en un ciclo, después de aprobar el plan y las tasks |
| 2 | `ba1d3a1` | Ciclos cortos: un grupo de tasks por ciclo, con su punto de control y su commit | Un cambio enorme (ocho tasks, cinco ficheros) que no se puede revisar a fondo; no hay puntos intermedios a los que volver | Un commit por grupo de tasks, cada uno revisado |
| 3 | `1166d72` | Los tests se escriben antes que el código (constitución) | Nadie vio los tests en rojo: pueden estar escritos para que pase el código que ya existía | En cada grupo, la task de tests primero y después la implementación |
| 4 | `23c6eca` | Las versiones nuevas de la spec que surgen durante la feature van en su rama | La rama implementa la 1.0 y `main` dice 1.1: nadie comprobó que el código cumpla la versión nueva antes de fusionar | Cambiar la spec en la rama, junto con el plan, las tasks y el código afectados |
| 5 | `f0c2a4c` y `1458a69` | La rama se fusiona entera cuando la feature está terminada | `main` tuvo la feature sin página (T-09 y T-10 pendientes), y la feature tiene dos fusiones | Fusionar una sola vez, después del último ciclo y de la comprobación final |
| 6 | `dae724b` | La spec se aprueba en `main`, y entre una feature y la siguiente se replanifica | La spec de D llegó a `main` escondida en «lo que faltaba de C», sin replanificar antes | Terminar C, replanificar y aprobar la spec de D en `main` |
| 7 | `6ae1357` | Lo que cambia el comportamiento pasa por la spec y por el flujo | El código dice 15:00 y la spec dice 14:30: los documentos ya no dicen la verdad (*spec drift*) y el cambio no tiene ni rama ni tests | Decidir el cambio, subir la versión de la spec y hacerlo en una rama con su plan, sus tasks y sus tests |
| 8 | `feature/C-registrar-prestamo` | Después de fusionar, se borra la rama | Queda una rama vieja que confunde: parece una feature en curso | `git branch -d` tras la fusión |

## Replanificación

| Nota | Pregunta | Qué cambias y dónde | Commit |
|------|----------|---------------------|--------|
| N1 | ¿La siguiente feature del índice sigue siendo la que toca? | Pongo la E antes que la D en el índice de features (`docs/specs/README.md`): la coordinación TIC la necesita antes y solo depende de A | `Replanificación tras la feature C: E antes que D en el índice` |
| N2 | ¿Has corregido la misma decisión en varios planes? | La llevo a la constitución: «La hora actual se obtiene con `ahora()` de `src/utilidades/reloj.js`, nunca con `new Date()`, para que los tests puedan fijarla» | `Replanificación tras la feature C: la hora, con reloj.ahora()` |
| N3 | ¿El agente ha tropezado varias veces con lo mismo? | Añado a la sección «Estructura» de `AGENTS.md`: «Los tests están en `tests/`» | `Replanificación tras la feature C: carpeta de los tests en AGENTS.md` |
| N4 | ¿Has escrito el mismo prompt varias veces? | Lo convierto en un comando de OpenCode, `.opencode/commands/revisar-plan.md` | `Replanificación tras la feature C: comando /revisar-plan` |
| N5 | ¿La siguiente feature del índice sigue siendo la que toca? | No programo nada: la exportación es una feature nueva. Añado al índice «G · Exportar los préstamos del día» y decido su orden; pasará por el flujo como las demás | `Replanificación tras la feature C: feature G en el índice` |
| N6 | Ninguna | Nada: ha pasado una vez y ya está en el plan como alternativa descartada, que es donde la leerá el siguiente agente. Si se repite en otros planes, irá a la constitución | — |

Los cambios van antes de empezar la siguiente feature porque el agente que haga su spec y su plan leerá el índice, la constitución y `AGENTS.md` tal como estén ese día. Si se corrigen después, la feature D (o la E) ya se habrá hecho con el contexto viejo: se repetirán las mismas correcciones y, con suerte, se notarán en la revisión. Además, cada cambio en su propio commit, en `main` y antes de la rama siguiente, deja claro con qué contexto se hizo cada feature.
