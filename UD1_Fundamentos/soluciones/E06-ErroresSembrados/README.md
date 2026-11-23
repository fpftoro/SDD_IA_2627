# E06-ErroresSembrados

## Spec con errores sembrados

### Descripción

Solución del **Ejercicio 6** (autocorrección). El alumno revisa la spec de «Anotar una incidencia», escrita con al menos diez antipatrones sembrados, explica qué haría el agente con cada problema y escribe la spec corregida con la plantilla del curso, usando lo que ha decidido la coordinación TIC y marcando lo que nadie ha decidido.

- Enunciado y material de partida: [`practicas/ejercicios/E06-ErroresSembrados`](../../practicas/ejercicios/E06-ErroresSembrados/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 6 | Spec con errores sembrados | Antipatrones de una spec y spec completa con la plantilla del curso (OA1 e) |

### Estructura

```text
E06-ErroresSembrados/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md           ← respuesta modelo
    ├── spec-con-errores.md ← material de partida, sin cambios
    └── docs/specs/E-anotar-incidencia/spec.md   ← spec corregida
```

### Problemas sembrados

Dieciséis en total; el enunciado pide al menos diez. Los de la tabla de antipatrones del tema 5 están todos menos la «spec gigante» y la «spec fuera del repositorio».

| Sección | Problemas |
|---------|-----------|
| Metadatos | Sin estado ni fecha; versión 1.0 |
| RF-01 | Requisito compuesto (tres en uno), con un correo que nadie quiere |
| RF-02 | Vaguedad («lista adecuada») |
| RF-03 | Prescribe la implementación; además, todas las incidencias dejan el portátil averiado |
| RF-04 | Contradice la constitución (datos del alumnado) |
| RF-05 | Duda escondida («lo que se considere oportuno») |
| RF-06 | Vaguedad en los errores |
| RNF-01, RNF-02 | No medibles («rápido», «seguro») |
| AC-01 | Resultado no observable («queda registrada») |
| AC-02 | No binario («intuitiva») |
| AC-03 | No enfocado y sin estructura |
| Edge cases | Solo el camino feliz («Los habituales») |
| Pasos de implementación | Mezcla spec y plan |
| (falta) | Fuera de alcance y dependencias |

### Conceptos aprendidos

- Los antipatrones de una spec tienen una consecuencia concreta en el agente: implementa a medias, inventa, copia código o añade lo que nadie pidió.
- Una palabra subjetiva (rápido, seguro, intuitivo, adecuado) es un hueco que rellenará el agente.
- La spec tiene que ser coherente con la constitución y con las decisiones de quien sabe del negocio (aquí, la coordinación TIC).
- Corregir no es inventar: lo que nadie ha decidido se marca con `[NECESITA ACLARACIÓN]`.
- Lo que falta (el fuera de alcance, los *edge cases*) es tan problema como lo que sobra (el código, los pasos).

### Errores frecuentes

- Quedarse en lo que **está mal escrito** y no ver lo que **falta**: el fuera de alcance y las dependencias.
- No comparar con la constitución y dejar el nombre del alumno (RF-04).
- Corregir RF-03 quitando el código pero manteniendo que **todas** las incidencias dejan el portátil averiado, en contra de lo decidido.
- Mantener el correo en la spec corregida, cuando la coordinación TIC ha dicho que no lo quiere.
- «Qué haría el agente» genérico («lo haría mal»). Hay que decir qué haría: inventar los tipos, copiar la función, olvidar el correo…
- Resolver la incidencia repetida inventando una respuesta en lugar de marcarla.
- Dejar en la spec corregida «Pasos de implementación» con otro nombre.
- Poner la spec corregida como `Aprobada` con marcadores pendientes.

### Otras soluciones válidas

- Otra agrupación de los problemas (por ejemplo, RNF-01 y RNF-02 en una fila, o RF-03 como un solo problema), siempre que haya al menos diez problemas distintos.
- Problemas reales que no están en la lista, si están bien justificados: por ejemplo, que el contexto no dice qué pasa con el préstamo abierto de un portátil averiado.
- Otros mensajes de error, otros tiempos de respuesta medibles y otras exclusiones razonables.
- Marcar EC-08 (portátil prestado) como decisión tomada si el alumno razona que no cambia nada del préstamo; lo que no vale es dejar sin marcar la incidencia repetida, que el enunciado dice que nadie ha decidido.
- Escribir los requisitos con *Cuando…* o *Si…, entonces…*: es EARS (tema 6) y también es válido.
