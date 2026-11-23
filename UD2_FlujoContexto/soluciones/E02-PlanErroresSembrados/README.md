# E02-PlanErroresSembrados

## Plan con errores sembrados

### Descripción

Solución del **Ejercicio 2** (autocorrección). El alumno revisa con la lista del punto de control 2 un plan de la feature D del préstamo de portátiles («Registrar la devolución») generado con más de diez errores sembrados, decide en qué documento se corrige cada uno, escribe el plan corregido y separa lo que le corresponde a la spec.

- Enunciado y material de partida: [`practicas/ejercicios/E02-PlanErroresSembrados`](../../practicas/ejercicios/E02-PlanErroresSembrados/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 2 | Plan con errores sembrados | Revisión de un plan en el punto de control 2 y plan completo con la plantilla del curso (OA2 b) |

### Estructura

```text
E02-PlanErroresSembrados/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md           ← respuesta modelo
    ├── plan-con-errores.md ← material de partida, sin cambios
    ├── constitution.md     ← material de partida, sin cambios
    └── docs/
        ├── prd.md          ← material de partida, sin cambios
        └── specs/D-registrar-devolucion/
            ├── spec.md     ← material de partida (spec 1.0 aprobada del E09 de la UD1)
            └── plan.md     ← plan corregido
```

### Errores sembrados

Diecinueve en total (el enunciado pide al menos diez). Están todos los errores típicos del tema 2 (apartado 2.5.2) y casi todas las líneas de la lista del punto de control 2.

| Sección | Errores |
|---------|---------|
| Metadatos | Versión de la spec que no es la aprobada; estado `Aprobado` y el agente como autor |
| Visión general | Relleno; orden «de fuera adentro» |
| Contexto técnico y Dependencias | dayjs y express-validator, innecesarias y fuera de la constitución |
| Comprobación de la constitución | Dos principios de diez, y una casilla marcada que no se cumple |
| Ficheros y D-05 | Supone un servicio de usuarios que no existe |
| D-01 | Nombres de campos que se ven desde fuera: hueco de la spec |
| D-02 | Fecha de la petición: contradice RNF-02 y EC-07 |
| D-03 | Lógica en el controlador: contradice la constitución |
| D-04 | Préstamo sacado de la lista: contradice la constitución y RNF-03 |
| D-05 | 401 en vez del 403 de EC-05 |
| D-06 | Campo aviso inventado |
| D-07 | Devolución en lote: sobreingeniería, en el fuera de alcance |
| D-08 | Orden de escrituras que incumple EC-08 |
| D-09 | Sin motivo, sin alternativa y sin identificadores |
| D-10 | Código en el plan |
| Secuencia | Controlador antes que el servicio; tests al final |
| Estrategia de pruebas | Ocho identificadores sin fila; AC-04 a mano y AC-03 solo unitario |

**No son errores** (por si alguien los marca): la ruta, que es la de la spec; los datos en memoria, que permite la constitución; usar `ErrorConflicto` para el 409, que ya existe; y el riesgo de perder los datos al reiniciar.

### Conceptos aprendidos

- El punto de control 2 se revisa con una lista: constitución, cobertura de la spec, decisiones y viabilidad. Las casillas marcadas del agente no cuentan como revisión.
- Una decisión del plan que se nota desde fuera es un hueco de la spec: se marca y se propone, no se decide en el plan ni se cambia la spec aprobada.
- Lo que contradice la spec o la constitución se rechaza y se deja escrito como alternativa descartada.
- El plan supone el código que existe: cada fichero y cada función que usa se comprueba.
- La estrategia de pruebas tiene una fila por identificador, y lo que se ve en la API se comprueba con un test de integración.

### Errores frecuentes

- Fiarse de la comprobación de la constitución del plan original porque «está marcada».
- No ver D-01 como hueco de la spec: los nombres «parecen técnicos», pero los ve quien use la API.
- Corregir D-02, D-06 o D-07 en la spec (añadiendo la fecha de la petición, el aviso o el lote) en vez de quitarlos del plan: la spec ya decidió.
- Corregir D-08 cambiando solo el orden y no decir qué pasa si falla la segunda escritura.
- Dejar en el plan corregido una decisión sin alternativa descartada cuando el original proponía otra cosa (la alternativa es la propuesta rechazada).
- Estrategia de pruebas sin RNF-01, RNF-02 o EC-08, o con AC-04 a mano.
- Cambiar `spec.md`, aunque sea para arreglar un hueco: está aprobada.
- Poner el plan como `Aprobado` con marcadores pendientes.

### Otras soluciones válidas

- Otra agrupación de los errores (por ejemplo, las dos dependencias en filas separadas, o la secuencia como dos errores), siempre que haya al menos diez distintos.
- No ver el hueco H2 (orden de los errores): no está sembrado. Si se ve, es un acierto.
- Resolver EC-08 de otra forma que no deje cambios a medias (por ejemplo, comprobar todo, preparar los dos cambios y escribirlos al final, deshaciendo el primero si falla el segundo).
- Comprobar RF-03 o RNF-03 también con un test de integración.
- Estado `En revisión` en lugar de `Borrador`, si el README explica que no se puede aprobar hasta que se resuelvan los huecos.
- Otros nombres de campos en la propuesta de H1, si son coherentes con los de la feature C.
