# E05-SpecHeredada

## Spec de un módulo heredado

### Descripción

Solución del **Ejercicio 5** (autocorrección, con parte opcional con agente). El alumno descubre qué hace de verdad un módulo heredado (`src/avisos.js`) con tests de caracterización, decide con producto qué rarezas son comportamiento y cuáles son fallos, y escribe la spec del comportamiento actual.

- Enunciado y material de partida: [`practicas/ejercicios/E05-SpecHeredada`](../../practicas/ejercicios/E05-SpecHeredada/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 5 | Spec de un módulo heredado | Tests de caracterización, fallo o comportamiento y *spec-on-touch* (OA4 d) |

### Estructura

```text
E05-SpecHeredada/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md     ← respuesta modelo (rarezas y decisiones)
    ├── tests/avisos.caracterizacion.test.js   ← 14 tests CAR-01 a CAR-14
    └── docs/specs/G-avisos-devolucion/spec.md ← spec 1.0, Implementada
```

### Clave

- **Se conserva:** el umbral de 7 días, «Sin avisos», no avisar de fechas futuras, avisar de `perdido`, el texto de una línea por aviso y lo que pase con un `cargador` raro.
- **Se corregirá (E06):** el orden (los más antiguos primero, sin distinguir mayúsculas, y estable para un mismo profesor), «undefined» y las fechas inválidas (error).
- **La trampa:** el orden inverso de los avisos de un mismo profesor solo se ve ejecutándolo con varios préstamos del mismo profesor; el comparador nunca devuelve 0.

Los 14 tests de la solución pasan contra el módulo sin tocar (Vitest 5, `node:24-alpine`), los bloques de Gherkin de la spec validan con `@cucumber/gherkin` y `npm run estado` da «coherente».

### Errores frecuentes

- **Escribir lo que el módulo «debería» hacer.** Un test de caracterización fija lo que hace hoy, aunque sea un fallo.
- **Corregir `src/avisos.js` por el camino.** No se toca hasta E06.
- **Valores esperados inventados** (o dados por el agente) sin ejecutar.
- **Un test por función** en lugar de un test por rareza.
- **Arreglar los fallos en la spec 1.0**: la 1.0 describe el presente; el cambio es la 1.1.
- **Olvidar decir expresamente lo que se conserva** (el 7, «Sin avisos»): la siguiente persona lo «arreglaría».
- **Asertos débiles** (`toContain`) donde hay que fijar el texto exacto.
- **Marcar como fallo algo que producto quiere conservar.**

### Otras soluciones válidas

- Otro orden o número de tests, siempre que cubran las rarezas.
- Considerar el `cargador: 0` un fallo, si se razona y se anota como pregunta a producto.
- Describir el umbral como «más de 6 días» (equivalente).
- Una spec sin el contexto histórico o con los fallos en una tabla distinta, si están separados de los requisitos.
- Los tests con tablas (`test.each`), manteniendo un identificador por caso.
