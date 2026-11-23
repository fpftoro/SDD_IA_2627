---
marp: true
theme: sdd
paginate: true
lang: es
title: Empezar con SDD y agentes de IA
description: Diapositivas de apoyo a la explicación del curso de introducción al desarrollo guiado por especificaciones con agentes de IA
footer: Curso de introducción · Empezar con SDD y agentes de IA
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · Curso de introducción

# Empezar con SDD y agentes de IA

Seis sesiones con ejercicios sobre un mismo ejemplo

---

# El curso recorre el camino de una idea a un código comprobado

<div class="flujo">
<div>1 · Qué es SDD</div>
<div>2 · Contexto y entorno</div>
<div>3 · Especificaciones</div>
<div>4 · Del spec al código</div>
<div>5 · Agentes con roles</div>
<div class="destacada">6 · En paralelo</div>
</div>

Cada sesión es lo mismo: **lees** el tema, **practicas** en clase y **repasas** en casa con una práctica más.

> No hay proyecto final: aprendes el método con ejercicios y lo aplicarás después en el proyecto de tu módulo.

---

# Todos los ejercicios usan el mismo ejemplo: reservar salas de un centro

| Feature | Qué hace | Sesión |
|---------|----------|--------|
| **A · Crear una reserva** | Reservar una sala en una franja, con sus reglas | 3 y 4 |
| **B · Cancelar una reserva** | Liberar la franja de una reserva activa | 5 |
| **C · Consultar las reservas** | Listar las de una sala en un día, ordenadas | 6 |

Lo construyes con **la tecnología de tu módulo**: el método es el mismo para cualquier lenguaje.

---

<!-- footer: "Sesión 1 · Qué es SDD y por qué" -->

# Al terminar la sesión 1 sabrás…

1. Por qué, sin especificación, el agente **rellena los huecos** con lo más probable.
2. Qué es el **desarrollo guiado por especificaciones** (SDD) y qué documentos intervienen.
3. Cuándo usar SDD y cuándo basta un buen prompt.

---

# Con un agente, lo difícil ya no es escribir código

```text
Haz el sistema de reservas de salas del centro.
```

Una persona de tu equipo preguntaría. El agente **no pregunta: elige lo más probable** y sigue.

- ¿Qué salas hay? ¿Hasta qué hora?
- ¿Se puede reservar ayer?
- ¿Qué pasa si dos personas piden la misma sala?

---

# Cada elección del agente es una decisión que nadie ha tomado

| Pregunta sin respuesta | Lo que decide el agente |
|------------------------|-------------------------|
| ¿Y si la sala no existe? | Crea la reserva igualmente |
| ¿Se puede reservar ayer? | Sí |
| ¿10–11 y 11–12 chocan? | Depende de si escribió `<` o `<=` |
| ¿Cómo se avisa de un error? | Un texto distinto en cada sitio |

> Los fallos más caros son los que pasan la demostración.

---

# Sin estructura, el código acaba siendo la especificación

<div class="flujo">
<div>Pides algo</div>
<div>Genera código</div>
<div>«Casi» lo que querías</div>
<div class="destacada">Pides otro ajuste</div>
</div>

Cada vuelta puede romper algo anterior y **ninguna decisión queda escrita**. Para saber qué hace el sistema hay que **leer el código**.

---

# SDD decide antes de generar: la spec es el contrato

<div class="flujo">
<div>Idea</div>
<div class="destacada"><strong>Spec</strong><br>qué</div>
<div><strong>Plan</strong><br>cómo</div>
<div><strong>Tasks</strong><br>pasos</div>
<div><strong>Tests y código</strong></div>
</div>

Tú **revisas y apruebas** cada documento antes de seguir. El agente redacta, propone e implementa.

> Corregir pronto sale barato: una frase de spec cuesta menos que reescribir código en uso.

---

# *Vibe coding* para explorar; SDD para lo que tiene que durar

| Situación | Enfoque |
|-----------|---------|
| Un prototipo que vas a tirar | *Vibe coding* |
| Cambiar un texto o una configuración | Un buen prompt |
| Reglas de negocio, que dura o que mantienen varias personas | **SDD** |

<div class="cuidado">

Si el prototipo se queda, **escribe su spec** antes de seguir construyendo sobre él.

</div>

---

# Prueba tú: ¿qué decidiría el agente?

<div class="prueba">

Mira este pseudocódigo: guarda la reserva si la sala está libre. Lista **ocho decisiones implícitas**: qué comprueba, qué no y qué devuelve en cada caso.

</div>

<div class="prueba">

Elige: ¿*vibe coding* o SDD para el módulo que calcula las reservas de todo un centro?

</div>

---

<!-- footer: "Sesión 2 · El contexto y el entorno" -->

# Al terminar la sesión 2 sabrás…

1. Qué es la **ventana de contexto** y por qué más contexto no es mejor.
2. Las **tres capas** de contexto: `AGENTS.md`, constitución y spec.
3. Lo esencial de **OpenCode**: agentes *plan* y *build*, sesiones y permisos.

---

# El modelo no recuerda nada: solo ve lo que cabe en la ventana

- **Lo que no está en la ventana, no existe** para el modelo.
- **Todo lo que está compite por la atención**, sea útil o no.
- **El contexto cuesta** (cuota, dinero o equipo): una sesión larga reenvía su historial en cada petición.

> Da **lo justo** para esta tarea y escribe en **ficheros** lo que importa después: la conversación se pierde, el repositorio no.

---

# Más contexto no es mejor

<div class="columnas">
<div>

## Sesión larga

Propuestas descartadas, errores ya arreglados y ficheros que ya no importan. El agente **empeora**.

</div>
<div>

## Sesión limpia

Una tarea, los documentos justos. Con `/new` la ventana empieza **vacía**.

</div>
</div>

<div class="nota">

Lo importante ya está en los documentos: cambiar de sesión no pierde nada.

</div>

---

# El contexto se organiza en tres capas, de lo estable a lo concreto

| Capa | Responde a | Alcance |
|------|-----------|---------|
| **`AGENTS.md`** | ¿Cómo se trabaja aquí? | Todo el proyecto |
| **Constitución** | ¿Qué principios no se rompen? | Todo el proyecto |
| **Spec** | ¿Qué hace esta funcionalidad? | Una feature |

`AGENTS.md` y la constitución se cargan **siempre**; la spec, cuando se trabaja esa feature.

---

# Cada pregunta del agente tiene su sitio

| Pregunta | Dónde está la respuesta |
|----------|-------------------------|
| ¿Cómo se ejecutan los tests? | `AGENTS.md` |
| ¿Qué formato tienen los errores? | Constitución |
| ¿Qué pasa si la sala no existe? | La spec |
| ¿Qué hago ahora? | Tu prompt |

> Si una pregunta no tiene respuesta en ningún artefacto, el agente **la responde por su cuenta**.

---

# Lo que se carga siempre es corto, concreto y verdadero

<div class="columnas">
<div>

## Mal

```markdown
- Escribe buen código.
- Tests: `npm test`
  (el comando no existe).
```

</div>
<div>

## Bien

```markdown
- Identificadores en
  español.
- Tests: el comando que
  existe de verdad.
```

</div>
</div>

Cada línea ocupa contexto en **todas** las sesiones, y una regla falsa es peor que ninguna.

---

# OpenCode: *plan* analiza, *build* construye

| Qué quieres | Cómo |
|-------------|------|
| Conectar un modelo | `/connect` y `/models` |
| Alternar entre *plan* y *build* | `Mayús+Tab` |
| Dar un fichero al agente | `@docs/prd.md` |
| Empezar con la ventana vacía | `/new` |
| Deshacer el último mensaje y sus cambios | `/undo` |

<div class="cuidado">

Las claves de los proveedores **nunca** van al repositorio.

</div>

---

# Prueba tú: con y sin contexto

<div class="prueba">

Pide el mismo encargo al agente sin la constitución y con ella. Compara en una tabla qué decide por su cuenta en cada caso.

</div>

<div class="prueba">

¿Dónde pondrías «Si la sala no existe, devuelve `sala_desconocida`»: `AGENTS.md`, constitución o spec?

</div>

---

<!-- footer: "Sesión 3 · Escribir buenas especificaciones" -->

# Al terminar la sesión 3 sabrás…

1. Qué hace buena a una spec y a qué pregunta responde cada sección.
2. Escribir **requisitos, criterios y *edge cases*** verificables, con EARS.
3. Un **método de siete pasos** para decidir qué lleva una spec.
4. Usar al agente para **encontrar huecos** sin que decida por ti.

---

# Una buena spec es inequívoca, verificable y delimitada

| Sección | Pregunta |
|---------|----------|
| **Contexto** | ¿Para qué sirve? |
| **Requisitos** (`RF`, `RNF`) | ¿Qué hace y con qué calidad? |
| **Criterios** (`AC`) | ¿Cuándo está terminada? |
| ***Edge cases*** (`EC`) | ¿Qué pasa cuando algo se sale de lo normal? |
| **Fuera de alcance** | ¿Qué no hay que hacer? |

Cada cosa lleva un **identificador** para citarla desde el plan, las tasks y los tests.

---

# Un requisito atómico tiene una sola responsabilidad

<div class="columnas">
<div>

## Mal

```markdown
- RF-01: El sistema
  validará los datos,
  guardará la reserva y
  avisará a la persona.
```

</div>
<div>

## Bien

```markdown
- RF-01: Validará los
  datos de la reserva.
- RF-02: Guardará la
  reserva activa.
- RF-03: Devolverá la
  reserva creada.
```

</div>
</div>

Juntos, el agente puede **olvidar uno**. Cada `RF` se comprueba con un test.

---

# Los criterios de aceptación llevan valores concretos

```text
AC-03: Mientras «Aula 1» tenga una reserva activa el
10 de marzo de 10:00 a 11:00, cuando se reserve «Aula 1»
el 10 de marzo de 11:00 a 12:00, el sistema deberá
crear la reserva.
```

- **Binario:** o se cumple o no.
- **Observable:** lo nota quien usa el sistema.
- **Con valores:** «una reserva» no vale; «10:00 a 11:00» sí.

---

# Un *edge case* da la respuesta exacta, no «avisar al usuario»

```text
EC-08: Si la franja se solapa con la de otra reserva
activa de la misma sala y día, entonces el error será
`sala_ocupada` con el mensaje «La sala ya está
reservada en esa franja».
```

> El código y el mensaje, escritos en la spec: si no, el agente se los inventa.

---

# EARS da forma a los requisitos: condición y respuesta

| Patrón | Plantilla |
|--------|-----------|
| **Por evento** | **Cuando** …, el sistema deberá… |
| **No deseado** | **Si** …, **entonces** el sistema deberá… |
| **Combinado** | **Mientras** …, **cuando** …, el sistema deberá… |

<div class="cuidado">

EARS da forma, no contenido: «Si hay un error, el sistema lo gestionará correctamente» sigue la plantilla y **no dice nada**.

</div>

---

# Lo que no está decidido se marca; no se inventa

```text
- EC-03: Si la fecha es anterior a hoy, el error será
  `fecha_pasada`.
  [NECESITA ACLARACIÓN: ¿la fecha de hoy es válida
  aunque la franja ya haya empezado?]
```

- Una spec con algún marcador **no se aprueba**.
- Las decisiones las toma **una persona**.

---

# Siete pasos, en orden, para escribir una spec

| Paso | Qué haces |
|------|-----------|
| **1. Delimitar** | Una feature en una frase y lo que se queda fuera |
| **2. Camino feliz** | Quién, qué datos entran, qué sale |
| **3. Cada dato** | ¿Falta, está vacío, mal formado, fuera del conjunto? |
| **4. Límites y estados** | Los límites por los dos lados; el estado previo |
| **5. Errores exactos** | Código, mensaje y orden si fallan varios |
| **6. Ejemplos** | Un `AC` por regla importante, con valores |
| **7. Revisar** | Ronda de aclaración y lista de comprobación |

---

# Las preguntas de borde descubren los huecos de los pasos 3 y 4

| Pregunta | En las reservas |
|----------|-----------------|
| ¿Y si falta el dato? | Sin sala o sin nombre |
| ¿Y si no tiene el formato? | Hora «25:90» |
| ¿Y si no está entre los valores? | Una sala que no existe |
| ¿Y si se pasa por un lado o por el otro? | Duración de 20 o de 180 minutos |
| ¿Y si está justo en el límite? | Una reserva que acaba cuando empieza otra |
| ¿Y si fallan dos cosas a la vez? | Fecha pasada y sala inexistente |

---

# El agente pregunta y propone; tú decides

| El agente puede… | El agente no debe… |
|------------------|--------------------|
| Entrevistarte antes de escribir | Decidir el comportamiento que falta |
| Detectar palabras vagas | Rellenar huecos con «lo habitual» |
| Proponer *edge cases* | Añadir lo que nadie pidió |

> Cada respuesta tuya es una **decisión de producto** que acaba en la spec.

---

# Prueba tú: de la frase vaga a la verificable

<div class="prueba">

Reescribe en EARS dos frases del préstamo de portátiles: **(a)** «Un préstamo no puede durar demasiado». **(b)** «Nadie puede acaparar portátiles». Añade un *edge case* a cada una.

</div>

<div class="prueba">

Escribe la spec de la feature A con los siete pasos y pide al agente que te entreviste antes de aprobarla.

</div>

---

<!-- footer: "Sesión 4 · Del spec al código" -->

# Al terminar la sesión 4 sabrás…

1. Las fases del flujo y qué se revisa en cada **punto de control**.
2. Qué lleva un **plan** (con **firmas**) y cómo se dividen las **tasks**.
3. Por qué los **tests se escriben antes** y qué es el «rojo correcto».
4. Corregir cada problema **donde nació**.

---

# Cuatro fases, cada una con su documento y su punto de control

<div class="flujo">
<div><strong>Especificar</strong><br>spec.md</div>
<div><strong>Planificar</strong><br>plan.md</div>
<div><strong>Descomponer</strong><br>tasks.md</div>
<div class="destacada"><strong>Implementar</strong><br>tests y código</div>
</div>

Cada fase termina con **tu revisión**: no se pasa a la siguiente sin aprobarla. **Una sesión nueva por fase** y **un commit por documento aprobado**.

---

# El plan decide el cómo, y cada decisión se justifica

```text
D-03: Fecha de hoy (EC-03). La lógica recibe `hoy`
como parámetro; la entrada la obtiene del sistema.
  - Descartado: leer la fecha dentro de la lógica.
    Los tests dependerían del día en que se ejecutan.
```

- Motivo, **alternativa descartada** y qué identificadores cubre.
- En esta fase **el agente no escribe código**.

---

# Las firmas del plan permiten repartir el trabajo

```text
crearReserva(datos, hoy) -> reserva | error
  datos: sala, fecha, inicio, fin, nombre
  errores: datos_incompletos, sala_desconocida,
           fecha_pasada, sala_ocupada…
```

Nombre, parámetros, qué devuelve y qué errores da: **sin cuerpo**.

> Con las firmas, otro agente puede escribir los tests y otro el código sin verse.

---

# Una task es pequeña, verificable y trazable

```text
- [ ] T-03: Validaciones y creación de la reserva
  - Fichero: módulo de lógica
  - Depende de: T-02
  - Terminada cuando: los tests de T-01 pasan
```

- Uno o dos ficheros por task.
- Se agrupan; **cada grupo termina en un punto de control**.
- **El primer grupo son los tests.**

---

# Los tests salen de la spec y se escriben antes del código

<div class="columnas">
<div>

## Mismo agente

Escribe el código y luego los tests: los dos salen de **la misma interpretación**. Compruebas el código contra sí mismo.

</div>
<div>

## Desde la spec

Un test por cada `AC` y `EC`, con su identificador y los **valores exactos** de la spec.

```text
A-EC-08: rechaza una reserva
que se solapa
```

</div>
</div>

---

# El test recién escrito tiene que fallar por el motivo correcto

| Rojo | ¿Sirve? |
|------|---------|
| Aún no existe `crearReserva`, el nombre de la firma | **Sí** |
| «Esperaba `sala_ocupada`» y la reserva se creó | **Sí** |
| Error de sintaxis | No |
| Ruta o nombre distinto del de la firma | No |

<div class="cuidado">

Un test que falla por el motivo equivocado no demuestra nada. Revísalos **antes** de implementar, con la spec al lado.

</div>

---

# Se implementa en ciclos cortos, un grupo de tasks cada vez

<div class="flujo">
<div>Sesión nueva y <em>build</em></div>
<div>Prompt con reglas</div>
<div>Revisas <code>git diff</code> y ejecutas los tests</div>
<div class="destacada">Commit del grupo</div>
</div>

Reglas del prompt: haz solo estas tasks, **no cambies un test para que pase** y, si algo no encaja, para y pregunta.

---

# Cada problema se corrige donde nació

| Detectas… | Se corrige en |
|-----------|---------------|
| Un comportamiento que nadie decidió | La **spec** (versión nueva) |
| Una decisión técnica que no te gusta | El **plan** |
| Una task enorme o mal ordenada | Las **tasks** |
| Un error de código | El **código**, con un test que lo reproduce |
| Una decisión repetida en todas las features | La **constitución** |

<div class="cuidado">

Corregir solo el código cuando el problema era de la spec es ***spec drift***: los documentos mienten.

</div>

---

# Prueba tú: ¿dónde se corrige?

<div class="prueba">

Un test falla porque la spec no dice si una reserva puede acabar a las 24:00. ¿Qué documento cambias y qué haces después?

</div>

<div class="prueba">

Implementa la feature A en ciclos. Al terminar, cambia `<` por `<=` en el solapamiento: si ningún test falla, ese test no protege nada.

</div>

---

<!-- footer: "Sesión 5 · Agentes con roles" -->

# Al terminar la sesión 5 sabrás…

1. Cuándo compensa usar **más de un agente** y cuándo no.
2. Tres roles: **arquitecto**, **probador** e **implementador**.
3. Limitar sus **permisos** para que cada uno haga solo lo suyo.
4. Pasar el trabajo de uno a otro (*handoffs*) y revisarlo.
5. Comprobar si un cambio en los agentes **funciona de verdad**.

---

# Un solo agente se revisa a sí mismo y puede tocar los tests

| Límite | Qué pasa |
|--------|----------|
| **Contexto** | La ventana se llena de todo |
| **Se revisa a sí mismo** | Comprueba lo que él entendió, no la spec |
| **Demasiados permisos** | Quien implementa puede cambiar los tests |
| **Todo en serie** | Lo independiente espera en fila |

> La solución no es un agente más grande: es **repartir el trabajo** con un papel, contexto y permisos justos.

---

# Más agentes solo si cada uno resuelve un problema concreto

<div class="cuidado">

Cada agente nuevo cuesta más tokens, más coordinación y más traspasos. **Empieza con uno** y añade otro solo cuando puedas decir qué problema resuelve.

</div>

Repartir el trabajo **no reparte las decisiones**: las sigues tomando tú.

---

# Tres roles: planifica, prueba, programa

| | `arquitecto` | `probador` | `implementador` |
|---|--------------|------------|-----------------|
| **Hace** | Plan y tasks | Tests desde la spec | Código para los tests |
| **Edita** | Solo `plan.md` y `tasks.md` | Los tests y `tasks.md` | Todo menos tests y docs |
| **No puede** | Escribir código | Escribir código | Tocar los tests |

> El **probador** es el que más cambia el resultado: sus tests no dependen del código.

---

# Los permisos son la garantía; el texto, solo una petición

```yaml
---
description: Implementa las tasks. No toca los tests.
permissions:
  - { action: edit, resource: "*", effect: allow }
  - { action: edit, resource: "tests/**", effect: deny }
  - { action: edit, resource: "docs/**", effect: deny }
  - { action: edit, resource: "docs/specs/*/tasks.md", effect: allow }
---
```

**Gana la última regla que coincide:** arriba lo general, debajo las excepciones. Compruébalo con `opencode debug agents`.

---

# El *handoff* se apoya en los documentos aprobados

| Parte | Ejemplo |
|-------|---------|
| Feature y documentos | B; spec y plan aprobados |
| Encargo | El grupo 2 de las tasks |
| Límites | Solo esos ficheros; los tests no se tocan |
| Qué entregar | Tasks marcadas, tests en verde y lo que no encajó |

> Si un traspaso necesita explicar una decisión, esa decisión falta en el plan o en la spec.

---

# Los comandos son *handoffs* guardados en el repositorio

```text
/planificar B-cancelar-reserva
/escribir-tests B-cancelar-reserva
/implementar B-cancelar-reserva 2
/validar B-cancelar-reserva
```

Cada uno dice qué leer, qué hacer, qué límites respetar y qué entregar. Se **versionan** y los usa todo el equipo.

---

# Revisa quien no implementó: `/validar` propone, tú decides

<div class="flujo">
<div>Agente <em>plan</em>, sesión nueva</div>
<div>Matriz de trazabilidad</div>
<div>Hallazgos clasificados</div>
<div class="destacada">Aceptas o rechazas, con motivo</div>
</div>

Es un informe de **propuestas, no un veredicto**: reprodúcelas y contrástalas con la spec.

---

# Un cambio en los agentes se comprueba con casos fijos, no con una sesión

- **Casos fijos:** estado de partida, encargo exacto y criterio de éxito decidido antes. El agente no los ve.
- **Tres puntuaciones por separado:** resultado, límites y escalar.
- **Repetir y contar:** «2 de 3», no «67 %».
- **Un cambio cada vez** entre dos configuraciones.

<div class="cuidado">

Tests en verde después de editar un test que no podía tocar: resultado sí, límites **no**.

</div>

---

# Prueba tú: ¿qué evita cada permiso?

<div class="prueba">

Abre OpenCode con el `implementador` y pídele «añade un test». ¿Qué ocurre? Haz lo mismo con el `probador` y «crea código de la aplicación».

</div>

<div class="prueba">

Haz la feature B con los tres roles: ¿qué problema resolvió cada uno y en qué paso estuvo a punto de fallar algo?

</div>

---

<!-- footer: "Sesión 6 · Trabajar en paralelo" -->

# Al terminar la sesión 6 sabrás…

1. Por qué dos agentes no pueden compartir carpeta y qué son los ***worktrees***.
2. Qué trabajos se pueden hacer **a la vez** y quién lo decide.
3. Lanzar `probador` e `implementador` **en paralelo** e interpretar las **discrepancias**.

---

# Dos agentes en la misma carpeta se pisan

- Solo hay **una rama activa**: si un agente cambia de rama, el otro se encuentra otros ficheros.
- `git status` y `git diff` **mezclan** el trabajo de los dos.
- Si uno ejecuta los tests, prueba el código **a medio hacer** del otro.

> La solución: una carpeta por agente, con el mismo historial.

---

# Un *worktree* por agente: carpeta propia, historial común

```bash
git worktree add ../reservas-tests  -b feature/C-tests
git worktree add ../reservas-codigo -b feature/C-codigo
git worktree list
```

- Una sesión de OpenCode **por carpeta**.
- Instala las dependencias en cada una si hace falta.
- Ningún agente sale de su carpeta: la plantilla lo prohíbe con `external_directory`.

---

# En paralelo, solo lo que ni se pisa ni decide lo mismo

| Trabajo | ¿En paralelo? |
|---------|---------------|
| Tests y código de una feature, con **firmas** en el plan | Sí |
| Dos features que tocan el mismo módulo | **No** |
| Varias búsquedas en el código | Sí, solo leen |
| Un agente que necesita lo que crea otro | **No** |

> Lo decides tú, mirando los planes **antes**. Si dudas, en serie.

---

# Tests y código a la vez, desde la misma spec y las mismas firmas

<div class="flujo">
<div>Spec y plan con firmas</div>
<div><strong>Worktree 1</strong><br>probador</div>
<div><strong>Worktree 2</strong><br>implementador</div>
<div class="destacada">Se juntan y se ejecutan los tests</div>
</div>

Si dos agentes que parten de lo mismo **no coinciden**, algo estaba ambiguo: es una **prueba de la spec**.

---

# Si los tests fallan al juntar, se diagnostica antes de arreglar

| Qué pasa | Diagnóstico | Se corrige en |
|----------|-------------|---------------|
| El test comprueba algo que la spec no dice | Test mal | El test |
| El código no hace lo que dice la spec | Error de implementación | El código |
| Los dos siguen la spec, pero la leen distinto | **Spec ambigua** | La spec |
| La firma no era la misma | Firma incompleta | El plan |

---

# Después del curso, los pasos se repiten en cualquier proyecto

<div class="columnas">
<div>

1. PRD breve
2. Lista de features
3. Constitución
4. `AGENTS.md`

</div>
<div>

5. Agentes adaptados
6. Spec con los siete pasos
7. Plan con firmas
8. ¿Serie o paralelo?

</div>
</div>

> Un prompt cuidado para lo pequeño; spec para lo que tiene reglas, casos límite o lo mantendrán varias personas.

---

# Prueba tú: ¿serie o paralelo?

<div class="prueba">

Decide y razona: **(a)** tests y código de la feature C con firmas. **(b)** Las features B y C, que comparten el almacenamiento.

</div>

<div class="prueba">

Haz la feature C en paralelo. Para cada test que falle, di a quién se lo atribuyes y dónde se corrige.

</div>

---

<!-- _class: cierre -->
<!-- _footer: "" -->

# Quédate con esto

1. Sin spec, el agente **rellena los huecos**: SDD decide antes de generar y usa la spec como contrato.
2. El contexto se organiza en **tres capas** y se da **lo justo**.
3. Una buena spec es **atómica, verificable y con respuestas exactas**; el agente pregunta, tú decides.
4. Spec, plan, tasks y código, cada fase con su **punto de control**; los tests, antes y desde la spec.
5. **Roles con permisos**, y cada cambio en los agentes, **evaluado** con casos fijos; en paralelo, solo lo que no se pisa.

---

<!-- footer: "Curso de introducción · Empezar con SDD y agentes de IA" -->

# Para practicar

- **Ejemplo de reservas:** PRD, specs de A, B y C y el plan de A.
- **Plantilla del curso:** constitución, `AGENTS.md`, tres agentes y cinco comandos.
- **Ejercicios de cada sesión:** en clase y en casa, con su solución en el material del profesor.

Después del curso: aplica el método en el proyecto de tu módulo.
