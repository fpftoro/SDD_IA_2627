# E01 · El drift que nadie vio

**Tipo:** autocorrección

La feature A del préstamo de portátiles está implementada y todos sus tests pasan. Pero después de fusionarla, varias personas han hecho «arreglos rápidos». Comprueba si el código sigue cumpliendo la spec: matriz de trazabilidad, hallazgos con evidencia y pruebas de que los tests pueden fallar.

**Criterios:** OA3 a

## El caso

El proyecto es la API del préstamo de portátiles del centro (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)). La feature A, «Consultar los portátiles», tiene su spec, su plan y sus tasks en `docs/specs/A-consultar-portatiles/`, y la constitución está en `constitution.md`.

`npm test` está en verde. El fichero [`historial.txt`](./historial.txt) tiene el historial del repositorio original: fíjate en lo que pasó **después** de la fusión.

## Entorno de trabajo

Abre la carpeta en el **Dev Container** (VS Code: «Reopen in Container»). No necesitas el agente: el Dev Container sirve para ejecutar los tests y romper el código a propósito. Escribe todas las respuestas en el `README.md`.

## Requisitos

1. **Búsqueda de identificadores.** Ejecuta la búsqueda de identificadores sin test del tema 2 (apartado 2.2.5) para la feature A y pega la salida en el README. Busca también al revés: identificadores que aparecen en los tests y **no** están en la spec.
2. **Matriz de trazabilidad.** Una fila por **cada** identificador de la spec (RF, RNF, AC y EC): el test o los tests que lo comprueban (fichero y nombre) y si comprueban **de verdad** lo que dice el identificador. Para decidirlo, abre cada test y compara su aserción con la spec.
3. **Arquitectura.** Comprueba con `grep` si algún controlador importa un repositorio, pega la orden y su salida, y di qué principio de la constitución afecta.
4. **Hallazgos.** Al menos **seis**. Para cada uno: dónde está (fichero y línea), qué pasa, qué identificador o principio afecta, qué forma de *drift* es (tema 1, apartado 1.2.2, o *drift* de los tests) y **dónde se corregiría** (spec, plan, código o test). No hace falta que lo corrijas.
5. **¿Pueden fallar?** Rompe el código a propósito **dos** veces: una con un cambio que un test **detecta** y otra con un cambio que debería detectar un test y **no** detecta. Para cada uno, el fichero, el cambio, el test que esperabas que fallara y el resultado de `npm test`. Deshaz cada cambio después (`git checkout -- <fichero>`).
6. **El historial.** Explica qué señales de *drift* ves en `historial.txt` (tema 1, apartado 1.2.5).

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| Código, tests y documentos de partida | Sin cambios: es el material que revisas |
| `README.md` | Secciones «Búsqueda de identificadores», «Matriz de trazabilidad», «Arquitectura», «Hallazgos», «¿Pueden fallar?» e «Historial», con las tablas de la plantilla |

## Comprueba tu solución

- La matriz tiene doce filas: tres RF, un RNF, tres AC y cinco EC.
- Cada fila de la matriz dice qué compara la aserción, no solo si el test existe.
- Has comparado los mensajes de error de los tests con los de la spec, palabra por palabra.
- Has comparado el **orden** que esperan los tests con el que pide la spec.
- Un test con un identificador que no está en la spec también es un hallazgo.
- Has leído el test de rendimiento entero, no solo su nombre.
- En «¿Pueden fallar?», el segundo cambio deja `npm test` en verde.
- Cada hallazgo dice dónde se corregiría, y ninguno propone cambiar la spec solo porque el código ya está hecho.

## Al terminar

Haz un commit con el README. Cierra el Dev Container; si no lo vas a usar más, borra su contenedor.
