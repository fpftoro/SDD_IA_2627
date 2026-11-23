# E02 · Handoffs y seguridad

**Tipo:** autocorrección

Los agentes del préstamo se pasan trabajo entre sí. Mejora tres encargos mal escritos, redacta un *handoff* entre roles, encuentra los agujeros de seguridad de cinco agentes y corrígelos, y decide qué acciones del flujo deben hacer las personas.

**Criterios:** OA4 b

## El caso

Estás en el equipo del préstamo de portátiles con la feature D («Registrar la devolución») aprobada: su spec, su plan y sus tasks están en `docs/specs/D-registrar-devolucion/`. Los encargos están en [`encargos.md`](./encargos.md), los agentes en `agentes-propuestos/` y las acciones en [`trazabilidad.md`](./trazabilidad.md). Repasa antes los apartados 1.7 y 1.10 del tema 1.

## Entorno de trabajo

Abre la carpeta en su **Dev Container** (trae OpenCode; no hace falta conectar un proveedor). Escribe las respuestas en el `README.md`.

## Requisitos

1. **Tres encargos.** Para cada encargo de `encargos.md`, en «Encargos»: qué le falta o qué está mal (un subagente empieza con la ventana vacía y el encargo es todo su contexto) y el encargo reescrito con **objetivo**, **dónde buscar o qué documentos**, **límites** y **qué devolver** (el formato de la respuesta). En el tercero, además, qué contradice los permisos del agente.
2. **Un *handoff* entre roles.** El `arquitecto` ha terminado el plan y las tasks de D y pasa el grupo 2 al `implementador` (los tests del grupo 1 ya los escribió y revisó una persona). Escribe el *handoff* en «*Handoff*» con objetivo, documentos, estado, límites y qué devolver. Después contesta: ¿qué falta en el plan que obligaría al *handoff* a explicar una decisión? ¿Dónde se corrige?
3. **Cinco agentes con agujeros.** Cada fichero de `agentes-propuestos/` tiene al menos un fallo de seguridad respecto a su descripción. Ejecuta
   ```bash
   cp agentes-propuestos/*.md .opencode/agents/
   opencode debug agents | node herramientas/permisos.mjs <nombre>
   ```
   y rellena la tabla «Agujeros»: agente, fallo, **qué podría hacer** por él y la regla corregida. Después **corrige** los cinco ficheros en `.opencode/agents/` y comprueba de nuevo los permisos; pega la salida de los cinco agentes corregidos.
4. **Personas y trazabilidad.** En `trazabilidad.md` hay seis acciones. Indica en «Personas y agentes» si la hace una **persona**, un **agente** o un **agente con persona que revisa**, y por qué. Después escribe: (a) el mensaje de commit que dejarías cuando el `arquitecto` escribe el plan; (b) dónde queda registrada la decisión de no reutilizar `ErrorNoEncontrado` si un plan la tomara.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `encargos.md`, `trazabilidad.md`, `agentes-propuestos/` y `docs/` | Sin cambios: es el material que analizas |
| `.opencode/agents/revisor.md`, `documentador.md`, `implementador.md`, `consultor.md`, `arquitecto.md` | Los cinco corregidos, con estos nombres |
| `README.md` | Secciones «Encargos», «*Handoff*», «Agujeros», «Agentes corregidos» y «Personas y agentes», con las tablas de la plantilla |

## Comprueba tu solución

- Cada encargo reescrito se entiende sin haber visto la conversación anterior.
- El tercer encargo no pide al artesano nada que sus permisos no le permitan.
- El *handoff* no repite la spec: apunta a ella y a las tasks, y dice qué se devuelve (ficheros cambiados y resultado de los tests).
- Has encontrado el agujero de `subagent` del revisor y el del orden de las reglas del documentador.
- Ningún agente corregido puede, directa o indirectamente, hacer más de lo que dice su descripción.
- Has razonado si el orden de las reglas del consultor es un agujero real o no.
- Aprobar una spec y fusionar en `main` son acciones de una persona.

## Al terminar

Haz un commit con los cinco agentes corregidos y el README.
