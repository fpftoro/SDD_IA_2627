# E03 · Mi entorno con OpenCode

**Tipo:** autocorrección

Prepara el entorno de trabajo con un agente sobre un proyecto ya empezado: conecta un proveedor de modelos, genera y revisa el `AGENTS.md`, añade la constitución, configura los permisos y comprueba que el agente trabaja con ese contexto.

**Criterios:** OA1 c

## El caso

El proyecto del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)) ya tiene algo de código: una API con dos rutas para consultar los portátiles y sus tests. Esta carpeta **es** ese proyecto:

```text
E03-EntornoOpenCode/
├── .devcontainer/devcontainer.json   ← entorno del curso con OpenCode
├── constitution.md                   ← principios del proyecto (no la cambies)
├── docs/prd.md                       ← PRD del préstamo de portátiles
├── package.json
├── src/
│   ├── app.js
│   ├── servidor.js
│   ├── datos/portatiles.js
│   ├── rutas/portatiles.js
│   └── servicios/portatiles.js
├── test/portatiles.test.js
├── ENUNCIADO.md                      ← este fichero
└── README.md                         ← tu entrega
```

Antes de empezar a especificar funcionalidades con un agente, el equipo quiere el entorno listo: que el agente conozca las reglas del proyecto y la constitución, y que no pueda hacer nada peligroso sin preguntar. En este ejercicio **no se cambia el código**: solo se prepara el entorno.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`: el del tema 3 (apartado 3.3.1), que además instala las dependencias del proyecto. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. La primera vez tarda unos minutos.

Necesitas acceso a un proveedor de modelos: una cuenta del centro, un plan gratuito o un modelo local (tema 3, apartado 3.4). Ningún paso exige un modelo concreto.

## Requisitos

Haz un commit al final de cada fase, con el mensaje que se indica (puedes ampliarlo).

**Fase 1. Entorno y proveedor**

1. En la terminal del contenedor, comprueba que `opencode --version` muestra `v2.3.2` y que `npm test` pasa los cinco tests. Si la carpeta no es todavía un repositorio de Git, créalo con el proyecto tal como está:

   ```bash
   git init && git add . && git commit -m "Proyecto de partida"
   ```
2. Arranca OpenCode en la carpeta del ejercicio (`opencode`), conecta un proveedor con `/connect` y elige un modelo con `/models`. Si ya lo conectaste en otro ejercicio, no hace falta repetirlo: las credenciales están en el volumen `sdd-opencode`.
3. Completa la sección «Proveedor y modelo» del README. **Nunca** escribas tu clave en ningún fichero.

**Fase 2. `AGENTS.md` generado**

4. Con el agente *build*, ejecuta `/init`. Cuando termine, **no toques** el `AGENTS.md` que ha creado y haz el commit `AGENTS.md generado con /init`. Así quedará en el historial lo que propuso el agente.

**Fase 3. `AGENTS.md` revisado**

5. Revisa el `AGENTS.md` línea a línea y déjalo como quieres que sea. Puedes pedir ayuda al agente, pero las decisiones son tuyas. Al terminar, debe tener:
   - **Comandos:** instalar, arrancar y ejecutar los tests.
   - **Estructura:** para qué sirve cada carpeta de `src/` y `test/`.
   - **Convenciones:** módulos ES, identificadores en español, comillas simples, punto y coma y JSDoc en las funciones de los servicios.
   - **Prohibiciones:** al menos tres. Entre ellas, no añadir dependencias sin preguntar y no escribir claves ni contraseñas en el código.
   - **Ninguna regla que contradiga `constitution.md`.** Ojo: `/init` deduce las reglas del código, y si el código tiene alguna mala costumbre, puede haberla copiado como regla.
   - **Nada sobre el ejercicio** (`ENUNCIADO.md`, `README.md` de entrega): eso no es parte del proyecto.
   - **Nada que repita la constitución:** basta con una línea que diga que los principios del proyecto están en `constitution.md`.
   - Como mucho, unas 40 líneas.
6. Completa la sección «Revisión del AGENTS.md» del README con lo que has añadido, quitado o corregido, y por qué. Haz el commit `AGENTS.md revisado`.

**Fase 4. Configuración de OpenCode**

7. Crea `opencode.json` en la raíz con:
   - la constitución en `instructions`, para que el agente la cargue en todas las sesiones;
   - `permissions` con: cualquier comando de terminal **pregunta**; `npm test`, `git status`, `git diff` y `git log` (con cualquier argumento) permitidos sin preguntar; y cualquier `rm` **prohibido**. No añadas ninguna regla de `edit` (tema 3, apartado 3.8: anularía la prohibición de editar del agente *plan*).
8. Explica cada regla de permisos en la sección «Configuración de OpenCode» del README. Haz el commit `Configuración de OpenCode`.

**Fase 5. Comprobaciones**

9. Sal de OpenCode con `/exit` y vuelve a arrancarlo, para que lea la configuración nueva. Crea antes la carpeta de las sesiones: `mkdir -p sesiones`.
10. Haz estas pruebas **en una sesión nueva** (`/new`) y anota cada una en la tabla «Comprobaciones» del README:

    | # | Agente | Prompt |
    |---|--------|--------|
    | 1 | *plan* | `¿Qué reglas y principios tienes que respetar en este proyecto? Resúmelos en una lista.` |
    | 2 | *plan* | `¿Qué formato deben tener los errores de la API?` |
    | 3 | *plan* | `Revisa @src/rutas/portatiles.js y dime si cumple la constitución. No cambies nada.` |
    | 4 | *build* | `Ejecuta los tests del proyecto.` |
    | 5 | *build* | `Muéstrame el contenido de la carpeta src con ls -la.` |
    | 6 | *build* | `Borra la carpeta test con rm -r.` |

    Antes de cada prueba, escribe en la tabla qué esperas que pase según tu configuración; después, qué ha pasado. Si el agente te pide permiso para algo, **niégalo** en las pruebas 5 y 6.
11. Exporta la sesión con `/export`, en Markdown y a un fichero. OpenCode la guarda en la carpeta del proyecto con un nombre como `session-….md`: muévela a `sesiones/comprobaciones.md` (`mv session-*.md sesiones/comprobaciones.md`).
12. Comprueba con `git status` que la prueba 6 no ha borrado nada y que no hay ficheros que no esperabas. Si el agente ha cambiado algo, deshazlo (`/undo` o `git restore`).
13. Completa las secciones «Sesión con el agente», «Decisiones» y «Commits» del README. Haz el commit `Comprobaciones del entorno`.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `AGENTS.md` | En la raíz, revisado según el requisito 5 |
| `opencode.json` | En la raíz, con `instructions` y `permissions` según el requisito 7 |
| `constitution.md`, `src/`, `test/`, `docs/`, `package.json` | Sin cambios |
| `sesiones/comprobaciones.md` | La exportación de la sesión de comprobaciones |
| `README.md` | Secciones «Proveedor y modelo», «Revisión del AGENTS.md», «Configuración de OpenCode», «Comprobaciones», «Sesión con el agente», «Decisiones» y «Commits», con las tablas de la plantilla |
| Historial | Al menos cuatro commits propios, con los mensajes de las fases 2 a 5, en ese orden |

## Comprueba tu solución

- `git log --oneline` muestra los commits de las fases 2, 3, 4 y 5 en orden, y `git diff` entre los dos primeros enseña los cambios de tu revisión del `AGENTS.md`.
- Tu `AGENTS.md` no dice en ningún sitio que los errores se devuelvan con `msg`. Si la versión de `/init` lo decía, es una costumbre del código copiada como regla: la constitución manda `{ error: "mensaje" }`.
- `opencode debug config`, en la terminal del contenedor, muestra tu `instructions` y tus permisos. Si da un error, el JSON está mal escrito.
- `opencode debug agents` muestra las reglas de cada agente en el orden en que se aplican. En el agente `plan`, la última regla de `edit` con el recurso `*` es `deny`: *plan* sigue sin poder editar.
- En la prueba 2, el agente responde con el formato de la constitución. Si no, revisa `instructions` y vuelve a arrancar OpenCode.
- En la prueba 3, el agente encuentra que la ruta `/:id` devuelve `{ msg: 'not found' }`, en inglés y sin `error`. No lo corrijas: anótalo en «Decisiones» como algo que el proyecto tendrá que arreglar.
- En la prueba 4 los tests se ejecutan **sin** que OpenCode te pregunte; en la 5 **te pregunta**; en la 6 el comando se **rechaza** sin preguntar. Si no es así, revisa el orden de las reglas: gana la última que coincide. Si en la prueba 4 el agente usa otro comando (por ejemplo, `npx vitest run`) y te pregunta, tu configuración es correcta: anótalo, porque indica que el `AGENTS.md` no deja claro cómo se ejecutan los tests.
- Ningún fichero del repositorio contiene tu clave. Compruébalo con `git grep -F "<los primeros caracteres de tu clave>"`: no debe encontrar nada.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```

Tus credenciales de OpenCode no se borran: están en el volumen `sdd-opencode`, y las usarás en los siguientes ejercicios.
