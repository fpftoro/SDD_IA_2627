# Ni vaga ni rígida

Spec revisada: [`docs/specs/F-cancelar-reserva/spec.md`](./docs/specs/F-cancelar-reserva/spec.md)

## Clasificación

| Línea | Tipo | Dónde va | Reescritura o motivo |
|-------|------|----------|----------------------|
| L1 | vaga | spec | El sistema deberá responder a una cancelación en menos de 300 ms con 500 reservas guardadas. |
| L2 | rígida | plan | Cómo se quita una reserva de una estructura de datos es implementación; además, la constitución dice que las reservas no se borran. |
| L3 | adecuada | spec | Condición y respuesta exacta de un *edge case* de esta feature. |
| L4 | adecuada | constitución | Vale para toda la API, no solo para cancelar reservas. |
| L5 | vaga | spec | Si la hora de la reserva ya ha empezado, entonces el sistema deberá responder 409 con `{ error: "La reserva ya ha empezado" }`. |
| L6 | rígida | plan | El nombre y la ubicación de una función son detalles internos: no los nota nadie desde fuera. |
| L7 | adecuada | spec | Regla de negocio de esta feature, decidida por la coordinación TIC. |
| L8 | adecuada | spec | Es técnica, pero es el contrato de la API: lo ve quien la llama. |
| L9 | adecuada | spec | Comportamiento observable de esta feature. Coincide con la constitución, que dice que las reservas no se borran. |
| L10 | adecuada | constitución | Formato de datos para todo el proyecto. |
| L11 | rígida | plan | La estructura de datos y su coste son implementación; el rendimiento que importa se fija con un RNF medible. |
| L12 | vaga | spec | Cuando un profesor pida cancelar una reserva, la interfaz deberá pedirle confirmación antes de enviar la cancelación. |
| L13 | rígida | plan | Elegir una librería es una decisión del plan (o de la constitución, si el equipo la quiere para todo el proyecto); la spec no la necesita. |
| L14 | adecuada | spec | *Edge case* con condición y respuesta exacta. |
| L15 | adecuada | constitución | Principio de pruebas para todo el proyecto. |

## Sesión con el agente

Proveedor y modelo: *(el que use cada alumno)*

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | plan | Revisión de la spec (prompt del tema 6) | Una lista de nueve problemas: RF-02, RNF-01, AC-03, EC-03 y EC-04 como VAGA; RF-03, RNF-02 y AC-02 como RÍGIDA; RF-04 como NOTACIÓN. Marcó EC-04 con `[NECESITA ACLARACIÓN]` (qué es «última hora») | Resolví la aclaración con lo decidido por la coordinación TIC (hasta que empieza la hora) |
| 2 | plan | Detalles técnicos para la implementación | Propuso concretar el método HTTP y la ruta, usar `date-fns` para comparar fechas, un índice por carro y hora, una transacción al cancelar y nombrar el servicio `servicioReservas` | Rechacé todo salvo la ruta, que ya estaba en la spec (ver «Decisiones») |
| 3 | build | `Aplica a @docs/specs/F-cancelar-reserva/spec.md solo estos cambios: <lista de las propuestas aceptadas>. No cambies nada más.` | La spec con los cambios, pero con AC-02 todavía con «la casilla se pone gris» | Reescribí AC-02 a mano como un escenario declarativo y añadí AC-03 y AC-04; puse la versión 1.1 y el estado `Aprobada` |

Sesión exportada: `sesiones/revision.md` (no se incluye en la solución de referencia: cada alumno entrega la suya).

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| RF-02: cambiar «de forma eficiente» por qué pasa con el hueco | Aceptada | Era vaga: ahora dice que el carro queda libre para nuevas reservas (RF-03) |
| RF-03: quitar el código y dejar el comportamiento | Aceptada | Dictaba la implementación; el cambio de estado ya está en RF-01 |
| RF-04: reescribir en EARS con *Cuando…* | Aceptada | La constitución pide EARS (RF-02 revisado) |
| RNF-01: poner un tiempo medible | Aceptada con cambios | Propuso 100 ms; uso los 300 ms con 500 reservas que decidió la coordinación TIC |
| RNF-02: pasar el `Map` al plan | Aceptada | Es una estructura interna: no se nota desde fuera |
| AC-02: escenario declarativo, sin botón ni ventana | Aceptada | Era un guion de clics; ahora comprueba que otro profesor puede reservar el hueco |
| AC-03: concretar «se gestiona correctamente» con 404 y su error | Aceptada | Era vaga (ahora AC-04, con la respuesta de EC-01) |
| EC-03: responder 409 con su mensaje | Aceptada | La coordinación TIC lo decidió así |
| EC-04: `[NECESITA ACLARACIÓN]` sobre «última hora» | Aceptada y resuelta | La respuesta estaba en las decisiones de la coordinación TIC: hasta que empieza la hora |
| Concretar el método HTTP y la ruta | Rechazada | Ya estaba en el contexto de la spec (`DELETE /api/reservas/:id`) |
| Usar `date-fns` para comparar fechas | Rechazada | Es una decisión del plan: elegir una librería no cambia nada visible |
| Un índice por carro y hora para buscar rápido | Rechazada | Es implementación; el rendimiento que importa ya está en RNF-01 |
| Hacer la cancelación dentro de una transacción | Rechazada | Es cómo se garantiza; si hiciera falta, lo que va en la spec es el comportamiento ante un fallo, no la técnica |
| Nombrar el servicio `servicioReservas` | Rechazada | Detalle interno: no lo nota nadie desde fuera |

## Lista de comprobación

- [x] No queda ningún `[NECESITA ACLARACIÓN]`.
- [x] Cada requisito es atómico, verificable y sigue la notación acordada.
- [x] Cada criterio de aceptación es un escenario binario y concreto.
- [x] Cada *edge case* tiene una respuesta exacta.
- [x] No hay nombres de funciones, código ni estructuras internas.
- [x] El fuera de alcance cierra lo que el agente podría añadir por su cuenta.

## Validación

```text
> prestamo-portatiles-specs@0.1.0 validar
> node herramientas/validar-gherkin.mjs

✅ 1 documento de Gherkin sin errores
```

## Commits

Ejemplo de historial (los identificadores cambian en cada repositorio):

```text
c3d4e5f Spec de la feature F aprobada
a1b2c3d Revisión de la spec con el agente
9f8e7d6 Clasificación de líneas
1a2b3c4 Initial commit
```
