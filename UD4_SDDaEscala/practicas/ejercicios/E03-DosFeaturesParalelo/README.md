# Dos features en paralelo

<!-- Completa cada sección. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución. -->

## Preparación

```text
<!-- Salida de git worktree list -->
```

## Comparación de los planes

### Ficheros

<!-- Una fila por fichero que cualquiera de los dos planes crea o modifica
     (incluye tests y app.js). En C y D: Nuevo, Modificado o —.
     «¿Choca?»: sí o no, y por qué. -->

| Fichero | C | D | ¿Choca? |
|---------|---|---|---------|
| | | | |

### Decisiones que toman los dos

<!-- Decisiones que cada plan toma por su cuenta y que son la misma. -->

| Qué se decide | En el plan de C | En el plan de D |
|---------------|-----------------|-----------------|
| | | |

## La predicción

<!-- Qué pasaría con Git si se implementaran a la vez, fichero a fichero,
     y qué ficheros se fusionarían solos. -->

```text
<!-- Salida de git merge prueba-D y de git status --short -->
```

- **Contraste con la predicción:**
- **Por qué un fichero se funde sin conflicto:**

## Orden y replanificación

- **Va primero:**
- **Qué se puede hacer en paralelo y qué no:**
- **Por qué el plan de la otra no se aprueba antes de traer `main`:**
- **Qué cambia en el plan y en las tasks de la segunda:**

## Sesión con el agente

<!-- Una fila por paso. -->

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | `arquitecto` (C) | | | |
| 2 | `arquitecto` (D) | | | |
| 3 | `arquitecto` (D, replanificar) | | | |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| | | |

## Cierre

```text
<!-- git log --oneline --graph --all -->
```

```text
<!-- git branch --no-merged main -->
```

## Commits

```text
<!-- git log --oneline --first-parent main -->
```
