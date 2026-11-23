# E03-TestsQueMienten

## Tests que mienten

### Descripción

Solución del **Ejercicio 3** (autocorrección). El alumno revisa los ocho tests de la API de la feature A del préstamo, escritos después del código: identifica las mentiras, las demuestra con un mutante que no detectan, corrige los tests, comprueba que ahora detectan el mutante y añade los que faltan según la estrategia de pruebas del plan.

- Enunciado y material de partida: [`practicas/ejercicios/E03-TestsQueMienten`](../../practicas/ejercicios/E03-TestsQueMienten/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 3 | Tests que mienten | Tests desde la spec, sus formas de mentir y el nivel de cada test (OA3 b) |

### Estructura

```text
E03-TestsQueMienten/
├── README.md                         ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md                     ← respuesta modelo
    └── tests/api-portatiles.test.js  ← tests corregidos (10, en verde)
```

### Mentiras sembradas

Siete de los ocho tests mienten; el de A-EC-01 comprueba el código HTTP pero no el mensaje. Todos los mutantes se han comprobado en Docker: el test original sigue en verde y el corregido falla.

| Test | Forma | Mutante comprobado |
|------|-------|--------------------|
| A-RF-01, A-AC-01 | El código como oráculo (`servicio.listarPortatiles()`) | Ordenar por código al revés |
| A-RF-02, A-AC-02 | Aserción que se cumple con la lista vacía (`every`) y no comprueba cuáles ni el orden | El filtro no devuelve nada |
| A-EC-01 | Aserción débil (`toBeDefined`) | Mensaje en inglés |
| A-EC-04 | El *mock* sustituye lo que se prueba (el servicio entero) | El filtro no filtra |
| A-EC-05 | Aserción incompleta (solo el 500) | Mensaje `Internal Server Error` |
| A-RNF-01 | Test desactivado (`test.skip`) | Cualquiera que haga lenta la lista |
| A-EC-02 | Aserción que no se ejecuta (sin `await`) | Responder 200 en lugar de 404. El test sale en verde; Vitest informa aparte de un «Unhandled Rejection» |
| A-EC-03 | Aserción condicional (`if`) | No validar el identificador: `abc` da 404 y el `if` se salta |

Faltan los tests de **A-RF-03 y A-AC-03** (consultar un portátil) y el de **A-EC-05 por identificador**; el plan los pone en integración.

### Errores frecuentes

- No ver la mentira del test sin `await` porque «sale en verde»: hay que leer el aviso del final de Vitest y, sobre todo, el código del test.
- Corregir el test de A-RF-01 comparando con `repositorioPortatiles.obtenerTodos()` ordenado: sigue siendo el código como oráculo.
- Mantener el `every` y añadir `toHaveLength(3)`: mejora, pero no comprueba el orden que pide AC-02.
- Quitar el *mock* de A-EC-04 sin poner otro dato: con los datos reales hay un portátil averiado y la lista no sale vacía. Hay que simular solo el repositorio con datos sin averiados.
- Mutantes que rompen todo (un error de sintaxis): no demuestran nada sobre un test concreto.

### Otras soluciones válidas

- En A-RF-01 basta comparar los códigos en orden y un elemento completo; también vale comparar el cuerpo entero con un array escrito a mano.
- En A-EC-04, cualquier dato del repositorio sin portátiles de ese estado (o pedir un estado que no tenga ninguno en los datos simulados).
- El test de A-RNF-01 puede usar 500 portátiles simulados en el repositorio, como el modelo, u otra forma de cargarlos, siempre que mida con 500.
- Cualquier mutante que incumpla la spec y que el test original no detecte vale, aunque no coincida con la tabla.
