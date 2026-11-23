# Clave del test: Validación, pruebas y herramientas

Respuestas de [`practicas/01-test.md`](../../practicas/01-test.md). Generado con `herramientas/generar-test.py` a partir de [`preguntas.json`](./preguntas.json).

## Bloque 1: Validación y spec drift

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 1 | **d** | Código y tests salen de la misma interpretación: estar de acuerdo entre sí no significa cumplir la spec. |
| 2 | **a** | Empieza con una diferencia pequeña y crece con cada cambio que se hace en un lado y no en el otro. |
| 3 | **a** | El error reaparece en cada feature que lee la spec, con formas distintas: el drift se realimenta. |
| 4 | **c** | La decisión se tomó fuera del flujo y la spec sigue diciendo otra cosa. |
| 5 | **d** | La tercera columna es la importante: un test puede existir, llevar el identificador y no comprobar lo que el identificador dice. |
| 6 | **c** | Es la idea de las pruebas de mutación: si rompes el código y el test sigue en verde, no protege nada. |
| 7 | **c** | Un agente de solo lectura que puede pedir a otro que escriba no es de solo lectura. |
| 8 | **a** | Los hallazgos son propuestas: se reproducen y se contrastan con la spec antes de aceptarlos. |
| 9 | **b** | Los tests de aceptación no ven la estructura: un controlador que se salta el servicio responde igual. |
| 10 | **c** | Todo lo automático compara el código con la spec o con reglas escritas; la necesidad y la mantenibilidad siguen siendo juicio humano. |

## Bloque 2: Pruebas desde la spec

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 11 | **b** | Comparten la idea de que el test va primero, pero tienen objetivos y tamaños de paso distintos. |
| 12 | **c** | Las tres partes del escenario son las tres partes de cualquier test. |
| 13 | **a** | Los datos tienen que distinguir la implementación correcta de las incorrectas razonables. |
| 14 | **d** | El nivel lo decide el sitio donde se ve lo que decide la spec. |
| 15 | **d** | Separadas no significa opcionales: la CI ejecuta las dos y no se fusiona con ninguna en rojo. |
| 16 | **a** | Los localizadores por papel y texto describen lo que hace el usuario, no la estructura del HTML. |
| 17 | **a** | Es una aserción que no se ejecuta dentro del test: una forma de test que miente. |
| 18 | **d** | Pedírselo en el prompt no basta: los permisos hacen que no pueda. |
| 19 | **c** | Con `sed -i` en la terminal o pidiéndoselo a otro agente, el permiso de `edit` no protege. |
| 20 | **b** | La regla no es «los tests nunca cambian», sino «no los cambia quien implementa». |

## Bloque 3: Quality gates e integración continua

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 21 | **c** | Se complementan: el gate quita a la persona el trabajo mecánico. |
| 22 | **a** | Código ejecutado no es código comprobado: un test sin aserciones da cobertura. |
| 23 | **a** | La cobertura de la spec la da la trazabilidad, y la calidad de los tests, su revisión. |
| 24 | **a** | Un umbral es un buen suelo y un mal objetivo. |
| 25 | **b** | Es la búsqueda de identificadores sin test, automatizada; mira nombres, no lo que comprueba el test. |
| 26 | **b** | Es un gate estructural contra el drift por cambios que no llegan a la spec. |
| 27 | **d** | Si el commit solo cambia tests, es un aviso que lee una persona; si mezcla tests existentes y código, es un error. |
| 28 | **b** | Sin el historial, no hay `origin/main` con el que comparar. |
| 29 | **a** | Por defecto, GitHub no ejecuta los pasos que siguen a uno que ha fallado. |
| 30 | **a** | Cada job empieza en una máquina limpia: lo que tu equipo tiene y el repositorio no dice, no está. |
| 31 | **b** | El agente no responde siempre igual: un intento es una muestra, no una prueba. |
| 32 | **a** | Si el código funciona después de una acción prohibida, el intento falla en límites. |
| 33 | **d** | La configuración acaba encajando con los casos que se miran; el reservado se ejecuta al final, con las dos configuraciones. |

## Bloque 4: El ecosistema de herramientas

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 34 | **c** | Un ranking caduca en meses; el mapa por papeles y los criterios, no. |
| 35 | **c** | Si lo importante está en el repositorio y en formatos abiertos, se puede cambiar cualquier otra pieza. |
| 36 | **b** | Por eso encaja en código existente, donde casi todo el trabajo son cambios. |
| 37 | **a** | Cambian los nombres; el método es el mismo que el del curso. |
| 38 | **b** | Cuanto menos supervisas el proceso, más tiene que estar decidido por escrito antes. |
| 39 | **d** | El agente organiza el trabajo; el razonamiento lo pone un modelo al que llama por una API. |
| 40 | **d** | Es una decisión de privacidad y de simplicidad. |
| 41 | **c** | Las restricciones descartan opciones antes de puntuar las demás. |
| 42 | **a** | La matriz no decide sola: ordena la discusión y deja la decisión escrita. |
| 43 | **c** | Lo que está en formatos abiertos sobrevive; la configuración del agente hay que rehacerla y comprobarla. |

## Bloque 5: MCP: conectar el agente con sistemas externos

| Pregunta | Respuesta | Justificación |
|---------:|:---------:|---------------|
| 44 | **b** | Cada sistema tiene su servidor; cada agente, su cliente, y funcionan entre sí. |
| 45 | **b** | El modelo genera una llamada estructurada; el agente la envía al servidor. |
| 46 | **c** | Las tools actúan y son las más delicadas. |
| 47 | **c** | Una llamada que no cumple el esquema se rechaza antes de llegar a la función. |
| 48 | **b** | Por eso se prefieren servidores oficiales o de código abierto, con la versión fijada. |
| 49 | **b** | Las reglas del agente se aplican después de las del proyecto, y gana la última que coincide. |
| 50 | **d** | El fichero dice de dónde leer la clave, no la clave. |
| 51 | **d** | No basta con pedir: hay que impedir. A veces el modelo sigue estas instrucciones. |
| 52 | **d** | Quitar cualquiera de las tres cosas rompe la cadena. |
| 53 | **a** | Mínimo privilegio e ingeniería de contexto empujan en la misma dirección. |
