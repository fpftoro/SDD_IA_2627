---
marp: true
theme: sdd
paginate: true
lang: es
title: Antipatrones del flujo
description: Diapositivas del tema 4 de la UD4 de Desarrollo guiado por especificaciones con IA
footer: UD4 · Tema 4 · Antipatrones del flujo
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD4 · Tema 4

# Antipatrones del flujo

Criterios de evaluación: **OA4 e**

---

# Al terminar sabrás…

1. Describir un **antipatrón** con síntoma, causa y corrección, y **diagnosticar desde la spec**.
2. Reconocer los antipatrones **por fase** y los tres riesgos que **no dan fallo visible**.
3. Repartir el trabajo en **rebanadas verticales** en lugar de capas.
4. Decidir **qué código leer** según el riesgo, con un mínimo fijo.

---

# Un antipatrón tiene síntoma, causa y corrección, y se diagnostica desde la spec

| Parte | Ejemplo |
|-------|---------|
| **Síntoma** | Un commit de trescientas líneas con tests y código |
| **Causa** | Se pidió «implementa todas las tasks» |
| **Corrección** | Un ciclo corto por grupo de tasks y un commit cada uno |

<div class="flujo">
<div>¿Lo decía la <strong>spec</strong>?</div>
<div>¿Lo recogían el <strong>plan</strong> y las <strong>tasks</strong>?</div>
<div>¿Lo comprobaba un <strong>test o gate</strong>?</div>
<div>¿Tenía el agente la <strong>información</strong>?</div>
<div class="destacada">Si sí a todo: el <strong>equipo</strong></div>
</div>

De lo más barato de corregir a lo más caro: el agente es el **último** sospechoso.

---

# En la spec: vaga, sin *edge cases*, sin límites o que prescribe la implementación

| Antipatrón | Corrección |
|------------|------------|
| **Spec vaga** («errores correctamente») | Un adjetivo pasa a medida o comportamiento observable |
| **Sin *edge cases*** | Recorrer los tipos de *edge case* |
| **Sin fuera de alcance** | Lo que se deja fuera a propósito |
| **Aprobada con marcadores** | Una spec con marcadores no se aprueba; un gate lo detecta |
| **Prescribe la implementación** | El cómo va al plan |

La prueba de siempre: **¿lo notaría alguien desde fuera?**

---

# Caso: una spec que decide por el plan

```markdown
- RF-01: El sistema deberá guardar las etiquetas en una
  tabla `etiquetas` con las columnas `id`, `tarea_id`, `nombre`.
- RF-02: El servicio `añadirEtiqueta(idTarea, nombre)`
  deberá insertar una fila.
```

- Contradice la constitución (los datos van en un fichero JSON): el agente elige a su gusto.
- Cambiar el almacenamiento obliga a **reabrir la spec** aunque el comportamiento no cambie.
- **Falta lo que sí importa:** una etiqueta repetida, vacía o una tarea inexistente.

Corrección: «Si la tarea ya tiene la etiqueta, **409** con `etiqueta_repetida`»; «si la tarea no existe, **404**». Los nombres, al plan.

---

# En el plan y en las tasks

| Antipatrón | Corrección |
|------------|------------|
| **Plan que es código** | Decide y justifica; solo las firmas |
| **Tecnología nueva por la puerta de atrás** | Primero la constitución, en su PR |
| **Plan que ignora el código existente** | *explore* mira antes de planificar |
| **Tasks por capas en una feature grande** | Rebanadas verticales |
| **Tasks sin criterio de terminado** | Un test que pasa o un comando |
| **El agente cambia los tests** | Permisos sobre `tests/` y `git diff` en cada revisión |

---

# Caso: «implementa todas las tasks»

```text
2b5765e Feature H: etiquetas
 5 files changed, 295 insertions(+)
```

Un solo commit. ¿Qué has perdido?

- **La revisión por ciclos:** el punto de control 4 no se responde con ocho tasks juntas.
- **Los tests antes que el código:** no se sabe si se ajustaron al código.
- **El punto de vuelta atrás:** la task 7 va pegada a seis buenas.

> Cambia el prompt para que **el ciclo sea la unidad**: cada commit, **un motivo** que explicas en una frase.

---

# Caso: el gate que molestaba

```javascript
// eslint-disable-next-line no-restricted-imports
import { repositorioTareas } from '../repositorios/repositorio-tareas.js';
```

El lint pasa, la CI queda en verde y el control que protegía la arquitectura ha dejado de proteger **esa línea, para siempre**, sin que nadie lo decidiera.

- **Una regla** en `AGENTS.md`: nunca añadir `eslint-disable`, `test.skip` ni bajar un umbral; si un control falla, parar y contarlo.
- **Un gate** que busca la trampa en el `git diff`: si encuentra algo, una persona lo lee y lo acepta **por escrito**.

Otros antipatrones de la validación: el test que describe el código y «verde significa hecho».

---

# En el contexto y en el equipo

| Antipatrón | Corrección |
|------------|------------|
| **`AGENTS.md` cajón de sastre** | Diagnosticar antes de añadir y podar |
| **Sesión eterna** | Una sesión por fase |
| **Decisiones solo en el chat** | Escribirlas en un fichero |
| **Adopción de golpe** | Etapas que se superan por hitos |
| **SDD para todo** | Una línea de commit para lo trivial |
| **Specs y planes aprobados sin leer** | Plantilla con preguntas concretas y revisor distinto del autor |

<div class="cuidado">

Caso: una spec aprobada en dos minutos con «las etiquetas distinguen mayúsculas», una decisión que había escrito el agente. **Aprobar es un acto; revisar es un trabajo.**

</div>

---

# Por capas no se ve nada hasta el final; por rebanadas, todo desde la primera

<div class="columnas">
<div>

## Por capas

Repositorio → servicio → API → página.

- Nada visible hasta el grupo 4.
- Los errores de encaje, al final.
- No se puede **recortar** la feature.
- Dos agentes se pisan: tocan los mismos ficheros.

</div>
<div>

## Por rebanadas verticales

Añadir etiqueta → quitar → filtrar, **cada una por las cuatro capas**.

- Algo **probable de punta a punta** en la primera.
- Se puede **fusionar sola**.
- Se reparten entre agentes.

</div>
</div>

---

# Las firmas en el plan hacen que las rebanadas encajen

```markdown
## Interfaces entre módulos (D-06)
src/servicios/servicio-etiquetas.js
    añadirEtiqueta(idTarea, nombre) -> Tarea
        lanza ErrorNoEncontrado, ErrorValidacion, ErrorConflicto
    quitarEtiqueta(idTarea, nombre) -> Tarea
```

- Sin ellas, dos agentes escriben `añadirEtiqueta(idTarea, nombre)` y `quitarEtiqueta(nombre, idTarea)`.
- Cada `lanza` debería corresponder a un `EC-` de la spec.

<div class="cuidado">

Una firma es una **decisión de diseño**: va en el plan, nunca en la spec. Solo las que **cruzan fronteras** entre tasks o agentes; sin cuerpo.

</div>

---

# SDD cambia el trabajo de sitio: de evaluar código a diseñar la intención

| | *Vibe coding* | SDD |
|---|---------------|-----|
| **Tiempo** | Pidiendo, mirando y corrigiendo código | Escribiendo y revisando specs, planes y tasks |
| **Error** | Se detecta al ver el resultado | En el punto de control más cercano a su origen |
| **Queda** | Código | Código, spec, plan, tasks e historial |

Cuatro habilidades: **escribir con precisión**, **pensar en comportamiento**, **juzgar cuánta estructura hace falta** y **mantener vivos los artefactos**. Y una quinta: **seguir entendiendo el sistema**.

---

# Tres riesgos que no dan ningún fallo visible

<div class="columnas-3">
<div>

## Fábrica a oscuras

Los agentes escriben, revisan y fusionan; **nadie lee el código**. El primer fallo que el agente no arregla encuentra a un equipo que **no conoce el sistema**.

</div>
<div>

## Deuda cognitiva

Comprensión **no pagada**: «lo hizo el agente». Se paga explicando el plan con tus palabras, leyendo los tests primero y rotando quién revisa.

</div>
<div>

## Avalancha de revisiones

Nueve PR y un cansancio que aprueba sin leer. Es un problema de **planificación**, no de capacidad de revisión.

</div>
</div>

---

# La avalancha se frena antes de que empiecen los agentes

| Medida | Qué evita |
|--------|-----------|
| **Spec aprobada** antes de lanzar un agente | Implementar lo que nadie ha decidido |
| **Límite de PR abiertas** por persona | Acumular más de lo que se puede leer |
| **Rebanadas pequeñas, una idea por PR** | PR que solo se entienden juntas |
| **Rechazar sin leer** lo que no cumple las normas | Gastar atención en lo que ya está mal |
| **El orden lo decide producto** | Revisar por azar |

Los revisores automáticos **suben el suelo** de cada PR, pero no deciden que nueve PR eran demasiadas.

---

# ¿Leer o no leer el código? Según el riesgo

| Postura | Punto débil |
|---------|-------------|
| **Leerlo siempre** | No escala si el agente produce mucho |
| **No leerlo y rodearlo de controles** | Los controles solo cubren lo que alguien pensó |
| **Leerlo según el riesgo** | Hay que acertar con el riesgo |

El curso: **según el riesgo** (mientras aprendes, todo). Tres preguntas: **¿cuánto cuesta que falle?**, **¿se puede deshacer?**, **¿lo comprueba ya algo?**

| Cambio | Cuánto leer |
|--------|-------------|
| Texto de un botón | El diff, de un vistazo |
| Guardar las tareas en un fichero | Todo, con una segunda persona |

---

# Hay un mínimo que se lee siempre, y la spec no sustituye al código

- Los **tests modificados o borrados**.
- Los **ficheros fuera de la línea «Ficheros»** de la task.
- Las **dependencias nuevas**.
- La **configuración**: lint, CI, permisos, `AGENTS.md`.
- Lo que toca **datos, accesos o secretos**.
- Las **trampas**: `eslint-disable`, `.skip`, `.only`.

<div class="nota">

La spec es la **fuente de verdad del comportamiento**, pero el código sigue siendo de las personas: tiene **estado**, la regeneración **no es idéntica** y hay que **depurar** el código real.

</div>

---

# Diagnostica un antipatrón

<div class="prueba">

Un commit trae seis tasks, los tests pasan y uno de ellos tiene un `.skip`. Nombra los antipatrones, su causa y la corrección.

</div>

<div class="prueba">

Nueve PR abiertas a media tarde. ¿Qué medidas habrían evitado la avalancha **antes** de empezar?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Un antipatrón tiene **síntoma, causa y corrección**, y el diagnóstico empieza por la **spec**, no por el agente.
2. **Rebanadas verticales** en lugar de capas.
3. Tres riesgos sin fallo visible: **fábrica a oscuras**, **deuda cognitiva** y **avalancha de revisiones**.
4. El código se lee **según el riesgo**, con un **mínimo fijo**.

---

# Para practicar

- **Tema 4 de la unidad:** los antipatrones por fase (apartado 4.2), las rebanadas verticales (apartado 4.3) y el ejemplo integrador, auditar la rama de la feature H (apartado 4.10).
- **Ejercicio E07, «Detectar antipatrones»:** audita un repositorio con el historial de una feature mal llevada y corrígelo en el orden del flujo.
- **Ejercicio E08, el integrador:** dos features en paralelo con varios agentes, gobernanza del equipo y auditoría final.
