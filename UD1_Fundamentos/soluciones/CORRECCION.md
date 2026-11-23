# Corrección de los ejercicios · UD1

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

Para corregir un ejercicio en clase basta con el repositorio de trabajo del alumno (o su carpeta), la `rubrica.md` y una copia de [`comun/informe-plantilla.md`](./comun/informe-plantilla.md). Se siguen los pasos 3 y 4. Si el ejercicio pide commits, se miran con `git log --oneline --name-only` en el repositorio del alumno.

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

## Paso 2. Preparar la corrección

Desde la raíz del repositorio del profesor:

```bash
herramientas/corregir.sh UD1_Fundamentos E10-SpecAprobada ~/entregas/e10 <prefijo> "<AAAA-MM-DD HH:MM>"
```

- Toma el **último commit anterior a la fecha límite** (si no se indica fecha, el último commit).
- **No ejecuta** nada del repositorio del alumno.
- Genera en `correcciones/E10-SpecAprobada/` (carpeta excluida de Git):
  - `entregas/<username>/`: copia del repositorio en el commit evaluado. **Es lo que se corrige.**
  - `<username>.datos.json`: commit evaluado, fecha y el historial de commits propios (sin el inicial de la plantilla), con sus mensajes y los ficheros que cambia cada uno.
  - `<username>.md`: el informe con la cabecera rellena, listo para completar. Si ya existe, no se sobrescribe.

Si un alumno no tiene commits antes de la fecha límite, `<username>.datos.json` lleva `"sinEntrega": true` y no hay carpeta en `entregas/`.

## Paso 3. Aplicar la rúbrica

Para cada criterio de `rubrica.md`, en orden:

1. Abre lo que indica **«Dónde mirar»** en `entregas/<username>/` y, si el criterio habla del historial, en `<username>.datos.json`.
2. Si el criterio tiene un **requisito previo** y no se cumple, el nivel es 0.
3. Elige el nivel cuyo descriptor se cumple **completo**. Si dudas entre dos, elige el inferior y anótalo en «Dudas para el profesor».
4. Anota la **evidencia**: `fichero:línea` o una frase citada entre comillas.
5. Consulta los **errores frecuentes** y las **otras soluciones válidas** del `README.md` del ejercicio antes de penalizar algo que no coincide con la solución de referencia.

En esta unidad casi todo lo que se corrige es **texto**: specs, tablas, justificaciones. Una spec del alumno puede ser válida aunque sus requisitos, sus identificadores o su redacción no coincidan con la solución: lo que se valora es lo que pide el descriptor (que cada requisito sea atómico y verificable, que cada *edge case* tenga una respuesta exacta…), no el parecido con la referencia.

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

E03, E08, E09 y E10 (y la parte opcional de E01) se hacen con OpenCode. El agente no produce siempre lo mismo, así que **no se corrige lo que generó el agente, sino el proceso y los artefactos del alumno**:

- La sección **«Sesión con el agente»** del README: prompts concretos, qué produjo el agente y qué corrigió el alumno en cada paso.
- La sección **«Decisiones»**: qué propuestas del agente aceptó o rechazó y con qué motivo. Rechazar una propuesta con un buen motivo puntúa igual que aceptarla.
- Los **artefactos** finales (spec, `AGENTS.md`, constitución, índice), con los mismos descriptores que si los hubiera escrito sin agente.
- El **historial de commits**: un commit por fase, con mensajes descriptivos.

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
Corrige el ejercicio E10-SpecAprobada del alumno <username> siguiendo
UD1_Fundamentos/soluciones/CORRECCION.md. Su entrega está en
correcciones/E10-SpecAprobada/entregas/<username>/ y su historial en
correcciones/E10-SpecAprobada/<username>.datos.json. Completa el informe
correcciones/E10-SpecAprobada/<username>.md.
```

Para corregir todos los alumnos de una tarea, la misma petición con «todos los alumnos de `correcciones/E10-SpecAprobada/`», un informe por alumno.

Si la IA no tiene acceso al repositorio (por ejemplo, un chat web), adjunta estos ficheros en la conversación: `CORRECCION.md`, `ENUNCIADO.md`, `rubrica.md`, el `README.md` del ejercicio, la solución de referencia, `<username>.datos.json`, los ficheros de `entregas/<username>/` y la plantilla del informe. Revisa antes las normas del centro sobre datos personales.

---

## Ejercicios de la unidad

| Ejercicio | Criterios | Qué se valora |
|-----------|-----------|---------------|
| [E01-DecisionesImplicitas](./E01-DecisionesImplicitas/rubrica.md) | OA1 a | Decisiones implícitas encontradas y su consecuencia, elección entre *vibe coding* y SDD, niveles de SDD |
| [E02-CadaCosaEnSuSitio](./E02-CadaCosaEnSuSitio/rubrica.md) | OA1 b | Clasificación de artefactos y de capas de contexto, justificación de los casos dudosos |
| [E03-EntornoOpenCode](./E03-EntornoOpenCode/rubrica.md) | OA1 c | Dev Container, `AGENTS.md` revisado, constitución en `instructions`, permisos, comprobación con *plan*, sesión e historial |
| [E04-EpicoFeatures](./E04-EpicoFeatures/rubrica.md) | OA1 d | Clasificación de la jerarquía, features con valor propio, orden por dependencias, índice |
| [E05-EdgeCases](./E05-EdgeCases/rubrica.md) | OA1 e | *Edge cases* con respuesta exacta, decisiones de diseño marcadas, fuera de alcance |
| [E06-ErroresSembrados](./E06-ErroresSembrados/rubrica.md) | OA1 e | Antipatrones localizados y nombrados, correcciones |
| [E07-EarsGherkin](./E07-EarsGherkin/rubrica.md) | OA1 f | Patrones EARS bien elegidos y completos, escenarios Gherkin declarativos y válidos, esquema del escenario |
| [E08-VagaRigida](./E08-VagaRigida/rubrica.md) | OA1 f | Clasificación vaga/rígida/adecuada, sitio de cada decisión, revisión con el agente y decisiones justificadas |
| [E09-SpecDevolucion](./E09-SpecDevolucion/rubrica.md) | OA1 e, f | Spec completa con notación y granularidad adecuadas, sesión con el agente, decisiones e historial |
| [E10-SpecAprobada](./E10-SpecAprobada/rubrica.md) (integrador) | OA1 c, d, e, f | Entorno y contexto, índice de features, spec de la feature C revisada y aprobada, sesión, decisiones e historial por fases |

## Validar las soluciones de referencia

Tras cambiar un ejercicio o su solución, desde la raíz del repositorio del profesor:

```bash
herramientas/validar-gherkin.sh UD1_Fundamentos     # escenarios de Gherkin de temas y soluciones
herramientas/validar-mermaid.sh UD1_Fundamentos     # diagramas
herramientas/generar-criterios.py UD1_Fundamentos   # regenera criterios-evaluacion.md
```
