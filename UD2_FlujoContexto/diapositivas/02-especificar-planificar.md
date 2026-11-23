---
marp: true
theme: sdd
paginate: true
lang: es
title: Especificar y planificar con el agente
description: Diapositivas del tema 2 de la UD2 de Desarrollo guiado por especificaciones con IA
footer: UD2 · Tema 2 · Especificar y planificar con el agente
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD2 · Tema 2

# Especificar y planificar con el agente

Criterios de evaluación: **OA2 b**

---

# Al terminar sabrás…

1. Qué hace el agente al **especificar** y qué decisiones **no** le tocan.
2. Que el **plan** decide el **cómo**, sin código, y qué contiene cada **decisión técnica**.
3. **Generar** el plan con el agente *plan*, **guardarlo** con *build* y **revisarlo** en el punto de control 2.
4. Qué hacer cuando el plan descubre un **hueco en la spec**.

---

# Al especificar, el agente estructura y pregunta; tú decides

| El agente puede… | El agente no debe… |
|------------------|--------------------|
| Estructurar unas notas con la plantilla | Decidir el comportamiento que falta |
| Detectar palabras vagas | Rellenar huecos con «lo más habitual» |
| Proponer *edge cases* | Añadir funcionalidades que nadie pidió |
| Preguntarte lo que no está decidido | Responder él esas preguntas |

> Todo lo que el agente **propone** pasa por ti; todo lo que **decide** sin preguntarte es un fallo de la fase.

---

# La entrevista: el agente pregunta antes de escribir nada

```text
Vamos a especificar la feature B, «Ver la lista de tareas».
Lee @docs/prd.md y la spec de la feature A.

No escribas la spec todavía. Hazme las preguntas que
necesites, de una en una. Para cada pregunta, propón dos
o tres respuestas y di qué consecuencia tiene cada una.
```

- Cada respuesta tuya es una **decisión de producto** que acaba en la spec.
- Decidir entre tres opciones explicadas es más rápido que inventar la respuesta.

---

# Antes de aprobar, una ronda de aclaración

```text
Lee @docs/specs/B-ver-lista/spec.md como si fueras a
implementarla mañana. No la modifiques. Haz una lista de
las decisiones que tendrías que tomar tú porque la spec
no las resuelve.
```

- Las que **se notarían desde fuera** van a la spec, con tu respuesta.
- Las internas se quedan para el plan.

> **Punto de control 1:** ¿podría alguien hacer el plan con esta spec **sin preguntarme nada** sobre el comportamiento?

---

# El plan decide el cómo; la spec, el qué

| | Spec | Plan |
|---|---|---|
| **Pregunta** | ¿Qué hace el sistema? | ¿Cómo lo construimos? |
| **Contiene** | Requisitos, criterios, *edge cases* | Ficheros, decisiones, orden, pruebas |
| **Habla de** | Comportamiento visible | Estructura interna |
| **Si cambia…** | El usuario lo nota | El usuario no nota nada |

Van en el plan: en qué capa se valida el texto, cómo se genera el identificador y si las tareas se guardan en memoria o en un fichero.

---

# En esta fase el agente no escribe código

1. **Revisar decisiones es más fácil sin código:** «la validación va en el servicio» se revisa en un segundo.
2. **El código ancla:** si ya existe, cambiar la decisión es tirar trabajo y tientas a aceptarla.
3. **El plan aún puede cambiar la spec:** hay que resolver los huecos antes de que exista código que dependa de ellos.

<div class="cuidado">

«Sin código» no es «sin nombres»: el plan dice qué ficheros se crean y cómo se llaman las funciones principales. No lleva el **cuerpo** de las funciones.

</div>

---

# El plan se deduce de tres fuentes

<div class="flujo">
<div><code>spec.md</code> aprobada<br>qué hay que hacer</div>
<div><code>constitution.md</code><br>lo que no se negocia</div>
<div>Código existente<br>lo que ya hay</div>
<div class="destacada"><code>plan.md</code><br>cómo se hace</div>
</div>

La spec marca qué cubrir, la constitución pone los límites y el código dice dónde encaja lo nuevo.

<div class="transferencia">

**Spec Kit** añade una **comprobación de la constitución** como puerta del plan; **Kiro** lo llama `design.md`. Un modo de planificación de otro agente no es un plan versionado.

</div>

---

# Un plan tiene diez secciones; dos no se omiten nunca

| Sección | Para qué |
|---------|----------|
| **Visión general** y contexto técnico | Entender el enfoque, con la tecnología de la constitución |
| **Comprobación de la constitución** | Detectar choques antes de construir |
| **Ficheros** | Ver el alcance del cambio |
| **Decisiones técnicas** | Revisar y trazar cada decisión |
| **Estrategia de pruebas** | Que ningún identificador se quede sin comprobar |

Completan el plan: metadatos, dependencias, secuencia de implementación y riesgos y dudas.

---

# Una decisión técnica tiene motivo, alternativa descartada y qué cubre

<div class="columnas">
<div>

## Mal

```markdown
- Se usará la
  librería uuid
  para los
  identificadores.
```

</div>
<div>

## Bien

```markdown
- D-03: Identificador
  (RNF-03). Se genera en
  el servicio con
  crypto.randomUUID().
  - Descartado: uuid.
    Añade una dependencia.
```

</div>
</div>

La alternativa descartada es la parte que más se olvida: evita que otra persona, u otro agente, proponga dentro de un mes lo que ya se rechazó.

---

# La estrategia de pruebas lleva una fila por cada identificador

| Spec | Cómo se comprueba |
|------|-------------------|
| EC-01 | Unitaria del servicio e integración de la API |
| RNF-01 | Integración, con 1.000 tareas guardadas |
| AC-01 | A mano en el navegador |

- **Unitaria:** una pieza sola. **Integración:** la petición atraviesa las capas. **A mano:** lo que solo se ve en la página.
- Se elige según **dónde se ve** lo que dice la spec.

> El identificador que falta es un requisito que nadie comprobará.

---

# El prompt de planificar dice qué leer, qué producir y qué no hacer

```text
Vamos a planificar la feature A. Lee @docs/specs/A-añadir-tarea/spec.md
y @constitution.md.

Propón un plan con estas secciones: visión general, decisiones
(D-01… con motivo y alternativa descartada) y estrategia de
pruebas (una fila por identificador de la spec)…

Reglas:
- No escribas código ni cambies la spec: si falta algo que se
  notaría desde fuera, márcalo con [NECESITA ACLARACIÓN].
- No añadas nada que no pida la spec.
```

Sesión nueva, rama de la feature y agente *plan*.

---

# Se guarda con *build*, y `git status` debe mostrar un solo fichero

```text
Guarda el plan que hemos acordado en
docs/specs/A-añadir-tarea/plan.md, con el estado «En revisión».
No crees ni modifiques ningún otro fichero.
```

1. `git status` solo debe mostrar `plan.md`. Si hay más, el agente se ha adelantado: `/undo`.
2. Lees el fichero **completo**: puede haber resumido algo al pasarlo a limpio.
3. Pasa a `Aprobado` y se hace el commit: `Plan de la feature A (aprobado)`.

---

# Punto de control 2: ¿es la forma correcta de construirlo?

| Se comprueba | Preguntas |
|--------------|-----------|
| **Constitución** | ¿Recorre todos sus principios? ¿Errores en el formato acordado? |
| **Cobertura de la spec** | ¿Cada identificador tiene su prueba? ¿No añade comportamiento? |
| **Decisiones** | ¿Motivo y alternativa en cada una? ¿Sin sobreingeniería? |
| **Viabilidad** | ¿Orden posible? ¿Sin suposiciones falsas ni código? |

El comportamiento **no se discute**: ya se decidió en el punto de control 1.

---

# Los errores típicos de un plan generado

| Error | Ejemplo |
|-------|---------|
| **Inventa comportamiento** | «Si el texto está vacío, se guarda como "Sin título"» |
| **Contradice la constitución** | Valida el texto en el controlador |
| **Dependencia innecesaria** | Añade `uuid` cuando Node trae `crypto.randomUUID()` |
| **Sobreingeniería** | Caché y paginación que nadie pidió |
| **Supone código que no existe** | Reutiliza un middleware de autenticación inexistente |

<div class="cuidado">

El primero es el más peligroso porque **parece razonable**. Si una frase describe qué ve el usuario y no está en la spec, se para.

</div>

---

# Cada propuesta se acepta o se rechaza, con motivo

| Propuesta del agente | Decisión | Motivo |
|----------------------|----------|--------|
| Validar con un middleware | Rechazada | La constitución pone la lógica en el servicio |
| Paquete `uuid` | Rechazada | Node trae `crypto.randomUUID()` |
| Array en memoria | Aceptada | Ninguna spec pide persistencia |
| Express, Vitest y supertest | Aceptada y **a la constitución** | Lo usarán todas las features |

Las rechazadas importantes pasan al plan como **alternativa descartada**.

---

# Si el plan descubre un hueco en la spec, se para

<div class="flujo">
<div>Se para el plan</div>
<div>Se <strong>decide</strong> el comportamiento</div>
<div class="destacada">La spec sube de versión (1.0 → 1.1) y se aprueba</div>
<div>Se retoma el plan, que cita la nueva versión</div>
</div>

```markdown
- RF-04: Cuando el sistema guarde una tarea nueva, deberá
  guardar el texto sin los espacios del principio y del final.
```

> Hallar un hueco ahora es una buena noticia: costaba una línea en la spec, no un fallo en producción.

---

# Revisa un plan y un hueco

<div class="prueba">

Clasifica en spec, plan o constitución: «las tareas se ordenan por fecha de creación», «el repositorio devuelve una copia del array», «todas las features usan Vitest».

</div>

<div class="prueba">

El agente propone paginación «por si la lista crece» y la spec no dice nada. ¿Qué haces y cómo lo dejas escrito?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Al especificar, el agente **estructura y pregunta**; el comportamiento lo decides **tú**.
2. El plan decide el **cómo**, **sin código**: cada decisión con motivo, alternativa descartada e identificadores que cubre.
3. Se discute con *plan*, se guarda con *build* y se comprueba con `git status`.
4. El **punto de control 2** revisa constitución, cobertura, decisiones y viabilidad, sin discutir el comportamiento.
5. Si el plan descubre un **hueco en la spec**, se para y la spec se vuelve a aprobar.

---

# Para practicar

- **Tema 2 de la unidad:** la plantilla del plan (apartado 2.3.4) y el plan aprobado de «Añadir una tarea» (apartado 2.7).
- **Ejercicio E02, «Plan con errores sembrados»:** revisa un plan con unos diez errores y corrígelo.
- **Ejercicio E03, «El plan de una feature»:** obtén con *plan* el plan de la feature B y revísalo con la lista del punto de control 2.

En el tema 3 el plan aprobado se convertirá en **tasks**.
