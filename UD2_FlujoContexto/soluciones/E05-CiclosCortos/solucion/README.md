# Implementar en ciclos cortos

Spec, plan y tasks: [`docs/specs/B-reservar-carro/`](./docs/specs/B-reservar-carro/)

> Esta respuesta es un **ejemplo comentado**: cada sesión con el agente es distinta. El código y los tests de esta carpeta son una implementación de referencia, comprobada (69 tests en verde, 43 de la feature B). Las sesiones exportadas no se incluyen.

## Sesión con el agente

Proveedor y modelo: <proveedor>/<modelo>

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | build | Grupo 1 de las tasks (T-01 y T-02), con el prompt del tema 3 | El test del reloj en rojo (no existe el módulo) y después el reloj con Intl.DateTimeFormat | El test solo comprobaba una hora en la que UTC y la hora peninsular dan el mismo día. Le pedí otro caso a las 23:30 UTC, que sí las distingue |
| 2 | build | Grupo 2 (T-03 y T-04) | 25 tests del servicio en rojo; después el error, el repositorio y el servicio | En el `git diff`, `listarReservasDelDia` devolvía las reservas en el orden en que se crearon. Ver «Hueco de la spec» |
| 3 | build | «He subido la spec a 1.1: RF-03 pide ordenar por hora y carro. Añade a T-03 un test de RF-03 con ese orden y cambia el servicio.» | El test nuevo en rojo y la ordenación en el servicio | Nada |
| 4 | build | Grupo 3 (T-05 y T-06) | 16 tests de la API en rojo; después el controlador, las rutas y el montaje | El agente quería añadir un manejador de errores global a `app.js` «por si el JSON está mal formado». Lo rechacé: no está en la tarea ni en la spec |

Sesiones exportadas: `sesiones/` (no incluidas en la solución).

## Puntos de control

| Ciclo | Ficheros cambiados | Rojo → verde | CI | Qué encontré | Qué hice |
|-------|--------------------|--------------|----|--------------|----------|
| 1 | `tests/reloj.test.js`, `src/utilidades/reloj.js`, `tasks.md`, spec e índice (`En implementación`) | 1 → 1 | Verde | El test no distinguía la hora peninsular de UTC | Pedí el caso de las 23:30 UTC; ahora falla si el reloj usa UTC |
| 2 | `tests/servicio-reservas.test.js`, `src/errores/error-conflicto.js`, `src/repositorios/repositorio-reservas.js`, `src/servicios/servicio-reservas.js`, `tasks.md`, spec 1.1 y plan | 25 → 26 | Verde | El orden de la lista del día no estaba decidido | Paré, decidí el orden y subí la spec a 1.1 (ver abajo) |
| 3 | `tests/api-reservas.test.js`, `src/controladores/controlador-reservas.js`, `src/rutas/reservas.js`, `src/app.js`, `tasks.md`, spec e índice (`Implementada`) | 16 → 16 | Verde | Un manejador de errores que nadie había pedido | Lo rechacé; el test de AC-05 comprueba ya el orden de la spec 1.1 |

## Hueco de la spec

**Ciclo 2.** Al leer el `git diff` del servicio vi que `listarReservasDelDia` devolvía las reservas en el orden en que se habían creado. RF-03 dice «todas las reservas de ese día», pero no en qué orden, y AC-05 las comprueba sin orden. Quien consulte la API lo nota: el orden de la lista se ve desde fuera, así que no lo puede decidir el agente ni el plan.

**Decisión** (como coordinación TIC): ordenadas por hora y, a la misma hora, por carro. Es como se lee el día en la sala de profesores: de 1.ª a 6.ª hora.

**Cambios, en el commit del ciclo 2:**

- Spec 1.1: RF-03 termina en «ordenadas por hora y, a la misma hora, por carro». Sigue `En implementación`: es un hueco pequeño que se decide en el momento.
- Plan: cita la spec 1.1, y D-11 y la fila de RF-03 de la estrategia de pruebas incluyen el orden.
- Tasks: T-03 cubre RF-03 «con el orden de la spec 1.1».
- Test: `RF-03: las ordena por hora y, a la misma hora, por carro`, en `tests/servicio-reservas.test.js`. Y en el ciclo 3, el test de AC-05 de la API compara la lista entera, en orden.

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Devolver la lista en el orden de creación | Rechazada | Decidía algo que se ve desde fuera; lo decidí en la spec 1.1 |
| Un manejador de errores global en `app.js` | Rechazada | No está en la task ni en la spec; si hace falta, irá a la spec (es lo que verás en la UD3) |
| `test.each` para las horas y los formatos no válidos | Aceptada | Es la forma de probar varios valores con el mismo resultado |
| Comparar los días como texto AAAA-MM-DD | Aceptada | Es lo que dice D-04 y evita las horas y las zonas horarias |

## Comprobación final

```text
 docs/specs/B-reservar-carro/plan.md       |   7 +-
 docs/specs/B-reservar-carro/spec.md       |   7 +-
 docs/specs/B-reservar-carro/tasks.md      |  16 +--
 docs/specs/README.md                      |   2 +-
 sesiones/ciclo-1.md                       | …
 sesiones/ciclo-2.md                       | …
 sesiones/ciclo-3.md                       | …
 src/app.js                                |   2 +
 src/controladores/controlador-reservas.js |  42 +++++++
 src/errores/error-conflicto.js            |   6 +
 src/repositorios/repositorio-reservas.js  |  28 +++++
 src/rutas/reservas.js                     |  11 ++
 src/servicios/servicio-reservas.js        |  87 ++++++++++++++
 src/utilidades/reloj.js                   |  13 +++
 tests/api-reservas.test.js                | 188 ++++++++++++++++++++++++++++++
 tests/reloj.test.js                       |  17 +++
 tests/servicio-reservas.test.js           | 165 ++++++++++++++++++++++++++
```

Todo viene de una task o de la carpeta de la feature (la spec 1.1, el plan y las tasks), más las sesiones exportadas.

## Commits

```text
*   <hash> Fusiona la feature B: reservar un carro
|\
| * <hash> Feature B: T-05 y T-06, API de reservas (implementada)
| * <hash> Feature B: T-03 y T-04, servicio de reservas; spec 1.1: orden de la lista del día
| * <hash> Feature B: T-01 y T-02, reloj con la hora peninsular
|/
* <hash> Proyecto de partida
```
