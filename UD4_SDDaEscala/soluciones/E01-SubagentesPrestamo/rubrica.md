# Rúbrica · E01 Subagentes del préstamo

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` y los ficheros de `.opencode/agents/` del alumno. La clave y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Situaciones

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Situaciones» |

Una situación cuenta si la decisión coincide con la clave (o una alternativa válida) y la razón es concreta.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Siete u ocho correctas y justificadas, incluidas las que no compensan (2, 4 y 7), con la 6 como «depende» y de qué |
| 2 | 2 | Cinco o seis correctas, o todas pero con razones genéricas |
| 1 | 1 | Tres o cuatro correctas |
| 0 | 0 | Falta la sección o menos de tres correctas |

### C2 · Los tres agentes

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 3 |
| Dónde mirar | `.opencode/agents/arquitecto.md`, `implementador.md` y `artesano.md` |

Requisito previo: los tres ficheros existen con estos nombres y cabecera; si no, el nivel es 0.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Los tres cumplen el enunciado: el arquitecto edita solo `plan.md` y `tasks.md` y encarga solo a `explore`; el implementador edita solo `src/` y tiene `subagent` en `deny`; el artesano no edita, no encarga y su terminal es la indicada; sin web; con instrucciones coherentes con el rol |
| 2 | 2 | Un fallo de permisos menor (un patrón demasiado amplio, o `webfetch` sin cerrar) o instrucciones que contradicen el rol |
| 1 | 1 | Un agente con un agujero grave (`subagent` abierto, o puede editar tests) o dos fallos menores |
| 0 | 0 | Faltan agentes o varios tienen permisos abiertos |

### C3 · Roles y modelo

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Agentes y roles» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Cada fila coincide con los ficheros y el modelo se razona con capacidad, coste o privacidad, sin nombres de modelos concretos |
| 0 | 0 | La tabla no coincide con los ficheros, o el modelo no se razona |

### C4 · Comprobación

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Comprobación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Las tres salidas de `permisos.mjs` coinciden con los ficheros y las preguntas (a), (b) y (c) están bien razonadas, incluida la regla «gana la última que coincide» y el riesgo de `subagent` abierto |
| 1 | 1 | Las salidas están, pero una respuesta es incorrecta o superficial |
| 0 | 0 | Faltan las salidas o las respuestas |

### C5 · Topología

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Topología» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Diagrama válido con la persona, los tres agentes y *explore*; nombra la topología y dice quién coordina |
| 0 | 0 | Falta el diagrama, no es válido o no dice quién coordina |
