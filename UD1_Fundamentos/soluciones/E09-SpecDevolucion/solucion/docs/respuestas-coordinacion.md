# Respuestas de la coordinación TIC

Respuestas a las preguntas que la coordinación TIC suele recibir sobre las
devoluciones. **Consúltalas solo en la fase 3**, cuando tengas tus dudas
marcadas en la spec: es lo que te contestaría la coordinación si se lo
preguntaras.

**¿Quién puede registrar una devolución?**
El profesor que tiene el préstamo y cualquier persona de la coordinación TIC.
Nadie más: a cualquier otro se le responde 403 con
`{ error: "No puedes registrar esta devolución" }`.

**¿Qué pasa si se devuelve sin cargador?**
El préstamo se cierra igual y el portátil vuelve a estar disponible, pero la
devolución queda anotada «sin cargador» para que podamos reclamarlo.

**¿Hay que indicar siempre lo del cargador?**
Sí. Si la petición no dice si trae el cargador, se responde 400 con
`{ error: "Indica si devuelves el cargador" }`.

**¿Cuándo una devolución es tardía?**
Cuando la hora de devolución es posterior a la fecha límite del préstamo (el
mismo día a las 14:30). Se registra igual y queda marcada «con retraso».

**¿Qué pasa con las penalizaciones por retraso?**
Las decidirá la dirección más adelante. Por ahora no hay ninguna.

**¿Y si el portátil está averiado cuando se devuelve?**
Si mientras estaba prestado alguien anotó una avería, la devolución se
registra y el portátil sigue en estado averiado, no disponible.

**¿Y si se intenta devolver un préstamo que ya está devuelto?**
Se responde 409 con `{ error: "Este préstamo ya está devuelto" }` y no se
cambia nada.

**¿Y si el préstamo no existe?**
Se responde 404 con `{ error: "El préstamo no existe" }`.

**¿Cuánto puede tardar?**
Menos de 300 ms con 5.000 préstamos guardados.
