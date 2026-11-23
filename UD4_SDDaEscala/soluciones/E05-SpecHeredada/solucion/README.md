# Spec de un módulo heredado

## Qué hace el módulo

`generarAvisos(prestamos, hoy)` recibe la lista de préstamos y la fecha de hoy (`AAAA-MM-DD`) y devuelve un texto con un aviso por línea de los préstamos no devueltos que llevan 7 o más días fuera. Cada aviso dice el portátil, los días y el profesor, y añade «(sin cargador)» si el cargador era falso. Si no hay avisos devuelve «Sin avisos». Los ordena por el nombre del profesor.

## Rarezas

| # | Qué hace | Entrada | Devuelve | Test | Decisión |
|---|----------|---------|----------|------|----------|
| 1 | Avisa a partir de 7 días, no a partir de 8 | Salida 2027-03-03, hoy 2027-03-10 (y 2027-03-04) | `El portátil 1 lleva 7 días con ana` (y `Sin avisos` con 6) | CAR-01 | **Comportamiento**: se reclama «a partir de una semana» |
| 2 | Ordena por el nombre del profesor, con las mayúsculas delante | `ana`, `Zoe`, `Luis`, con la misma fecha | Luis, Zoe, ana | CAR-09 | **Fallo (FC-01)**: producto quiere los más antiguos primero |
| 3 | No ordena por antigüedad | `luis` desde enero y `ana` desde marzo | Primero ana (9 días), luego luis (68) | CAR-10 | **Fallo (FC-01)** |
| 4 | Los avisos de un mismo profesor salen en orden inverso al de entrada | Tres préstamos de `ana` (ids 1, 2, 3) | Portátil 3, 2, 1 | CAR-11 | **Fallo (FC-01)**: el comparador nunca devuelve 0 |
| 5 | Sin profesor escribe «undefined» | Préstamo sin `profesor` | `…con undefined` | CAR-12 | **Fallo (FC-02)**: «con un profesor desconocido» |
| 6 | Una fecha de salida inválida se omite sin avisar | `fechaSalida: 'ayer'` | `Sin avisos` | CAR-13 | **Fallo (FC-03)**: debe fallar con un error |
| 7 | Un «hoy» inválido da «Sin avisos» | `hoy = 'hoy'` | `Sin avisos` | CAR-14 | **Fallo (FC-04)**: debe fallar |
| 8 | No avisa de una fecha de salida futura | Salida 2027-04-01 | `Sin avisos` | CAR-05 | **Comportamiento**: no es un aviso |
| 9 | Avisa de cualquier estado que no sea `devuelto` | Estado `perdido` | Avisa | CAR-06 | **Comportamiento**: querían saberlo |
| 10 | `cargador`: `false` y `0` dicen «sin cargador»; `undefined` y `null`, no | `cargador: 0` | `(sin cargador)` | CAR-08 | **Comportamiento** (irrelevante): el sistema siempre guarda verdadero o falso |
| 11 | Sin avisos devuelve el texto «Sin avisos» | `[]` | `Sin avisos` | CAR-03 | **Comportamiento**: confirma que el script ha funcionado |

## Parte opcional

Un agente suele encontrar rápido el umbral, el orden y «undefined». Se le escapan las rarezas que solo se ven ejecutando: el orden inverso de un mismo profesor (el comparador nunca devuelve 0) y que `cargador: 0` avisa mientras `null` no. Y puede escribir de forma convincente un valor esperado que el módulo no devuelve. Por eso los valores salen de ejecutar.

## Commits

```text
$ git log --oneline
b7e3a21 Spec de la feature G: comportamiento actual (implementada)
5d90c4f Tests de caracterización de los avisos
a1f0c33 Proyecto de partida
```

(Hashes de ejemplo.)
