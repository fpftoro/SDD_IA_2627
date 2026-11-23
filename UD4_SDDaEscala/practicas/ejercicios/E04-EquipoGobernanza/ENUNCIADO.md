# E04 · Equipo y gobernanza

**Tipo:** autocorrección

El equipo del préstamo ha crecido a seis personas con cuatro roles. Reparte entre ellos los puntos de control de una feature, escribe los ficheros que hacen posible la revisión (`CODEOWNERS` y una plantilla de PR), añade un principio nuevo a la constitución y redacta la PR con su análisis de impacto.

**Criterios:** OA4 c

## El caso

Lee [`equipo.md`](./equipo.md) y [`repositorio.md`](./repositorio.md): quién forma el equipo y cómo es el repositorio. El análisis de impacto del cambio de la constitución está en [`explore-impacto.md`](./explore-impacto.md), y los cambios que hay que clasificar, en [`cambios.md`](./cambios.md). El caso del préstamo de portátiles lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro). Repasa antes los apartados 2.2 a 2.4 del tema 2 de la unidad.

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md`.

## Requisitos

1. **Puntos de control.** En la tabla «Puntos de control» del README, para la feature F («Cancelar una reserva»): quién **aprueba** cada punto (spec, plan, tasks, ciclos y fusión), quién más **participa**, qué **mira** (la pregunta concreta) y con qué agente de la unidad trabaja. Después, en «Cuello de botella», responde: arquitectura es una sola persona, ¿qué cambios revisa ella sí o sí y cuáles puede revisar otra persona? Usa la tabla de cambios de este ejercicio.
2. **Propietarios.** Crea `.github/CODEOWNERS` para el repositorio de `repositorio.md` con los cuatro equipos de `equipo.md`, y `.github/PULL_REQUEST_TEMPLATE/spec.md`, la plantilla de las PR de specs. En «Propietarios» responde: (a) por qué importa el orden de las líneas y cuál es el error que habría si la línea `*` estuviera la última; (b) si en una spec ponemos a producto y a calidad, ¿exige GitHub que aprueben los dos?, y cómo se consigue que calidad revise los *edge cases*; (c) quién revisa una PR que cambia `.opencode/agents/implementador.md` y por qué.
3. **Un principio nuevo.** Producto pide el principio de `explore-impacto.md`. Añade a `constitution.md` una sección **«Permisos»** que recoja lo que quiere el centro (lee también la nota de producto), sin decir cómo se implementa, y haz un commit `Constitución: permisos`. Después, en «PR de la constitución», escribe la descripción de la PR con las cuatro preguntas del apartado 2.4.2 (qué cambia, por qué, a qué afecta, qué hay que hacer) y una tabla **«Después de fusionar»** con cada rama o feature afectada, quién actúa y qué hace. Indica qué número de versión tendría el cambio si la constitución llevara versión.
4. **Clasificar.** Para cada uno de los ocho cambios de `cambios.md`, en «Clasificación»: si va a la **constitución**, dónde se gobierna si no (spec, plan, `AGENTS.md`, agentes, CI o configuración personal) y **quién lo revisa**.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `equipo.md`, `repositorio.md`, `explore-impacto.md`, `cambios.md` y `docs/` | Sin cambios: es el material que analizas |
| `.github/CODEOWNERS` | Con los equipos de `equipo.md` |
| `.github/PULL_REQUEST_TEMPLATE/spec.md` | Con una lista de comprobación |
| `constitution.md` | Con la sección «Permisos» añadida y el resto sin cambios |
| `README.md` | Secciones «Puntos de control», «Cuello de botella», «Propietarios», «PR de la constitución» y «Clasificación», con las tablas de la plantilla |

## Comprueba tu solución

- Producto aprueba la spec; arquitectura, el plan; desarrollo, las tasks y los ciclos. Calidad participa en la spec y en las tasks, no solo al final.
- Cada fila de «Puntos de control» tiene una pregunta concreta, no «revisa que esté bien».
- En `CODEOWNERS`, las líneas más específicas van **después** de las generales, y `constitution.md`, `AGENTS.md`, `.opencode/` y `.github/` son de arquitectura.
- La plantilla de la spec tiene una casilla que obliga a calidad a revisar los *edge cases*.
- La sección «Permisos» no dice cómo se implementa (nada de `if` ni de nombres de funciones) y recoge que cualquier profesor puede registrar una devolución.
- La PR identifica al menos las ramas D y E, y a producto como quien decide el caso de la devolución.
- La clasificación distingue una decisión repetida (constitución) de una decisión de una feature (plan) y de una preferencia personal (nadie la revisa).

## Al terminar

Haz un commit con los ficheros y el README.
