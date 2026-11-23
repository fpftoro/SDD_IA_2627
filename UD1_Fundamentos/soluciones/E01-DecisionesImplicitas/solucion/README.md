# Las decisiones que nadie tomó

## Decisiones implícitas

| # | Líneas | Qué decide el código | Consecuencia concreta | Quién debería decidirlo |
|---|--------|----------------------|-----------------------|-------------------------|
| 1 | 9 | La ruta es `/devoluciones`, fuera de `/api/` | El cliente web, que llama a `/api/prestamos/...`, recibe un 404 al intentar devolver un portátil; quien mantenga la API encuentra una ruta que no sigue las demás | Equipo |
| 2 | 10, 19 | La fecha de devolución la envía el cliente | Un profesor puede registrar una devolución tardía con una fecha anterior y evitar el retraso; y si la petición llega sin fecha, `new Date(undefined)` no es una fecha válida y la devolución nunca cuenta como tardía | Equipo (y coordinación TIC: qué fecha cuenta) |
| 3 | 10 | Si no se indica, el portátil se da por devuelto **con cargador** (`conCargador = true`) | Un profesor devuelve el portátil sin cargador, el formulario no lo marca y la coordinación TIC no sabe dónde está el cargador hasta que falta | Coordinación TIC |
| 4 | 12–13 | No comprueba que el portátil exista ni que llegue `portatilId` | Si el portátil no existe o falta el dato, el servidor falla con un 500 y una página HTML de error, en lugar de un `{ error: "..." }` en español que el cliente pueda mostrar | Equipo |
| 5 | 13 | Pone el portátil como `disponible` sin mirar su estado | Un portátil **averiado** que alguien «devuelve» por error vuelve a estar disponible, y el siguiente profesor se lo lleva a clase sin que funcione | Coordinación TIC |
| 6 | 15, 23 | No comprueba que el portátil tenga un préstamo abierto | Si no lo tiene, `indice` vale `-1` y `prestamos.splice(-1, 1)` borra el **último préstamo de la lista**, que es el de otro profesor y otro portátil: ese préstamo desaparece del historial sin que nadie lo note | Equipo |
| 7 | 18–21 | Si la devolución es tardía, bloquea al usuario siete días | Una norma de penalización que nadie ha aprobado: un profesor que devuelve el carro diez minutos tarde se queda sin portátiles una semana | Dirección del centro |
| 8 | 23 | Borra el préstamo en lugar de anotar `fechaDevolucion` | Se pierde el historial: cuando falte un portátil, la coordinación TIC no podrá saber quién lo tuvo antes | Coordinación TIC (el equipo ya lo había acordado) |
| 9 | 25 | Responde `{ message: 'Return registered' }`, en inglés y con un formato propio | El cliente muestra un mensaje en inglés, y cada endpoint de la API responde con un formato distinto | Equipo |
| 10 | — | No comprueba quién registra la devolución | Cualquier usuario puede marcar como devuelto el portátil que se llevó otra persona, y el préstamo queda cerrado sin que el portátil haya vuelto | Coordinación TIC |

## Por qué el agente decide

El prompt solo decía *qué* hacer («registrar la devolución»), sin ninguna regla, así que el agente tuvo que rellenar todo lo demás. Un agente no suele preguntar: elige lo más probable según lo que ha visto en otros proyectos (una ruta en inglés, borrar el registro, dar por bueno el cargador) e incluso inventa reglas que le parecen razonables, como el bloqueo de una semana. Como nadie revisó esas decisiones antes de programar, ahora están en el código y el código se ha convertido en la **especificación de facto**: la única descripción de cómo funcionan las devoluciones es lo que hace este fichero, con sus errores incluidos. Mi compañero se saltó el principio de **especificar antes de construir**: si hubiera escrito antes qué pasa con un portátil averiado, sin préstamo o sin cargador, y qué no hay que hacer (penalizaciones), el agente habría trabajado dentro de esas decisiones y la revisión habría sido comparar el código con la spec.

## ¿Vibe coding, prompt cuidado o SDD?

| Situación | Enfoque | Motivo |
|-----------|---------|--------|
| Una maqueta de la pantalla de reservas para enseñarla mañana en el claustro y decidir si se hace la aplicación | Vibe coding | Es un prototipo que se va a tirar: solo sirve para decidir si se hace la aplicación |
| El registro de devoluciones que usará todo el profesorado durante varios cursos | SDD | Va a producción, tiene que durar y un fallo tiene consecuencias (portátiles que no se sabe quién tiene) |
| Cambiar el texto del botón «Reservar» por «Reservar carro» | Prompt cuidado | Es un cambio pequeño y localizado, sin decisiones que tomar |
| Probar en una tarde si una librería de lectura de códigos QR reconoce las etiquetas de los portátiles | Vibe coding | Es explorar: todavía no sabemos si la idea funciona, y el código de la prueba no se va a mantener |
| Un aviso por correo cuando un préstamo lleve dos días de retraso, que mantendrán dos profesores del departamento | SDD | Lo mantendrán varias personas y tiene decisiones que tomar (a quién se avisa, cuántas veces, qué pasa si el correo falla) |
| Cambiar el puerto en el que arranca el servidor de desarrollo | Prompt cuidado | Es un cambio de configuración pequeño y localizado |

## Niveles de SDD

| Equipo | Cómo trabaja | Nivel | Fuente de verdad | Frase que lo indica |
|--------|--------------|-------|------------------|---------------------|
| A | «Antes de cada funcionalidad escribimos un `spec.md` y se lo pasamos al agente. Cuando el código funciona, la spec se queda en su carpeta y ya no la tocamos: si hay que cambiar algo, se cambia el código.» | Spec-first | El código | «si hay que cambiar algo, se cambia el código» |
| B | «Solo editamos las specs. Una herramienta genera todo el código a partir de ellas en cada cambio, y nadie modifica el código generado a mano.» | Spec-as-source | La spec | «Solo editamos las specs» |
| C | «Cada spec tiene sus criterios de aceptación convertidos en tests. En la integración continua, un cambio que altera el comportamiento sin actualizar la spec no se puede integrar.» | Spec-anchored | Spec y código, sincronizados | «un cambio que altera el comportamiento sin actualizar la spec no se puede integrar» |

**Nivel recomendado para la aplicación de préstamos:**

*Spec-first*, al menos al principio: es una aplicación pequeña, la mantendrán unos pocos profesores y no hace falta montar tests derivados de la spec ni integración continua para empezar. Lo importante es escribir y revisar la spec antes de cada funcionalidad. Si la aplicación crece o cambia de manos, convendría pasar a *spec-anchored* para que la spec no se quede vieja.
