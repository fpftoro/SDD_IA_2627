---
marp: true
theme: sdd
paginate: true
lang: es
title: El ecosistema de herramientas
description: Diapositivas del tema 4 de la UD3 de Desarrollo guiado por especificaciones con IA
footer: UD3 · Tema 4 · El ecosistema de herramientas
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD3 · Tema 4

# El ecosistema de herramientas

Criterios de evaluación: **OA3 e**

---

# Al terminar sabrás…

1. Estudiar una herramienta **por papeles**, sin depender de una lista que caduca.
2. Reconocer qué hace un **framework de SDD** y en qué se diferencian **Spec Kit**, **OpenSpec**, **Conductor** y **Kiro**.
3. **Elegir** con una matriz de decisión que parte de las restricciones.
4. Qué **sobrevive** al cambiar de herramienta y qué **no resuelve** ninguna.

---

# Las herramientas cambian; lo que permanece es el repositorio

Aparecen, cambian de nombre y de rumbo en meses: cualquier «mejor herramienta» **caduca**. Este tema da tres cosas que no:

- Un **mapa por papeles**, para colocar cualquier herramienta nueva.
- **Conceptos** que se repiten con nombres distintos.
- **Criterios para elegir y combinar.**

<div class="nota">

Los nombres, comandos y funciones pueden cambiar: compruébalos siempre en la **documentación** antes de usarlos. Si sabes qué hace cada fase, cualquier herramienta automatiza pasos que ya conoces.

</div>

---

# Seis preguntas dicen casi todo de una herramienta nueva

| Pregunta | Por qué importa |
|----------|-----------------|
| ¿Qué **papel** cumple? | Con qué compite y con qué se combina |
| ¿Dónde guarda **specs y contexto**? | En Markdown en el repositorio, sobreviven |
| ¿Qué **fases** cubre y con qué artefactos? | Mapearla con el flujo que conoces |
| ¿Con qué **modelos** funciona? | Coste, privacidad y dependencia |
| ¿Qué **licencia** tiene? | Poder auditarla o ampliarla |
| ¿Qué **control** da? | Permisos y *hooks* para el mínimo privilegio |

> Y una prueba: **una feature pequeña** de un proyecto que conozcas.

---

# Seis papeles y, en el centro, el repositorio

| Papel | Qué hace | Ejemplos |
|-------|----------|----------|
| **Modelos** | Razonan y generan | Los de varios proveedores; abiertos en local |
| **Agentes de codificación** | Leen, editan, ejecutan | OpenCode, Claude Code, Copilot |
| **Frameworks y entornos** | Flujo por fase; donde trabajas | Spec Kit, OpenSpec, Kiro |
| **Validación y conexiones** | Comprueban; dan acceso a otros sistemas | Vitest, GitHub Actions, MCP |

Lo importante, **en el repositorio y en formatos abiertos**: así puedes cambiar cualquier otra pieza.

---

# Los frameworks de SDD automatizan el mismo flujo con otros nombres

| | Spec Kit | OpenSpec | Conductor | Kiro |
|---|----------|----------|-----------|------|
| **Tipo** | Kit para cualquier agente | Framework para cualquier agente | Complemento | Entorno completo |
| **Unidad** | Feature | Cambio | *Track* | Feature |
| **Mejor en** | Proyectos nuevos | Código existente | Flujo ligero | Todo en el editor |

<div class="transferencia">

**Los cuatro separan contexto, spec y plan en Markdown dentro del repositorio.** Es lo que hiciste a mano: cambian los nombres, el método es el mismo.

</div>

---

# OpenSpec separa cómo es el sistema ahora de los cambios en curso

```text
openspec/
├── specs/tareas/spec.md       ← cómo es el sistema ahora
└── changes/
    ├── limite-500/            ← un cambio en curso
    │   ├── proposal.md
    │   ├── tasks.md
    │   └── specs/tareas/spec.md   ← solo la diferencia (delta)
    └── archive/               ← cambios terminados
```

- Subir el límite a 500 **se propone** con una delta: lo añadido, modificado y eliminado.
- Al **archivar**, se aplica a la spec vigente, que vuelve a decir la verdad.

---

# Los agentes se distinguen en cinco cosas

| Característica | Opciones |
|----------------|----------|
| **Dónde trabaja** | Terminal, editor, nube |
| **Modelos** | De un proveedor o de muchos, también locales |
| **Licencia** | Abierta o propietaria |
| **Instrucciones del proyecto** | `AGENTS.md` o un fichero propio (`CLAUDE.md`, `GEMINI.md`) |
| **Control** | Permisos, modo de planificar, *hooks* |

Para SDD importan a largo plazo los **modelos** y las **instrucciones**: un agente atado a un proveedor te ata a sus condiciones, y uno que lee un formato abierto hace que tu memoria sirva al siguiente.

---

# Los mismos conceptos, con otros nombres

| Concepto | En OpenCode | En otros agentes |
|----------|-------------|------------------|
| Instrucciones del proyecto | `AGENTS.md` | `CLAUDE.md`, reglas de Cursor, *steering* |
| Procedimientos | Skills | El mismo formato abierto |
| Prompts reutilizables | Comandos | *Slash commands*, *prompt files* |
| Planificar sin tocar | Agente *plan* | *Plan mode* |
| Mínimo privilegio | `permissions` | Permisos por herramienta |
| Sistemas externos | Servidores MCP | Servidores MCP |

> Por eso el curso usa una herramienta y no cinco: cuando llegues a otro equipo, la pregunta no es «¿cómo se usa?» sino «¿cómo se llama aquí el subagente revisor?».

---

# Con un agente en la nube no hay puntos de control intermedios

Trabaja sin ti delante y llega todo junto en la *pull request*. Por eso:

- La spec, el plan y las tasks tienen que estar **aprobados antes** de encargar el trabajo, y el encargo tiene que citarlos.
- Los **tests** escritos y revisados antes son lo único que tiene para saber si ha terminado.
- Los **gates** de la CI son la primera revisión; la PR, la segunda.

<div class="cuidado">

Un agente en la nube con una tarea vaga es el *vibe coding* de la UD1 con **más autonomía**. Cuanto menos supervisas, más tiene que estar decidido por escrito.

</div>

---

# El agente no es el modelo, y eso tiene tres consecuencias

<div class="columnas-3">
<div>

## Atado o multiproveedor

Un agente multiproveedor te deja cambiar de modelo sin cambiar de herramienta.

</div>
<div>

## La misma spec, otro modelo

Una buena spec reduce las diferencias, no las elimina. Los **tests** comprueban el resultado.

</div>
<div>

## Privacidad

El código y las specs **van al proveedor**. Si es confidencial, un modelo local o un contrato que lo permita.

</div>
</div>

En el curso se conecta cada agente **directamente** a su proveedor, sin pasarelas que añadan un intermediario por el que pase el código.

---

# El ecosistema se divide entre velocidad y estructura

<div class="columnas">
<div>

## Velocidad y flexibilidad

La spec es una guía informal; el agente itera rápido con la persona al lado.

**Probar ideas deprisa.**

</div>
<div>

## Estructura y control

La spec es un contrato aprobado; el agente trabaja dentro de límites escritos.

**Trazabilidad y calidad repetible.**

</div>
</div>

> Es el espectro de la UD1, del *vibe coding* al SDD, visto desde las herramientas. **No hay que elegir un bando**: un prototipo no necesita constitución; la feature de todo el equipo, sí.

---

# Se elige empezando por las restricciones, no por las preferencias

1. **¿El código puede salir de la organización?** Si no: agente con modelo local o proveedor contratado.
2. **¿Hay una herramienta impuesta?** Úsala y adapta el método: specs y memoria en el repositorio.
3. **¿Proyecto nuevo o código existente?** Features completas (a mano o Spec Kit) o specs de cambios (OpenSpec).
4. **¿El equipo comparte editor y proveedor?** Puede valer un entorno integrado; si no, agente y framework independientes.

Todas las ramas acaban igual: **specs y memoria del agente en el repositorio**.

---

# Una matriz de decisión deja escrito por qué se elige una

| Criterio | Peso | Opción 1 | Opción 2 |
|----------|------|----------|----------|
| El que más importa | 3 | 2 → 6 | 1 → 3 |
| Importante | 2 | … | … |
| Deseable | 1 | … | … |
| **Total** | | **…** | **…** |

- Se puntúa cada opción y se multiplica por el **peso** que tiene el criterio **en ese proyecto**.
- No decide sola: sirve para **discutir** los pesos (¿importa más la velocidad que la privacidad?) y dejar la decisión escrita con su motivo.
- Coste y licencias: **compruébalos** en las condiciones vigentes.

---

# Al cambiar de herramienta, casi todo sobrevive; los permisos hay que revisarlos

| Pieza | ¿Sirve en otro agente? |
|-------|------------------------|
| Specs, planes, tasks, constitución, `AGENTS.md` | ✅ Markdown, formato abierto |
| Skills, tests, configuración de gates y CI | ✅ No dependen del agente |
| Comandos | ⚠️ Se traduce el formato; el texto sirve |
| Agentes con sus **permisos** | ⚠️ Cada agente los expresa a su manera |
| `opencode.json` | ❌ Propio de OpenCode |

<div class="cuidado">

Un permiso mal traducido **no da error: deja de proteger**. Un `implementador` traducido sin cuidado puede volver a editar los tests.

</div>

---

# Elige con criterio

<div class="prueba">

Una empresa con código confidencial quiere adoptar SDD con agentes. ¿Qué tienes en cuenta, y en qué orden?

</div>

<div class="prueba">

¿Qué diferencia a **OpenSpec** de **Spec Kit** y cuándo encaja cada uno?

</div>

<div class="prueba">

Nombra tres cosas que **ninguna herramienta** resuelve por ti.

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Las herramientas **cambian**; se estudian **por papeles**, y lo que permanece es el **repositorio** en formatos abiertos.
2. Los frameworks de SDD **automatizan el mismo flujo** con otros nombres.
3. Se elige **por restricciones**, con una matriz de decisión y una prueba con una feature propia.
4. Ninguna herramienta decide si la spec es buena, que los tests la comprueben ni asume **la responsabilidad**.

---

# Para practicar

- **Tema 4 de la unidad:** el mapa de papeles (apartado 4.2), la comparación de frameworks (apartado 4.3.5) y el ejemplo integrador, elegir las herramientas de la lista de tareas (apartado 4.11).
- **Ejercicio E07, «Elegir herramientas»:** tres escenarios con matriz de decisión, dos herramientas investigadas **con fecha de consulta** y qué sobrevive al cambiar de agente.

En el tema 5 conectarás el agente con sistemas externos mediante **MCP**.
