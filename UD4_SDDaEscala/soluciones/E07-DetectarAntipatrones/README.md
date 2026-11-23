# E07-DetectarAntipatrones

## Detectar antipatrones

### Descripción

Solución del **Ejercicio 7** (autocorrección). El alumno audita con Git la rama de una feature mal llevada (`repositorio.bundle`), encuentra los antipatrones y su fase de origen, distingue dos falsos positivos, ordena la corrección, reescribe la spec y escribe un *gate* con las señales mecánicas.

- Enunciado y material de partida: [`practicas/ejercicios/E07-DetectarAntipatrones`](../../practicas/ejercicios/E07-DetectarAntipatrones/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 7 | Detectar antipatrones | Auditar un historial, fase de origen, corrección en orden y *gates* (OA4 e) |

### Estructura

```text
E07-DetectarAntipatrones/
├── README.md                    ← este fichero
├── rubrica.md
├── generar-repositorio.sh       ← regenera repositorio.bundle (solo el profesor)
└── solucion/
    ├── README.md                ← respuesta modelo (19 hallazgos)
    ├── docs/specs/F-cancelar-reserva/spec.md   ← spec 1.1
    └── herramientas/comprobar-trampas.sh
```

### Clave

- **Fase de origen de casi todo:** la spec (marcador, implementación prescrita, vaga, sin AC) y el plan (código, duplica una clase, decide un borrado). Lo demás es consecuencia.
- **Rompen la constitución:** el `splice` (las reservas no se borran) y el controlador que importa el repositorio.
- **Se ven mejor con Git:** el test borrado (`--diff-filter=M`), el `skip` del test de permisos, el estado del índice y el *drift* (la spec nunca vuelve a cambiar).
- **Falsos positivos:** el lockfile reordenado (`package.json` sin cambios) y el renombrado (`R100`).
- **El comportamiento de permisos** (403, coordinación) está en el código y no en la spec: la spec 1.1 lo recoge.

El repositorio se genera siempre igual (autor y fechas fijos): `sh UD4_SDDaEscala/soluciones/E07-DetectarAntipatrones/generar-repositorio.sh` desde la raíz. **Comprobado:** todos los comandos de la auditoría sobre un clon del *bundle* (las salidas de la solución son las reales), el *gate* sobre la rama (falla) y sobre `main` (pasa), `shellcheck` sobre el script y el Gherkin de la spec 1.1 con `@cucumber/gherkin`. El código de la rama no se ejecuta (es el material a auditar).

### Errores frecuentes

- **Empezar por leer el código** en lugar de por el historial y la spec.
- **Marcar el lockfile o el renombrado como antipatrones.**
- **Mezclar causa y consecuencia**: el `skip` y el `eslint-disable` son síntomas; la causa está antes.
- **No ver el *drift***: el código dice 403 y la spec no.
- **Un plan de corrección que empieza por «arreglar el código»** o que sigue desde la rama.
- **Un *gate* que mira todo el diff** y salta con el lockfile, o que mira también las líneas borradas.
- **«Leo todo» como criterio**: no escala; hay que razonar el riesgo.
- **Corregir la spec cambiando lo que hace el código** (no hay que legalizar el fallo).

### Otras soluciones válidas

- Agrupar o separar los hallazgos de otra forma, si siguen ordenados por fase y con evidencia.
- Considerar el commit `Feature F: cancelar reservas` y el `wip` dos casos del mismo antipatrón (todo de una vez).
- Un *gate* que mira también `e2e/`, o que usa `git diff --name-only` para el índice.
- Un plan de corrección en el que la implementación se hace en la misma rama si se descartan los commits (`git revert`), razonándolo.
- Poner la clase del 403 como `ErrorProhibido` nueva (con cambio de la constitución) o reutilizar una existente.
- La spec 1.1 con más *edge cases* (por ejemplo, el cuerpo de la petición).
