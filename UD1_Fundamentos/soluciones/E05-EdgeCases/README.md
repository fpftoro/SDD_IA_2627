# E05-EdgeCases

## Más allá del camino feliz

### Descripción

Solución del **Ejercicio 5** (autocorrección). El alumno completa la spec de «Reservar un carro», que solo describe el camino feliz: añade al menos ocho *edge cases* de tipos distintos con la respuesta exacta, marca con `[NECESITA ACLARACIÓN]` las decisiones que corresponden al centro, añade criterios de aceptación que comprueban *edge cases*, escribe el fuera de alcance y decide el estado de la spec.

- Enunciado y material de partida: [`practicas/ejercicios/E05-EdgeCases`](../../practicas/ejercicios/E05-EdgeCases/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 5 | Más allá del camino feliz | *Edge cases*, decisiones de diseño, criterios de aceptación y fuera de alcance de una spec (OA1 e) |

### Estructura

```text
E05-EdgeCases/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md           ← respuesta modelo
    └── docs/specs/B-reservar-carro/spec.md   ← spec completada (versión 0.2)
```

### Conceptos aprendidos

- Una spec de solo camino feliz deja al agente decidir todo lo demás: qué pasa con un sábado, con un carro ya reservado o con dos peticiones a la vez.
- Cada dato de entrada tiene sus *edge cases* (ausente, formato, rango, límite), y cada feature, los suyos propios (aquí, el calendario y la concurrencia).
- La respuesta de un *edge case* es **exacta**: código HTTP, mensaje y qué pasa con los datos.
- Algunos *edge cases* son **decisiones del centro**. Quien escribe la spec no las inventa: las marca con `[NECESITA ACLARACIÓN]`, y la spec no se aprueba hasta resolverlas.
- El fuera de alcance cierra las puertas que el agente abriría por su cuenta, como las reservas periódicas o los correos.

### Errores frecuentes

- Respuestas vagas: «muestra un error», «no deja reservar». Falta el código y el mensaje.
- *Edge cases* de un solo tipo (todo validaciones de formato) sin pensar en el calendario, en la concurrencia ni en los fallos externos.
- Olvidar el **límite**: ¿la 6.ª hora es válida?, ¿y una hora de hoy que aún no ha empezado?
- Inventar la respuesta a una decisión del centro (por ejemplo, «máximo dos semanas») en lugar de marcarla.
- Marcadores que son dudas técnicas que el alumno podía resolver («¿qué código HTTP uso?»): eso lo decide quien escribe la spec, con la constitución.
- Aprobar la spec, o dejarla «En revisión», con marcadores pendientes.
- Criterios de aceptación nuevos sin *cuando*, o que comprueban varias cosas a la vez.
- Poner en el fuera de alcance algo que contradice un requisito (por ejemplo, «el calendario», que está en RF-03).

### Otras soluciones válidas

- Otros mensajes de error, otros identificadores y otro orden, siempre que cada *edge case* tenga condición y respuesta exacta.
- Resolver una de las tres dudas de la solución como decisión propia **si está razonada y es del ámbito técnico** (por ejemplo, rechazar con 409 a un profesor que reserva dos carros a la misma hora si argumenta que así lo pide el PRD), y marcar otras. Lo que no vale es dejar sin marcar las decisiones que son claramente del centro (calendario lectivo, límite de antelación).
- Responder 422 en lugar de 400 a los datos con formato correcto pero valor no válido, si es coherente en toda la spec.
- Más marcadores que los de la solución: por ejemplo, qué pasa si todos los portátiles de un carro están averiados.
- Dejar la versión en 0.2 con el estado `Borrador` o justificar otro nombre de estado equivalente, siempre que no sea `Aprobada`.
