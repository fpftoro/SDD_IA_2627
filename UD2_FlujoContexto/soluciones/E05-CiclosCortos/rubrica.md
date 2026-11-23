# Rúbrica · E05 Implementar en ciclos cortos

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran **leyendo** el repositorio en `main`, el `README.md`, las sesiones exportadas y el historial (`<username>.datos.json`). La implementación de referencia, el hueco sembrado y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Ciclos cortos

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 3 |
| Dónde mirar | Historial de la rama; `sesiones/`; `README.md`, «Sesión con el agente» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Un commit por grupo de tasks, con la convención del tema 4 y las tasks marcadas; una sesión por ciclo; en las sesiones se ve el rojo antes del verde; la rama se subió tras cada ciclo |
| 2 | 2 | Falla uno de esos puntos (por ejemplo, dos grupos en un commit o una sesión para dos ciclos) |
| 1 | 1 | Fallan dos o más, o no hay rastro del rojo en ningún ciclo |
| 0 | 0 | Toda la feature en uno o dos commits, o sin sesiones |

### C2 · Punto de control 4

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 2 |
| Dónde mirar | `README.md`, «Puntos de control» y «Decisiones»; `git diff` de los tests de A y del workflow |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | En cada ciclo, los ficheros, el rojo y el verde y lo que se encontró, con al menos una corrección o un rechazo concreto; ningún test de A ni el workflow han cambiado; la CI estuvo en verde en cada ciclo |
| 1 | 1 | La tabla está, pero genérica («todo bien» en los tres ciclos), o la CI estuvo en rojo en algún ciclo sin explicarlo |
| 0 | 0 | Falta la sección, o se han modificado tests de A o el workflow |

### C3 · Hueco de la spec

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 2 |
| Dónde mirar | `README.md`, «Hueco de la spec»; spec, plan y tasks de B; el commit del ciclo en el que apareció |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Detecta el hueco del orden (u otro hueco real); explica por qué es de la spec; decide con motivo; spec 1.1 con la decisión, plan y tasks coherentes y un test que la comprueba, todo en el mismo commit que el código |
| 1 | 1 | Detecta el hueco pero lo resuelve a medias: sin subir la versión, en un commit aparte, sin test o solo en el código |
| 0 | 0 | No detecta ningún hueco, o lo decide el agente sin que conste |

### C4 · Feature terminada y fusionada

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 3 |
| Dónde mirar | `src/`, `tests/`, `docs/specs/`, historial de `main`; `README.md`, «Comprobación final» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | El código cumple la spec (capas, mensajes y códigos exactos); cada identificador de la spec aparece en el nombre de algún test; spec `Implementada`, tasks marcadas e índice coherente; comprobación final con su `git diff --stat`; fusión `--no-ff` con el mensaje de la convención y CI de `main` en verde |
| 2 | 2 | Falla uno de esos puntos |
| 1 | 1 | Fallan dos o tres, o la feature no está fusionada |
| 0 | 0 | La feature está a medias o el código no cumple la spec en varios *edge cases* |
