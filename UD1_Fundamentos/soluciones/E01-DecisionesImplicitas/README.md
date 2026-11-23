# E01-DecisionesImplicitas

## Las decisiones que nadie tomó

### Descripción

Solución del **Ejercicio 1** (autocorrección). El alumno analiza el código que generó un agente a partir de un prompt vago («Haz un endpoint para registrar la devolución de un portátil»), localiza las decisiones que tomó por su cuenta, explica por qué el código se convierte en la especificación de facto, elige entre *vibe coding*, prompt cuidado y SDD para seis situaciones, y reconoce los tres niveles de SDD en la forma de trabajar de tres equipos.

- Enunciado y material de partida: [`practicas/ejercicios/E01-DecisionesImplicitas`](../../practicas/ejercicios/E01-DecisionesImplicitas/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 1 | Las decisiones que nadie tomó | El código como especificación de facto, el espectro *vibe coding*–SDD y los niveles de SDD (OA1 a) |

### Estructura

```text
E01-DecisionesImplicitas/
├── README.md                ← este fichero
├── rubrica.md
└── solucion/
    ├── .devcontainer/devcontainer.json   ← para la parte opcional
    ├── README.md            ← respuesta modelo
    └── codigo-generado/
        └── devoluciones.js  ← material de partida, sin cambios
```

### Comprobaciones hechas

El comportamiento que describe la solución se ha comprobado ejecutando `devoluciones.js` con Express 5 y unos datos de prueba (tres portátiles: `P-01` prestado, `P-02` averiado y sin préstamo, `P-03` prestado):

| Petición | Resultado |
|----------|-----------|
| `POST /api/prestamos/devoluciones` | 404 con una página HTML: la ruta no existe |
| Devolver `P-02` (averiado, sin préstamo) | 200; `P-02` pasa a `disponible` y **desaparece el préstamo de `P-03`**, el último de la lista (`splice(-1, 1)`) |
| Devolver `P-01` tarde y sin `fecha` | 200; no se bloquea a nadie, porque `new Date(undefined)` no es una fecha válida y la comparación da `false` |
| Sin `portatilId` | 500 con una página HTML de error (`TypeError` en la línea 13) |

### Conceptos aprendidos

- Ante un prompt vago, el agente **no pregunta: decide**, y sus decisiones quedan en el código, donde nadie las revisa.
- Algunas decisiones son técnicas (rutas, formato de errores), pero otras son de **gestión** (qué hacer con un portátil averiado) o de **normas** (penalizar un retraso), y no le corresponden ni al agente ni al programador.
- El código que «funciona en la demo» puede tener fallos graves en los casos que nadie probó, como borrar el préstamo de otra persona.
- No todo necesita una spec: *vibe coding* para explorar y tirar, prompt cuidado para cambios pequeños y SDD para lo que tiene que durar.
- El nivel de SDD se reconoce por **quién manda** cuando la spec y el código no coinciden.

### Errores frecuentes

- Consecuencias genéricas («puede dar errores», «no es seguro») en lugar de concretas: a quién le pasa y en qué situación.
- No seguir el código a mano con los casos de «Comprueba tu solución» y perderse las dos decisiones más graves: el `splice(-1, 1)` que borra el préstamo de otra persona y el portátil averiado que vuelve a estar disponible.
- Tratar el bloqueo de siete días como un detalle técnico. Es una **norma** que afecta a las personas: la decide la dirección del centro, no el agente ni el equipo.
- Confundir *spec-first* con *spec-anchored* en el equipo A: que escriban la spec antes no la convierte en ancla; lo que lo indica es que, después, se cambia el código y no la spec.
- Elegir SDD para todas las situaciones. Una maqueta que se va a tirar o un cambio de puerto no necesitan spec.
- En la parte opcional, abrir OpenCode dentro de la carpeta del ejercicio: el agente lee `devoluciones.js` y lo copia, y la comparación pierde sentido.

### Otras soluciones válidas

- Cualquier conjunto de seis decisiones correctas, en cualquier orden y con otra redacción. La de la línea 10 (`conCargador = true`) y la de la fecha pueden aparecer juntas o separadas.
- Decisiones que no están en la tabla, si son reales: por ejemplo, que el bloqueo se guarda en memoria y se pierde al reiniciar el servidor, o que si un portátil tuviera varios préstamos abiertos solo se cerraría el primero.
- En «Quién debería decidirlo», varias respuestas razonables: la fecha de devolución puede ser del equipo o de la coordinación TIC; lo que no es válido es «el agente» o «el programador» para las normas que afectan a las personas.
- El QR puede justificarse como *vibe coding* o como prompt cuidado si se explica que la prueba no se va a conservar.
- Recomendar *spec-anchored* desde el principio, si se justifica (por ejemplo, porque la mantendrán personas distintas cada curso).
- La parte opcional no tiene una respuesta única: cada modelo, y cada ejecución, toma decisiones distintas. Lo esperable es que las dos ejecuciones **no coincidan** en varias filas, y que alguna decisión de las dos sea distinta de lo que el equipo había acordado.
