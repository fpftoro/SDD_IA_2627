# Ejercicios: Validación, pruebas y herramientas

- [Ejercicios: Validación, pruebas y herramientas](#ejercicios-validación-pruebas-y-herramientas)
  - [Cómo trabajar los ejercicios](#cómo-trabajar-los-ejercicios)
  - [El caso: préstamo de portátiles del centro](#el-caso-préstamo-de-portátiles-del-centro)
  - [Ejercicios de autocorrección](#ejercicios-de-autocorrección)

Cada ejercicio está en su propia carpeta, con el enunciado en `ENUNCIADO.md`, la plantilla de entrega en `README.md` y, si lo necesita, el material de partida.

---

## Cómo trabajar los ejercicios

En esta unidad todos los ejercicios son de **autocorrección**: sirven para practicar. Cada enunciado termina con un apartado **Comprueba tu solución** para que revises tu trabajo, y cuando el profesor publique las soluciones podrás comparar la tuya con ellas.

Tu profesor puede pedirte que entregues alguno en tu repositorio de trabajo para corregirlo en clase o con la ayuda de una IA. Por eso todos tienen un **contrato de entrega**: los nombres y rutas de ficheros y las secciones del `README.md` que no puedes cambiar.

- **Todo lo que escribes va en el `README.md`** del ejercicio: tablas, salidas de órdenes y explicaciones. No crees ficheros `.md` sueltos para las respuestas. Los artefactos (specs, planes, tests, configuraciones, workflows) van en la ruta que indica el enunciado.
- **Dev Container.** Los ejercicios con código (E01, E03, E04, E05, E06, E08 y E09) se abren en su Dev Container. E01, E03 y E05 no usan el agente: el contenedor sirve para ejecutar los tests y las herramientas.
- **Ejercicios con agente (E04, E06, E08 y E09).** Se hacen con OpenCode. El agente no responde siempre igual, así que no hay una «salida correcta» que copiar: lo que cuenta es **tu proceso**. Rellena en el `README.md` la sesión con el agente, las decisiones (qué aceptaste o rechazaste y por qué) y los commits.
- **GitHub.** E05 y E09 necesitan que el repositorio esté en GitHub para ejecutar la integración continua.
- **Commits progresivos:** en los ejercicios con agente, un commit por fase o por grupo de tasks, con mensajes que digan qué has hecho.

---

## El caso: préstamo de portátiles del centro

Los ejercicios E01 a E08 trabajan sobre el mismo caso que en las unidades anteriores:

> El centro tiene varios carros de portátiles. Hoy el profesorado los reserva en una hoja de papel colgada en la sala de profesores, y a menudo dos grupos cuentan con el mismo carro, un portátil se devuelve con el cargador olvidado o nadie sabe quién se llevó el que falta. Se quiere una aplicación web sencilla para **reservar portátiles**, **registrar el préstamo y la devolución** y **anotar incidencias**.

En esta unidad el proyecto es una API con capas (rutas, controladores, servicios y repositorios) y la feature A, «Consultar los portátiles», ya implementada, con su spec, su plan y sus tests. Cada enunciado da lo que necesitas. El integrador (E08) vuelve a la **lista de tareas** de los temas.

---

## Ejercicios de autocorrección

| # | Ejercicio | Criterios | Después del tema | Descripción |
|---|-----------|-----------|------------------|-------------|
| 1 | [El drift que nadie vio](./ejercicios/E01-DriftSembrado/ENUNCIADO.md) | OA3 a | 1 | Matriz de trazabilidad, hallazgos y tests que pueden fallar en una feature con *drift* sembrado |
| 2 | [Seis diagnósticos](./ejercicios/E02-SeisDiagnosticos/ENUNCIADO.md) | OA3 d | 1 | Diagnosticar doce fallos y decidir dónde se corrige cada uno |
| 3 | [Tests que mienten](./ejercicios/E03-TestsQueMienten/ENUNCIADO.md) | OA3 b | 2 | Encontrar las mentiras de unos tests, demostrarlas con mutantes y corregirlas |
| 4 | [Los tests primero](./ejercicios/E04-TestsPrimero/ENUNCIADO.md) | OA3 b | 2 | Implementar «Reservar un carro» con los tests revisados antes y un agente que no puede tocarlos |
| 5 | [Los gates del proyecto](./ejercicios/E05-GatesProyecto/ENUNCIADO.md) | OA3 c | 3 | Lint con capas, cobertura, trazabilidad y GitHub Actions, en verde y en rojo |
| 6 | [Evaluar al agente](./ejercicios/E06-EvaluarAgente/ENUNCIADO.md) | OA3 g | 3 | Puntuar intentos preparados y pasar una batería de cuatro casos con dos configuraciones del arnés (*harness*), con un caso reservado |
| 7 | [Elegir herramientas](./ejercicios/E07-ElegirHerramientas/ENUNCIADO.md) | OA3 e | 4 | Tres escenarios con su matriz de decisión, dos herramientas investigadas y qué sobrevive al cambiar de agente |
| 8 | [MCP con mínimo privilegio](./ejercicios/E08-McpMinimoPrivilegio/ENUNCIADO.md) | OA3 f | 5 | Revisar y corregir un servidor MCP, conectarlo solo a un agente de lectura y probar una instrucción escondida |
| 9 | [Feature D con los gates en verde](./ejercicios/E09-FeatureDGatesVerde/ENUNCIADO.md) (integrador) | OA3 a, b, c, d | 3 | Lista de tareas: validar, diagnosticar y corregir, «Borrar una tarea» con los tests primero, un gate nuevo y fusión con la CI en verde |
