# Cuestionario: Validación, pruebas y herramientas

- [Cuestionario: Validación, pruebas y herramientas](#cuestionario-validación-pruebas-y-herramientas)
  - [Validación y spec drift](#validación-y-spec-drift)
  - [Diagnosticar un fallo](#diagnosticar-un-fallo)
  - [Pruebas desde la spec](#pruebas-desde-la-spec)
  - [Quality gates e integración continua](#quality-gates-e-integración-continua)
  - [Evaluar al agente](#evaluar-al-agente)
  - [El ecosistema de herramientas](#el-ecosistema-de-herramientas)
  - [MCP y mínimo privilegio](#mcp-y-mínimo-privilegio)

Responde con tus palabras, justificando cada respuesta. Cuando se pida investigar, cita las fuentes consultadas e indica la fecha de consulta: las herramientas de este campo cambian deprisa.

---

## Validación y spec drift

> Criterios: OA3 a

1. **Generar y verificar:** Explica con un ejemplo propio por qué, con un agente, generar código es la parte fácil y verificarlo la difícil. Usa al menos dos de los cuatro motivos del tema 1 (no determinista, código que parece correcto, el agente se revisa a sí mismo, volumen).

2. **Un drift de tu experiencia:** Describe una situación (de clase, de un trabajo o inventada pero realista) en la que la documentación de un sistema dejó de decir la verdad. ¿Qué forma de *drift* fue? ¿Qué habría pasado si un agente hubiera leído esa documentación para construir lo siguiente?

3. **El revisor no es infalible:** El revisor del tema 1 devolvió dos hallazgos falsos. Explica por qué un agente al que se le pide buscar problemas tiende a encontrarlos aunque no los haya, y qué tres cosas haces con cada hallazgo antes de aceptarlo.

4. **Romper a propósito:** En el tema 2, Stryker encuentra en la lista de tareas un mutante que sobrevive porque falta un test. Investiga en su documentación qué otros tipos de mutantes genera y elige dos que crees que encontrarían huecos en los tests del proyecto. ¿Por qué no basta con la cobertura para saber si los tests protegen el código? Cita la fuente y la fecha de consulta.

---

## Diagnosticar un fallo

> Criterios: OA3 d

5. **El código es el síntoma:** Explica la frase con un caso que no esté en el tema. ¿Qué habría pasado si se hubiera corregido solo el código?

6. **Ambigua o hueco:** ¿En qué se diferencia una spec ambigua de un hueco en la spec? Pon un ejemplo de cada uno en una feature del préstamo de portátiles y di qué pregunta del diagrama del tema 1 los separa.

7. **Legalizar el fallo:** Un compañero propone cambiar la spec para que diga lo que hace el código «porque ya funciona y los usuarios se han acostumbrado». ¿Puede ser una decisión correcta alguna vez? ¿Qué tendría que pasar para que lo fuera?

---

## Pruebas desde la spec

> Criterios: OA3 b

8. **El examen escrito antes:** Explica con la analogía del examen (o con otra tuya) por qué un test escrito antes que el código, desde la spec, demuestra más que uno escrito después.

9. **El nivel adecuado:** Para la feature «Marcar una tarea como hecha» (spec de la UD1), elige el nivel de cada criterio de aceptación y de tres *edge cases* (unitario, integración o e2e) y justifícalo con la pregunta «¿dónde se ve lo que decide la spec?».

10. **Datos que distinguen:** Elige un requisito de una spec que conozcas y escribe dos juegos de datos de prueba: uno que deje pasar una implementación incorrecta razonable y otro que no. Explica qué implementación incorrecta tenías en mente.

11. **Kent Beck y los agentes:** Lee el texto de Kent Beck enlazado en la portada de la unidad. ¿Qué problemas cuenta que tuvo con el agente y los tests? ¿Qué medidas de este tema los habrían evitado?

12. **Pruebas basadas en propiedades:** Investiga qué son las pruebas basadas en propiedades (*property-based testing*) y busca una librería para JavaScript. Escribe en lenguaje natural dos propiedades de la feature «Añadir una tarea». Cita la fuente y la fecha de consulta.

---

## Quality gates e integración continua

> Criterios: OA3 c

13. **Suelo, no objetivo:** Explica qué significa que un umbral de cobertura es «un buen suelo y un mal objetivo». Pon un ejemplo de cómo un agente podría cumplir el objetivo sin mejorar nada.

14. **Avisos y errores:** El gate de tests modificados falla en unos casos y solo avisa en otros. ¿Por qué no hacer que falle siempre? ¿Y por qué no que avise siempre? ¿Qué pasa con un gate cuyos avisos nadie lee?

15. **Proteger la rama principal:** Investiga en la documentación de GitHub cómo exigir que la integración continua esté en verde antes de fusionar una pull request (reglas de protección de rama o *rulesets*). ¿Qué necesitas en tu repositorio para usarlo? Cita la fuente y la fecha de consulta.

16. **Un principio, una regla:** Elige un principio de una constitución (de la lista de tareas o del préstamo de portátiles) que todavía no se compruebe automáticamente y diseña un gate para él: qué comprueba, con qué herramienta y en qué *job*. ¿Qué no podría comprobar?

17. **Guías y controles:** Clasifica las piezas del arnés (*harness*) de la lista de tareas en guías y controles (apartado 3.7 del tema 3). Después elige dos errores que un agente comete a menudo (por ejemplo, saltarse una capa o cambiar un test para que pase) y explica qué pieza los evita y por qué, para esos errores, un control es más fiable que una guía. ¿Qué errores no evita ninguna pieza del arnés (*harness*)?

---

## Evaluar al agente

> Criterios: OA3 g

18. **Una sesión no basta:** Un compañero añade una línea a `AGENTS.md`, prueba una sesión, ve que el agente hace lo que quería y da el cambio por bueno. Explícale qué puede haber pasado y cómo lo comprobarías con una batería pequeña. ¿Por qué no darías el resultado como un porcentaje?

19. **Tu propia batería:** Diseña una batería de cuatro casos para un proyecto tuyo (o para la lista de tareas). Para cada caso, escribe el encargo, el estado del que parte y qué cuenta como éxito en resultado, límites y escalar. ¿Cuál reservarías y por qué? ¿Dónde guardarías la batería para que el agente no la vea?

---

## El ecosistema de herramientas

> Criterios: OA3 e

20. **Una herramienta, en el mapa:** Elige una herramienta de SDD o un agente que no se haya visto en el tema 4. Colócala en el mapa de papeles y respóndele las preguntas del apartado 4.1.2 con su documentación oficial. Indica la fecha de consulta.

21. **Comparar de primera mano:** Lee el artículo de Birgitta Böckeler sobre Kiro, Spec Kit y Tessl (enlazado en la portada). Resume qué problemas encontró al usarlas y relaciónalos con lo que has aprendido en esta unidad.

22. **Tu combinación:** Si mañana empezaras un proyecto personal con SDD, ¿qué combinación de herramientas usarías? Justifícalo con al menos tres criterios del tema 4 y di qué guardarías en formatos abiertos.

---

## MCP y mínimo privilegio

> Criterios: OA3 f

23. **Las capas del mínimo privilegio:** Elige un servidor MCP real (por ejemplo, el de GitHub, uno de base de datos o el de un navegador) y explica cómo aplicarías el mínimo privilegio en cada una de las seis capas del tema 5. Cita la documentación del servidor y la fecha de consulta.

24. **Instrucciones escondidas:** Explica con tus palabras por qué un modelo puede seguir instrucciones que encuentra en un texto que ha leído, y por qué la defensa fiable no es pedirle que no lo haga. Inventa un ejemplo con otro sistema (un correo, una página web, un documento).

25. **Capacidades del cliente:** Investiga en la especificación oficial de MCP qué capacidades ofrece el **cliente** al servidor (por ejemplo, *sampling*, *roots* o *elicitation*). ¿Qué riesgos o ventajas tienen para la seguridad? Cita la fuente y la fecha de consulta.
