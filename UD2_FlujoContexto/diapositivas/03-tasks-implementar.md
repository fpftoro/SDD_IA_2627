---
marp: true
theme: sdd
paginate: true
lang: es
title: Tasks e implementación
description: Diapositivas del tema 3 de la UD2 de Desarrollo guiado por especificaciones con IA
footer: UD2 · Tema 3 · Tasks e implementación
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD2 · Tema 3

# Tasks e implementación

Criterios de evaluación: **OA2 c**

---

# Al terminar sabrás…

1. Qué hace buena a una **task** y cómo se revisa una lista de *tasks* (punto de control 3).
2. **Implementar en ciclos cortos**: sesión nueva, tests en rojo y después en verde, un *commit* por grupo.
3. Revisar cada ciclo tú mismo (punto de control 4) y no seguir con la **CI** en rojo.
4. **Parar** y corregir el documento cuando aparece algo inesperado.

---

# Las tasks convierten el plan en pasos que revisas de uno en uno

| | Plan | Tasks |
|---|------|-------|
| **Pregunta** | ¿Cómo se construye? | ¿En qué pasos y en qué orden? |
| **Unidad** | Decisión (`D-01`) | Paso verificable (`T-01`) |
| **Cambia** | Rara vez | Se marca cada una hecha |

> Si cuesta descomponer, suele faltarle algo al plan.

Las *tasks* se agrupan; **cada grupo termina en un punto de control** y suele tener dos: los tests y su implementación.

---

# Una buena task es pequeña, aislada, verificable y trazable

| Cualidad | Señal de que falla |
|----------|--------------------|
| **Pequeña:** uno o dos ficheros | «T-03: implementar la API» |
| **Aislada** | Dos tasks modifican el mismo fichero |
| **Verificable** | «Terminada cuando: funciona bien» |
| **Ordenada** | El controlador antes que su servicio |
| **Trazable** | No viene de ninguna decisión del plan |
| **Con los tests delante** | Los tests, al final de la lista |

---

# La línea *Ficheros* delimita lo que el agente puede tocar

```markdown
- [ ] T-04: Servicio de tareas y ErrorValidacion
  - Ficheros: src/servicios/servicio-tareas.js,
    src/errores/error-validacion.js
  - Cubre: D-01, D-03, D-05
  - Depende de: T-02 y T-03
  - Terminada cuando: los tests de T-03 pasan y los de
    T-01 siguen pasando
```

- La casilla `- [ ]` se marca cuando está hecha **y revisada**.
- Al revisar, un fichero modificado que no está en *Ficheros* es algo que **nadie pidió**.
- `[P]` marca lo que se puede hacer en paralelo (UD4).

---

# El punto de control 3 pregunta si los pasos son pequeños, ordenados y verificables

| Se comprueba | Preguntas |
|--------------|-----------|
| **Tamaño y orden** | ¿Uno o dos ficheros? ¿Los tests, antes que su código? |
| **Cobertura** | ¿Cada decisión del plan y cada fila de pruebas está en alguna task? |
| **Verificabilidad** | ¿Se puede comprobar el criterio sin opinar? |
| **Alcance** | ¿Alguna task no viene del plan? |

<div class="nota">

Las tasks «aburridas» se olvidan: el `package.json`, el `.gitignore`, la configuración, la comprobación manual.

</div>

---

# Los errores típicos de unas tasks generadas

| Error | Qué hacer |
|-------|-----------|
| **Task enorme:** «implementar el backend» | Dividirla según las decisiones |
| **Tests al final** | Ponerlos delante de su implementación |
| **Dependencia al revés** | Reordenar |
| **Criterio vago:** «el servicio funciona» | Pedir qué tests pasan |
| **Task que no viene del plan** | Quitarla; si hace falta, va primero al plan |

<div class="cuidado">

La dependencia al revés se ve mal task a task. Léelas **en orden**: «¿lo que necesita esta task ya existe?».

</div>

---

# Se implementa en ciclos cortos: un grupo cada vez

<div class="flujo">
<div>Sesión nueva<br>agente <em>build</em></div>
<div>Tests en rojo, después en verde</div>
<div class="destacada">Punto de control 4</div>
<div>Marcar, <em>commit</em> y subir la rama</div>
</div>

| Si pides… | Pasa que… |
|-----------|-----------|
| Todas las tasks de golpe | Un cambio enorme que no puedes revisar a fondo |
| Un grupo | Revisas un cambio pequeño y cada error se detecta donde nace |

---

# El prompt de implementar limita, prohíbe y obliga a parar

```text
Implementa el grupo 1 de @docs/specs/A-añadir-tarea/tasks.md
(T-01 y T-02).

Primero T-01: escribe los tests y comprueba que fallan.
Después T-02: lo mínimo para que pasen.

Reglas:
- Haz solo estas dos tasks. No toques ficheros que no
  aparezcan en ellas, salvo tasks.md.
- No cambies un test para que pase. Si crees que está mal,
  dímelo.
- Si algo no encaja con la spec, el plan o la constitución,
  para y pregúntame.
- Al terminar, marca las tasks y espera mi revisión.
```

---

# Primero rojo, después verde

<div class="columnas">
<div>

## Rojo

Los tests existen y **fallan**, porque el código aún no existe.

Si un test nuevo pasa sin código, **no comprueba nada**.

</div>
<div>

## Verde

El agente escribe el código **mínimo** y los tests **pasan**.

Los tests salen de la spec: cada uno lleva su identificador.

</div>
</div>

<div class="cuidado">

La trampa más peligrosa: un agente que no consigue que un test pase puede **cambiar el test**. Todo queda en verde y los tests ya no comprueban la spec.

</div>

---

# Punto de control 4: lo ejecutas tú, no te fías del resumen

```bash
git status
git diff
npm test
```

- **Ficheros:** solo los de las tasks del grupo (y `tasks.md`).
- **Tests:** en verde **ejecutados por ti**, y ninguno anterior modificado ni borrado.
- **Plan y constitución:** el código sigue las `D-xx` y los principios.
- **Alcance:** nada que no esté en la spec.
- **Legibilidad:** si no lo entiendes, que el agente te lo explique **antes** de aceptarlo.

---

# Si el ciclo está bien: marcar, commit, subir y sesión nueva

1. Las tasks del grupo están marcadas con `[x]` en `tasks.md`.
2. **Un commit por grupo**, con las tasks en el mensaje:

   ```text
   Feature A: T-01 y T-02, repositorio con sus tests
   ```

3. `git push` y comprobar que la **integración continua** termina en verde.
4. **Sesión nueva** para el siguiente grupo.

> Las tasks se dan por hechas en el punto de control, **no cuando lo dice el agente**.

---

# La CI repite los tests en una máquina limpia

- En tu equipo pasan; en un repositorio recién clonado puede faltar un fichero que no añadiste al *commit*.
- El workflow del curso (`calidad.yml`) ejecuta los tests tras cada subida.

<div class="cuidado">

**Con la CI en rojo no se sigue ni se fusiona.** Se reproduce con `npm ci` desde cero y se arregla.

El workflow **no se modifica** para que pase: dejaría de medir lo que medía.

</div>

La CI solo dice si los tests pasan; no sabe si los ficheros, el alcance o el código eran los que tocaban.

---

# Cuando aparece lo inesperado, se para y se corrige donde nació

| Situación | Se corrige |
|-----------|------------|
| La task es más grande de lo previsto | `tasks.md`: se añade una task nueva |
| Choca con código existente | `plan.md`, y después las tasks |
| Un comportamiento que nadie decidió | `spec.md` (nueva versión) y el plan |
| El agente quiere mejorar algo «de paso» | Nada: se anota para otra feature |

El cambio en el documento va en el **mismo commit** que el código al que afecta.

> Un comportamiento decidido en el código y no en la spec es una **decisión invisible**.

---

# Los errores más frecuentes al implementar con un agente

| Error | Se evita con… |
|-------|---------------|
| Pedir todas las tasks de una vez | Un grupo por ciclo |
| Aceptar sin leer `git diff` | Compararlo con la línea *Ficheros* |
| Dejar que el agente cambie los tests | Prohibirlo y revisar que no cambian |
| Fiarse del «todos los tests pasan» | Ejecutar `npm test` tú |
| Un único commit al final | Un commit por grupo |

---

# Se fusiona la feature entera, con la CI del último commit en verde

```bash
npm test                                    # todo en verde
git diff --stat main...feature/A-añadir-tarea
git switch main
git merge --no-ff feature/A-añadir-tarea
git branch -d feature/A-añadir-tarea
```

Todo fichero de la rama debe venir de una task, de la carpeta de la feature o de un cambio del contexto aprobado.

<div class="transferencia">

**Spec Kit**, **Kiro** y **Conductor** tienen tasks con casillas. Algunas las ejecutan todas seguidas: más rápido, pero con **menos puntos de control**.

</div>

---

# Revisa un ciclo

<div class="prueba">

El agente te dice: «He cambiado el test de EC-02 porque esperaba 280 caracteres y era más cómodo usar 300». ¿Qué haces y por qué?

</div>

<div class="prueba">

`npm test` pasa en tu equipo y la CI falla con `Cannot find module`. ¿Qué ha pasado probablemente y qué punto de control debía haberlo visto?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Una buena task es **pequeña, verificable y trazable**, con los tests delante y la línea *Ficheros*.
2. Se implementa **un grupo por ciclo**: sesión nueva, rojo, verde y un *commit*.
3. El agente **no cambia tests** para que pasen y **para** ante cualquier duda.
4. El punto de control 4 lo haces **tú**, con `git diff` y `npm test`; con la **CI en rojo** no se sigue.
5. Lo inesperado se corrige **donde nació**, en el mismo *commit* que el código.

---

# Para practicar

- **Tema 3 de la unidad:** la plantilla de tasks (apartado 3.1.5) y el ejemplo integrador (apartado 3.8), con los cuatro ciclos de la feature A.
- **Ejercicio E04, «Del plan a las tasks»:** descompón un plan en `tasks.md` y revisa otras con errores sembrados.
- **Ejercicio E05, «Implementar en ciclos cortos»:** implementa la feature B a partir de sus tasks, con un hueco sembrado que obliga a parar.

En el tema 4 verás cómo se lleva el **estado** de las features.
