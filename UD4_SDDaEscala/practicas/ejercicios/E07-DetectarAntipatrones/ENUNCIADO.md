# E07 · Detectar antipatrones

**Tipo:** autocorrección

Audita la rama de una feature mal llevada con comandos de Git, encuentra los antipatrones, di en qué fase nacieron, ordena su corrección en el orden del flujo y convierte en *gate* las señales mecánicas.

**Criterios:** OA4 e

## El caso

Lee [`contexto.md`](./contexto.md) y clona el repositorio de `repositorio.bundle` como indica. Repasa antes el tema 4 de la unidad, sobre todo los apartados 4.2, 4.6 y 4.8.

## Entorno de trabajo

Para auditar solo necesitas Git. Para validar la spec que escribes (requisito 5) abre la carpeta del ejercicio en su **Dev Container** (`npm run validar`). Escribe las respuestas en el `README.md`.

## Requisitos

1. **Señales.** En la tabla «Señales», ejecuta **al menos seis** comandos de auditoría sobre la rama (los del apartado 4.8 y los que se te ocurran): el comando, lo relevante de su salida y qué sugiere.
2. **Hallazgos.** En «Hallazgos», **al menos diez** antipatrones, **ordenados por fase** (spec, plan, tasks, implementación, validación, contexto, equipo): cuál es, la **evidencia** (comando y salida, o fichero y línea), qué consecuencia tiene y cómo se corrige. Incluye los que rompen la constitución.
3. **Falsos positivos.** Hay al menos dos cosas que parecen antipatrones y no lo son. En «Falsos positivos», di cuáles son, por qué las señales engañan y qué comprobaste para descartarlas.
4. **Plan de corrección.** En «Plan de corrección», la devolución de la feature a la fase donde nació cada problema, **en el orden del flujo**: qué se rehace, quién lo aprueba y el mensaje del commit. Di qué se aprovecha de lo que hay y qué se descarta.
5. **La spec, bien escrita.** Escribe `docs/specs/F-cancelar-reserva/spec.md` en la versión 1.1 con lo que dice producto: contexto, requisitos y *edge cases* en EARS (sin prescribir la implementación y sin adjetivos vagos), cuatro criterios de aceptación en Gherkin con `# language: es`, y «Fuera de alcance». Sin marcadores. Valida con `npm run validar`.
6. **Un *gate*.** Escribe `herramientas/comprobar-trampas.sh`: un script de `sh` que, ejecutado en un repositorio con `sh <ruta>/comprobar-trampas.sh <rama-base>`, **falle** (salida distinta de 0) si el diff de la rama contra la base añade `eslint-disable`, `.skip(` o `.only(` en `src/` o `tests/`, o `splice(` en `src/`, o si alguna spec de `docs/specs/` contiene `[NECESITA ACLARACIÓN]`. Solo mira las líneas añadidas y solo en esas carpetas (así el `package-lock.json` no da falsos positivos). Pega en «*Gate*» su salida sobre la rama (falla) y sobre `main` (pasa).
7. **Qué leer.** De los cambios de la rama, en la tabla «Qué leer»: para **cuatro** cambios a tu elección, el riesgo (qué cuesta que falle, si se puede deshacer, qué lo comprueba) y cuánto del código leerías.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `repositorio.bundle` y `contexto.md` | Sin cambios |
| `docs/specs/F-cancelar-reserva/spec.md` | Versión 1.1, estado `Borrador`, en EARS y Gherkin, validada |
| `herramientas/comprobar-trampas.sh` | Script de `sh` con el comportamiento del requisito 6 |
| `README.md` | Secciones «Señales», «Hallazgos», «Falsos positivos», «Plan de corrección», «*Gate*» y «Qué leer», con las tablas de la plantilla |

## Comprueba tu solución

- Los hallazgos van **ordenados por fase** y cada uno tiene una evidencia que se puede repetir con un comando.
- Has encontrado los que rompen la constitución (el borrado y las capas) además de los de proceso.
- La spec 1.0 de la rama tiene un marcador, prescribe la implementación y es vaga: tu spec 1.1 no.
- Has detectado que el comportamiento de permisos (403) está en el código y **no** en la spec (*drift*).
- Dos señales ruidosas no son antipatrones, y sabes decir por qué.
- El plan de corrección empieza por la spec, no por el código.
- Tu script falla en la rama y pasa en `main`, y no da falsos positivos con el `package-lock.json`.
- Para leer según el riesgo, el borrado y los permisos se leen enteros.

## Al terminar

Haz un commit con la spec, el script y el README.
