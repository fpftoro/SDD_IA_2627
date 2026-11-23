# Spec: Avisos de devolución

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Avisos de devolución |
| Estado  | ✅ Implementada      |
| Versión | 1.1                  |

> La versión 1.0 describía el comportamiento que tenía el módulo `src/avisos.js` (spec-on-touch). La versión 1.1 corrige los cuatro fallos conocidos, con el cambio `avisos-ordenados-y-robustos` de OpenSpec.

---

## Contexto

Cada mañana, la coordinación TIC recibe por correo un texto con los portátiles que llevan demasiado tiempo fuera. Un script llama a `generarAvisos(prestamos, hoy)` con la lista de préstamos y la fecha de hoy (`AAAA-MM-DD`) y pega el resultado en el correo.

**Historia de usuario:** como coordinación TIC, quiero recibir cada mañana la lista de portátiles que llevan una semana o más fuera para reclamarlos.

Cada préstamo tiene los campos `id`, `portatil`, `profesor`, `fechaSalida` (`AAAA-MM-DD`), `cargador` (verdadero o falso) y `estado`.

---

## Requisitos funcionales

- RF-01: El sistema deberá generar un aviso por cada préstamo cuyo estado no sea `devuelto` y que lleve 7 o más días fuera, contando los días completos entre la fecha de salida y hoy.
- RF-02: El sistema deberá redactar cada aviso como `El portátil <portatil> lleva <días> días con <profesor>`, y añadir ` (sin cargador)` cuando el cargador del préstamo es falso.
- RF-03: El sistema deberá devolver los avisos como un único texto, con un aviso por línea.
- RF-04: Cuando no haya ningún aviso, el sistema deberá devolver el texto `Sin avisos`.
- RF-05: El sistema deberá ordenar los avisos por antigüedad, con el préstamo más antiguo primero; a igual antigüedad, por el nombre del profesor sin distinguir mayúsculas; y a igualdad total, en el orden en que llegaron los préstamos.
- RF-06: Cuando un préstamo no tenga profesor, el sistema deberá redactar `con un profesor desconocido`.
- RF-07: Si la fecha de salida de un préstamo no devuelto no es válida, entonces el sistema deberá lanzar un error `La fecha de salida del préstamo <id> no es válida`; y si la fecha de hoy no es válida, un error `La fecha de hoy no es válida`.

## Edge cases

- EC-01: Si el préstamo está `devuelto`, entonces el sistema no deberá avisar de él.
- EC-02: Si la fecha de salida es posterior a hoy, entonces el sistema no deberá avisar de él.
- EC-03: Si el préstamo está en cualquier otro estado distinto de `devuelto` (por ejemplo, `perdido`), entonces el sistema deberá avisar de él igualmente.
- EC-04: Si un préstamo devuelto tiene una fecha de salida inválida, entonces el sistema no deberá lanzar ningún error ni avisar de él.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Avisos de devolución

  Antecedentes:
    Dado que hoy es el 2027-03-10

  Escenario: AC-01 Avisar de un portátil que lleva más de una semana fuera
    Dado un préstamo activo del portátil 4 a nombre de ana desde el 2027-02-01
    Cuando se generan los avisos
    Entonces el resultado es "El portátil 4 lleva 37 días con ana"

  Escenario: AC-02 El límite son 7 días
    Dado un préstamo activo del portátil 1 a nombre de ana desde el 2027-03-03
    Y un préstamo activo del portátil 2 a nombre de luis desde el 2027-03-04
    Cuando se generan los avisos
    Entonces el resultado es "El portátil 1 lleva 7 días con ana"

  Escenario: AC-03 Avisar de que falta el cargador
    Dado un préstamo activo del portátil 7 a nombre de luis desde el 2027-03-01 sin cargador
    Cuando se generan los avisos
    Entonces el resultado es "El portátil 7 lleva 9 días con luis (sin cargador)"

  Escenario: AC-05 El préstamo más antiguo va el primero
    Dado un préstamo activo del portátil 1 a nombre de ana desde el 2027-03-01
    Y un préstamo activo del portátil 2 a nombre de luis desde el 2027-01-01
    Cuando se generan los avisos
    Entonces el primer aviso es el del portátil 2

  Escenario: AC-04 No hay ningún aviso
    Dado un préstamo devuelto del portátil 9 a nombre de marta desde el 2027-02-10
    Cuando se generan los avisos
    Entonces el resultado es "Sin avisos"
```

---

## Fallos corregidos en la versión 1.1

Los cuatro fallos conocidos de la versión 1.0, ya corregidos.

| Id | Qué pasaba | Cómo queda |
|----|------------|------------|
| FC-01 | Orden por el nombre del profesor, distinguiendo mayúsculas, y en orden inverso para un mismo profesor | RF-05 |
| FC-02 | Sin profesor, el aviso decía `con undefined` | RF-06 |
| FC-03 | Una fecha de salida inválida se omitía en silencio | RF-07 |
| FC-04 | Un «hoy» inválido daba `Sin avisos` | RF-07 |

---

## Fuera de alcance

- Enviar el correo.
- Marcar un préstamo como avisado.
- Avisar a la persona que tiene el portátil.
