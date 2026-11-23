---
marp: true
theme: sdd
paginate: true
lang: es
title: "El entorno de trabajo: OpenCode"
description: Diapositivas del tema 3 de la UD1 de Desarrollo guiado por especificaciones con IA
footer: "UD1 · Tema 3 · El entorno de trabajo: OpenCode"
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD1 · Tema 3

# El entorno de trabajo: OpenCode

Criterios de evaluación: **OA1 c**

---

# Al terminar sabrás…

1. Que el **modelo** genera respuestas y el **agente**, el arnés (*harness*) que lo rodea, prepara el contexto, usa herramientas y repite hasta terminar.
2. Conectar un proveedor con `/connect` y `/models`, **sin que las claves lleguen al repositorio**.
3. Que ***plan*** analiza sin modificar y ***build*** implementa.
4. Dar al agente **contexto y límites**: `AGENTS.md`, la constitución y los permisos.

---

# Antes de escribir specs hay que preparar al agente

<div class="flujo">
<div>Dev Container con OpenCode</div>
<div>Proveedor conectado</div>
<div><code>AGENTS.md</code> y constitución</div>
<div class="destacada">Contexto comprobado en <em>plan</em></div>
<div><em>Commit</em></div>
</div>

- Es el recorrido del tema, con el proyecto de la **lista de tareas**.
- Al terminar, el proyecto tiene configuradas las **dos primeras capas** de contexto.

> Un agente sin contexto ni límites decide por su cuenta **y actúa sin preguntar**.

---

# El modelo genera respuestas; el agente actúa sobre el proyecto

<div class="columnas">
<div>

## Modelo

- Recibe un texto y genera una respuesta.
- **No ve** tus ficheros ni ejecuta nada.
- Lo ofrece un **proveedor**, o tu equipo si es local.

</div>
<div>

## Agente

- Lee tus ficheros y **prepara el contexto**.
- Se lo envía al modelo.
- **Ejecuta** lo que el modelo pide, en varios pasos.
- Es el **arnés (*harness*)** del modelo.

</div>
</div>

> El mismo agente funciona con **modelos distintos**, y el mismo modelo, desde agentes distintos.

---

# El agente va y viene entre el modelo y tu proyecto

```text
Tú     → Agente    Añade la validación de la spec
Agente → Proyecto  Lee AGENTS.md, la spec y el código
Agente → Modelo    Contexto + petición
Modelo → Agente    Quiero editar src/tareas.js
Agente → Proyecto  Edita el fichero
Modelo → Agente    Quiero ejecutar npm test
Agente → Proyecto  Ejecuta los tests
Agente → Tú        Resumen de lo hecho
```

<div class="nota">

Un mal resultado casi siempre empieza por un **contexto pobre**: una spec incompleta o unas reglas ausentes.

</div>

---

# El modelo no toca el proyecto: pide herramientas al agente

| Herramienta | Qué hace |
|-------------|----------|
| Leer (*read*) | Lee el contenido de un fichero |
| Buscar (*glob*, *grep*) | Busca ficheros por nombre o por contenido |
| Editar (*edit*, *write*) | Modifica o crea ficheros |
| Terminal (*bash*) | Ejecuta comandos: tests, instalaciones, Git |
| Web (*webfetch*) | Descarga una página para consultarla |

Cada herramienta tiene un **permiso**: sin preguntar, con confirmación o prohibida.

---

# OpenCode se usa en un Dev Container, igual para todo el grupo

| Clave de `devcontainer.json` | Para qué sirve |
|------------------------------|----------------|
| `image` | Imagen con Node.js, npm y Git |
| `remoteUser` | Trabajas como `node`, no como administrador |
| `mounts` | Volumen `sdd-opencode`: credenciales y sesiones |
| `postCreateCommand` | Instala OpenCode con una **versión fijada** |

- El volumen sobrevive al contenedor: conectas el proveedor **una sola vez**.
- La versión se fija para que los enunciados funcionen **igual para todos**.

---

# `/connect` conecta el proveedor y `/models` elige el modelo

```text
/connect      eliges el proveedor y pegas tu clave de API
/models       eliges el modelo
```

- Para **planificar** y revisar specs: un modelo con buen razonamiento.
- Para **tareas sencillas**: uno más rápido y barato suele bastar.
- Ningún ejercicio exige un modelo concreto.

<div class="cuidado">

Conecta OpenCode **directamente** a cada proveedor, sin pasarelas: así sabes siempre quién recibe tu código.

</div>

---

# Las claves viven fuera del proyecto y nunca van al repositorio

- `/connect` guarda la clave en la base de datos de OpenCode, **fuera del proyecto**: en el curso, en el volumen `sdd-opencode`.
- La clave **nunca** va en `opencode.json`, ni en el código, ni en el README.
- En un equipo compartido, el siguiente encontraría tu clave: borra el volumen **al terminar cada sesión**:

```bash
docker volume rm sdd-opencode
```

<div class="cuidado">

Si una clave acaba en un *commit*, **cámbiala en el proveedor**: borrar el *commit* no basta.

</div>

---

# En una sesión, `@` referencia ficheros y `!` ejecuta comandos

```text
Revisa @docs/specs/A-añadir-tarea/spec.md
!npm test
```

| Escribes… | Qué hace |
|-----------|----------|
| `@` | Busca un fichero del proyecto y lo añade al mensaje |
| `!` al principio | Ejecuta un comando y añade su salida a la conversación |

> Referencia con `@` en lugar de pegar: el agente lee la **versión actual** y tu mensaje queda corto.

---

# Los comandos de sesión te devuelven el control

| Comando | Qué hace |
|---------|----------|
| `/new` | Empieza una sesión nueva, con el contexto limpio |
| `/sessions` | Lista las sesiones anteriores para volver a una |
| `/undo` | Deshace el último mensaje **y sus cambios en los ficheros** |
| `/compact` | Resume la sesión para liberar contexto |
| `/export` | Exporta la conversación a Markdown |

<div class="nota">

Una **sesión nueva** por fase o grupo de tareas: una sesión larga acumula intentos fallidos que confunden al modelo.

</div>

---

# `Mayús+Tab` cambia entre *plan*, que analiza, y *build*, que implementa

| Agente | Para qué | Qué puede hacer |
|--------|----------|-----------------|
| ***build*** | Implementar | Lee, edita y ejecuta comandos. Es el agente por defecto |
| ***plan*** | Analizar y planificar | Lee y busca. **No puede editar** los ficheros del proyecto |

- En una esquina inferior ves qué agente y qué modelo están activos.
- Cada agente puede tener **su propio modelo**.

<div class="cuidado">

*Plan* no edita, pero **sí ejecuta comandos** si no los limitas con permisos.

</div>

---

# Primero se planifica y después se construye

<div class="flujo">
<div>Spec revisada</div>
<div class="destacada">Agente <em>plan</em>: propone el plan, no toca el código</div>
<div>¿Plan aprobado?<br>Si no, se repite</div>
<div>Agente <em>build</em>: implementa</div>
<div>Revisas los cambios</div>
</div>

> Trabajas en *plan* hasta que el plan te convence; **solo entonces** cambias a *build*.

Para guardar el plan en un fichero del proyecto, pídeselo a *build* o cópialo tú: *plan* no puede.

---

# `/init` genera un borrador de `AGENTS.md`: revísalo

```text
/init
```

- Analiza el repositorio y crea o actualiza `AGENTS.md` con lo que encuentra: comandos, estructura y convenciones.
- En un proyecto vacío, **escríbelo tú** desde el principio.

<div class="cuidado">

Describe lo que el agente **ha deducido** del código, no lo que **tú quieres**: las malas costumbres del proyecto las copia como reglas. Revísalo antes del *commit*.

</div>

---

# La constitución se carga con `instructions` en `opencode.json`

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["constitution.md"]
}
```

- OpenCode lee `AGENTS.md` solo, pero **no sigue los enlaces** que haya dentro.
- Lo que pongas en `instructions` se suma a `AGENTS.md` en **cada sesión**.

| Nivel | Fichero | Se sube al repositorio |
|-------|---------|------------------------|
| Proyecto | `AGENTS.md` y `opencode.json` | Sí: lo comparte el equipo |
| Global | `AGENTS.md` de tu configuración | No: son tus preferencias |

---

# Los permisos deciden qué hace el agente sin preguntar

<div class="columnas">
<div>

```json
{
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "npm test", "effect": "allow" },
    { "action": "shell", "resource": "git status", "effect": "allow" },
    { "action": "shell", "resource": "rm *", "effect": "deny" }
  ]
}
```

</div>
<div>

- `allow`: sin preguntar.
- `ask`: pregunta antes.
- `deny`: prohibido.

Primero la regla general y después las excepciones: **gana la última que coincide**.

</div>
</div>

<div class="cuidado">

No añadas una regla `edit` en `allow`: le quitaría a *plan* la prohibición de editar.

</div>

---

# Comprueba que el agente tiene el contexto

<div class="prueba">

Con el agente *plan* activo, pregunta: «¿Qué reglas y principios tienes que respetar en este proyecto?». ¿Aparece lo que escribiste en la constitución? Si falta, ¿qué fichero revisas?

</div>

<div class="prueba">

Escribe las reglas de `permissions` para que el agente ejecute sin preguntar `npm test` y `git diff`, pregunte por cualquier otro comando y **nunca** pueda ejecutar `git push`.

</div>

---

# Lo que aprendes con OpenCode vale para otros agentes

<div class="transferencia">

En Claude Code, Copilot o Cursor cambian los nombres de los comandos, pero las ideas son las mismas: un **modelo** conectado, un fichero de **reglas**, un modo de **planificar** antes de implementar y **permisos**.

</div>

- `AGENTS.md` es un formato abierto: lo leen OpenCode y la mayoría de agentes.
- Si el proyecto solo tiene un `CLAUDE.md`, OpenCode también lo usa.

> Los comandos pueden cambiar con las versiones: consulta la ayuda con `/help`.

---

<!-- _class: cierre -->

# Quédate con esto

1. El **modelo** genera respuestas; el **agente**, su arnés (*harness*), prepara el contexto y ejecuta las herramientas.
2. `/connect` y `/models` conectan el proveedor; las claves **nunca** van al repositorio.
3. ***Plan*** analiza sin modificar y ***build*** implementa: se cambia con `Mayús+Tab`.
4. `AGENTS.md` (con `/init`, revisado) y la constitución (con `instructions`) le dan **contexto**.
5. Los **permisos** (`allow`, `ask`, `deny`) le ponen **límites**.

---

# Para practicar

- **Tema 3 de la unidad:** sigue paso a paso el ejemplo integrador del apartado 3.10 y repasa las buenas prácticas del apartado 3.9.
- **Ejercicio E03, «Mi entorno con OpenCode»:** Dev Container, proveedor, `AGENTS.md`, constitución y permisos, comprobados con el agente *plan*.

En el tema 4 aprenderás a delimitar ***features***, la unidad de trabajo de una spec.
