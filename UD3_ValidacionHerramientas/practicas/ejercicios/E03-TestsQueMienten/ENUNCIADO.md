# E03 · Tests que mienten

**Tipo:** autocorrección

Los tests de la API de la feature A están en verde, pero varios **mienten**: pasarían aunque el código no cumpliera la spec. Encuéntralos, demuéstralo con un código roto a propósito y corrígelos.

**Criterios:** OA3 b

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A, «Consultar los portátiles», implementada. El **código es correcto**. Lo que está mal son los tests de [`tests/api-portatiles.test.js`](./tests/api-portatiles.test.js), que escribió un agente después del código. Los de `tests/servicio-portatiles.test.js` están bien: úsalos de ejemplo.

La spec está en `docs/specs/A-consultar-portatiles/spec.md` y su estrategia de pruebas, en el `plan.md` de la misma carpeta.

## Entorno de trabajo

Abre la carpeta en el **Dev Container**. No necesitas el agente: escribes y ejecutas los tests tú.

## Requisitos

1. **Las mentiras.** Para cada test de `tests/api-portatiles.test.js`, di si miente y, si miente, de qué forma (tema 2, apartado 2.5): el código como oráculo, datos o aserciones que no distinguen, aserción que no se ejecuta, aserción condicional, débil o incompleta, *mock* que sustituye lo que se prueba, test desactivado.
2. **Los mutantes.** Para cada test que miente, cambia el código **a propósito** de una forma que incumpla la spec y que ese test **no** detecte. Anota el fichero, el cambio y el resultado de `npm test` con el test original. Deshaz cada cambio después.
3. **Los tests corregidos.** Corrige `tests/api-portatiles.test.js`: cada test comprueba exactamente lo que dice su identificador, con los valores de la spec. Comprueba, con el mismo mutante, que **ahora sí falla**.
4. **Lo que falta.** Compara los tests de la API con la estrategia de pruebas del plan y con la spec. Añade los que falten, en el nivel que dice el plan. Escribe en el README qué has añadido y por qué ese nivel.
5. **Resultado.** Pega la salida final de `npm test`.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `src/`, `docs/` y `tests/servicio-portatiles.test.js` | Sin cambios |
| `tests/api-portatiles.test.js` | Los tests corregidos y los que faltaban, con la letra de la feature y el identificador en el nombre |
| `README.md` | Secciones «Mentiras», «Mutantes», «Tests que faltan» y «Resultado», con las tablas de la plantilla |

## Comprueba tu solución

- Ninguna aserción compara con lo que devuelve el código de la aplicación (`servicio`, `repositorio`).
- Los mensajes de error se comprueban con el texto exacto de la spec, con `toEqual`.
- Cada test que hace una petición la espera (`await`) antes de comprobar nada.
- Ninguna comprobación está dentro de un `if`.
- No queda ningún `skip`, `only` ni `todo`.
- Los *mocks* solo sustituyen lo que es difícil de provocar (un fallo del almacenamiento), no lo que se prueba.
- Con el código sin tocar, todo en verde; con cada mutante de tu tabla, el test corregido en rojo.
- La matriz de identificadores de la API cubre AC-01 a AC-03 y EC-01 a EC-05, además de RNF-01.

## Al terminar

Haz un commit con los tests y el README. Cierra el Dev Container; si no lo vas a usar más, borra su contenedor.
