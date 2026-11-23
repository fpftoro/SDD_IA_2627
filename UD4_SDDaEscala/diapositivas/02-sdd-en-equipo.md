---
marp: true
theme: sdd
paginate: true
lang: es
title: SDD en equipo
description: Diapositivas del tema 2 de la UD4 de Desarrollo guiado por especificaciones con IA
footer: UD4 · Tema 2 · SDD en equipo
---

<!-- _class: portada -->
<!-- _paginate: false -->
<!-- _footer: "" -->

## Desarrollo guiado por especificaciones con IA · UD4 · Tema 2

# SDD en equipo

Criterios de evaluación: **OA4 c**

---

# Al terminar sabrás…

1. Que en equipo la **spec** es también un **contrato entre personas** y sustituye al conocimiento tribal.
2. **Quién aprueba qué** en cada punto de control y cómo repartir la revisión con **pull requests** y `CODEOWNERS`.
3. Gobernar la **constitución** y la memoria del agente.
4. Adoptar SDD **por etapas**, empezando por un piloto.

---

# En equipo, lo que no está escrito lo supone cada uno

| Trabajando solo | En equipo |
|-----------------|-----------|
| La spec es un contrato con el **agente** | Es un contrato entre **personas**, y con el agente |
| Lo que no está escrito lo sabes tú | Lo sabe una persona y las demás lo **suponen** |
| Aprobar es decisión tuya | Aprobar es un **acuerdo**: ¿quién aprueba qué? |
| Cambias la constitución cuando quieres | Un cambio afecta a los agentes de **todo el equipo** |

La comunicación pasa de **conversacional e implícita** a **escrita y explícita**.

---

# Producto pide «editar las tareas»: cada persona entiende una cosa

| Quien lo lee | Lo que entiende |
|--------------|-----------------|
| Producto | Cambiar el texto de una tarea escrita mal |
| Desarrollo | Cambiar cualquier campo: texto, estado, fecha |
| Calidad | ¿Y si se edita una tarea hecha? ¿Y si se deja vacía? |

La spec obliga a decidirlo **antes del código**: solo el texto, una tarea hecha se puede editar y sigue hecha, un texto vacío da 400.

> Sin spec, el desacuerdo aparece en la demostración («esto no es lo que pedí»); con spec, en el punto de control 1, cuando corregirlo cuesta una frase.

---

# Los documentos de SDD sustituyen al conocimiento tribal

| Pregunta | Sin SDD | Con SDD |
|----------|---------|---------|
| ¿Por qué la API responde así? | Pregúntale a quien lo hizo | La spec |
| ¿Por qué se descartó esta librería? | Nadie se acuerda | La alternativa descartada del plan |
| ¿Qué no se puede hacer aquí? | Lo sabe el tech lead | La constitución y `AGENTS.md` |
| ¿Qué falta? | Reunión | El índice de features |

<div class="nota">

Escribir la constitución obliga a poner en común lo que cada persona daba por supuesto. Documentar para el agente y para el equipo es **el mismo trabajo**.

</div>

---

# Los roles se desplazan hacia el principio del flujo

| Rol | Con SDD |
|-----|---------|
| **Producto** | Mantiene el PRD y el orden del índice; **aprueba la spec** |
| **Arquitectura** | Aprueba la **constitución**, la memoria del agente y el **plan** |
| **Desarrollo** | Aprueba las **tasks** y cada **ciclo**; propone cambios de constitución |
| **Calidad** | Añade ***edge cases*** a la spec y revisa las tasks de tests |

Un *edge case* que calidad añade a la spec cuesta una línea y será un test antes que el código. Descubierto en producción, cuesta un incidente.

---

# Cada punto de control tiene a alguien al mando

| Punto de control | Quién aprueba |
|------------------|---------------|
| **0 · Contexto** | Arquitectura |
| **1 · Spec** | Producto, y calidad los *edge cases* |
| **2 · Plan** | Arquitectura |
| **3 · Tasks** | Desarrollo, con calidad en las tasks de tests |
| **4 · Cada ciclo y fusión** | Desarrollo |

Nadie aprueba en todos y nadie está ausente de todos.

> Los agentes del tema 1 **ayudan** a cada rol, no lo sustituyen: **los agentes proponen y las personas deciden**, cada una en su punto de control.

---

# Cada cambio llega a `main` por una *pull request*

| Paso del flujo | En equipo |
|----------------|-----------|
| Aprobar la spec | PR de una rama corta; se fusiona cuando aprueban producto y calidad |
| Plan, tasks y ciclos | En la rama de la feature, con una PR en **borrador** desde el plan |
| Fusionar la feature | Se aprueba la PR y se fusiona con un commit de fusión |

- Una PR en **borrador** enseña el trabajo en curso: arquitectura comenta el plan antes de implementar.
- Una **regla de protección** de `main` exige la CI en verde y las aprobaciones, y que nadie suba directamente.

---

# `CODEOWNERS` pide la revisión a quien corresponde

```text
*                      @organizacion/desarrollo
/docs/specs/*/spec.md  @organizacion/producto @organizacion/calidad
/docs/specs/*/plan.md  @organizacion/arquitectura
/constitution.md       @organizacion/arquitectura
/.opencode/ y /.github/  @organizacion/arquitectura
```

- **Gana la última línea que coincide**: la general va primero.
- `.opencode/` y `.github/` (agentes, permisos, CI) son tan delicados como la constitución.

> Con varios propietarios en una línea, basta con **uno**: producto **o** calidad. Exigir los dos es un acuerdo del equipo.

---

# Que arquitectura no sea un cuello de botella

| Cambio | Revisa |
|--------|--------|
| Constitución, `AGENTS.md`, agentes y permisos, CI | Arquitectura |
| Plan que toca varias capas o añade una dependencia | Arquitectura |
| Plan que sigue el patrón de una feature anterior, tasks y ciclos | Otra persona de desarrollo |
| Spec | Producto, con los *edge cases* revisados por calidad |

Si todo pasa por arquitectura, las revisiones se hacen deprisa, que es **lo mismo que no hacerlas**. Cuanto más decide la constitución, más planes puede aprobar cualquier persona con criterio.

---

# Un cambio de la constitución va en su propia PR, con análisis de impacto

```markdown
## Cambio de la constitución
- **Qué cambia:** el principio nuevo, modificado o eliminado.
- **Por qué:** el problema, la decisión repetida o el incidente.
- **A qué afecta:** código que ya no lo cumple; features en
  curso cuyo plan hay que revisar.
- **Qué hay que hacer:** traer main a las ramas abiertas;
  revisar los planes afectados.
```

- La tercera pregunta es la que más se olvida: un encargo a *explore* busca qué código incumpliría el principio.
- El cambio termina cuando las **ramas abiertas** lo han incorporado y sus planes se han revisado.

---

# La memoria del agente también se gobierna

| Quieres… | Dónde | Quién lo revisa |
|----------|-------|-----------------|
| Que el agente te conteste más breve | `~/.config/opencode/AGENTS.md` | Nadie: es tuyo |
| Un comando que solo usas tú | `~/.config/opencode/commands/` | Nadie |
| Cambiar un comando del equipo | `.opencode/commands/` | Arquitectura, en una PR |
| Cambiar los permisos del implementador | `.opencode/agents/` | Arquitectura, en una PR |

También `opencode.json` (permisos y servidores MCP) y la CI. **Lo personal no se sube; lo que se sube es del equipo y se gobierna como tal.**

---

# La adopción va por etapas, y se pasa de una a otra por hitos

<div class="flujo">
<div><strong>Piloto</strong><br>una o dos personas, una feature mediana</div>
<div><strong>Extensión</strong><br>parte del equipo; constitución y plantillas comunes</div>
<div class="destacada"><strong>Práctica habitual</strong><br>todo el equipo, features nuevas</div>
</div>

- **Hito, no fecha:** se pasa de etapa cuando la feature salió y se sabe qué falló.
- **Apoyo visible** de quien decide y **personas que tiran del carro**.
- **Expectativas realistas:** las primeras specs tardan.
- **No esperar a la perfección:** una spec imperfecta que se usa vale más que una perfecta que no se termina.

---

# Una persona nueva lee el proyecto en un orden, y cada pregunta sin respuesta es un hueco

Un recorrido de lectura, del `README.md` al historial; una primera tarea pequeña con el flujo completo; y el agente respondiendo **con fuentes**.

<div class="nota">

Cada pregunta que la persona nueva hace y que no tiene respuesta escrita es un hueco: **se escribe** en el documento que corresponda, no solo se responde.

</div>

<div class="transferencia">

El **Reglamento europeo de IA** regula los **sistemas de IA**, no programar con IA. Sus artefactos de SDD (specs, trazabilidad, tests, PR, historial) son buena parte de la **evidencia**, pero los puntos de control no son «la supervisión humana» que pide la ley. Consulta siempre la versión oficial vigente.

</div>

---

# Señales de que no se está haciendo SDD

| Señal | Qué está pasando |
|-------|------------------|
| Las specs se escriben **después** del código | Se documenta lo hecho |
| Las PR de specs se aprueban en minutos y sin comentarios | Nadie revisa |
| La constitución tiene reglas que se contradicen | Se añade sin revisar |
| Cada vez más features «demasiado simples para una spec» | La excepción es la norma |
| Las specs no cambian cuando cambia el código | *Spec drift* |
| Solo el tech lead sabe escribir specs | No escala |

Casi todas se corrigen en la **replanificación**: mirar cómo funciona el proceso, no solo el producto.

---

# Reparte la revisión

<div class="prueba">

¿En qué puntos de control entra calidad y qué aporta en cada uno?

</div>

<div class="prueba">

Escribe el `CODEOWNERS` para que arquitectura revise los planes y la constitución, y producto las specs. ¿Qué no garantiza?

</div>

<div class="prueba">

Quieres añadir «los errores van en español» a la constitución. ¿Qué lleva la descripción de la PR?

</div>

---

<!-- _class: cierre -->

# Quédate con esto

1. En equipo, la spec es también un **contrato entre personas** y sustituye al conocimiento tribal.
2. Todo llega a `main` por **pull request**, con `CODEOWNERS` repartiendo la revisión.
3. La **constitución** necesita gobernanza: **PR propia** y **análisis de impacto**; lo mismo la memoria del agente.
4. La adopción va **por etapas**, empezando por un **piloto**.

---

# Para practicar

- **Tema 2 de la unidad:** el reparto por puntos de control (apartado 2.2.5), el `CODEOWNERS` (apartado 2.3.2) y el ejemplo integrador, la lista de tareas con un equipo (apartado 2.11).
- **Ejercicio E04, «Equipo y gobernanza»:** reparte los puntos de control por rol, escribe un `CODEOWNERS` y la PR de un cambio de constitución con su análisis de impacto.

En el tema 3 aplicarás SDD a **proyectos reales**: nuevos, heredados, refactorizaciones y migraciones.
