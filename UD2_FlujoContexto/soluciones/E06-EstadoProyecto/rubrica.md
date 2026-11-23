# Rúbrica · E06 El estado del proyecto

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran **leyendo** el `README.md`, `docs/specs/` y el historial (`<username>.datos.json`). Las incoherencias sembradas, la respuesta modelo y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Diagnóstico

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 3 |
| Dónde mirar | `README.md`, secciones «Antes» y «Diagnóstico» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Las seis features con el estado correcto y su motivo, incluidas las dos que el script no ve bien (C implementada y la segunda spec de E) y D, donde la spec es la que está mal |
| 2 | 2 | Cinco features correctas, o seis sin el motivo de alguna |
| 1 | 1 | Tres o cuatro features correctas (normalmente, solo lo que dice el script) |
| 0 | 0 | Falta la sección o menos de tres features correctas |

### C2 · Ramas

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Ramas» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | La rama de B se deja (feature en curso) y la de C se borra (fusionada), con el comando y el motivo |
| 0 | 0 | Propone fusionar la rama de B, o no dice qué hacer con alguna |

### C3 · Corrección del estado

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 3 |
| Dónde mirar | `docs/specs/` (índice y campo `Estado` de cada spec); `README.md`, «Después»; el commit de la parte 2 |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Índice y specs coherentes y con el estado correcto, emojis del tema 4, una sola `spec.md` en cada carpeta, `npm run estado` sin errores, en un commit con el mensaje pedido |
| 2 | 2 | Una feature con el estado equivocado (aunque el script pase), o el commit mezclado con la parte 3 |
| 1 | 1 | Dos o tres features con el estado equivocado, o sigue habiendo dos specs en una carpeta |
| 0 | 0 | El índice o las specs siguen incoherentes |

### C4 · Replanificación

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 3 |
| Dónde mirar | Carpetas de D y E; `README.md`, «Referencias» y «Commits»; el commit de la parte 3 (en `datos.json`, los ficheros renombrados) |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Carpetas `D-anotar-incidencia/` y `E-registrar-devolucion/` renombradas con `git mv` (el commit muestra el renombrado); índice reordenado; las cuatro referencias actualizadas y documentadas; `npm run estado` sin errores; commit con el mensaje de la convención |
| 2 | 2 | Falta una referencia, o el README no documenta los cambios |
| 1 | 1 | Faltan dos o más referencias, o las carpetas se renombraron sin `git mv` |
| 0 | 0 | No se hizo el cambio de orden |
