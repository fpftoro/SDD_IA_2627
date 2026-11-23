# Corrección de los ejercicios · UD2

Procedimiento para corregir los ejercicios de la unidad (E01–E10). Todos son de **autocorrección**, pero están preparados para que los corrija **una IA** (Claude u otra) o **el profesor en clase**, con los mismos materiales y el mismo formato de informe. Qué ejercicios se corrigen lo decide el profesor en cada curso. El profesor revisa siempre el informe y decide la nota; la entrega al alumno la hace el profesor de forma manual.

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

Cada alumno entrega el ejercicio en su **repositorio de trabajo**, creado a partir de la carpeta `practicas/ejercicios/Enn-<Nombre>/`, que sirve tal cual de repositorio plantilla. Para corregir todas las entregas a la vez, los repositorios tienen un nombre común, `<prefijo>-<username>` (por ejemplo, `e10-ana`), y se clonan en una misma carpeta:

```bash
mkdir -p ~/entregas/e10 && cd ~/entregas/e10
git clone <url-del-repositorio-de-cada-alumno>     # uno por alumno: e10-ana, e10-luis…
```

Si están en una organización de GitHub, `gh` los clona todos de una vez:

```bash
gh repo list <organización> --limit 500 --json name --jq '.[].name | select(startswith("e10-"))' \
  | xargs -I{} gh repo clone <organización>/{} ~/entregas/e10/{}
```

El clon trae la rama por defecto (`main`) y, como ramas del remoto (`origin/…`), las que el alumno haya subido.

## Paso 2. Preparar la corrección

Desde la raíz del repositorio del profesor:

```bash
herramientas/corregir.sh UD2_FlujoContexto E10-FeatureEnMain ~/entregas/e10 <prefijo> "<AAAA-MM-DD HH:MM>"
```

- Toma el **último commit de `main` anterior a la fecha límite** (si no se indica fecha, el último commit). Lo que no se ha fusionado en `main` no está en la entrega, aunque esté en una rama.
- **E03 y E04** son la excepción: su trabajo está en la rama `feature/B-reservar-carro`, que no se fusiona porque la feature no está terminada. Se preparan con la variable `RAMA`, y entonces se toma el último commit de esa rama:

  ```bash
  RAMA=feature/B-reservar-carro herramientas/corregir.sh UD2_FlujoContexto E03-PlanFeature ~/entregas/e03 <prefijo> "<AAAA-MM-DD HH:MM>"
  ```

  Si un alumno no subió la rama, el script lo avisa y evalúa `main`.
- **No ejecuta** nada del repositorio del alumno.
- Genera en `correcciones/E10-FeatureEnMain/` (carpeta excluida de Git):
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

En esta unidad se corrigen **documentos** (planes, tasks, `AGENTS.md`, skills, comandos, agentes), **código y tests** (E05 y E10) y el **historial de Git** (ramas, fusiones y un commit por fase o por grupo de tasks). Un plan o unas tasks del alumno pueden ser válidos aunque sus decisiones, sus identificadores o su redacción no coincidan con la solución: lo que se valora es lo que pide el descriptor (que cada decisión tenga motivo y alternativa descartada, que cada task sea pequeña y verificable…), no el parecido con la referencia. El código se corrige **leyendo**, igual que el resto: los tests que haya escrito el alumno y lo que diga su README sobre su ejecución son evidencia, pero no se ejecutan.

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

E03, E05, E08, E09 y E10 (y la parte opcional de E07) se hacen con OpenCode. El agente no produce siempre lo mismo, así que **no se corrige lo que generó el agente, sino el proceso y los artefactos del alumno**:

- La sección **«Sesión con el agente»** del README: prompts concretos, qué produjo el agente y qué corrigió el alumno en cada paso.
- La sección **«Decisiones»**: qué propuestas del agente aceptó o rechazó y con qué motivo. Rechazar una propuesta con un buen motivo puntúa igual que aceptarla.
- Los **artefactos** finales (plan, tasks, código y tests, `AGENTS.md`, skills, comandos, agentes, índice), con los mismos descriptores que si los hubiera escrito sin agente.
- El **historial de commits**: un commit por fase o por grupo de tasks, con mensajes descriptivos, en la **rama de la feature** desde el plan y con un commit de **fusión** en `main` al terminar (`"fusion": true` en `<username>.datos.json`). Una rama que aparece en `ramasSinFusionar` es trabajo que no llegó a `main`: si el ejercicio pedía fusionar, se anota en el comentario y en «Dudas para el profesor».
- La **integración continua** (E05 y E10): el resultado de la CI está en GitHub, no en el repositorio clonado. Si se puede consultar (`gh run list -R <repositorio> --limit 30`), se comprueba que el último commit de la rama antes de la fusión tenía la CI en verde y que `.github/workflows/calidad.yml` no ha cambiado respecto a la plantilla (`git diff <commit inicial> <commit evaluado> -- .github/`). Un workflow modificado se anota siempre en el comentario y en «Dudas para el profesor»; si la CI no se puede consultar, se anota también.

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
Corrige el ejercicio E10-FeatureEnMain del alumno <username> siguiendo
UD2_FlujoContexto/soluciones/CORRECCION.md. Su entrega está en
correcciones/E10-FeatureEnMain/entregas/<username>/ y su historial en
correcciones/E10-FeatureEnMain/<username>.datos.json. Completa el informe
correcciones/E10-FeatureEnMain/<username>.md.
```

Para corregir todos los alumnos de una tarea, la misma petición con «todos los alumnos de `correcciones/E10-FeatureEnMain/`», un informe por alumno.

Si la IA no tiene acceso al repositorio (por ejemplo, un chat web), adjunta estos ficheros en la conversación: `CORRECCION.md`, `ENUNCIADO.md`, `rubrica.md`, el `README.md` del ejercicio, la solución de referencia, `<username>.datos.json`, los ficheros de `entregas/<username>/` y la plantilla del informe. Revisa antes las normas del centro sobre datos personales.

---

## Ejercicios de la unidad

| Ejercicio | Criterios | Qué se valora |
|-----------|-----------|---------------|
| [E01-RecorridoFeature](./E01-RecorridoFeature/rubrica.md) | OA2 a | Fase, artefacto, agente y punto de control de cada paso; dónde se corrige cada problema; fallos del flujo en el historial; replanificación |
| [E02-PlanErroresSembrados](./E02-PlanErroresSembrados/rubrica.md) | OA2 b | Errores del plan localizados y nombrados, plan corregido |
| [E03-PlanFeature](./E03-PlanFeature/rubrica.md) | OA2 b | Plan de B con decisiones justificadas y estrategia de pruebas completa, revisión del punto de control 2, sesión, decisiones, rama e historial |
| [E04-PlanTasks](./E04-PlanTasks/rubrica.md) | OA2 c | Tasks pequeñas, ordenadas, verificables y trazables; errores de unas tasks detectados |
| [E05-CiclosCortos](./E05-CiclosCortos/rubrica.md) | OA2 c | Ciclos por grupo de tasks, revisión de cada ciclo, parada ante el hueco de la spec, código y tests, commits y fusión |
| [E06-EstadoProyecto](./E06-EstadoProyecto/rubrica.md) | OA2 d | Incoherencias de estado diagnosticadas y corregidas, índice coherente, reordenación con `git mv`, commit de replanificación |
| [E07-ContextoJusto](./E07-ContextoJusto/rubrica.md) | OA2 e | Diagnóstico de problemas de contexto, contexto de cada fase, tipos de memoria |
| [E08-MemoriaAgente](./E08-MemoriaAgente/rubrica.md) | OA2 f | `AGENTS.md` corto y verdadero, regla de carpeta, skill, comando, subagente con permisos mínimos comprobados |
| [E09-CambioOpenSpec](./E09-CambioOpenSpec/rubrica.md) | OA2 d | Propuesta de cambio con deltas, aplicación, archivo y specs vigentes actualizadas |
| [E10-FeatureEnMain](./E10-FeatureEnMain/rubrica.md) (integrador) | OA2 a, b, c, d, e, f | Feature C de la lista de tareas de principio a fin: plan, tasks, ciclos, rama, fusión, replanificación, uso de los comandos, sesión, decisiones e historial |

## Validar las soluciones de referencia

Tras cambiar un ejercicio o su solución, desde la raíz del repositorio del profesor:

```bash
herramientas/validar-mermaid.sh UD2_FlujoContexto     # diagramas
herramientas/validar-gherkin.sh UD2_FlujoContexto     # escenarios de Gherkin de las specs de partida
herramientas/generar-criterios.py UD2_FlujoContexto   # regenera criterios-evaluacion.md
```

Las soluciones con código y los proyectos de partida (E03 a E06 y E08 a E10) se comprueban además con `npm ci`, `npm test` y `npm run estado` en Docker (`node:24-alpine`), igual que los ejemplos de los temas; la plantilla del E06 tiene que fallar en `npm run estado`, porque es lo que se diagnostica. La memoria del agente (E08, E10) se comprueba con OpenCode 2.3.2 (`opencode debug agents` y, en la interfaz, `/skills` y la lista de comandos), y el cambio del E09, con OpenSpec 1.16 (`openspec validate --all --strict` y `openspec archive`).
