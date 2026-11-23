---
marp: true
theme: sdd
paginate: true
lang: es
title: Notaciones y granularidad
description: Diapositivas del tema 6 de la UD1 de Desarrollo guiado por especificaciones con IA
footer: UD1 · Tema 6 · Notaciones y granularidad
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD1 · Tema 6

# Notaciones y granularidad

Criterios de evaluación: **OA1 f**

---

# Al terminar sabrás…

1. Que una notación obliga a escribir **condición y respuesta**, y usar **EARS** para las reglas.
2. Usar **Gherkin** para los ejemplos que comprueban las reglas, con escenarios **declarativos**.
3. Graduar el detalle: la spec fija **qué y en qué condiciones**; el plan, **cómo**.
4. Usar al agente como **revisor** y decidir tú cada propuesta.

---

# Hay muchas formas de decir lo mismo, y cada una deja huecos

```text
1. No se pueden crear tareas vacías.
2. El sistema valida que el texto no esté vacío.
3. Si el texto está vacío, el sistema deberá responder 400 con
   { error: "El texto de la tarea no puede estar vacío" }.
```

- La primera no dice **qué pasa** en su lugar.
- La segunda no dice qué ocurre **si la validación falla**.

> Solo la tercera tiene **condición** y **respuesta exacta**. Una notación te obliga a escribir siempre así.

---

# EARS: cinco plantillas que terminan en «el sistema deberá»

| Patrón | Cuándo se usa | Plantilla |
|--------|---------------|-----------|
| **Ubicuo** | Siempre, sin condición | El sistema deberá… |
| **Por evento** | Respuesta a algo que ocurre | **Cuando** …, el sistema deberá… |
| **Por estado** | Mientras dura una situación | **Mientras** …, el sistema deberá… |
| **No deseado** | Errores y entradas no válidas | **Si** …, **entonces** el sistema deberá… |
| **Opcional** | Solo si algo está incluido | **Donde** …, el sistema deberá… |

Se combinan con un orden fijo: *Mientras…, cuando…, el sistema deberá…*

---

# Cada patrón, con la lista de tareas

```markdown
- RF-01: El sistema deberá guardar cada tarea con un identificador
  único generado por el servidor.
- RF-02: Cuando el usuario envíe el texto de una tarea nueva, el
  sistema deberá guardarla con el estado "pendiente".
- RF-03: Mientras una tarea esté marcada como hecha, el sistema
  deberá mostrar su texto tachado.
- EC-01: Si el texto de la tarea supera 280 caracteres, entonces el
  sistema deberá responder 400.
```

<div class="transferencia">

**Kiro** escribe en EARS los criterios de aceptación de sus `requirements.md`: el agente lo lee sin ambigüedad.

</div>

---

# Para empezar bastan *Cuando* y *Si… entonces*

<div class="columnas">
<div>

## *Cuando…*

Para el **camino feliz**: qué dispara cada comportamiento.

Reacciona a un **evento** puntual.

</div>
<div>

## *Si… entonces…*

Para los ***edge cases*** y los errores: qué pasa cuando algo va mal.

Describe algo que **no debería pasar**.

</div>
</div>

<div class="cuidado">

«**Si** el usuario pulsa Añadir, entonces…» es un mal uso: un evento normal va con ***Cuando***.

</div>

---

# EARS da forma, no contenido

| Error | Ejemplo |
|-------|---------|
| **Respuesta vaga** | Si el texto está vacío, entonces el sistema deberá *avisar al usuario* |
| **Varias respuestas** | …deberá guardarla, *mostrarla y enviar un aviso* |
| **Implementación** | …deberá *llamar a `guardarTarea()`* con el texto |
| **Condición no comprobable** | Cuando *haya mucha carga*, … |

<div class="cuidado">

«Si se produce un error, entonces el sistema deberá gestionarlo correctamente» sigue la plantilla **y no dice nada**.

</div>

---

# Gherkin describe el comportamiento con ejemplos concretos

```gherkin
# language: es
Característica: Añadir una tarea

  Antecedentes:
    Dado que la lista tiene 2 tareas

  Escenario: Añadir una tarea válida
    Cuando el usuario escribe "Comprar leche" y pulsa "Añadir"
    Entonces la lista tiene 3 tareas
    Y la última tarea es "Comprar leche" con el estado "pendiente"
```

No dice «una tarea válida», dice **«Comprar leche»**; no dice «la lista crece», dice **«tiene 3 tareas»**. Por eso se convierte en un test.

---

# Un esquema repite el escenario con varios datos

```gherkin
  Esquema del escenario: Rechazar textos no válidos
    Cuando se envía una petición POST /tareas con el texto <texto>
    Entonces la respuesta tiene el código 400
    Y el cuerpo contiene el error "<error>"

    Ejemplos:
      | texto | error                                     |
      | ""    | El texto de la tarea no puede estar vacío |
      | "   " | El texto de la tarea no puede estar vacío |
```

> Cada fila es un ***edge case*** con su respuesta exacta: añadir uno nuevo es añadir una fila.

---

# Los escenarios son declarativos, no guiones de clics

## Imperativo: describe clics

```gherkin
  Cuando hago clic en el campo con id "texto-tarea"
  Y escribo "Comprar leche"
  Y hago clic en el botón azul de la derecha
  Entonces veo un nuevo elemento li en la lista ul
```

## Declarativo: describe qué pasa

```gherkin
  Cuando el usuario añade la tarea "Comprar leche"
  Entonces la última tarea de la lista es "Comprar leche"
```

El primero se rompe al cambiar un `id` y **le dicta al agente** cómo hacer la página.

---

# EARS para las reglas; Gherkin para los ejemplos que las comprueban

| | EARS | Gherkin |
|---|------|---------|
| **Describe** | Una regla general | Un ejemplo concreto |
| **Pregunta** | ¿Qué debe hacer el sistema? | ¿Cómo compruebo que lo hace? |
| **Ejemplo** | Si el texto supera 280 caracteres, entonces el sistema deberá responder 400 | Cuando envío un texto de 281 caracteres, entonces recibo un 400 |
| **Se convierte en** | *Tasks* del plan | Tests |

Una regla suele tener **uno o varios** escenarios que la comprueban.

---

# Cada sección de la spec tiene su notación natural

| Sección | Notación |
|---------|----------|
| Contexto | Texto libre e historia de usuario |
| Requisitos funcionales | EARS: *Cuando*, *Mientras*, *Donde* |
| Requisitos no funcionales | EARS ubicuo, con valores medibles |
| Criterios de aceptación | Gherkin: *Dado*, *Cuando*, *Entonces* |
| *Edge cases* | EARS: *Si… entonces…* |
| Fuera de alcance | Lista simple |

<div class="nota">

Elige una forma y sé **coherente en todo el proyecto**: es buena candidata para la **constitución**.

</div>

---

# Demasiado vaga: el agente decide el comportamiento

```markdown
- El sistema debe permitir añadir tareas de forma rápida e intuitiva.
- Los errores deben manejarse adecuadamente.
- Las tareas deben tener una longitud razonable.
```

Señales de alerta:

- **Palabras subjetivas:** rápido, intuitivo, adecuado, razonable.
- **Sin respuesta ante fallos** y **sin valores**: «razonable» en lugar de «280 caracteres».

> El agente elige el límite, el formato del error y el código: vuelves al problema del **tema 1**.

---

# Demasiado rígida: la spec dicta el código

```markdown
- Crear en src/tareas.js una función crearTarea(texto) que haga
  texto.trim(), compruebe con un if que la longitud es menor que 281,
  genere el id con crypto.randomUUID() y haga push en el array tareas.
```

Señales de alerta: nombres de **funciones o ficheros** internos, **pseudocódigo** y estructuras de datos paso a paso.

- **Mezcla qué y cómo:** el agente no distingue restricción de sugerencia.
- **Es frágil:** cualquier refactorización la deja desactualizada.
- **Desaprovecha al agente** en lo que mejor hace.

---

# En el equilibrio, la spec fija qué y en qué condiciones

```markdown
- RF-01: Cuando el usuario envíe el texto de una tarea nueva, el sistema
  deberá guardarla con un identificador único, el texto, el estado
  "pendiente" y la fecha de creación.
- RNF-01: El texto de una tarea no podrá superar los 280 caracteres.
- RNF-02: El identificador lo generará el servidor, nunca el cliente.
```

- **Fijado:** qué se guarda, el límite y quién genera el identificador.
- **Libre para el plan:** el nombre de la función y cómo se genera el identificador.

> La spec define **qué** y **en qué condiciones**. El plan y las *tasks* definen **cómo**.

---

# Va en la spec lo que se nota desde fuera o rompe un acuerdo

| Decisión | ¿Dónde va? | Por qué |
|----------|-----------|---------|
| Límite de 280 caracteres | **Spec** | El usuario lo nota |
| Código 400 y mensaje del error | **Spec** | Lo ve quien llama a la API |
| El servidor genera el identificador | **Spec** | Restricción acordada |
| Librería para generar el identificador | Plan | No cambia nada visible |
| Nombre de la función `crearTarea` | Plan | Detalle interno |

<div class="cuidado">

«Sin implementación» no significa «sin nada técnico»: un algoritmo de firma o el nombre de un campo de la API son **restricciones** y van en la spec.

</div>

---

# El agente revisa bien una spec, pero cada propuesta la decides tú

| Lo que dice el agente | Tu decisión |
|-----------------------|-------------|
| Los requisitos no siguen EARS | **Se acepta**: es la convención del proyecto |
| No se indica el formato de la fecha | **Se responde**: ISO 8601 |
| «En condiciones normales» no es medible | **Se responde**: con 1.000 tareas guardadas |
| Generar el id con `crypto.randomUUID()` | **Se rechaza**: es implementación |

<div class="cuidado">

Al revisar, el agente tiende a **añadir detalle**: eso puede hacer la spec más rígida, no mejor.

</div>

---

# Reescribe y clasifica

<div class="prueba">

Reescribe en EARS e indica el patrón:

1. «No se pueden borrar tareas hechas».
2. «Al marcar una tarea, se actualiza el contador de pendientes».

</div>

<div class="prueba">

¿Vaga, rígida o adecuada?

1. «El borrado debe ser seguro».
2. «Usar `Array.prototype.filter` para quitar la tarea».
3. «Si la tarea no existe, el sistema deberá responder 404».

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Una notación obliga a escribir **condición y respuesta**; no sustituye a la claridad.
2. **EARS** para las reglas: para empezar, ***Cuando*** y ***Si… entonces***.
3. **Gherkin** para los ejemplos que las comprueban, con escenarios **declarativos**.
4. **Vaga** si el agente decide comportamiento; **rígida** si la spec dicta implementación.
5. El agente **propone** en la revisión; **tú** aceptas o rechazas.

---

# Para practicar

- **Tema 6 de la unidad:** la tabla del apartado 6.7 (spec o plan), el prompt de revisión del apartado 6.8 y la spec aprobada del ejemplo integrador (apartado 6.9).
- **Ejercicio E07, «EARS y Gherkin»**, y **E08, «Ni vaga ni rígida»**.
- **Ejercicio E09, «La spec de una feature»**, y el integrador **E10, «De la idea a la spec aprobada»**.

Con la spec aprobada termina la unidad. En la UD2, el agente generará a partir de ella el **plan técnico**.
