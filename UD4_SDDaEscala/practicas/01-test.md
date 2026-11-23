# Test: SDD a escala: varios agentes, equipos y proyectos reales

- [Test: SDD a escala: varios agentes, equipos y proyectos reales](#test-sdd-a-escala-varios-agentes-equipos-y-proyectos-reales)
  - [Bloque 1: Varios agentes: orquestación, roles y trabajo en paralelo](#bloque-1-varios-agentes-orquestación-roles-y-trabajo-en-paralelo)
  - [Bloque 2: SDD en equipo](#bloque-2-sdd-en-equipo)
  - [Bloque 3: Casos prácticos: proyectos nuevos y código existente](#bloque-3-casos-prácticos-proyectos-nuevos-y-código-existente)
  - [Bloque 4: Antipatrones del flujo](#bloque-4-antipatrones-del-flujo)

Una sola respuesta correcta por pregunta. La clave está en `soluciones/00-test/README.md`.

---

#### Bloque 1: Varios agentes: orquestación, roles y trabajo en paralelo

> Criterios: OA4 a, b

1. **¿Cuándo compensa repartir el trabajo entre varios agentes en lugar de usar uno solo?**
   - a) Cuando el equipo tiene varios modelos contratados, para aprovechar todos los que pague aunque no aporten nada distinto.
   - b) Cuando hay más de tres tasks pendientes, porque a partir de ese número un solo agente pierde el hilo del proyecto.
   - c) Siempre que la feature sea grande, porque varios agentes producen más código por hora y eso acelera cualquier trabajo.
   - d) Cuando cada agente resuelve un problema concreto: contexto, permisos, revisión independiente, coste o paralelismo.

2. **¿Por qué, con agentes que no son deterministas, se prefiere la orquestación a la coreografía?**
   - a) Porque un coordinador comprueba cada resultado antes de seguir, en vez de que cada agente reaccione por su cuenta.
   - b) Porque en la coreografía los subagentes no pueden devolver ningún mensaje al agente principal que los ha invocado.
   - c) Porque la orquestación obliga a que todos los agentes compartan el mismo modelo y el mismo contexto durante la sesión.
   - d) Porque la coreografía necesita un servidor de eventos propio que los agentes de OpenCode no pueden utilizar en el aula.

3. **¿Qué topología de agentes casi nunca compensa?**
   - a) La red, donde cualquier agente habla con cualquiera: nadie comprueba el conjunto y los errores se propagan.
   - b) La cadena, porque cada agente depende del anterior y no puede empezar su trabajo hasta que el otro termina el suyo.
   - c) La jerárquica, porque obliga a que un orquestador conozca todas las tareas antes de repartirlas entre los agentes.
   - d) Ninguna: las tres compensan siempre que el equipo tenga más de dos agentes configurados en el proyecto.

4. **En los roles de un sistema multiagente, ¿qué hace el Craftsman?**
   - a) Aprueba los cambios que llegan a main cuando la integración continua está en verde y los propietarios han revisado.
   - b) Implementa las tasks contra la spec y no avanza al grupo siguiente hasta que los tests del grupo actual pasan.
   - c) Cuida la calidad del conjunto y de las primitivas (código, AGENTS.md, comandos) sin cambiar el comportamiento.
   - d) Escribe la spec y el plan de cada feature y deja la implementación a los demás agentes para no mezclar decisiones.

5. **¿Qué contexto tiene un subagente de OpenCode cuando empieza a trabajar?**
   - a) El contenido de AGENTS.md y de la última sesión que tuvo ese mismo subagente en el mismo proyecto, si existe alguna.
   - b) Los ficheros que el agente principal tenía abiertos, pero no las instrucciones que le dio la persona al empezar.
   - c) Toda la conversación del agente principal hasta ese momento, resumida automáticamente por OpenCode al crearlo.
   - d) Solo el encargo que le escribe el agente principal: empieza con la ventana vacía y devuelve un único mensaje.

6. **Un agente tiene este bloque de permisos. ¿Puede acabar modificando ficheros?**

   permissions:
     - { action: edit, resource: "*", effect: deny }
     - { action: subagent, resource: "*", effect: allow }

   - a) Solo si la persona lo aprueba en cada ocasión, porque subagent hereda siempre la regla de shell que tenga configurada.
   - b) No: con edit en deny ningún agente que dependa de él puede cambiar un fichero del proyecto bajo ningún concepto.
   - c) Sí: puede encargar trabajo al subagente general, que sí puede editar, y por esa vía cambiar ficheros del proyecto.
   - d) No, porque subagent solo permite buscar información en el repositorio y nunca ejecuta cambios sobre los ficheros.

7. **¿Qué problema evita un worktree de Git cuando dos agentes trabajan a la vez?**
   - a) La necesidad de comparar los planes antes de implementar, porque cada rama es independiente de todas las demás.
   - b) Los conflictos de fusión, porque Git los resuelve solo cuando las ramas están en carpetas distintas del disco.
   - c) Que se pisen mientras trabajan, porque cada uno tiene su carpeta y su rama; no evita los choques al juntar el trabajo.
   - d) Que los dos agentes decidan lo mismo en sus planes, porque cada uno ve únicamente los ficheros de su carpeta.

8. **¿Qué se mira para decidir si dos features pueden hacerse en paralelo?**
   - a) Que no toquen los mismos ficheros ni decidan lo mismo, algo que se comprueba comparando sus planes antes de implementar.
   - b) Que ninguna dependa de la constitución, porque esta solo admite que una feature a la vez la tenga como referencia.
   - c) Que tengan el mismo número de tasks, para que los dos agentes terminen más o menos a la vez y se fusionen juntas.
   - d) Que las haga el mismo agente con modelos distintos, para repartir el coste de los tokens entre varias cuentas.

9. **¿Qué debe llevar un buen handoff y qué indica que necesite explicar una decisión?**
   - a) La conversación completa con la persona, porque el subagente no tiene ninguna otra fuente de contexto para trabajar.
   - b) Objetivo, documentos, estado, límites y qué devolver; si necesita explicar una decisión, esa decisión falta en el plan.
   - c) El código que ya está escrito, para que el siguiente agente no tenga que abrir ningún fichero del proyecto por su cuenta.
   - d) Solo la lista de tasks pendientes, porque el objetivo y los límites ya aparecen escritos en la constitución del proyecto.

10. **¿Qué garantizan los revisores automáticos en un sistema con varios agentes?**
    - a) Que no haga falta que ninguna persona lea los cambios que han pasado su revisión antes de fusionarlos en la rama principal.
    - b) Que ningún cambio llegue a main con errores, siempre que el revisor se ejecute con el modelo más capaz disponible.
    - c) Suben el nivel mínimo de cada cambio, pero no garantizan la calidad del diseño ni deciden qué trabajo hacía falta.
    - d) Que las decisiones de arquitectura sean correctas, porque el revisor ve a la vez todos los planes de las features abiertas.

---

#### Bloque 2: SDD en equipo

> Criterios: OA4 c

11. **En un equipo, ¿qué significa que la spec sea un contrato entre personas?**
    - a) Que la spec se firma al terminar la feature y a partir de entonces no puede cambiarse más, ni siquiera con una nueva versión.
    - b) Producto, desarrollo y calidad acuerdan en ella qué se construye, y los malentendidos salen al revisarla.
    - c) Que cada persona guarda su propia copia de la spec y las compara todas al final de la feature antes de la demostración.
    - d) Que solo el agente puede modificarla, para que ninguna persona pueda cambiar el acuerdo por su cuenta durante el desarrollo.

12. **¿Quién aprueba cada punto de control en el reparto de roles del curso?**
    - a) Calidad aprueba la fusión de cada feature y el resto de roles se limita a comentar en las pull requests sin aprobar nada.
    - b) Arquitectura aprueba todos los puntos de control, porque es quien mejor conoce el código y las decisiones técnicas del proyecto.
    - c) Producto la spec, arquitectura el plan, desarrollo tasks y ciclos; calidad añade edge cases y revisa las tasks de tests.
    - d) Desarrollo aprueba la spec y el plan, y producto solo revisa el resultado final cuando se hace la demostración a los usuarios.

13. **En un CODEOWNERS, un fichero encaja con dos líneas. ¿Qué propietarios cuentan?**
    - a) Los de la última línea que coincide; por eso la línea general va primero y las excepciones después.
    - b) Ninguno de los dos, porque GitHub exige que cada fichero encaje con una sola línea y avisa del error al subirlo.
    - c) Los de la primera línea que coincide, y por eso las excepciones se escriben siempre antes que la línea general.
    - d) Los de las dos líneas a la vez, y deben aprobar todos ellos para que la pull request pueda llegar a fusionarse.

14. **Una línea de CODEOWNERS tiene como propietarios a producto y a calidad. ¿Qué exige GitHub para fusionar?**
    - a) Ninguna aprobación, porque CODEOWNERS solo sirve para pedir la revisión y nunca para condicionar una fusión.
    - b) La aprobación del primero de la lista, que actúa como responsable de la línea y puede delegar en el segundo.
    - c) La aprobación de los dos, porque GitHub exige que todos los propietarios de la línea aprueben antes de fusionar.
    - d) Basta con la aprobación de uno de los dos; si se quiere que revisen ambos, hay que acordarlo en el equipo.

15. **¿Qué añade una regla de protección de la rama main sobre las pull requests?**
    - a) Impide que se creen ramas nuevas a partir de main mientras exista cualquier pull request pendiente de revisar.
    - b) Sustituye a CODEOWNERS, porque por sí sola decide quién debe revisar cada fichero según su historial de cambios.
    - c) Convierte la rama main en solo lectura para todo el equipo, incluida la persona que se encarga de las fusiones.
    - d) Puede exigir que nadie suba directamente, que la CI esté en verde y que aprueben los propietarios del código de cada fichero.

16. **¿Por qué un cambio en la constitución va en su propia PR, con análisis de impacto y aviso al equipo?**
    - a) Porque entra en todas las sesiones de todos los agentes y puede dejar código o planes en curso incumpliéndola.
    - b) Porque la constitución solo puede cambiarla el agente arquitecto, que necesita un permiso expreso de la persona.
    - c) Porque Git no permite modificar el mismo fichero en dos ramas a la vez sin perder el historial de una de ellas.
    - d) Porque cada cambio de la constitución obliga a rehacer desde cero todas las specs que ya estaban aprobadas.

17. **Se repite en tres planes que el agente vuelve a decidir cómo se formatean las fechas de las respuestas. ¿Dónde se gobierna esa decisión?**
    - a) En la constitución, con su PR propia, porque se repite en varios planes y vale para todo el proyecto.
    - b) En la spec de la siguiente feature, que la recoge como un requisito más junto a los demás de esa funcionalidad.
    - c) En la configuración personal de cada persona, para no obligar al resto del equipo a seguir una convención común.
    - d) En ningún sitio: se deja que cada plan decida lo que le convenga y se corrige en la revisión de cada pull request.

18. **¿Cómo debe plantearse la adopción de SDD en un equipo?**
    - a) De golpe para todo el equipo y con todos los artefactos desde el primer día, para que no existan excepciones.
    - b) Esperando a tener unas normas internas completas sobre el uso de agentes antes de probar nada con ellos.
    - c) Instalando una herramienta de SDD, porque es la herramienta la que consigue que se escriban buenas specs.
    - d) Por etapas que se superan por hitos (piloto, extensión, práctica habitual), con apoyo visible y sin esperar a que todo sea perfecto.

19. **Al incorporar a una persona nueva, el agente no encuentra la respuesta a varias de sus preguntas en ningún documento. ¿Qué se hace?**
    - a) Se deja sin escribir, porque el conocimiento del proyecto se transmite mejor hablando que leyendo documentos.
    - b) Se amplía el prompt de la persona nueva con esa explicación para que el agente la tenga en cada una de sus sesiones.
    - c) Cada pregunta sin respuesta escrita es un hueco: se escribe la respuesta donde corresponda, con una PR pequeña.
    - d) Se explica de palabra a la persona nueva y se deja apuntado en el chat del equipo por si alguien más lo necesita.

20. **¿Qué relación tiene el Reglamento europeo de inteligencia artificial con SDD?**
    - a) Prohíbe que un agente de IA escriba código que luego se utilice dentro de un centro educativo o de una empresa.
    - b) Regula los sistemas de IA, no programar con IA; SDD no basta, pero sus artefactos sirven de evidencia.
    - c) Obliga a usar SDD en cualquier proyecto que se programe con un agente de IA, sea cual sea su tamaño o su uso.
    - d) No tiene ninguna relación con SDD, porque solo afecta a los modelos de lenguaje y no al software que se construye.

---

#### Bloque 3: Casos prácticos: proyectos nuevos y código existente

> Criterios: OA4 d

21. **¿Qué cambia respecto a la constitución al empezar un proyecto nuevo y al trabajar sobre código existente?**
    - a) En código existente se copia la de un proyecto parecido, para no tener que describir lo que ya hace el código actual.
    - b) En un proyecto nuevo se omite hasta que haya tres features terminadas, para saber qué principios hacen realmente falta.
    - c) En un proyecto nuevo se escribe antes de la primera feature; en código existente, describe primero el presente.
    - d) En los dos casos es igual: se escribe con los principios ideales del equipo y se exige que el código se ajuste a ellos.

22. **¿Qué es especificar al tocar (spec-on-touch)?**
    - a) Escribir la spec del comportamiento actual de un módulo al tocarlo, priorizando por riesgo, no la de todo el proyecto.
    - b) Escribir primero toda la documentación del proyecto y empezar a modificar el código solo cuando esté completa y aprobada.
    - c) Dejar que el agente documente cada fichero que lee mientras trabaja, sin que nadie revise lo que ha escrito.
    - d) Modificar la spec cada vez que alguien toca el código, aunque el comportamiento externo del módulo no cambie.

23. **¿De dónde sale el valor esperado de un test de caracterización?**
    - a) De ejecutar el código actual y ver qué devuelve en cada caso, no de lo que a quien lo prueba le parece razonable que devuelva.
    - b) De la spec de la feature, que se escribe antes de mirar el código para que no influya en lo que se espera.
    - c) De la documentación antigua del módulo, que se considera la fuente más fiable de lo que debería devolver.
    - d) Del modelo, que predice el resultado leyendo el módulo y lo anota en el test sin necesidad de ejecutarlo.

24. **Al caracterizar un módulo, descubres que un campo desconocido en la petición provoca un 500. ¿Quién decide si es un fallo o un comportamiento?**
    - a) Producto, que sabe si alguien depende de ello; mientras se decide, el test lo fija tal cual está ahora en el código.
    - b) El agente, que ha leído el código completo y es quien mejor conoce cuál era la intención original de quien lo escribió.
    - c) Nadie hace falta que lo decida: un 500 es siempre un fallo y se corrige durante la propia refactorización del módulo.
    - d) Arquitectura, porque se trata de una cuestión puramente técnica de gestión de errores dentro de la capa de servicios.

25. **¿Qué es una spec delta de OpenSpec?**
    - a) Un fichero de tests que se ejecuta antes de aprobar una spec nueva para comprobar que no rompe a las anteriores.
    - b) La descripción de solo lo que cambia sobre las specs vigentes, que se integra al archivar el cambio.
    - c) Una copia completa de la spec de la feature con los cambios marcados en otro color para que se vean en la revisión.
    - d) El registro que genera OpenSpec con las diferencias línea a línea entre dos commits cualesquiera del repositorio.

26. **Una delta usa esta sección para un requisito que ya existe en la spec vigente. ¿Qué error tiene?**

    ## ADDED Requirements
    ### Requirement: Orden de los avisos

    - a) Debería escribirse en español, porque los encabezados de una delta no admiten palabras en inglés en el formato estricto.
    - b) Debería usar MODIFIED, copiando el requisito entero con todos sus escenarios, porque ADDED duplicaría uno que ya existe.
    - c) Debería usar REMOVED, porque un requisito que cambia se elimina primero y se vuelve a escribir en un cambio posterior.
    - d) Ninguno: ADDED sirve para cualquier requisito y es OpenSpec quien decide al archivar si es nuevo o es una modificación.

27. **¿Qué ocurre con la spec vigente cuando se archiva un cambio de OpenSpec?**
    - a) No cambia: la spec vigente se actualiza a mano cuando se fusiona la rama del cambio en la rama principal.
    - b) La spec vigente se borra y se sustituye por la del cambio, que pasa a ser la única spec de esa capacidad.
    - c) Se crea una copia de la spec vigente con el número de versión del cambio, y la anterior se conserva intacta.
    - d) La delta se integra en ella y el cambio pasa a openspec/changes/archive/ con la fecha delante, ya como cambio terminado.

28. **¿Qué papel tienen los tests en una refactorización?**
    - a) Se desactivan mientras dura la refactorización y se reactivan al terminar, ya corregidos por la persona que revisa.
    - b) El contrato de no regresión: en verde antes, intactos durante y en verde después; el cambio va en otro ciclo.
    - c) Se reescriben a la vez que el código para que reflejen la estructura nueva de los módulos tras la reorganización.
    - d) No hacen falta si el agente explica por escrito qué ha cambiado y por qué lo considera equivalente al código anterior.

29. **¿Cómo se comprueba que una migración de stack conserva el comportamiento?**
    - a) Con tests de contrato que solo usan la API, en verde contra la versión actual y contra la nueva.
    - b) Con los tests unitarios de cada módulo, adaptados uno a uno al nuevo framework antes de empezar la migración.
    - c) Reescribiendo la spec desde cero para que el agente genere de nuevo todo el código con el nuevo stack elegido.
    - d) Con una revisión manual de la versión nueva, porque los tests siempre dependen del stack y no se pueden reutilizar.

30. **Una feature nueva se añade a un proyecto con código heredado. ¿Qué añade su spec respecto a la de un proyecto nuevo?**
    - a) Una sección que dice cómo se integra con lo que ya existe: qué reutiliza, qué toca y qué no debe romper nunca.
    - b) Una copia del código existente que la feature va a modificar, para que el agente lo vea sin tener que buscarlo.
    - c) Un listado de todos los ficheros del proyecto ordenados por antigüedad, para saber cuáles son más peligrosos.
    - d) Nada distinto: la integración la resuelve el plan y la spec no debe mencionar nunca el código que ya existe.

---

#### Bloque 4: Antipatrones del flujo

> Criterios: OA4 e

31. **¿Qué tres partes conviene nombrar siempre al describir un antipatrón del flujo?**
    - a) El responsable que lo cometió, la fecha en que apareció y el coste estimado de arreglarlo en horas de trabajo.
    - b) El síntoma que se ve, la causa que lo produce y la corrección concreta que evita que vuelva a repetirse más adelante.
    - c) La fase donde ocurre, el agente que lo causó y el modelo concreto con el que se estaba trabajando en ese momento.
    - d) El nombre con el que se conoce, su definición técnica y la herramienta comercial que se utiliza para detectarlo.

32. **Ante un síntoma raro, ¿por dónde empieza el diagnóstico en el flujo del curso?**
    - a) Preguntando si lo decía la spec aprobada; solo después se miran el plan, las tasks, la validación, el contexto y las personas.
    - b) Rehaciendo la sesión con un prompt más largo y detallado, que es lo más barato de probar en cuanto algo sale mal.
    - c) Mirando el código, porque es donde está el fallo y se puede corregir más rápido que en cualquier otro artefacto.
    - d) Cambiando el modelo del agente, porque el origen de los fallos suele estar en su capacidad para seguir instrucciones.

33. **¿Qué pregunta ayuda a saber si algo debe estar en la spec o en el plan?**
    - a) Si cabe en una sola línea, porque entonces no necesita explicación y puede ir directamente en el plan de la feature.
    - b) Si lo ha propuesto el agente o la persona de producto durante la entrevista inicial con la que empezó la especificación.
    - c) Si es lo bastante largo como para necesitar un apartado propio dentro de la spec de la feature que se está escribiendo.
    - d) Si alguien lo notaría desde fuera: lo observable va en la spec y lo que se decide para construirlo, en el plan.

34. **Un desarrollador pide «implementa todas las tasks» y recibe un único commit de casi trescientas líneas con código y tests juntos. ¿Qué ha perdido?**
    - a) Solo la posibilidad de repartir el trabajo con subagentes, porque un commit de ese tamaño no puede dividirse entre varios.
    - b) Nada importante: si los tests pasan, el resultado es el mismo que habría salido de hacer la implementación en ciclos cortos.
    - c) La revisión por ciclos, saber si los tests iban antes, un punto de retorno y la atención del agente al final.
    - d) El historial de la rama, porque Git no admite guardar commits de más de cien líneas sin perder la información de cada fichero.

35. **¿Qué ventaja tiene repartir las tasks de una feature grande en rebanadas verticales en lugar de por capas?**
    - a) Se escriben menos tests, porque cada rebanada se comprueba únicamente a mano antes de pasar a la siguiente.
    - b) Cada rebanada toca un solo fichero, lo que elimina por completo los conflictos entre agentes que trabajan a la vez.
    - c) Cada rebanada atraviesa todas las capas y se puede probar y fusionar sola, adelantando la integración.
    - d) Se evita tener plan, porque las rebanadas se van decidiendo sobre la marcha durante la propia implementación.

36. **¿Qué puede fijar el plan sobre las funciones que cruzan fronteras entre tasks o agentes?**
    - a) Solo su nombre, porque los parámetros y los errores que lanza se deciden siempre durante la implementación.
    - b) Su firma (nombre, parámetros, retorno y errores), sin cuerpo; es una decisión de diseño y no va en la spec.
    - c) Su cuerpo completo, para que el agente copie el código y no tenga que tomar ninguna decisión por su cuenta.
    - d) Nada, porque cualquier detalle de una función pertenece a la spec y el plan nunca debe describir interfaces.

37. **¿Qué riesgo tiene una fábrica a oscuras, en la que nadie lee el código de los agentes?**
    - a) Que el día que falla algo que el agente no sabe arreglar, nadie conoce el sistema y solo queda pedir otro intento.
    - b) Que el coste de los modelos sube cada semana, porque los intentos tardan más cuanto más grande es el repositorio.
    - c) Que los tests dejan de ejecutarse automáticamente, porque solo se lanzan cuando una persona abre la revisión.
    - d) Que el agente deja de poder escribir código nuevo, porque sin supervisión humana pierde acceso a los ficheros.

38. **¿Qué es la deuda cognitiva?**
    - a) El tiempo que el equipo pierde esperando a que el agente termine de generar el código de cada una de las tasks.
    - b) La comprensión del sistema que no se ha pagado: funciona, pero nadie del equipo sabría explicar por qué está hecho así.
    - c) La cantidad de documentos de SDD que están sin actualizar dentro del repositorio al terminar cada feature.
    - d) El código que funciona pero es difícil de cambiar, que se mide con la cobertura de tests y con las reglas del linter.

39. **Tres agentes en paralelo han producido nueve PR en una mañana y la revisora aprueba las últimas sin leerlas. ¿Dónde está el problema y cómo se evita?**
    - a) Es un problema de disciplina: se resuelve pidiéndole a la revisora que lea cada PR con más calma y detalle.
    - b) Es un problema de capacidad: se resuelve incorporando más revisores o poniendo un revisor automático delante.
    - c) Es un problema del modelo: se resuelve usando uno más capaz, que genere menos PR para la misma cantidad de trabajo.
    - d) Es de planificación: se frena antes de lanzar agentes, con specs aprobadas, límite de PR abiertas y PR pequeñas.

40. **¿Cuál es el criterio del curso para decidir cuánto del código de un agente se lee?**
    - a) Siempre todo, porque un agente puede cambiar cualquier fichero del repositorio sin avisar a nadie del equipo.
    - b) Solo lo que el propio agente señale como dudoso en el resumen que escribe al terminar cada una de sus tareas.
    - c) Nunca, mientras la integración continua esté en verde y la spec de la feature sea suficientemente precisa.
    - d) Según el riesgo (coste del fallo, reversibilidad y comprobaciones), con un mínimo fijo: tests tocados, ficheros ajenos y trampas.

---
