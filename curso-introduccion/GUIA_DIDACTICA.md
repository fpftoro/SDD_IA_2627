# Guía didáctica — Curso: empezar con SDD y agentes

Es la **única referencia** de esta versión corta del curso. Lo que no se dice aquí se rige por la [guía del curso completo](../GUIA_DIDACTICA.md); las secciones que se heredan se citan con su número.

## Índice

- [Parte I. Contexto](#parte-i-contexto)
- [Parte II. Sesiones](#parte-ii-sesiones)
- [Parte III. Pendiente de decidir](#parte-iii-pendiente-de-decidir)
- [Parte IV. Estado del trabajo](#parte-iv-estado-del-trabajo)
- [Registro de cambios](#registro-de-cambios)

# Parte I. Contexto

## 1. Marco

- **Objetivo:** que el alumnado empiece a aplicar el desarrollo guiado por especificaciones (SDD) con agentes de IA en cualquier proyecto de desarrollo, y se lleve un método y una plantilla para hacerlo.
- **Reparto:** cada sesión tiene **lectura del tema en casa**, **ejercicio en clase** y **práctica en casa** después. No se fijan tiempos.
- **Independiente de la tecnología.** El ejemplo es un dominio genérico (la reserva de salas de un centro), sin interfaz ni lenguaje fijados. Cada alumno **trabaja con la tecnología de su módulo** (la que indique en la constitución de su repositorio), de modo que el curso sirve igual para cualquier módulo de desarrollo.
- **Quien aprende sigue el curso por escrito.** Los temas se leen solos y los ejercicios traen enunciado, parte de clase y de casa y criterio de «hecho»; en clase se hacen con el profesor, que resuelve dudas. Las soluciones están en `soluciones/` (material del profesor).
- **Sin proyecto final.** El curso se practica con **ejercicios sobre el ejemplo común**; el proyecto en el que se aplicará depende del módulo y **no se trabaja aquí**. El trabajo de casa es terminar el ejercicio de clase y una práctica más sobre el mismo método.
- **Qué se aprende:** los fundamentos (qué es SDD y por qué), cómo es el **contexto** que recibe un agente, cómo **escribir buenas especificaciones** con un método en pasos, el **flujo** spec → plan → tasks → tests → código y cómo trabajar con **varios agentes con roles** (arquitecto, implementador y probador), lanzándolos **en paralelo**. Además, cómo comprobar con unos pocos intentos si un cambio en los agentes funciona (**evaluar al agente**, versión reducida del apartado 3.7.3 de la UD3).
- **Qué no se aprende:** especificación avanzada, validación automática (CI y *quality gates*), MCP, equipos ni código heredado. Quien quiera seguir tiene las unidades UD1–UD4 del curso completo.
- **Herramienta:** OpenCode, conectado directamente al proveedor del alumno, sin OpenRouter (§8 de la guía raíz). Para instalarlo y conectarlo se remite al tema 3 de la UD1.

## 2. Repositorio y modo de trabajo

- Todo lo propio de esta versión vive en `curso-introduccion/`. Los contenidos se **escriben aquí**, autocontenidos; se enlaza a las unidades solo como ampliación opcional.
- Se trabaja **una pieza por sesión**; al terminar se actualiza la Parte IV y el registro de cambios de esta guía.
- Se heredan de la guía raíz: normas de redacción y «nada que caduque» (§4, incluidos los identificadores `RF`, `RNF`, `AC`, `EC`, `D` y `T`), diagramas (§5), entorno del alumnado (§8), evaluación (§10) y el uso de Docker del `CLAUDE.md` raíz.
- **Sin versiones, precios ni fechas** presentados como actuales. Las tecnologías de ejemplo (lenguajes, marcos) se citan solo como ejemplos de lo que puede elegir el alumno.

## 3. Ejemplo común: reserva de salas

Un dominio pequeño, con reglas de negocio y casos límite, que se puede implementar en cualquier lenguaje con cualquier forma de entrada (consola, API, formulario o funciones):

| Feature | Qué hace | Se usa en |
|---------|----------|-----------|
| **A · Crear una reserva** | Reservar una sala en una franja, con sus reglas (fecha futura, duración, horario, solapamientos) | Sesiones 3 y 4 |
| **B · Cancelar una reserva** | Cancelar una reserva activa, liberando la franja | Sesión 5 |
| **C · Consultar las reservas de una sala** | Listar las reservas activas de una sala en un día, ordenadas | Sesión 6 |

Material: `ejemplo-reservas/` (PRD, spec de A como referencia, specs de B y C aprobadas, y el plan de A). La plantilla de repositorio está en `plantilla/` y no fija ningún lenguaje.

## 4. Los tres agentes

| Agente | Rol | Qué puede editar |
|--------|-----|------------------|
| `arquitecto` | Planifica: `plan.md` y `tasks.md` con las **firmas** de lo que se va a construir | Solo esos dos ficheros |
| `probador` | Escribe y ejecuta los tests **desde la spec**, antes del código | La carpeta de tests y `tasks.md` (para marcar sus tasks) |
| `implementador` | Escribe el código para que pasen los tests | Todo menos tests, docs y configuración |

Tres roles, y cada uno resuelve un problema concreto (UD4, tema 1): quien planifica no programa, quien programa no puede cambiar los tests y quien prueba no ha visto la implementación. **El plan fija las firmas** para que `probador` e `implementador` puedan trabajar **a la vez** en dos *worktrees*, sin verse.

# Parte II. Sesiones

Cada sesión: **lectura en casa antes**, **ejercicio en clase** y **práctica en casa después**.

| Sesión | Tema | Ejercicio (clase) | Práctica de casa | Salida |
|--------|------|-------------------|------------------|--------|
| 1 | [Qué es SDD y por qué](01-que-es-sdd.md) | Las decisiones que nadie tomó | Diez decisiones de un encargo vago (portátiles) | Saben qué decide el agente cuando la spec no lo hace |
| 2 | [El contexto y el entorno](02-contexto-y-entorno.md) | Preparar el repositorio y comprobar el efecto del contexto | Reescribir seis reglas vagas como verificables | Entorno funcionando y constitución rellenada con su tecnología |
| 3 | [Escribir buenas especificaciones](03-escribir-especificaciones.md) | Spec de «Crear una reserva» con el método de siete pasos | Tres requisitos vagos a EARS | Una spec aprobada de la feature A |
| 4 | [El flujo: de la spec al código](04-flujo-spec-plan-tests-codigo.md) | La feature A: plan, tasks y tests (el código, en casa) | Decidir dónde se corrige cada problema | Feature A implementada con los tests en verde |
| 5 | [Agentes con roles](05-agentes-y-roles.md) | Configurar los tres agentes y empezar la feature B con ellos | Diseñar un cuarto rol, el `revisor`, y comprobar con seis intentos si el permiso sobre los tests funciona | Feature B hecha con tres roles, permisos comprobados y un cambio en los agentes evaluado |
| 6 | [Trabajar en paralelo](06-paralelo.md) | La feature C en paralelo con *worktrees* | ¿Serie o paralelo? e informe de una página | Una feature hecha en paralelo y criterio para decidir cuándo paralelizar |

Detalle de cada sesión:

1. **Qué es SDD.** Fundamentos: el agente rellena los huecos, la spec como contrato, *vibe coding* y SDD, artefactos y flujo en una página. Ejercicio: decisiones implícitas de un prompt vago y de un código «generado por el agente».
2. **Contexto y entorno.** Ventana de contexto, tres capas (`AGENTS.md`, constitución, spec), qué entra y qué estorba, OpenCode como arnés (*harness*) del modelo (*plan* y *build*, permisos). Ejercicio: crear el repositorio con la plantilla, rellenar la tecnología y los comandos, y comparar la respuesta del agente sin y con contexto.
3. **Especificaciones.** Anatomía (RF, RNF, AC, EC, fuera de alcance), EARS básico (sin Gherkin), ambigüedad, y un **método de siete pasos** para determinar qué lleva una spec. Ejercicio: la spec de la feature A con una entrevista del agente y una ronda de aclaración.
4. **Flujo.** Plan con decisiones y **firmas**, tasks, tests antes que el código, ciclos cortos, puntos de control y qué corregir dónde. Ejercicio: la feature A de principio a fin con *plan* y *build*.
5. **Roles.** Cuándo compensa más de un agente, los tres roles, permisos y *handoffs*; comandos como encargos fijos; **evaluar al agente** (apartado 5.7: casos fijos, tres puntuaciones por separado, recuentos «k de n» y un cambio cada vez). Ejercicio: crear los agentes y ejecutar la feature B con ellos. En casa, «¿Funciona el permiso?»: el `implementador` sin la regla de los tests (configuración A) frente al de la plantilla (B), con dos casos que el alumno prepara en su repositorio sobre la feature A, la única hecha junto con B en esa sesión (un test que se ha quedado viejo y un requisito ambiguo), seis sesiones cortas y sin scripts.
6. **Paralelo.** *Worktrees*, qué se puede paralelizar, `probador` e `implementador` a la vez desde el mismo plan, y qué indican las discrepancias. Ejercicio: la feature C en paralelo. El tema cierra con los pasos para arrancar un proyecto cuando termine el curso.

## Evaluación

Descrita en [`evaluacion.md`](evaluacion.md): se recoge el repositorio del ejemplo (un commit por documento aprobado), las respuestas de las prácticas de casa y un informe de una página; se corrige con la lista de comprobación del mismo fichero. No hay proyecto final: el que dependa del módulo queda fuera de este curso.

# Parte III. Pendiente de decidir

- **Probar con un proveedor real** los ejercicios de las sesiones 4 a 6 (los comandos, los tres agentes y las ejecuciones en paralelo): el agente puede proponer cosas distintas a las de las soluciones.
- **Carga de las sesiones 4, 5 y 6:** sin medir con alumnado. Si en la 4 no da tiempo a implementar la feature A, se termina en casa; la práctica de casa de la 5 suma seis sesiones cortas con el agente («¿Funciona el permiso?»); en la 6, quitar el informe si se queda corta.
- **Entorno:** el curso no incluye Dev Container porque la tecnología es la de cada módulo. Decidir si se da una guía de instalación de OpenCode para el aula o se remite al tema 3 de la UD1 (que instala OpenCode dentro del Dev Container). Sin contenedor, la plantilla prohíbe a los agentes salir del proyecto (`external_directory` en `deny`, decidido el 23/11/2026).
- **Peso de la evaluación** y formato de la defensa (oral o escrita): propuesto en `evaluacion.md`. El proyecto en el que se aplicará el método queda fuera del curso.

# Parte IV. Estado del trabajo

**Estados:** ⬜ pendiente · 🟡 en elaboración · 🔵 generado, pendiente de revisar · ✅ revisado por el profesor.

| Pieza | Estado |
|-------|--------|
| Guía y README | 🔵 |
| `plantilla/` (constitución, `AGENTS.md`, `opencode.json`, agentes, comandos y plantillas de docs, sin tecnología fija) | 🔵 |
| `ejemplo-reservas/` (PRD, specs A, B y C, plan de A) | 🔵 |
| Temas 1 a 6 con sus ejercicios en clase | 🔵 |
| `soluciones/` | 🔵 |
| `evaluacion.md` (qué se recoge, lista de comprobación y defensa) | 🔵 |
| `diapositivas/` (una presentación de 59 diapositivas con su PDF) | 🔵 |

**Dónde estamos**

- **15/11/2026.** **Rediseño del curso** a petición del profesor: se retira la versión anterior (específica de Angular 21, Vitest, Playwright y Vercel, con plantilla, demostración y prácticas de casa), que queda en el historial de Git. La versión nueva es **independiente de la tecnología**: ejemplo común de reserva de salas, plantilla sin lenguaje fijo y seis sesiones con ejercicio en clase y una práctica de casa por sesión (sin proyecto final). Se incorporan los fundamentos, el contexto, un método en siete pasos para escribir specs y tres agentes con roles (`arquitecto`, `probador`, `implementador`) con una práctica de lanzamiento en paralelo. Todo generado. **Comprobado:** con OpenCode 1.19.2 en Docker, la plantilla carga los tres agentes (con el orden de las reglas de `edit`, donde gana la última) y los cinco comandos (`/planificar`, `/escribir-tests`, `/implementar`, `/implementar-paralelo` y `/validar`); los 3 diagramas Mermaid son válidos y no hay enlaces rotos. **Sin probar con un proveedor real:** las sesiones con agente de las sesiones 2 a 6, ni los ejercicios con una tecnología concreta.

- **20/11/2026.** **Arnés (*harness*)** a petición del profesor: una frase en el tema 2 (apartado 2.3) presenta OpenCode como el arnés (*harness*) del modelo, siempre con la palabra en inglés (norma de la §4 de la guía raíz). Las diapositivas no cambian.
- **20/11/2026.** **OpenCode 2** (decisión del profesor tras la auditoría externa; ver la guía raíz, §8 y Parte IV): agentes y `opencode.json` de la plantilla en el formato de la v2 (`permissions`, comprobados con la propia v2), `Mayús+Tab` para cambiar entre *plan* y *build* y `opencode debug agents` para ver los permisos, en las sesiones 2 y 5, sus soluciones, la plantilla y las diapositivas (PDF regenerado).
- **23/11/2026.** **Revisión del curso** a petición del profesor, y arreglos decididos con él:
  - **Fuera del proyecto:** en OpenCode 2 los agentes pueden leer y editar fuera del proyecto sin preguntar, y el tema 6 decía que OpenCode preguntaba. Como el curso no tiene Dev Container, `plantilla/opencode.json` lo prohíbe (`external_directory` en `deny`), salvo `~/.opencode/plan/*`, donde *plan* guarda sus notas. Explicado en los temas 2 y 6, la solución 2 y las diapositivas.
  - **Restos de la v1:** `opencode debug agent revisor` (sesión 5 y su solución) y la regla de la solución 2 con la sintaxis de la v1.
  - **Rojo correcto:** se acepta que falte lo que fija la firma del plan, con ese mismo nombre, o que falle la comprobación. No valen un error de sintaxis ni una ruta o un nombre distintos de los de la firma (tema 4, `probador.md`, tasks de A, solución 4 y diapositiva).
  - **Specs de referencia:** A tiene ahora `fecha_invalida` (EC-09), `hora_invalida` (EC-10) y la prioridad en EC-11. B y C tienen regla de prioridad (EC-05). Los AC de A y B fijan «hoy», y C depende de A y B. Plan de A con D-08 (formatos) y D-07 (almacenamiento según la constitución).
  - **Coherencia:**
    - partes de los ejercicios renumeradas (sesiones 2, 4 y 6, con sus soluciones);
    - cinco comandos en la plantilla;
    - el `probador` también marca `tasks.md`;
    - la sesión 5 fusiona B en `main`;
    - la sesión 6 explica por qué el plan de C se confirma en `main`;
    - la parte D de la sesión 3 pasa al préstamo de portátiles;
    - la solución 4 sobre la persistencia, ahora coherente con la de la sesión 1;
    - `A-EC-08` como ejemplo de nombre de test;
    - «Lo esencial de OpenCode» en lugar de «en diez minutos».
  - **Comprobado** con OpenCode 2.3.2 en Docker: la plantilla carga los tres agentes y los cinco comandos sin avisos, y todos los agentes, incluido *explore*, quedan con `external_directory` en `deny`. PDF regenerado sin desbordes.
  - **Sin probar con un proveedor real:** que la denegación funcione en una sesión.
- **23/11/2026.** **Evaluar al agente, versión reducida** (decidido con el profesor):
  - **Teoría:** apartado 5.7 en la sesión 5, con casos fijos, tres puntuaciones por separado (resultado, límites y escalar), recuentos «k de n», un cambio cada vez y el intento afortunado como ejemplo. El caso reservado queda como ampliación (UD3).
  - **Práctica de casa «Parte E · ¿Funciona el permiso?»:**
    - compara el `implementador` sin la regla que le prohíbe editar los tests (A) con el de la plantilla (B);
    - dos casos que el alumno prepara en su repositorio, sobre la spec de A (C no se hace hasta la sesión 6):
      - un test que se queda con el mensaje viejo de `sala_desconocida`;
      - un requisito nuevo, `persona_ocupada`, que no decide si «marta» y «Marta» son la misma persona ni su lugar en la prioridad entre errores;
    - seis sesiones: cada caso con A y con B, y el que más cambie, dos veces más con A;
    - sin scripts: las ramas, `git cherry-pick` y `git diff --stat`.
  - Diapositiva nueva (59 en total) y PDF regenerado; solución de la sesión 5, `evaluacion.md` (dentro del criterio «Roles y paralelo», sin cambiar los pesos) y README.
  - **Sin probar con un proveedor real.**
- **23/11/2026.** **«Se nota desde fuera», explicado** (a petición del profesor): la expresión se usaba sin definir. Ahora el apartado 1.3 dice que la spec recoge lo que nota **quien usa el sistema** sin mirar el código, y el plan, lo que solo ve **quien lee el código**, con ejemplos. La parte A de la sesión 1, el tema 3, las soluciones 1, 4 y 5, el `arquitecto`, `/planificar` y una diapositiva usan las mismas palabras.

**Siguiente paso**

- **Revisión del profesor** del curso entero y de las decisiones de la Parte III. Lo más útil antes de impartirlo: hacer una vez los ejercicios de las sesiones 4 a 6 con un proveedor real y la tecnología de un módulo.

# Registro de cambios

| Fecha | Cambio |
|-------|--------|
| 05/11/2026 | Primera versión: curso para el proyecto final de Angular 21 (plantilla, demostración con Open-Meteo, sesión de Vercel y prácticas de casa). |
| 15/11/2026 | **Rediseño** (decidido con el profesor): curso para empezar con SDD en cualquier módulo de desarrollo. Seis sesiones, cada una con ejercicio y práctica de casa; ejemplo genérico (reserva de salas); plantilla sin tecnología fija; fundamentos, contexto, método de siete pasos para especificar y tres agentes con roles (`arquitecto`, `probador`, `implementador`) lanzados en paralelo. Se retira todo lo específico de Angular y Vercel. |
| 15/11/2026 | **Sin proyecto final** (decidido con el profesor): el curso solo da lo básico con ejercicios sobre el ejemplo; el proyecto, que dependerá del módulo, no se ve aquí. Se retiran los pasos «Mi proyecto»: cada sesión pasa a tener una práctica de casa sobre el mismo método; `evaluacion.md` recoge el repositorio del ejemplo y el informe; el tema 6 pasa a llamarse `06-paralelo.md`. |
| 15/11/2026 | **Solo EARS** (decidido con el profesor): se deja fuera Gherkin; los criterios de aceptación pasan a EARS combinado («Mientras…, cuando…, el sistema deberá…») en el tema 3, la plantilla, la constitución y las specs de A, B y C. |
| 15/11/2026 | **Sin horas ni reparto de tiempos** (decidido con el profesor): se quitan de los temas, del README y de la guía los minutos, las horas y la distribución; el curso ya no se presenta como «lo básico» ni «lo mínimo». |
| 15/11/2026 | **Carpeta renombrada** de `curso-12h/` a `curso-introduccion/` (decidido con el profesor). |
| 15/11/2026 | **Diapositivas del curso** a petición del profesor: una presentación (`diapositivas/curso-introduccion.md`, 58 diapositivas, con su PDF en `diapositivas/pdf/`) que sigue las buenas prácticas de la guía raíz (§12): título que afirma la idea, poco texto, ejemplos del curso, «Prueba tú» y cierre; sin tiempos. Sin desbordes y revisada a la vista. |
| 20/11/2026 | **Arnés (*harness*)** (decidido con el profesor): el tema 2 (apartado 2.3) presenta OpenCode como el arnés (*harness*) del modelo, con la palabra en inglés en todas sus apariciones (§4 de la guía raíz). |
| 20/11/2026 | **OpenCode 2** (decidido con el profesor, guía raíz): configuración de la plantilla en el formato de la v2, `Mayús+Tab` y `opencode debug agents` en las sesiones 2 y 5, las soluciones y las diapositivas. |
| 23/11/2026 | **Agentes dentro del proyecto** (decidido con el profesor): como el curso no tiene Dev Container, `plantilla/opencode.json` prohíbe a los agentes salir del proyecto (`external_directory` en `deny`, salvo las notas de *plan*). |
| 23/11/2026 | **Specs de referencia según el propio método** (decidido con el profesor): A con errores de formato (`fecha_invalida`, `hora_invalida`) y prioridad en EC-11; B y C con regla de prioridad (EC-05); los AC fijan «hoy» cuando el resultado depende de la fecha. |
| 23/11/2026 | **Evaluar al agente, versión reducida** (decidido con el profesor): apartado 5.7 y práctica de casa «¿Funciona el permiso?» en la sesión 5 (guía frente a permiso en el `implementador`, dos casos, seis sesiones, sin scripts); se puntúa dentro de «Roles y paralelo», sin cambiar los pesos de `evaluacion.md`. |
