# E05-CiclosCortos

## Implementar en ciclos cortos

### Descripción

Solución del **Ejercicio 5** (autocorrección, con agente). El alumno implementa la feature B del préstamo de portátiles («Reservar un carro») a partir de sus tasks aprobadas (la versión de referencia del E04): un ciclo por grupo, con tests en rojo y en verde, punto de control 4, un commit por grupo y la integración continua en verde. Un hueco sembrado en la spec le obliga a parar y corregirlo donde nació. Al final, comprobación de la feature entera y fusión. Es el último eslabón de la cadena E03 → E04 → E05.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E05-CiclosCortos`](../../practicas/ejercicios/E05-CiclosCortos/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 5 | Implementar en ciclos cortos | Ciclos cortos con revisión, hueco de la spec durante la implementación, comprobación final y fusión (OA2 c) |

### Estructura

```text
E05-CiclosCortos/
├── README.md      ← este fichero
├── rubrica.md
└── solucion/      ← el proyecto en main, con B fusionada
    ├── README.md  ← ejemplo comentado de los ciclos
    ├── docs/specs/B-reservar-carro/   ← spec 1.1 implementada, plan y tasks marcadas
    ├── src/       ← reloj, error de conflicto, repositorio, servicio, controlador y rutas de B
    └── tests/     ← reloj.test.js, servicio-reservas.test.js y api-reservas.test.js
```

**Comprobado en Docker** (`node:24-alpine`, con `npm ci` y el `package-lock.json` de la plantilla): 69 tests en verde (43 de B), `npm run estado` sin errores y el workflow con `actionlint`. Sin la ordenación del servicio, fallan los dos tests del orden (el unitario de RF-03 y el de AC-05 de la API).

### El hueco sembrado

RF-03 (spec 1.0) no dice en qué **orden** se devuelven las reservas de un día, y AC-05 las comprueba sin orden. El agente tiene que elegir uno al escribir el servicio (normalmente, el de creación), y eso se nota desde fuera. La respuesta esperada es: parar, decidir el orden, subir la spec a 1.1 (sigue `En implementación`), actualizar el plan y las tasks, añadir un test y meterlo todo en el commit del ciclo.

Cualquier orden razonable vale (por hora y carro, por carro y hora, por hora de creación **si se decide y se escribe en la spec**). Lo que no vale es dejarlo sin decidir o decidirlo solo en el código.

### Corrección

La entrega está en `main`. En `<username>.datos.json`: los commits de ciclo en la rama (padres de un solo commit) y un commit de fusión (`"fusion": true`) con el mensaje de la convención. Si `ramasSinFusionar` no está vacío, la rama no llegó a `main`.

El resultado de la CI se consulta en GitHub (`CORRECCION.md`, ejercicios con agente). Que `.github/workflows/calidad.yml` no haya cambiado se comprueba con `git diff` entre el commit de partida y el evaluado.

### Conceptos aprendidos

- Un ciclo es un grupo de tasks: sesión nueva, tests en rojo, código en verde, revisión, commit y `push`.
- El punto de control 4 lo hace la persona: `git diff` y `npm test` ejecutado por ella, no el resumen del agente.
- Un hueco que aparece al implementar se corrige en la spec, con versión nueva y en el mismo commit que el código.
- La CI repite los tests en una máquina limpia; con la CI en rojo no se sigue ni se fusiona.
- La feature se comprueba entera antes de fusionarla, y se fusiona con `--no-ff`.

### Errores frecuentes

- Pedir las seis tasks de una vez, o hacer un solo commit al final.
- Hacer los ciclos en la misma sesión.
- No ver los tests en rojo (el agente los escribe y el código a la vez).
- Aceptar el orden del agente sin preguntarse si la spec lo dice, o decidirlo solo en el código.
- Cambiar la spec en un commit aparte, sin el código, o cambiarla sin subir la versión.
- Que el agente modifique tests de A, el `package.json` sin motivo o el workflow para que la CI pase.
- Olvidar los cambios de estado de la spec y del índice (`En implementación`, `Implementada`).
- Fusionar con `git merge` sin `--no-ff`, o fusionar con la CI en rojo.

### Otras soluciones válidas

- Otro orden de la lista, si está en la spec 1.1 y tiene su test.
- Otra forma de implementar la validación de fechas o la ordenación, si cumple la spec y los tests comprueban lo que dicen.
- Encontrar el hueco en el ciclo 3 (al escribir el test de AC-05 de la API) en lugar del 2: entonces la spec 1.1 va en el commit del ciclo 3.
- Más ciclos que grupos, si el alumno partió un grupo por un problema y lo explica.
- Detectar otros huecos reales (por ejemplo, qué responde la API a un cuerpo que no es JSON) y anotarlos como dudas sin resolverlos en el código.
