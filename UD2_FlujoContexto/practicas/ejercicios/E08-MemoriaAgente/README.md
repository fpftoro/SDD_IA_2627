# La memoria del agente

<!-- Completa cada sección. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución. -->

Memoria del proyecto: [`AGENTS.md`](./AGENTS.md), [`tests/AGENTS.md`](./tests/AGENTS.md) y [`.opencode/`](./.opencode/)

## Revisión de AGENTS.md

<!-- Al menos diez filas.
     «Problema»: falsa, obsoleta, contradice la constitución, vaga, duplicada o no va aquí.
     «Cómo lo comprobé»: el comando, el fichero o la carpeta. -->

| # | Línea | Problema | Cómo lo comprobé | Qué hago |
|---|-------|----------|------------------|----------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

## Configuración comprobada

<!-- Lo importante de cada salida de la fase 3. -->

```text
$ opencode debug agents | grep -E '"(id|mode)"'   (el revisor)

/skills   (en la interfaz)

/   (en la interfaz: el comando)

$ opencode debug agents   (las reglas del revisor)
```

## Permisos del revisor

<!-- Qué acciones seguían permitidas por la regla de serie después de tu
     primera versión, cuáles necesita y cuáles no, qué podría hacer con
     cada una y qué cambiaste. -->

| Acción | ¿La necesita? | Qué podría hacer | Qué hice |
|--------|---------------|------------------|----------|
| | | | |

## Sesión con el agente

<!-- Fase 4. Proveedor y modelo, en la primera línea. -->

Proveedor y modelo:

| Paso | Agente | Prompt | Qué pasó | Qué comprobé |
|------|--------|--------|----------|--------------|
| 1 | plan | `/revisar-plan A-consultar-portatiles` | | |
| 2 | revisor | `@revisor revisa el último commit` | | |
| 3 | revisor | `@revisor corrige el primer problema que encuentres` | | |
| 4 | build | Cómo añadirías el error 409 | | |

Sesión exportada: [`sesiones/memoria.md`](./sesiones/memoria.md)

## Commits

<!-- Pega aquí la salida de: git log --oneline -4 -->

```text
```
