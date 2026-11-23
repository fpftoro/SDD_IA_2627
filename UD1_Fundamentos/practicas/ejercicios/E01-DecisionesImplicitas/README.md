# Las decisiones que nadie tomó

<!-- Completa cada sección. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución. -->

## Decisiones implícitas

<!-- Al menos seis filas. «Líneas»: las de codigo-generado/devoluciones.js, o «—» si es algo que el código no hace.
     «Quién debería decidirlo»: equipo, coordinación TIC o dirección del centro. -->

| # | Líneas | Qué decide el código | Consecuencia concreta | Quién debería decidirlo |
|---|--------|----------------------|-----------------------|-------------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |

## Por qué el agente decide

<!-- Un párrafo de cinco a ocho líneas: por qué el agente decide en lugar de preguntar,
     qué es la especificación de facto y qué principio del tema 1 se ha saltado tu compañero. -->

## ¿Vibe coding, prompt cuidado o SDD?

<!-- «Enfoque»: vibe coding, prompt cuidado o SDD. «Motivo»: un criterio del tema 1 aplicado a la situación. -->

| Situación | Enfoque | Motivo |
|-----------|---------|--------|
| Una maqueta de la pantalla de reservas para enseñarla mañana en el claustro y decidir si se hace la aplicación | | |
| El registro de devoluciones que usará todo el profesorado durante varios cursos | | |
| Cambiar el texto del botón «Reservar» por «Reservar carro» | | |
| Probar en una tarde si una librería de lectura de códigos QR reconoce las etiquetas de los portátiles | | |
| Un aviso por correo cuando un préstamo lleve dos días de retraso, que mantendrán dos profesores del departamento | | |
| Cambiar el puerto en el que arranca el servidor de desarrollo | | |

## Niveles de SDD

<!-- «Nivel»: spec-first, spec-anchored o spec-as-source. «Fuente de verdad»: el código, la spec o las dos sincronizadas.
     «Frase que lo indica»: cópiala del texto, entre comillas. -->

| Equipo | Cómo trabaja | Nivel | Fuente de verdad | Frase que lo indica |
|--------|--------------|-------|------------------|---------------------|
| A | «Antes de cada funcionalidad escribimos un `spec.md` y se lo pasamos al agente. Cuando el código funciona, la spec se queda en su carpeta y ya no la tocamos: si hay que cambiar algo, se cambia el código.» | | | |
| B | «Solo editamos las specs. Una herramienta genera todo el código a partir de ellas en cada cambio, y nadie modifica el código generado a mano.» | | | |
| C | «Cada spec tiene sus criterios de aceptación convertidos en tests. En la integración continua, un cambio que altera el comportamiento sin actualizar la spec no se puede integrar.» | | | |

**Nivel recomendado para la aplicación de préstamos:**

<!-- Dos o tres líneas: qué nivel y por qué, pensando en quién la mantendrá y cuánto tiempo. -->

## El mismo prompt, dos veces

<!-- Solo si haces la parte opcional (requisito 5). Si no, borra esta sección. -->

Proveedor y modelo usados:

| Decisión | Ejecución 1 | Ejecución 2 |
|----------|-------------|-------------|
| Ruta del endpoint | | |
| Qué pasa si el portátil no existe | | |
| Qué pasa si el portátil no estaba prestado | | |
| Quién pone la fecha de devolución | | |
| Qué se hace con el préstamo | | |
| Formato de la respuesta | | |
| Otra decisión que te llame la atención | | |

**Qué conclusión sacas:**

<!-- Dos o tres líneas: ¿coinciden las dos ejecuciones? ¿Qué te dice eso sobre dejar las decisiones en manos del agente? -->
