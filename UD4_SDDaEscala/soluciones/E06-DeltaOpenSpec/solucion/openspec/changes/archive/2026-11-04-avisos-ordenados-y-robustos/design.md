## Context

El módulo ya está dividido en capas (refactorización anterior): `prestamosConAviso` selecciona, `ordenarAvisos` ordena y `generarAvisos` redacta. Los tests de caracterización fijan el comportamiento actual, incluidos los cuatro fallos.

## Goals / Non-Goals

**Goals:**
- Corregir los cuatro fallos conocidos, cada uno con su test.
- No cambiar nada más: el límite de 7 días, «Sin avisos» y el resto se conservan.

**Non-Goals:**
- Enviar el correo o marcar un préstamo como avisado.
- Cambiar el formato del texto de cada aviso.

## Decisions

- **Ordenar con una sola función de comparación** (`dias` descendente y después el nombre en minúsculas con `localeCompare`) sobre una copia del array. La ordenación de JavaScript es estable, así que a igualdad total queda el orden de entrada. *Alternativa descartada:* ordenar dos veces; más difícil de leer y de probar.
- **Errores con `ErrorValidacion`**, la clase que ya usa el resto del proyecto. *Alternativa descartada:* devolver un aviso que diga «fecha inválida»; producto prefiere que falle.
- **El error de «hoy» se comprueba antes del bucle**, así se lanza también con la lista vacía.
- **Un préstamo devuelto no se valida**: no se avisa de él, así que su fecha no importa.

## Risks / Trade-offs

- Un script que llamaba al módulo y no esperaba excepciones ahora fallará con datos inválidos; es lo que pidió producto. → El script debe capturar el error y mostrarlo.
