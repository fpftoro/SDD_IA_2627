---
marp: true
theme: sdd
paginate: true
lang: es
title: Pruebas desde la spec
description: Diapositivas del tema 2 de la UD3 de Desarrollo guiado por especificaciones con IA
footer: UD3 · Tema 2 · Pruebas desde la spec
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD3 · Tema 2

# Pruebas desde la spec

Criterios de evaluación: **OA3 b**

---

# Al terminar sabrás…

1. Escribir **un test por criterio y por *edge case***, desde la spec y **antes** que el código.
2. Elegir el **nivel** de cada test: unitario, de integración o e2e.
3. Detectar **tests que mienten** y comprobar que un test **puede fallar**.
4. Hacer que el agente que implementa **no pueda tocar los tests**.

---

# Los tests desde la spec son el examen escrito antes de ver las respuestas

| | Desde el código | Desde la spec |
|---|-----------------|---------------|
| **Fuente** | Lo que hace el código | Lo que dice la spec |
| **Cuándo** | Después de implementar | **Antes** de implementar |
| **Si el agente se equivoca** | El test reproduce el error | El test **lo detecta** |

El test de EC-02 que comprobaba `422` pasaba porque el controlador respondía `422`: comprobaba el código **contra sí mismo**.

> Los tests son la parte de la spec **que se ejecuta**.

---

# Probar desde la spec no es lo mismo que TDD

| | TDD | Desde la spec |
|---|-----|---------------|
| **De dónde salen** | De lo que se decide en ese momento | De los AC y EC de una spec aprobada |
| **Tamaño del paso** | Un test cada vez | Todos los tests de la feature |
| **Quién programa** | La misma persona | El agente, tras revisar los tests |
| **Sirve para** | Diseñar el código | Comprobar que cumple lo aprobado |

<div class="transferencia">

**Cucumber** ejecuta los escenarios de Gherkin enlazando cada frase con código. La spec ya no puede cambiar sin que falle algo, pero añade una herramienta y los pasos también pueden mentir.

</div>

---

# Un test por criterio y por *edge case*, con su identificador

| Elemento de la spec | Qué test sale de él |
|---------------------|---------------------|
| **Criterio de aceptación** | Un test del escenario: mismo «Dado», «Cuando» y «Entonces» |
| ***Edge case*** | Un test que provoca la situación y comprueba la respuesta **exacta** |
| **RNF** | Un test con la medida de la spec, si es fiable |
| **Decisión del plan** | Un test **unitario**, si tiene lógica propia |

```javascript
test('B-EC-02: responde 500 si no se pueden obtener las tareas', …
  expect(respuesta.status).toBe(500);
  expect(respuesta.body).toEqual({ error: 'Error al obtener las tareas' });
```

El nombre lleva la **letra de la feature** (`B-EC-02`); los valores, copiados **tal cual** de la spec.

---

# De un escenario de Gherkin a un test: preparar, actuar y comprobar

| Gherkin | En el test (AC-03 de B) |
|---------|-------------------------|
| **Dado** | Crear tres tareas, en un orden concreto |
| **Cuando** | Enviar `GET /tareas` |
| **Entonces** | Código `200` y las tres tareas, en ese orden, con sus cuatro campos |

```javascript
const respuesta = await request(app).get('/tareas');
expect(respuesta.status).toBe(200);
expect(respuesta.body).toEqual(creadas);
```

`creadas` son las tareas que devolvió la API al crearlas, **en el orden conocido**. Un `toContain('Error')` parafrasea y deja de comprobar lo que la spec decidió.

---

# Los límites, por los dos lados, y datos que distinguen

- **Límites:** si el máximo es 280, un test con 280 (se acepta) y otro con 281 (se rechaza): el error suele estar en un `>` donde iba un `>=`.
- **Datos que distinguen:** «Comprar leche», «Pagar la luz» y «Llamar al fontanero» no son azar.

| Si el código… | Devolvería | ¿Lo detecta? |
|---------------|------------|--------------|
| Ordena alfabéticamente | Comprar, Llamar, Pagar | Sí |
| Pone la más reciente primero | Llamar, Pagar, Comprar | Sí |

Con «Tarea 1», «Tarea 2» y «Tarea 3» el orden alfabético y el de creación **coinciden**. Pregúntate qué implementación incorrecta, pero razonable, pasaría el test.

---

# Escribir los tests también valida la spec

Al preparar el test de EC-03 (la página recibe un error 500 y lo muestra) surge una pregunta: **¿y si no hay respuesta?**

`fetch` lanza un error y no hay mensaje que mostrar: la spec no decide qué ve el usuario. Es un **hueco en la spec**, hallado antes de escribir código.

```markdown
- EC-04: Si la página no recibe respuesta del servidor al
  pedir la lista, entonces deberá mostrar el mensaje "No se
  ha podido conectar con el servidor".
```

> Por eso los tests se escriben al **empezar** la feature: cuanto antes aparece el hueco, más barato es cerrarlo.

---

# Tres niveles de prueba, según cuánto sistema ponen en marcha

| Nivel | Qué pone en marcha | Herramienta |
|-------|--------------------|-------------|
| **Unitario** | Una pieza aislada | Vitest |
| **Integración** | Varias piezas, sin navegador: `POST /tareas` atraviesa todas las capas | Vitest y supertest |
| **E2E** | Todo el sistema, como lo usa una persona | Playwright |

- Muchos unitarios, bastantes de integración y **pocos e2e**: los e2e son lentos, frágiles y poco precisos.
- El detalle (cada error, cada límite) se prueba en el nivel **más bajo** donde se vea.

---

# El nivel lo decide dónde se ve lo que dice la spec

| Spec de la feature B | ¿Dónde se ve? | Nivel |
|----------------------|---------------|-------|
| RF-01, AC-03, EC-01, EC-02 | Respuesta de `GET /tareas` | Integración |
| RF-02, RF-03, AC-01, AC-02 | La página, con el servidor funcionando | E2E |
| EC-03, EC-04 | La página, cuando el servidor falla | Página con respuesta simulada |
| D-01, D-02 | No se ven desde fuera | Los cubren los tests de la API |

> `listarTareas()` es de una línea: un test unitario no comprobaría nada que la API no compruebe ya.

---

# Todos los tests, en el primer grupo, revisados y en rojo

<div class="flujo">
<div>Spec aprobada</div>
<div>Grupo 1: <strong>tests</strong> de toda la feature</div>
<div class="destacada">Revisión con la spec al lado</div>
<div>Commit de los tests</div>
<div>Implementación: <strong>no toca</strong> los tests</div>
</div>

- Cada AC y cada EC tiene test, con **valores exactos** y datos que distinguen.
- Sin `skip`, `todo` ni `only`; ningún test depende del orden.
- Después de implementar, con todo en verde, un test débil **ya no se nota**: la revisión es ahora.

---

# El rojo correcto: el test llega a la aserción y falla por lo que debe

```text
× B-EC-01: …   AssertionError: expected 404 to be 200
```

```text
× B-EC-01: …   SyntaxError: Unexpected token ')'
FAIL tests/api-tareas.test.js   Cannot find module '../src/app'
```

Solo el primero es el **rojo correcto**: `GET /tareas` aún no existe y Express responde `404`.

Los otros dos fallan **antes de comprobar nada**: no demuestran que el test sepa detectar la ausencia del comportamiento.

Lee el **mensaje** de cada fallo, no solo cuántos hay en rojo.

---

# Un test que miente pasa aunque el código no cumpla la spec

```javascript
expect(respuesta.body).toEqual(repositorioTareas.obtenerTodas());
```

- Compara la respuesta con **lo que devuelve el repositorio**, que es parte del código probado. Si el servicio ordena por texto, **pasa** igual.
- Otras formas: datos que no distinguen, aserciones que no se ejecutan, *mocks* que sustituyen lo probado, tests desactivados.

<div class="cuidado">

El valor esperado (el **oráculo**) sale de la spec o del propio test, **nunca** del código que se prueba.

</div>

---

# Un test sirve si puede fallar: rompe el código a propósito

- A mano: cambia un `400` por un `401` y ejecuta los tests.
- De forma sistemática, con **pruebas de mutación** (Stryker): cada **mutante** es un cambio pequeño en el código.

```text
[Survived] OptionalChaining
-  crearTarea(peticion.body?.text)
+  crearTarea(peticion.body.text)
```

Sin el `?.`, una petición **sin cuerpo** da `500` y la spec pide `400`, pero **ningún test** envía una petición sin cuerpo.

> Cada superviviente es una **pregunta**: ¿lo decide la spec? Si sí, falta un test.

---

# Un agente que quiere ver verde puede cambiar el test: sin permiso, no puede

Puede cambiar el valor esperado, desactivar o borrar el test. Un prompt es una **petición**; un permiso, una **garantía**.

```yaml
description: Implementa las tasks de código.
permissions:
  - { action: edit, resource: "*", effect: allow }
  - { action: edit, resource: "tests/**", effect: deny }
  - { action: edit, resource: "e2e/**", effect: deny }
  - { action: edit, resource: "docs/specs/**", effect: deny }
```

Los tests los escribe *build* y los aprueba una persona; el `implementador` no puede editarlos.

---

# Se comprueba con Git que nadie ha tocado los tests

```bash
git diff --stat $(git log -1 --format=%h \
  --grep='Tests de la feature B') -- tests/ e2e/
```

**Si no sale nada, los tests son los que aprobaste.**

Cuando el test está mal, la regla es **«los tests no los cambia quien implementa»**:

1. El agente para y explica qué test y por qué cree que está mal.
2. Tú lo compruebas con la spec al lado.
3. Si está mal, lo corriges **tú**, en un **commit propio** con su motivo.

> Quien implementa tiene el objetivo; la persona tiene la autoridad sobre qué significa «pasar».

---

# Revisa tests

<div class="prueba">

Un test de AC-03 usa «Tarea 1», «Tarea 2» y «Tarea 3», y compara con las tareas creadas. ¿Qué implementación incorrecta pasaría?

</div>

<div class="prueba">

¿Qué nivel elegirías? (a) el `400` de un texto de 281 caracteres; (b) la página muestra el mensaje de error; (c) `crearTarea` recorta el texto.

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Los tests salen **de la spec** y se escriben **antes**: un test por criterio y por *edge case*, con su identificador.
2. El **nivel** lo decide dónde se ve el comportamiento; el detalle, en el nivel más bajo posible.
3. Un test sirve si **puede fallar**: se descubre rompiendo el código a propósito.
4. El agente que implementa **no puede tocar los tests**: lo garantizan los permisos y se comprueba con Git.

---

# Para practicar

- **Tema 2 de la unidad:** los límites y los datos que distinguen (apartado 2.2.3), los tests que mienten (apartado 2.5) y el ejemplo integrador, la feature B con los tests primero (apartado 2.10).
- **Ejercicio E03, «Tests que mienten»:** un fichero de tests con mentiras sembradas, el mutante que las demuestra y el test corregido.
- **Ejercicio E04, «Los tests primero»:** la feature B con los tests revisados antes y un agente `implementador` sin permiso sobre ellos.

En el tema 3 todo esto se automatiza con **quality gates**.
