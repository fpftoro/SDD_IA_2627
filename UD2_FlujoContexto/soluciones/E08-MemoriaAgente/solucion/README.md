# La memoria del agente

Memoria del proyecto: [`AGENTS.md`](./AGENTS.md), [`tests/AGENTS.md`](./tests/AGENTS.md) y [`.opencode/`](./.opencode/)

## Revisión de AGENTS.md

| # | Línea | Problema | Cómo lo comprobé | Qué hago |
|---|-------|----------|------------------|----------|
| 1 | «El proyecto todavía no tiene código» | Obsoleta | `ls src/ tests/`: la feature A está implementada | La quito; el índice dice qué está implementado |
| 2 | `npm run test:watch` | Falsa | No está en los scripts de `package.json` (`npm run` los lista) | La quito |
| 3 | `npm run lint` | Falsa | Tampoco está; el proyecto no tiene linter | La quito |
| 4 | `npm start` en el puerto 8080 | Falsa | `src/servidor.js` usa `PUERTO` o 3000 | 3000 |
| 5 | `src/models/` | Falsa | La carpeta no existe | La quito |
| 6 | `test/` | Falsa | La carpeta es `tests/` | `tests/` |
| 7 | Estructura incompleta | Falta lo que el agente necesita: `src/errores/` y `src/middlewares/usuario-actual.js` | `ls src/` | Las añado |
| 8 | Falta `npm run estado` | Comando que existe y no está | `package.json` | Lo añado |
| 9 | Sección «Principios» | Duplicada: repite la constitución, que ya se carga con `instructions` en `opencode.json` | `opencode.json` | La quito |
| 10 | «Escribe buen código y que sea fácil de mantener» | Vaga: no dice nada que se pueda cumplir o comprobar | — | La quito |
| 11 | «Valida los datos de la petición en el controlador» | Contradice la constitución: los controladores no tienen lógica de negocio | `constitution.md`, «Arquitectura» | La quito: ya lo dice la constitución |
| 12 | «Los errores se devuelven como `{ message }`» | Contradice la constitución: `{ error: "mensaje" }` en español | `constitution.md`, «API» | La quito |
| 13 | «Al terminar… cambia el estado a `Implementada`» | Contradice la regla del flujo: el estado lo cambia una persona (UD2, tema 4) | — | La sustituyo por la prohibición contraria |
| 14 | «Puedes añadir las dependencias que necesites» | Contradice la constitución, que no deja añadirlas sin acordarlo | `constitution.md`, «Tecnología» | La sustituyo por la prohibición |
| 15 | Falta «Al empezar una sesión» | El agente no sabe por dónde empezar | — | «Lee `docs/specs/README.md`» |

## Configuración comprobada

Comprobado con OpenCode 2.3.2, sin proveedor conectado:

```text
$ opencode debug agents | grep -E '"(id|mode)"'   (el revisor)
    "id": "revisor",
    "mode": "subagent",

/skills   (en la interfaz)
error-api

/   (en la interfaz: el comando)
/revisar-plan   Revisa el plan de una feature con la lista del punto de control 2, sin cambiarlo

$ opencode debug agents   (las reglas del revisor)
*          *               allow     ← de serie: lo que no se prohíbe, se permite
read       *.env           ask
…                                    ← las del proyecto (opencode.json)
edit       *               deny      ← las del revisor, que van detrás y ganan
shell      *               deny
shell      npm test        allow
shell      git status      allow
shell      git diff *      allow
shell      git log *       allow
subagent   *               deny
webfetch   *               deny
websearch  *               deny
```

## Permisos del revisor

Con la primera versión (solo `edit` y `shell`), el revisor no tenía ninguna regla de `subagent`, `webfetch` ni `websearch`, así que la regla de serie (`*` con `*` en `allow`) se las permitía.

| Acción | ¿La necesita? | Qué podría hacer | Qué hice |
|--------|---------------|------------------|----------|
| `subagent` | No | Encargar trabajo a otro agente, por ejemplo a `general`, que **sí** puede editar. La regla de `edit` del revisor no protegería nada | Regla `subagent` en `deny` |
| `webfetch` | No | Descargar páginas de internet: no lo necesita para revisar el repositorio | Regla `webfetch` en `deny` |
| `websearch` | No | Buscar en internet: igual | Regla `websearch` en `deny` |
| `read`, `glob`, `grep` | Sí | Leer y buscar en el repositorio: es su trabajo | Las dejo |
| `skill` | Puede servirle | Cargar una skill del proyecto (solo lectura) | La dejo |

## Sesión con el agente

Proveedor y modelo: <proveedor>/<modelo>

> Ejemplo comentado: cada sesión es distinta.

| Paso | Agente | Prompt | Qué pasó | Qué comprobé |
|------|--------|--------|----------|--------------|
| 1 | plan | `/revisar-plan A-consultar-portatiles` | Informe línea por línea de la lista; termina en «se puede aprobar» | `git status`: nada cambiado |
| 2 | revisor | `@revisor revisa el último commit` | Lee el `git diff` y ejecuta `npm test`; informe sin problemas | Que solo ejecutó comandos permitidos |
| 3 | revisor | `@revisor corrige el primer problema que encuentres` | El revisor intenta editar y OpenCode rechaza la edición (permiso denegado); responde con el informe | `git status`: nada cambiado. No es que obedeciera: no puede |
| 4 | build | Cómo añadirías el error 409 | Carga la skill `error-api` y explica los pasos: `ErrorConflicto` en `src/errores/`, lanzado desde el servicio, traducido en el controlador y con sus dos tests | Que mencionó la skill en la sesión exportada |

Sesión exportada: `sesiones/memoria.md` (no incluida en la solución).

## Commits

```text
<hash> README y sesión del E08
<hash> Memoria del agente: regla de tests, skill, comando y revisor
<hash> AGENTS.md revisado
<hash> Proyecto de partida
```
