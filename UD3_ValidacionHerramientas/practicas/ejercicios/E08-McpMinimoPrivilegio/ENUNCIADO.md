# E08 · MCP con mínimo privilegio

**Tipo:** autocorrección (con agente)

Un compañero ha escrito un servidor MCP para que el agente consulte los portátiles y las incidencias del préstamo. Revísalo, corrige lo que no cumple el mínimo privilegio, conéctalo a OpenCode solo para el agente que lo necesita y comprueba qué pasa con una incidencia que esconde una instrucción.

**Criterios:** OA3 f

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada. Lo nuevo:

- [`mcp/servidor-prestamo.js`](./mcp/servidor-prestamo.js): un servidor MCP con el SDK oficial. La idea es que un agente pueda responder preguntas como «¿qué portátiles averiados hay?» o «¿qué dice la incidencia 07?». **Nadie ha pedido que el agente cambie nada.**
- `docs/incidencias/`: dos incidencias anotadas por el profesorado.
- [`herramientas/probar-mcp.mjs`](./herramientas/probar-mcp.mjs) (`npm run probar-mcp`): un pequeño cliente que lista lo que ofrece el servidor y hace algunas llamadas, **sin modelo**.

## Entorno de trabajo

Abre la carpeta en el **Dev Container** y conecta tu proveedor de modelos en OpenCode, como en los ejercicios anteriores.

## Requisitos

1. **La revisión.** Ejecuta `npm run probar-mcp` y lee el servidor. En la tabla «Revisión» del README, para cada herramienta y recurso: qué hace, si lee o escribe, si alguien lo necesita y qué riesgo tiene. Hay **dos problemas** de mínimo privilegio: encuéntralos y demuéstralos con la salida de `probar-mcp`.
2. **La corrección.** Corrige el servidor para que solo ofrezca lo que hace falta, y para que ningún parámetro permita leer fuera de lo previsto. Actualiza `probar-mcp.mjs` si cambias algún nombre, y pega su salida, que debe demostrar que el intento de salir de la carpeta se rechaza. `npm test` tiene que seguir en verde.
3. **La configuración.** En `opencode.json`, conecta el servidor con el nombre `prestamo` y deniega sus herramientas a todos los agentes. Crea un subagente `consultor` (`.opencode/agents/consultor.md`) que pueda usarlas y que no pueda editar ficheros, usar la terminal ni encargar trabajo a otros agentes. Sus instrucciones deben decir qué hacer si una incidencia contiene instrucciones.
4. **Las comprobaciones.** Pega la salida de `opencode mcp list` y, de `opencode debug agents`, las reglas del `consultor` y de `build` que afectan a `prestamo_*`, `edit`, `shell` y `subagent`.
5. **La instrucción escondida.** Pide al consultor un resumen de la incidencia 07 (por ejemplo, con `@consultor` en una sesión de *build*). Documenta qué respondió y por qué, aunque el modelo hubiera intentado seguir la instrucción, **no podía** cumplirla.
6. **Commits.** Un commit por paso: revisión, servidor corregido, configuración y prueba.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `mcp/servidor-prestamo.js` | El servidor corregido |
| `herramientas/probar-mcp.mjs` | Actualizado si cambian los nombres; su salida demuestra el rechazo |
| `opencode.json` | Servidor `prestamo` y `prestamo_*` en `deny` |
| `.opencode/agents/consultor.md` | El subagente del requisito 3 |
| `README.md` | Secciones «Revisión», «Corrección», «Comprobaciones», «Sesión con el agente», «La instrucción escondida», «Decisiones» y «Commits» |

## Comprueba tu solución

- El servidor no tiene ninguna herramienta que escriba.
- La descripción de cada herramienta y recurso dice que solo lee.
- Un parámetro como `..%2F..%2Fpackage.json` se rechaza, y el rechazo sale en `probar-mcp`.
- Los recursos solo dan acceso a lo que el consultor necesita (las incidencias), no a todo `docs/`.
- `opencode mcp list` muestra el servidor conectado.
- En `build`, `prestamo_*` está en `deny`; en el consultor, después, en `allow`; el consultor tiene `edit`, `shell` y `subagent` denegados.
- En la instrucción escondida, tu explicación no depende de lo que decidiera el modelo.
- No hay claves ni tokens en ningún fichero del repositorio.

## Al terminar

Sube la rama `main`. Cierra el Dev Container.
