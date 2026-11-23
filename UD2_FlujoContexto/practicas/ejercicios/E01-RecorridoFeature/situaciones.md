# Situaciones de la feature C

Diez cosas que pasaron mientras se hacía la feature C, «Registrar el
préstamo». Cada una dice en qué momento del flujo apareció.

La spec aprobada de C (versión 1.0) dice, en resumen:

- El préstamo se registra con `POST /api/prestamos` y el código del
  portátil. El profesor es el que ha iniciado sesión.
- Si el portátil está disponible, se guarda el préstamo, el portátil pasa a
  `prestado` y se responde 201 con el préstamo.
- La fecha límite es el mismo día a las 14:30.
- Si el portátil está averiado o ya prestado, se responde 409 con su
  mensaje de error.
- Si no se puede guardar el préstamo, se responde 500 y el portátil no
  cambia de estado.

La constitución dice, entre otras cosas, que las rutas y los controladores
no contienen lógica de negocio, que los tests se escriben antes que el
código y que no se añaden dependencias sin acordarlo.

---

**S1.** Revisando el plan, lees: «Si el portátil está reservado para otra
hora de ese día, se presta igualmente y la respuesta incluye un aviso con
la hora de la reserva». La spec de C no dice nada de las reservas.

**S2.** Revisando el plan, ves que añade la librería `moment` para
calcular la fecha límite de las 14:30.

**S3.** Revisando las tasks, encuentras «T-04: implementar el servicio, el
controlador, las rutas y sus tests».

**S4.** En el punto de control del ciclo 2, `npm test` da dos tests en
rojo: los que comprueban que no se presta un portátil averiado ni uno ya
prestado. Al leer el `git diff` ves que el servicio guarda el préstamo sin
mirar el estado del portátil, aunque la spec y la decisión D-03 del plan
dicen que hay que comprobarlo. El agente propone hacer ya el commit y
arreglarlo en el ciclo siguiente.

**S5.** En el ciclo 3, el agente te pregunta qué hacer si el profesor ya
tiene otro portátil prestado. La spec no lo dice. El agente propone
permitirlo «porque es lo más sencillo».

**S6.** Revisando el plan de C, corriges por tercera vez (ya lo hiciste en
los planes de A y B) que los identificadores se generan con
`crypto.randomUUID()` y no con el paquete `uuid`.

**S7.** Antes de aprobar la spec, la lees y encuentras «El préstamo se
registrará rápidamente».

**S8.** Revisando las tasks, ves que la task de los tests de la API va
después de la del controlador y las rutas.

**S9.** En el punto de control del ciclo 3, ves en el `git diff` que el
agente ha cambiado un test de EC-02: esperaba un 409 y ahora espera un 400,
«para que pase».

**S10.** Revisando el plan, lees en la decisión D-02: «La ruta comprueba si
el portátil ya está prestado y responde 409 sin llamar al servicio, para
ahorrar una llamada».
