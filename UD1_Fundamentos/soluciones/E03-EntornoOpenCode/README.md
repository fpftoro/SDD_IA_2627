# E03-EntornoOpenCode

## Mi entorno con OpenCode

### Descripción

Solución del **Ejercicio 3** (autocorrección, con agente). Sobre un proyecto ya empezado del préstamo de portátiles, el alumno conecta OpenCode a un proveedor, genera el `AGENTS.md` con `/init` y lo revisa, añade la constitución con `instructions`, configura los permisos de terminal y comprueba con seis pruebas que el agente trabaja con ese contexto y esos límites. Cada fase acaba en un commit.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E03-EntornoOpenCode`](../../practicas/ejercicios/E03-EntornoOpenCode/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 3 | Mi entorno con OpenCode | Entorno con un agente, proveedor de modelos y contexto de proyecto (OA1 c) |

### Estructura

```text
E03-EntornoOpenCode/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── .devcontainer/devcontainer.json
    ├── AGENTS.md           ← revisado
    ├── opencode.json       ← instructions y permisos
    ├── constitution.md     ← sin cambios
    ├── README.md           ← entrega modelo
    ├── docs/prd.md
    ├── package.json
    ├── src/                ← sin cambios
    └── test/               ← sin cambios
```

La solución no incluye `sesiones/comprobaciones.md`: es la exportación de la sesión de cada alumno y depende del modelo. Debe contener los seis prompts de la fase 5 con las respuestas del agente y los permisos que pidió.

### Ejecutar

Dentro del Dev Container del ejercicio:

```bash
npm test                      # cinco tests en verde
opencode debug config         # muestra instructions y permissions
opencode debug agents         # en plan, la última regla de edit con recurso * es deny
```

### Comprobaciones hechas

- El proyecto de partida instala y pasa los cinco tests (Express 5, Vitest 5). `GET /api/portatiles/9` responde `404 {"msg":"not found"}`: es la mala costumbre sembrada que contradice la constitución.
- `opencode.json` se ha comprobado con OpenCode 2.3.2: `opencode debug config` lo resuelve sin errores y `opencode debug agents` muestra que *plan* conserva `edit` denegado y que *build* y *plan* preguntan antes de cualquier comando salvo `npm test`, `git status`, `git diff`, `git log` (permitidos) y `rm` (denegado).
- Con una regla `edit` en `allow` en `permissions`, la última regla de `edit` de *plan* pasa a ser `allow`: por eso el enunciado prohíbe añadirla.
- Un ` *` al final de un patrón es opcional en OpenCode: `git diff *` vale también para `git diff`.

### Conceptos aprendidos

- El agente y el modelo son cosas distintas: OpenCode se conecta a un proveedor, y la clave se queda fuera del repositorio.
- `/init` genera un **borrador**: deduce reglas del código, incluidas sus malas costumbres. Revisarlo es trabajo de una persona.
- `AGENTS.md` dice cómo trabaja el agente; la constitución, qué es innegociable. No se repiten: la constitución se carga con `instructions`.
- Los permisos se leen en orden y **gana la última regla que coincide**. Una regla global puede anular la protección de un agente.
- La configuración no se da por buena hasta que se comprueba: con `opencode debug` y con pruebas reales con el agente.

### Errores frecuentes

- Editar el `AGENTS.md` antes del primer commit: se pierde la versión de `/init` y no se puede ver la revisión con `git diff`.
- Dejar en `AGENTS.md` la regla del `msg` que `/init` copió del código.
- Copiar la constitución entera dentro de `AGENTS.md` en lugar de cargarla con `instructions`.
- Añadir a `permissions` una regla `edit` en `allow`: *plan* deja de tener prohibido editar.
- Poner la regla de `shell` con `*` en `ask` **después** de las excepciones: como gana la última regla, todos los comandos acaban preguntando.
- No volver a arrancar OpenCode tras crear `opencode.json`: la prueba 2 falla porque la sesión no ha cargado la constitución.
- Corregir el código de la ruta tras la prueba 3. En este ejercicio no se toca el código.
- Rellenar «Qué esperaba» después de ver el resultado.
- Escribir la clave del proveedor en `opencode.json` o en el README.

### Otras soluciones válidas

- Un `AGENTS.md` con otra organización o con otras prohibiciones razonables, siempre que tenga comandos, estructura, convenciones y al menos tres prohibiciones, no contradiga ni repita la constitución y no hable del ejercicio.
- Más reglas de permisos que las pedidas (por ejemplo, `"npm start": "ask"` o `"git push *": "deny"`), si están explicadas y no contradicen las pedidas.
- Que en la prueba 4 el agente use `npx vitest run` y pregunte: la configuración es correcta; lo importante es que el alumno lo anote y lo relacione con el `AGENTS.md`.
- Que en la prueba 6 el agente intente borrar de otra forma y pida permiso: es correcto si el alumno lo deniega y lo anota.
- Las respuestas del agente en la sesión cambian con el modelo; se valora que el alumno compare lo que esperaba con lo que pasó.
