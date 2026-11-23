# Ejercicios: SDD a escala

- [Ejercicios: SDD a escala](#ejercicios-sdd-a-escala)
  - [Cómo trabajar los ejercicios](#cómo-trabajar-los-ejercicios)
  - [El caso: préstamo de portátiles del centro](#el-caso-préstamo-de-portátiles-del-centro)
  - [Ejercicios de autocorrección](#ejercicios-de-autocorrección)

Cada ejercicio está en su propia carpeta, con el enunciado en `ENUNCIADO.md`, la plantilla de entrega en `README.md` y, si lo necesita, el material de partida.

---

## Cómo trabajar los ejercicios

En esta unidad todos los ejercicios son de **autocorrección**: sirven para practicar. Cada enunciado termina con un apartado **Comprueba tu solución** para que revises tu trabajo, y cuando el profesor publique las soluciones podrás comparar la tuya con ellas.

Tu profesor puede pedirte que entregues alguno en tu repositorio de trabajo para corregirlo en clase o con la ayuda de una IA. Por eso todos tienen un **contrato de entrega**: los nombres y rutas de ficheros y las secciones del `README.md` que no puedes cambiar.

- **Todo lo que escribes va en el `README.md`** del ejercicio: tablas, salidas de órdenes y explicaciones. No crees ficheros `.md` sueltos para las respuestas. Los artefactos (agentes, specs, planes, tests, configuraciones) van en la ruta que indica el enunciado.
- **Dev Container.** Los ejercicios que usan el agente, OpenCode o alguna herramienta (E01, E02, E03, E05, E06, E07 y E08) se abren en su Dev Container. E04 es solo de lectura y escritura y no lo lleva; su enunciado lo dice en «Entorno de trabajo». En E07 el contenedor solo sirve para validar la spec: la auditoría se hace con Git.
- **Ejercicios con agente (E03, E06 y E08, y la parte opcional de E05).** Se hacen con OpenCode. El agente no responde siempre igual, así que no hay una «salida correcta» que copiar: lo que cuenta es **tu proceso**. Rellena en el `README.md` la sesión con el agente, las decisiones (qué aceptaste o rechazaste y por qué) y los commits.
- **Ramas y *worktrees*.** E03 y E08 trabajan con varias ramas. Lo que cuenta es lo que está en los commits: los *worktrees* viven dentro del contenedor y no se entregan.
- **Commits progresivos:** en los ejercicios con agente, un commit por fase o por grupo de tasks, con mensajes que digan qué has hecho.

---

## El caso: préstamo de portátiles del centro

Los ejercicios E01 a E07 trabajan sobre el mismo caso que en las unidades anteriores:

> El centro tiene varios carros de portátiles. Hoy el profesorado los reserva en una hoja de papel colgada en la sala de profesores, y a menudo dos grupos cuentan con el mismo carro, un portátil se devuelve con el cargador olvidado o nadie sabe quién se llevó el que falta. Se quiere una aplicación web sencilla para **reservar portátiles**, **registrar el préstamo y la devolución** y **anotar incidencias**.

Las features son las de siempre: A Consultar los portátiles, B Reservar un carro, C Registrar el préstamo, D Registrar la devolución, E Anotar una incidencia y F Cancelar una reserva. En esta unidad el equipo del centro ha crecido: hay una persona de coordinación TIC (producto), otra de arquitectura, dos de desarrollo y una de calidad, y trabajan con varios agentes. El integrador (E08) vuelve a la **lista de tareas** de los temas.

---

## Ejercicios de autocorrección

| # | Ejercicio | Criterios | Después del tema | Descripción |
|---|-----------|-----------|------------------|-------------|
| 1 | [Subagentes del préstamo](./ejercicios/E01-SubagentesPrestamo/ENUNCIADO.md) | OA4 a | 1 | Decidir qué se reparte entre agentes, definir arquitecto, constructor y artesano con sus permisos y comprobarlos con `opencode debug agent` |
| 2 | [Handoffs y seguridad](./ejercicios/E02-HandoffsSeguridad/ENUNCIADO.md) | OA4 b | 1 | Mejorar tres encargos, escribir un *handoff* entre roles y corregir cinco agentes con permisos que se saltan el mínimo privilegio |
| 3 | [Dos features en paralelo](./ejercicios/E03-DosFeaturesParalelo/ENUNCIADO.md) | OA4 a, b | 1 | Comparar dos planes hechos a la vez, decidir qué va en paralelo y fusionar en el orden correcto con *worktrees* |
| 4 | [Equipo y gobernanza](./ejercicios/E04-EquipoGobernanza/ENUNCIADO.md) | OA4 c | 2 | Repartir los puntos de control por rol, escribir un `CODEOWNERS` y la PR de un cambio de constitución con su análisis de impacto |
| 5 | [Spec de un módulo heredado](./ejercicios/E05-SpecHeredada/ENUNCIADO.md) | OA4 d | 3 | Caracterizar un módulo sin spec ni tests, decidir cada rareza y escribir la spec del comportamiento actual |
| 6 | [Un cambio con delta de OpenSpec](./ejercicios/E06-DeltaOpenSpec/ENUNCIADO.md) | OA4 d | 3 | Refactorizar con los tests intactos y especificar un cambio con una delta: proponer, aplicar y archivar |
| 7 | [Detectar antipatrones](./ejercicios/E07-DetectarAntipatrones/ENUNCIADO.md) | OA4 e | 4 | Auditar un repositorio con el historial de una feature mal llevada y corregirlo en el orden del flujo |
| 8 | [Ampliar un proyecto existente](./ejercicios/E08-AmpliarProyecto/ENUNCIADO.md) **(integrador)** | OA4 a, b, c, d, e | 4 | Lista de tareas: dos features en paralelo con varios agentes, gobernanza del equipo y auditoría final |
