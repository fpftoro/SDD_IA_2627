# E01-DriftSembrado

## El drift que nadie vio

### Descripción

Solución del **Ejercicio 1** (autocorrección). El alumno valida la feature A del préstamo de portátiles frente a su spec: busca los identificadores sin test y los que sobran, construye la matriz de trazabilidad leyendo cada aserción, comprueba la arquitectura, documenta los hallazgos con su forma de *drift* y dónde se corregirían, rompe el código a propósito y lee las señales del historial.

- Enunciado y material de partida: [`practicas/ejercicios/E01-DriftSembrado`](../../practicas/ejercicios/E01-DriftSembrado/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 1 | El drift que nadie vio | Matriz de trazabilidad, *spec drift* y tests que pueden fallar (OA3 a) |

### Estructura

```text
E01-DriftSembrado/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    └── README.md     ← respuesta modelo (el material de partida no cambia)
```

### Problemas sembrados

Ocho, todos con `npm test` en verde. El enunciado pide al menos seis.

| # | Dónde | Qué pasa | Forma de *drift* | Se corrige en |
|---|-------|----------|------------------|---------------|
| 1 | `src/servicios/servicio-portatiles.js:19-22` y los tests de A-RF-01, A-AC-01 y A-AC-02 | Ordena por carro y después por código; los tests esperan ese orden. La spec pide por código | Cambio que no llega a la spec (commit `b25f0d3`, con un `TODO` que lo confirma) | Código y tests, o spec si la coordinación decide otro orden |
| 2 | `src/servicios/servicio-portatiles.js:8` y test `A-EC-06` | Acepta `Disponible`; la spec (EC-01) pide el estado escrito exactamente. `A-EC-06` no existe en la spec | Cambio que no llega a la spec (commit `e7c41a9`) y *drift* de los tests | Código y test, o spec si se decide aceptar mayúsculas |
| 3 | `src/controladores/controlador-portatiles.js:36` y test `A-EC-02` | Mensaje `Portátil no encontrado`; la spec pide `El portátil no existe`. El test comprueba el del código | Interpretación y *drift* de los tests | Código y test |
| 4 | `tests/` | `A-EC-03` no tiene ningún test (se borraron con el commit `91aa6e2`) | *Drift* de los tests | Tests |
| 5 | `src/controladores/controlador-portatiles.js:3, 26-37` | El controlador importa el repositorio y valida el identificador: se salta el servicio | Arquitectura | Código (y plan, D-01 y D-02 lo decían) |
| 6 | `src/controladores/controlador-portatiles.js:29` | `Number.isInteger(Number(id))` acepta `01` y `1e0`; el servicio original los rechazaba. La spec no aclara si `01` es válido | Interpretación; además, **spec ambigua** | Spec (aclarar) y después código, con test |
| 7 | `tests/api-portatiles.test.js:76-90` | `A-RNF-01` dice 500 portátiles y mide con 50 | *Drift* de los tests | Test |
| 8 | `tests/api-portatiles.test.js:100` | `A-AC-03` solo comprueba `codigo`; la spec pide el portátil completo (carro A, averiado) | *Drift* de los tests (aserción débil) | Test |

### Errores frecuentes

- Dar por buena la matriz porque cada identificador «tiene test», sin leer las aserciones.
- No ver el orden: los tests esperan `P-01, P-03, P-05…` y parecen correctos si no se compara con la spec.
- Proponer cambiar la spec para que diga «ordenados por carro» porque el código ya lo hace. Solo es válido si se presenta como una **decisión** de la coordinación (un cambio de spec con su flujo), no como forma de que todo cuadre.
- Contar `A-EC-06` como un test bueno «de más». Es un comportamiento que la spec no decide y que contradice EC-01.
- En «¿Pueden fallar?», romper algo que hace fallar todos los tests (un error de sintaxis): no demuestra nada sobre un test concreto.

### Otras soluciones válidas

- Para el hallazgo 1, decir que se corrige en la spec es válido si se explica que hace falta la decisión de la coordinación y una versión nueva de la spec; decir «en el código» es la respuesta por defecto.
- El hallazgo 6 puede no aparecer: es el más difícil. Si aparece clasificado solo como error de implementación, también vale.
- Cualquier mutación que deje `npm test` en verde vale para el segundo cambio, por ejemplo cambiar el carro o el estado del portátil 3 solo en la respuesta de `GET /api/portatiles/:id`, o devolver un campo de más.
- Las formas de *drift* pueden coincidir en varias filas: la del arreglo del orden es a la vez un cambio que no llega a la spec y un *drift* de los tests (los tests se ajustaron al código).
