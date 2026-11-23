# Spec: Avisos de devolución

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Avisos de devolución |
| Estado  | ✅ Implementada      |
| Versión | 1.0                  |

> Esta spec describe el comportamiento **actual** del módulo `src/avisos.js` (spec-on-touch). Lo que producto ha decidido corregir está en «Fallos conocidos» y se cambiará en la versión 1.1.

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
- RF-05: El sistema deberá ordenar los avisos por el nombre del profesor, comparando el texto tal cual (las mayúsculas van antes que las minúsculas). *(Comportamiento actual; ver FC-01.)*

## Edge cases

- EC-01: Si el préstamo está `devuelto`, entonces el sistema no deberá avisar de él.
- EC-02: Si la fecha de salida es posterior a hoy, entonces el sistema no deberá avisar de él.
- EC-03: Si el préstamo está en cualquier otro estado distinto de `devuelto` (por ejemplo, `perdido`), entonces el sistema deberá avisar de él igualmente.

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

  Escenario: AC-04 No hay ningún aviso
    Dado un préstamo devuelto del portátil 9 a nombre de marta desde el 2027-02-10
    Cuando se generan los avisos
    Entonces el resultado es "Sin avisos"
```

---

## Fallos conocidos

Comportamientos que el módulo tiene hoy y que producto ha decidido **corregir** (versión 1.1). Hasta entonces, la spec los describe como están en los requisitos de arriba.

| Id | Qué pasa hoy | Qué quiere producto |
|----|--------------|---------------------|
| FC-01 | Los avisos se ordenan por el nombre del profesor (distinguiendo mayúsculas) y los de un mismo profesor salen en orden inverso al de entrada | Primero el préstamo más antiguo; a igual antigüedad, por profesor sin distinguir mayúsculas |
| FC-02 | Si el préstamo no tiene profesor, el aviso dice `con undefined` | Que diga `con un profesor desconocido` |
| FC-03 | Si la fecha de salida no es válida, el préstamo se omite sin avisar | Que falle con un error que diga qué préstamo tiene la fecha mal |
| FC-04 | Si «hoy» no es una fecha válida, el resultado es `Sin avisos` | Que falle con un error |

---

## Fuera de alcance

- Enviar el correo.
- Marcar un préstamo como avisado.
- Avisar a la persona que tiene el portátil.
