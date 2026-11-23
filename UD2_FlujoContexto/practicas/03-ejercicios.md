# Ejercicios: El flujo SDD y el contexto del agente

- [Ejercicios: El flujo SDD y el contexto del agente](#ejercicios-el-flujo-sdd-y-el-contexto-del-agente)
  - [Cómo trabajar los ejercicios](#cómo-trabajar-los-ejercicios)
  - [El caso: préstamo de portátiles del centro](#el-caso-préstamo-de-portátiles-del-centro)
  - [Ejercicios de autocorrección](#ejercicios-de-autocorrección)

Cada ejercicio está en su propia carpeta, con el enunciado en `ENUNCIADO.md`, la plantilla de entrega en `README.md` y, si lo necesita, el material de partida.

---

## Cómo trabajar los ejercicios

En esta unidad todos los ejercicios son de **autocorrección**: sirven para practicar. Cada enunciado termina con un apartado **Comprueba tu solución** para que revises tu trabajo, y cuando el profesor publique las soluciones podrás comparar la tuya con ellas.

Tu profesor puede pedirte que entregues alguno en tu repositorio de trabajo para corregirlo en clase. Por eso todos tienen un **contrato de entrega**: los nombres y rutas de ficheros y las secciones del `README.md` que no puedes cambiar.

- **Todo lo que escribes va en el `README.md`** del ejercicio: tablas, respuestas y explicaciones. No crees ficheros `.md` sueltos para las respuestas. Los artefactos de SDD (spec, plan, tasks, `AGENTS.md`, constitución, índice de features) van en la ruta que indica el enunciado.
- **Ejercicios con agente (E03, E05, E08, E09 y E10, y la parte opcional de E07).** Se hacen con OpenCode dentro del Dev Container del ejercicio. El agente no responde siempre igual, así que no hay una «salida correcta» que copiar: lo que cuenta es **tu proceso**. Rellena en el `README.md` la sesión con el agente (qué le pediste, qué produjo y qué corregiste), las decisiones (qué propuestas aceptaste o rechazaste y por qué) y los commits.
- **Commits progresivos y ramas:** en los ejercicios con agente, un commit por fase o por grupo de tasks, con mensajes que digan qué has hecho. Desde el plan, el trabajo de cada feature va en su **rama** (`feature/<carpeta>`), y la fusionas en `main` con `--no-ff` cuando la feature está terminada (tema 1, apartado 1.3.4). Sube a GitHub `main` y también las ramas.
- **Integración continua (E05 y E10).** La plantilla trae el workflow `.github/workflows/calidad.yml` (tema 3, apartado 3.4.6), que ejecuta `npm test` en cada `push`. **No lo modifiques.** Sube la rama después de cada ciclo, no empieces el siguiente con la CI en rojo y no fusiones una feature si la CI de su último commit no está en verde. Los tests son unitarios y de integración; la página se comprueba a mano.

---

## El caso: préstamo de portátiles del centro

Los ejercicios E01 a E09 siguen con el caso de la UD1:

> El centro tiene varios carros de portátiles. Hoy el profesorado los reserva en una hoja de papel colgada en la sala de profesores, y a menudo dos grupos cuentan con el mismo carro, un portátil se devuelve con el cargador olvidado o nadie sabe quién se llevó el que falta. Se quiere una aplicación web sencilla para **reservar portátiles**, **registrar el préstamo y la devolución** y **anotar incidencias**.

Sus features son las del E04 de la UD1:

| # | Feature |
|---|---------|
| A | Consultar los portátiles |
| B | Reservar un carro |
| C | Registrar el préstamo |
| D | Registrar la devolución |
| E | Anotar una incidencia |
| F | Cancelar una reserva |

Cada enunciado trae el material de partida que necesitas (proyecto, specs y planes), así que no hace falta que tengas hechos los ejercicios de la UD1. E03, E04 y E05 forman una **cadena** sobre la feature B: el plan del E03 es el punto de partida del E04, y las tasks del E04, del E05. Cada uno empieza con la versión de referencia del anterior, para que un error en uno no arrastre a los siguientes.

El integrador (E10) vuelve a la **lista de tareas** de los temas: la feature C («Marcar una tarea como hecha»), que aprobaste en el E10 de la UD1.

---

## Ejercicios de autocorrección

| # | Ejercicio | Criterios | Después del tema | Descripción |
|---|-----------|-----------|------------------|-------------|
| 1 | [El recorrido de una feature](./ejercicios/E01-RecorridoFeature/ENUNCIADO.md) | OA2 a | 1 | Fases, artefactos, agentes y puntos de control; dónde se corrige cada problema; fallos del flujo en un historial; replanificar |
| 2 | [Plan con errores sembrados](./ejercicios/E02-PlanErroresSembrados/ENUNCIADO.md) | OA2 b | 2 | Localizar, nombrar y corregir los errores de un plan técnico |
| 3 | [El plan de una feature](./ejercicios/E03-PlanFeature/ENUNCIADO.md) | OA2 b | 2 | El plan de «Reservar un carro» con el agente *plan*, revisado en el punto de control 2 y con las decisiones documentadas |
| 4 | [Del plan a las tasks](./ejercicios/E04-PlanTasks/ENUNCIADO.md) | OA2 c | 3 | Descomponer el plan de «Reservar un carro» en tasks y revisar unas tasks con errores |
| 5 | [Implementar en ciclos cortos](./ejercicios/E05-CiclosCortos/ENUNCIADO.md) | OA2 c | 3 | Implementar «Reservar un carro» por grupos de tasks, parar ante un hueco de la spec y fusionar la feature |
| 6 | [El estado del proyecto](./ejercicios/E06-EstadoProyecto/ENUNCIADO.md) | OA2 d | 4 | Diagnosticar y corregir un repositorio con el estado de las features desordenado, y replanificar |
| 7 | [El contexto justo](./ejercicios/E07-ContextoJusto/ENUNCIADO.md) | OA2 e | 5 | Problemas de contexto en sesiones reales, el contexto de cada fase y los tipos de memoria del agente |
| 8 | [La memoria del agente](./ejercicios/E08-MemoriaAgente/ENUNCIADO.md) | OA2 f | 6 | `AGENTS.md` revisado, regla de carpeta, skill, comando y un subagente con permisos limitados |
| 9 | [Un cambio con OpenSpec](./ejercicios/E09-CambioOpenSpec/ENUNCIADO.md) | OA2 d | 6 | Proponer, aplicar y archivar con OpenSpec un cambio sobre una feature ya implementada |
| 10 | [De la spec aprobada a `main`](./ejercicios/E10-FeatureEnMain/ENUNCIADO.md) (integrador) | OA2 a, b, c, d, e, f | 6 | Lista de tareas: «Marcar una tarea como hecha» de principio a fin, con rama, ciclos, fusión y replanificación |
