# Cuestionario: SDD a escala: varios agentes, equipos y proyectos reales

- [Cuestionario: SDD a escala: varios agentes, equipos y proyectos reales](#cuestionario-sdd-a-escala-varios-agentes-equipos-y-proyectos-reales)
  - [Varios agentes y trabajo en paralelo](#varios-agentes-y-trabajo-en-paralelo)
  - [Handoffs, seguridad y trazabilidad](#handoffs-seguridad-y-trazabilidad)
  - [SDD en equipo](#sdd-en-equipo)
  - [Proyectos nuevos y código existente](#proyectos-nuevos-y-código-existente)
  - [Antipatrones del flujo](#antipatrones-del-flujo)

Responde con tus palabras, justificando cada respuesta. Cuando se pida investigar, cita las fuentes consultadas e indica la fecha de consulta: las herramientas de este campo cambian deprisa.

---

## Varios agentes y trabajo en paralelo

> Criterios: OA4 a

1. **¿Un agente o varios?:** Piensa en una tarea de programación que hayas hecho (de clase, de un trabajo o inventada pero realista) y decide si repartirla entre varios agentes habría compensado. Justifícalo con los cinco motivos del tema 1 (contexto, permisos, revisión independiente, coste y paralelismo) y di cuál de ellos pesa más y cuál no aplica.

2. **Orquestar o dejar hacer:** Compara la orquestación y la coreografía con un ejemplo que no sea de software (un restaurante, un equipo de redacción…). Explica por qué, con agentes que pueden equivocarse y no repiten siempre lo mismo, la orquestación es más segura, y qué se pierde con ella.

3. **Lo que dicen los que construyen sistemas con agentes:** Lee el artículo de Anthropic sobre cómo construir agentes eficaces y el que cuenta cómo montaron su sistema de investigación con varios agentes. Resume los patrones que describen, qué recomiendan antes de añadir complejidad y qué problema de coordinación cuentan. ¿En qué coincide con el tema 1 y en qué se diferencia? Cita las fuentes y la fecha de consulta.

4. **Dos features a la vez:** Tienes dos features aprobadas y dos agentes. Explica qué comparas antes de decidir si se hacen en paralelo, qué evita un *worktree* y qué no, y por qué el riesgo mayor no es un conflicto de Git. Pon un ejemplo de dos planes que deciden lo mismo por separado.

---

## Handoffs, seguridad y trazabilidad

> Criterios: OA4 b

5. **El encargo es todo el contexto:** Un subagente empieza con la ventana vacía y devuelve un solo mensaje. Escribe un encargo malo y otro bueno para el mismo trabajo (por ejemplo, buscar en el código qué hay que reutilizar antes de planificar una feature) y explica qué le falta al malo.

6. **Los permisos valen lo que valga el agente al que llamas:** Un agente «de solo lectura» tiene la acción `subagent` abierta. Explica qué puede hacer, cómo la cerrarías y por qué se aplica el mínimo privilegio también a `subagent`. Indica qué otros permisos de un agente de revisión te parecen imprescindibles.

7. **Qué hay que dejar escrito:** Cuando varios agentes intervienen en una feature, ¿qué conviene dejar en el historial y en los documentos para poder reconstruir después quién hizo qué y por qué? Distingue lo que va en el mensaje de commit, en el plan y en la PR.

8. **Cómo se escriben los permisos de OpenCode:** Busca en la documentación de OpenCode cómo se escriben los permisos de un agente (edición, terminal, encargos a subagentes) y qué regla gana cuando varias coinciden. Compara con lo que has visto en `CODEOWNERS`. Cita la fuente y la fecha de consulta.

---

## SDD en equipo

> Criterios: OA4 c

9. **La spec como contrato:** Cuenta un caso (real o inventado) en el que un malentendido entre producto y desarrollo se descubrió demasiado tarde. ¿En qué punto de control del flujo se habría descubierto con una spec revisada por las dos partes?

10. **Aprobar no es revisar:** Explica con un ejemplo por qué una aprobación en una *pull request* no garantiza que alguien haya revisado. Indica qué hace GitHub con `CODEOWNERS` y las ramas protegidas y qué no puede hacer, y propón dos medidas del equipo para reforzarlo.

11. **¿Qué va a la constitución?:** Una persona de desarrollo propone añadir a la constitución que el agente conteste en un tono más breve; otra, que todas las fechas de la API se devuelvan en un formato común. Decide dónde va cada propuesta y por qué, y qué proceso seguirías para la que sí va.

12. **El Reglamento y SDD:** Busca en la fuente oficial de la Unión Europea a qué se aplica el Reglamento de inteligencia artificial y qué dice sobre la supervisión humana. ¿Qué artefactos de SDD servirían de evidencia y cuáles no bastarían? Cita la fuente y la fecha de consulta; no te fíes de un calendario que no esté en la versión oficial vigente.

---

## Proyectos nuevos y código existente

> Criterios: OA4 d

13. **Nuevo y existente:** Compara qué haces con la constitución, con la spec y con los tests en un proyecto nuevo y en un proyecto con código heredado. ¿Por qué se dice que en el segundo la constitución describe el presente?

14. **Fallo o comportamiento:** Imagina que, al caracterizar un módulo, descubres tres rarezas (por ejemplo: un orden raro, un texto con «undefined» y un límite de 7 días). ¿Quién decide qué es cada una, qué haces con los tests mientras tanto y cómo queda reflejado en la spec?

15. **La delta de OpenSpec:** Busca en la documentación de OpenSpec qué secciones admite una delta y qué hace cada una. Explica por qué un `MODIFIED` debe copiar el requisito entero y qué puede pasar con un escenario que se quedó fuera. Cita la fuente y la fecha de consulta.

16. **Refactorizar o cambiar:** Un compañero quiere «aprovechar la refactorización» para corregir un fallo que acaba de descubrir. Explica por qué conviene separar los dos ciclos, qué papel tienen los tests en cada uno y qué commits dejarías.

---

## Antipatrones del flujo

> Criterios: OA4 e

17. **Un antipatrón tuyo:** Describe un antipatrón del tema 4 que hayas cometido o visto cometer, con su síntoma, su causa y su corrección. ¿En qué fase del flujo nació y qué punto de control lo habría detectado?

18. **Capas o rebanadas:** Para una feature con tres funcionalidades (añadir, quitar y filtrar), compara repartir las tasks por capas y por rebanadas verticales. ¿Cuándo bastarían las capas? Explica qué ventaja tendrían las firmas fijadas en el plan para repartir el trabajo entre dos agentes y qué riesgo tienen.

19. **Rápido y a oscuras:** Explica con tus palabras la fábrica a oscuras y la deuda cognitiva. ¿Por qué ningún *gate* las detecta? Propón tres hábitos que las eviten sin renunciar a que los agentes trabajen deprisa.

20. **Leer o no leer:** Defiende por escrito cada una de las tres posturas sobre leer el código que escribe un agente y señala el punto débil de cada una. Después elige la tuya para un proyecto de tu elección, razona qué leerías siempre y qué conviertes en un *gate*.
