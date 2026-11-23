# El contexto justo

## Diagnóstico

| Fragmento | Síntoma | Causa | Estrategia | Qué cambias |
|-----------|---------|-------|------------|-------------|
| F1 | Vuelve a proponer algo que se rechazó | Degradación del contexto: el rechazo quedó en medio de un historial muy largo (perdido en el medio) | Sesión nueva por fase y por ciclo (5.7.1) | El rechazo de dayjs va al plan como alternativa descartada, y cada ciclo empieza en una sesión nueva que lee el plan |
| F2 | Deja de cumplir una convención que cumplía al principio | Instrucciones que se apagan: la regla estaba en el primer mensaje | Reglas permanentes en ficheros que se cargan siempre, no en el primer mensaje (5.2.4) | La convención de los nombres de los tests va a `tests/AGENTS.md` (o a la skill de tests); en el prompt del ciclo, como regla final si es crítica |
| F3 | Respuesta lenta y genérica, que no reutiliza lo que hay | Presupuesto de atención: demasiado contexto irrelevante, y lo importante (el middleware) se diluye | Lo justo, no lo posible (5.6.1), con referencias `@` y el subagente *explore* para buscar (5.7.5) | Prompt con `@` a la spec de D, el índice y el plan de C, y una búsqueda de *explore* sobre el código que D puede reutilizar |
| F4 | Implementa más de lo pedido: toca un fichero de otro ciclo | Contexto de la task anterior todavía en la ventana | Sesión nueva por ciclo (5.7.1) | Cada ciclo, con `/new`; en el punto de control, deshacer los cambios fuera de las tasks del ciclo |
| F5 | Trabaja con una versión vieja de la spec | Copia desactualizada: la spec pegada en el historial no cambia cuando cambia el fichero | Referencias, no copias (5.6.3) | La spec se da con `@docs/specs/B-reservar-carro/spec.md`; y tras cambiarla, sesión nueva |
| F6 | Olvida una decisión tomada en la conversación | La compactación automática resumió el historial y perdió el detalle; la decisión solo estaba en la conversación | Escribir en ficheros lo que importa (5.7.4) antes de que se pierda | La decisión del orden va a la spec 1.1 (y su test) en cuanto se toma; después, sesión nueva o `/compact` en un buen momento |
| F7 | Mezcla el intento equivocado con las correcciones | Corregir encima: el intento fallido sigue en la ventana | Deshacer en lugar de corregir encima (5.7.2) | `/undo` tras el primer intento y reescribir el mensaje: «como el repositorio de portátiles, @src/repositorios/repositorio-portatiles.js, un objeto exportado» |

## Contexto por fase

| Fase | Le das | No le das, y por qué | Sesión y agente |
|------|--------|----------------------|-----------------|
| Especificar | `@docs/specs/D-registrar-devolucion/spec.md` (el borrador), `@docs/prd.md`, `@docs/specs/README.md` y las notas de la coordinación TIC. `AGENTS.md` y la constitución ya están | El código: sesgaría la spec hacia lo que ya existe. Los planes de otras features: son el cómo | Nueva, con *plan* (y *build* solo para guardar) |
| Planificar | `@docs/specs/D-registrar-devolucion/spec.md` (aprobada), `@docs/specs/README.md`, `@docs/specs/C-registrar-prestamo/plan.md` como ejemplo y los ficheros que D va a cambiar (servicio, repositorio y controlador de préstamos), o que los busque *explore* | El historial de la fase de especificar (ya está en la spec), el código que D no toca (reservas, portátiles salvo el repositorio) y las specs de otras features | Nueva, con *plan* |
| Descomponer | `@docs/specs/D-registrar-devolucion/plan.md` (aprobado) y la spec | El código y el historial del plan: con el plan y la spec basta | Nueva, con *plan* |
| Implementar (ciclo 2) | Las tasks del grupo 2 de `@docs/specs/D-registrar-devolucion/tasks.md`, la spec, los ficheros de esas tasks y sus tests | Las tasks de otros grupos, el código no relacionado y el historial del ciclo 1 (ya está en el código y en el commit) | Nueva, con *build* |

## Prompt de planificar

```text
Vamos a planificar la feature D. Lee el índice @docs/specs/README.md y la
spec aprobada @docs/specs/D-registrar-devolucion/spec.md.

Usa como ejemplo de formato y de decisiones el plan de la feature C,
@docs/specs/C-registrar-prestamo/plan.md: la devolución sigue las mismas
capas y reutiliza su servicio y su repositorio de préstamos.

Antes de proponer nada, encarga al subagente explore que averigüe qué
funciones de src/ puede reutilizar D (repositorios de préstamos y de
portátiles, middleware usuario-actual, errores y reloj). No leas tú esos
ficheros enteros.

Propón el plan con las secciones de la plantilla del curso: visión
general, contexto técnico, comprobación de la constitución, ficheros,
decisiones técnicas (con motivo, alternativa descartada e
identificadores de la spec), dependencias, secuencia de implementación,
estrategia de pruebas (una fila por cada identificador de la spec, con su
tipo de prueba) y riesgos.

Reglas:
- No escribas código, ni en ficheros ni dentro del plan.
- No cambies la spec. Si algo que se notaría desde fuera no está
  decidido, márcalo con [NECESITA ACLARACIÓN].
- Reutiliza lo que ya existe antes de crear nada nuevo.
- Ninguna dependencia nueva.
```

## Memoria

| # | Elemento | Tipo | Cuándo entra en la ventana |
|---|----------|------|----------------------------|
| 1 | Comandos de `AGENTS.md` | procedimental | Siempre, al empezar cada sesión |
| 2 | Constitución | semántica | Siempre, al empezar cada sesión (con `instructions`) |
| 3 | Spec aprobada de D, al planificar | semántica | Cuando la fase la necesita: al planificar, descomponer e implementar D |
| 4 | Plan de C, como ejemplo | episódica | Solo cuando sirve de ejemplo: al planificar D |
| 5 | Salida de `npm test` de hace cinco minutos | trabajo | Ya está en la ventana; desaparece al cerrar la sesión |
| 6 | `tests/servicio-portatiles.test.js`, como ejemplo de estilo | episódica | Cuando se escriben tests y se señala como ejemplo |
| 7 | PRD | semántica | Cuando la fase lo necesita: al especificar |
| 8 | Propuesta rechazada hace diez minutos | trabajo | Ya está en la ventana (y ese es el riesgo); desaparece al cerrar la sesión |
| 9 | Prohibiciones de `AGENTS.md` | procedimental | Siempre, al empezar cada sesión |
| 10 | `git log` de la carpeta de C | episódica | Cuando se busca cómo se resolvió algo parecido |

## Comparación

> Parte opcional: no hay una respuesta única, porque depende del modelo y de la sesión. Lo que se espera es que la comparación mire, como mínimo:

- **Tamaño y foco:** si el plan de la sesión larga arrastra explicaciones del código de A que ya no hacen falta.
- **Arrastre:** si menciona la mejora de A que se rechazó (es el síntoma de F1).
- **Reutilización:** si los dos usan el middleware `usuario-actual` y los errores que ya existen.
- **Cobertura:** si los dos tienen una fila de pruebas por identificador de la spec.
- **Decisión:** cuál se aprobaría, y por qué. Si los dos salen parecidos, decirlo también vale: una sesión corta no siempre se degrada.
