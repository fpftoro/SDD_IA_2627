# E02-SeisDiagnosticos

## Seis diagnósticos

### Descripción

Solución del **Ejercicio 2** (autocorrección). El alumno diagnostica doce fallos del préstamo de portátiles con las preguntas del tema 1, dice dónde se corrige cada uno y su primer paso, desarrolla dos correcciones completas y explica por qué no se cambia la spec para que coincida con el código.

- Enunciado y material de partida: [`practicas/ejercicios/E02-SeisDiagnosticos`](../../practicas/ejercicios/E02-SeisDiagnosticos/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 2 | Seis diagnósticos | Depurar desde la spec: seis diagnósticos y dónde se corrige cada uno (OA3 d) |

### Estructura

```text
E02-SeisDiagnosticos/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    └── README.md     ← respuesta modelo
```

### Clave

| Caso | Diagnóstico |
|------|-------------|
| 1 | No hay fallo (la spec decide exactamente eso); si se quiere aceptar mayúsculas, petición nueva |
| 2 | Error de implementación |
| 3 | Error del plan |
| 4 | Hueco en la spec |
| 5 | Error de implementación (y el test no comprueba el mensaje) |
| 6 | Petición nueva |
| 7 | Spec ambigua |
| 8 | Test que no comprueba lo que dice |
| 9 | Test que no comprueba lo que dice |
| 10 | Error del plan |
| 11 | Hueco en la spec |
| 12 | Spec ambigua |

Dos de cada uno, más un caso sin fallo.

### Errores frecuentes

- Diagnosticar el caso 1 como error de implementación: la spec dice «escrito exactamente así».
- En los casos 3 y 10, decir «error de implementación» porque el código falla: el código hace lo que dice el plan; lo que está mal es la decisión del plan.
- En los casos 8 y 9, proponer cambiar el código: el código está bien; se corrige el test y se comprueba que puede fallar.
- En el caso 4, decidir en la respuesta qué pasa con el préstamo («se cierra solo») como si fuera evidente: es una decisión de producto que toma la coordinación TIC, y el primer paso es preguntarla.
- Primeros pasos que empiezan por el código en casos cuyo origen es la spec o el plan.

### Otras soluciones válidas

- Caso 5: «error de implementación» es la respuesta del diagrama; también vale si se añade que el test es débil, y la corrección empieza por endurecer el test (que entonces falla) y después el código.
- Caso 12: también vale «error de implementación» si se argumenta que «caracteres» nunca significa bytes. La respuesta modelo lo trata como spec ambigua (tema 1, apartado 1.5.3).
- Caso 7: «hueco en la spec» se acepta si se razona que la spec no decide si la franja importa en EC-02; lo importante es que la corrección empieza en la spec.
- Caso 1: «petición nueva» es válido si se explica que la spec ya lo decide y que aceptar mayúsculas sería un cambio de la spec con su flujo.
