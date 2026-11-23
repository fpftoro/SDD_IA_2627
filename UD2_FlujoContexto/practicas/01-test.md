# Test: El flujo SDD y el contexto del agente

- [Test: El flujo SDD y el contexto del agente](#test-el-flujo-sdd-y-el-contexto-del-agente)
  - [Bloque 1: El flujo SDD](#bloque-1-el-flujo-sdd)
  - [Bloque 2: Especificar y planificar](#bloque-2-especificar-y-planificar)
  - [Bloque 3: Descomponer en tasks e implementar](#bloque-3-descomponer-en-tasks-e-implementar)
  - [Bloque 4: Artefactos y estado de las features](#bloque-4-artefactos-y-estado-de-las-features)
  - [Bloque 5: La ventana de contexto](#bloque-5-la-ventana-de-contexto)
  - [Bloque 6: Memoria persistente del agente](#bloque-6-memoria-persistente-del-agente)

Una sola respuesta correcta por pregunta. La clave está en `soluciones/00-test/README.md`.

---

#### Bloque 1: El flujo SDD

> Criterios: OA2 a

1. **¿Qué problema resuelve el flujo SDD al separar el trabajo en fases?**
   - a) Que no haga falta revisar el código, porque los documentos de cada fase ya lo garantizan.
   - b) Que toda la documentación del proyecto quede escrita antes de empezar la primera feature.
   - c) Que el agente trabaje más deprisa, porque genera todo el código de la feature en una sola sesión larga y sin pausas.
   - d) Que las decisiones no se mezclen en un cambio enorme: cada fase deja un documento que una persona revisa.

2. **¿Qué artefacto produce la fase de descomponer y a qué pregunta responde?**
   - a) `tasks.md`: ¿en qué pasos y en qué orden se construye?
   - b) `constitution.md`: ¿cómo se trabaja en este proyecto?
   - c) `spec.md`: ¿qué hay que construir?
   - d) `plan.md`: ¿cómo se va a construir?

3. **¿Quién cierra cada fase del flujo?**
   - a) Una persona, que revisa y aprueba; ninguna fase la cierra el agente.
   - b) El agente *build*, cuando ha guardado el documento y los tests pasan.
   - c) El agente *plan*, cuando el documento ya no tiene marcadores `[NECESITA ACLARACIÓN]`.
   - d) La integración continua, cuando sale en verde.

4. **En la fase de planificar, ¿cómo se reparten el trabajo los agentes *plan* y *build* de OpenCode?**
   - a) *Build* propone el plan y *plan* lo revisa y lo aprueba antes de que se guarde en `plan.md`.
   - b) *Plan* propone y guarda el plan, porque puede editar los ficheros de `docs/` pero no los de `src/`.
   - c) *Plan* propone el plan y se discute con él; cuando está acordado, *build* guarda solo `plan.md`.
   - d) *Build* hace toda la fase, porque al final hay que escribir un fichero y *plan* no puede.

5. **¿En qué momento se crea la rama de una feature y qué va en ella?**
   - a) Al empezar el primer ciclo de implementación; el plan y las tasks se aprueban antes en `main`.
   - b) Al terminar la feature, para guardar una copia de lo hecho antes de fusionarlo en `main`.
   - c) Al crear el borrador de la spec, para que la spec se escriba, se revise y se apruebe en la rama.
   - d) Al empezar el plan; lleva plan, tasks, código, tests y las versiones nuevas de la spec.

6. **¿Para qué sirve la opción `--no-ff` al fusionar la rama de una feature?**
   - a) Para fusionar sin crear ningún commit nuevo, de modo que el historial de `main` quede en línea recta.
   - b) Para que Git rechace la fusión si la integración continua del último commit está en rojo.
   - c) Para que Git cree un commit de fusión aunque `main` no haya cambiado, marcando dónde acaba la feature.
   - d) Para que Git borre la rama de la feature automáticamente en cuanto termina la fusión.

7. **Al revisar un plan, lees: «si el texto está vacío, la tarea se guarda como “Sin título”». La spec no dice nada de ese caso. ¿Dónde se corrige?**
   - a) En la constitución, porque las tareas vacías pueden aparecer en todas las features.
   - b) En el plan, sustituyendo esa decisión por otra más razonable antes de aprobarlo y guardarlo.
   - c) En la spec: es un comportamiento que nadie ha decidido; se decide allí y se vuelve a aprobar.
   - d) En el código, cuando se implemente, porque es ahí donde se verá si la decisión funciona.

8. **Al revisar la implementación aparece un fichero de código que no viene de ninguna task. Según la trazabilidad, ¿qué significa?**
   - a) Que nadie lo pidió: ninguna decisión del plan ni requisito de la spec lo justifica.
   - b) Que lo ha generado la integración continua al ejecutar los tests en GitHub después del `push`.
   - c) Que es un fichero de configuración y, por eso, no necesita una task propia en `tasks.md`.
   - d) Que su task ya se marcó con `[x]` y por eso ha desaparecido de `tasks.md`.

9. **¿Qué es replanificar entre dos features?**
   - a) Una quinta fase del flujo que produce un documento con la planificación de todo el proyecto.
   - b) Volver al punto de control 0 tras fusionar una feature, antes de empezar la siguiente.
   - c) Rehacer el plan técnico de la feature que acaba de terminar con lo aprendido al implementarla.
   - d) Aprovechar la pausa entre features para programar mejoras pequeñas sin pasar por el flujo.

10. **¿Qué tienen en común Spec Kit, Kiro y Conductor?**
    - a) Las tres ejecutan todas las tasks seguidas, sin puntos de control, para ganar velocidad.
    - b) Usan los mismos nombres de ficheros y comandos, así que un proyecto se puede pasar de una a otra sin cambios.
    - c) Separan contexto, spec, plan y tareas en ficheros Markdown del repositorio, con revisión humana.
    - d) Las tres guardan las tareas dentro del plan, sin un fichero de tasks aparte.

---

#### Bloque 2: Especificar y planificar

> Criterios: OA2 b

11. **¿En qué consiste empezar la spec de una feature con una entrevista?**
    - a) El agente escribe la spec completa con lo más habitual y marca al final las partes que podrías cambiar.
    - b) El agente te hace preguntas antes de escribir, con alternativas y sus consecuencias, y tú decides.
    - c) El agente entrevista a los futuros usuarios y escribe la spec a partir de lo que contestan.
    - d) Escribes tú la spec con la plantilla y después el agente te pregunta si estás de acuerdo con cada parte.

12. **En la ronda de aclaración, el agente encuentra decisiones que la spec no resuelve. ¿Qué haces con ellas?**
    - a) Las resuelves todas en el plan, porque el plan es el sitio de las decisiones técnicas.
    - b) Dejas que el agente las resuelva con lo más habitual, para no retrasar la aprobación.
    - c) Las que se notarían desde fuera se deciden en la spec; las internas, en el plan.
    - d) Las llevas todas a la constitución, para que valgan en todas las features.

13. **¿Cuál de estas decisiones de la feature «Añadir una tarea» va en el plan técnico y no en la spec?**
    - a) En qué capa se comprueba que el texto de la tarea no está vacío.
    - b) Si la tarea nueva aparece al principio o al final de la lista.
    - c) Qué mensaje de error recibe quien envía un texto vacío.
    - d) Cuántos caracteres puede tener como máximo el texto de una tarea.

14. **¿Por qué el agente no escribe código en la fase de planificar?**
    - a) Porque la constitución prohíbe guardar código en la carpeta `docs/`, donde vive el plan.
    - b) Porque el código del plan se copiaría tal cual en las tasks y obligaría a mantenerlo en dos sitios.
    - c) Porque el agente *plan* no tiene acceso a las herramientas del lenguaje y no podría ejecutar ni probar ese código.
    - d) Porque las decisiones se revisan mejor sin código, el código ancla y el plan aún puede cambiar la spec.

15. **Si el agente no escribe código al planificar, ¿qué puede contener el plan?**
    - a) Nada técnico: solo la visión general, los riesgos y las preguntas pendientes para la spec.
    - b) Los tests completos de la feature, porque en el flujo los tests van antes que el código.
    - c) El cuerpo de las funciones más delicadas, para revisarlas antes de que llegue la implementación.
    - d) Los nombres de ficheros, funciones principales y paquetes, pero no el cuerpo de las funciones.

16. **¿Qué parte de una decisión técnica se olvida con más frecuencia y evita que otro agente vuelva a proponer lo mismo más adelante?**
    - a) La alternativa descartada.
    - b) El identificador `D-xx` de la decisión.
    - c) Los identificadores de la spec que cubre.
    - d) El motivo de la decisión.

17. **Un *edge case* de la spec se nota en la respuesta de la API. ¿Cómo debe comprobarlo la estrategia de pruebas del plan?**
    - a) Con un test de integración de la API, aunque además tenga un test unitario del servicio.
    - b) Con un test unitario del servicio basta, porque es ahí donde está la lógica que lo resuelve.
    - c) A mano en el navegador, con una lista de comprobación en la task de la página.
    - d) Con un test unitario del repositorio, que es la capa que devuelve los datos a la API.

18. **Has cambiado a *build* y le has pedido que guarde el plan acordado. ¿Qué compruebas antes de aprobarlo?**
    - a) Que `npm test` sigue en verde, porque guardar el plan no debe romper ningún test.
    - b) Que existe una copia del plan en `~/.opencode/plan/`, que es donde OpenCode guarda los planes.
    - c) Que el agente ha cambiado el estado del plan a `Aprobado` después de guardarlo.
    - d) Que `git status` solo muestra `plan.md` y que el fichero dice lo acordado.

19. **El agente propone en el plan una dependencia que no está en la constitución. ¿Qué haces?**
    - a) Dejar que *build* la instale y decidir en la revisión del código si se queda.
    - b) Rechazarla siempre, porque la constitución prohíbe cualquier dependencia que no nombre.
    - c) Comprobar si hace falta; si se acepta, anotarla en «Dependencias» con su motivo.
    - d) Aceptarla, porque elegir las dependencias es una decisión técnica que corresponde al plan.

20. **Al planificar aparece algo que la spec no decide y que se notaría desde fuera del sistema. ¿Qué se hace?**
    - a) Se deja para la implementación, cuando el agente tenga el código delante y más información.
    - b) Se para el plan: se decide, la spec sube de versión y se vuelve a aprobar antes de seguir.
    - c) Se decide en el plan y se anota en «Riesgos y dudas», para revisarlo cuando se implemente.
    - d) Se añade a la constitución, para que la decisión valga también en las demás features.

---

#### Bloque 3: Descomponer en tasks e implementar

> Criterios: OA2 c

21. **¿Cuál de estos criterios de terminado hace que una task no sea verificable?**
    - a) «Terminada cuando: los tests de T-03 pasan y los de T-01 siguen pasando».
    - b) «Terminada cuando: los tests existen y fallan, porque el servicio aún no existe».
    - c) «Terminada cuando: el servicio funciona bien».
    - d) «Terminada cuando: `npm test` pasa».

22. **¿Para qué sirve sobre todo la línea «Ficheros» de una task al revisar el ciclo?**
    - a) Para ver lo que el agente ha hecho sin pedírselo: todo fichero cambiado que no esté en ella.
    - b) Para que el agente sepa qué ficheros puede borrar antes de empezar a implementar la task del grupo.
    - c) Para decidir en qué orden se ejecutan los tests del grupo cuando se lanza `npm test`.
    - d) Para que OpenCode escriba automáticamente el mensaje del commit con esos ficheros.

23. **¿Qué indica el marcador `[P]` en una task?**
    - a) Que se puede hacer en paralelo: no depende de otras ni toca sus ficheros.
    - b) Que es prioritaria y hay que hacerla antes que las demás tasks de su grupo.
    - c) Que está pendiente de revisión en el punto de control del grupo.
    - d) Que es una task de pruebas y va antes de la implementación que comprueba.

24. **¿Cómo se detecta mejor una «dependencia al revés» en una lista de tasks?**
    - a) Leyéndolas en orden y preguntándose en cada una si lo que necesita ya existe.
    - b) Comprobando que cada task toca uno o dos ficheros como máximo.
    - c) Buscando las tasks que no llevan el marcador `[P]` y adelantándolas.
    - d) Ejecutando `npm test` después de aprobar las tasks y antes del primer ciclo.

25. **¿Por qué, en cada ciclo, hay que ver los tests nuevos en rojo antes de implementar?**
    - a) Porque la integración continua exige un commit con los tests en rojo antes de aceptar cada commit en verde.
    - b) Porque un test que pasa sin código no comprueba nada: el rojo prueba que falla por el motivo correcto.
    - c) Porque Vitest no ejecuta un test nuevo hasta que ha fallado una vez en el equipo de quien lo escribe.
    - d) Porque la salida en rojo le dice al agente qué ficheros tiene que crear y con qué nombres.

26. **¿Por qué el prompt de implementar prohíbe cambiar un test para que pase?**
    - a) Porque los tests solo los escribe una persona.
    - b) Porque todo quedaría en verde aunque los tests ya no comprobaran la spec.
    - c) Porque OpenCode marca los ficheros de tests como de solo lectura mientras el agente implementa.
    - d) Porque cambiar un test obliga a rehacer el plan y las tasks de toda la feature.

27. **El agente termina el grupo y te dice que todos los tests pasan. ¿Qué haces en el punto de control 4?**
    - a) Pedirle que vuelva a ejecutar `npm test` y que te pegue la salida completa en la conversación.
    - b) Fiarte de su resumen y hacer el commit, porque la integración continua repetirá los tests después.
    - c) Subir la rama y revisar el código solo si la integración continua sale en rojo.
    - d) Ejecutar tú `git status`, `git diff` y `npm test`, y revisar el cambio con la lista.

28. **Si ejecutas `npm test` en cada punto de control, ¿para qué sirve la integración continua?**
    - a) Para sustituir al punto de control 4, de modo que la persona solo revise cuando algo falla.
    - b) Para ejecutar los tests en cada `push`, en una máquina limpia con solo lo que hay en el repositorio.
    - c) Para comprobar que el código respeta el plan, la constitución y la línea «Ficheros» de cada una de las tasks.
    - d) Para fusionar la rama en `main` automáticamente en cuanto todos los tests salen en verde.

29. **En tu equipo `npm test` pasa, pero la CI del mismo commit falla con `Cannot find module '../src/servicios/servicio-tareas.js'`. ¿Qué es lo más probable?**
    - a) Que el fichero no se añadió al commit: está en tu equipo pero no en el repositorio.
    - b) Que el workflow está mal y hay que quitar el paso `npm ci` para que la CI pase.
    - c) Que GitHub usa otra versión de Vitest distinta de la que tienes instalada en tu equipo.
    - d) Que la máquina de GitHub no tiene permiso para leer la carpeta `src/` del repositorio.

30. **En mitad de un ciclo, ves que el agente ha elegido el nombre de un campo de la respuesta de la API que la spec no fija. ¿Qué haces?**
    - a) Paras y lo decides en la spec, con una versión nueva, en el mismo commit que el código.
    - b) Lo aceptas, porque el nombre de un campo es un detalle de implementación que decide el agente.
    - c) Lo anotas en el plan como una decisión técnica nueva y sigues con el ciclo.
    - d) Lo dejas como está y lo decides en la replanificación, cuando la feature esté fusionada.

---

#### Bloque 4: Artefactos y estado de las features

> Criterios: OA2 d

31. **¿Por qué la spec, el plan y las tasks se guardan en el mismo repositorio que el código?**
    - a) Porque GitHub no permite enlazar desde el código documentos que estén guardados en otro servicio.
    - b) Porque así el agente los lee y un cambio de comportamiento lleva spec y código en el mismo commit.
    - c) Porque así la integración continua comprueba en cada `push` que la spec y el código dicen lo mismo.
    - d) Porque los ficheros Markdown ocupan poco y no hace falta guardarlos en otro sitio aparte.

32. **¿Qué diferencia hay entre una feature `⏳ Pendiente` y una `📝 Borrador`?**
    - a) `Pendiente` solo existe en el índice y no hay spec; `Borrador` es una spec que se está escribiendo.
    - b) Son el mismo estado: el índice usa `Pendiente` y la spec usa `Borrador` para referirse a lo mismo.
    - c) `Pendiente` es una spec que espera el punto de control 1; `Borrador`, una spec que la revisión ha devuelto para rehacerla.
    - d) `Pendiente` es una spec aprobada que espera su plan; `Borrador`, una feature con el plan todavía en curso.

33. **En `main`, la spec y el índice de una feature dicen `🔜 Aprobada`, y en `src/` hay código suyo a medio hacer. ¿Qué indica?**
    - a) Que basta con cambiar el índice a `✅ Implementada`, porque ya hay código de la feature en `main`.
    - b) Que el estado correcto es `⏳ Pendiente`, porque la feature todavía no tiene tasks aprobadas.
    - c) Nada raro: `main` sigue diciendo `🔜 Aprobada` mientras la feature se implementa, hasta que se fusiona.
    - d) Una incoherencia: se empezó a implementar sin cambiar el estado o se fusionó a medias.

34. **Pides al agente que revise una spec y, además de revisarla, cambia su estado a `Aprobada`. ¿Qué haces?**
    - a) Aceptarlo y actualizar el índice en un commit aparte, para que los dos digan lo mismo.
    - b) Aceptarlo si la revisión es buena, porque el agente ha comprobado la spec con la lista del punto de control 1.
    - c) Deshacer el cambio de estado, porque aprobar lo decide una persona, y prohibirlo en `AGENTS.md`.
    - d) Pedirle que cambie también el índice, para que `npm run estado` no dé error.

35. **¿Cuándo se actualiza el índice de features `docs/specs/README.md`?**
    - a) Al terminar cada semana, revisando todas las specs a la vez.
    - b) Al fusionar la rama de la feature, con todos los estados de golpe.
    - c) En el mismo commit que el cambio de estado de la spec.
    - d) Cuando `npm run estado` detecta que hay alguna diferencia.

36. **El índice y la spec de una feature no dicen el mismo estado. ¿Cuál está mal?**
    - a) El más antiguo, según Git.
    - b) El índice: manda la spec.
    - c) La spec: el índice lo ve el equipo.
    - d) El del último commit.

37. **Mientras implementas la feature B en su rama, ¿qué estado muestra el índice en `main`?**
    - a) `🔜 Aprobada`: `main` muestra lo terminado, y el estado de la rama cambia en ella.
    - b) `✅ Implementada` en cuanto se aprueban las tasks, porque ya no queda nada por decidir.
    - c) `⏳ Pendiente`, porque la feature no cuenta como aprobada hasta que tiene plan y tasks.
    - d) `🔧 En implementación`, porque el índice de `main` se actualiza en el commit de cada ciclo.

38. **¿Qué muestra `git log --oneline --first-parent` en `main`?**
    - a) Los commits de la rama actual que todavía no están en `main`, para saber qué falta por fusionar.
    - b) Solo la línea de `main`: specs aprobadas, fusiones y replanificaciones, sin los commits de cada rama.
    - c) La historia de un fichero concreto, siguiéndolo aunque se haya renombrado con `git mv`.
    - d) Solo el primer commit de cada feature, el de la spec en borrador, para ver cuándo empezó cada una de ellas.

39. **Al replanificar, el equipo decide implementar la feature D antes que la C. ¿Cómo se hace?**
    - a) Borrando las dos carpetas y creándolas otra vez con el prefijo nuevo, en el mismo commit.
    - b) Reordenando solo las filas del índice, porque el prefijo de la carpeta no tiene ningún significado.
    - c) Creando una rama para cada feature con su nombre nuevo y fusionándolas después en `main`.
    - d) Cambiando sus prefijos con `git mv`, reordenando el índice y revisando las referencias.

40. **¿Qué separa OpenSpec para llevar el estado de las features?**
    - a) La spec de cada feature de su plan técnico, que guarda en dos carpetas distintas del repositorio.
    - b) Las ramas de Git de las features en curso de las ramas ya fusionadas en `main`.
    - c) Las features de cada persona del equipo, cada una en una carpeta con el nombre de quien la lleva.
    - d) Las specs vigentes del sistema de los cambios en curso, que se integran en ellas al archivarse.

---

#### Bloque 5: La ventana de contexto

> Criterios: OA2 e

41. **¿Qué es la ventana de contexto de un modelo?**
    - a) La lista de ficheros del repositorio que el agente tiene permiso para leer según `opencode.json`.
    - b) El número de sesiones anteriores que el agente recuerda al empezar una nueva en el mismo proyecto.
    - c) El máximo que el modelo puede recibir de una vez: instrucciones, ficheros, historial y tu mensaje.
    - d) La parte de la pantalla de OpenCode donde se ve la conversación con el agente y sus respuestas.

42. **Según la idea del presupuesto de atención, ¿cuál es el objetivo al preparar el contexto de una tarea?**
    - a) El conjunto más pequeño de información útil para conseguir el resultado.
    - b) Toda la información que pueda servir, por si acaso, mientras quepa en la ventana.
    - c) Solo las reglas del proyecto, sin documentos.
    - d) Llenar la ventana casi hasta el límite, para que el modelo tenga el máximo de datos.

43. **¿Qué mostró el trabajo de investigación *Lost in the Middle*?**
    - a) Que un contexto largo hace responder más deprisa al modelo.
    - b) Que los modelos se saltan los ficheros intermedios cuando leen todos los de una carpeta.
    - c) Que los modelos aprovechan peor lo que está en el centro de un contexto largo.
    - d) Que los modelos olvidan lo que está al principio de un contexto largo y solo atienden al final.

44. **En una sesión larga, el agente vuelve a proponer «como comentamos» algo que rechazaste hace un rato. ¿Por qué?**
    - a) Porque el agente aprende de cada rechazo y vuelve a proponer lo rechazado para confirmar que no lo quieres.
    - b) Porque la propuesta rechazada sigue en la ventana y el agente puede tomarla por una decisión.
    - c) Porque el modelo guarda las propuestas de las sesiones anteriores y las mezcla con la actual.
    - d) Porque OpenCode añade a `AGENTS.md` un resumen de lo que se ha hablado durante la sesión.

45. **¿Por qué las reglas permanentes van en `AGENTS.md` y en la constitución, y no en el primer mensaje de cada sesión?**
    - a) Porque los ficheros de reglas no ocupan sitio en la ventana de contexto y el primer mensaje sí.
    - b) Porque las instrucciones del principio de la sesión quedan enterradas bajo el historial y pierden fuerza.
    - c) Porque así el agente no puede incumplirlas, igual que si estuvieran en los permisos de `opencode.json`.
    - d) Porque el primer mensaje de una sesión no llega al modelo hasta que el agente ha leído los ficheros del proyecto.

46. **¿Qué contexto no necesita la fase de descomponer el plan en tasks?**
    - a) `AGENTS.md` y la constitución del proyecto.
    - b) El plan aprobado, con su secuencia de implementación.
    - c) El código y el historial de la sesión del plan.
    - d) La spec aprobada, con sus identificadores.

47. **Para planificar la feature B cargas como ejemplo el plan de la feature A. ¿Qué tipo de memoria del agente es?**
    - a) Procedimental.
    - b) Semántica.
    - c) Episódica.
    - d) De trabajo.

48. **El agente ha tomado un camino equivocado porque a tu mensaje le faltaba información. ¿Qué es mejor hacer?**
    - a) Compactar la sesión con `/compact`.
    - b) `/undo` y reescribir el mensaje con lo que faltaba.
    - c) Corregirlo en el mensaje siguiente, para que el agente aprenda del error y no lo repita.
    - d) Dejar que termine y corregir después el resultado a mano en los ficheros.

49. **¿Por qué compactar la sesión es el último recurso y no la primera opción?**
    - a) Porque OpenCode solo compacta de forma automática.
    - b) Porque el resumen pierde detalles y no eliges tú cuáles.
    - c) Porque al compactar se pierden `AGENTS.md` y la constitución hasta la siguiente sesión.
    - d) Porque al compactar OpenCode deshace también los cambios que el agente hizo en los ficheros.

50. **¿Qué ventaja tiene encargar una búsqueda en el código al subagente *explore*?**
    - a) Puede modificar los ficheros que encuentra sin pedir permiso, lo que ahorra pasos.
    - b) Recuerda las búsquedas de sesiones anteriores.
    - c) Usa siempre un modelo más potente que el de la sesión, así que encuentra más cosas.
    - d) Lee en su propia sesión y a la tuya solo llega su respuesta breve.

---

#### Bloque 6: Memoria persistente del agente

> Criterios: OA2 f

51. **¿Cuándo entra en la ventana un `AGENTS.md` guardado dentro de la carpeta `tests/`?**
    - a) Cuando lanzas un comando que trabaja con los tests.
    - b) Solo cuando lo mencionas con `@` en un mensaje.
    - c) Siempre, al empezar la sesión, igual que el `AGENTS.md` de la raíz.
    - d) Cuando el agente lee un fichero de esa carpeta.

52. **Añades el patrón `"docs/reglas/*.md"` al campo `instructions` de `opencode.json`. ¿Cuándo se cargan esos ficheros?**
    - a) Cuando la tarea encaja con la descripción que hay al principio de cada fichero.
    - b) Solo cuando el agente lee algún fichero de la carpeta `docs/reglas/`.
    - c) Solo cuando está activo el agente *plan*, que es el que lee la documentación.
    - d) Siempre, en todas las sesiones, aunque se indiquen con un patrón.

53. **El `AGENTS.md` de un proyecto dice «Lint: `npm run lint`», pero el proyecto no tiene linter. ¿Qué problema hay?**
    - a) Que el agente intentará cumplir la regla: buscará el linter o incluso lo instalará.
    - b) Ninguno: el agente comprueba `package.json` al empezar y descarta los comandos que no existen.
    - c) Que la integración continua fallará, porque ejecuta los comandos que aparecen en `AGENTS.md`.
    - d) Que OpenCode no arranca hasta que el comando exista.

54. **En una sesión muy larga, el agente incumple una convención que ya estaba escrita en `AGENTS.md`. ¿Qué haces?**
    - a) Convertir la convención en una skill, para que el agente la cargue cuando la necesite.
    - b) Tratarlo como un problema de contexto, sin añadir otra regla.
    - c) Repetir la regla en `AGENTS.md` con otras palabras, para que tenga más peso.
    - d) Copiar la regla también en la constitución.

55. **¿Cómo decide el agente cargar una skill?**
    - a) Solo la carga cuando la persona escribe `/` seguido del nombre de la skill.
    - b) Ve solo el nombre y la descripción de cada una, y la carga cuando la tarea encaja.
    - c) Al empezar carga el `SKILL.md` completo de todas las skills, y aplica la que necesite en cada momento.
    - d) La carga cuando lee un fichero de la carpeta donde está guardada la skill.

56. **¿Qué regla debe cumplir el campo `name` de una skill?**
    - a) Ninguna en concreto, porque el agente identifica la skill solo por su descripción.
    - b) Minúsculas, números y guiones, igual que el nombre de su carpeta.
    - c) Empezar siempre por `skill-`.
    - d) El mismo texto que el título principal del `SKILL.md`, con mayúsculas y espacios.

57. **¿Qué diferencia hay entre un comando y una skill?**
    - a) El comando lo lanzas tú con `/<nombre>`; la skill la carga el agente cuando la tarea encaja.
    - b) El comando funciona solo en OpenCode y la skill solo en otros agentes, como Claude Code o GitHub Copilot.
    - c) El comando se guarda fuera del repositorio, en la configuración personal, y la skill dentro de él.
    - d) El comando puede llevar ejemplos y scripts, y la skill solo una lista corta de reglas.

58. **Con este comando en `.opencode/commands/implementar.md`, ¿qué ocurre al escribir `/implementar B-ver-lista 2`?**

    ```markdown
    ---
    description: Implementa un grupo de tasks de una feature
    agent: build
    ---
    Implementa el grupo $2 de docs/specs/$1/tasks.md.
    ```

    - a) El agente *plan* propone cómo implementar los grupos 1 y 2 de la feature B, sin tocar ficheros.
    - b) El agente *build* implementa el grupo 2 de `docs/specs/B-ver-lista/tasks.md`.
    - c) El agente *build* implementa el grupo `B-ver-lista` de `docs/specs/2/tasks.md`.
    - d) OpenCode crea un comando nuevo llamado `/implementar-B-ver-lista` con ese prompt.

59. **Con estos permisos en la cabecera de un agente, ¿puede editar `docs/specs/A-añadir-tarea/spec.md`?**

    ```yaml
    permissions:
      - { action: edit, resource: "*", effect: deny }
      - { action: edit, resource: "README.md", effect: allow }
      - { action: edit, resource: "docs/**", effect: allow }
      - { action: edit, resource: "docs/specs/**", effect: deny }
    ```

    - a) Depende: si las reglas chocan, OpenCode pregunta.
    - b) Sí: `docs/**` lo permite, y una regla `allow` siempre tiene prioridad sobre una `deny`.
    - c) No: gana la primera regla que coincide, la de `*`, y las demás no llegan a aplicarse.
    - d) No: coinciden tres reglas y gana la última, `docs/specs/**`, que es `deny`.

60. **¿Por qué el agente documentador lleva una regla `subagent` en `deny`, además de sus reglas de `edit`?**
    - a) Porque sin él no podría leer los ficheros del proyecto que necesita para escribir la documentación.
    - b) Porque sin ella el documentador funcionaría como agente principal y no como subagente.
    - c) Porque sin él usaría el modelo de la sesión.
    - d) Porque sin él podría encargar el trabajo a otro agente que sí puede editar.

---
