---
marp: true
theme: sdd
paginate: true
lang: es
title: Quality gates
description: Diapositivas del tema 3 de la UD3 de Desarrollo guiado por especificaciones con IA
footer: UD3 · Tema 3 · Quality gates
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD3 · Tema 3

# *Quality gates*

Criterios de evaluación: **OA3 c**

---

# Al terminar sabrás…

1. Qué es un ***quality gate*** y en qué se diferencia de un punto de control.
2. Convertir las **capas de la constitución** en reglas de lint y usar la **cobertura** como suelo.
3. Los gates **propios de SDD**: trazabilidad, estado, spec existente y tests modificados.
4. Ejecutarlos en **integración continua** y **fusionar solo con la CI en verde**.

---

# Un gate lo decide un programa, en cada cambio

Como el arco de seguridad de un aeropuerto: suena o no suena, y si suena, no pasas.

| | Punto de control | *Quality gate* |
|---|------------------|----------------|
| **Decide** | Una persona | Un programa |
| **Comprueba** | Lo que necesita juicio | Lo que se puede medir |
| **Cuándo** | Cuando alguien se acuerda | **Siempre**, en cada cambio |
| **Si falla** | La persona decide si sigue | El cambio no avanza |

> Una comprobación que depende de la memoria de alguien no es un gate: es una buena intención.

---

# Se automatiza lo que tiene respuesta objetiva

| Automática | Humana |
|------------|--------|
| Los tests pasan | Los tests comprueban lo que dice la spec |
| Sin errores de lint ni violaciones de capas | La spec describe lo que se necesita |
| La cobertura supera el umbral | El plan es el adecuado |
| Cada identificador tiene su test | El código se podrá mantener |
| El índice coincide con las specs | |

> La columna humana no se queda vacía nunca. Un gate no sustituye la revisión: la hace **más corta**.

---

# Siete gates, y cada uno es un comando que puedes ejecutar en local

| Gate | Qué comprueba |
|------|---------------|
| **Lint** | Errores y capas de la constitución |
| **Tests y cobertura** | Los tests pasan y la cobertura supera el umbral |
| **Pruebas de la página** | Los recorridos de Playwright |
| **Trazabilidad** | Cada identificador tiene su test |
| **Estado** | El índice coincide con cada spec |
| **Spec existente** | Si cambia el código, cambia su documentación |
| **Tests modificados** | Ningún commit mezcla tests existentes y código |

Cada comando termina con código `0` si todo va bien.

---

# Las capas de la constitución se convierten en reglas de lint

```javascript
{ files: ['src/controladores/**/*.js'],
  rules: { 'no-restricted-imports': ['error', { patterns: [{
    group: ['**/repositorios/**'],
    message: 'Un controlador no accede a los repositorios.',
  }] }] } },
```

- Otro bloque impide que servicios y repositorios importen Express o las capas de arriba.
- `files` limita la regla a las carpetas donde se aplica.

---

# El mensaje del lint explica qué principio se ha roto

```text
src/controladores/controlador-tareas.js
  3:1  error  '../repositorios/repositorio-tareas.js' import is
  restricted. Un controlador no accede a los repositorios.
  Las capas son controladores → servicios → repositorios
  (constitución)                         no-restricted-imports
```

Si el agente ejecuta el lint, el mensaje le dice qué regla incumple **y por qué**, y suele corregirlo sin que intervengas.

<div class="nota">

Cada principio de la constitución que se pueda automatizar, debería hacerlo. Los que no («mensajes en español») siguen necesitando revisión.

</div>

---

# La cobertura mide código ejecutado, no comprobado

| La cobertura… | |
|---------------|---|
| Encuentra código que ningún test ejecuta | ✅ |
| Dice si los tests comprueban algo | ❌ |
| Dice si se cumplen los criterios de la spec | ❌ |
| Mide la página (`public/`) | ❌ La ejecuta el navegador |

Un test sin `await` ejecuta toda la ruta y **cuenta** aunque no compruebe nada.

> En SDD, la cobertura de **código** es un gate secundario. La pregunta importante la responde la **trazabilidad**: la cobertura de la **spec**.

---

# El umbral es un buen suelo y un mal objetivo

- **Lo decide el proyecto**, en la constitución: si cada feature decidiera el suyo, el agente lo bajaría cuando le estorbara.
- **Por debajo de lo que hay, pero cerca.** Un 100 % lleva a escribir tests sin valor para cubrir la última línea.
- **Las ramas importan más que las líneas:** un `if` sin `else` puede tener un camino sin probar.

<div class="cuidado">

«Sube la cobertura al 95 %» se puede cumplir **sin probar nada**. Si la quieres, pide tests **de la spec** y revísalos como en el tema 2.

</div>

---

# Trazabilidad: cada identificador con su test, o con su comprobación a mano

```text
⚠️  A-AC-01: se comprueba a mano, según el plan
⚠️  A-RF-03: se comprueba a mano, según el plan
❌ B-EC-04: sin test
```

- Solo mira las specs `En implementación` o `Implementada`.
- **Sin test** y sin comprobación a mano en el plan: **error**; a mano: **aviso**.
- Usa la **letra de la feature** (`B-EC-04`).

<div class="cuidado">

Mira **nombres**: dice que hay un test con el identificador, no que compruebe lo que dice.

</div>

---

# Spec existente: si cambia el código, cambia su documentación

```text
❌ Spec: la rama cambia src/ o public/ sin cambiar ninguna
   spec, plan o tasks de docs/specs/
```

- Para el *drift* por **cambios que no llegan a la spec**: el compañero que sube el límite a 500 en una rama.
- Es **estructural**: comprueba que se ha tocado un documento, no que sea coherente.
- Compara con `git diff --name-only <base>...HEAD` y `core.quotePath=false`.

---

# Tests existentes modificados: no se cambia la vara de medir al implementar

```text
❌ «Sube el límite del texto a 500» cambia tests existentes y
   código a la vez: tests/servicio-tareas.test.js
⚠️  «Corrige EC-01» cambia tests existentes (revisa el motivo)
```

- Un commit que cambia tests que ya existían **y** código no deja saber si el test se ajustó al código: **error**.
- Un commit que solo cambia tests puede ser correcto (lo corrige una persona): **aviso**.

> Los avisos solo sirven si alguien los lee. Por eso se avisa solo de lo que necesita revisión, y se falla en lo que nunca debería pasar.

---

# La integración continua ejecuta los gates en una máquina limpia

| Término | Qué es |
|---------|--------|
| ***Workflow*** | Un YAML en `.github/workflows/` |
| **Evento** | Lo que lo dispara: cada `push` |
| ***Job*** | Pasos en una máquina limpia; los *jobs* van **en paralelo** |
| ***Runner*** | La máquina: se crea y se destruye |
| **Acción** | Un paso reutilizable (`actions/checkout`) |

Cada *job* empieza **sin tus dependencias, navegadores ni ficheros sin subir**. Si funciona en tu equipo y falla en la CI, tu equipo tiene algo que el repositorio no dice.

---

# Cuatro detalles que se olvidan al escribir un workflow

- **`fetch-depth: 0`:** por defecto solo baja el último commit, y los gates que comparan con `main` necesitan el historial.
- **`if: ${{ !cancelled() }}`:** si un paso falla, los siguientes del *job* no se ejecutan; con esto, un fallo no esconde otro.
- **Un *job* por tipo de gate:** el primer fallo no esconde los demás, y tardan lo que el más lento.
- **Navegadores:** en un *runner* limpio no están; el *job* e2e necesita `npx playwright install --with-deps chromium`.

Los secretos van en los *secrets* del repositorio, **nunca en el YAML**, y el agente no debe acceder a ellos.

---

# Se fusiona con la CI en verde, y se lee antes cada aviso

1. `git push -u origin feature/B-ver-lista`: la CI se ejecuta.
2. Abres una *pull request* hacia `main`; si algo está en rojo, lo arreglas en la rama.
3. Con todo en verde, revisas el `git diff` y **lees los avisos**.
4. Fusionas con **«Create a merge commit»**.

Una **regla de protección** de `main` puede exigir los *jobs* en verde: la puerta no se salta ni por despiste.

<div class="transferencia">

Los *hooks* de Kiro o de otros agentes ejecutan comprobaciones **mientras trabaja el agente**; la CI es el único gate que **no depende de nadie**. Úsalos juntos. En otro lenguaje cambian las herramientas (JUnit, pytest, ArchUnit…), no los gates.

</div>

---

# Guías y controles forman el arnés (*harness*) del proyecto

<div class="columnas">
<div>

## Guías: qué hacer y cómo

- `AGENTS.md` y constitución
- Spec, plan y tasks
- Skills y comandos

</div>
<div>

## Controles: limitan o comprueban

- Permisos: **antes**, impiden la acción
- Tests, lint y gates: **después**, comprueban el resultado
- `revisor`: señala hallazgos; decides tú

</div>
</div>

> Si el agente repite un error, no se lo pidas otra vez: cambia el arnés (*harness*).

---

# Un cambio en el arnés (*harness*) se evalúa con una batería, no con una sesión

- **Casos fijos:** un criterio inequívoco, un requisito ambiguo, un fichero protegido y el error de una herramienta (este, **reservado**).
- Cada intento se puntúa **por separado**: resultado, límites y escalar.
- Cada caso se repite y se cuenta: «2 de 3», sin porcentajes.
- Un cambio cada vez; el caso reservado, al final y con las dos configuraciones, descubre las regresiones.

<div class="cuidado">

Tests en verde después de editar un test prohibido: resultado sí, límites **no**. La batería, fuera del alcance del agente.

</div>

---

# Lo que un gate no puede medir

- **Que los tests comprueban la spec:** un test que miente pasa la trazabilidad y la cobertura.
- **Que la spec es la correcta.**
- **La mantenibilidad.**
- **Lo que nadie convirtió en regla:** un principio sin regla, ningún gate lo ve.

<div class="cuidado">

**Falsa seguridad:** «CI en verde» es condición **necesaria** para fusionar, no suficiente. Y un gate que falla sin motivo se arregla o se quita; no se deja sonando.

</div>

> Los gates son buenos **suelos** y malos **objetivos**.

---

# Decide qué es un gate

<div class="prueba">

Un proyecto tiene un 100 % de cobertura. ¿Cumple su spec? Justifica.

</div>

<div class="prueba">

La CI falla en el job `flujo` porque `comprobar-spec.sh` no ve ninguna rama de comparación. ¿Qué has olvidado en el workflow?

</div>

<div class="prueba">

Todos los tests pasan en tu equipo y fallan en la CI con «Executable doesn't exist». ¿Qué paso falta?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Un gate comprueba con un programa lo que tiene **respuesta objetiva**; el resto queda para las personas.
2. **Lint** con las capas de la constitución; **cobertura** como suelo, no como objetivo.
3. Gates de SDD: **trazabilidad**, **estado**, **spec existente** y **tests modificados**.
4. La CI ejecuta los mismos comandos en una máquina limpia; **solo se fusiona con la CI en verde**.

---

# Para practicar

- **Tema 3 de la unidad:** las reglas de lint (apartado 3.3.2), los cuatro gates de SDD (apartado 3.5), el arnés (*harness*) del proyecto y cómo evaluar al agente (apartado 3.7) y el ejemplo integrador, fusionar la feature B con la CI en verde (apartado 3.11).
- **Ejercicio E05, «Los gates del proyecto»:** ESLint con capas, cobertura, trazabilidad y un workflow de GitHub Actions, con una ejecución en rojo y otra en verde.
- **Ejercicio E06, «Evaluar al agente»:** puntúa intentos preparados y pasa una batería de cuatro casos con dos configuraciones del arnés (*harness*).
- **Ejercicio E09, el integrador:** la feature D con los gates en verde.

En el tema 4 verás las **herramientas** del ecosistema SDD.
