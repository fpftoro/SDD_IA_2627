# Ampliar un proyecto existente

<!-- Completa cada sección. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución. -->

## Gobierno

<!-- Quién aprueba cada punto de control de la feature C. -->

| Punto de control | Aprueba | Participa | Qué mira |
|------------------|---------|-----------|----------|
| 1 · Spec | | | |
| 2 · Plan | | | |
| 3 · Tasks | | | |
| 4 · Ciclos | | | |
| Fusión | | | |

## Seguridad

```text
<!-- opencode debug agents | node herramientas/permisos.mjs implementador -->
```

- **Por qué `subagent` en `deny`:**
- **Si pudiera editar `tests/`:**
- **Agentes que no pueden editar código:**

## Comparación de los planes

### Ficheros

| Fichero | C | D | ¿Choca? |
|---------|---|---|---------|
| | | | |

### Decisiones que toman los dos

| Qué se decide | En el plan de C | En el plan de D |
|---------------|-----------------|-----------------|
| | | |

## Orden y replanificación

- **Va primero:**
- **Qué se puede hacer en paralelo y qué no:**
- **Qué cambia en el plan de la segunda:**

## *Handoffs*

<!-- Del arquitecto al implementador, grupo 3 de la feature C. -->

```text
```

## Constitución

```markdown
## Cambio de la constitución

- **Qué cambia:**
- **Por qué:**
- **A qué afecta:**
- **Qué hay que hacer:**
```

## Auditoría

```text
<!-- npm run trampas, npm run estado y git log --oneline --graph -->
```

### Antipatrones

<!-- Tres: que tuviste o que evitaste, con evidencia de tu repositorio. -->

| Antipatrón | Lo tuve o lo evité | Evidencia | Qué lo evitó o lo corrigió |
|------------|--------------------|-----------|----------------------------|
| | | | |

### Qué leí

| Cambio | Riesgo | Cuánto leí |
|--------|--------|------------|
| | | |

### Avalancha

<!-- Cinco personas, cinco features a la vez: qué límites pondrías. -->

## Sesión con el agente

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | `arquitecto` (plan de C) | | | |
| 2 | `arquitecto` (plan de D) | | | |
| 3 | `implementador` (C) | | | |
| 4 | `arquitecto` (replanificar D) | | | |
| 5 | `implementador` (D) | | | |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| | | |

## Commits

```text
<!-- git log --oneline --first-parent main -->
```
