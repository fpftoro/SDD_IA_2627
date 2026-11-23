---
marp: true
theme: sdd
paginate: true
lang: es
title: Qué es el desarrollo guiado por especificaciones
description: Diapositivas del tema 1 de la UD1 de Desarrollo guiado por especificaciones con IA
footer: UD1 · Tema 1 · Qué es el desarrollo guiado por especificaciones
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD1 · Tema 1

# Qué es el desarrollo guiado por especificaciones

Criterios de evaluación: **OA1 a**

---

# Al terminar sabrás…

1. Por qué, sin spec, el agente **rellena los huecos** y el código acaba siendo la especificación de facto.
2. Que SDD **escribe y revisa la spec antes** de generar código y la usa como **contrato**.
3. Que *vibe coding* y SDD son los extremos de un **espectro**, y que SDD tiene **tres niveles**.
4. Los **tres principios** para trabajar con agentes.

---

# Con un agente, lo difícil ya no es escribir el código

| Etapa | Qué hace la IA | Qué haces tú |
|-------|----------------|--------------|
| Autocompletado | Sugiere la línea que escribes | Escribes y aceptas o rechazas |
| Asistente de chat | Genera fragmentos | Los copias y los integras |
| **Agente de codificación** | Lee, edita, ejecuta y corrige | Describes qué quieres y revisas |

> Tu trabajo pasa a ser **comunicar la intención** y **verificar el resultado**.

---

# Un prompt vago deja las decisiones al agente

<div class="columnas">
<div>

## Lo que pides

```text
Añade autenticación con JWT
a la API.
```

Una persona de tu equipo **preguntaría**. El agente **decide** y sigue adelante.

</div>
<div>

## Lo que decide el agente

- Los tokens caducan a los 15 minutos.
- Firma con HS256 y la clave en el código.
- Token caducado: responde `403`.
- Añade *refresh tokens* que nadie pidió.

</div>
</div>

---

# Sin estructura, el trabajo entra en el ciclo «casi, pero no»

<div class="flujo">
<div>Idea vaga</div>
<div>Prompt</div>
<div>Código</div>
<div class="destacada">¿Es lo que querías?<br>«Casi, pero no»</div>
<div>Otro prompt</div>
</div>

- Cada vuelta corrige algo y puede romper otra cosa.
- Las decisiones del camino **no quedan escritas** en ningún sitio.

<div class="cuidado">

Que el código **funcione** no significa que haga **lo que necesitas**. Los fallos más caros son los que pasan la demo.

</div>

---

# El código se convierte en la especificación de facto

| Consecuencia | Ejemplo |
|--------------|---------|
| **Decisiones invisibles** | Nadie sabe por qué el token dura 15 minutos |
| **Inconsistencia** | Cada *endpoint* gestiona los errores a su manera |
| **Mantenimiento difícil** | Antes de cambiar algo hay que reconstruir qué se pretendía |
| **Código de baja calidad** (*slop*) | Código genérico, porque faltaba contexto |

> La única forma de saber qué hace el sistema es **leer el código**.

---

# SDD escribe y revisa la spec antes de generar código

```markdown
## Requisitos no funcionales
- RNF-01: Los tokens se firman con RS256. Nunca HS256.
- RNF-02: La clave privada se lee de una variable de entorno.
- RNF-03: Los tokens caducan a las 24 horas.

## Edge cases
- EC-01: Si el token ha caducado, el sistema responde 401.

## Fuera de alcance
- Refresh tokens (se abordarán en otra spec).
```

Cada línea resuelve una decisión que antes tomaba el agente. Ahora la toma **una persona** y queda **escrita** en el repositorio.

---

# La spec es un contrato: delegas en lugar de microgestionar

## Sin especificación

<div class="flujo">
<div>Idea vaga</div>
<div>Prompt</div>
<div>Código</div>
<div>Corrección, y vuelta al prompt</div>
</div>

## Con SDD

<div class="flujo">
<div>Idea</div>
<div class="destacada">Spec revisada</div>
<div>Plan</div>
<div><em>Tasks</em></div>
<div>Código</div>
</div>

> Las correcciones se hacen **en los documentos**, antes del código.

---

# *Vibe coding* y SDD son los extremos de un espectro

<div class="columnas-3">
<div>

## *Vibe coding*

Pides cambios y aceptas lo que funciona.

**Para explorar y prototipar.**

</div>
<div>

## Punto intermedio

Un prompt cuidado y revisión.

**Para cambios pequeños y localizados.**

</div>
<div>

## SDD

Especificas el comportamiento antes de generar.

**Para construir lo que tiene que durar.**

</div>
</div>

> No son el bueno y el malo: son herramientas para **momentos distintos**.

---

# La tarea decide en qué punto del espectro trabajas

| Situación | Enfoque |
|-----------|---------|
| Probar una idea en una tarde | *Vibe coding* |
| Requisitos que todavía no conoces | *Vibe coding*, para descubrirlos |
| Cambiar un texto o una configuración | Un buen prompt, sin spec completa |
| Una funcionalidad que va a producción | SDD |
| Código que mantendrán varias personas | SDD |

<div class="cuidado">

El prototipo no es la base del producto por defecto: si lo conservas, **escribe primero su spec**.

</div>

---

# SDD tiene tres niveles, y son acumulativos

| | *Spec-first* | *Spec-anchored* | *Spec-as-source* |
|---|---|---|---|
| **La spec es…** | Contexto antes de programar | Contrato que gobierna el código | Lo único que se mantiene |
| **Manda…** | El código | Spec y código, sincronizados | La spec |
| **Hace falta…** | Nada | Tests, reglas, CI | Generadores específicos |
| **Madurez** | Extendida | Equipos con experiencia | Experimental |

En el curso trabajarás casi siempre en ***spec-first***: un fichero Markdown en el repositorio basta.

---

# Si la spec y el código no coinciden, se investiga cuál tiene razón

<div class="columnas">
<div>

## Postura pragmática

La spec es un medio para generar buen código, y **convive con él**.

</div>
<div>

## Postura radical

La spec sustituye al código, que es solo un detalle generado.

</div>
</div>

> La spec es un **contrato vivo**: puede que el código tenga un error o que la spec se haya quedado vieja.

<div class="transferencia">

GitHub Spec Kit lo formula como una **inversión**: el código sirve a la especificación, y no al revés.

</div>

---

# Tres principios sostienen el trabajo con agentes

<div class="columnas-3">
<div>

## Humano en el bucle

Revisas la spec, el plan y el código en **puntos de control**.

</div>
<div>

## Reglas antes que herramientas

Unas instrucciones claras importan más que la herramienta.

</div>
<div>

## Especificar antes de construir

Explicas el problema y **cómo se comprobará** la solución.

</div>
</div>

<div class="nota">

Con poco contexto, el agente rellena huecos; con demasiado, se pierde. No se trata de darle **más** información, sino la **adecuada**.

</div>

---

# Ejemplo: sin spec, «añadir una tarea» esconde cinco decisiones

```text
Haz un endpoint para añadir tareas a la lista.
```

| Situación | Lo que hace el código generado |
|-----------|--------------------------------|
| Texto vacío o solo espacios | Crea una tarea vacía |
| Texto de 5.000 caracteres | Lo acepta |
| Falta el campo `text` | Falla con un error 500 |
| Identificador de la tarea | Lo envía el cliente |
| Ruta | `/tasks`, y el resto de la API usa `/api/…` |

---

# Con spec, cada caso tiene respuesta y tú sabes qué comprobar

```markdown
## Requisitos funcionales
- RF-01: El sistema guarda la tarea con un identificador único
  generado por el servidor, el texto, el estado "pendiente" y la fecha.

## Requisitos no funcionales
- RNF-01: El texto no puede superar los 280 caracteres.

## Edge cases
- EC-01: Si el texto está vacío o solo tiene espacios, responde 400.
- EC-03: Si la petición no incluye el campo text, responde 400.
```

> «¿Es lo que querías?» ya tiene una respuesta objetiva: **lo que dice la spec**.

---

# Busca las decisiones que nadie ha tomado

<div class="prueba">

Escribe **tres decisiones** que deja abiertas este prompt: «haz un formulario de registro de usuarios».

</div>

<div class="prueba">

¿*Vibe coding* o SDD? Justifica cada caso:

1. Una demo para enseñar una idea mañana.
2. El pago con tarjeta de una tienda.
3. Cambiar el color de un botón.

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Sin spec, el agente **rellena los huecos** y el código pasa a ser la **especificación de facto**.
2. SDD escribe y revisa la **spec antes** del código y la usa como **contrato** con el agente.
3. *Vibe coding* para **explorar**; SDD para **construir lo que tiene que durar**.
4. Tres niveles: *spec-first*, *spec-anchored* y *spec-as-source*.
5. **Humano en el bucle**, **reglas antes que herramientas** y **especificar antes de construir**.

---

# Para practicar

- **Tema 1 de la unidad:** repasa el apartado 1.2 (el ciclo «casi, pero no») y el ejemplo integrador del apartado 1.8.
- **Ejercicio E01, «Las decisiones que nadie tomó»:** las decisiones implícitas del código que generó un agente con un prompt vago.

En el tema 2 distinguirás la spec de los demás **artefactos** y verás las **tres capas de contexto** del agente.
