# E08-McpMinimoPrivilegio

## MCP con mínimo privilegio

### Descripción

Solución del **Ejercicio 7** (autocorrección, con agente). El alumno revisa un servidor MCP del préstamo de portátiles, encuentra sus dos problemas de mínimo privilegio (una herramienta que escribe y que nadie necesita, y un recurso que permite leer fuera de su carpeta), lo corrige, lo conecta a OpenCode con `deny` por defecto y `allow` solo para un subagente de lectura, lo comprueba y analiza una incidencia con una instrucción escondida.

- Enunciado y material de partida: [`practicas/ejercicios/E08-McpMinimoPrivilegio`](../../practicas/ejercicios/E08-McpMinimoPrivilegio/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 7 | MCP con mínimo privilegio | Conectar el agente a un sistema externo con MCP aplicando el mínimo privilegio (OA3 f) |

### Estructura

```text
E08-McpMinimoPrivilegio/
├── README.md                          ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md                      ← un ejemplo comentado
    ├── mcp/servidor-prestamo.js       ← servidor corregido
    ├── herramientas/probar-mcp.mjs    ← cliente actualizado
    ├── src/repositorios/repositorio-portatiles.js   ← sin cambiarEstado
    ├── opencode.json
    └── .opencode/agents/consultor.md
```

Comprobado en Docker: con el servidor original, `probar-mcp` muestra `cambiar_estado` y lee `package.json` con `doc://..%2Fpackage.json`; con el corregido, solo `listar_portatiles`, y `incidencia://..%2F..%2Fpackage.json` se rechaza; `npm test` en verde en los dos; `opencode mcp list` con el servidor conectado y las reglas del consultor y de *build* en OpenCode 2.3.2. Con la v2, la regla `prestamo_*` cubre las herramientas, pero no la lectura de recursos, que es otra acción (`opencode_read_mcp_resource`, con el recurso `prestamo:<uri>`).

### Problemas sembrados

| Problema | Por qué | Corrección |
|----------|---------|------------|
| `cambiar_estado` | Escribe, nadie lo ha pedido, acepta cualquier texto como estado y es justo lo que pide la instrucción escondida de la incidencia 07 | Quitarla del servidor (y `cambiarEstado` del repositorio, que solo la usaba ella) |
| Recurso `doc://{ruta}` | Concatena la ruta sin comprobarla: `..%2Fpackage.json` sale de `docs/`, y da acceso a todo `docs/` cuando solo hacen falta las incidencias | Recurso limitado a `docs/incidencias/`, con la lista de ficheros que existen y la comprobación del nombre |

### Errores frecuentes

- Dejar `cambiar_estado` y limitarse a denegarla con permisos: protege en OpenCode, pero el servidor sigue ofreciendo algo que nadie necesita a cualquier otro cliente. Se acepta con un nivel menos si se justifica.
- Validar la ruta con «no contiene `..`»: es frágil (codificaciones, rutas absolutas). Mejor comparar con la lista de ficheros que existen.
- Olvidar `decodeURIComponent`, o aplicarlo después de comprobar.
- Un consultor sin la regla de `subagent` en `deny` o con la terminal (`shell`) permitida.
- `prestamo_*` permitido en todo el proyecto en lugar de solo en el consultor.
- Explicar la instrucción escondida como «el modelo se dio cuenta»: la defensa es que la herramienta no existe.

### Otras soluciones válidas

- Mantener el esquema `doc://` con una lista de carpetas permitidas (por ejemplo, specs e incidencias), si se comprueba el fichero contra lo que existe.
- Usar `disabled: true` en el servidor y activarlo solo cuando se usa, además de los permisos.
- Denegar también la lectura de los recursos del servidor en el proyecto (`opencode_read_mcp_resource` con `prestamo:*`) y permitirla en el consultor.
- Si el modelo no detectó la instrucción y no avisó, la respuesta es igual de válida si explica que no podía cumplirla.
