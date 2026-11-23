# E03-PlanFeature

## El plan de una feature

### Descripción

Solución del **Ejercicio 3** (autocorrección, con agente). El alumno prepara la rama y la sesión, pide el plan de la feature B del préstamo de portátiles («Reservar un carro») al agente *plan*, conversa con él, lo guarda con *build*, lo revisa con la lista del punto de control 2 y lo aprueba con las decisiones documentadas. Es el primer eslabón de la cadena E03 → E04 → E05.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E03-PlanFeature`](../../practicas/ejercicios/E03-PlanFeature/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 3 | El plan de una feature | Generar y revisar un plan técnico con el agente, sin código (OA2 b) |

### Estructura

```text
E03-PlanFeature/
├── README.md        ← este fichero
├── rubrica.md
└── solucion/        ← el proyecto al terminar, en la rama de B
    ├── README.md    ← ejemplo comentado de la sesión y las decisiones
    └── docs/specs/B-reservar-carro/plan.md   ← plan de referencia (punto de partida del E04)
```

El resto de `solucion/` es el proyecto de partida sin cambios: la feature A implementada (26 tests en verde, comprobado en Docker con `node:24-alpine`) y la spec de B aprobada (Gherkin validado).

### Corrección

La entrega está en la rama `feature/B-reservar-carro`, que **no** se fusiona. Se prepara con:

```bash
RAMA=feature/B-reservar-carro herramientas/corregir.sh UD2_FlujoContexto E03-PlanFeature <carpeta-repos> <prefijo> [fecha-límite]
```

Si el alumno no subió la rama, `corregir.sh` lo avisa y evalúa `main`, que no tendrá el plan.

### Qué tiene que salir en un buen plan de B

Las decisiones que el agente suele proponer mal y que la revisión debe corregir:

| Tema | Lo correcto | Propuestas habituales del agente que se rechazan |
|------|-------------|--------------------------------------------------|
| Fechas y «hoy» (RNF-04) | Date e Intl, con la zona `Europe/Madrid`; un reloj sustituible en los tests | dayjs, date-fns, moment; `new Date()` directamente en el servicio |
| Comprobaciones | En el servicio, en el orden de los *edge cases* (EC-16) | Un middleware de validación o express-validator en la ruta |
| Identificación | El middleware `usuarioActual` que ya existe | Leer el profesor del cuerpo; crear otro middleware |
| Carros | Constante A, B y C | Sacarlos de los portátiles (el carro C no tiene) |
| Errores | `ErrorValidacion`, `ErrorNoEncontrado` y un `ErrorConflicto` nuevo | Responder directamente desde el servicio |
| Pruebas | Una fila por identificador (29 en total), con integración para lo que se ve en la API | Solo unitarios; sin RNF-04, EC-15 o EC-16 |

**La spec tiene un hueco** que no está sembrado para este ejercicio, sino para el E05: RF-03 no dice en qué **orden** se devuelven las reservas de un día. El plan de referencia no lo detecta (AC-05 se comprueba sin orden). Si un alumno lo detecta aquí y sube la spec a 1.1 con el orden decidido, es un acierto: hay que valorarlo en la rúbrica.

### Conceptos aprendidos

- El plan se prepara en su rama, en una sesión nueva y con el agente *plan*; *build* solo guarda el documento.
- La primera propuesta del agente es un punto de partida: se pregunta, se pide alternativa, se rechaza con motivo y se comprueba la cobertura.
- Lo rechazado no desaparece: queda como alternativa descartada en el plan.
- Una marca `[NECESITA ACLARACIÓN]` del agente no siempre es un hueco: a veces la spec ya lo decide.
- La revisión se hace con la lista del punto de control 2, no con la sensación de que «está bien».

### Errores frecuentes

- Pedir el plan con *build*, o en la misma sesión en la que se revisó la spec.
- Trabajar en `main` en lugar de en la rama, o fusionar la rama al terminar.
- Que *build*, al guardar, cree también `src/` o `package.json` y no deshacerlo.
- Aceptar todas las propuestas: la tabla «Decisiones» sin ningún rechazo, o con rechazos sin motivo.
- Aceptar una dependencia de fechas «porque es más cómodo».
- Lista de comprobación marcada entera con un plan que no la cumple (por ejemplo, decisiones sin alternativa descartada o filas que faltan).
- Decidir en el plan algo que se nota desde fuera (el orden de la lista, un mensaje nuevo) en lugar de subir la spec de versión.
- No exportar la sesión, o un README que no dice qué prompts se usaron.

### Otras soluciones válidas

- Otra división en decisiones (por ejemplo, el reloj dentro de la decisión de fechas) u otros nombres de funciones y ficheros, si respetan la constitución.
- Un repositorio de reservas con otras operaciones (por ejemplo, `obtenerTodas` y el filtro en el servicio).
- Un identificador numérico consecutivo en lugar de `crypto.randomUUID()`, si el plan explica el motivo.
- Comprobar algún *edge case* solo con un test de integración (o con los dos tipos), si la estrategia de pruebas lo justifica.
- Detectar el hueco del orden de RF-03 y resolverlo con una spec 1.1 antes del plan.
- Una sesión con más pasos o con otro orden, siempre que estén las tres cosas del paso 5 del enunciado.
