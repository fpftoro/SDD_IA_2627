# Plantilla de repositorio

Punto de partida del curso. **No fija ningún lenguaje**: tú pones la tecnología de tu módulo.

## Cómo usarla

1. Copia esta carpeta a un repositorio nuevo (`git init`) y haz un primer commit.
2. Rellena lo marcado con **RELLENA** en `constitution.md` y `AGENTS.md`: tecnología, comando de tests y carpeta de tests.
3. Si tus tests no viven en `tests/`, cambia esa carpeta en `.opencode/agents/probador.md` y `.opencode/agents/implementador.md`, y pon tu comando de tests donde dice `<comando de tests>`.
4. Abre OpenCode en la carpeta y comprueba los agentes y sus permisos: `opencode debug agents`.

## Qué contiene

| Fichero | Para qué |
|---------|----------|
| `constitution.md` | Reglas que no se negocian (capas, errores, pruebas, seguridad) |
| `AGENTS.md` | Comandos, estructura, flujo y prohibiciones |
| `opencode.json` | Carga la constitución, limita la terminal y no deja a los agentes salir del proyecto |
| `.opencode/agents/` | `arquitecto`, `probador` e `implementador` |
| `.opencode/commands/` | `/planificar`, `/escribir-tests`, `/implementar`, `/implementar-paralelo` y `/validar` |
| `docs/prd.md` | Qué problema resuelve el proyecto |
| `docs/specs/` | Índice de features y una carpeta por feature |
| `docs/plantillas/` | Plantillas de spec, plan y tasks |
