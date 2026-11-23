---
marp: true
theme: sdd
paginate: true
lang: es
title: El flujo SDD
description: Diapositivas del tema 1 de la UD2 de Desarrollo guiado por especificaciones con IA
footer: UD2 · Tema 1 · El flujo SDD
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD2 · Tema 1

# El flujo SDD

Criterios de evaluación: **OA2 a**

---

# Al terminar sabrás…

1. Las **cuatro fases** del flujo y el **artefacto** que produce cada una.
2. Que la persona **decide y aprueba**; el agente **redacta, propone e implementa**.
3. Dónde se **corrige** cada problema y qué se revisa en cada **punto de control**.
4. Trabajar con **una rama por feature**, **una sesión por fase** y **un commit por documento aprobado**.

---

# «Impleméntala» mezcla todas las decisiones en mil líneas de código

Con la spec aprobada, quedan decisiones sin tomar: en qué ficheros va cada cosa, en qué orden se construye y cómo se comprueba.

Si el agente las toma todas a la vez, tú revisas **arquitectura, nombres, tests y lógica mezclados**.

> El flujo **separa la intención de la ejecución**: cada fase produce un documento que una persona revisa antes de seguir.

Como una obra: el encargo, el proyecto del arquitecto, la planificación por fases y, por último, los albañiles.

---

# Corregir pronto sale barato

| Se detecta en… | Qué hay que hacer |
|----------------|-------------------|
| La spec | Cambiar una frase |
| El plan | Cambiar una decisión técnica en un documento |
| Las tasks | Reordenar o dividir una lista |
| El código | Reescribirlo, revisarlo y volver a probar |
| Producción | Todo lo anterior, más los datos y los usuarios afectados |

<div class="cuidado">

El flujo no evita los errores: los **adelanta**. Sin las revisiones, pagas los documentos y no cobras sus ventajas.

</div>

---

# Cuatro fases, y cada una deja su artefacto

<div class="flujo">
<div>Especificar<br><code>spec.md</code></div>
<div>Planificar<br><code>plan.md</code></div>
<div>Descomponer<br><code>tasks.md</code></div>
<div class="destacada">Implementar<br>código y tests</div>
</div>

| Fase | Responde a… |
|------|-------------|
| Especificar | ¿Qué hay que construir? |
| Planificar | ¿Cómo se va a construir? |
| Descomponer | ¿En qué pasos y en qué orden? |
| Implementar | ¿Está hecho y funciona? |

---

# Antes de la primera feature, el contexto del proyecto

- **`AGENTS.md`:** comandos, estructura, convenciones y prohibiciones.
- **Constitución:** los principios que no se negocian (capas, formato de los errores, tests antes que el código).

Se escriben **una vez** y todas las fases las leen: impiden que cada plan invente su propia arquitectura.

<div class="nota">

Si corriges **la misma decisión** por segunda vez en un plan («los errores van en español»), no es de la feature: llévala a la **constitución**.

</div>

---

# La persona decide; el agente aporta velocidad

| Fase | La persona | El agente |
|------|------------|-----------|
| **Especificar** | Decide comportamiento, *edge cases* y alcance | Estructura, pregunta y detecta huecos |
| **Planificar** | Acepta o rechaza cada decisión técnica | Propone ficheros, decisiones y orden |
| **Descomponer** | Comprueba tamaño y orden | Divide el plan en *tasks* |
| **Implementar** | Revisa el código y hace el *commit* | Implementa y ejecuta los tests |

> En todas las fases aparece **aprobar** o **revisar**: ninguna la cierra el agente. Una pregunta del agente es una decisión que tomarás tú.

---

# *Plan* propone, *build* guarda: solo el fichero acordado

| Fase | Agente |
|------|--------|
| Especificar, planificar y descomponer | ***plan*** propone; ***build*** guarda el documento |
| Implementar | ***build***, que edita y ejecuta tests |

```text
Guarda el plan que hemos acordado en
docs/specs/A-añadir-tarea/plan.md.
No crees ni modifiques ningún otro fichero.
```

<div class="cuidado">

Al cambiar a *build*, el agente puede **adelantarse** y empezar a implementar. Revisa `git status` antes de seguir.

</div>

---

# Una sesión por fase y un commit por documento aprobado

<div class="columnas">
<div>

## Sesión nueva (`/new`)

- En cada fase y en cada grupo de *tasks*.
- No se pierde nada: lo importante está **escrito** y el agente lo vuelve a leer.
- Una sesión larga arrastra discusiones que ya no importan.

</div>
<div>

## Un commit

- Spec aprobada, plan aprobado, *tasks* aprobadas, cada grupo de *tasks*.
- El historial cuenta la **historia** de la feature.
- Lo haces tú, **después de revisar**.

</div>
</div>

---

# Una rama por feature: `main` solo recibe features completas

```bash
git switch -c feature/A-añadir-tarea   # al empezar el plan
# plan, tasks y ciclos, cada uno con su commit
git switch main
git merge --no-ff feature/A-añadir-tarea
git branch -d feature/A-añadir-tarea
```

- **La spec se aprueba en `main`:** la ve todo el equipo.
- `--no-ff` crea un **commit de fusión** que marca la feature.
- Si se abandona, se borra la rama y `main` queda igual.

> Fusionar es una **decisión** de una persona, y la rama se fusiona **entera**.

---

# Cada punto de control responde a una sola pregunta

| Punto | Después de | Pregunta |
|-------|------------|----------|
| **0** | Contexto y replanificación | ¿Están claros los principios del proyecto? |
| **1** | Especificar | ¿La spec dice lo que queremos? |
| **2** | Planificar | ¿Es la forma correcta de construirlo? |
| **3** | Descomponer | ¿Son pasos pequeños, ordenados y verificables? |
| **4** | Cada grupo de *tasks* | ¿El código cumple la task, la spec y la constitución? |

En el punto 2 no discutes si la tarea vacía devuelve 400 (eso se decidió en el 1), sino **dónde** se comprueba.

---

# Un problema se corrige donde nació

| Detectas… | Se corrige en |
|-----------|---------------|
| Un comportamiento que nadie decidió | La **spec**, y se vuelve a aprobar |
| Una decisión técnica que no te gusta | El **plan** |
| Una *task* enorme o mal ordenada | Las ***tasks*** |
| Un error en el código | El **código** |
| Una decisión repetida en todas las features | La **constitución** |

<div class="cuidado">

Corregir **solo el código** deja documentos que mienten, y el agente repetirá el error. Es el ***spec drift***, de la UD3. No se pasa de fase sin aprobar el punto de control.

</div>

---

# La trazabilidad une requisito, plan, task, test y commit

<div class="flujo">
<div>Spec<br><strong>EC-01</strong></div>
<div>Plan<br>decisión que lo resuelve</div>
<div>Tasks<br>T-03 y T-04</div>
<div>Test<br>«EC-01: …»</div>
<div class="destacada">Commit<br>T-03 y T-04</div>
</div>

- **¿Dónde se cumple este requisito?** Se sigue la cadena hacia la derecha.
- **¿Por qué está este código aquí?** Hacia la izquierda: si un fichero no viene de ninguna task, nadie lo pidió.

> Pide al agente que **cite los identificadores** en el plan, las *tasks* y los tests.

---

# Ejemplo: EC-01 se convierte en decisión y en dos tasks

```markdown
- EC-01: Si el texto está vacío o solo tiene espacios, el
  sistema deberá responder 400.

- D-01: Validación del texto (EC-01): en el servicio, no en el
  controlador, como exige la constitución.

- [ ] T-03: Tests del servicio. Cubre EC-01 (D-01).
  Terminada cuando: los tests existen y fallan
- [ ] T-04: Servicio de tareas. Depende de T-03.
  Terminada cuando: los tests de T-03 pasan
```

La spec dice **qué**; el plan, **dónde**; las *tasks*, **en qué orden**: primero el test, después el código.

---

# Ejemplo: el test y el commit llevan el identificador

```javascript
test('EC-01: rechaza un texto con solo espacios', () => {
  expect(() => crearTarea('   ')).toThrow(
    'El texto de la tarea no puede estar vacío',
  );
});
```

```text
Fusiona la feature A: añadir una tarea
Feature A: T-03 y T-04, servicio de tareas con sus tests
Tasks de la feature A (aprobadas)
Plan de la feature A (aprobado)
```

> Primero los **documentos**; el código llega en grupos pequeños. Un solo commit «Implementar la feature A» indica que alguien se saltó el flujo.

---

# Entre features se replanifica: es volver al punto de control 0

| Pregunta | Si la respuesta es sí… |
|----------|------------------------|
| ¿Sigue siendo la que toca la siguiente feature? | Se reordena, divide o descarta |
| ¿Has corregido la misma decisión varias veces? | Va a la **constitución** |
| ¿El agente tropieza siempre con lo mismo? | Se añade una regla a `AGENTS.md` |
| ¿Repites el mismo prompt? | Se convierte en comando o skill |

Cada cambio va en su propio commit, **antes** de la siguiente feature. Si no cambia nada, ha servido: el contexto sigue diciendo la verdad.

---

# El flujo se ajusta al tamaño del cambio

| Cambio | Flujo adecuado |
|--------|----------------|
| Un texto o un error evidente de una línea | Un buen prompt |
| Un cambio pequeño en una feature con spec | Actualizar la spec y unas *tasks* |
| Una feature nueva y acotada | Spec y *tasks*; plan breve |
| Una feature con decisiones de arquitectura | El flujo completo |

<div class="transferencia">

**Spec Kit**, **Kiro** y **Conductor** automatizan el mismo flujo con otros nombres: contexto, spec, plan, *tasks* e implementación, con revisión humana. El método no depende de la herramienta.

</div>

---

# Sigue un requisito por el flujo

<div class="prueba">

En el punto de control 2 ves que el plan guarda las tareas en un fichero JSON y la constitución no dice nada del almacenamiento. ¿Dónde lo corriges?

</div>

<div class="prueba">

El plan decide que una tarea vacía se guarda como «Sin título». ¿Dónde lo corriges y por qué?

</div>

<div class="prueba">

Sigue **EC-02** (más de 280 caracteres): ¿en qué decisión, *task* y test aparecerá?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Cuatro fases, un artefacto por fase: **spec**, **plan**, ***tasks*** y **código**, precedidas por el contexto.
2. La persona **decide y aprueba**; el agente **redacta, propone e implementa**.
3. Cada punto de control hace **una pregunta**; el problema se corrige **donde nació**.
4. **Rama** por feature, **sesión** nueva por fase y **commit** por documento aprobado.
5. La **trazabilidad** une requisito, plan, task, test y commit; al terminar, se **replanifica**.

---

# Para practicar

- **Tema 1 de la unidad:** el recorrido de EC-01 (apartado 1.8) y las preguntas de replanificación (apartado 1.2.8).
- **Ejercicio E01, «El recorrido de una feature»:** asigna a cada fase su artefacto, agente y punto de control, y detecta fallos del flujo en un `git log`.

En el tema 2 el agente propondrá el **plan técnico** a partir de la spec aprobada.
