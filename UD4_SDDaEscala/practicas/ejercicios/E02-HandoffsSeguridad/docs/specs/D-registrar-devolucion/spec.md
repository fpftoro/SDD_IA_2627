# Spec · D · Registrar la devolución

| Campo | Valor |
|-------|-------|
| Feature | D · Registrar la devolución |
| Versión | 1.0 |
| Estado | 🔜 Aprobada |

## Contexto

Cuando un grupo devuelve un portátil, el profesorado lo anota para saber quién lo tiene en cada momento y si falta algo.

## Requisitos funcionales

- **RF-01:** El sistema deberá permitir registrar la devolución de un portátil prestado.
- **RF-02:** Cuando se registre una devolución, el sistema deberá guardar la fecha (AAAA-MM-DD) y si el cargador se ha devuelto.
- **RF-03:** Cuando se registre una devolución, el sistema deberá dejar el portátil como disponible.

## Edge cases

- **EC-01:** Si el préstamo no existe, entonces el sistema deberá responder 404 con el error `El préstamo no existe`.
- **EC-02:** Si el préstamo ya está devuelto, entonces el sistema deberá responder 409 con el error `El préstamo ya está devuelto` y no cambiar nada.
- **EC-03:** Si la fecha no tiene el formato AAAA-MM-DD, entonces el sistema deberá responder 400 con el error `La fecha no es válida`.

## Fuera de alcance

- Anotar una incidencia por el cargador que falta (feature E).
