# Clave del test: El flujo SDD y el contexto del agente

Respuestas de [`practicas/01-test.md`](../../practicas/01-test.md). Generado con `herramientas/generar-test.py` a partir de [`preguntas.json`](./preguntas.json).

## Bloque 1: El flujo SDD

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 1 | **d** | Revisar una spec, un plan de dos páginas y una lista de tasks es más fácil que revisar mil líneas con todas las decisiones dentro. |
| 2 | **a** | Especificar da la spec (qué), planificar el plan (cómo), descomponer las tasks (en qué pasos) e implementar el código y los commits. |
| 3 | **a** | En todas las fases, la columna de la persona dice «aprobar» o «revisar»: el agente redacta, propone e implementa. |
| 4 | **c** | *Plan* no puede editar los ficheros del proyecto; *build* sí, por eso el prompt de guardar dice qué fichero crear y que no toque nada más. |
| 5 | **d** | La spec se aprueba en `main` porque es una decisión de producto que todo el equipo debe ver en el índice. |
| 6 | **c** | Ese commit de fusión es el que permite leer después `main` feature a feature con `--first-parent`. |
| 7 | **c** | Un problema se corrige donde nació: un comportamiento sin decidir es un hueco de la spec, aunque se descubra en el plan. |
| 8 | **a** | Seguir la cadena hacia la izquierda responde a «¿por qué está este código aquí?»; si no hay cadena, el agente lo añadió por su cuenta. |
| 9 | **b** | Se revisan el índice, la constitución, `AGENTS.md` y los prompts repetidos. No es una fase ni produce un documento nuevo; si cambia algo, va en su propio commit. |
| 10 | **c** | Cambian los nombres y el grado de automatización, no el flujo: el método no depende de la herramienta. |

## Bloque 2: Especificar y planificar

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 11 | **b** | El agente encuentra las preguntas; tú las respondes, y cada respuesta es una decisión de producto. |
| 12 | **c** | Es la pregunta de la UD1: «¿lo notaría alguien desde fuera?». Si sí, es comportamiento y va en la spec. |
| 13 | **a** | Las otras tres cambian lo que ve quien usa la aplicación; la capa donde se valida solo cambia cómo es el código. |
| 14 | **d** | Con el servicio ya escrito, cambiar una decisión significa tirar trabajo, y la tentación es aceptarla como está. |
| 15 | **d** | «Sin código» no es «sin nombres»: los ficheros, las funciones y los paquetes son decisiones que hay que revisar. |
| 16 | **a** | Si dentro de un mes alguien propone el paquete `uuid`, la respuesta ya está escrita en el plan. |
| 17 | **a** | El unitario prueba la pieza, pero no que la API la use: la pregunta es dónde se ve lo que dice la spec. |
| 18 | **d** | Si aparece otro fichero, el agente se ha adelantado (se deshace con `/undo`); y el plan se lee entero, porque al pasarlo a limpio puede haber resumido algo. |
| 19 | **c** | Si algo que ya existe cubre lo mismo, se rechaza. Si va a usarse en todo el proyecto, además se lleva a la constitución. |
| 20 | **b** | Lo decide quien aprueba la spec, y el plan se retoma citando la versión nueva. Cada hueco es una decisión que el agente habría tomado en silencio en el código. |

## Bloque 3: Descomponer en tasks e implementar

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 21 | **c** | Un criterio de terminado se tiene que poder comprobar sin opinar: qué tests pasan, qué comando funciona. |
| 22 | **a** | Todo lo que no está en «Ficheros» queda fuera de la task; se compara con `git status`. |
| 23 | **a** | En el ejemplo, T-07 (el HTML) lleva `[P]` porque no depende de la API. |
| 24 | **a** | Leídas de una en una, todas parecen correctas; el error solo se ve al recorrerlas en orden. |
| 25 | **b** | El motivo correcto del rojo es que el código aún no existe, no un error en el propio test. |
| 26 | **b** | Es la trampa más peligrosa de la fase. Si el agente cree que un test está mal, lo dice; la persona decide si el error está en el test o en la spec. |
| 27 | **d** | La lista: ficheros, tests, cobertura, plan, constitución y alcance. «El agente dice que los tests pasan» no es «los tests pasan»: puede haber ejecutado otro comando o leído mal la salida. |
| 28 | **b** | Detecta lo que tu equipo esconde (un fichero sin subir, una dependencia instalada a mano) y deja el resultado junto al commit. |
| 29 | **a** | Se comprueba con `git status`; el workflow no se toca, porque es la vara de medir. |
| 30 | **a** | Quien llama a la API ve ese nombre: es comportamiento, y si se decide solo en el código, la decisión es invisible. |

## Bloque 4: Artefactos y estado de las features

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 31 | **b** | Además, el historial muestra cómo evolucionó la intención. Una spec que vive fuera del repositorio no existe para el agente. |
| 32 | **a** | En cuanto se crea `spec.md`, la feature pasa de `⏳ Pendiente` a `📝 Borrador`. |
| 33 | **d** | Mientras se implementa, el código está en la rama; en `main` no puede haber código de una feature `Aprobada`. |
| 34 | **c** | Cada cambio de estado es una decisión que firma una persona; el agente puede marcar tasks, pero no aprobar. |
| 35 | **c** | Si se actualiza «luego», se olvida; y un índice que miente es peor que no tenerlo, porque el agente lo cree. |
| 36 | **b** | El estado se escribe en la spec (la fuente) y se copia en el índice para verlo todo de un vistazo. |
| 37 | **a** | La rama dice `🔧 En implementación`. Para saber qué se está haciendo, se miran las ramas abiertas (`git branch`); al fusionar, `main` pasa a `✅ Implementada`. |
| 38 | **b** | Funciona porque cada feature se fusiona con `--no-ff`; sin `--first-parent` se ve además cada fase y cada ciclo. |
| 39 | **d** | `git mv` conserva la relación con el nombre anterior; y el agente seguirá cualquier ruta vieja que quede en un documento. |
| 40 | **d** | Por eso encaja cuando se cambian a menudo features que ya existen: se describe el cambio, no se reescribe la spec. |

## Bloque 5: La ventana de contexto

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 41 | **c** | Lo que no está en la ventana no existe para el modelo, y cada sesión empieza con la ventana vacía. |
| 42 | **a** | El conjunto más pequeño que haga más probable el resultado que quieres. Los tokens que no son relevantes restan, porque reparten la atención del modelo entre más cosas. |
| 43 | **c** | Lo del principio y lo del final se aprovecha mejor. Por eso las reglas van al principio (las carga la herramienta) y la tarea y sus restricciones críticas, al final. |
| 44 | **b** | En SDD, lo decidido está en los documentos; lo que solo está en la conversación no cuenta. |
| 45 | **b** | Es el desvanecimiento de las instrucciones (*instruction fade-out*). `AGENTS.md` y la constitución se cargan siempre en una posición fija; lo que garantiza, en cambio, son los permisos. |
| 46 | **c** | Con el plan y la spec basta para dividir el trabajo; lo que importaba de la sesión del plan ya está en el plan. |
| 47 | **c** | La episódica responde a «¿cómo se resolvió algo parecido antes?» y se carga solo cuando sirve para la tarea. |
| 48 | **b** | Así el intento fallido no sigue en la ventana; si corriges encima, el agente trabaja con la versión mala y la corrección a la vez. |
| 49 | **b** | Si empieza una fase nueva, es mejor una sesión nueva. Se compacta cuando todavía no has podido escribir en ficheros lo que importa, y mejor a mano en un buen momento. |
| 50 | **d** | Los ficheros que lee para encontrar la respuesta se quedan en su sesión y no llenan la tuya. |

## Bloque 6: Memoria persistente del agente

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 51 | **d** | Es una instrucción contextual (vale también para sus subcarpetas): si el agente no toca la carpeta, no se carga. |
| 52 | **d** | Si una regla debe entrar solo cuando hace falta, va en el `AGENTS.md` de su carpeta, no en `instructions`. |
| 53 | **a** | Una regla que no es verdad es peor que no tenerla. Las instrucciones persistentes tienen que ser cortas, concretas y verdaderas; se revisan al cerrar cada feature. |
| 54 | **b** | La información ya estaba escrita y no la vio: se arregla con una sesión nueva y el contexto justo. Una regla más no lo habría evitado y engorda el fichero. |
| 55 | **b** | Por eso la descripción decide si la skill se usa: tiene que decir qué hace y cuándo usarla. |
| 56 | **b** | OpenCode puede cargarla aunque no lo cumpla, pero otros agentes no: siguiendo el formato, sirve en cualquiera. |
| 57 | **a** | Se combinan: `/implementar` pide un grupo de tasks y, al llegar a la de tests, el agente carga la skill de tests. |
| 58 | **b** | `$1` es la primera palabra tras el comando y `$2` la segunda; `agent: build` decide qué agente lo ejecuta. |
| 59 | **d** | Coinciden `*`, `docs/**` y `docs/specs/**`. Por eso el orden importa: la regla general primero y las excepciones después. |
| 60 | **d** | Por ejemplo, al subagente `general`, y su regla de `edit` no serviría de nada. El mínimo privilegio incluye cerrar las acciones que permiten actuar a través de otro agente. |
