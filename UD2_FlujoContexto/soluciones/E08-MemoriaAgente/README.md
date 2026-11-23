# E08-MemoriaAgente

## La memoria del agente

### Descripción

Solución del **Ejercicio 8** (autocorrección, con agente). El alumno revisa un `AGENTS.md` con falsedades sembradas en el proyecto del préstamo de portátiles y crea la memoria del proyecto: una regla de carpeta para los tests, una skill para añadir un error HTTP nuevo, un comando que revisa un plan sin modificarlo y un subagente revisor con permisos mínimos. Lo comprueba con los comandos de diagnóstico de OpenCode y en una sesión.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E08-MemoriaAgente`](../../practicas/ejercicios/E08-MemoriaAgente/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 8 | La memoria del agente | Instrucciones persistentes y contextuales, skills, comandos y agentes con permisos mínimos (OA2 f) |

### Estructura

```text
E08-MemoriaAgente/
├── README.md      ← este fichero
├── rubrica.md
└── solucion/      ← el proyecto al terminar
    ├── README.md  ← respuesta modelo
    ├── AGENTS.md  ← revisado
    ├── tests/AGENTS.md
    └── .opencode/ ← agents/revisor.md, commands/revisar-plan.md, skills/error-api/SKILL.md
```

**Comprobado con OpenCode 2.3.2** (paquete `@opencode/cli`, en Docker con la imagen del Dev Container): `opencode debug agents` muestra `revisor` como `subagent`, con `edit` en `deny`, la terminal limitada a los cuatro comandos y `subagent`, `webfetch` y `websearch` en `deny`; el servicio de OpenCode carga la skill `error-api` y el comando `revisar-plan`. **Sin la regla de `subagent`, la regla de serie (`*` con `*` en `allow`) se lo permitía**: podía encargar trabajo a `general`, que edita. No se han probado con proveedor `/skills`, la lista de comandos de la interfaz ni las sesiones de la fase 4.

### Problemas sembrados en `AGENTS.md`

Catorce, más una omisión (el enunciado pide al menos diez): una frase obsoleta, dos comandos que no existen, un puerto falso, dos carpetas falsas, la estructura incompleta, un comando que falta, una sección que duplica la constitución, una regla vaga, tres reglas que contradicen la constitución (validar en el controlador, `{ message }`, dependencias libres), una que contradice el flujo (el agente cambia el estado) y la falta de «Al empezar una sesión».

### Conceptos aprendidos

- `AGENTS.md` es corto, concreto y **verdadero**: cada comando existe y cada carpeta está ahí. No repite la constitución.
- Una regla de carpeta (`tests/AGENTS.md`) dice cómo son las cosas en una parte del proyecto y entra solo cuando hace falta.
- Una skill es un procedimiento; su descripción decide si el agente la carga.
- Un comando es un prompt guardado; su `agent` garantiza lo que puede hacer, no el texto.
- Los permisos de un agente se comprueban con `opencode debug agents`. Lo que no se prohíbe queda permitido por la regla de serie, y hay que cerrar también las acciones que permiten actuar **a través de otro agente** (`subagent`).

### Errores frecuentes

- Revisar `AGENTS.md` leyéndolo, sin ejecutar los comandos ni mirar las carpetas.
- Dejar la sección de principios «por si acaso» o copiar la constitución entera.
- Mezclar en `tests/AGENTS.md` el procedimiento de la skill (o al revés).
- Una skill con una descripción vaga («Errores de la API») o con un `name` distinto del de su carpeta.
- Un comando de revisión con `agent: build`, que puede editar aunque el prompt diga que no.
- Un revisor con `edit` en `deny` pero sin cerrar `subagent`, o con la terminal abierta a todo.
- Pegar la salida de `opencode debug agents` entera, sin señalar lo que importa.

### Otras soluciones válidas

- Otra estructura de `AGENTS.md` (por ejemplo, sin «Al empezar una sesión», si el índice se carga de otra forma), siempre que sea verdadero y no repita la constitución.
- Un revisor con un `model` económico, si el alumno ha comprobado que ese modelo existe con `opencode models`.
- Permitir al revisor `npm run estado` además de los comandos pedidos.
- Dejar `webfetch` o `websearch` permitidos si se justifica (por ejemplo, para consultar la documentación de Express), pero no `subagent`.
- Que en la fase 4 el agente no cargue la skill: vale si el alumno lo detecta y mejora la descripción.
