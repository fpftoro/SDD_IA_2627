# Corrección de los ejercicios · UD3

Procedimiento para corregir los ejercicios de la unidad (E01–E09). Todos son de **autocorrección**, pero están preparados para que los corrija **una IA** (Claude u otra) o **el profesor en clase**, con los mismos materiales y el mismo formato de informe. Qué ejercicios se corrigen lo decide el profesor en cada curso. El profesor revisa siempre el informe y decide la nota; la entrega al alumno la hace el profesor de forma manual.

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
herramientas/corregir.sh UD3_ValidacionHerramientas E09-FeatureDGatesVerde ~/entregas/e09 <prefijo> "<AAAA-MM-DD HH:MM>"
```

- Toma el **último commit de `main` anterior a la fecha límite** (si no se indica fecha, el último commit). Lo que no se ha fusionado en `main` no está en la entrega, aunque esté en una rama.
- **No ejecuta** nada del repositorio del alumno.
- Genera en `correcciones/E09-FeatureDGatesVerde/` (carpeta excluida de Git):
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

En esta unidad se corrigen **documentos** (matrices de trazabilidad, diagnósticos, matrices de decisión, planes y tasks), **código y tests** (E03, E04, E06, E08 y E09), **configuraciones** (ESLint, Vitest, Playwright, workflows de GitHub Actions, OpenCode y servidores MCP) y el **historial de Git**. Todo se corrige **leyendo**: los tests, las configuraciones y las salidas que pega el alumno en su README son evidencia, pero no se ejecutan. En los ejercicios con integración continua (E05 y E09), el resultado de GitHub Actions se valora por los enlaces y las salidas del README; si quien corrige tiene acceso al repositorio, puede abrir las ejecuciones. Una matriz, un diagnóstico o un test del alumno pueden ser válidos aunque no coincidan con la solución: lo que se valora es lo que pide el descriptor.

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

E04, E06, E08 y E09 se hacen con OpenCode. El agente no produce siempre lo mismo, así que **no se corrige lo que generó el agente, sino el proceso y los artefactos del alumno**:

- La sección **«Sesión con el agente»** del README: prompts concretos, qué produjo el agente y qué corrigió el alumno.
- La sección **«Decisiones»**: qué propuestas del agente aceptó o rechazó y con qué motivo. Rechazar una propuesta con un buen motivo puntúa igual que aceptarla.
- Las **revisiones** que pide cada ejercicio (de los tests, del servidor MCP, de los hallazgos del revisor), con problemas concretos.
- La **configuración de los agentes** (`implementador`, `consultor`) y sus comprobaciones con `opencode debug agents`: lo que importa son los permisos, no el texto de sus instrucciones.
- El **historial de commits**: los tests en un commit anterior al código, un commit por grupo de tasks, la rama de la feature y la **fusión** en `main` (`"fusion": true` en `<username>.datos.json`). Una rama en `ramasSinFusionar` es trabajo que no llegó a `main`; en el E05 la rama `prueba-gates` **debe** estar sin fusionar.

Si un artefacto es bueno pero el README no documenta cómo se llegó a él, puntúan los criterios del artefacto y no los del proceso.

En el **E06** lo que se corrige es la **evaluación**, no lo bien que lo hizo el agente: que cada intento esté registrado con su rama y su sesión, que las tres puntuaciones estén separadas y se justifiquen con la sesión, que la configuración B cambie una sola cosa y que la conclusión se apoye en los recuentos y en el caso reservado. Un agente que falla en todos los casos puede dar un ejercicio excelente.

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
Corrige el ejercicio E09-FeatureDGatesVerde del alumno <username> siguiendo
UD3_ValidacionHerramientas/soluciones/CORRECCION.md. Su entrega está en
correcciones/E09-FeatureDGatesVerde/entregas/<username>/ y su historial en
correcciones/E09-FeatureDGatesVerde/<username>.datos.json. Completa el informe
correcciones/E09-FeatureDGatesVerde/<username>.md.
```

Para corregir todos los alumnos de una tarea, la misma petición con «todos los alumnos de `correcciones/E09-FeatureDGatesVerde/`», un informe por alumno.

Si la IA no tiene acceso al repositorio (por ejemplo, un chat web), adjunta estos ficheros en la conversación: `CORRECCION.md`, `ENUNCIADO.md`, `rubrica.md`, el `README.md` del ejercicio, la solución de referencia, `<username>.datos.json`, los ficheros de `entregas/<username>/` y la plantilla del informe. Revisa antes las normas del centro sobre datos personales.

---

## Ejercicios de la unidad

| Ejercicio | Criterios | Qué se valora |
|-----------|-----------|---------------|
| [E01-DriftSembrado](./E01-DriftSembrado/rubrica.md) | OA3 a | Búsquedas de identificadores, matriz que lee las aserciones, arquitectura, hallazgos con su forma de *drift* y sitio de corrección, tests que pueden fallar, señales del historial |
| [E02-SeisDiagnosticos](./E02-SeisDiagnosticos/rubrica.md) | OA3 d | Doce diagnósticos justificados, sitio y primer paso, dos correcciones completas, por qué no se legaliza el código |
| [E03-TestsQueMienten](./E03-TestsQueMienten/rubrica.md) | OA3 b | Mentiras clasificadas, mutantes, tests corregidos, tests que faltan en su nivel |
| [E04-TestsPrimero](./E04-TestsPrimero/rubrica.md) | OA3 b | Tests desde la spec, revisión y rojo, `implementador` sin permiso sobre los tests, commit de los tests antes del código, ciclos y fusión |
| [E05-GatesProyecto](./E05-GatesProyecto/rubrica.md) | OA3 c | ESLint con capas, cobertura con umbral justificado, trazabilidad y estado, workflow, rama en rojo sin fusionar, lo que no detectan |
| [E06-EvaluarAgente](./E06-EvaluarAgente/rubrica.md) | OA3 g | Puntuación de los intentos preparados con el intento afortunado y la regresión, batería pasada con A y B, registro de cada intento, tres puntuaciones por separado justificadas con la sesión, B con un solo cambio y conclusión con el caso reservado |
| [E07-ElegirHerramientas](./E07-ElegirHerramientas/rubrica.md) | OA3 e | Restricciones primero, matrices con pesos, decisiones con prueba piloto, dos herramientas investigadas, qué sobrevive al cambiar de agente |
| [E08-McpMinimoPrivilegio](./E08-McpMinimoPrivilegio/rubrica.md) | OA3 f | Revisión y corrección del servidor, configuración con `deny` por defecto y `allow` por agente, instrucción escondida |
| [E09-FeatureDGatesVerde](./E09-FeatureDGatesVerde/rubrica.md) (integrador) | OA3 a, b, c, d | Validación de B, diagnóstico y corrección del *drift*, feature D con los tests primero, gate de marcadores y fusiones con la CI en verde |

## Validar las soluciones de referencia

Tras cambiar un ejercicio o su solución, desde la raíz del repositorio del profesor:

```bash
herramientas/validar-mermaid.sh UD3_ValidacionHerramientas     # diagramas
herramientas/validar-gherkin.sh UD3_ValidacionHerramientas     # escenarios de Gherkin de las specs de partida
herramientas/generar-criterios.py UD3_ValidacionHerramientas   # regenera criterios-evaluacion.md
```

Los proyectos de partida y las soluciones con código (E01, E03, E04, E05, E06, E08 y E09) se comprueban además en Docker: `npm test` y `npm run lint` en `node:24-alpine`, las pruebas de Playwright en `mcr.microsoft.com/playwright` con la misma versión que `@playwright/test`, los servidores MCP con `npm run probar-mcp`, y los workflows con `actionlint`.
