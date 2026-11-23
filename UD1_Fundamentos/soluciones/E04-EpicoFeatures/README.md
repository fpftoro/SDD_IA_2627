# E04-EpicoFeatures

## Del épico a las features

### Descripción

Solución del **Ejercicio 4** (autocorrección). A partir del PRD del préstamo de portátiles y de una lista de dieciséis ideas mezcladas, el alumno separa épicos, features, historias, tasks y requisitos, propone las features del épico con su valor, sus dependencias y una historia de usuario, justifica su orden y escribe el índice `docs/specs/README.md`.

- Enunciado y material de partida: [`practicas/ejercicios/E04-EpicoFeatures`](../../practicas/ejercicios/E04-EpicoFeatures/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 4 | Del épico a las features | Jerarquía épico → feature → historia → task, criterios de una buena feature y orden (OA1 d) |

### Estructura

```text
E04-EpicoFeatures/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md           ← respuesta modelo
    ├── lista.md            ← material de partida, sin cambios
    └── docs/
        ├── prd.md          ← sin cambios
        └── specs/README.md ← índice de features
```

### Clave

| Nivel | Ideas |
|-------|-------|
| Épico | L1, L6, L16 |
| Feature | L2, L5, L8, L11, L13, L15 |
| Historia | L3, L10 |
| Task | L4, L7, L9, L14 |
| Requisito | L12 |

Features de la solución, en orden: A Consultar los portátiles, B Reservar un carro, C Registrar el préstamo, D Registrar la devolución, E Anotar una incidencia, F Cancelar una reserva. Los ejercicios E05, E06 y E09 usan estas carpetas (`B-reservar-carro/`, `E-anotar-incidencia/`, `D-registrar-devolucion/`).

### Conceptos aprendidos

- La spec se escribe en el nivel de la **feature**: el épico es demasiado grande y la task, demasiado pequeña.
- Las ideas técnicas (tablas, configuración, botones, tests) no son features: van al plan de la primera feature que las necesita.
- Las historias de usuario explican el porqué y van en el contexto de una spec; no son features por sí mismas.
- Las features se ordenan por **dependencias**, **valor** y **riesgo**, y el orden se refleja en el prefijo de la carpeta.
- El PRD marca el alcance: lo que deja fuera no se convierte en feature, y lo que falta se propone a producto antes de especificarlo.

### Errores frecuentes

- Clasificar L6 como feature porque se parece a «Anotar una incidencia» (L8). L6 agrupa cinco capacidades distintas: es un épico.
- Clasificar L4, L9 o L14 como features porque llevan trabajo. Son pasos técnicos sin valor propio.
- Clasificar L7 como feature: es una task disfrazada (demasiado pequeña).
- Clasificar L12 como task. Comprobar la hora no es un paso de implementación, sino un comportamiento que la spec de «Reservar un carro» tiene que fijar (con su respuesta exacta).
- Crear features para lo que el PRD deja fuera de alcance (préstamos al alumnado, penalizaciones).
- Ordenar las features por cómo aparecen en la lista o en el PRD, sin dependencias: por ejemplo, la devolución antes que el préstamo.
- Historias de usuario sin el *para qué*, o que describen la implementación («quiero un endpoint…»).
- Carpetas del índice sin prefijo, con mayúsculas o con espacios.

### Otras soluciones válidas

- **Otro orden**, siempre que respete las dependencias y esté justificado: por ejemplo, préstamo y devolución antes que las reservas, si se argumenta que el riesgo mayor es perder portátiles.
- **No incluir «Cancelar una reserva»**, si se dice que no está en el PRD y que habría que proponerla antes de especificarla. Incluirla también es válido.
- **Que C dependa de B** (solo se presta un portátil de un carro reservado), si se justifica. Entonces C va después de B.
- **L3 como requisito** de B (mostrar los huecos libres) en lugar de historia: tiene forma de historia, pero también describe un comportamiento de la spec. Lo importante es que vaya a B.
- **L9 al plan de B** o de la primera feature que el alumno ordene, en lugar de A.
- **L16 como fuera del alcance** del PRD sin clasificarlo como épico, si explica que es demasiado grande para una feature.
- Otros nombres para las features y las carpetas, si siguen el formato `<prefijo>-<nombre-en-minusculas>/`.
