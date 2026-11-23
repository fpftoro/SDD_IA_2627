---
marp: true
theme: sdd
paginate: true
lang: es
title: Validación y spec drift
description: Diapositivas del tema 1 de la UD3 de Desarrollo guiado por especificaciones con IA
footer: UD3 · Tema 1 · Validación y spec drift
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD3 · Tema 1

# Validación y *spec drift*

Criterios de evaluación: **OA3 a, d**

---

# Al terminar sabrás…

1. Por qué, con un agente, **generar es fácil y verificar es lo difícil**.
2. Qué es el ***spec drift***, sus formas y por qué se **realimenta**.
3. Los **tres niveles** de validación y cómo usar la **matriz de trazabilidad**.
4. **Depurar desde la spec**: el código es el síntoma y se corrige donde nació.

---

# Con un agente, no se puede dar por supuesto que cumple la spec

- **No es determinista:** la misma spec puede dar implementaciones distintas.
- **El código parece correcto:** limpio y bien nombrado, los errores sutiles pasan desapercibidos.
- **El agente se revisa a sí mismo:** si escribe código y tests, comprueba lo que **él** escribió, no lo que pedía la spec.
- **El volumen:** más código del que se revisa con atención.

> Generar el código es la parte fácil; comprobar que es correcto es la parte **difícil**.

---

# Validar es comparar con lo aprobado

| Pregunta | En SDD |
|----------|--------|
| ¿Lo construimos **bien**? (verificación) | ¿El código cumple la spec y la constitución? |
| ¿Construimos **lo que se necesita**? (validación) | ¿La spec describe lo que el usuario necesita? |

La referencia nunca es «lo que parece razonable» ni «lo que hace el código»: es un **documento aprobado** del repositorio.

<div class="nota">

Importa saber **cuál** de las dos preguntas respondes: si el código no cumple la spec se corrige el código; si la spec no describe lo necesario, la spec.

</div>

---

# El *spec drift* separa la spec del código, y el agente lo realimenta

<div class="flujo">
<div>Alguien cambia el código y <strong>no la spec</strong></div>
<div>La spec ya no describe el sistema</div>
<div>El agente lee la spec y se la cree</div>
<div class="destacada">Genera código incoherente con el sistema</div>
<div>Se arregla solo en el código</div>
</div>

- Como un plano de casa reformado sin actualizar: el fontanero que se fía rompe una tubería.
- El error reaparece con **formas distintas**, porque el agente no es determinista.

> Se acumula en arreglos de cinco minutos: «luego actualizo la spec».

---

# Cuatro formas de *drift*, y los tests pueden seguir en verde

| Forma | Ejemplo |
|-------|---------|
| **Interpretación del agente** | La spec pide `400` y responde `422`, «que es más correcto» |
| **Cambios que no llegan a la spec** | Alguien sube el límite a 500 en el servicio; la spec dice 280 |
| **Regeneración** | «Reescribe el servicio más limpio» y vuelve un error corregido a mano |
| **Arquitectura** | El controlador importa el repositorio y salta el servicio |

Hay una quinta: el ***drift* de los tests**. Un test se llama `EC-02` pero no comprueba lo que EC-02 dice.

---

# Caso: el agente «mejora» la spec y escribe el test que lo confirma

```markdown
- EC-02: Si el texto supera 280 caracteres, el sistema deberá
  responder 400 con { error: "…" }.
```

```javascript
// controlador generado
respuesta.status(422).json({ error: error.message });

// test generado en la misma sesión
expect(respuesta.status).toBe(422);
```

Todo está en verde y **la spec ya no es verdad**. Un revisor que lea el test no verá nada raro: el test coincide con el código, no con la spec.

---

# El repositorio da señales de *drift* antes del fallo

| Señal | Cómo se ve |
|-------|------------|
| Commits de código sin tocar sus documentos | En `git log -- src/` y no en `git log -- docs/specs/A-…/` |
| Identificadores de la spec sin test | Un `EC-` no aparece en ningún test |
| Tests con identificadores que no existen | `EC-07` cuando la spec llega a `EC-05` |
| Comentarios que deciden | `// de momento, 500 caracteres` |

Un commit como `Arreglo rápido del límite de texto`, fuera de cualquier rama de feature, merece una revisión.

---

# Tres niveles de validación, cada uno con su referencia

| Nivel | Pregunta | Referencia |
|-------|----------|------------|
| **1 · Spec** | ¿Describe lo que se necesita? ¿Se puede probar? | PRD y constitución |
| **2 · Código frente a la spec** | ¿Hace lo que dice la spec? | La spec aprobada |
| **3 · Arquitectura** | ¿Respeta los principios del proyecto? | La constitución |

Un código puede cumplir la spec y saltarse las capas; y una spec bien implementada puede describir algo que nadie necesitaba. **No se sustituyen.**

---

# Una spec es válida si se puede comprobar cada requisito

| Requisito | ¿Comprobable? |
|-----------|---------------|
| «La API responde rápido» | ❌ ¿Cuánto es rápido? |
| RNF-01: «menos de 200 ms con 1.000 tareas» | ✅ Guardar 1.000, medir, `toBeLessThan(200)` |
| «Los errores se muestran de forma clara» | ❌ ¿Dónde? ¿Con qué texto? |
| EC-02: «400 con el mensaje exacto» | ✅ 281 caracteres, código y cuerpo |

> Para cada identificador, escribe el **nombre del test** y su **aserción**. Si no puedes, la spec no está terminada.

---

# La matriz de trazabilidad: un test que comprueba lo que dice

| Spec | Test | ¿Comprueba lo que dice? |
|------|------|-------------------------|
| RF-01 | `RF-01: guarda la tarea con id, texto, estado y fecha` | Sí: los cuatro campos y la fecha ISO |
| EC-02 | `acepta…280` y `rechaza…281` | Sí: los dos lados del límite y el mensaje |
| AC-01 | A mano | Comprobado al implementar |

<div class="cuidado">

La búsqueda solo mira **nombres**: lee la **aserción**. Y **rompe el código a propósito** (un `400` por un `401`): si el test sigue en verde, no protege nada.

</div>

---

# La arquitectura la ven las búsquedas y el linter, no los tests

Un controlador que llama al repositorio **responde igual**: los tests de aceptación no lo detectan.

| Principio de la constitución | Cómo se comprueba |
|------------------------------|-------------------|
| Los controladores no acceden a los repositorios | `grep -rn "repositorios" src/controladores/` no encuentra nada |
| Errores `{ error: "mensaje" }` | Tests que comprueban el cuerpo de **cada** error |
| Sin dependencias fuera de Tecnología | `package.json` en el `git diff` |

La primera fila se convierte en una regla del linter (`no-restricted-imports`) que se ejecuta sola: es el tema 3.

---

# Un revisor independiente: contexto limpio, solo lectura, criterios fijos

```yaml
description: Revisa si el código cumple su spec y la
  constitución. No modifica ningún fichero.
mode: subagent
permissions:
  - { action: edit, resource: "*", effect: deny }
  - { action: shell, resource: "*", effect: deny }
  - { action: shell, resource: "npm test", effect: allow }
```

- **Otro agente** en su propia sesión: no ha visto cómo se tomaron las decisiones.
- Se lanza con `/validar`; devuelve la matriz y los hallazgos.
- Quien implementó es el peor revisor de su trabajo.

---

# El informe del revisor son propuestas: se comprueban antes de actuar

**Reprodúcelo** (un test, un `curl`), **contrástalo con la spec** (si no lo dice, es una propuesta, no un fallo) y **decide**.

| Hallazgo | Decisión | Motivo |
|----------|----------|--------|
| «EC-03 no tiene test» | Rechazado | Sí lo tiene, en un `test.each` |
| «Validar con una librería» | Rechazado | Preferencia, no lo pide la spec |
| «AC-03 no comprueba el formato de la fecha» | Aceptado | Leída la aserción, es cierto |

> Pide **evidencia**: fichero, línea e identificador.

---

# El código es el síntoma: seis diagnósticos

| Diagnóstico | Dónde se corrige |
|-------------|------------------|
| **Hueco en la spec** | Spec (versión nueva), y después plan, tasks, tests y código |
| **Spec ambigua** (`length` cuenta un emoji como dos) | Spec: aclarar el término |
| **Error del plan** (fecha con `toLocaleString()`) | Plan, y después el código |
| **Error de implementación** | Código, con un test que lo reproduce |
| **Test que no comprueba lo que dice** | El test, y se comprueba que puede fallar |
| **Petición nueva** | Índice de features: una feature nueva |

---

# Primero la pregunta: ¿lo decide algún documento?

- Si **no** lo decide y era parte de la feature: **hueco de la spec**. Se decide, se escribe y después se corrige el código.
- Si lo decide **claramente** y el código no lo cumple: **error de implementación**.

<div class="flujo">
<div>Test que reproduce el fallo, <strong>en rojo</strong></div>
<div>Arreglo del código</div>
<div class="destacada">Todos los tests, en verde</div>
</div>

<div class="cuidado">

**Nunca** cambies la spec para que diga lo que hace el código solo porque ya está hecho: no corrige el fallo, lo **legaliza**.

</div>

---

# Lo automático no lo detecta todo

| Comprobación | No detecta |
|--------------|------------|
| Tests de aceptación | Lo que la spec no dice: sin *edge case*, no hay test |
| Linter y búsquedas | La lógica de negocio |
| Revisor (otro agente) | Nada con certeza: puede pasar algo por alto o inventarlo |
| Todo lo anterior | Si la spec describe lo que el usuario necesita, y si el código será **fácil de cambiar** |

> Que todo esté automatizado no significa dejar de **leer el código**: es lo que te mantiene dueño del proyecto.

---

# Diagnostica un fallo

<div class="prueba">

La spec dice «280 caracteres», el servicio usa `length` y un texto con un emoji se acepta con 281. ¿Qué diagnóstico es y dónde se corrige?

</div>

<div class="prueba">

La API devuelve una página HTML cuando el cuerpo no es JSON válido y EC-05 pedía un `400` con su mensaje. ¿Qué haces primero?

</div>

<div class="prueba">

Un usuario pide ordenar las tareas por prioridad. ¿Dónde lo anotas?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. Con un agente, **generar es fácil y verificar es lo difícil**.
2. El ***spec drift*** separa poco a poco spec y código, y **se realimenta**.
3. Se valida la **spec**, el **código frente a la spec** (matriz de trazabilidad) y la **arquitectura**.
4. Se depura **desde la spec**: el código es el síntoma y se corrige **donde nació**.

---

# Para practicar

- **Tema 1 de la unidad:** la matriz de trazabilidad (apartado 1.3.2), el subagente revisor (apartado 1.4.2) y el ejemplo integrador, validar la feature A (apartado 1.8).
- **Ejercicio E01, «El drift que nadie vio»:** matriz de trazabilidad de la feature A con *drift* sembrado.
- **Ejercicio E02, «Seis diagnósticos»:** doce fallos, con su diagnóstico y dónde se corrigen.

En el tema 2 los tests saldrán **de la spec** y se escribirán **antes** del código.
