# E09 · Feature D con los gates en verde

**Tipo:** autocorrección (con agente) · **integrador**

Vuelve a la lista de tareas de los temas: valida lo que hay en `main`, diagnostica lo que cuentan los usuarios, corrige lo que no cumple la spec, implementa la feature D con los tests primero, añade un gate nuevo y lleva todo a `main` con la integración continua en verde.

**Criterios:** OA3 a, b, c, d

## El caso

Es el proyecto de la **lista de tareas** tal como queda al final del tema 3: features A y B en `main`, la memoria del agente (revisor, implementador y los comandos `/planificar`, `/escribir-tests`, `/implementar` y `/validar`), los gates y el workflow `calidad.yml`. Todo está en verde.

Lo nuevo:

- La feature **D, «Borrar una tarea»**, tiene la spec **aprobada** en `docs/specs/D-borrar-tarea/spec.md`. No tiene plan ni tasks. (La feature C la implementaste en la UD2; aquí no está.)
- [`docs/incidencias.md`](./docs/incidencias.md) recoge cuatro comentarios de los usuarios.
- [`historial.txt`](./historial.txt) muestra un commit que llegó a `main` después de fusionar B.

## Entorno de trabajo

Abre la carpeta en el **Dev Container** (instala OpenCode, las dependencias y el navegador de Playwright) y conecta tu proveedor de modelos. El repositorio tiene que estar en **GitHub** para que se ejecute la integración continua.

## Requisitos

### Fase 1 · Validar y diagnosticar (en `main`)

1. **Validar B.** Lanza `/validar B-ver-lista` y construye tú también la matriz de trazabilidad de B (tema 1). Documenta los hallazgos del revisor con tu decisión (aceptado o rechazado, con motivo).
2. **Diagnosticar.** Para cada incidencia de `docs/incidencias.md`, el diagnóstico (tema 1, apartado 1.5.4), dónde se corrige y el primer paso.
3. **Corregir el fallo de B.** El que sea un error de implementación, corrígelo con el flujo: rama, primero el test (y su commit propio, porque cambia un test existente), después el código, y pull request con la CI en verde. Las demás incidencias, anótalas donde corresponda (índice de features o lista de dudas), sin implementarlas.

### Fase 2 · La feature D (en su rama)

4. **Plan y tasks.** Rama `feature/D-borrar-tarea`. Plan con `/planificar D-borrar-tarea`, revisado (punto de control 2), con la estrategia de pruebas por nivel. Tasks con **todos los tests en el grupo 1**. Ten en cuenta que el botón «Borrar» cambia lo que muestra cada tarea en la página: ¿qué tests existentes se ven afectados?
5. **Los tests primero.** `/escribir-tests D-borrar-tarea 1`, revisión con la lista del tema 2 y commit `Tests de la feature D (revisados)`. Incluye los tests de integración y las pruebas de la página con Playwright. Si cambias tests existentes, explica por qué en el README.
6. **Los ciclos.** `/implementar` por grupo, con revisión y commit en cada uno. Al final, `git diff --stat` contra el commit de los tests.

### Fase 3 · El gate nuevo y la fusión

7. **Un gate nuevo.** Escribe `herramientas/comprobar-marcadores.sh`: falla si alguna spec `Aprobada`, `En implementación` o `Implementada` tiene un `[NECESITA ACLARACIÓN`. Añádelo al *job* de documentos del workflow, después del estado. Comprueba que falla con un marcador de prueba y que pasa sin él.
8. **Fusión.** Pull request de la feature D con los cinco *jobs* en verde. Lee los avisos de los gates y explica cada uno. Fusiona con un commit de fusión.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `docs/specs/D-borrar-tarea/` | `plan.md` y `tasks.md` aprobados; `spec.md` en `Implementada` |
| `docs/specs/README.md` | D en `✅ Implementada`; lo que hayas anotado de las incidencias |
| `src/`, `public/` | El código de D y la corrección de B |
| `tests/`, `e2e/` | Los tests de D con `D-` y el identificador; el de B corregido |
| `herramientas/comprobar-marcadores.sh` y `.github/workflows/calidad.yml` | El gate nuevo, en el *job* de documentos |
| `README.md` | Secciones «Validación de B», «Incidencias», «Corrección de B», «Sesión con el agente», «Decisiones», «Revisión de los tests», «Tests existentes modificados», «El gate nuevo», «Integración continua» y «Commits» |
| Historial | Corrección de B y feature D fusionadas en `main` con commits de fusión; en cada rama, los tests en un commit anterior al código |

## Comprueba tu solución

- El fallo de B es uno de los que no ve ningún gate: lo encuentras comparando la aserción con la spec.
- Al corregirlo, la spec no cambia: cambian el test (primero) y el código.
- De las cuatro incidencias, solo una se corrige ahora en el código; las otras tienen su sitio (índice, spec, dudas).
- Cada identificador de la spec de D tiene su test; la trazabilidad no avisa de nada.
- Las pruebas de la página de A y B siguen pasando con el botón «Borrar», y si las has cambiado, sabes explicar por qué no es «cambiar un test para que pase».
- Las pruebas de Playwright no dependen unas de otras: cada una deja la lista como la encontró o no supone nada de ella.
- `comprobar-marcadores.sh` falla con un marcador en una spec aprobada.
- En las dos pull requests, todos los *jobs* en verde antes de fusionar.

## Al terminar

Sube `main`. Cierra el Dev Container.
