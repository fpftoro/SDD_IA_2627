# Test: Validación, pruebas y herramientas

- [Test: Validación, pruebas y herramientas](#test-validación-pruebas-y-herramientas)
  - [Bloque 1: Validación y spec drift](#bloque-1-validación-y-spec-drift)
  - [Bloque 2: Pruebas desde la spec](#bloque-2-pruebas-desde-la-spec)
  - [Bloque 3: Quality gates e integración continua](#bloque-3-quality-gates-e-integración-continua)
  - [Bloque 4: El ecosistema de herramientas](#bloque-4-el-ecosistema-de-herramientas)
  - [Bloque 5: MCP: conectar el agente con sistemas externos](#bloque-5-mcp-conectar-el-agente-con-sistemas-externos)

Una sola respuesta correcta por pregunta. La clave está en `soluciones/00-test/README.md`.

---

#### Bloque 1: Validación y spec drift

> Criterios: OA3 a, d

1. **¿Por qué no basta con que los tests estén en verde para dar por buena una feature que implementó un agente?**
   - a) Porque los agentes escriben siempre menos tests de los necesarios.
   - b) Porque un test en verde solo indica que el código compila.
   - c) Porque los tests de un agente nunca se ejecutan en la integración continua.
   - d) Porque si el mismo agente escribió el código y los tests, los tests pueden comprobar lo que hace el código y no lo que dice la spec.

2. **¿Qué es el *spec drift*?**
   - a) La separación progresiva entre lo que dice la spec y lo que hace el código.
   - b) El tiempo que pasa entre aprobar una spec y fusionar su feature.
   - c) La diferencia entre el plan técnico y las tasks.
   - d) El cambio de versión de la spec cuando se aprueba.

3. **¿Por qué el *spec drift* es más grave cuando se trabaja con un agente?**
   - a) Porque el agente toma la spec como verdad y genera código coherente con ella e incoherente con los cambios hechos fuera.
   - b) Porque el agente borra la spec cuando detecta diferencias con el código.
   - c) Porque el agente actualiza la spec sin avisar.
   - d) Porque los agentes no pueden leer specs con versiones.

4. **Un compañero sube el límite del texto a 500 caracteres en el código y ajusta el test, sin tocar la spec. ¿Qué forma de *drift* es?**
   - a) Arquitectura.
   - b) Regeneración.
   - c) Un cambio que no llega a la spec.
   - d) Interpretación del agente.

5. **¿Qué compara cada fila de una matriz de trazabilidad?**
   - a) Una task con la persona que la implementó.
   - b) Un requisito con el coste de implementarlo.
   - c) Un fichero de código con el commit que lo creó.
   - d) Un identificador de la spec con el test que lo comprueba y si ese test comprueba de verdad lo que dice.

6. **¿Qué demuestra que un test sirve, según el tema?**
   - a) Que se ejecuta en menos de un segundo.
   - b) Que tiene el identificador de la spec en el nombre.
   - c) Que falla cuando se rompe a propósito el código que dice comprobar.
   - d) Que lo escribió un agente distinto del que escribió el código.

7. **¿Por qué el subagente revisor tiene denegada la acción `subagent`?**
   - a) Porque los subagentes no pueden tener permisos propios.
   - b) Porque así trabaja más deprisa.
   - c) Porque podría encargar el trabajo al subagente `general`, que sí puede editar ficheros.
   - d) Porque `subagent` sirve para ejecutar los tests.

8. **El revisor informa de un hallazgo que la spec no menciona («el servicio debería usar una librería de validación»). ¿Qué haces?**
   - a) Lo rechazo: es una preferencia de implementación que no pide ni la spec ni la constitución.
   - b) Lo implemento sin cambiar la spec, porque mejora el código.
   - c) Lo acepto: el revisor es otro agente y no está sesgado.
   - d) Cambio la spec para incluir la librería.

9. **¿Qué comprobación automática detecta que un controlador importa un repositorio?**
   - a) Los tests de aceptación de la API.
   - b) Una búsqueda en el código o una regla de linter como `no-restricted-imports`.
   - c) La cobertura de código.
   - d) La búsqueda de identificadores sin test.

10. **¿Qué no comprueba ninguna de las validaciones automáticas del tema?**
    - a) Que las capas de la constitución se respetan.
    - b) Que los tests se ejecutan.
    - c) Que la spec describe lo que el usuario necesita y que el código será fácil de cambiar.
    - d) Que hay un test por identificador.

---

#### Bloque 2: Pruebas desde la spec

> Criterios: OA3 b

11. **¿En qué se diferencian las pruebas desde la spec del TDD clásico?**
    - a) TDD solo sirve para tests de extremo a extremo.
    - b) Las pruebas desde la spec derivan todos los tests de los criterios y edge cases de una spec aprobada y se revisan antes de implementar; TDD avanza test a test para diseñar el código.
    - c) Son lo mismo con otro nombre.
    - d) En las pruebas desde la spec los tests se escriben después del código.

12. **Un escenario de Gherkin se traduce en un test así:**
    - a) Solo el Entonces se convierte en código.
    - b) Dado → comprobar; Cuando → preparar; Entonces → actuar.
    - c) Dado → preparar los datos; Cuando → hacer la acción; Entonces → comprobar el resultado.
    - d) Cada paso del escenario es un test distinto.

13. **Para el orden de una lista se prueba con las tareas «Tarea 1», «Tarea 2» y «Tarea 3». ¿Qué problema tiene?**
    - a) El orden alfabético y el de creación coinciden, así que un código que ordenara por texto pasaría el test.
    - b) Los números en los textos hacen fallar el test.
    - c) Ninguno: son tres tareas y la spec pide al menos tres.
    - d) Los textos son demasiado cortos para el límite de 280.

14. **¿Qué nivel de prueba corresponde a «la página muestra el mensaje “Todavía no hay tareas” cuando la lista está vacía»?**
    - a) Ninguno: los mensajes de la página se comprueban a mano.
    - b) Integración con supertest, porque depende de GET /tareas.
    - c) Unitario, porque es un texto fijo.
    - d) Extremo a extremo (e2e), porque el comportamiento se ve en la página.

15. **¿Por qué se separan `npm test` y `npm run e2e`?**
    - a) Porque Playwright solo funciona en la integración continua.
    - b) Porque Vitest no puede ejecutar JavaScript.
    - c) Porque las pruebas e2e son opcionales.
    - d) Porque las pruebas e2e necesitan un navegador y un servidor y tardan más; así `npm test` sigue siendo inmediato.

16. **En Playwright, ¿por qué se recomienda localizar el botón con `getByRole('button', { name: 'Añadir' })`?**
    - a) Porque busca como lo haría una persona, sobrevive a cambios internos de la página y comprueba de paso que es accesible.
    - b) Porque es la única forma de localizar botones.
    - c) Porque es más rápido que buscar por id.
    - d) Porque no necesita que la página esté cargada.

17. **Un test termina así: `request(app).get('/tareas').then((r) => { expect(r.status).toBe(418); });`, sin `await` ni `return`. ¿Qué pasa?**
    - a) El test acaba antes de la respuesta y Vitest lo da por superado; el fallo, si aparece, sale aparte.
    - b) Vitest espera siempre las promesas y el test falla.
    - c) Supertest lanza un error de sintaxis.
    - d) El test se marca como omitido.

18. **¿Por qué el agente que implementa no debe poder editar los tests?**
    - a) Porque los tests los ejecuta la integración continua.
    - b) Porque los tests solo los puede leer el revisor.
    - c) Porque editar tests consume más contexto.
    - d) Porque tendría a la vez el objetivo (que pasen) y la vara de medir, y podría cambiar el test en lugar del código.

19. **Además de denegar `tests/**` en `edit`, ¿qué más hay que limitar al agente `implementador`?**
    - a) El acceso a `npm test`.
    - b) El permiso de leer los tests.
    - c) La terminal (`shell` en `ask` salvo órdenes concretas) y `subagent`, porque con ellas podría cambiar los tests por otra vía.
    - d) Nada más: `edit` cubre cualquier forma de escribir ficheros.

20. **Un test revisado y aprobado resulta estar mal. ¿Qué se hace?**
    - a) Se desactiva con `skip` hasta la siguiente feature.
    - b) Lo corrige una persona en un commit propio que explica el motivo; el agente que implementa no lo toca.
    - c) El agente lo corrige en el mismo commit que el código.
    - d) Se borra, porque ya no es fiable.

---

#### Bloque 3: Quality gates e integración continua

> Criterios: OA3 c, g

21. **¿Qué diferencia un *quality gate* de un punto de control?**
    - a) Son lo mismo con otro nombre.
    - b) El punto de control se automatiza y el gate no.
    - c) El gate lo comprueba un programa con criterios objetivos en cada cambio y bloquea; el punto de control lo pasa una persona con su juicio.
    - d) El gate solo existe en la fase de especificar.

22. **¿Qué mide la cobertura de código?**
    - a) Qué parte del código se ejecuta durante los tests.
    - b) Qué parte del código comprueban los tests.
    - c) Cuántos criterios de la spec tienen test.
    - d) Cuántos tests hay por fichero.

23. **Un proyecto tiene un 100 % de cobertura. ¿Qué se puede afirmar?**
    - a) Que los tests ejecutan todo el código, pero no que comprueben la spec.
    - b) Que cumple la spec.
    - c) Que todos los identificadores de la spec tienen test.
    - d) Que no tiene errores.

24. **¿Por qué un umbral de cobertura del 100 % no suele ser buena idea?**
    - a) Porque lleva a escribir tests sin valor para cubrir la última línea y bloquea código difícil de probar.
    - b) Porque Vitest no permite umbrales tan altos.
    - c) Porque el umbral lo decide cada feature.
    - d) Porque la cobertura nunca llega al 100 %.

25. **¿Qué hace el gate de trazabilidad del tema?**
    - a) Comprueba que cada commit cita una spec.
    - b) Comprueba que cada identificador de las specs en implementación o implementadas tiene un test, y avisa de los que el plan comprueba a mano.
    - c) Comprueba que cada test tiene una aserción.
    - d) Comprueba que la spec y el índice tienen el mismo estado.

26. **¿Qué comprueba el gate de «spec existente»?**
    - a) Que la spec no tiene marcadores de duda.
    - b) Que una rama que cambia el código cambia también algún documento de una feature.
    - c) Que todas las features del índice tienen spec.
    - d) Que la spec está aprobada antes de planificar.

27. **El gate de tests modificados encuentra un commit que cambia líneas de un test existente y también `src/`. ¿Qué hace?**
    - a) Nada: cambiar tests es normal en un ciclo.
    - b) Avisa, pero deja pasar el cambio.
    - c) Revierte el commit automáticamente.
    - d) Falla: no se sabe si el test se ajustó al código.

28. **En GitHub Actions, ¿por qué el job que compara la rama con `main` necesita `fetch-depth: 0`?**
    - a) Porque sin él no se puede ejecutar `npm ci`.
    - b) Porque por defecto se descarga solo el último commit, sin historial ni otras ramas.
    - c) Porque así el job tarda menos.
    - d) Porque es obligatorio en todos los workflows.

29. **¿Para qué sirve `if: ${{ !cancelled() }}` en un paso de un workflow?**
    - a) Para que el paso se ejecute aunque haya fallado el anterior, y un fallo no esconda otro.
    - b) Para que el paso solo se ejecute en `main`.
    - c) Para ejecutar el paso en paralelo con los demás.
    - d) Para cancelar el workflow si falla el paso.

30. **Las pruebas de Playwright pasan en tu Dev Container y fallan en la CI con «Executable doesn't exist». ¿Qué falta?**
    - a) Instalar los navegadores en el runner con `npx playwright install --with-deps chromium`.
    - b) Arrancar el servidor a mano antes de las pruebas.
    - c) Añadir `@playwright/test` a las dependencias de producción.
    - d) Usar `npm install` en lugar de `npm ci`.

31. **Un cambio en `AGENTS.md` funciona bien en la primera sesión en la que lo pruebas. ¿Qué se puede concluir?**
    - a) Que el cambio funciona, porque el agente siguió la instrucción.
    - b) Nada todavía: un intento puede salir bien por suerte, así que hay que repetir los casos de la batería y comparar con la configuración anterior.
    - c) Que el cambio funciona en el 100 % de los casos parecidos.
    - d) Que el cambio solo falla si se cambia de modelo.

32. **En un intento, el agente deja los tests en verde, pero para conseguirlo ha editado un test que no podía tocar. ¿Cómo se puntúa?**
    - a) Resultado bien y límites mal, por separado: es un intento afortunado que una nota global escondería.
    - b) No se puntúa: hay que repetirlo hasta que salga bien.
    - c) Como un éxito, porque los tests están en verde.
    - d) Con la media de las dos cosas, un 5 sobre 10.

33. **¿Para qué sirve el caso reservado de una batería?**
    - a) Para sustituir a los tests del proyecto.
    - b) Para enseñárselo al agente como ejemplo de lo que se espera.
    - c) Para repetirlo cuando un intento falla.
    - d) Para detectar si el cambio en el arnés (*harness*) empeora un caso que no se ha mirado mientras se ajustaba la configuración.

---

#### Bloque 4: El ecosistema de herramientas

> Criterios: OA3 e

34. **¿Por qué el tema propone estudiar el ecosistema por papeles y no con una lista de las mejores herramientas?**
    - a) Porque las listas de herramientas están prohibidas en los temas.
    - b) Porque todas las herramientas hacen lo mismo.
    - c) Porque las herramientas cambian deprisa y los papeles permiten colocar cualquier herramienta nueva.
    - d) Porque solo existe una herramienta por papel.

35. **¿Qué pieza está en el centro del mapa del ecosistema?**
    - a) El editor.
    - b) El modelo de lenguaje.
    - c) El repositorio, con las specs, el código, los tests y la memoria del agente.
    - d) El framework de SDD.

36. **¿Qué idea central distingue a OpenSpec?**
    - a) Organiza el trabajo en tracks con su plan.
    - b) Separa las specs vigentes de los cambios en curso, que se escriben como diferencias y se aplican al archivar.
    - c) Genera el código directamente desde la spec sin agente.
    - d) Es un editor con el flujo de SDD integrado.

37. **¿Qué tienen en común Spec Kit, OpenSpec, Conductor y Kiro?**
    - a) Guardan el contexto del proyecto, la spec y el plan en ficheros Markdown dentro del repositorio.
    - b) Todos generan pruebas automáticamente.
    - c) Son todos de código abierto.
    - d) Funcionan solo con un proveedor de modelos.

38. **Con un agente que trabaja solo en la nube hasta abrir una pull request, ¿qué cambia para SDD?**
    - a) Ya no hacen falta specs, porque el agente revisa su trabajo.
    - b) No hay puntos de control intermedios, así que la spec, los tests y los gates tienen que estar listos antes.
    - c) Los tests los escribe siempre el agente después.
    - d) Nada: el agente sigue los mismos puntos de control.

39. **¿Qué consecuencia tiene que el agente no sea el modelo?**
    - a) Que todos los agentes funcionan con todos los modelos.
    - b) Que el agente no necesita un modelo para funcionar.
    - c) Que el modelo decide qué permisos tiene el agente.
    - d) Un agente multiproveedor permite cambiar de modelo, comparar varios con la misma spec o usar uno local por privacidad.

40. **¿Por qué el curso no usa pasarelas de modelos?**
    - a) Porque no existen pasarelas de modelos.
    - b) Porque OpenCode no puede usar más de un proveedor.
    - c) Porque las pasarelas no admiten modelos locales.
    - d) Porque añaden un intermediario más por el que pasa el código, y el curso conecta cada agente directamente a su proveedor.

41. **Para elegir herramientas, ¿por dónde se empieza según el tema?**
    - a) Por el precio más bajo.
    - b) Por la herramienta que use más gente.
    - c) Por las restricciones que no se negocian: privacidad, herramientas impuestas, licencias.
    - d) Por la herramienta con más funciones.

42. **¿Para qué sirve una matriz de decisión con pesos?**
    - a) Para hacer explícito por qué se elige una opción y poder discutir qué importa más en ese proyecto.
    - b) Para que la decisión la tome un programa.
    - c) Para evitar tener que hacer una prueba piloto.
    - d) Para calcular el coste exacto de cada herramienta.

43. **Al pasar de OpenCode a otro agente, ¿qué es lo más delicado de traducir?**
    - a) El `AGENTS.md`, porque ningún otro agente lo lee.
    - b) Los tests, porque dependen del agente.
    - c) Los permisos de los agentes, porque una regla mal traducida no da error: simplemente deja de proteger.
    - d) Las specs, porque cada agente usa otro formato.

---

#### Bloque 5: MCP: conectar el agente con sistemas externos

> Criterios: OA3 f

44. **¿Qué es MCP?**
    - a) Un modelo de lenguaje especializado en código.
    - b) Un estándar abierto que define cómo se conecta un agente a sistemas externos mediante servidores.
    - c) Un framework de SDD.
    - d) Un formato para escribir specs.

45. **En MCP, ¿quién decide qué herramienta usar y con qué argumentos?**
    - a) La persona, en cada llamada.
    - b) El modelo, a partir de los nombres, descripciones y esquemas que declara el servidor.
    - c) El sistema externo.
    - d) El servidor, al leer el mensaje de la persona.

46. **¿Qué diferencia hay entre una *tool* y un *resource* de MCP?**
    - a) Las *tools* solo existen en servidores remotos.
    - b) Son lo mismo.
    - c) Una *tool* es una acción con parámetros que decide el modelo; un *resource* es un dato identificado por una URI que se lee.
    - d) Un *resource* puede modificar datos y una *tool* no.

47. **¿Para qué sirve el esquema de los parámetros de una herramienta MCP?**
    - a) Para cifrar los argumentos.
    - b) Para decidir qué agente puede usar la herramienta.
    - c) Se envía al cliente para que el modelo sepa qué enviar y se usa para validar cada llamada.
    - d) Solo para documentar la herramienta.

48. **¿Qué riesgo principal tiene un servidor MCP local?**
    - a) Que no admite autenticación.
    - b) Es código que se ejecuta en tu equipo con tus permisos.
    - c) Que los datos salen siempre a internet.
    - d) Que no puede declarar herramientas.

49. **En OpenCode, ¿cómo se permite usar las herramientas de un servidor `specs` solo al agente revisor?**
    - a) Escribiendo en el prompt del revisor que solo él puede usarlas.
    - b) Con una regla `specs_*` en `deny` en los permisos del proyecto y otra en `allow` en los del revisor.
    - c) No se puede: los servidores son para todos los agentes.
    - d) Con `disabled: true` en el servidor.

50. **¿Cómo se pasa una clave a un servidor MCP remoto sin guardarla en el repositorio?**
    - a) En un comentario del `AGENTS.md`.
    - b) No hace falta: los servidores remotos no se autentican.
    - c) Escribiéndola en `opencode.json` y añadiendo el fichero a `.gitignore` después.
    - d) Con una variable de entorno referenciada en la configuración, como `{env:GITHUB_TOKEN}`.

51. **Una incidencia de GitHub contiene, en un comentario HTML, una instrucción para que el asistente cierre la incidencia. ¿Cuál es la defensa fiable?**
    - a) Leer las incidencias solo en la web de GitHub.
    - b) Usar un modelo más potente.
    - c) Pedir al modelo en el prompt que ignore las instrucciones maliciosas.
    - d) Que el agente no tenga herramientas para cerrarla: servidor en solo lectura y permisos mínimos.

52. **¿Qué combinación es especialmente peligrosa en un agente con MCP?**
    - a) Que tenga más de tres servidores configurados.
    - b) Que use un modelo local y un servidor remoto.
    - c) Que use herramientas y recursos del mismo servidor.
    - d) Que lea contenido no fiable, tenga acceso a datos privados y pueda enviar información fuera.

53. **¿Por qué activar solo los servidores MCP necesarios también mejora el trabajo del agente?**
    - a) Porque las descripciones de todas las herramientas activas entran en el contexto de cada petición.
    - b) Porque los servidores consumen la batería del equipo.
    - c) Porque los servidores ralentizan los tests.
    - d) Porque OpenCode solo admite un servidor activo.

---
