# Test: Fundamentos del desarrollo guiado por especificaciones

- [Test: Fundamentos del desarrollo guiado por especificaciones](#test-fundamentos-del-desarrollo-guiado-por-especificaciones)
  - [Bloque 1: Qué es el desarrollo guiado por especificaciones](#bloque-1-qué-es-el-desarrollo-guiado-por-especificaciones)
  - [Bloque 2: Artefactos y capas de contexto](#bloque-2-artefactos-y-capas-de-contexto)
  - [Bloque 3: El entorno de trabajo: OpenCode](#bloque-3-el-entorno-de-trabajo-opencode)
  - [Bloque 4: Features: la unidad de trabajo de una spec](#bloque-4-features-la-unidad-de-trabajo-de-una-spec)
  - [Bloque 5: Anatomía de una spec](#bloque-5-anatomía-de-una-spec)
  - [Bloque 6: Notaciones y granularidad](#bloque-6-notaciones-y-granularidad)

Una sola respuesta correcta por pregunta. La clave está en `soluciones/00-test/README.md`.

---

#### Bloque 1: Qué es el desarrollo guiado por especificaciones

> Criterios: OA1 a

1. **¿Qué significa que, sin especificación, el código se convierte en la *especificación de facto*?**
   - a) Que el agente escribe automáticamente un documento de especificación a partir del código.
   - b) Que el código sustituye al PRD como documento de negocio.
   - c) Que el código generado por el agente siempre cumple los requisitos del cliente.
   - d) Que la única descripción de cómo funciona el sistema es lo que hace el código, con las decisiones que tomó el agente.

2. **Ante un prompt vago, ¿qué hace normalmente un agente de codificación?**
   - a) Rellena los huecos con la opción más probable y la deja escrita en el código.
   - b) Rechaza la tarea hasta que reciba una especificación completa.
   - c) Genera solo el camino feliz y deja comentarios TODO en lo demás.
   - d) Se detiene y pregunta por cada detalle que no está claro.

3. **¿Qué es el *vibe coding*?**
   - a) Ir pidiendo cambios al agente en lenguaje natural y aceptar lo que funciona, sin planificar ni revisar demasiado el código.
   - b) Programar con el autocompletado de la IA mientras el desarrollador escribe el código.
   - c) Escribir primero los tests y después pedir al agente que los haga pasar.
   - d) Generar el código a partir de una spec aprobada, sin revisarlo.

4. **¿Para cuál de estas situaciones es más adecuado el *vibe coding*?**
   - a) Un cambio en un sistema con requisitos de auditoría.
   - b) Un módulo que mantendrán varias personas durante años.
   - c) Un prototipo que se enseñará mañana y después se tirará.
   - d) Una funcionalidad de pagos que va a producción.

5. **En el nivel *spec-first*, ¿cuál es la fuente de verdad?**
   - a) La spec y el código, sincronizados por la integración continua.
   - b) El PRD, que gobierna tanto la spec como el código.
   - c) La spec: el código se regenera a partir de ella.
   - d) El código: la spec se usa como contexto antes de programar.

6. **¿Qué caracteriza al nivel *spec-anchored*?**
   - a) Solo se editan las specs; el código se genera siempre a partir de ellas.
   - b) La spec se escribe antes de programar y después se archiva.
   - c) La spec gobierna el código durante toda su vida, con puntos de control y comprobaciones que detectan cuándo se separan.
   - d) No hay spec: el agente se guía por los tests.

7. **¿En qué estado está, según el tema, el nivel *spec-as-source*?**
   - a) Es el nivel en el que se trabaja durante todo el curso.
   - b) Es el nivel más extendido en la industria.
   - c) Es experimental: hay herramientas que exploran la idea, pero no es un enfoque habitual en proyectos reales.
   - d) Es obligatorio en los proyectos con requisitos de auditoría.

8. **¿Qué propone la «inversión» que describe el documento de metodología de GitHub Spec Kit?**
   - a) Que el código sirva a la especificación, y no al revés: mantener el sistema es hacer evolucionar la spec.
   - b) Que el agente decida la arquitectura y el humano escriba el código.
   - c) Que los tests se escriban después del código para no condicionar al agente.
   - d) Que la spec se deduzca del código ya escrito.

9. **¿Cuál de estos **no** es uno de los tres principios para trabajar con agentes del tema 1?**
   - a) El humano en el bucle.
   - b) Cambiar de herramienta cuando el agente no acierta.
   - c) Reglas antes que herramientas.
   - d) Especificar antes de construir.

10. **¿Cómo sitúa el tema 1 el desarrollo guiado por especificaciones respecto a la ingeniería de contexto?**
    - a) SDD sustituye a la ingeniería de contexto en los proyectos grandes.
    - b) Son enfoques opuestos: SDD prescinde del contexto y se basa solo en la spec.
    - c) SDD es ingeniería de contexto aplicada al desarrollo de software: la spec es la pieza de contexto más importante.
    - d) La ingeniería de contexto es una parte de la ingeniería de prompts.

---

#### Bloque 2: Artefactos y capas de contexto

> Criterios: OA1 b

11. **¿Cuál es la característica principal de un prompt frente a los demás artefactos?**
    - a) Describe los requisitos de todo el sistema de forma formal.
    - b) Es transitorio: existe en una conversación, no se versiona y no tiene estructura.
    - c) Describe el comportamiento de una funcionalidad con requisitos verificables.
    - d) Recoge los principios innegociables del proyecto.

12. **¿Qué responde un PRD?**
    - a) Qué pasa en cada caso límite de una funcionalidad.
    - b) Cómo se va a implementar cada funcionalidad.
    - c) Qué se va a construir y por qué, desde el punto de vista del negocio.
    - d) Qué comandos debe ejecutar el agente para probar el proyecto.

13. **¿En qué se diferencia una spec de SDD de un SRS tradicional?**
    - a) La spec describe una sola funcionalidad, en Markdown y versionada con el código; el SRS suele describir todo el sistema de forma formal.
    - b) La spec describe la arquitectura completa y el SRS una funcionalidad.
    - c) La spec no tiene requisitos no funcionales y el SRS sí.
    - d) El SRS se escribe para el agente y la spec para las personas.

14. **Un compañero escribe un prompt de tres párrafos con muchos detalles. ¿Es una spec?**
    - a) Depende del modelo que lo vaya a leer.
    - b) Sí, siempre que se guarde en el historial de la conversación.
    - c) Sí, porque tiene suficientes detalles para que el agente no suponga nada.
    - d) No: sigue siendo un prompt, porque le falta estructura, revisión y un lugar en el repositorio.

15. **¿Qué es un *edge case*?**
    - a) Una funcionalidad que queda fuera de alcance.
    - b) Un error de programación que el agente no sabe corregir.
    - c) El caso de uso principal de una funcionalidad.
    - d) Una situación en los extremos del funcionamiento normal: entradas inesperadas, condiciones raras o fallos externos.

16. **¿Por qué son especialmente importantes los *edge cases* cuando programa un agente?**
    - a) Porque el agente implementa por defecto el camino feliz y, si no están escritos, supone el resto.
    - b) Porque el agente no sabe programar validaciones.
    - c) Porque los modelos no pueden leer las secciones de errores.
    - d) Porque solo los *edge cases* se convierten en tests.

17. **¿Qué va en `AGENTS.md`?**
    - a) Reglas operativas de cómo trabaja el agente en el proyecto: comandos, estructura, convenciones y prohibiciones.
    - b) La spec de la funcionalidad en la que se trabaja.
    - c) Los principios de negocio y su justificación para la dirección.
    - d) El historial de las sesiones con el agente.

18. **«Los errores de la API devuelven `{ error: "mensaje" }` con el código HTTP adecuado.» ¿En qué capa de contexto encaja mejor?**
    - a) En la spec de la primera funcionalidad que tenga errores.
    - b) En el PRD, porque afecta a los usuarios.
    - c) En un prompt, cada vez que se pida un endpoint.
    - d) En la constitución: es un principio que deben respetar todas las funcionalidades.

19. **Una línea que solo afecta a una funcionalidad concreta se escribe en `AGENTS.md`. ¿Qué problema causa?**
    - a) Invalida la constitución del proyecto.
    - b) El agente no la leerá, porque solo lee `AGENTS.md` al principio.
    - c) El agente la lee en todas las tareas, aunque no le sirva, y añade ruido a su contexto.
    - d) Ninguno: cuanta más información tenga el agente, mejor.

20. **¿Qué primitiva es un procedimiento reutilizable que el agente carga solo cuando la tarea lo necesita?**
    - a) Una spec.
    - b) Una skill.
    - c) Una instrucción (regla).
    - d) Un servidor MCP.

---

#### Bloque 3: El entorno de trabajo: OpenCode

> Criterios: OA1 c

21. **¿Qué diferencia hay entre el agente y el modelo?**
    - a) Son lo mismo con dos nombres distintos.
    - b) El agente genera el texto y el modelo ejecuta los comandos.
    - c) El modelo genera respuestas; el agente prepara el contexto, ejecuta herramientas (leer, editar, terminal) y repite el ciclo hasta terminar.
    - d) El modelo se instala en el equipo y el agente está siempre en la nube.

22. **Al leer sobre agentes de codificación encuentras la palabra arnés (*harness*). ¿A qué se refiere?**
    - a) Al programa que rodea al modelo: decide qué contexto le llega, qué herramientas puede usar y qué se hace con sus respuestas.
    - b) Al modelo de lenguaje que genera las respuestas.
    - c) Al conjunto de tests que comprueban el código que escribe el agente.
    - d) Al contexto que el agente envía al modelo en cada petición.

23. **¿Por qué se fija la versión de OpenCode en el Dev Container del curso?**
    - a) Para que todo el grupo tenga la misma herramienta y los enunciados funcionen igual para todos.
    - b) Porque las versiones nuevas no admiten proveedores externos.
    - c) Porque así no hace falta conectar ningún proveedor.
    - d) Porque la última versión siempre tiene errores.

24. **¿Para qué sirve el volumen de Docker `sdd-opencode` del Dev Container?**
    - a) Para conservar las credenciales y las sesiones de OpenCode aunque se borre el contenedor.
    - b) Para guardar el código del proyecto fuera del repositorio.
    - c) Para instalar los modelos locales.
    - d) Para compartir la clave del proveedor con el resto del grupo.

25. **¿Con qué comando de OpenCode se conecta un proveedor de modelos?**
    - a) `/models`
    - b) `/connect`
    - c) `/init`
    - d) `/new`

26. **Una clave de API ha acabado en un commit. ¿Qué hay que hacer?**
    - a) Nada, si el repositorio es privado.
    - b) Cambiar la clave en el proveedor: borrar el commit no basta.
    - c) Borrar el commit con `git reset` y seguir trabajando.
    - d) Añadir el fichero al `.gitignore`.

27. **¿Qué tecla cambia entre los agentes *plan* y *build* en OpenCode?**
    - a) `Esc`
    - b) `Ctrl+P`
    - c) `Tab`
    - d) `Mayús+Tab`

28. **En la versión de OpenCode del curso, ¿qué puede hacer el agente *plan* con los ficheros del proyecto?**
    - a) Editarlos después de pedir permiso en cada cambio.
    - b) Leerlos y analizarlos, pero no editarlos (solo puede guardar sus propios planes).
    - c) Editarlos libremente, igual que *build*.
    - d) Nada: *plan* no puede leer ficheros.

29. **¿Qué hace `/init` en un proyecto que ya tiene código?**
    - a) Analiza el repositorio y crea un borrador de `AGENTS.md` que hay que revisar.
    - b) Crea la constitución del proyecto a partir del PRD.
    - c) Configura los permisos del agente en `opencode.json`.
    - d) Instala las dependencias del proyecto.

30. **¿Cómo se consigue que OpenCode cargue la constitución en todas las sesiones?**
    - a) Añadiéndola al campo `instructions` de `opencode.json`.
    - b) Enlazándola desde `AGENTS.md`, porque OpenCode sigue los enlaces.
    - c) Pegándola al principio de cada prompt.
    - d) Guardándola en `~/.config/opencode/AGENTS.md`.

31. **Con esta configuración de `opencode.json`, ¿qué pasa si el agente intenta ejecutar `rm -r test`?**

    ```json
    {
      "permissions": [
        { "action": "shell", "resource": "*", "effect": "ask" },
        { "action": "shell", "resource": "npm test", "effect": "allow" },
        { "action": "shell", "resource": "rm *", "effect": "deny" }
      ]
    }
    ```

    - a) Pregunta antes de ejecutarlo, porque la primera regla, la de `*`, es `ask`.
    - b) Se rechaza sin preguntar, porque la última regla que coincide es `rm *` con `deny`.
    - c) Se ejecuta sin preguntar, porque no hay ninguna regla para `rm -r`.
    - d) Da un error de configuración, porque hay dos reglas que coinciden.

---

#### Bloque 4: Features: la unidad de trabajo de una spec

> Criterios: OA1 d

32. **¿Qué es una feature en SDD?**
    - a) Una capacidad concreta y delimitable del sistema, con valor propio, que se puede especificar, planificar y comprobar.
    - b) Una necesidad del usuario escrita con el formato «Como…, quiero…, para…».
    - c) Un objetivo de negocio grande que se divide en partes.
    - d) Un paso de implementación que toca uno o dos ficheros.

33. **¿En qué nivel de la jerarquía se escribe una spec?**
    - a) En el de la task.
    - b) En el de la historia de usuario.
    - c) En el del épico.
    - d) En el de la feature.

34. **«Gestión de usuarios: registro, inicio de sesión, recuperar la contraseña y editar el perfil.» ¿Qué es?**
    - a) Una historia de usuario.
    - b) Una feature bien definida.
    - c) Un épico: hay que dividirlo en varias features.
    - d) Una task.

35. **«Crear la tabla de reservas en la base de datos.» ¿Qué es y dónde va?**
    - a) Un épico de infraestructura con su propia spec.
    - b) Una feature, porque lleva trabajo.
    - c) Una task técnica sin valor propio: va en el plan de la primera feature que la necesite.
    - d) Un requisito no funcional de todas las specs.

36. **¿Dónde va una historia de usuario en SDD?**
    - a) En `AGENTS.md`, para que el agente la lea siempre.
    - b) En el contexto de la spec de su feature, para explicar el porqué.
    - c) En un fichero aparte que sustituye a la spec.
    - d) En la lista de tasks del plan.

37. **¿Qué criterio de una buena feature es especialmente importante cuando el código lo genera un agente?**
    - a) Revisable: una persona tiene que poder revisar el código generado en un tiempo razonable.
    - b) Que no tenga dependencias de ningún tipo.
    - c) Que la pueda implementar el agente sin ningún plan.
    - d) Que tenga un nombre corto.

38. **¿Quién decide qué features tiene un proyecto?**
    - a) El agente *build*, al implementar la primera feature.
    - b) Una persona; el agente puede proponer una división, pero la decisión es humana.
    - c) Nadie: salen automáticamente del PRD.
    - d) El agente, porque conoce mejor el código.

39. **¿Cuándo **no** hace falta escribir una spec completa?**
    - a) Cuando van a trabajar en ella varias personas.
    - b) Cuando la feature tiene *edge cases* importantes.
    - c) Cuando un error tendría consecuencias serias.
    - d) Para una corrección pequeña y localizada o un cambio de configuración: basta un prompt cuidado.

40. **¿Con qué criterios se ordenan las features?**
    - a) Orden alfabético, tamaño y autor.
    - b) Fecha de creación de cada spec.
    - c) El orden en que aparecen en el PRD.
    - d) Dependencias, valor y riesgo.

41. **¿Qué indica el prefijo de la carpeta de una feature (`B-reservar-carro/`)?**
    - a) El número de versión de la spec.
    - b) La prioridad que le da el agente.
    - c) El orden de implementación acordado.
    - d) El orden en que se escribieron las specs.

---

#### Bloque 5: Anatomía de una spec

> Criterios: OA1 e

42. **¿Por qué una spec para un agente tiene que ser especialmente inequívoca?**
    - a) Porque el agente no pregunta: elige la interpretación más probable y la deja en el código.
    - b) Porque los modelos no entienden el lenguaje natural.
    - c) Porque las specs ambiguas no se pueden guardar en Markdown.
    - d) Porque el agente solo lee la primera línea de cada requisito.

43. **¿Qué diferencia hay entre un requisito funcional y uno no funcional?**
    - a) El funcional se comprueba con tests y el no funcional no se comprueba.
    - b) El no funcional describe lo que el sistema no hace.
    - c) El funcional dice qué hace el sistema; el no funcional, con qué calidad o restricciones lo hace.
    - d) El funcional lo escribe el negocio y el no funcional el agente.

44. **¿Cuál de estos requisitos no funcionales está bien escrito?**
    - a) El sistema deberá ser rápido.
    - b) El endpoint responderá en menos de 200 ms con 1.000 tareas guardadas.
    - c) El sistema deberá ser seguro y robusto.
    - d) La respuesta deberá llegar en un tiempo razonable.

45. **«El sistema deberá validar el formulario, guardar el usuario y enviarle un correo de bienvenida.» ¿Qué problema tiene?**
    - a) Es demasiado rígido porque menciona un correo.
    - b) Es un requisito compuesto: son tres requisitos, y el agente podría implementar dos y olvidar el tercero.
    - c) Es un criterio de aceptación, no un requisito.
    - d) Ninguno: está escrito con «deberá».

46. **¿Qué forma tienen los criterios de aceptación en el tema 5?**
    - a) Requisito, prioridad, responsable.
    - b) Si… entonces… si no…
    - c) Dado… cuando… entonces…
    - d) Como…, quiero…, para…

47. **¿Cuál de estos criterios de aceptación es binario?**
    - a) La creación de tareas funciona correctamente.
    - b) El usuario queda satisfecho al añadir una tarea.
    - c) Dado un texto de 281 caracteres, cuando se crea la tarea, entonces el servidor responde 400.
    - d) La pantalla de tareas debe ser intuitiva.

48. **¿Para qué sirve la sección «Fuera de alcance»?**
    - a) Para anotar las features que se han descartado para siempre.
    - b) Para que el agente no añada funcionalidades que parecen lógicas pero nadie ha pedido ni revisado.
    - c) Para listar los errores que el sistema no gestiona.
    - d) Para describir los requisitos de otras specs.

49. **¿Qué significa el marcador `[NECESITA ACLARACIÓN]` en una spec?**
    - a) Un requisito opcional que se puede implementar o no.
    - b) Una decisión que todavía no se ha tomado; la spec no se puede aprobar mientras quede alguno.
    - c) Un comentario que el agente debe ignorar.
    - d) Una parte de la spec que el agente debe decidir por su cuenta.

50. **Durante la implementación se descubre un *edge case* que no estaba en la spec. ¿Qué se hace?**
    - a) Se apunta en el PRD para la próxima versión.
    - b) Se escribe una spec nueva solo para ese caso.
    - c) Se resuelve en el código y la spec se deja como estaba.
    - d) Se añade a la spec en el mismo commit o PR que el código que lo trata.

51. **¿Por qué una spec desactualizada es peor que no tener spec?**
    - a) Porque obliga a reescribir todo el código.
    - b) Porque el agente no puede leer specs antiguas.
    - c) Porque ocupa más espacio en el repositorio.
    - d) Porque le da al agente información falsa, que seguirá como si fuera cierta.

---

#### Bloque 6: Notaciones y granularidad

> Criterios: OA1 f

52. **¿Qué obliga a escribir una notación estructurada como EARS?**
    - a) Los requisitos en inglés.
    - b) Los nombres de las funciones que implementan cada requisito.
    - c) Un test automático por cada requisito.
    - d) Condición y respuesta en cada requisito, siempre en el mismo sitio.

53. **«Cuando el usuario envíe el texto de una tarea nueva, el sistema deberá guardarla como pendiente.» ¿Qué patrón de EARS es?**
    - a) Por evento.
    - b) Ubicuo.
    - c) Comportamiento no deseado.
    - d) Por estado.

54. **«Mientras una tarea esté marcada como hecha, el sistema deberá mostrar su texto tachado.» ¿Qué patrón de EARS es?**
    - a) Opcional.
    - b) Por estado.
    - c) Por evento.
    - d) Comportamiento no deseado.

55. **¿Para qué se usa el patrón *Si… entonces…* de EARS?**
    - a) Para los requisitos que dependen de una característica opcional.
    - b) Para el comportamiento no deseado: errores, fallos y entradas no válidas.
    - c) Para cualquier requisito con una condición.
    - d) Para los requisitos que se aplican siempre.

56. **¿En qué orden se escribe un requisito EARS que combina estado y evento?**
    - a) Da igual el orden si están las dos condiciones.
    - b) Primero el estado, después el evento y al final la respuesta: *Mientras…, cuando…, el sistema deberá…*
    - c) Primero la respuesta y después las condiciones.
    - d) Primero el evento y después el estado.

57. **¿Cómo usa EARS la herramienta Kiro, según el tema 6?**
    - a) En los criterios de aceptación de las historias de usuario de `requirements.md`.
    - b) En los nombres de los ficheros de código.
    - c) En el plan técnico de `design.md`.
    - d) En los mensajes de los commits.

58. **¿Qué línea hay que poner al principio de un fichero de Gherkin para usar las palabras clave en español?**
    - a) `@lang es`
    - b) `# language: es`
    - c) `Idioma: español`
    - d) `# encoding: es`

59. **¿Cuándo conviene un *Esquema del escenario* en Gherkin?**
    - a) Cuando el criterio de aceptación todavía no está decidido.
    - b) Cuando un escenario tiene más de tres pasos.
    - c) Cuando el escenario describe la interfaz paso a paso.
    - d) Cuando varios casos siguen la misma forma y solo cambian los datos, que van en una tabla de *Ejemplos*.

60. **¿Cuál de estos pasos de Gherkin es declarativo?**
    - a) Cuando hago clic en el botón azul de la derecha
    - b) Cuando escribo en el campo con id "texto-tarea" y pulso Intro
    - c) Cuando espero dos segundos a que cargue la página
    - d) Cuando el usuario añade la tarea "Comprar leche"

61. **¿Cuándo es una spec demasiado rígida?**
    - a) Cuando tiene muchos *edge cases*.
    - b) Cuando indica la ruta de la API.
    - c) Cuando fija el código HTTP y el mensaje de cada error.
    - d) Cuando dicta la implementación: nombres de funciones, código o estructuras internas.

---
