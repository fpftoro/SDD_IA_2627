# E04-PlanTasks

## Del plan a las tasks

### Descripción

Solución del **Ejercicio 4** (autocorrección). El alumno descompone en tasks el plan aprobado de la feature B del préstamo de portátiles (la versión de referencia del E03) y revisa unas tasks de la feature D con errores sembrados. Es el segundo eslabón de la cadena E03 → E04 → E05: las tasks de referencia son el punto de partida del E05.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E04-PlanTasks`](../../practicas/ejercicios/E04-PlanTasks/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 4 | Del plan a las tasks | Tasks pequeñas, ordenadas y verificables, y revisión en el punto de control 3 (OA2 c) |

### Estructura

```text
E04-PlanTasks/
├── README.md       ← este fichero
├── rubrica.md
└── solucion/       ← el proyecto al terminar, en la rama de B
    ├── README.md   ← respuesta modelo
    ├── docs/specs/B-reservar-carro/tasks.md   ← tasks de referencia (punto de partida del E05)
    └── material/   ← sin cambios
```

### Corrección

La entrega está en la rama `feature/B-reservar-carro`, que **no** se fusiona:

```bash
RAMA=feature/B-reservar-carro herramientas/corregir.sh UD2_FlujoContexto E04-PlanTasks <carpeta-repos> <prefijo> [fecha-límite]
```

### Tasks de referencia de B

Tres grupos, seis tasks, siguiendo la secuencia del plan: reloj (T-01 y T-02), servicio (T-03 y T-04) y API (T-05 y T-06). Dos tasks tocan tres ficheros, con la excepción justificada en la propia task: T-04 (error, repositorio y servicio, que solo se prueban a través del servicio) y T-06 (el «cableado» de la capa HTTP).

### Errores sembrados en las tasks de D

Trece (el enunciado pide al menos ocho): task enorme, criterio vago, `[P]` incorrecto, task que no viene del plan (con comportamiento nuevo), tests al final, criterio de tests al revés, cobertura incompleta (ocho identificadores), dependencia al revés, task microscópica, mensaje que contradice la spec, task duplicada, faltan los puntos de control y decisiones que no se pueden comprobar.

### Conceptos aprendidos

- Las tasks salen de la secuencia y de la estrategia de pruebas del plan: no añaden nada.
- Una task de tests termina en **rojo**; la de implementación, en **verde**.
- El criterio de terminado dice qué se comprueba, no que «funciona».
- La cobertura se comprueba fila a fila: cada fila de la estrategia de pruebas tiene su task.
- Las tasks se leen **en orden**: el error de dependencia no se ve leyéndolas sueltas.

### Errores frecuentes

- Una task de tests y una de implementación para toda la feature (dos tasks enormes).
- Tests después del código, o criterios de terminado de los tests que dicen «pasan».
- Olvidar el montaje de las rutas en `src/app.js`, el test del reloj o RNF-01.
- Copiar del plan los identificadores de las decisiones sin decir qué identificadores de la spec comprueba cada task de tests.
- Tabla de cobertura incompleta o con filas inventadas.
- En la parte 2, ver los errores de lo que está escrito y no lo que **falta** (cobertura y puntos de control).
- Corregir T-06 «al revés»: cambiar la spec para que diga «No tienes permiso».

### Otras soluciones válidas

- Más grupos con tasks de un solo fichero (por ejemplo, el repositorio y el error en una task aparte, con su criterio «el servicio los usa y sus tests pasan»), si no hay ninguna task de implementación sin tests antes.
- El reloj dentro del grupo del servicio, si sus tests van antes.
- Marcar con `[P]` el reloj y el error de conflicto, que no dependen entre sí, si el alumno lo justifica.
- Agrupar de otra forma los errores de la parte 2 (por ejemplo, T-01 como un solo error con tres motivos), siempre que haya al menos ocho distintos.
