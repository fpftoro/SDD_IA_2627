---
marp: true
theme: sdd
paginate: true
lang: es
title: Artefactos y estado del proyecto
description: Diapositivas del tema 4 de la UD2 de Desarrollo guiado por especificaciones con IA
footer: UD2 · Tema 4 · Artefactos y estado del proyecto
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD2 · Tema 4

# Artefactos y estado del proyecto

Criterios de evaluación: **OA2 d**

---

# Al terminar sabrás…

1. Por qué llevar el **estado** de cada feature sirve sobre todo al **agente**.
2. Dónde viven los artefactos: **una carpeta por feature**, en el mismo repositorio que el código.
3. Los **cinco estados** de una spec y quién decide cada cambio.
4. Mantener el **índice** de features con **una sola fuente de verdad**.

---

# El agente no recuerda: lo que sabe del proyecto es lo que lee

| Lector | Qué necesita saber |
|--------|--------------------|
| **Tú** | Qué está hecho, qué está en curso y qué toca después |
| **El agente** | Qué existe ya, para no volver a construirlo |
| **El equipo** | Quién trabaja en qué, para no pisarse |

Si el estado está escrito, el agente lo sabe; si no, **lo adivina**.

> Llevar el estado no es burocracia: es **memoria del proyecto** escrita donde el agente puede leerla.

---

# Hay artefactos del proyecto y artefactos de la feature

| Grupo | Ficheros | Cuántos |
|-------|----------|---------|
| **Del proyecto** | `AGENTS.md`, `constitution.md`, `docs/prd.md`, `docs/specs/README.md` | Uno de cada |
| **De la feature** | `spec.md`, `plan.md`, `tasks.md` | Uno de cada por feature |

El **índice** es del proyecto, pero su contenido es el estado de cada feature: el puente entre los dos grupos.

Los proyectos cambian rara vez, salvo el índice, que cambia con cada estado.

---

# Una carpeta por feature, y los ficheros siempre se llaman igual

```text
docs/specs/
├── README.md
├── A-añadir-tarea/
│   ├── spec.md
│   ├── plan.md
│   └── tasks.md
└── B-ver-lista/
    └── spec.md
```

- **Prefijo:** una letra (A, B…) que marca el orden de implementación.
- **Nombre:** minúsculas y guiones, en español.
- Una feature `Pendiente` no tiene carpeta: vive solo en el índice.

---

# Todo en el repositorio: si no está ahí, no es la spec

- El agente puede **leer** los documentos sin que se los pegues.
- Un cambio de comportamiento lleva **en el mismo commit** la spec y el código.
- El historial muestra cómo evolucionó la **intención**, no solo el código.
- Una persona nueva, o un agente nuevo, entiende el **porqué** leyendo la carpeta.

<div class="cuidado">

Una spec en un documento de la nube, en un correo o en el chat **no existe para el agente**, y tarde o temprano deja de coincidir con la tuya.

</div>

---

# El estado de la feature es el de su spec: cinco estados

| Estado | Significado | Se entra cuando… |
|--------|-------------|------------------|
| 📝 **Borrador** | Se está escribiendo | Se crea `spec.md` |
| 👀 **En revisión** | Espera el punto de control 1 | Se da por terminada |
| 🔜 **Aprobada** | Lista para planificar | Pasa el punto de control 1 |
| 🔧 **En implementación** | Hay ciclos en curso | Empieza el primer ciclo |
| ✅ **Implementada** | Tasks hechas y tests en verde | Termina el último ciclo |

En el índice hay un sexto valor, ⏳ **Pendiente**: la feature está identificada y su spec **aún no existe**.

---

# Los estados avanzan en orden, pero con vueltas atrás

<div class="flujo">
<div>Borrador</div>
<div>En revisión</div>
<div class="destacada">Aprobada</div>
<div>En implementación</div>
<div>Implementada</div>
</div>

- Se puede **volver a revisión** desde *Aprobada* (el plan halla un hueco) y desde *Implementada* (se propone un cambio).
- **Nunca se salta** el punto de control 1: una spec que cambia vuelve a pasar por él.
- Un hueco pequeño, decidible en el momento, sube la **versión** de la spec y sigue en implementación.

---

# Estado y ficheros deben ser coherentes

| Estado | `plan.md` | `tasks.md` | Código |
|--------|-----------|------------|--------|
| Pendiente, Borrador y En revisión | — | — | — |
| 🔜 Aprobada | En curso o aprobado | En curso o aprobadas | **Ninguno** |
| 🔧 En implementación | Aprobado | Algunas `[x]` | Parte |
| ✅ Implementada | Aprobado | Todas `[x]` | Completo |

> Una feature `Aprobada` con código en `src/` es una incoherencia: alguien empezó sin cambiar el estado.

---

# Los cambios de estado los decide una persona, cada uno con su commit

| Cambio | Quién lo decide |
|--------|-----------------|
| 📝 → 👀 | Quien escribe la spec |
| 👀 → 🔜 | Quien aprueba (punto de control 1) |
| 🔜 → 🔧 | Quien empieza la implementación |
| 🔧 → ✅ | Quien revisa el último ciclo (punto de control 4) |
| ✅ o 🔜 → 👀 | Quien propone el cambio |

<div class="cuidado">

El agente **no aprueba nada**. Si al revisar la spec la pasa a `Aprobada`, deshaz el cambio y prohíbelo en `AGENTS.md`.

</div>

---

# El índice muestra el estado de todas las features de un vistazo

```markdown
# Features

| # | Feature | Carpeta | Estado |
|---|---------|---------|--------|
| A | Añadir una tarea | A-añadir-tarea/ | ✅ Implementada |
| B | Ver la lista de tareas | B-ver-lista/ | 🔜 Aprobada |
| C | Marcar una tarea como hecha | C-marcar-hecha/ | ⏳ Pendiente |
```

- Es `docs/specs/README.md`: GitHub lo muestra al abrir la carpeta.
- Se actualiza **en el mismo commit** que el cambio de estado, nunca «luego».

---

# Una sola fuente de verdad: manda la spec

> El índice es una **copia** de lo que dice la spec. Si no coinciden, **el índice está mal**.

Un script recorre las specs y compara su estado con el del índice:

```text
✅ A-añadir-tarea: Implementada
❌ B-ver-lista: la spec dice «Aprobada» y el índice, «Borrador»
```

- Se añade a `package.json` como `npm run estado` y se cita en `AGENTS.md`.
- Termina con error si algo no coincide: en la UD3 será un *gate* automático.

Un índice que dice algo distinto de las specs es **peor que no tener índice**: el agente lo cree.

---

# El índice pone al agente al día en una línea

```text
Lee @docs/specs/README.md y @constitution.md. La feature A está
implementada y la B tiene la spec aprobada. Vamos a planificar
la B: lee @docs/specs/B-ver-lista/spec.md y el código de la A en
src/, que la B tiene que reutilizar.
```

Con esas líneas el agente sabe qué existe, qué no debe volver a construir y dónde está lo que necesita.

Sin índice tendría que deducirlo **explorando el repositorio**, con riesgo de equivocarse y gastando contexto (tema 5).

---

# Con un commit por fase, el historial es el registro de la feature

```bash
git log --oneline -- docs/specs/A-añadir-tarea/
git log --oneline --first-parent
```

- La primera orden filtra por **carpeta**: la historia de una sola feature.
- La segunda, con las fusiones `--no-ff`, se lee **feature a feature**.
- Con una convención fija en los mensajes (`Feature A: T-03 y T-04, …`) se ve en qué estado llegó cada una.

Cuando cambia el plan del proyecto (se reordenan, dividen o descartan features) se hace en `main`, tras fusionar, con `git mv` para conservar el historial.

---

# Otras formas de llevar el estado: la regla es la misma

<div class="transferencia">

| Método | Cómo lleva el estado |
|--------|----------------------|
| **Incidencias de GitHub** | Una por feature, con etiquetas o columnas |
| **Spec Kit** | Carpeta y rama por feature, numeradas |
| **Conductor** | Un índice de *tracks* que actualiza el agente |
| **OpenSpec** | Specs vigentes y cambios en curso, que se archivan |

</div>

Sea cual sea el método: **una fuente de verdad**, actualizada cuando cambia y **legible por el agente**. Un gestor que el agente no puede leer resuelve la coordinación, no su contexto.

---

# Detecta las incoherencias

<div class="prueba">

El índice dice `🔜 Aprobada` y la spec dice `Implementada`. ¿Quién tiene razón y qué se corrige?

</div>

<div class="prueba">

La feature C está `Aprobada` y hay código en `src/`; la D está `Implementada` con dos tasks sin marcar. ¿Qué ha pasado en cada una?

</div>

<div class="prueba">

Hay que intercambiar el orden de C y D. ¿Qué órdenes ejecutas y qué revisas después?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. El estado sirve sobre todo al **agente**, que no recuerda las sesiones anteriores.
2. Una **carpeta por feature** con `spec.md`, `plan.md` y `tasks.md`, en el mismo repositorio que el código.
3. Cinco estados: **Borrador**, **En revisión**, **Aprobada**, **En implementación** e **Implementada**; los cambia **una persona**.
4. **Manda la spec**; el índice se actualiza en el mismo commit y un script detecta las diferencias.

---

# Para practicar

- **Tema 4 de la unidad:** la tabla de estados (apartado 4.3.1), el script de estado (apartado 4.4.3) y el ejemplo integrador de la lista de tareas (apartado 4.9).
- **Ejercicio E06, «El estado del proyecto»:** diagnostica y corrige un repositorio con incoherencias sembradas y reordena features con `git mv`.

En el tema 5 verás cómo se llena la **ventana de contexto** del agente.
