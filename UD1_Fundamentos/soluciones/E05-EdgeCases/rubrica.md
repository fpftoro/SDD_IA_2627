# Rúbrica · E05 Más allá del camino feliz

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** la spec `docs/specs/B-reservar-carro/spec.md` y el `README.md` del alumno. El [`README.md`](./README.md) de este ejercicio recoge los errores frecuentes y las otras soluciones válidas.

---

### C1 · Edge cases con respuesta exacta

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 4 |
| Dónde mirar | Spec, sección «Edge cases y comportamiento ante errores»; `README.md`, sección «Edge cases por tipo» |

Un *edge case* es **válido** si tiene identificador, una condición concreta y una respuesta exacta (código HTTP y mensaje, o qué pasa con la reserva), o un marcador `[NECESITA ACLARACIÓN]` en la respuesta.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 4 | 4 | Ocho o más *edge cases* válidos que cubren al menos seis tipos de la tabla, entre ellos el carro ya reservado y la concurrencia, y la tabla del README coincide con la spec |
| 3 | 3 | Ocho o más válidos de cinco tipos, o seis tipos con algún fallo en la tabla del README |
| 2 | 2 | Cinco a siete válidos, o más *edge cases* pero alguno con respuesta vaga («muestra un error») |
| 1 | 1 | Tres o cuatro válidos, o casi todos con respuestas vagas |
| 0 | 0 | Falta la sección o tiene menos de tres *edge cases* válidos |

### C2 · Dudas marcadas

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 2 |
| Dónde mirar | Marcadores `[NECESITA ACLARACIÓN]` de la spec; `README.md`, sección «Dudas marcadas» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Al menos tres marcadores, cada uno en el *edge case* o requisito al que afecta, con una pregunta concreta (y alternativas cuando las hay) sobre una decisión del centro, y la tabla del README dice a quién se haría cada pregunta |
| 1 | 1 | Uno o dos marcadores bien hechos, o tres con alguna pregunta vaga o técnica que podía resolver el alumno |
| 0 | 0 | No hay marcadores, o las decisiones del centro (calendario, antelación) se han inventado sin marcarlas |

### C3 · Criterios de aceptación nuevos

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 1 |
| Dónde mirar | Spec, sección «Criterios de aceptación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Al menos dos criterios nuevos con *Dado…, cuando…, entonces…*, binarios, que comprueban *edge cases* ya decididos, y los criterios originales siguen sin cambios |
| 0 | 0 | Menos de dos criterios nuevos, sin la estructura, o que comprueban un *edge case* con marcador pendiente |

### C4 · Fuera de alcance

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 2 |
| Dónde mirar | Spec, sección «Fuera de alcance» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Cuatro o más exclusiones concretas y plausibles para esta feature (algo que el agente podría añadir por su cuenta), ninguna contradice un requisito, y las temporales dicen dónde se tratarán (por ejemplo, la cancelación en otra feature) |
| 1 | 1 | Dos o tres exclusiones válidas, o cuatro pero alguna contradice un requisito o es genérica («cosas que no hacen falta») |
| 0 | 0 | Falta la sección o tiene menos de dos exclusiones válidas |

### C5 · Estado de la spec

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 1 |
| Dónde mirar | Spec, tabla «Metadatos»; `README.md`, sección «Estado de la spec» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Versión 0.2, estado distinto de `Aprobada` (o, si no quedan marcadores, `En revisión`) y una explicación que relaciona el estado con los marcadores pendientes y dice qué falta para aprobarla |
| 0 | 0 | La spec está `Aprobada` con marcadores, falta la explicación o no se ha cambiado la versión |
