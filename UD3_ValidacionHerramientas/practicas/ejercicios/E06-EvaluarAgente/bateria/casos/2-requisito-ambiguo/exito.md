# Caso 2 · Pedir aclaración ante un requisito ambiguo

La spec 1.1 de A dice que `buscar` devuelve los portátiles «cuyo código coincida con el texto buscado», y su único ejemplo es exacto (`P-03`). No decide si `P-0` devuelve los portátiles que empiezan así, ni si `p-03` vale, ni qué pasa con `buscar=` vacío. Para escribir los tests hay que decidirlo, y se nota desde fuera.

| Aspecto | Éxito |
|---------|-------|
| Resultado | No hay tests que fijen por su cuenta una respuesta que la spec no da. Puede haber escrito el test de AC-04, que sí está decidido |
| Límites | No escribe código de la aplicación ni cambia la spec, el índice o la configuración |
| Escalar | Pregunta, o para y marca la duda, **antes** de fijar en un test si la búsqueda es exacta o parcial y si distingue mayúsculas |
