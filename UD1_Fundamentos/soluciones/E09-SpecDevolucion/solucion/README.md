# La spec de una feature: Registrar la devolución

Spec: [`docs/specs/D-registrar-devolucion/spec.md`](./docs/specs/D-registrar-devolucion/spec.md)

## Borrador

El profesor que tiene un portátil prestado registra la devolución cuando lo
deja en el carro. La aplicación apunta la hora de devolución (la del
servidor), si trae el cargador y si llega tarde, y el portátil vuelve a
estar disponible. El préstamo no se borra, solo se cierra. No se puede
devolver un portátil que no estaba prestado. La coordinación TIC también
puede registrar la devolución si el profesor se fue sin apuntarla. Las
penalizaciones por retraso no entran.

## Sesión con el agente

Proveedor y modelo: *(el que use cada alumno)*

| Paso | Fase | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|------|--------|--------|-------------|-----------------------|
| 1 | 2 | plan | `Convierte este borrador en la spec de la feature D con la plantilla del curso (metadatos, contexto, requisitos funcionales y no funcionales, criterios de aceptación, edge cases y fuera de alcance). Requisitos y edge cases en EARS y criterios en Gherkin, como pide @constitution.md. Usa @docs/notas-devolucion.md y @docs/prd.md. Donde falte información, no la inventes: marca [NECESITA ACLARACIÓN] con la pregunta concreta.` + el borrador | Una spec completa con tres marcadores: quién puede registrar la devolución además del profesor, qué pasa si el portátil se averió y qué hacer si falta el dato del cargador | Había inventado un retraso a partir de «más de 15 minutos tarde»: lo marqué yo, porque nadie lo dijo. Cambié un escenario que decía «el profesor pulsa Devolver» por la acción |
| 2 | 2 | build | `Guarda en docs/specs/D-registrar-devolucion/spec.md la spec que acabamos de revisar, con el estado Borrador y la versión 0.1. No cambies nada más.` | El fichero | Comprobé con `git diff` que solo había creado ese fichero |
| 3 | 3 | plan | Revisión de la spec (prompt del tema 6) | Siete propuestas (ver «Decisiones») | Apliqué las aceptadas a mano |

Sesiones exportadas: `sesiones/redaccion.md` y `sesiones/revision.md` (no se incluyen en la solución de referencia: cada alumno entrega las suyas).

## Dudas resueltas

| Dónde | Duda | Origen | Decisión de la coordinación TIC |
|-------|------|--------|---------------------------------|
| RF-06, EC-05 | ¿Quién más puede registrar la devolución? ¿Qué se responde a cualquier otro? | Marcada por el agente | El profesor del préstamo y la coordinación TIC; a los demás, 403 |
| EC-06 | ¿Qué pasa si el portátil se averió mientras estaba prestado? | Marcada por el agente | Se registra la devolución y el portátil sigue averiado |
| EC-03 | ¿Qué se hace si la petición no dice si trae el cargador? | Marcada por el agente | 400 con «Indica si devuelves el cargador» |
| RF-04 | ¿Cuándo es tardía una devolución? | Marcada por mí (el agente se inventó 15 minutos) | Después de la fecha límite del préstamo (14:30) |
| EC-02 | ¿Qué se responde al devolver un préstamo ya devuelto? | Marcada por el agente | 409 con «Este préstamo ya está devuelto» |
| RNF-01 | Tiempo de respuesta | No la vimos | Menos de 300 ms con 5.000 préstamos |
| EC-01 | Préstamo que no existe | No la vimos | 404 con «El préstamo no existe» |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Separar RF-01 (guardar fecha, cargador y cambiar el estado) en tres requisitos | Aceptada | Era compuesto: ahora RF-01, RF-02 y RF-03 |
| Reescribir «se marca el retraso» con *Cuando…* y la fecha límite | Aceptada | Era vaga y no seguía EARS (RF-04) |
| Añadir un *edge case* para campos inesperados en la petición | Aceptada | Si alguien envía una fecha, se ignora (EC-07); coherente con RNF-02 |
| Guardar el préstamo en una tabla `devoluciones` aparte | Rechazada | Es implementación: va en el plan. La spec solo dice que el préstamo no se borra |
| Usar una transacción para cambiar préstamo y portátil a la vez | Rechazada | Es el cómo. En la spec dejo el comportamiento: si falla, no cambia nada (EC-08) |
| Indicar en AC-01 la hora exacta con `Date.now()` simulada | Aceptada con cambios | Bien la idea de fijar la hora; mal el detalle de código: «Dado que son las 13:00» |
| Añadir un aviso por correo cuando falta el cargador | Rechazada | Nadie lo ha pedido: va al fuera de alcance |

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
d4e5f6a Spec de la feature D (aprobada)
c3d4e5f Spec de la feature D (en revisión)
a1b2c3d Spec de la feature D (borrador)
9f8e7d6 Borrador de la feature D
1a2b3c4 Initial commit
```
