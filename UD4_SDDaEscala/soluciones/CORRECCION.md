# Corrección de los ejercicios · UD4

Procedimiento para corregir los ejercicios de la unidad (E01–E08). Todos son de **autocorrección**, pero están preparados para que los corrija **una IA** (Claude u otra) o **el profesor en clase**, con los mismos materiales y el mismo formato de informe. Qué ejercicios se corrigen lo decide el profesor en cada curso. El profesor revisa siempre el informe y decide la nota; la entrega al alumno la hace el profesor de forma manual.

- [Materiales](#materiales)
- [Corregir en clase](#corregir-en-clase)
- [Paso 1. Descargar los repositorios](#paso-1-descargar-los-repositorios)
- [Paso 2. Preparar la corrección](#paso-2-preparar-la-corrección)
- [Paso 3. Aplicar la rúbrica](#paso-3-aplicar-la-rúbrica)
- [Paso 4. Completar el informe](#paso-4-completar-el-informe)
- [Ejercicios con agente](#ejercicios-con-agente)
- [Instrucciones para la IA](#instrucciones-para-la-ia)
- [Ejercicios de la unidad](#ejercicios-de-la-unidad)
- [Validar las soluciones de referencia](#validar-las-soluciones-de-referencia)

---

## Materiales

Cada ejercicio tiene su carpeta `soluciones/Enn-<Nombre>/`:

| Fichero | Para qué |
|---------|----------|
| `rubrica.md` | Criterios de corrección: criterio de evaluación del OA, peso, dónde mirar y niveles con descriptores observables |
| `README.md` | Descripción de la solución, **errores frecuentes** y **otras soluciones válidas**. Lo lee el alumnado cuando se libera la solución y sirve de notas para quien corrige |
| `solucion/` | Solución de referencia, con su `README.md` relleno. Es **una** forma válida, no la única |

Además, el `ENUNCIADO.md` de cada ejercicio, en `practicas/ejercicios/Enn-<Nombre>/`, con el contrato de entrega, y [`criterios-evaluacion.md`](./criterios-evaluacion.md), con qué criterios de cada rúbrica evalúan cada criterio de evaluación.

## Corregir en clase

Para corregir un ejercicio en clase basta con el repositorio de trabajo del alumno (o su carpeta), la `rubrica.md` y una copia de [`comun/informe-plantilla.md`](./comun/informe-plantilla.md). Se siguen los pasos 3 y 4. Si el ejercicio pide commits, se miran en el repositorio del alumno:

```bash
git log --oneline --graph --all                # ramas y fusiones
git log --oneline --first-parent main          # lo que llegó a main, feature a feature
git log --oneline --name-only                  # qué ficheros cambia cada commit
git branch -a --no-merged main                 # ramas sin fusionar
```

Los pasos 1 y 2 son para corregir todas las entregas de un ejercicio de una vez.

## Paso 1. Descargar los repositorios

Cada alumno entrega el ejercicio en su **repositorio de trabajo**, creado a partir de la carpeta `practicas/ejercicios/Enn-<Nombre>/`, que sirve tal cual de repositorio plantilla. Para corregir todas las entregas a la vez, los repositorios tienen un nombre común, `<prefijo>-<username>` (por ejemplo, `e08-ana`), y se clonan en una misma carpeta:

```bash
mkdir -p ~/entregas/e08 && cd ~/entregas/e08
git clone <url-del-repositorio-de-cada-alumno>     # uno por alumno: e08-ana, e08-luis…
```

Si están en una organización de GitHub, `gh` los clona todos de una vez:

```bash
gh repo list <organización> --limit 500 --json name --jq '.[].name | select(startswith("e08-"))' \
  | xargs -I{} gh repo clone <organización>/{} ~/entregas/e08/{}
```

El clon trae la rama por defecto (`main`) y, como ramas del remoto (`origin/…`), las que el alumno haya subido.

## Paso 2. Preparar la corrección

Desde la raíz del repositorio del profesor:

```bash
herramientas/corregir.sh UD4_SDDaEscala E08-AmpliarProyecto ~/entregas/e08 <prefijo> "<AAAA-MM-DD HH:MM>"
```

- Toma el **último commit de `main` anterior a la fecha límite** (si no se indica fecha, el último commit). Lo que no se ha fusionado en `main` no está en la entrega, aunque esté en una rama.
- **No ejecuta** nada del repositorio del alumno.
- Genera en `correcciones/E08-AmpliarProyecto/` (carpeta excluida de Git):
  - `entregas/<username>/`: copia del repositorio en el commit evaluado. **Es lo que se corrige.**
  - `<username>.datos.json`: commit evaluado, fecha y el historial de commits propios (sin el inicial de la plantilla), con sus mensajes, los ficheros que cambia cada uno, sus padres y si es una **fusión** (`"fusion": true`). Además, el número de fusiones y la lista **`ramasSinFusionar`**: ramas subidas con commits que no llegaron al commit evaluado.
  - `<username>.md`: el informe con la cabecera rellena, listo para completar. Si ya existe, no se sobrescribe.

Si un alumno no tiene commits antes de la fecha límite, `<username>.datos.json` lleva `"sinEntrega": true` y no hay carpeta en `entregas/`.

## Paso 3. Aplicar la rúbrica

Para cada criterio de `rubrica.md`, en orden:

1. Abre lo que indica **«Dónde mirar»** en `entregas/<username>/` y, si el criterio habla del historial, en `<username>.datos.json`.
2. Si el criterio tiene un **requisito previo** y no se cumple, el nivel es 0.
3. Elige el nivel cuyo descriptor se cumple **completo**. Si dudas entre dos, elige el inferior y anótalo en «Dudas para el profesor».
4. Anota la **evidencia**: `fichero:línea` o una frase citada entre comillas.
5. Consulta los **errores frecuentes** y las **otras soluciones válidas** del `README.md` del ejercicio antes de penalizar algo que no coincide con la solución de referencia.

En esta unidad se corrigen **documentos** (tablas de roles, encargos, *handoffs*, specs, deltas, informes de auditoría), **configuraciones de agentes** (`.opencode/agents/`, permisos, `CODEOWNERS`, plantillas de PR), **tests y código** (E05, E06 y E08) y el **historial de Git**, con ramas y fusiones. Todo se corrige **leyendo**: los tests, las configuraciones y las salidas que pega el alumno en su README (`opencode debug agent`, `git log`, `openspec validate`) son evidencia, pero no se ejecutan. Una respuesta del alumno puede ser válida aunque no coincida con la solución: lo que se valora es lo que pide el descriptor.

Si `sinEntrega` es `true`, todos los criterios valen 0 y el informe lo indica.

## Paso 4. Completar el informe

En `correcciones/Enn-<Nombre>/<username>.md` (o en la copia de la plantilla, si se corrige en clase):

1. Indica quién corrige (IA, con su nombre, o Profesor) y la fecha.
2. Una fila por criterio, en el orden de la rúbrica: criterio, OA, peso, nivel, puntos, evidencia y comentario.
3. **Resumen por criterio de evaluación**: suma de puntos y de pesos de los criterios de la rúbrica que evalúan cada criterio del OA, y porcentaje.
4. **Nota del ejercicio** = suma de puntos × 10 / peso total de la rúbrica, con un decimal.
5. **Comentario general**: de dos a cuatro frases en segunda persona; primero lo que está bien, después lo más importante que mejorar.
6. **Dudas para el profesor**: criterios dudosos y por qué, o «Ninguna».
7. La sección **Revisión del profesor** la completa siempre el profesor.

---

## Ejercicios con agente

E03, E06 y E08 se hacen con OpenCode (y E05 tiene una parte opcional). El agente no produce siempre lo mismo, así que **no se corrige lo que generó el agente, sino el proceso y los artefactos del alumno**:

- La sección **«Sesión con el agente»** del README: prompts concretos, qué produjo el agente y qué corrigió el alumno.
- La sección **«Decisiones»**: qué propuestas del agente aceptó o rechazó y con qué motivo. Rechazar una propuesta con un buen motivo puntúa igual que aceptarla.
- Los **encargos** a los subagentes: un encargo es todo el contexto del subagente, así que se valora que lleve objetivo, límites y formato de respuesta.
- La **configuración de los agentes** y sus comprobaciones con `opencode debug agents`: lo que importa son los permisos (también `subagent`), no el texto de sus instrucciones.
- El **historial de commits** y las **ramas**: una rama por feature, la spec en `main`, las fusiones con `--no-ff` (`"fusion": true` en `<username>.datos.json`) y en el orden pedido. Una rama en `ramasSinFusionar` es trabajo que no llegó a `main`; en E03 la rama de la feature que se queda esperando **debe** estar sin fusionar. Los *worktrees* no se entregan: no los busques.

Si un artefacto es bueno pero el README no documenta cómo se llegó a él, puntúan los criterios del artefacto y no los del proceso.

---

## Instrucciones para la IA

Cuando una IA corrige, recibe este fichero, el `ENUNCIADO.md` del ejercicio, su `rubrica.md`, su `README.md` y su `solucion/`, el `<username>.datos.json`, el informe a completar y la carpeta `entregas/<username>/`. Reglas:

1. Aplica **solo** la rúbrica del ejercicio: no añadas, quites ni cambies criterios, pesos o niveles.
2. **No ejecutes** nada del repositorio del alumno. Corrige leyendo.
3. **No inventes evidencias.** Si no encuentras algo en el repositorio, puntúa ese nivel como no conseguido y dilo en el comentario.
4. Cita la evidencia exacta: fichero y línea, o una frase entre comillas.
5. La solución de referencia es **una** forma válida, no la única: no penalices alternativas que cumplan el descriptor. Consulta «Errores frecuentes» y «Otras soluciones válidas».
6. En los ejercicios con agente, valora el proceso documentado y los artefactos del alumno, no si el agente acertó.
7. Los comentarios al alumno: en español de España, en segunda persona, concretos, sin juicios personales y orientados a mejorar.
8. Anota en «Dudas para el profesor» cualquier caso no previsto: posible copia, entrega en otro formato, ficheros con otro nombre que contienen lo pedido, una sesión con el agente que parece inventada, imágenes que no puedes ver… **No decidas sobre ellos.**
9. No incluyas en el informe datos personales distintos del username.
10. No completes la sección «Revisión del profesor».

Petición sugerida para lanzar la corrección con una IA que tenga acceso a este repositorio:

```text
Corrige el ejercicio E08-AmpliarProyecto del alumno <username> siguiendo
UD4_SDDaEscala/soluciones/CORRECCION.md. Su entrega está en
correcciones/E08-AmpliarProyecto/entregas/<username>/ y su historial en
correcciones/E08-AmpliarProyecto/<username>.datos.json. Completa el informe
correcciones/E08-AmpliarProyecto/<username>.md.
```

Para corregir todos los alumnos de una tarea, la misma petición con «todos los alumnos de `correcciones/E08-AmpliarProyecto/`», un informe por alumno.

Si la IA no tiene acceso al repositorio (por ejemplo, un chat web), adjunta estos ficheros en la conversación: `CORRECCION.md`, `ENUNCIADO.md`, `rubrica.md`, el `README.md` del ejercicio, la solución de referencia, `<username>.datos.json`, los ficheros de `entregas/<username>/` y la plantilla del informe. Revisa antes las normas del centro sobre datos personales.

---

## Ejercicios de la unidad

| Ejercicio | Criterios | Qué se valora |
|-----------|-----------|---------------|
| [E01-SubagentesPrestamo](./E01-SubagentesPrestamo/rubrica.md) | OA4 a | Qué se reparte y qué no, tres agentes con su rol, permisos (`subagent` incluido) y modelo, comprobados con `opencode debug agents` |
| [E02-HandoffsSeguridad](./E02-HandoffsSeguridad/rubrica.md) | OA4 b | Encargos con objetivo, límites y formato, *handoff* entre roles, permisos corregidos y trazabilidad |
| [E03-DosFeaturesParalelo](./E03-DosFeaturesParalelo/rubrica.md) | OA4 a, b | Comparación de planes, qué va en paralelo, orden de fusión y replanificación |
| [E04-EquipoGobernanza](./E04-EquipoGobernanza/rubrica.md) | OA4 c | Puntos de control por rol, `CODEOWNERS`, PR de constitución con análisis de impacto |
| [E05-SpecHeredada](./E05-SpecHeredada/rubrica.md) | OA4 d | Tests de caracterización, rarezas decididas, spec del comportamiento actual |
| [E06-DeltaOpenSpec](./E06-DeltaOpenSpec/rubrica.md) | OA4 d | Refactorización con los tests intactos, delta válida y cambio archivado |
| [E07-DetectarAntipatrones](./E07-DetectarAntipatrones/rubrica.md) | OA4 e | Señales, fase de origen, correcciones en orden y spec reescrita |
| [E08-AmpliarProyecto](./E08-AmpliarProyecto/rubrica.md) (integrador) | OA4 a, b, c, d, e | Dos features en paralelo, gobernanza y auditoría final |



## Validar las soluciones de referencia

Tras cambiar un ejercicio o su solución, desde la raíz del repositorio del profesor:

```bash
herramientas/validar-mermaid.sh UD4_SDDaEscala     # diagramas
herramientas/validar-gherkin.sh UD4_SDDaEscala     # escenarios de Gherkin de las specs
herramientas/generar-criterios.py UD4_SDDaEscala   # regenera criterios-evaluacion.md
```

Los proyectos de partida y las soluciones con código (E05, E06 y E08) se comprueban además en Docker (`npm test` y `npm run lint` en `node:24-alpine`; OpenSpec con `openspec validate`), y la configuración de los agentes con `opencode debug agents` y `permisos.mjs` (OpenCode 2.3.2).
