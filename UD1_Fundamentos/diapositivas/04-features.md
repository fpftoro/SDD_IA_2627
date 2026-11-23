---
marp: true
theme: sdd
paginate: true
lang: es
title: "Features: la unidad de trabajo de una spec"
description: Diapositivas del tema 4 de la UD1 de Desarrollo guiado por especificaciones con IA
footer: "UD1 · Tema 4 · Features: la unidad de trabajo de una spec"
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD1 · Tema 4

# *Features*: la unidad de trabajo de una spec

Criterios de evaluación: **OA1 d**

---

# Al terminar sabrás…

1. Que una ***feature*** es una capacidad **delimitable** con valor propio: **una spec por *feature***.
2. Distinguir **épico**, ***feature***, **historia de usuario** y ***task***, y quién decide cada nivel.
3. Detectar una *feature* **mal delimitada** con las preguntas de diagnóstico.
4. Cuándo **no** hace falta una spec completa.

---

# Antes de escribir una spec hay que decidir de qué

El equipo quiere una **lista de tareas compartida**. ¿Una sola spec para todo? ¿Una por cada botón?

<div class="columnas">
<div>

## Demasiado grande

La spec se vuelve inmanejable y el agente **se pierde**.

</div>
<div>

## Demasiado pequeña

El proceso **pesa más** que el trabajo.

</div>
</div>

> Elegir el tamaño es la **primera decisión de diseño** del proyecto, y la toma una persona, no el agente.

---

# Una *feature* es una capacidad delimitable con valor propio

Tiene **fronteras claras**: se sabe dónde empieza y dónde acaba. Por eso se puede:

- escribir **una spec** para ella,
- generar un **plan** y dividirla en *tasks*,
- comprobar con **criterios de aceptación** que está terminada.

> En SDD, **una spec por *feature***: ni más grande (un épico) ni más pequeña (una *task*).

---

# El trabajo se organiza en cuatro niveles

```text
Épico       Autenticación y gestión de usuarios
└── Feature     Recuperar la contraseña            ← aquí va la spec
    ├── Historia    «Como usuario, quiero recuperar mi contraseña…»
    ├── Task        Crear el endpoint POST /auth/olvido-contrasena
    ├── Task        Generar y guardar el código de recuperación
    └── Task        Plantilla del correo de recuperación
```

- Un épico se **divide** en *features*.
- Las historias explican el **porqué** de la *feature*.
- Las *tasks* la **implementan**, y pertenecen a una sola *feature*.

---

# Cada nivel tiene su artefacto en SDD

| | Épico | *Feature* | Historia | *Task* |
|---|---|---|---|---|
| **Expresa** | Un objetivo de negocio | Una capacidad del sistema | Una necesidad del usuario | Un paso de implementación |
| **Tamaño** | Semanas o meses | Días | El de su *feature* | Minutos u horas |
| **Artefacto** | PRD | **Spec** | Contexto de la spec | `tasks.md` |
| **¿Lo implementa el agente?** | No | A través de sus *tasks* | No | Sí |

---

# La historia de usuario explica el porqué, pero no es una spec

```text
Como usuario registrado,
quiero iniciar sesión con mi correo y mi contraseña,
para acceder a mis datos desde cualquier dispositivo.
```

- Dice **quién** necesita algo y **para qué**, no cómo se construye.
- En SDD va en el **contexto** de la spec.

<div class="cuidado">

No dice cuánto dura la sesión ni qué pasa si la contraseña es incorrecta: es el **punto de partida**, no el contrato.

</div>

---

# Los niveles altos los decide una persona

<div class="flujo">
<div>Épico<br><strong>tú</strong> lo divides</div>
<div><em>Features</em><br><strong>tú</strong> fijas sus fronteras</div>
<div class="destacada">Spec<br>la escribes o la revisas tú</div>
<div>Plan y <em>tasks</em><br>el agente propone</div>
<div>Código<br>el agente implementa</div>
</div>

- El agente trabaja en los niveles bajos, **siempre con revisión**.
- Puede **proponer** cómo dividir un épico, pero la decisión final es tuya.

> En lugar de pedir una *feature* entera, llegas a *tasks* de **uno o dos ficheros**, fáciles de revisar.

---

# Una buena *feature* se puede delegar y revisar

| Criterio | Señal de alarma |
|----------|-----------------|
| **Delimitable** | «Afecta un poco a todo» |
| **Especificable** | La spec no deja de crecer |
| **Descomponible** | Todas las tareas dependen de todas |
| **Verificable** | «Estará bien cuando esté bonito» |
| **Revisable** | El cambio toca decenas de ficheros |
| **Con valor propio** | Solo tiene sentido junto a otra |

Si no puedes **revisar** lo que genera, la *feature* es demasiado grande, aunque el agente sea capaz de hacerla.

---

# Tres errores: épico disfrazado, *task* suelta y *feature* técnica

| Error | Ejemplo | Cómo corregirlo |
|-------|---------|-----------------|
| **Demasiado grande** | «Gestión de usuarios» | Dividir: registro, inicio de sesión, recuperar la contraseña |
| **Demasiado pequeña** | «Añadir el botón de enviar» | Integrarla en «Enviar el formulario de contacto» |
| **Técnica, sin valor propio** | «Crear la tabla de usuarios» | Es un paso del plan de otra *feature* |

<div class="cuidado">

Las tareas técnicas llevan trabajo, pero no son *features*: darían **specs sin comportamiento que verificar**.

</div>

---

# Cuatro preguntas, en orden, diagnostican una idea

| Pregunta | Si la respuesta es «no»… |
|----------|--------------------------|
| 1. ¿Su comportamiento cabe en una spec de una o dos páginas? | Es un **épico**: divídelo |
| 2. ¿Aporta valor observable por sí misma? | Es una ***task*** o un paso técnico |
| 3. ¿Tiene criterios de aceptación objetivos? | Está **mal definida**: concrétala |
| 4. ¿Puedes revisar el código que generará? | Es **demasiado grande**: divídela |

> Cuatro síes: es una *feature*. **Escribe su spec.**

---

# No todo necesita una spec completa

<div class="columnas">
<div>

## Basta un prompt cuidado

- Corrección pequeña y localizada.
- Cambio de configuración o de un texto.
- Ajustes visuales finos.
- Prototipo que se va a tirar.

</div>
<div>

## Hace falta spec

- Lógica de negocio no trivial.
- *Edge cases* que decidir antes.
- Varias personas o varios agentes.
- Un error tendría consecuencias serias.

</div>
</div>

<div class="nota">

Un **prompt cuidado** dice qué se quiere, qué casos hay que tener en cuenta y cómo se comprueba.

</div>

---

# El orden de las *features* se ve en el nombre de su carpeta

<div class="columnas">
<div>

1. **Dependencias:** lo que otra necesita va antes.
2. **Valor:** primero lo que antes aporta al usuario.
3. **Riesgo:** adelanta lo más incierto.

</div>
<div>

```text
docs/specs/
├── A-añadir-tarea/
├── B-ver-lista/
├── C-marcar-hecha/
└── D-borrar-tarea/
```

</div>
</div>

> El prefijo indica el **orden de implementación** acordado: lo ve cualquiera, incluido el agente.

---

# Ejemplo: el agente propone la división y tú la revisas

```text
Lee @docs/prd.md. Propón cómo dividir el épico en features para
desarrollarlas con SDD. Para cada una indica su nombre, qué valor
aporta, de qué otras depende y una historia de usuario.
No crees ningún fichero.
```

- Se pide con el agente ***plan***: propone y no toca el proyecto.
- La propuesta es un **punto de partida**: suele mezclar niveles.

---

# La revisión deja la propuesta en cuatro *features*

| Propuesta del agente | Tu revisión |
|----------------------|-------------|
| Gestión de tareas | Demasiado grande: es el épico |
| Configurar la base de datos | Técnica: va en el plan de la primera *feature* |
| Añadir una tarea | ***Feature*** |
| Marcar una tarea como hecha | ***Feature*** |
| Botón de borrar | Demasiado pequeña: parte de «Borrar una tarea» |
| Usuarios y permisos | Fuera de alcance según el PRD |

Quedan **añadir**, **ver la lista**, **marcar como hecha** y **borrar**, en ese orden.

---

# ¿Épico, *feature*, historia o *task*?

<div class="prueba">

Clasifica cada una:

1. «Plataforma de reservas del gimnasio».
2. «Reservar una clase».
3. «Como socio, quiero reservar una clase desde el móvil para no hacer cola».
4. «Crear el *endpoint* `POST /reservas`».

</div>

<div class="prueba">

¿Por qué «Configurar la base de datos» no es una *feature*, aunque lleve trabajo? ¿Dónde aparece ese trabajo?

</div>

---

# La misma jerarquía, fuera de SDD

<div class="transferencia">

Épico, *feature*, historia de usuario y *task* vienen de las **metodologías ágiles**, como Scrum: te los encontrarás en cualquier empresa, también donde no se trabaja con agentes.

</div>

- En ágil, una *feature* se define sobre todo por el **valor** que aporta.
- Con un agente se añade un criterio: que se pueda **delegar** y **revisar**.

> Lo que cambia con SDD es **qué artefacto** corresponde a cada nivel.

---

<!-- _class: cierre -->

# Quédate con esto

1. Una ***feature*** es una capacidad **delimitable** con valor propio: **una spec por *feature***.
2. El **épico** se divide, la ***feature*** se especifica, la **historia** da el porqué y la ***task*** sale del plan.
3. Qué *features* hay y qué dice cada spec lo decide **una persona**.
4. Cuatro preguntas detectan los épicos, las *tasks* y las *features* **mal definidas**.
5. Para un cambio pequeño basta un **prompt cuidado**.

---

# Para practicar

- **Tema 4 de la unidad:** los dos ejemplos de descomposición del apartado 4.8 y el ejemplo integrador del apartado 4.9, con el índice de *features*.
- **Ejercicio E04, «Del épico a las features»:** separar épicos, *features*, historias y *tasks*, y escribir el índice de *features* del préstamo de portátiles.

En el tema 5 escribirás la **spec** de la primera *feature*, sección a sección.
