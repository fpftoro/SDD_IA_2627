# E07 · EARS y Gherkin

**Tipo:** autocorrección

Reescribe en EARS los requisitos vagos de una feature, convierte sus criterios de aceptación en escenarios de Gherkin y transforma escenarios imperativos en declarativos. Comprueba la sintaxis de tus escenarios con un script.

**Criterios:** OA1 f

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), la feature C es «Registrar el préstamo de un portátil». El equipo ha acordado en la constitución escribir los **requisitos y los *edge cases* en EARS** y los **criterios de aceptación en Gherkin** (tema 6, apartado 6.5). Pero las notas que hay de esta feature están escritas sin notación: las tienes, con los datos de la feature, en [`material.md`](./material.md).

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, que instala las dependencias del proyecto. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. No necesitas el agente.

Para comprobar la sintaxis de tus escenarios, ejecuta en la terminal del contenedor:

```bash
npm run validar
```

El script lee los ficheros `.feature` y los bloques de Gherkin de los ficheros Markdown de `docs/` y del `README.md`, y te dice si son válidos o en qué línea está el error. Comprueba solo la **sintaxis**: que un escenario sea válido no quiere decir que esté bien escrito.

## Requisitos

1. **EARS (parte A de `material.md`).** Reescribe cada requisito V1–V11 en EARS, en español, en la tabla «Requisitos en EARS» del README:
   - indica el **patrón**: ubicuo, por evento, por estado, no deseado, opcional o combinado;
   - usa la plantilla del tema 6 (apartado 6.2.2) y termina siempre con *el sistema deberá…* y una respuesta concreta: los errores, con su código HTTP y su mensaje;
   - un requisito por fila: si al reescribir uno ves que son dos, sepáralos en dos filas (`V2a`, `V2b`);
   - usa al menos una vez cada uno de los cinco patrones y un patrón combinado.
2. **Gherkin (parte B).** Escribe los criterios AC-01 a AC-05 en `docs/specs/C-registrar-prestamo/criterios.feature`:
   - con `# language: es` en la primera línea y una `Característica`;
   - con unos `Antecedentes` que dejen preparados los tres portátiles de partida, usando una **tabla de datos** (tema 6, apartado 6.3);
   - un `Escenario` por criterio, con el identificador al principio del nombre (`Escenario: AC-01 …`);
   - AC-04 como **`Esquema del escenario`** con una tabla de `Ejemplos` de al menos cuatro filas;
   - escenarios **declarativos**: comportamiento y respuesta de la API, no la interfaz.
3. **Imperativo a declarativo (parte C).** Reescribe los dos escenarios imperativos en la sección «Escenarios declarativos» del README. Para cada uno, di qué detalles has quitado y por qué.
4. Ejecuta `npm run validar` hasta que no haya errores y pega la salida en la sección «Validación» del README.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `material.md`, `package.json`, `herramientas/` | Sin cambios |
| `docs/specs/C-registrar-prestamo/criterios.feature` | Los escenarios de la parte B, en español, que pasan `npm run validar` |
| `README.md` | Secciones «Requisitos en EARS», «Escenarios declarativos» y «Validación», con la tabla de la plantilla |
| Valores de la columna «Patrón» | `ubicuo`, `por evento`, `por estado`, `no deseado`, `opcional` o `combinado` |

## Comprueba tu solución

- `npm run validar` termina con `✅ 2 documentos de Gherkin sin errores`: tu `criterios.feature` y el bloque de la sección «Escenarios declarativos» del README. Si dice uno, el script no encuentra tu `.feature`: revisa su ruta y su extensión.
- Cada fila de EARS empieza por la palabra clave de su patrón (*Cuando*, *Mientras*, *Si… entonces*, *Donde*) o por *El sistema deberá* si es ubicuo, y en los combinados el estado va antes que el evento.
- Has usado *Si… entonces* **solo** para lo que no debería pasar. Ojo con V8: empieza por «si», pero ¿describe un error o un estado que dura?
- Ninguna respuesta dice «avisar», «gestionar» o «funcionar bien»: todas son concretas.
- V2 y V3, ¿son el mismo requisito o dos? Si los juntas en uno, ¿queda una sola respuesta?
- En los escenarios no aparece ningún botón, color, URL de la página ni tiempo de espera.
- Cada escenario comprueba una sola cosa y su *Entonces* se puede comprobar con un test.
- Los cinco criterios AC-01 a AC-05 tienen su escenario, con su identificador en el nombre.

## Al terminar

Haz un commit con tus escenarios y tus respuestas. Después, **borra el contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
