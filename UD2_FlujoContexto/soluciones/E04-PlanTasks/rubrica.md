# Rúbrica · E04 Del plan a las tasks

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md). La entrega está en la rama `feature/B-reservar-carro` (`RAMA=feature/B-reservar-carro` al preparar la corrección).

Se valoran **leyendo** `tasks.md`, el `README.md` y el historial. Las tasks de referencia, los errores sembrados y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Tamaño, orden y verificabilidad

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 3 |
| Dónde mirar | `docs/specs/B-reservar-carro/tasks.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Plantilla del tema 3 y estado `Aprobadas`; grupos de dos tasks como máximo, con punto de control; cada task con ficheros (uno o dos, o la excepción justificada), dependencias y un criterio de terminado comprobable; las de tests antes de su implementación, terminadas en rojo; ninguna depende de una posterior |
| 2 | 2 | Falla uno de esos puntos |
| 1 | 1 | Fallan dos o tres, o hay una task de implementación sin tests antes |
| 0 | 0 | No hay tasks, o son dos o tres tasks enormes |

### C2 · Cobertura del plan

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 2 |
| Dónde mirar | `tasks.md`; `README.md`, secciones «Cobertura» y «Lista de comprobación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Todas las filas de la estrategia de pruebas tienen su task de tests (tabla completa y coherente con `tasks.md`); todos los ficheros del plan tienen task, incluido el montaje en `src/app.js`; ninguna task fuera del plan; la lista de comprobación coincide con lo que cumplen las tasks |
| 1 | 1 | Faltan una o dos filas o un fichero, o la tabla no coincide con las tasks |
| 0 | 0 | Falta la tabla o faltan más de dos filas |

### C3 · Errores en las tasks de D

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Errores» |

Un error cuenta si es real (está en la lista de errores sembrados o es otro error justificado), dice dónde está y lo nombra con un error típico o una línea de la lista del punto de control 3.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Ocho o más errores reales con su corrección, entre ellos los tests al final, la cobertura incompleta y la dependencia al revés |
| 2 | 2 | Seis o siete errores reales, u ocho sin alguno de esos tres |
| 1 | 1 | Tres a cinco errores reales |
| 0 | 0 | Falta la sección o tiene menos de tres errores reales |

### C4 · El orden y el historial

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Por qué importa el orden»; historial de la rama |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Tres problemas concretos que aparecerían en los puntos de control (por ejemplo, tests que nunca se ven en rojo, una task que no se puede empezar, un cambio que ningún test detecta); los dos commits en la rama, en orden, sin fusionar |
| 1 | 1 | Uno o dos problemas concretos, o falta un commit |
| 0 | 0 | Falta la sección o los problemas son genéricos («saldría mal») |
