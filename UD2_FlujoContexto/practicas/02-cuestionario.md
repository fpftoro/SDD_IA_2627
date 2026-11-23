# Cuestionario: El flujo SDD y el contexto del agente

- [Cuestionario: El flujo SDD y el contexto del agente](#cuestionario-el-flujo-sdd-y-el-contexto-del-agente)
  - [El flujo SDD](#el-flujo-sdd)
  - [Especificar y planificar](#especificar-y-planificar)
  - [Tasks e implementación](#tasks-e-implementación)
  - [Artefactos y estado](#artefactos-y-estado)
  - [La ventana de contexto](#la-ventana-de-contexto)
  - [La memoria del agente](#la-memoria-del-agente)

Responde con tus palabras, justificando cada respuesta. Cuando se pida investigar, cita las fuentes consultadas e indica la fecha de consulta: las herramientas de este campo cambian deprisa.

---

## El flujo SDD

> Criterios: OA2 a

1. **Revisar en lugar de escribir:** Explica con un ejemplo propio por qué es más fácil revisar el trabajo de un agente fase a fase que pedirle una feature entera de una vez. ¿Qué parte del trabajo pasa a ser tuya y cuál sigue siendo del agente?

2. **¿Otra vez la cascada?:** Lee el artículo de Colin Eberhardt sobre Spec Kit enlazado en la portada de la unidad. Resume sus dos críticas principales y responde a cada una con lo que has visto en el tema 1. ¿En qué le das la razón?

3. **Ajustar el flujo al cambio:** Di qué flujo usarías en cada caso y por qué: corregir una falta de ortografía en la página; añadir a la feature A un límite distinto para el texto, que ya tiene spec; y una feature nueva para compartir la lista con otra persona.

4. **El mismo flujo con otro nombre:** Elige Kiro o Conductor y busca en su documentación oficial cómo se llaman sus documentos y en qué momentos pide una revisión humana. Compáralo con el flujo del curso en una tabla con una fila por fase. Cita la fuente y la fecha de consulta.

---

## Especificar y planificar

> Criterios: OA2 b

5. **¿Lo notaría alguien desde fuera?:** Explica la pregunta con dos decisiones de la feature B de la lista de tareas («Ver la lista de tareas»): una que va a la spec y otra que va al plan. ¿Qué pasaría si la primera se decidiera en el plan?

6. **La entrevista:** Escribe el prompt de una entrevista para especificar la feature C («Marcar una tarea como hecha») o una feature de un proyecto tuyo. Anota las tres preguntas que esperas que te haga el agente. Si puedes, pruébalo con OpenCode y compara: ¿qué preguntó que no habías previsto?

7. **El código ancla:** El tema 2 da tres motivos para que el agente no escriba código al planificar. Elige uno y explícalo con una situación concreta en la que, con el código ya escrito, acabarías aceptando una decisión peor.

8. **Revisar un plan ajeno:** Un compañero te pasa un plan generado por un agente para que lo revises. ¿Con qué parte de la lista del punto de control 2 empezarías y por qué? ¿Qué error típico te parece más difícil de ver y cómo lo buscarías?

---

## Tasks e implementación

> Criterios: OA2 c

9. **El tamaño de una task:** «Uno o dos ficheros» es una regla orientativa. Pon un ejemplo en el que aceptarías una task con más ficheros y otro en el que dividirías una task de un solo fichero. Justifica los dos.

10. **La trampa del verde:** Explica con un ejemplo cómo un agente puede dejar todos los tests en verde sin que el código cumpla la spec. ¿Qué pasos del ciclo de implementación lo detectan?

11. **Todas las tasks de golpe:** Algunas herramientas pueden ejecutar todas las tasks de una feature seguidas, sin parar entre grupos. ¿Qué ganas y qué pierdes? ¿En qué tipo de feature te arriesgarías a hacerlo?

12. **Más allá del push:** Investiga en la documentación de GitHub Actions qué otros eventos, además de `push`, pueden lanzar un workflow (por ejemplo, `pull_request`). Si el proyecto decidiera cambiar el workflow del curso, ¿cuál añadirías con una rama por feature y por qué? Cita la fuente y la fecha de consulta.

---

## Artefactos y estado

> Criterios: OA2 d

13. **Un índice que miente:** Explica por qué un índice de features desactualizado es peor que no tener índice cuando trabaja un agente. Pon un ejemplo de lo que el agente podría hacer mal.

14. **Dos formas de leer el historial:** ¿Qué cuenta `git log --oneline -- docs/specs/<feature>/` y qué cuenta `git log --oneline --first-parent` en `main`? Escribe una pregunta de un compañero que responda cada una.

15. **Incidencias e índice:** Tu equipo ya usa las incidencias de GitHub (u otro gestor de proyectos). Propón cómo combinarlas con las specs sin tener el estado escrito en dos sitios. ¿Qué pierde el agente si el estado solo está en el gestor?

16. **Cambios sobre lo que ya existe:** Investiga en la documentación de OpenSpec qué contiene la carpeta de un cambio y qué pasa al archivarlo. ¿En qué se diferencia de cambiar directamente la spec de una feature ya implementada? Cita la fuente y la fecha de consulta.

---

## La ventana de contexto

> Criterios: OA2 e

17. **Ingeniería de contexto:** Lee el artículo de Anthropic sobre ingeniería de contexto enlazado en la portada de la unidad. Elige dos estrategias que describa y relaciona cada una con algo concreto del flujo del curso: un documento, un comando o una forma de trabajar.

18. **Una sesión que se degrada:** Describe una sesión con un agente (real o inventada, pero realista) en la que el contexto se degradó. ¿Qué síntomas aparecieron, cuál era la causa y qué estrategia del tema 5 habrías usado?

19. **El andamio y el edificio:** «La conversación era el andamio; los documentos son el edificio». Explica la frase y pon un ejemplo de lo que se perdería si una decisión importante se quedara solo en la conversación.

20. **Lo que cuesta el contexto:** Busca en la documentación de un proveedor de modelos cómo cobra los tokens de entrada y los de salida, y si abarata de algún modo reenviar el mismo principio del contexto en cada petición (algunos lo llaman caché de prompts). No anotes precios, que cambian: explica el mecanismo y qué relación tiene con que las reglas vayan siempre al principio. Cita la fuente y la fecha de consulta.

---

## La memoria del agente

> Criterios: OA2 f

21. **Cada cosa en su sitio:** Para un proyecto tuyo (o la lista de tareas), propón un ejemplo de regla para `AGENTS.md`, de regla para el `AGENTS.md` de una carpeta, de skill y de comando. Justifica por qué cada una va en esa primitiva y no en otra.

22. **¿Encerrado del todo?:** Un compañero dice que, con una regla `edit` en `deny` para `*` y unas pocas excepciones, el documentador está «encerrado». Explica qué otras vías tendría para cambiar ficheros si no se cierran y qué permisos lo impiden. ¿Por qué no basta con escribir en sus instrucciones «no toques el código»?

23. **Formatos abiertos:** Consulta las webs de AGENTS.md y de Agent Skills enlazadas en la portada de la unidad. ¿Qué agentes dicen que los admiten? ¿Qué ventaja tiene para tu proyecto que la memoria del agente siga formatos abiertos? Indica la fecha de consulta.
