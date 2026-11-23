---
marp: true
theme: sdd
paginate: true
lang: es
title: La ventana de contexto
description: Diapositivas del tema 5 de la UD2 de Desarrollo guiado por especificaciones con IA
footer: UD2 · Tema 5 · La ventana de contexto
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD2 · Tema 5

# La ventana de contexto

Criterios de evaluación: **OA2 e**

---

# Al terminar sabrás…

1. Qué es la **ventana de contexto**, qué entra en ella y por qué **es limitada**.
2. Por qué **más contexto no es mejor** y cómo se nota en una sesión.
3. Qué contexto necesita **cada fase** del flujo.
4. Estrategias para trabajar: **sesión nueva**, `/undo`, compactar, **escribir en ficheros** y subagentes.

---

# El modelo no recuerda: cada petición lleva todo lo que necesita

- **Lo que no está en la ventana, no existe** para el modelo: ni la conversación de ayer ni el fichero que no ha leído.
- **Todo lo que está compite** por la atención, sea útil o no.
- **El contexto cuesta** (cuota, dinero o equipo): una sesión larga reenvía su historial en cada petición.

> La memoria del modelo es la ventana, y cada sesión empieza con ella vacía. Lo que quieras que sepa en la próxima sesión tiene que estar **escrito** en algún sitio que vuelva a leer.

---

# En la ventana entra mucho más que tu prompt

| Pieza | Quién la controla |
|-------|-------------------|
| Instrucciones y definición de herramientas | La herramienta |
| Reglas: `AGENTS.md` y constitución | Tú, una vez |
| Ficheros leídos, con `@` o por decisión del agente | Tú y el agente |
| Salidas de comandos: tests, `git diff`, errores | El agente |
| Historial de la sesión | Tú, con `/new`, `/undo` y `/compact` |
| Tu mensaje | Tú |

Si pides «revisa el proyecto», el agente puede leer decenas de ficheros y llenar la ventana antes de empezar.

---

# SDD es ingeniería de contexto aplicada al desarrollo

<div class="columnas">
<div>

## Ingeniería de prompts

Cómo **redactar** una instrucción concreta.

</div>
<div>

## Ingeniería de contexto

Decidir **todo** lo que el modelo ve: qué entra, en qué orden y qué se descarta.

</div>
</div>

La spec, el plan, las *tasks*, el índice y la constitución son piezas de contexto escritas para que el agente reciba en cada fase **exactamente lo que necesita**.

---

# Más contexto no es mejor: tres fenómenos

<div class="columnas-3">
<div>

## Presupuesto de atención

Cada token gasta parte. Los irrelevantes **restan**.

*El conjunto más pequeño de información útil.*

</div>
<div>

## Perdido en el medio

Se aprovecha peor lo que está **en el centro** que lo del principio o el final.

</div>
<div>

## Degradación

La sesión acumula **ruido**: propuestas descartadas, errores ya arreglados.

</div>
</div>

Las instrucciones dadas al principio de la conversación se **apagan** bajo el historial: por eso las reglas permanentes van en `AGENTS.md` y la constitución.

---

# Cómo se nota que el contexto está mal

| Síntoma | Causa probable |
|---------|----------------|
| Vuelve a proponer algo que rechazaste | El rechazo está enterrado en el historial |
| Incumple una convención que respetaba | Instrucción enterrada bajo el historial |
| Mezcla decisiones de dos tasks | Contexto de la task anterior en la ventana |
| Respuesta genérica | Demasiado contexto irrelevante, o falta el fichero clave |
| Implementa más de lo pedido | Ha leído tasks que no eran de este ciclo |

<div class="cuidado">

Una propuesta rechazada **sigue en la ventana**. En SDD, lo decidido está en los documentos; lo que solo está en la conversación no cuenta.

</div>

---

# Cada fase necesita un contexto distinto

| Fase | Necesita | No necesita |
|------|----------|-------------|
| **Especificar** | Reglas, constitución, PRD, índice | El código, que sesga la spec |
| **Planificar** | Spec aprobada y los ficheros que la feature toca | Historial de la fase anterior |
| **Descomponer** | Plan aprobado y spec | El código |
| **Implementar** | Las tasks del ciclo, la spec y sus ficheros | Tasks de otros ciclos |

El **historial de la fase anterior** no aparece en ninguna: lo que importaba ya está en su documento aprobado.

> Escribe la lista de la fase con `@`. No pidas «revisa el proyecto».

---

# La memoria del agente son ficheros que vuelven a entrar en la ventana

| Tipo | En un proyecto con SDD | Cuándo entra |
|------|------------------------|--------------|
| **De trabajo** | La ventana: historial y salidas | Siempre; muere con la sesión |
| **Procedimental** | `AGENTS.md` | Siempre, al empezar |
| **Semántica** | Constitución, PRD, specs | Constitución siempre; specs si la fase las necesita |
| **Episódica** | Planes y código de features anteriores | Solo cuando sirve de ejemplo |

El plan de la feature A es un ejemplo perfecto para planificar la B.

---

# Prepara lo justo, con referencias y no con copias

| En lugar de… | Mejor… |
|--------------|--------|
| «Lee todo el proyecto y planifica la B» | «Lee la spec de B, el índice y estos tres ficheros» |
| Pegar el `package.json` «por si acaso» | Mencionarlo solo si la tarea toca dependencias |
| Pegar un fichero en el mensaje | Referenciarlo con `@`: se lee actualizado |

> Pregunta: **«¿lo necesita esta tarea?»**. Si la respuesta es «no lo sé», normalmente no.

El índice es una referencia ligera: unas líneas que dicen qué existe y dónde, sin cargar ningún documento.

---

# Lo importante, al principio o al final

<div class="flujo">
<div><strong>Principio</strong><br>reglas y principios<br><code>AGENTS.md</code>, constitución</div>
<div><strong>Medio</strong><br>documentos de consulta<br>spec, plan, código</div>
<div class="destacada"><strong>Final</strong><br>tu mensaje y sus reglas</div>
</div>

- Las reglas ya están **al principio**: OpenCode las carga antes de tu primer mensaje.
- Tu mensaje lleva **la tarea concreta** y, si hay una restricción crítica, **repítela**.

Por eso los prompts de los temas 2 y 3 terminan con una lista de reglas.

---

# Un ejemplo del proyecto vale más que una descripción

```text
Los tests deben llevar en el nombre el identificador de la
spec que comprueban y usar el mensaje de error exacto.
```

Mejor, señala un ejemplo:

```text
Escribe los tests como los de @tests/servicio-tareas.test.js:
identificador de la spec al principio del nombre y mensaje
de error exacto en toThrow.
```

Un ejemplo bien elegido sustituye a una lista de reglas, y el agente lo aplica con el **estilo real** del proyecto.

---

# Sesión nueva por fase, y `/undo` en lugar de corregir encima

<div class="columnas">
<div>

## `/new`

- En cada fase y en cada ciclo.
- «Perderá lo que hicimos»: no, lo importante está en **ficheros**.
- La conversación era el andamio; los documentos, el edificio.

</div>
<div>

## `/undo`

- Un intento equivocado **sigue en la ventana** si corriges encima.
- Quita el último mensaje y revierte los ficheros.
- Úsalo cuando el problema era **tu mensaje**.

</div>
</div>

---

# Compactar es el último recurso

- `/compact` resume el historial y libera la ventana.
- OpenCode compacta solo al llenarse; se configura con la clave `compaction` en `opencode.json`.

<div class="cuidado">

El resumen **pierde detalles** y no decides cuáles. Compacta a mano en un buen momento, al terminar una parte. Si empieza una fase nueva, **no compactes**: sesión nueva.

</div>

---

# Si importa para después, se escribe en un fichero

| Lo que ha pasado en la sesión | Dónde se escribe |
|-------------------------------|------------------|
| Una decisión de comportamiento | La spec (nueva versión) |
| Una decisión técnica | El plan |
| Una task terminada | `tasks.md`, con `[x]` |
| Un cambio de estado | La spec y el índice |
| Una convención para todo el proyecto | `AGENTS.md` o la constitución |

> La conversación es memoria **efímera**; los ficheros, memoria **persistente**.

Un **subagente** como `explore` lee mucho en su propia ventana y devuelve **una respuesta breve** a la tuya.

---

# Seguir, deshacer, compactar o empezar de cero

| Situación | Qué haces |
|-----------|-----------|
| Empieza una fase o un ciclo | Sesión nueva (`/new`) |
| El último intento se desvió por tu mensaje | `/undo` y reescribir |
| No hay síntomas de contexto lleno | Seguir |
| Síntomas, y lo importante ya está en ficheros | Sesión nueva |
| Síntomas, y aún no está escrito | Escribirlo y después sesión nueva; si no puedes, `/compact` |

> La sesión nueva aparece casi siempre; compactar es el último recurso.

---

# Diagnostica un contexto

<div class="prueba">

A mitad de la sesión, el agente vuelve a proponer una decisión que rechazaste hace una hora. ¿Qué ha pasado y cómo lo evitas la próxima vez?

</div>

<div class="prueba">

Vas a implementar el ciclo 3. Lista, con `@`, el contexto que le das y el que **no** le das.

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. La ventana es **limitada** y se vacía en cada sesión: lo que no está escrito, no existe.
2. **Más contexto no es mejor:** la atención se reparte y el contexto se degrada.
3. **Lo justo**, con referencias `@`, y lo importante al principio o al final.
4. **Sesión nueva** por fase y ciclo; `/undo` en lugar de corregir encima.
5. Lo que importa se **escribe en ficheros**; compactar es el último recurso.

---

# Para practicar

- **Tema 5 de la unidad:** la tabla de contexto por fase (apartado 5.4) y el ejemplo integrador, planificar la feature B con el contexto justo (apartado 5.9).
- **Ejercicio E07, «El contexto justo»:** analiza sesiones con problemas de contexto, prepara el contexto de cada fase y clasifica tipos de memoria.

En el tema 6 configurarás la **memoria persistente** del agente en OpenCode.
