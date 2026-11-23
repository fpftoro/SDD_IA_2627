# Rúbrica · E06 Spec con errores sembrados

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` del alumno y su spec corregida `docs/specs/E-anotar-incidencia/spec.md`. La lista de problemas sembrados y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Problemas localizados

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Problemas» |

Un problema cuenta si es real (está en la lista de problemas sembrados o es otro problema justificado), indica dónde está y lo nombra con un antipatrón, una cualidad o una regla del tema 5.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Diez o más problemas reales, entre ellos el de la constitución (RF-04) y al menos uno de lo que falta (fuera de alcance o *edge cases*) |
| 2 | 2 | Ocho o nueve problemas reales, o diez sin el de la constitución |
| 1 | 1 | Cinco a siete problemas reales |
| 0 | 0 | Falta la sección o tiene menos de cinco problemas reales |

### C2 · Consecuencias para el agente

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Problemas», columna «Qué haría el agente» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | En casi todas las filas (todas menos una o dos), la consecuencia es concreta: qué decidiría, inventaría, copiaría u olvidaría el agente |
| 1 | 1 | La mitad de las filas tienen una consecuencia concreta; el resto son genéricas («lo haría mal», «daría problemas») |
| 0 | 0 | La columna está vacía o es genérica en casi todas las filas |

### C3 · Spec corregida: requisitos y criterios

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 3 |
| Dónde mirar | Spec corregida, secciones «Requisitos funcionales», «Requisitos no funcionales» y «Criterios de aceptación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Requisitos atómicos y con identificador, que usan los cuatro tipos y la regla del estado decididos por la coordinación TIC; ningún nombre de función, código ni dato del alumnado; no funcionales medibles; y al menos dos criterios de aceptación binarios con *Dado…, cuando…, entonces…* y un resultado observable |
| 2 | 2 | Cumple casi todo, pero falla uno de estos puntos: un requisito compuesto, un no funcional sin medida, un criterio sin resultado observable o la regla del estado |
| 1 | 1 | Fallan dos o tres de esos puntos, o sigue habiendo código o el dato del alumnado |
| 0 | 0 | No existe la spec corregida o reproduce casi todos los problemas del original |

### C4 · Spec corregida: edge cases, alcance y estado

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 2 |
| Dónde mirar | Spec corregida, secciones «Metadatos», «Edge cases y comportamiento ante errores» y «Fuera de alcance»; `README.md`, sección «Estado de la spec» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Cinco o más *edge cases* con respuesta exacta en formato `{ error }`, la incidencia repetida marcada con `[NECESITA ACLARACIÓN]`, tres o más exclusiones en el fuera de alcance (entre ellas el correo), sin sección de pasos de implementación, y un estado distinto de `Aprobada` si hay marcadores, explicado en el README |
| 1 | 1 | Falla uno o dos de esos puntos |
| 0 | 0 | Faltan los *edge cases* o el fuera de alcance, o la spec está `Aprobada` con marcadores |
