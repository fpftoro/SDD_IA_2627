---
marp: true
theme: sdd
paginate: true
lang: es
title: Casos prácticos
description: Diapositivas del tema 3 de la UD4 de Desarrollo guiado por especificaciones con IA
footer: UD4 · Tema 3 · Casos prácticos
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD4 · Tema 3

# Casos prácticos

Criterios de evaluación: **OA4 d**

---

# Al terminar sabrás…

1. Qué cambia al trabajar en un proyecto **nuevo**, en **código existente**, al **refactorizar** y al **migrar**.
2. **Especificar al tocar** y fijar el comportamiento actual con **tests de caracterización**.
3. Describir un cambio con una **spec delta** y archivarlo.
4. Usar los **tests como contrato** de no regresión.

---

# Cuatro situaciones, y el riesgo principal de cada una

| Situación | Qué se especifica primero | Riesgo principal |
|-----------|---------------------------|------------------|
| **Proyecto nuevo** | La constitución y la primera feature | Que las primeras features fijen malos patrones |
| **Código existente** | El comportamiento actual de lo que vas a tocar | Romper algo de lo que alguien depende |
| **Refactorización** | El comportamiento que no puede cambiar | Cambiarlo sin querer |
| **Migración** | El contrato observable del sistema | Que la versión nueva no haga lo mismo |

La spec dice **qué** hace el sistema, con independencia de **cómo** está hecho.

---

# En un proyecto nuevo el riesgo es empezar mal

- **La constitución, antes de la primera feature**, aunque sea corta: tiene que existir y crecer.
- **Las primeras features fijan el estilo:** lo que el agente decida en la A lo copiará en la B, la C y la D.
- **Sin código, el agente lo decide todo:** librería, estructura, formato de la API.

> Un mal patrón es barato de corregir en la primera feature y caro en la décima: por eso se **replanifica** en cada feature.

Se **explora** con *vibe coding* y se **formaliza** con una spec antes de llevarlo a producción.

---

# En código existente, «mejorar» un comportamiento raro puede romper a alguien

| Lo que hace el agente | Por qué es un problema |
|-----------------------|------------------------|
| Usa otra librería para lo mismo | Dos formas de hacer lo mismo |
| Sigue un patrón distinto | El siguiente no sabrá cuál es el bueno |
| Escribe una función que ya existe | Duplicación |
| **«Mejora» un comportamiento raro** | **Alguien dependía de él** |

En un proyecto nuevo, cambiar un comportamiento afecta a lo que no existe; en uno existente puede romper un informe, un script de otro equipo o la costumbre de los usuarios.

---

# En código existente, la constitución describe el presente

```text
Propón un borrador de constitución que describa cómo está
hecho el proyecto HOY.
- Describe lo que hay, no lo que debería haber.
- Si hay dos formas de hacer lo mismo, ponlas con
  [NECESITA DECISIÓN].
- Cita un fichero donde se vea cada principio.
```

Cada duda acaba en una **norma** o en una **deuda conocida**, apuntada para que el agente no la tome como ejemplo.

<div class="cuidado">

Un borrador desde el código **copia también sus defectos**: describir el presente no es aceptar todo.

</div>

---

# Se especifica al tocar, y el riesgo marca la prioridad

<div class="flujo">
<div>Hay que tocar un módulo</div>
<div>¿Tiene spec? <strong>No</strong>: spec del <strong>comportamiento actual</strong> y sus tests</div>
<div class="destacada">Especificar el <strong>cambio</strong></div>
<div>Plan, tasks y ciclos</div>
</div>

- Especificar todo el proyecto es inviable y las specs de lo que nadie toca se desactualizan.
- Sin esperar a tocar, se prioriza **lo que más daño hace si falla** (autenticación, pagos, datos personales).
- Una feature nueva añade a su spec la sección **Integración con el sistema existente**: qué usa, qué modifica, qué no toca.

---

# Los tests de caracterización fijan lo que el código hace hoy

| Test desde la spec | Test de caracterización |
|--------------------|-------------------------|
| La spec dice qué debe pasar | El código hace algo; el test lo fija |
| Se escribe antes y falla | Se escribe después y pasa |
| Si falla, el código está mal | Si falla, **el comportamiento ha cambiado** |
| El valor sale de la spec | El valor sale de **ejecutar** el código |

- Pones lo que **crees** que saldrá, ejecutas y apuntas lo que sale de verdad: cada sorpresa es un comportamiento que nadie había escrito.
- **A través de la API**, no de funciones internas: así sobreviven a la refactorización.

---

# ¿Fallo o comportamiento? Lo decide producto, y nada se arregla en silencio

| Lo que encuentras | Pregunta |
|-------------------|----------|
| Un texto con comas rompe las columnas de un CSV | ¿Alguien abre ese fichero esperando esas columnas? |
| Las fechas salen en UTC | ¿Algún informe o script cuenta con ese formato? |

- **Fallo:** se corrige con un **cambio** de la spec, con versión y tests.
- **Comportamiento:** se **documenta** tal cual.
- Lo dudoso se marca con `[NECESITA ACLARACIÓN]`.

Antes de cambiar el código cuesta una pregunta; después, un incidente.

---

# Una spec delta describe solo el cambio

| | Versión nueva de la spec | Delta (OpenSpec) |
|---|--------------------------|------------------|
| **Qué se escribe** | La spec entera | Solo lo que cambia |
| **Cómo se revisa** | Comparando versiones | Leyendo la delta |
| **Spec del sistema durante el cambio** | Ya cambiada, en la rama | Intacta hasta archivar |
| **Encaja mejor en** | Features nuevas | Cambios frecuentes en código existente |

Mientras el cambio está en curso, la spec dice **lo que es** el sistema; al terminar, la delta se **integra** en ella. Cada comportamiento debe tener **una sola** spec vigente.

---

# OpenSpec separa lo que el sistema hace hoy de lo que se propone cambiar

```text
openspec/
├── specs/exportacion/spec.md          ← lo que hace HOY
└── changes/
    ├── exportar-por-estado/           ← un cambio en curso
    │   └── specs/exportacion/spec.md  ← la delta
    └── archive/                       ← cambios terminados
```

| Sección de la delta | Al archivar… |
|---------------------|--------------|
| `ADDED Requirements` | Se añaden a la spec vigente |
| `MODIFIED Requirements` | **Sustituyen** al requisito con el mismo nombre |
| `REMOVED Requirements` | Se quitan |

---

# Un cambio se propone, se aplica y se archiva

<div class="flujo">
<div><strong>Proponer</strong><br>proposal, tasks y delta</div>
<div>¿Se aprueba el cambio?</div>
<div class="destacada"><strong>Aplicar</strong><br>tasks con sus tests</div>
<div>¿Cumple la delta?</div>
<div><strong>Archivar</strong><br>la delta se integra</div>
</div>

Es el flujo de la UD2 con otros nombres: proponer es especificar y planificar; aplicar, implementar; archivar, actualizar la spec del sistema.

<div class="cuidado">

En `MODIFIED` se copia el requisito **completo**, no solo la frase que cambia: si no, el vigente pierde el resto al archivar. Y archivar es como fusionar: **después** del último punto de control, nunca con tasks pendientes.

</div>

---

# Refactorizar con la spec y sus tests como mapa

1. **Primero**, la spec del comportamiento que no puede cambiar y sus tests, **todos en verde**.
2. **El plan dice qué cambia y qué no.**
3. **Los tests son el contrato de no regresión:** si pasan antes y después, el comportamiento externo se conserva. **No se tocan.**
4. **Refactorizar y cambiar, por separado:** si los mezclas, un test que falle no dirá por qué.

> El `implementador`, que no puede modificar los tests, es el agente ideal: mueve todo el código que quiera, pero no puede hacer que los tests digan otra cosa.

---

# Migrar: la misma spec y los mismos tests contra las dos versiones

<div class="flujo">
<div>1. Spec del sistema <strong>actual</strong></div>
<div>2. Tests de contrato, por la API</div>
<div class="destacada">3. Contra la versión <strong>actual</strong>: todo en verde</div>
<div>4. Versión nueva, guiada por la misma spec</div>
<div>5. Los mismos tests, en verde</div>
</div>

- Un test de contrato solo usa lo que ve un **cliente**: la API o la página; nunca las piezas internas.
- Si falla en el paso 3, **la spec está mal**. Si falla en el 5, la versión nueva no cumple el contrato.
- Se migra **por partes**, con las dos versiones conviviendo.

---

# Los cuatro casos, comparados

| | Nuevo | Existente | Refactorización | Migración |
|---|-------|-----------|-----------------|-----------|
| **Primera tarea** | Constitución breve | Constitución que describe el presente | Spec y tests de lo que no cambia | Spec del contrato |
| **Tests clave** | Desde la spec | De caracterización | Los existentes, sin tocarlos | De contrato |
| **Error típico** | Un mal patrón desde el inicio | Arreglar en silencio | Refactorizar y cambiar a la vez | No probar la spec con la versión actual |

---

# Elige el caso

<div class="prueba">

Heredas un módulo sin spec ni tests y te piden añadir un filtro. ¿Qué haces **antes** de tocar el código?

</div>

<div class="prueba">

Al caracterizar, un test falla porque el código devuelve las fechas en UTC y tú esperabas hora local. ¿Qué haces con el valor esperado y con el comportamiento?

</div>

<div class="prueba">

Una refactorización «necesita» cambiar un test para pasar. ¿Qué indica?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. En un proyecto **nuevo**, la constitución va antes de la primera feature.
2. En código **existente** se especifica **al tocar**, y el comportamiento actual se fija con **tests de caracterización**.
3. Una **spec delta** describe solo el cambio y se integra al **archivar**.
4. Al **refactorizar** y al **migrar**, los tests son el **contrato de no regresión**.

---

# Para practicar

- **Tema 3 de la unidad:** la delta de OpenSpec (apartado 3.4.3), el flujo de una migración (apartado 3.6.3) y el ejemplo integrador, el módulo de exportación heredado (apartado 3.9).
- **Ejercicio E05, «Spec de un módulo heredado»:** caracteriza un módulo sin spec ni tests, decide cada rareza y escribe la spec del comportamiento actual.
- **Ejercicio E06, «Un cambio con delta de OpenSpec»:** refactoriza con los tests intactos y especifica un cambio con una delta.

En el tema 4 estudiarás los **antipatrones** del flujo.
