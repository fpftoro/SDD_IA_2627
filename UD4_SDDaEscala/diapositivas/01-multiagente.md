---
marp: true
theme: sdd
paginate: true
lang: es
title: Varios agentes
description: Diapositivas del tema 1 de la UD4 de Desarrollo guiado por especificaciones con IA
footer: UD4 · Tema 1 · Varios agentes
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD4 · Tema 1

# Varios agentes

Criterios de evaluación: **OA4 a, b**

---

# Al terminar sabrás…

1. **Cuándo compensa** repartir el trabajo entre varios agentes y cuándo no.
2. Por qué la **orquestación** es mejor que la coreografía, y los **roles** *Architect*, *Builder* y *Craftsman*.
3. Trabajar en paralelo con ***worktrees***, sabiendo qué trabajos **pueden** ir a la vez.
4. Escribir un ***handoff*** completo: el encargo lo es todo.

---

# Un solo agente con todos los permisos choca con cinco límites

| Límite | Qué pasa |
|--------|----------|
| **Contexto** | La ventana se llena de todo y la atención se reparte |
| **Sin especialidad** | Decide producto, arquitectura y código con las mismas instrucciones |
| **Se revisa a sí mismo** | Comprueba lo que él entendió, no lo que dice la spec |
| **Demasiados permisos** | Quien implementa puede cambiar los tests |
| **Todo en serie** | Dos features independientes esperan en fila |

> La solución no es un agente más grande ni un prompt más largo: es **repartir el trabajo** con un papel claro, el contexto justo y los permisos justos.

---

# Más agentes no es mejor: cada uno resuelve un problema concreto

<div class="columnas">
<div>

## Cuestan

- **Más tokens:** cada subagente empieza con la ventana vacía.
- **Más coordinación.**
- **Más traspasos**, donde se pierde información.

</div>
<div>

## Compensan si…

- Búsquedas que llenan la sesión: *explore*.
- Quien implementa podría tocar los tests: un implementador sin permiso.
- Código revisado por quien lo escribió: un revisor aparte.

</div>
</div>

> Empieza con **un agente y una persona**. Si no sabes qué problema resuelve el agente nuevo, no lo añadas.

---

# Orquestación mejor que coreografía

<div class="columnas">
<div>

## Orquestación

Un **coordinador** decide quién hace qué y comprueba cada resultado antes de seguir. Como el jefe de cocina.

</div>
<div>

## Coreografía

No hay coordinador: cada agente **reacciona a eventos**. Como un bufé.

</div>
</div>

<div class="cuidado">

Un agente no es determinista: en la coreografía, un resultado inesperado llega al siguiente **sin que nadie lo revise**. Un workflow que lanza un corrector cuando la CI falla y un revisor con cada commit crea un bucle que nadie decidió.

</div>

En el curso, el coordinador principal eres **tú**.

---

# Tres topologías, que en la práctica se combinan

<div class="columnas-3">
<div>

## En cadena

El flujo SDD: cada fase pasa al siguiente con un **punto de control**.

</div>
<div>

## Jerárquica

Un **orquestador** reparte y junta los resultados.

</div>
<div>

## En red

Todos hablan con todos. **Casi nunca compensa.**

</div>
</div>

---

# Tres roles, y repartir el trabajo no reparte las decisiones

<div class="columnas-3">
<div>

## *Architect*

**Entiende, especifica y planifica.** No implementa.

</div>
<div>

## *Builder*

**Implementa contra la spec.** No avanza si no cumple.

</div>
<div>

## *Craftsman*

**Cuida la calidad** del conjunto y de las primitivas.

</div>
</div>

Cada agente tiene el contexto y los permisos de su rol: ningún agente puede aprobar, solo el *Builder* toca el código y ninguno llega a *general*, que lo puede todo.

---

# El subagente empieza con la ventana vacía y devuelve un único mensaje

<div class="flujo">
<div>El agente principal escribe el <strong>encargo</strong></div>
<div class="destacada">El subagente trabaja en su sesión, <strong>sin ver tu conversación</strong></div>
<div>Devuelve <strong>un único mensaje</strong></div>
</div>

La acción `subagent` (`*` en `deny` y, después, `explore` en `allow`) limita a qué subagentes puede encargar trabajo cada agente.

<div class="cuidado">

Un agente que no edita pero puede llamar a *general* **sí** edita, a través de otro.

</div>

---

# Un modelo para cada rol: capacidad, coste y privacidad

| Agente | Trabajo | Modelo |
|--------|---------|--------|
| `arquitecto` | Decisiones técnicas caras si salen mal | El más capaz |
| `revisor` | Comparar el código con la spec | Capaz, y si puede ser **distinto** del que implementó |
| *explore* | Buscar y resumir | Rápido y económico |
| Código que no puede salir | — | Un modelo local |

> Repartir multiplica las llamadas: ¿una búsqueda bien dirigida no daría lo mismo?

---

# Dos agentes en la misma carpeta se pisan

- Solo puede haber **una rama activa**: si uno cambia de rama, el otro se encuentra los ficheros de la otra.
- Los dos ven los cambios sin guardar del otro: `git status` y `git diff` **mezclan** el trabajo.
- Si uno ejecuta los tests, prueba el código a medio hacer del otro.

Un ***worktree*** es una **carpeta de trabajo adicional** con su propia rama y el **mismo historial**.

```bash
git worktree add ../lista-tareas-C -b feature/C-marcar-hecha
git worktree add ../lista-tareas-D -b feature/D-borrar-tarea
```

---

# Un agente por *worktree*, y cada uno con lo suyo

- `npm ci` en cada carpeta: `node_modules` **no se comparte**.
- Una sesión de OpenCode por *worktree*. Para que pregunte antes de salir de su carpeta, `external_directory` en `ask`; si pregunta, no lo permitas.
- Servidores en puertos distintos: `PUERTO=3001 npm start`.
- Git no deja abrir una rama que ya está en un *worktree*.

```bash
git worktree remove ../lista-tareas-C
git branch -d feature/C-marcar-hecha
```

<div class="cuidado">

En el Dev Container, la carpeta de al lado vive **dentro del contenedor**. Haz commit al final de cada fase y quita los *worktrees* antes de reconstruirlo.

</div>

---

# Se puede hacer en paralelo lo que no toca lo mismo ni decide lo mismo

| Trabajo | ¿En paralelo? |
|---------|---------------|
| Los planes de dos features | Sí, con cuidado: pueden decidir lo mismo |
| Implementar dos features que tocan servicio y rutas | **No** |
| Varias búsquedas para un mismo plan | Sí: solo leen |
| Dos tasks `[P]` del mismo grupo | Sí |

Dos condiciones: **no tocan los mismos ficheros** y **no dependen uno del otro**.

> Lo decide el **orquestador**, comparando los planes **antes**.

---

# Los *worktrees* evitan pisarse al trabajar, no los choques al juntar

Los dos implementadores crean `error-no-encontrado.js`:

```javascript
<<<<<<< HEAD
    this.name = 'ErrorNoEncontrado';
=======
    this.name = 'NoEncontrado';
>>>>>>> feature/D-borrar-tarea
```

**La misma decisión**, de forma distinta. Con otro nombre de fichero no habría conflicto y habría **dos clases para lo mismo**: *spec drift* entre features.

---

# Un encargo vago deja el trabajo a la suerte

```text
Mira el código de las tareas y dime qué hay.
```

*Explore* no sabe para qué ni cuándo parar. Un buen encargo lleva **objetivo**, **qué buscar**, **límites** y **formato**:

```text
Objetivo: planifico la feature D («Borrar una tarea»).
Busca en src/ y tests/: las clases de error y su código
HTTP; funciones del repositorio que busquen por id.
Límites: solo lectura; no mires public/ ni docs/.
Devuelve una línea por cosa: fichero, nombre y para qué.
Si algo no existe, dilo expresamente.
```

Sin esa última frase, el subagente devuelve **lo más parecido** y el agente principal lo toma por bueno.

---

# Entre roles, el *handoff* solo señala los documentos

```markdown
## Traspaso: arquitecto → implementador
- Feature: C. Documentos: spec 1.0, plan.md y tasks.md
  (aprobados).
- Rama y carpeta: feature/C-marcar-hecha, en ../lista-tareas-C.
- Encargo: el grupo 1 (T-01 y T-02).
- Límites: solo los ficheros de esas tasks; los tests no se tocan.
- Al terminar: tasks marcadas, npm test en verde y lo que
  no encajó con la spec o el plan.
```

> **Si un *handoff* necesita explicar una decisión, esa decisión falta en el plan o en la spec.**

Los comandos `/planificar` e `/implementar` son plantillas de *handoff*.

---

# Lo que vuelve: formato, lo que no encontró y comprobación

- **Pide un formato:** una línea por cosa, una tabla, un «sí o no y por qué».
- **Pide lo que no encontró:** un hueco declarado es información; uno rellenado con algo parecido es un error que nadie ve.
- **Comprueba lo importante:** si el plan va a depender de que «`buscarPorId` ya existe», mira el fichero antes de aprobar el plan.

<div class="nota">

**Meta-mantenimiento:** un fallo repetido se arregla en la **primitiva** (la regla, la skill, el comando) o en **cómo se repartió el trabajo**, no solo en el código.

</div>

---

# Seguridad y trazabilidad: mínimo privilegio y personas en los puntos críticos

| Agente | Edita | Encarga trabajo a |
|--------|-------|-------------------|
| `arquitecto` | Solo `plan.md` y `tasks.md` | Solo *explore* |
| `implementador` | El código; no tests ni specs | Nadie |

- **Personas:** aprobar spec, plan y tasks; decidir qué va en paralelo; fusionar; acciones irreversibles; cambiar una primitiva.
- **Quién hizo qué:** una rama por feature, un *worktree* por agente, el agente en el mensaje del commit.
- Los revisores automáticos **suben el suelo**; el diseño lo sigue juzgando una persona.

---

# Reparte el trabajo

<div class="prueba">

C y D son independientes. ¿Qué miras en sus planes antes de implementarlas en paralelo? ¿Y si los dos crean la misma clase de error?

</div>

<div class="prueba">

Reescribe el encargo «mira el código del repositorio» para el arquitecto que planifica la feature D.

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Varios agentes compensan **solo si cada uno resuelve un problema concreto**.
2. **Orquestación mejor que coreografía**; repartir el trabajo **no reparte las decisiones**.
3. Un subagente empieza con la ventana vacía: el **encargo** (*handoff*) lo es todo.
4. Los *worktrees* evitan pisarse **al trabajar**, no los choques **al juntar**.

---

# Para practicar

- **Tema 1 de la unidad:** la tabla de agentes y permisos (apartado 1.10.1), los *worktrees* (apartado 1.7) y el ejemplo integrador, las features C y D con varios agentes (apartado 1.12).
- **Ejercicios E01 y E02:** diseñar los agentes del préstamo y reescribir tres encargos mal hechos.
- **Ejercicio E03, «Dos features en paralelo»:** comparar dos planes que duplican decisiones y decidir qué va en paralelo.

En el tema 2 llevarás SDD al **trabajo en equipo**.
