---
marp: true
theme: sdd
paginate: true
lang: es
title: Artefactos y capas de contexto
description: Diapositivas del tema 2 de la UD1 de Desarrollo guiado por especificaciones con IA
footer: UD1 · Tema 2 · Artefactos y capas de contexto
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD1 · Tema 2

# Artefactos y capas de contexto

Criterios de evaluación: **OA1 b**

---

# Al terminar sabrás…

1. Para qué sirven el **prompt**, el **PRD**, el **SRS** y la **spec**, y por qué la spec une el porqué del PRD y la precisión del SRS.
2. Que los ***edge cases*** que no están en la spec **los decide el agente**.
3. Las **tres capas de contexto** del agente: reglas (`AGENTS.md`), constitución y spec.

---

# Confundir los artefactos repite información o mete ruido

Un **artefacto** es un documento del proceso con un propósito concreto. Errores frecuentes al empezar:

- Meter en una spec las **convenciones de todo el proyecto**: hay que repetirlas en cada spec.
- Escribir en las reglas del proyecto detalles de **una sola funcionalidad**: molestan en todas las demás.
- Creer que un **prompt largo** ya es una spec.

> De cada artefacto: para qué sirve, cuánto dura y quién lo lee.

---

# El prompt es transitorio: sirve para tareas pequeñas

```text
Añade una columna con la fecha de creación a la tabla de tareas.
```

- **Transitorio:** desaparece al cerrar la conversación.
- **No se versiona:** nadie puede revisarlo después.
- **Sin estructura:** el agente no puede consultarlo en otra sesión.

<div class="cuidado">

Un prompt de tres párrafos **sigue siendo un prompt**: le faltan estructura, revisión y un lugar en el repositorio.

</div>

---

# El PRD dice qué y por qué, pero no basta para programar

```markdown
# PRD: Lista de tareas compartida

## Objetivo
Que un equipo pequeño comparta una lista de tareas.

## Problema
Hoy las tareas se apuntan en un chat y se pierden entre mensajes.

## Casos de uso
- Añadir una tarea. Ver la lista. Marcar como hecha. Borrar.
```

Aporta **la razón** de cada funcionalidad. No dice qué pasa si el texto está vacío ni qué devuelve la API.

---

# El SRS aporta precisión, pero describe todo el sistema

```markdown
RF-03. El sistema permitirá añadir una tarea con un texto de hasta
280 caracteres. La tarea se almacenará con identificador, texto,
estado y fecha de creación.

RNF-02. El tiempo de respuesta de cualquier operación será inferior
a 200 ms con 50 usuarios simultáneos.
```

- Requisitos **funcionales** y **no funcionales**, con precisión técnica.
- Muy formal y largo: se escribe **para personas**, que lo consultan de vez en cuando.

---

# La spec une el porqué del PRD y la precisión del SRS

<div class="columnas-3">
<div>

## Del PRD

El **porqué**: el contexto y el objetivo de la funcionalidad.

</div>
<div>

## Del SRS

La **precisión**: requisitos verificables, casos límite y restricciones.

</div>
<div>

## Para el agente

**Una funcionalidad** por spec, en Markdown y versionada con el código.

</div>
</div>

> La spec describe el **comportamiento esperado de una funcionalidad** y sirve de contrato para el agente.

---

# Cada artefacto tiene su alcance y su sitio

| | PRD | SRS | Spec (SDD) |
|---|---|---|---|
| **Orientación** | Negocio y usuario | Técnica | Comportamiento |
| **Lo lee** | Producto, dirección | Ingenieros | El agente y el equipo |
| **Alcance** | Producto | Sistema completo | **Una funcionalidad** |
| **Dónde vive** | Documentos | Documentos | **El repositorio** |
| **Evolución** | Lenta | Lenta | Con el código |

La spec no sustituye al PRD: se escribe a partir de él, una por funcionalidad.

---

# Una spec es un contrato de comportamiento, no un prompt largo

<div class="columnas">
<div>

## No es

- Un prompt largo.
- Un PRD sin detalles técnicos.
- La arquitectura de todo el sistema.
- Una lista de tareas de programación.

</div>
<div>

## Sí es

- Un **contrato** para una funcionalidad.
- Un fichero **versionado** junto al código.
- Un documento **vivo**.
- El **punto de partida** del plan y las *tasks*.

</div>
</div>

El PRD dice «quiero una pizza». La spec dice «masa fina, mozzarella fresca, 8 minutos de horno y sin gluten».

---

# Los *edge cases* son lo que pasa fuera del camino feliz

Ejemplos para «añadir una tarea»:

| Tipo | Ejemplo |
|------|---------|
| **Entrada vacía** | Se pulsa «Añadir» sin escribir nada |
| **Límite de longitud** | El texto tiene 5.000 caracteres |
| **Valor en el límite** | Tiene exactamente 280 caracteres: ¿se acepta? |
| **Duplicado** | Ya existe una tarea con el mismo texto |
| **Concurrencia** | Dos personas añaden una tarea a la vez |

---

# Si un *edge case* no está en la spec, lo decide el agente

<div class="columnas">
<div>

## La spec no dice nada

El agente implementa el camino feliz y **supone** el resto: crea una tarea vacía.

Funciona en la demo y falla en producción.

</div>
<div>

## La spec lo dice

```markdown
## Edge cases
- EC-01: Si el texto está
  vacío, el sistema
  responde 400.
```

</div>
</div>

<div class="nota">

Por cada requisito: ¿y si la entrada está **vacía**, es **inválida**, está **duplicada**, es **demasiado grande** o llega **fuera de orden**?

</div>

---

# El contexto del agente tiene tres capas

| Capa | Pregunta que responde | Alcance | Cambia… |
|------|-----------------------|---------|---------|
| **Reglas** (`AGENTS.md`) | ¿Cómo trabaja el agente aquí? | Todo el proyecto | Muy poco |
| **Constitución** | ¿Qué principios no se rompen? | Todo el proyecto | Poco, con acuerdo |
| **Spec** | ¿Qué debe hacer esta funcionalidad? | Una funcionalidad | En cada funcionalidad |

> De arriba abajo, cada capa es **más concreta** y cambia **con más frecuencia**.

---

# Las reglas dicen cómo trabaja el agente: `AGENTS.md`

```markdown
## Comandos
- Tests: npm test
- Lint: npm run lint

## Convenciones
- JavaScript con módulos ES. Identificadores en español.

## Prohibiciones
- No añadir dependencias sin consultarlo.
- No escribir claves ni contraseñas en el código.
```

Es **operativo**: el agente lo carga al empezar cada sesión y lo sigue sin interpretarlo.

---

# La constitución dice qué es innegociable en el proyecto

```markdown
# Constitución — Lista de tareas compartida

## Arquitectura
Capas: controladores → servicios → repositorios.
Solo los repositorios acceden al almacenamiento.

## API
Los errores devuelven { error: "mensaje" } con el código HTTP adecuado.

## Pruebas
Los tests se escriben antes que el código.
```

Es más **estratégica** que las reglas: recoge decisiones que todo cambio debe respetar.

---

# El agente recibe las tres capas; tú solo escribes la spec y la petición

<div class="flujo">
<div>Carga <code>AGENTS.md</code> y la constitución</div>
<div>Lee la <strong>spec</strong> de la funcionalidad</div>
<div class="destacada">Envía al modelo reglas, constitución, spec y petición</div>
<div>Te devuelve cambios para revisar</div>
</div>

Las reglas y la constitución **ya estaban**, y valen para todas las funcionalidades.

<div class="cuidado">

Lo que solo afecta a una funcionalidad **no va en los ficheros globales**: el agente lo leería en todas las tareas, aunque no le sirva.

</div>

---

# Ejemplo: cada pregunta del agente tiene su artefacto

| Pregunta del agente | Dónde está la respuesta |
|---------------------|-------------------------|
| ¿Para qué sirve esta aplicación? | `docs/prd.md` |
| ¿Cómo se ejecutan los tests? | `AGENTS.md` |
| ¿Qué formato tienen los errores? | `constitution.md` |
| ¿Qué pasa si el texto está vacío? | `spec.md` (*edge case*) |
| ¿Qué hago ahora? | El prompt |

> Si una pregunta no tiene respuesta en ningún artefacto, el agente **la responde por su cuenta**.

---

# Pon cada frase en su artefacto

<div class="prueba">

¿Prompt, PRD, regla, constitución o spec?

1. «Usa siempre `npm test` para ejecutar las pruebas».
2. «Si el texto está vacío, responde 400».
3. «Los controladores no contienen lógica de negocio».
4. «Arregla el error de la línea 40».

</div>

<div class="prueba">

Escribe tres *edge cases* para «marcar una tarea como hecha».

</div>

---

# Las mismas capas, con otros nombres

<div class="transferencia">

| Herramienta | Reglas | Constitución | Specs |
|-------------|--------|--------------|-------|
| **OpenCode** | `AGENTS.md` | Fichero propio | Ficheros Markdown |
| **GitHub Spec Kit** | Instrucciones del agente | `constitution.md` | `spec.md` |
| **Kiro** | *Steering files* | *Steering files* | `requirements.md`… |
| **Claude Code** | `CLAUDE.md` | `CLAUDE.md` | Ficheros Markdown |

</div>

Los nombres pueden cambiar: lo que importa es reconocer **qué capa es cada fichero**.

---

<!-- _class: cierre -->

# Quédate con esto

1. El **prompt** es transitorio; el **PRD** dice qué y por qué; el **SRS** describe todo el sistema con precisión.
2. La **spec** une el porqué y la precisión para **una funcionalidad**, versionada junto al código.
3. Los ***edge cases*** que no escribes **los decide el agente**.
4. Tres capas: **reglas** (cómo trabaja el agente), **constitución** (qué es innegociable) y **spec** (qué hace una funcionalidad).

---

# Para practicar

- **Tema 2 de la unidad:** el ejemplo integrador del apartado 2.9 muestra el repositorio de la lista de tareas con todos sus artefactos.
- **Apartado 2.8:** las primitivas de la programación con agentes (prompts, instrucciones, *skills*, specs, MCP y agentes).
- **Ejercicio E02, «Cada cosa en su sitio»:** clasificar fragmentos por artefacto y por capa.

En el tema 3 prepararás el entorno con **OpenCode** y configurarás en él las dos primeras capas.
