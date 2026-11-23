# E09-SpecDevolucion

## La spec de una feature

### Descripción

Solución del **Ejercicio 9** (autocorrección, con agente). El alumno escribe la spec de «Registrar la devolución de un portátil» en cuatro fases: un borrador propio sin agente; la spec estructurada por el agente *plan* a partir de unas notas de reunión incompletas, con marcadores donde falta información; las dudas resueltas con las respuestas de la coordinación TIC y una revisión de notación y granularidad con el agente; y la aprobación con la lista de comprobación del tema 6. Cada fase acaba en un commit.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E09-SpecDevolucion`](../../practicas/ejercicios/E09-SpecDevolucion/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 9 | La spec de una feature | Spec completa con un agente: del borrador a la spec aprobada (OA1 e, f) |

### Estructura

```text
E09-SpecDevolucion/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── .devcontainer/devcontainer.json
    ├── AGENTS.md, constitution.md, opencode.json   ← sin cambios
    ├── README.md           ← entrega modelo
    ├── package.json, herramientas/validar-gherkin.mjs
    └── docs/
        ├── prd.md, notas-devolucion.md, respuestas-coordinacion.md   ← sin cambios
        └── specs/
            ├── README.md   ← D en 🔜 Aprobada
            └── D-registrar-devolucion/spec.md   ← versión 1.0, Aprobada
```

La solución no incluye `sesiones/`: son las exportaciones de cada alumno. Lo que dice la entrega modelo sobre lo que propuso el agente es un ejemplo; cambia con el modelo y con cada ejecución.

### Ejecutar

Dentro del Dev Container del ejercicio:

```bash
npm run validar     # ✅ 1 documento de Gherkin sin errores
```

Antes de que exista la spec, el script avisa de que no hay ningún escenario de Gherkin: es lo esperado.

### Qué falta en las notas

Las notas de la reunión dejan sin decidir, a propósito, varias cosas que la spec necesita. Todas tienen respuesta en `docs/respuestas-coordinacion.md`:

| Duda | Dónde va en la spec de referencia |
|------|-----------------------------------|
| Quién puede registrar la devolución además del profesor | RF-06, EC-05 |
| Qué pasa si el portátil se averió durante el préstamo | EC-06 |
| Cuándo es tardía una devolución | RF-04 |
| Qué pasa si no se indica el cargador | EC-03, EC-04 |
| Qué se responde a un préstamo ya devuelto | EC-02 |
| Préstamo que no existe | EC-01 |
| Tiempo de respuesta | RNF-01 |
| Penalizaciones | Fuera de alcance |

### Conceptos aprendidos

- Empezar por un **borrador propio** obliga a pensar el problema antes de que el agente lo resuelva por ti.
- El agente es muy útil para **estructurar** y para **detectar huecos**, si se le prohíbe inventar.
- Las dudas se resuelven con **quien decide** (aquí, la coordinación TIC), no con el agente ni a ojo.
- Lo que ninguno de los dos vio también existe: leer las respuestas de quien decide descubre *edge cases* nuevos.
- Una spec pasa por estados (borrador → en revisión → aprobada) y cada paso queda en el historial.

### Errores frecuentes

- Escribir el borrador después de usar el agente (o con su ayuda): se ve en el historial.
- Aceptar la spec del agente sin revisarla, con decisiones inventadas sin marcar (por ejemplo, un margen de 15 minutos para el retraso).
- Leer `respuestas-coordinacion.md` antes de la fase 3 y escribir una spec sin marcadores en la fase 2: el proceso de descubrir las dudas desaparece.
- Poner las penalizaciones como requisito, o la fecha de devolución en el cuerpo de la petición.
- Borrar el préstamo al devolverlo, en contra de la constitución.
- Dejar en los requisitos detalles de implementación que propuso el agente (tablas, transacciones, `Date.now()`).
- Aprobar la spec sin pasar la lista de comprobación, o sin actualizar el índice en cada fase.

### Otras soluciones válidas

- Otra organización de los requisitos (por ejemplo, el profesor y la coordinación TIC en requisitos separados) y otra redacción, siempre que sigan EARS y sean atómicos.
- Más o menos *edge cases* que la referencia, siempre que estén todas las respuestas de la coordinación TIC.
- Otros escenarios de Gherkin, con o sin antecedentes y con o sin esquemas.
- Que la spec de la fase 2 tenga otros marcadores distintos de los de la referencia: depende del agente y del borrador. Se valora que estén las dudas reales y que ninguna decisión se haya inventado sin marcar.
- Dejar la spec «En revisión» en la fase 4 si el alumno encuentra algo que no se cumple y lo explica.
