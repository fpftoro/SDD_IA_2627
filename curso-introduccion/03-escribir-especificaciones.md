# 3. Escribir buenas especificaciones

[⬅️ Volver al curso](README.md)

## Qué aprenderás

- Qué hace buena a una spec y a qué pregunta responde cada sección.
- Escribir requisitos, criterios de aceptación y *edge cases* verificables.
- Un **método de siete pasos** para decidir qué tiene que llevar una spec.
- Usar al agente para **encontrar huecos** sin que decida por ti.

## 3.1. Una buena spec

Una spec tiene **dos lectores**: la persona que la revisa y el agente que la usa. El agente **no pregunta, supone**, así que la spec tiene que ser:

| Cualidad | Contraejemplo |
|----------|---------------|
| **Inequívoca** | «La respuesta debe ser rápida» |
| **Completa en su alcance** | No decir qué pasa si el texto está vacío |
| **Orientada al comportamiento** | «Crea una función `validar()` con un `if`…» (eso es el plan) |
| **Verificable** | «La interfaz debe ser intuitiva» |
| **Delimitada** | No decir qué queda para otra feature |
| **Versionada** | Un documento en el correo, fuera del repositorio |

Escribe pensando en un lector **muy literal y sin contexto**, que hará exactamente lo que diga la spec y rellenará cada hueco con lo más habitual.

## 3.2. Anatomía de una spec

Cada sección responde a una pregunta (la plantilla está en `plantilla/docs/plantillas/spec.md`):

| Sección | Pregunta | Ejemplo (reservas) |
|---------|----------|--------------------|
| **Contexto** | ¿Para qué sirve? | Reservar una sala en una franja para tenerla garantizada |
| **Requisitos funcionales** (`RF`) | ¿Qué hace? | RF-01: …creará la reserva con estado `activa` y un identificador |
| **Requisitos no funcionales** (`RNF`) | ¿Con qué calidad o restricciones? | RNF-01: el identificador lo genera el sistema |
| **Criterios de aceptación** (`AC`) | ¿Cuándo está terminada? | AC-01: Mientras…, cuando…, el sistema deberá… |
| ***Edge cases*** (`EC`) | ¿Qué pasa cuando algo se sale de lo normal? | EC-03: si la fecha es anterior a hoy… |
| **Fuera de alcance** | ¿Qué no hay que hacer? | Cancelar y consultar son otras features |

Cada cosa lleva un **identificador** (`RF-01`, `EC-03`…): sirve para citarla desde el plan, las tasks y los tests.

**Requisitos atómicos.** Una sola responsabilidad, con «deberá», verificable con un test. «Validar el nombre **y** guardar la reserva **y** avisar» son **tres** requisitos: juntos, el agente puede olvidar uno.

**No funcionales medibles.** «Deberá ser seguro» no sirve; «los identificadores los genera el sistema» o «responde en menos de 200 ms con 1.000 reservas» sí.

**Criterios de aceptación binarios.** *Mientras* fija la situación, *cuando* la acción y *el sistema deberá* el resultado **observable**, con **valores concretos** (es el patrón EARS combinado):

```text
AC-03: Mientras «Aula 1» tenga una reserva activa el 10 de marzo de
10:00 a 11:00, cuando se reserve «Aula 1» el 10 de marzo de 11:00 a
12:00, el sistema deberá crear la reserva.
```

**Edge cases con respuesta exacta.** El código y el mensaje, no «avisar al usuario»:

```text
EC-08: Si la franja se solapa con la de otra reserva activa de la misma
sala y día, entonces el error será `sala_ocupada` con el mensaje «La sala
ya está reservada en esa franja».
```

## 3.3. EARS: una plantilla para escribir requisitos

**EARS** da forma a los requisitos para que siempre tengan condición y respuesta. Con tres patrones tienes casi todo:

| Patrón | Cuándo | Plantilla |
|--------|--------|-----------|
| **Por evento** | El camino feliz: qué dispara un comportamiento | **Cuando** …, el sistema deberá… |
| **No deseado** | Errores y entradas no válidas | **Si** …, **entonces** el sistema deberá… |
| **Combinado** | Un comportamiento que depende de una situación previa (los criterios de aceptación) | **Mientras** …, **cuando** …, el sistema deberá… |

EARS da forma, no contenido: «Si hay un error, entonces el sistema deberá gestionarlo correctamente» sigue la plantilla **y no dice nada**. Errores típicos: respuesta vaga, varias respuestas en una frase, nombres de funciones internas o condiciones que no se pueden comprobar («cuando haya mucha carga»).

## 3.4. Las dudas se marcan, no se esconden

Cuando falta una decisión, se marca **donde afecta**, con la pregunta y las alternativas:

```text
- EC-03: Si la fecha es anterior a hoy, el error será `fecha_pasada`.
  [NECESITA ACLARACIÓN: ¿la fecha de hoy es válida aunque la franja ya
  haya empezado?]
```

Una spec con algún marcador **no se aprueba**. Las decisiones las toma **una persona**.

## 3.5. Método de siete pasos para escribir una spec

Cuando no sabes por dónde empezar, sigue estos pasos **en orden**. Los pasos 3 a 5 son los que más huecos descubren.

| Paso | Qué haces | Resultado |
|------|-----------|-----------|
| **1. Delimitar** | Una feature, en una frase. Anota qué se queda fuera | Título y *fuera de alcance* provisional |
| **2. Camino feliz** | ¿Quién? ¿Qué datos entran? ¿Qué sale? | Los `RF` |
| **3. Cada dato de entrada** | Para cada dato: ¿falta?, ¿está vacío?, ¿tiene formato o tipo incorrecto?, ¿está fuera del conjunto permitido? | Los primeros `EC` |
| **4. Límites y estados** | Los límites **por los dos lados** (mínimo, máximo, igualdad). El estado previo: ¿ya existe?, ¿ya está ocupado?, ¿ya está cancelado? | Más `EC` |
| **5. Errores exactos** | Para cada error, **código y mensaje**. Si pueden darse varios a la vez, **en qué orden** se comprueban | `EC` cerrados y regla de prioridad |
| **6. Ejemplos** | Un criterio de aceptación por cada regla importante, con **valores concretos** | Los `AC` |
| **7. Revisar** | Ronda de aclaración con el agente, resolver marcadores y pasar la lista de comprobación | Spec **aprobada** |

**Preguntas de borde** para los pasos 3 y 4. Recórrelas para cada requisito:

| Tipo | Pregunta | En las reservas |
|------|----------|-----------------|
| Ausencia | ¿Y si falta el dato? | Sin sala o sin nombre |
| Vacío | ¿Y si está vacío o solo hay espacios? | Nombre «   » |
| Formato | ¿Y si no tiene el formato? | Hora «25:90» |
| Conjunto | ¿Y si no está entre los valores permitidos? | Una sala que no existe |
| Rango | ¿Y si se pasa por un lado o por el otro? | Duración de 20 o de 180 minutos |
| Igualdad | ¿Y si está **justo en el límite**? | Una reserva que acaba cuando empieza otra |
| Estado | ¿Y si ya está en ese estado? | Reservar una franja ocupada |
| Varios | ¿Y si fallan dos cosas a la vez? | Fecha pasada y sala inexistente |

## 3.6. Cómo ayuda el agente

| El agente **puede** | El agente **no debe** |
|---------------------|-----------------------|
| Estructurar tus notas con la plantilla | Decidir el comportamiento que falta |
| Detectar palabras vagas | Rellenar huecos con «lo más habitual» |
| Proponer *edge cases* que no has pensado | Añadir funcionalidades que nadie pidió |
| **Preguntarte** lo que no está decidido | Responder él esas preguntas |

Tres formas de empezar: **tú escribes y él revisa**, **borrador y estructura**, o **entrevista**. Esta última es la más útil cuando la feature aún está difusa (con el agente *plan*):

```text
Vamos a especificar la feature «Crear una reserva». Lee @docs/prd.md.
No escribas la spec todavía. Hazme las preguntas que necesites, de una
en una. Para cada pregunta, propón dos o tres respuestas y di qué
consecuencia tiene cada una.
```

Antes de aprobar, una **ronda de aclaración**:

```text
Lee @docs/specs/A-crear-reserva/spec.md como si fueras a implementarla
mañana. No la modifiques. Haz una lista de las decisiones que tendrías
que tomar tú porque la spec no las resuelve, y di si las notaría quien usa
el sistema.
```

Lo que notaría **quien usa el sistema** va a la spec; lo que solo ve **quien lee el código**, al plan.

## Ejercicio: la spec de «Crear una reserva»

**Formato:** individual. **Con agente** en la parte final de la clase. Escribes `docs/specs/A-crear-reserva/spec.md` con la plantilla, a partir del PRD del repositorio del ejemplo.

### En clase

**Parte A · Frases vagas.** Reescribe cada frase como requisito verificable (con EARS): **(1)** «La reserva debe ser rápida». **(2)** «Se avisa si no se puede reservar». **(3)** «Se validan los datos». **(4)** «El sistema deberá registrar la reserva, avisar a la persona y actualizar el calendario» (divídela en requisitos atómicos).

**Parte B · La spec de la feature A.**

1. **Pasos 1 y 2 (sin agente).** Escribe el contexto, el fuera de alcance provisional y los `RF`.
2. **Pasos 3 y 4 (sin agente).** Recorre las preguntas de borde para cada dato de entrada (sala, fecha, hora de inicio, hora de fin, nombre) y escribe los `EC` que se te ocurran. Piensa en el límite entre dos reservas seguidas.
3. **Entrevista (con agente).** Con *plan* en una sesión nueva, pide la entrevista del apartado 3.6. ¿Qué preguntas hace que no habías pensado? **Decide tú cada respuesta** y anótala.

### En casa

1. **Parte B, para terminar.**
   - **Paso 5:** deja cada `EC` con su código y su mensaje exactos, y la **prioridad** entre errores.
   - **Paso 6:** escribe cuatro `AC` con valores concretos.
   - **Paso 7:** ronda de aclaración con el agente, resuelve todos los marcadores y pasa la lista (cada `RF` atómico; cada `AC` binario; cada `EC` con respuesta exacta; sin nombres de funciones; con fuera de alcance; sin `[NECESITA ACLARACIÓN]`). Estado `Aprobada` y commit: «Spec de la feature A (aprobada)».
2. **Parte C · Comparar con la referencia.** Abre la [spec de referencia](ejemplo-reservas/docs/specs/A-crear-reserva/spec.md) **después** de aprobar la tuya. Haz una tabla con lo que le falta a la tuya, lo que sobra y lo que decidisteis distinto (¿hueco o decisión igual de válida?). La tuya es la que usarás en la sesión 4.
3. **Parte D · Del requisito vago al verificable.** Reescribe en forma EARS estas tres frases de otra aplicación, el préstamo de portátiles del encargo de la sesión 1, y añade un `EC` para cada una: **(a)** «Un préstamo no puede durar demasiado». **(b)** «Nadie puede acaparar portátiles». **(c)** «Los préstamos se pueden alargar si hace falta».

**Está hecho cuando:** tu spec de A está aprobada y commiteada, tienes la tabla de diferencias y las tres frases reescritas. (Solución y huecos típicos en `soluciones/03-escribir-especificaciones.md`.)

## Quédate con esto

1. El agente **no pregunta, supone**: la spec tiene que ser inequívoca, verificable y delimitada.
2. Requisitos **atómicos** con identificador, no funcionales **medibles**, criterios **binarios** y *edge cases* con **respuesta exacta**.
3. El método de siete pasos: delimitar, camino feliz, cada dato, límites y estados, errores exactos, ejemplos y revisar.
4. El agente **pregunta y propone**; las decisiones de comportamiento las tomas tú.

**Siguiente:** [4. El flujo: de la spec al código](04-flujo-spec-plan-tests-codigo.md)
