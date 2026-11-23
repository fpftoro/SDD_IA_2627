# Un cambio con delta de OpenSpec

<!-- Completa cada sección. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución. -->

## Qué instala OpenSpec

<!-- Una fila por cosa que aparece en git status. -->

| Qué aparece | Para qué sirve |
|-------------|----------------|
| | |

## Refactorización

<!-- Qué se movió a dónde, y la prueba de que los tests no cambiaron. -->

| Fichero | Qué contiene ahora |
|---------|--------------------|
| `src/avisos.js` | |
| `src/servicios/servicio-avisos.js` | |
| `src/utilidades/dias.js` | |

```text
<!-- npm test (14 en verde) y git diff --stat main -- tests (vacío) -->
```

## Sesión con el agente

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | `implementador` | | | |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| | | |

## La delta

<!-- Qué hace cada sección de la delta (MODIFIED, ADDED) y qué te enseñó la validación. -->

| Sección | Requisito | Por qué esa sección |
|---------|-----------|---------------------|
| | | |

- **Qué enseñó el error de validación (si lo hubo):**

## Tests

<!-- Los de la caracterización que se retiran y los del cambio que los sustituyen. -->

| Retirado | Lo sustituye | Por qué |
|----------|--------------|---------|
| | | |

- **Rojo antes de implementar:** (qué fallaba y qué ya pasaba)

## Refactorizar y cambiar por separado

<!-- Por qué en dos ciclos, y qué habría pasado si se hubieran mezclado. -->

## Commits

```text
<!-- git log --oneline --graph -->
```
