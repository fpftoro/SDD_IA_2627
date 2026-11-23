# E07-EarsGherkin

## EARS y Gherkin

### Descripción

Solución del **Ejercicio 7** (autocorrección). Para la feature «Registrar el préstamo de un portátil», el alumno reescribe once requisitos vagos en EARS indicando su patrón, convierte cinco criterios de aceptación en escenarios de Gherkin en español (antecedentes con tabla de datos y un esquema del escenario), transforma dos escenarios imperativos en declarativos y comprueba la sintaxis con `npm run validar`.

- Enunciado y material de partida: [`practicas/ejercicios/E07-EarsGherkin`](../../practicas/ejercicios/E07-EarsGherkin/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 7 | EARS y Gherkin | Notaciones estructuradas: los cinco patrones de EARS y escenarios declarativos en Gherkin (OA1 f) |

### Estructura

```text
E07-EarsGherkin/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── .devcontainer/devcontainer.json
    ├── README.md           ← respuesta modelo
    ├── material.md         ← material de partida, sin cambios
    ├── package.json        ← @cucumber/gherkin 42.0.1 y @cucumber/messages 34.2.1
    ├── herramientas/validar-gherkin.mjs
    └── docs/specs/C-registrar-prestamo/criterios.feature
```

### Ejecutar

Dentro del Dev Container del ejercicio (instala las dependencias al crearse):

```bash
npm run validar
```

### Salida esperada

```text
✅ 2 documentos de Gherkin sin errores
```

El script se ha probado en Docker con la solución (dos documentos válidos), con la plantilla vacía (un documento: el bloque del README) y con un `.feature` con una tabla de ejemplos mal formada (lo rechaza indicando la línea).

### Clave de los patrones

| Patrón | Requisitos |
|--------|------------|
| Ubicuo | V1, V4 |
| Por evento | V2, V3 |
| Por estado | V7, V8 |
| No deseado | V5, V6, V11 |
| Opcional | V9 |
| Combinado (estado + evento) | V10 |

### Conceptos aprendidos

- EARS obliga a escribir siempre **condición y respuesta**, y su palabra clave dice de qué tipo es cada requisito.
- *Si… entonces* es solo para lo que no debería pasar; un estado que dura (un préstamo retrasado) es *Mientras*.
- En los patrones combinados, primero el estado y después el evento.
- Gherkin describe **ejemplos concretos** que se convierten en tests: antecedentes con una tabla de datos, un escenario por criterio y esquemas para los casos que solo cambian de datos.
- Un escenario declarativo describe el comportamiento; uno imperativo describe la interfaz y se rompe con cualquier rediseño.
- Un validador comprueba la sintaxis, no la calidad: un escenario válido puede seguir siendo vago.

### Errores frecuentes

- **V8 con *Si… entonces***. Empieza por «si», pero no es un error: es un estado que dura mientras el préstamo sigue abierto.
- **V10 con el evento antes que el estado** («Cuando un profesor registre un préstamo, mientras…»), o solo con uno de los dos.
- **V11 copiando la vaguedad**: «Si falla la base de datos, entonces el sistema deberá funcionar bien». La plantilla no arregla una respuesta vaga.
- Respuestas sin código ni mensaje en V5 y V6 («deberá impedirlo»).
- Juntar V2 y V3 con dos respuestas en un mismo requisito («deberá guardarlo y cambiar el estado»). Es válido si queda una sola respuesta; si quedan dos, son dos requisitos.
- En Gherkin: olvidar `# language: es` (el script lo avisa), poner los portátiles de partida en cada escenario en lugar de en los antecedentes, o escribir AC-04 como cuatro escenarios casi iguales en lugar de un esquema.
- *Entonces* que no se pueden comprobar («todo va bien»), o varios *Cuando* en un mismo escenario.
- En la parte C, quitar los detalles de la interfaz pero olvidar el resultado que hay que comprobar (que no se crea el préstamo, qué error sale).

### Otras soluciones válidas

- Otra redacción de los requisitos, siempre que use el patrón correcto y una respuesta concreta.
- **V7 como ubicuo** («El sistema deberá mostrar en el listado, para cada portátil prestado, el profesor que lo tiene»), si la respuesta es concreta. La solución prefiere *Mientras* porque depende del estado del portátil.
- **V4 como por evento** («Cuando se registre un préstamo, el sistema deberá fijar su fecha límite…»).
- Separar V2 en más filas (guardar y responder), o juntar V2 y V3 si queda una sola respuesta.
- Otros textos para los pasos de Gherkin, sin tabla de datos en los antecedentes si cada escenario prepara su portátil (aunque el enunciado pide la tabla).
- Más filas en los `Ejemplos` de AC-04, o una columna con el error esperado.
- En la parte C, comprobar el resultado por la API (código y error) en lugar de por lo que ve el usuario, siempre que no haya detalles de la interfaz.
