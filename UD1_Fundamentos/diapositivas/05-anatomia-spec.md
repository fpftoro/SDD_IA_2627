---
marp: true
theme: sdd
paginate: true
lang: es
title: Anatomía de una spec
description: Diapositivas del tema 5 de la UD1 de Desarrollo guiado por especificaciones con IA
footer: UD1 · Tema 5 · Anatomía de una spec
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD1 · Tema 5

# Anatomía de una spec

Criterios de evaluación: **OA1 e**

---

# Al terminar sabrás…

1. Que el agente **no pregunta, supone**: la spec tiene que ser inequívoca, verificable y delimitada.
2. A qué **pregunta** responde cada sección de una spec.
3. Escribir requisitos **atómicos**, no funcionales **medibles** y criterios **binarios**.
4. Tratar la spec como un **documento vivo**: dudas marcadas y cambios en el mismo *commit* que el código.

---

# Entre personas, una duda se pregunta; el agente la resuelve suponiendo

Una spec tiene **dos lectores a la vez**:

- la **persona** que la escribe y la revisa,
- el **agente** que la usa para generar el código.

El agente elige la interpretación más probable y la deja escrita en el código, donde nadie la cuestiona.

<div class="nota">

Escribe pensando en un lector **muy literal y sin contexto**, que hará exactamente lo que diga la spec y rellenará cada hueco con lo más habitual.

</div>

---

# Una buena spec es inequívoca, verificable y delimitada

| Cualidad | Contraejemplo |
|----------|---------------|
| **Inequívoca** | «La respuesta debe ser rápida» |
| **Completa en su alcance** | No decir qué pasa si el texto está vacío |
| **Orientada al comportamiento** | «Crea una función `validar()` con un `if`…» |
| **Verificable** | «La interfaz debe ser intuitiva» |
| **Delimitada** | No decir que la edición queda para otra *feature* |
| **Versionada** | Un documento en el correo o en el chat |

---

# Cada sección de la spec responde a una pregunta

| Sección | Pregunta |
|---------|----------|
| **Contexto** | ¿Para qué sirve? |
| **Requisitos funcionales** | ¿Qué hace? |
| **Requisitos no funcionales** | ¿Con qué calidad y restricciones? |
| **Criterios de aceptación** | ¿Cuándo está terminada? |
| ***Edge cases*** | ¿Qué pasa cuando algo se sale de lo normal? |
| **Fuera de alcance** | ¿Qué no hay que hacer? |

Delante van los **metadatos**: qué *feature* es y en qué **estado** está la spec.

---

# El contexto dice para qué, en dos a cuatro frases

```markdown
## Contexto

**Objetivo:** que los usuarios inicien sesión de forma segura y no
tengan que volver a identificarse en cada petición.

**Historia de usuario:** como usuario registrado, quiero iniciar sesión
con mi correo y mi contraseña para acceder a mis datos.

**Dependencias:** módulo de usuarios existente y Redis.
```

> Sin contexto, el agente puede construir algo **correcto pero equivocado** para el problema real.

---

# Requisitos funcionales: atómicos y con identificador

```markdown
## Requisitos funcionales
- RF-01: El sistema deberá generar un token JWT firmado cuando el
  inicio de sesión sea correcto.
- RF-03: El sistema deberá validar el token en cada petición a un
  endpoint protegido antes de procesarla.
```

- **Atómicos:** una sola responsabilidad. **Con «deberá».** **Verificables** con un test.
- El identificador permite citarlos desde el plan, las *tasks* y los tests.

<div class="cuidado">

«Validar el token **y** registrar el acceso **y** avisar si caduca» son **tres** requisitos: juntos, el agente puede olvidar uno.

</div>

---

# Requisitos no funcionales: medibles o comprobables

```markdown
## Requisitos no funcionales
- RNF-01: Validar el token no deberá añadir más de 10 ms al tiempo de
  respuesta del endpoint.
- RNF-02: Los tokens se firmarán con RS256. Nunca HS256.
- RNF-04: Las funciones de generación y validación del token tendrán
  una cobertura de tests de al menos el 90 %.
```

| Funcional | No funcional |
|-----------|--------------|
| **Qué hace** el sistema | **Con qué calidad** o restricciones lo hace |

«Deberá ser seguro» o «deberá ser rápido» no le sirven al agente ni a quien revisa.

---

# Criterios de aceptación: binarios, con Dado, cuando, entonces

```markdown
## Criterios de aceptación
- AC-01: Dado un usuario con credenciales correctas, cuando hace
  POST /auth/login, entonces recibe un 200 con un token JWT.
- AC-03: Dado un token caducado, cuando se usa en una petición,
  entonces el sistema responde 401 con el mensaje "Token expirado".
```

- **Dado** fija la situación; **cuando**, la acción; **entonces**, el resultado observable.
- Son la **definición de terminado** y la fuente directa de los tests.

> El requisito dice **qué** hace el sistema; el criterio, **cómo se comprueba**.

---

# Los *edge cases* llevan la respuesta exacta del sistema

```markdown
## Edge cases y comportamiento ante errores
- EC-01: Si la cabecera Authorization no empieza por "Bearer ",
  el sistema responderá 401 con "Formato de token inválido".
- EC-03: Si Redis no está disponible al validar, el sistema rechazará
  la petición con 503 y registrará el error.
```

Es la sección que más suele faltar y la que más problemas evita.

<div class="cuidado">

EC-03 es una **decisión de diseño**: ¿rechazar la petición o aceptarla sin comprobar? La decide **una persona** y queda escrita; si no, la decide el agente.

</div>

---

# El fuera de alcance cierra puertas concretas

```markdown
## Fuera de alcance
- Refresh tokens (se abordarán en otra spec).
- Inicio de sesión con proveedores externos.
- Límite de intentos de inicio de sesión (lo cubre un middleware global).
```

- Sin esta sección, el agente añade funcionalidades **que parecen lógicas** y que nadie ha pedido.
- Los *refresh tokens* son justo lo que añadió por su cuenta en el tema 1.

<div class="nota">

Si la exclusión es temporal, di **dónde se tratará**: el agente no lo implementa y el equipo no lo olvida.

</div>

---

# Las dudas se marcan, no se esconden

```markdown
- RF-02: El token deberá caducar a las [NECESITA ACLARACIÓN: ¿24 horas
  o 7 días? Depende de si la aplicación se usa en equipos compartidos].
```

- Marca la duda **donde afecta**, con la pregunta concreta y las alternativas.
- Una spec con algún marcador **no se puede aprobar**.
- Puedes pedir al agente que **añada marcadores** donde vea ambigüedades.

<div class="transferencia">

GitHub Spec Kit usa el mismo recurso con el marcador `[NEEDS CLARIFICATION]`.

</div>

---

# La spec es un documento vivo: evoluciona con el código

<div class="flujo">
<div>Spec aprobada</div>
<div>Implementación</div>
<div>Aparece una decisión, un <em>edge case</em> o un cambio</div>
<div class="destacada">Se actualiza la spec en el mismo <em>commit</em></div>
<div>Spec y código coinciden</div>
</div>

- Vive en el **repositorio**, versionada con Git.
- Si deja de coincidir con el código, se investiga **quién tiene razón**.

> Una spec desactualizada es **peor que no tenerla**: le da al agente información falsa.

---

# Los antipatrones más frecuentes tienen arreglo

| Antipatrón | Cómo evitarlo |
|------------|---------------|
| **Vaguedad:** «manejar los errores correctamente» | Respuestas exactas: código y mensaje |
| **Solo el camino feliz** | Sección de *edge cases* obligatoria |
| **Spec gigante** sin estructura | Dividir en varias *features* |
| **Prescribir la implementación** | Describir comportamiento: el cómo va en el plan |
| **Spec fuera del repositorio** | Markdown en `docs/specs/`, versionado |
| **Dudas escondidas** | Marcar con `[NECESITA ACLARACIÓN]` |

---

# Ejemplo: tú escribes el borrador y el agente lo estructura

```text
El usuario escribe el texto de una tarea y pulsa un botón. La tarea
aparece al final de la lista como pendiente. Si el campo está vacío,
no pasa nada. Máximo 280 caracteres.
```

<div class="flujo">
<div>Tu borrador</div>
<div>El agente <em>plan</em> lo estructura y <strong>marca las dudas</strong></div>
<div class="destacada">Tú resuelves las dudas, una a una</div>
<div>Spec <strong>en revisión</strong>, en el repositorio</div>
</div>

El prompt lo dice expresamente: «donde falte información, **no la inventes**».

---

# La spec de «Añadir una tarea» deja escrita cada decisión

```markdown
## Requisitos no funcionales
- RNF-02: El texto de la tarea no podrá superar los 280 caracteres.
- RNF-03: El identificador lo generará el servidor, nunca el cliente.

## Edge cases y comportamiento ante errores
- EC-01: Si el texto solo tiene espacios, el sistema lo trata como vacío
  y responde 400 con { error: "El texto de la tarea no puede estar vacío" }.

## Fuera de alcance
- Editar el texto de una tarea creada (será otra feature).
```

> Identificador, texto vacío y longitud: lo que en el tema 1 decidía el agente ahora es **verificable**.

---

# Convierte frases vagas en requisitos

<div class="prueba">

Reescribe de forma **verificable**: «el sistema debe responder rápido y gestionar bien los errores».

</div>

<div class="prueba">

Divide en requisitos **atómicos**: «el sistema deberá validar el formulario, guardar el usuario y enviarle un correo de bienvenida».

</div>

<div class="prueba">

Escribe dos criterios de aceptación con **Dado… cuando… entonces…** para «marcar una tarea como hecha».

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. El agente **no pregunta, supone**: la spec es inequívoca, verificable y delimitada.
2. Cada sección responde a una pregunta: **para qué**, **qué**, **con qué calidad**, **cuándo está terminada**, **qué pasa si falla** y **qué no se hace**.
3. Requisitos **atómicos** con identificador, no funcionales **medibles** y criterios **binarios**.
4. Las dudas se marcan con `[NECESITA ACLARACIÓN]`: con marcadores, la spec **no se aprueba**.
5. La spec se actualiza en el **mismo *commit*** que el código.

---

# Para practicar

- **Tema 5 de la unidad:** la plantilla base del apartado 5.10 y la spec completa del ejemplo integrador (apartado 5.13).
- **Ejercicio E05, «Más allá del camino feliz»:** completar una spec con *edge cases*, fuera de alcance y dudas marcadas.
- **Ejercicio E06, «Spec con errores sembrados»:** localizar y corregir los antipatrones de una spec.

En el tema 6 revisarás la **notación** y el **nivel de detalle** de la spec antes de aprobarla.
