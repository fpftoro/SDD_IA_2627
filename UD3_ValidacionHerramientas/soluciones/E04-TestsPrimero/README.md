# E04-TestsPrimero

## Los tests primero

### Descripción

Solución del **Ejercicio 4** (autocorrección, con agente). El alumno implementa con OpenCode la feature B del préstamo («Reservar un carro», versión simplificada) con los tests escritos con `/escribir-tests` y revisados antes que el código, un agente `implementador` que no puede tocar los tests, ciclos con un commit cada uno, la comprobación de que los tests no han cambiado y la fusión en `main`.

- Enunciado y material de partida: [`practicas/ejercicios/E04-TestsPrimero`](../../practicas/ejercicios/E04-TestsPrimero/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 4 | Los tests primero | Tests desde la spec, revisados antes del código y fuera del alcance del agente que implementa (OA3 b) |

### Estructura

```text
E04-TestsPrimero/
├── README.md                     ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md                 ← un ejemplo comentado de sesión y decisiones
    ├── .opencode/agents/implementador.md
    ├── tests/                    ← servicio-reservas.test.js (12) y api-reservas.test.js (11)
    ├── src/                      ← los ficheros nuevos de B y app.js
    └── docs/specs/B-reservar-carro/   ← spec Implementada y tasks marcadas
```

El código y los tests de la solución se han comprobado en Docker: los 23 tests de B fallan antes del código (primero porque no existen los módulos; con el repositorio creado, por sus aserciones), los 45 pasan después, y calcular «hoy» en UTC hace fallar `B-RNF-02`.

### Errores frecuentes

- Aceptar los tests del agente sin revisarlos: la sección «Revisión de los tests» dice «todo bien» sin decir qué se comprobó.
- Tests que dependen del día en que se ejecutan (sin fijar la fecha, como pide D-08): pasan hoy y fallan dentro de un mes.
- Un test de RNF-02 que no distingue la hora peninsular de la UTC. El primer intento de la solución de referencia cayó en esto: comprobaba que a las 23:30 UTC se aceptaba la fecha del día siguiente, algo que también hace un código que usa UTC. Solo falla con el mutante si comprueba que **la fecha UTC** ya es pasada.
- Un `implementador` sin la regla de `subagent` en `deny` o con la terminal libre: puede cambiar los tests por otra vía.
- Tests y código en el mismo commit: el commit de los tests tiene que ser anterior y solo de tests.
- El rojo de «Cannot find module» presentado sin explicación. Es aceptable porque los módulos son parte de lo que hay que construir, pero conviene ver también el rojo de las aserciones cuando el repositorio ya existe (tema 2, apartado 2.4.3).

### Otras soluciones válidas

- Los tests pueden repartirse de otra forma entre los dos ficheros, siempre que cada identificador esté en el nivel que dice el plan.
- Los datos (carros, fechas, franjas) pueden ser otros si cumplen el «Dado» de cada escenario y distinguen las implementaciones incorrectas.
- Si el agente no intentó cambiar ningún test, basta con decirlo; no hace falta provocarlo.
- La revisión puede encontrar problemas distintos de los del ejemplo: lo que se valora es que se compruebe cada test contra la spec y se documente.
