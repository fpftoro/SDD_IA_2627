# Respuestas de la coordinación TIC

> Ábrelo **después** de haber escrito los tests de caracterización y tu lista de rarezas, no antes. Son las respuestas a las dudas que más suelen plantearse sobre este módulo; si tu lista tiene otras, decide tú y justifícalo.

| Duda | Respuesta |
|------|-----------|
| ¿Por qué el aviso empieza a los 7 días y no a los 8? | Se reclama «a partir de una semana». Es así a propósito |
| ¿En qué orden quieren los avisos? | **Los más antiguos primero.** A igual antigüedad, por profesor, sin distinguir mayúsculas. Hoy salen por el nombre y con las mayúsculas delante, y eso no es lo que pedimos |
| ¿Y si un préstamo no tiene profesor? | No debería pasar, pero si pasa, que el aviso diga «con un profesor desconocido», no «undefined» |
| ¿Y si la fecha de salida es inválida? | Mejor que **falle con un error** que diga qué préstamo es. Hoy se esconde y nadie reclama ese portátil |
| ¿Y si «hoy» es inválido? | También error. Es un fallo del script |
| ¿Un préstamo con fecha de salida futura? | No es un aviso. Que no salga |
| ¿Un préstamo `perdido`? | Sí, que salga: queremos saberlo |
| ¿Y el cargador? | El sistema siempre guarda verdadero o falso. Lo que haga con otros valores no nos importa |
| ¿Y «Sin avisos»? | Nos gusta: así sabemos que el script ha funcionado |
| ¿Y que sea un texto con una línea por aviso? | Lo pegamos tal cual en el correo. No lo cambiéis |
