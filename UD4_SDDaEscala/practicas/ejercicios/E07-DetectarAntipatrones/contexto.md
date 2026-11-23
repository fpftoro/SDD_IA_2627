# Contexto

El equipo del préstamo de portátiles tiene una *pull request* esperando revisión: la rama `feature/F-cancelar-reserva`, de la feature F («Cancelar una reserva»). Quien la ha hecho te pide que la audites antes de fusionarla. El proyecto es el del préstamo con las features A y B ya en `main` (API en capas, tests con Vitest, constitución y `AGENTS.md` como siempre).

## Lo que dicen la constitución y `AGENTS.md`

- Capas: rutas → controladores → servicios → repositorios. Solo los repositorios acceden a los datos.
- **Las reservas y los préstamos no se borran nunca: se cambia su estado.**
- Errores `{ error: "mensaje" }`, en español, con el código HTTP adecuado y con las clases de `src/errores/`.
- Los tests se escriben antes que el código; cada requisito y cada *edge case* tiene su test.
- No se modifican los tests para que pasen; no se cambia el estado de una spec ni del índice (lo hace una persona).

## Lo que dice producto (la coordinación TIC)

- Un profesor solo puede cancelar **sus** reservas; la coordinación TIC puede cancelar cualquiera. Si un profesor intenta cancelar la de otro, error 403 con `Solo puedes cancelar tus reservas`.
- Una reserva cancelada **no se borra**: queda con el estado `cancelada` y desaparece de la lista del día. Cancelar una reserva que no existe: 404 con `La reserva no existe`. Cancelar una ya cancelada: 409 con `La reserva ya está cancelada`.
- Se responde 200 con la reserva, con sus campos de siempre y `estado: "cancelada"`.

## Cómo auditarla

La rama está en `repositorio.bundle`, un repositorio de Git en un solo fichero. Clónalo **fuera** de esta carpeta (no lo metas en tu repositorio de entrega):

```bash
git clone repositorio.bundle ../auditoria
cd ../auditoria
git switch feature/F-cancelar-reserva
```

Tienes Git y `sh`; no hace falta instalar nada para auditar. **No ejecutes** el código de la rama: se audita leyendo y con Git.
