# Rúbrica · E01 El recorrido de una feature

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` del alumno. La respuesta modelo, el material sembrado y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Mapa del recorrido

| Campo | Valor |
|-------|-------|
| OA | OA2 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Mapa del recorrido» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Las siete filas tienen el artefacto con su ruta (o «ninguno»), el agente adecuado, el punto de control con su pregunta y una persona como quien decide; la spec va en `main` y el plan, las tasks y el código, en `feature/C-registrar-prestamo` |
| 1 | 1 | Falla en una o dos filas: un artefacto o una pregunta equivocados, el agente decidiendo o una fase en la rama que no le toca |
| 0 | 0 | Falta la sección o fallan tres filas o más |

### C2 · Dónde se corrige

| Campo | Valor |
|-------|-------|
| OA | OA2 a |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Dónde se corrige» |

Una situación cuenta si el lugar donde nació coincide con la solución (o con una alternativa justificada de las «Otras soluciones válidas») y los pasos son coherentes con él.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Nueve o diez situaciones correctas; en S1 y S5 la spec sube de versión y se vuelve a aprobar; en S4 no hay commit con tests en rojo; y «Qué más revisas» nombra documentos concretos |
| 2 | 2 | Siete u ocho situaciones correctas, o nueve con S1 o S5 resueltas en el plan |
| 1 | 1 | Cuatro a seis situaciones correctas |
| 0 | 0 | Falta la sección o menos de cuatro situaciones correctas |

### C3 · Fallos del historial

| Campo | Valor |
|-------|-------|
| OA | OA2 a |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Fallos del historial» |

Un fallo cuenta si es real (está en la tabla de material sembrado o es otro fallo justificado), cita sus commits y nombra la regla del flujo que se salta.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Cinco o más fallos reales, entre ellos uno de orden (código antes del plan o tests después del código) y uno de ramas o fusiones; en todos, el problema que causa y cómo se debió hacer son concretos |
| 2 | 2 | Cinco fallos reales con alguna columna genérica, o cuatro fallos completos |
| 1 | 1 | Dos o tres fallos reales |
| 0 | 0 | Falta la sección o tiene menos de dos fallos reales |

### C4 · Replanificación

| Campo | Valor |
|-------|-------|
| OA | OA2 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Replanificación» y párrafo final |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Las seis notas con la pregunta y el fichero correctos (índice, constitución, `AGENTS.md`, comando); N5 no se programa y acaba en el índice; N6 no cambia nada, con su motivo; mensajes de commit con la convención; y el párrafo explica por qué el cambio va antes de la feature siguiente |
| 1 | 1 | Falla una o dos notas, o falta el párrafo |
| 0 | 0 | Falta la sección o fallan tres notas o más |
