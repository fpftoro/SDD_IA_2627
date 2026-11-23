# Clave del test: SDD a escala: varios agentes, equipos y proyectos reales

Respuestas de [`practicas/01-test.md`](../../practicas/01-test.md). Generado con `herramientas/generar-test.py` a partir de [`preguntas.json`](./preguntas.json).

## Bloque 1: Varios agentes: orquestación, roles y trabajo en paralelo

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 1 | **d** | Repartir añade coste de coordinación; solo se justifica si cada agente aporta algo que uno solo no da (tema 1, apartado 1.1). |
| 2 | **a** | Con agentes que pueden equivocarse, alguien tiene que comprobar cada paso; en el curso, ese coordinador eres tú. |
| 3 | **a** | La cadena (el flujo SDD) y la jerárquica tienen quien coordine; en la red nadie lo hace. |
| 4 | **c** | Architect especifica y planifica, Builder implementa y Craftsman mira el conjunto; aprobar es siempre de una persona. |
| 5 | **d** | Por eso el encargo (el handoff) debe llevar objetivo, documentos, límites y qué devolver. |
| 6 | **c** | Los permisos de un agente valen tanto como los del agente más poderoso al que puede llamar: hay que cerrar subagent. |
| 7 | **c** | El choque aparece al fusionar, y también cuando dos planes deciden lo mismo por separado. |
| 8 | **a** | En el ejemplo de C y D, el riesgo principal no fue un conflicto de Git, sino dos agentes decidiendo lo mismo por separado. |
| 9 | **b** | En SDD el handoff casi no tiene contenido propio: apunta a la spec, al plan y a las tasks. |
| 10 | **c** | Siguen necesitándose las personas en los puntos críticos y el mínimo privilegio en cada agente. |

## Bloque 2: SDD en equipo

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 11 | **b** | El punto de control 1 es donde se aclaran las dudas, antes de que haya plan ni código. |
| 12 | **c** | Nadie aprueba en todos los puntos de control y nadie está ausente de todos. |
| 13 | **a** | Es la misma regla que los permisos de OpenCode: gana la última que coincide. |
| 14 | **d** | Para reforzarlo se usa una casilla en la plantilla de la PR de la spec, que marca calidad. |
| 15 | **d** | La protección hace obligatoria la revisión, pero no la hace: aprobar es un acto y revisar es un trabajo. |
| 16 | **a** | Mezclado con una feature, el historial no mostraría cuándo cambió cada principio. |
| 17 | **a** | Una decisión de una sola feature va en su plan; una preferencia personal, en ~/.config/opencode/. |
| 18 | **d** | La adopción de golpe suele fracasar: la fricción inicial hace que el equipo abandone antes de ver los beneficios. |
| 19 | **c** | Los documentos de SDD sustituyen al conocimiento tribal; si algo solo está en una cabeza, hay que escribirlo. |
| 20 | **b** | Se consulta siempre la versión oficial vigente; el historial de Git sirve como registro de decisiones. |

## Bloque 3: Casos prácticos: proyectos nuevos y código existente

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 21 | **c** | Las incoherencias se marcan como [NECESITA DECISIÓN] y el equipo decide qué es norma y qué es deuda. |
| 22 | **a** | Así la spec nace donde hace falta y el esfuerzo no se pierde en código que nadie va a cambiar. |
| 23 | **a** | El test fija lo que hace hoy el módulo, incluidos sus fallos, para poder refactorizar sin miedo. |
| 24 | **a** | Las rarezas conservadas se dicen expresamente en la spec; las que son fallos, se anotan como fallos conocidos. |
| 25 | **b** | Las specs vigentes están en openspec/specs/ y los cambios en curso, en openspec/changes/. |
| 26 | **b** | MODIFIED sustituye todo el bloque; por eso la validación estricta exige conservar los escenarios que la spec vigente aún tiene. |
| 27 | **d** | Así la spec vigente vuelve a decir la verdad después de cada cambio. |
| 28 | **b** | Mezclar refactorización y cambio impide saber, si algo falla, a cuál de los dos se debe. |
| 29 | **a** | Los tests unitarios dependen del stack; el contrato público de la API no. |
| 30 | **a** | Encajar en lo que ya hay es el reto específico del código existente. |

## Bloque 4: Antipatrones del flujo

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 31 | **b** | Aprenderse los antipatrones sirve para diagnosticar, no para colgar etiquetas. |
| 32 | **a** | El agente es el último sospechoso: si tiene información, spec clara y un test que lo comprueba, rara vez falla. |
| 33 | **d** | Un requisito que nombra una tabla o una función obliga al plan sin que nadie lo decida. |
| 34 | **c** | La unidad de trabajo es el ciclo: un grupo de tasks, con su revisión y su commit. |
| 35 | **c** | Las capas valen para una feature pequeña; con una grande, retrasan la integración y no se pueden recortar. |
| 36 | **b** | Fijar las firmas de todas las funciones privadas convierte el plan en un fichero de código rígido. |
| 37 | **a** | Los fallos que quedan con un agente excelente son justo los difíciles. |
| 38 | **b** | No aparece en ningún gate; se paga con hábitos como explicar el plan con tus palabras y rotar quién revisa. |
| 39 | **d** | Los revisores automáticos suben el nivel mínimo, pero no deciden que nueve PR eran demasiadas. |
| 40 | **d** | Al aprender se lee todo; con la práctica, se lee según el riesgo y lo mecánico se convierte en gates. |
