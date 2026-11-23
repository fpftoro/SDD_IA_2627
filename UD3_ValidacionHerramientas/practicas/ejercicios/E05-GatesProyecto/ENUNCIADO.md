# E05 · Los gates del proyecto

**Tipo:** autocorrección

Monta los *quality gates* del préstamo de portátiles: lint con las reglas de capas de la constitución, cobertura con umbral, trazabilidad y estado, todo en el workflow de GitHub Actions que ya tienes de la UD2, ampliado. Después, comprueba que los gates **paran** un cambio que incumple la arquitectura.

**Criterios:** OA3 c

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada y todos sus tests en verde. No tiene linter ni cobertura, y su integración continua es la de la UD2: el workflow `.github/workflows/calidad.yml` con un único *job* que ejecuta `npm test` en cada `push`. La constitución (`constitution.md`) define cuatro capas: rutas → controladores → servicios → repositorios.

En [`material/controlador-portatiles.js`](./material/controlador-portatiles.js) tienes una versión del controlador que **funciona igual** (los tests pasan), pero lee del repositorio directamente. La usarás para comprobar que los gates la detectan.

## Entorno de trabajo

Abre la carpeta en el **Dev Container**. No necesitas el agente. Necesitas que tu repositorio de trabajo esté en **GitHub** para que se ejecute la integración continua.

## Requisitos

1. **Lint.** Instala ESLint (`eslint`, `@eslint/js` y `globals`) y escribe `eslint.config.js` con:
   - las reglas recomendadas y las variables globales de Node;
   - una regla `no-restricted-imports` por capa, para que **cada capa solo llame a la de debajo**, con un mensaje que cite la constitución.

   Añade el script `lint` y comprueba que el código actual no tiene errores.
2. **Cobertura.** Instala `@vitest/coverage-v8`, configura `vitest.config.js` con la cobertura de `src/` (sin `servidor.js`) y un **umbral** de líneas y de ramas. Añade el script `cobertura`. Escribe en la constitución una sección **«Calidad»** con el umbral y por qué lo has elegido.
3. **Trazabilidad.** Añade `herramientas/comprobar-trazabilidad.sh` (tema 3, apartado 3.5.1) y el script `trazabilidad`.
4. **`AGENTS.md`.** Añade los comandos nuevos.
5. **Integración continua.** Amplía `.github/workflows/calidad.yml` hasta tener **un *job* por tipo de gate**: lint, tests con cobertura (el *job* `tests` de partida pasa a ejecutar `npm run cobertura`) y trazabilidad con estado (`npm run estado`). Añade, solo en las ramas, el gate de spec existente (tema 3, apartado 3.5.3). Sube `main` y comprueba en la pestaña **Actions** que todo está en verde.
6. **Una ejecución en rojo.** Crea la rama `prueba-gates`, copia `material/controlador-portatiles.js` sobre `src/controladores/controlador-portatiles.js`, haz un commit y súbela. Anota qué *jobs* fallan, con la línea del registro que explica cada fallo. **No la fusiones.**
7. **Lo que no detectan.** Describe un cambio en el código de A que incumpla la spec y que **pase todos tus gates**. ¿Qué lo detectaría?

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `eslint.config.js`, `vitest.config.js` | Las configuraciones de los requisitos 1 y 2 |
| `herramientas/comprobar-trazabilidad.sh` | El script del tema 3 |
| `.github/workflows/calidad.yml` | El workflow de la UD2 ampliado (requisito 5) |
| `package.json` | Scripts `lint`, `cobertura` y `trazabilidad`, y las dependencias de desarrollo nuevas |
| `constitution.md` | Sección «Calidad» |
| `AGENTS.md` | Los comandos nuevos |
| Rama `prueba-gates` | Subida, sin fusionar, con el controlador del material |
| `README.md` | Secciones «Lint», «Cobertura», «Trazabilidad», «Integración continua», «Una ejecución en rojo», «Lo que no detectan» y «Commits» |

## Comprueba tu solución

- `npm run lint`, `npm run cobertura`, `npm run trazabilidad` y `npm run estado` terminan sin errores en `main`.
- Si haces que un controlador importe un repositorio, el lint falla con tu mensaje.
- El umbral está por debajo de la cobertura actual, pero cerca, y la constitución dice por qué.
- El workflow usa `npm ci`, solo permisos de lectura y `fetch-depth: 0` en el *job* que compara con `main`.
- Si falla el primer paso de un *job*, el segundo se ejecuta igual cuando tiene sentido (`if: ${{ !cancelled() }}`).
- En la rama `prueba-gates`, los tests siguen en verde y fallan dos *jobs*: ¿sabes cuáles y por qué?
- Tu respuesta de «Lo que no detectan» describe un cambio concreto, no una idea general.

## Al terminar

Sube `main` y la rama `prueba-gates`. Cierra el Dev Container.
