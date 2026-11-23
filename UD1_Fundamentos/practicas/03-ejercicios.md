# Ejercicios: Fundamentos del desarrollo guiado por especificaciones

- [Ejercicios: Fundamentos del desarrollo guiado por especificaciones](#ejercicios-fundamentos-del-desarrollo-guiado-por-especificaciones)
  - [Cómo trabajar los ejercicios](#cómo-trabajar-los-ejercicios)
  - [El caso: préstamo de portátiles del centro](#el-caso-préstamo-de-portátiles-del-centro)
  - [Ejercicios de autocorrección](#ejercicios-de-autocorrección)

Cada ejercicio está en su propia carpeta, con el enunciado en `ENUNCIADO.md`, la plantilla de entrega en `README.md` y, si lo necesita, el material de partida.

---

## Cómo trabajar los ejercicios

En esta unidad todos los ejercicios son de **autocorrección**: sirven para practicar. Cada enunciado termina con un apartado **Comprueba tu solución** para que revises tu trabajo, y cuando el profesor publique las soluciones podrás comparar la tuya con ellas.

Tu profesor puede pedirte que entregues alguno en tu repositorio de trabajo para corregirlo en clase. Por eso todos tienen un **contrato de entrega**: los nombres y rutas de ficheros y las secciones del `README.md` que no puedes cambiar.

- **Todo lo que escribes va en el `README.md`** del ejercicio: tablas, respuestas y explicaciones. No crees ficheros `.md` sueltos para las respuestas. Los artefactos de SDD (specs, `AGENTS.md`, constitución, índice de features) van en la ruta que indica el enunciado.
- **Ejercicios con agente (E03, E08, E09 y E10, y la parte opcional de E01).** Se hacen con OpenCode dentro del Dev Container del ejercicio. El agente no responde siempre igual, así que no hay una «salida correcta» que copiar: lo que cuenta es **tu proceso**. Rellena en el `README.md` la sesión con el agente (qué le pediste, qué produjo y qué corregiste), las decisiones (qué propuestas aceptaste o rechazaste y por qué) y los commits.
- **Commits progresivos:** en los ejercicios con agente, un commit por fase, con mensajes que digan qué has hecho.

---

## El caso: préstamo de portátiles del centro

Los ejercicios E01 a E09 trabajan sobre el mismo caso, distinto del de los temas para que no puedas copiar los ejemplos:

> El centro tiene varios carros de portátiles. Hoy el profesorado los reserva en una hoja de papel colgada en la sala de profesores, y a menudo dos grupos cuentan con el mismo carro, un portátil se devuelve con el cargador olvidado o nadie sabe quién se llevó el que falta. Se quiere una aplicación web sencilla para **reservar portátiles**, **registrar el préstamo y la devolución** y **anotar incidencias**.

Cada enunciado da los datos que necesitas del caso. El integrador (E10) vuelve a la **lista de tareas** de los temas, el proyecto que continuarás en la UD2.

---

## Ejercicios de autocorrección

| # | Ejercicio | Criterios | Después del tema | Descripción |
|---|-----------|-----------|------------------|-------------|
| 1 | [Las decisiones que nadie tomó](./ejercicios/E01-DecisionesImplicitas/ENUNCIADO.md) | OA1 a | 1 | Las decisiones implícitas del código que generó un agente a partir de un prompt vago, y cuándo conviene *vibe coding* o SDD |
| 2 | [Cada cosa en su sitio](./ejercicios/E02-CadaCosaEnSuSitio/ENUNCIADO.md) | OA1 b | 2 | Clasificar fragmentos como prompt, PRD, SRS o spec, y como reglas, constitución o spec |
| 3 | [Mi entorno con OpenCode](./ejercicios/E03-EntornoOpenCode/ENUNCIADO.md) | OA1 c | 3 | Dev Container, proveedor de modelos, `AGENTS.md`, constitución y permisos, comprobados con el agente *plan* |
| 4 | [Del épico a las features](./ejercicios/E04-EpicoFeatures/ENUNCIADO.md) | OA1 d | 4 | Separar épicos, features, historias y tasks, y escribir el índice de features del préstamo de portátiles |
| 5 | [Más allá del camino feliz](./ejercicios/E05-EdgeCases/ENUNCIADO.md) | OA1 e | 5 | Completar una spec de solo camino feliz con *edge cases*, fuera de alcance y dudas marcadas |
| 6 | [Spec con errores sembrados](./ejercicios/E06-ErroresSembrados/ENUNCIADO.md) | OA1 e | 5 | Localizar, nombrar y corregir los antipatrones de una spec |
| 7 | [EARS y Gherkin](./ejercicios/E07-EarsGherkin/ENUNCIADO.md) | OA1 f | 6 | Reescribir requisitos vagos en EARS y criterios de aceptación en Gherkin, comprobando la sintaxis |
| 8 | [Ni vaga ni rígida](./ejercicios/E08-VagaRigida/ENUNCIADO.md) | OA1 f | 6 | Graduar el detalle de una spec y revisarla con el agente, aceptando o rechazando sus propuestas |
| 9 | [La spec de una feature](./ejercicios/E09-SpecDevolucion/ENUNCIADO.md) | OA1 e, f | 6 | La spec completa de «Devolver un portátil» con ayuda del agente, documentando el proceso |
| 10 | [De la idea a la spec aprobada](./ejercicios/E10-SpecAprobada/ENUNCIADO.md) (integrador) | OA1 c, d, e, f | 6 | Lista de tareas: entorno y contexto, índice de features y spec de «Marcar una tarea como hecha» revisada y aprobada |
