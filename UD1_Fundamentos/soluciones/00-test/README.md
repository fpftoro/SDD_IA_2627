# Clave del test: Fundamentos del desarrollo guiado por especificaciones

Respuestas de [`practicas/01-test.md`](../../practicas/01-test.md). Generado con `herramientas/generar-test.py` a partir de [`preguntas.json`](./preguntas.json).

## Bloque 1: Qué es el desarrollo guiado por especificaciones

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 1 | **d** | Sin spec, las decisiones implícitas del agente quedan en el código y nadie las ha revisado: el código pasa a ser la referencia. |
| 2 | **a** | El agente no suele preguntar: supone. Por eso las decisiones que no están escritas acaban tomándolas él. |
| 3 | **a** | Es el extremo menos estructurado del espectro: rápido y útil mientras el código no tenga que durar. |
| 4 | **c** | El *vibe coding* sirve para explorar y prototipar; lo que tiene que durar o tiene consecuencias pide SDD. |
| 5 | **d** | En *spec-first* la spec es contexto previo; después, lo que se mantiene es el código. |
| 6 | **c** | En *spec-anchored* la spec es un contrato vivo, y la separación entre spec y código (*spec drift*) se detecta antes de integrar. |
| 7 | **c** | En *spec-as-source* el código se genera de la spec; es la idea más ambiciosa y todavía experimental. |
| 8 | **a** | Tradicionalmente la spec es un andamio que se abandona; la inversión la convierte en la fuente de la que sale el código. |
| 9 | **b** | El principio es justo el contrario: invertir en reglas, specs y procedimientos antes que en cambiar de herramienta. |
| 10 | **c** | La ingeniería de contexto se ocupa de todo lo que ve el agente; la spec es su pieza central en SDD. |

## Bloque 2: Artefactos y capas de contexto

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 11 | **b** | El prompt vive en la conversación; un prompt largo sigue siendo un prompt. |
| 12 | **c** | El PRD es un documento de producto: objetivo, problema, usuarios, casos de uso, métricas y fuera de alcance. |
| 13 | **a** | La spec toma la precisión del SRS y el porqué del PRD, calibrados para un agente y una funcionalidad. |
| 14 | **d** | La longitud no convierte un prompt en una spec. |
| 15 | **d** | Los *edge cases* complementan al camino feliz: qué pasa cuando algo se sale de lo normal. |
| 16 | **a** | Lo que no está en la spec lo decide el agente, normalmente con la opción más probable, no con la más robusta. |
| 17 | **a** | `AGENTS.md` es la capa de reglas: se sigue sin interpretarla y vale para todas las tareas. |
| 18 | **d** | Una decisión de diseño que vale para todo el proyecto va en la constitución, no repetida en cada spec. |
| 19 | **c** | Cada línea de los ficheros globales está en el contexto de todas las tareas: lo de una funcionalidad va en su spec. |
| 20 | **b** | La regla se aplica siempre; la skill se carga cuando hace falta (por ejemplo, cómo publicar una versión). |

## Bloque 3: El entorno de trabajo: OpenCode

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 21 | **c** | OpenCode es el agente; se conecta a un proveedor de modelos para generar las respuestas. |
| 22 | **a** | OpenCode es el arnés (*harness*) del modelo: prepara el contexto y ejecuta las herramientas que el modelo pide. |
| 23 | **a** | OpenCode cambia con frecuencia y los comandos pueden variar entre versiones. |
| 24 | **a** | Así se conecta el proveedor una sola vez para todas las prácticas, y las claves quedan fuera del proyecto. |
| 25 | **b** | `/connect` añade el proveedor; `/models` elige el modelo; `/init` genera `AGENTS.md`; `/new` abre una sesión nueva. |
| 26 | **b** | Una clave que ha estado en el historial puede haberse copiado: hay que invalidarla. |
| 27 | **d** | `Mayús+Tab` alterna los agentes principales; `Ctrl+P` abre la lista de comandos y `Esc` interrumpe al agente. |
| 28 | **b** | *Plan* tiene la edición denegada salvo en sus planes; *build* tiene todas las herramientas. |
| 29 | **a** | `/init` deduce las reglas del código, incluidas sus malas costumbres: su resultado es un borrador. |
| 30 | **a** | OpenCode lee `AGENTS.md` automáticamente, pero no sigue sus enlaces; `instructions` añade otros ficheros. |
| 31 | **b** | En OpenCode gana la última regla que coincide: primero la general y después las excepciones. |

## Bloque 4: Features: la unidad de trabajo de una spec

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 32 | **a** | La feature es la unidad de trabajo de una spec: una spec por feature. |
| 33 | **d** | El épico es demasiado amplio para una spec y la task demasiado pequeña: sale del plan. |
| 34 | **c** | Agrupa varias capacidades distintas, cada una con su propia spec. |
| 35 | **c** | Las tareas técnicas no son features aunque lleven trabajo: aparecen en el plan. |
| 36 | **b** | La historia explica quién necesita algo y para qué; no es la spec. |
| 37 | **a** | Un agente puede cambiar treinta ficheros en minutos; si no se puede revisar, la feature es demasiado grande. |
| 38 | **b** | Las decisiones de los niveles altos (features, specs) son humanas; el agente trabaja en el plan, las tasks y el código. |
| 39 | **d** | La spec compensa cuando hay lógica no trivial, casos límite, varias personas o riesgo alto. |
| 40 | **d** | Primero lo que otras necesitan; a igualdad, lo que antes aporta valor; y conviene adelantar lo más incierto. |
| 41 | **c** | El prefijo refleja el orden decidido, para que cualquiera sepa qué va primero. |

## Bloque 5: Anatomía de una spec

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 42 | **a** | Entre personas, una ambigüedad se resuelve preguntando; un agente la resuelve suponiendo. |
| 43 | **c** | «Genera un token» es funcional; «responde en menos de 10 ms» o «firma con RS256» son no funcionales. |
| 44 | **b** | Un requisito no funcional tiene que ser medible o comprobable. |
| 45 | **b** | Los requisitos tienen que ser atómicos: una sola responsabilidad cada uno. |
| 46 | **c** | *Dado* fija la situación, *cuando* la acción y *entonces* el resultado observable. |
| 47 | **c** | Un criterio binario se cumple o no se cumple, y se puede convertir en un test. |
| 48 | **b** | Cada línea cierra una puerta concreta; si es temporal, se dice dónde se tratará. |
| 49 | **b** | Marca la duda donde afecta, para que se vea en la revisión en lugar de convertirse en una decisión silenciosa del agente. |
| 50 | **d** | La spec es un documento vivo: evoluciona con el código, en el mismo cambio. |
| 51 | **d** | Una spec vieja engaña al agente y a las personas que la consultan. |

## Bloque 6: Notaciones y granularidad

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 52 | **d** | La plantilla deja un hueco para la condición y otro para la respuesta: si no sabes rellenarlo, lo ves enseguida. |
| 53 | **a** | *Cuando* reacciona a un evento puntual. |
| 54 | **b** | *Mientras* se aplica durante todo el tiempo que dura un estado. |
| 55 | **b** | Usar *Si* para un evento normal es un error típico: eso es *Cuando*. |
| 56 | **b** | El orden fijo hace que todos los requisitos combinados se lean igual. |
| 57 | **a** | Kiro escribe historias de usuario y, para cada una, criterios de aceptación con la forma de EARS. |
| 58 | **b** | Con esa línea, Gherkin acepta *Característica*, *Escenario*, *Dado*, *Cuando*, *Entonces*… |
| 59 | **d** | Es ideal para los *edge cases* de validación: cada fila es un caso con su respuesta. |
| 60 | **d** | Un paso declarativo describe el comportamiento, no cómo está hecha la interfaz. |
| 61 | **d** | Lo técnico que se ve desde fuera (rutas, códigos, formatos) sí va en la spec; el cómo se programa va en el plan. |
