---
marp: true
theme: sdd
paginate: true
lang: es
title: Memoria persistente del agente
description: Diapositivas del tema 6 de la UD2 de Desarrollo guiado por especificaciones con IA
footer: UD2 · Tema 6 · Memoria persistente del agente
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD2 · Tema 6

# Memoria persistente del agente

Criterios de evaluación: **OA2 f**

---

# Al terminar sabrás…

1. Qué memoria entra **siempre** en la ventana y cuál entra **solo cuando hace falta**.
2. Mantener `AGENTS.md` **corto y verdadero**, y **diagnosticar** el fallo antes de añadir una regla.
3. Crear **instrucciones por carpeta**, **skills**, **comandos** y **agentes personalizados**.
4. Aplicar el **mínimo privilegio** con los permisos de un agente.

---

# Cada primitiva entra en la ventana en un momento distinto

| Primitiva | Fichero en OpenCode | Entra… |
|-----------|---------------------|--------|
| **Persistentes** | `AGENTS.md` e `instructions` | Siempre, al empezar |
| **Contextuales** | `AGENTS.md` de una carpeta | Al leer un fichero de ella |
| **Skills** | `.opencode/skills/` | Si la tarea encaja con su descripción |
| **Comandos** | `.opencode/commands/` | Cuando escribes `/<nombre>` |
| **Agentes** | `.opencode/agents/` | Cuando los eliges |

> Solo la primera entra **siempre**. OpenCode vuelve a cargarlos al guardarlos: pruébalos en una sesión nueva.

---

# `AGENTS.md` dice cómo se trabaja; la constitución, qué no se negocia

| | `AGENTS.md` | `constitution.md` |
|---|-------------|-------------------|
| **Responde a** | ¿Cómo se trabaja aquí? | ¿Qué no se negocia? |
| **Tono** | Órdenes que se siguen sin interpretar | Principios, con su motivo |
| **Contenido** | Comandos, estructura, convenciones, prohibiciones | Arquitectura, tecnología, formato de la API |
| **Ejemplo** | «Tests: `npm test`» | «Los controladores no contienen lógica de negocio» |

No van aquí: cómo se implementa una feature (su plan), un procedimiento largo (una skill), un prompt repetido (un comando).

---

# Cada línea ocupa contexto en todas las sesiones: corta, concreta y verdadera

- **Corto:** si una regla solo vale a veces, no es global.
- **Concreto:** «escribe buen código» no se puede comprobar; «identificadores en español» sí.
- **Sin contradicciones:** si chocan, el agente cumple una u otra según el momento.

<div class="cuidado">

Una regla falsa es **peor que ninguna**: si `AGENTS.md` dice «Lint: `npm run lint`» y no hay linter, el agente lo buscará o lo instalará.

</div>

> Revisa `AGENTS.md` al cerrar cada feature: quita lo que ya no es verdad.

---

# Antes de añadir una regla, diagnostica por qué falló el agente

| Si… | Entonces es… |
|-----|--------------|
| La información ya estaba escrita y no la vio | Un problema de **contexto** (tema 5) |
| Es comportamiento de una feature | Un hueco de la **spec** |
| Es una decisión técnica de esta feature | El **plan** |
| Vale para todo el proyecto, siempre | `AGENTS.md` o la **constitución** |
| Vale solo en una carpeta, o es un procedimiento | Un `AGENTS.md` de **carpeta** o una **skill** |

> `AGENTS.md` es **una** de las salidas, no la respuesta por defecto. Si no, se vuelve un cajón de sastre.

---

# Un `AGENTS.md` de carpeta se activa solo al trabajar en ella

```text
lista-tareas/
├── AGENTS.md            ← siempre
└── tests/
    └── AGENTS.md        ← solo al leer algo de tests/
```

```markdown
# Tests
- El nombre de cada test empieza por el identificador
  de la spec: test('EC-01: …', …).
- Nunca cambies un test para que pase: dilo.
```

> Los ficheros de `instructions` se cargan **siempre**, aunque uses un patrón.

---

# Una skill es un procedimiento que el agente carga cuando lo necesita

- Al empezar, el agente solo recibe **nombre y descripción**; si la tarea encaja, carga el `SKILL.md` completo.
- Una skill puede ser **larga** sin coste en las demás sesiones.

| Descripción | Problema |
|-------------|----------|
| «Tests.» | No dice qué hace ni cuándo |
| «Escribir tests desde la spec de una feature. Úsala cuando una task pida tests.» | Dice qué y **cuándo** |

**La descripción decide si la skill se usa.**

---

# Una skill es una carpeta con un `SKILL.md`

```text
.opencode/skills/
└── tests-desde-spec/
    └── SKILL.md
```

```markdown
---
name: tests-desde-spec
description: Escribe los tests de una feature desde su
  spec. Úsala cuando una task pida tests.
---
Antes: lee la spec y la estrategia de pruebas del plan…
```

`name` va en minúsculas y guiones, **igual que la carpeta**: así la skill sirve en cualquier agente.

---

# Un comando es un prompt guardado: el prompt como código

En la conversación, el prompt se pierde al cerrar la sesión. Como fichero, está en el repositorio y lo usa todo el equipo.

```markdown
---
description: Propone el plan técnico de una feature
agent: plan
---
Planifica la feature de docs/specs/$1/. Lee su spec
aprobada y el índice…
```

`/planificar B-ver-lista`: `$1` es el primer argumento. Da **rutas**, no el contenido de los ficheros.

---

# El comando lo lanzas tú; la skill la carga el agente

| | Comando | Skill |
|---|---------|-------|
| **Quién lo activa** | Tú, con `/<nombre>` | El agente, por la descripción |
| **Qué es** | Una petición: «haz esto ahora» | Un saber hacer: «así se hace esto» |
| **Ejemplo** | `/planificar B-ver-lista` | Cómo escribir tests desde la spec |

<div class="nota">

Con `agent: plan`, el comando de planificar **no puede** editar ficheros aunque el prompt se equivoque: la protección está en la configuración, no en que el agente obedezca.

</div>

Se combinan: `/implementar` pide un grupo y el agente carga la skill de tests por su cuenta.

---

# Un agente personalizado tiene su modelo, sus permisos y su papel

| Campo | Para qué |
|-------|----------|
| `description` | Qué hace; otros agentes la leen para encargarle trabajo |
| `mode` | `primary`, `subagent` o `all` |
| `model` | `proveedor/modelo`; si falta, el de la sesión |
| `permissions` | Qué puede hacer, como en `opencode.json`; van después de las del proyecto |

Un modelo para cada trabajo: el más capaz para planificar e implementar, uno económico para documentar y uno local para el código que no puede salir del equipo.

<div class="cuidado">

Un agente con un modelo que no tienes **falla**: compruébalo con `opencode models`.

</div>

---

# Mínimo privilegio: gana la última regla que coincide

```yaml
permissions:
  - { action: edit, resource: "*", effect: deny }
  - { action: edit, resource: "README.md", effect: allow }
  - { action: edit, resource: "docs/**", effect: allow }
  - { action: edit, resource: "docs/specs/**", effect: deny }
```

Resultado: `src/app.js`, no; `docs/api.md`, sí; `docs/specs/…/spec.md`, no. Si la regla de `docs/specs/**` fuera **antes** que la de `docs/**`, ganaría `docs/**` y podría cambiar las specs.

> Los permisos son la diferencia entre **pedir** y **garantizar**: con `edit` en `deny` no puede incumplirlo aunque quiera.

---

# Cómo encaja todo: cada necesidad, su primitiva

| Necesitas… | Usa… |
|------------|------|
| Que sepa siempre cómo se trabaja aquí | `AGENTS.md` raíz |
| Que respete siempre los principios | `constitution.md` en `instructions` |
| Reglas que solo valen en una carpeta | `AGENTS.md` de esa carpeta |
| Un procedimiento cuando aparezca | Una skill |
| Lanzar siempre igual el prompt de una fase | Un comando |
| Otro modelo, otros permisos u otro papel | Un agente personalizado |

<div class="transferencia">

Las demás herramientas tienen lo mismo con otros nombres (`CLAUDE.md`, reglas de Cursor, *steering* de Kiro). Como todo está **en el repositorio**, otro agente puede leerlo.

</div>

---

# Los errores más frecuentes con la memoria del agente

| Error | Se evita con… |
|-------|---------------|
| Una regla de `AGENTS.md` por cada fallo | Diagnosticar antes |
| Reglas que ya no son verdad | Revisarlo al cerrar cada feature |
| Skill con descripción vaga | Decir qué hace y **cuándo** usarla |
| Comando de planificar con `agent: build` | `agent: plan` |
| Agente con permisos de más | `deny` por defecto |
| Orden equivocado en los permisos | La general primero, las excepciones después |

---

# Elige dónde va cada cosa

<div class="prueba">

Ha incumplido «los errores van en español» en una sesión larga, y la regla estaba en `AGENTS.md`. ¿Añades otra regla? ¿Qué diagnosticas?

</div>

<div class="prueba">

Quieres un agente que documente sin tocar el código ni las specs. Escribe sus permisos de `edit` y explica por qué el orden importa.

</div>

<div class="prueba">

¿Comando, skill o `AGENTS.md` de carpeta? (a) escribir tests desde la spec; (b) lanzar el plan de la feature; (c) convenciones de la carpeta `public/`.

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. La memoria del agente son **ficheros del repositorio** que entran en momentos distintos.
2. Lo que entra siempre (`AGENTS.md`, constitución) es **corto y verdadero**; antes de añadir una regla, **diagnostica**.
3. La **skill** la carga el agente por su descripción; el **comando** lo lanzas tú.
4. Un **agente personalizado** tiene su modelo y sus permisos, con **mínimo privilegio**.

---

# Para practicar

- **Tema 6 de la unidad:** el diagrama de diagnóstico (apartado 6.2.4) y el ejemplo integrador, la memoria de la lista de tareas (apartado 6.9).
- **Ejercicio E08, «La memoria del agente»:** revisa un `AGENTS.md` con falsedades y crea una regla de carpeta, una skill, un comando y un agente con permisos limitados.
- **Ejercicios E09 y E10:** un cambio con OpenSpec y el integrador, la feature C de principio a fin.

Con esto termina la unidad: en la UD3 **validarás** lo que el agente ha construido.
