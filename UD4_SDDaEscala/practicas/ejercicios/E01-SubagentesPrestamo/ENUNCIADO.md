# E01 · Subagentes del préstamo

**Tipo:** autocorrección

El equipo del préstamo de portátiles va a trabajar con varios agentes. Decide qué trabajo compensa repartir y qué no, define tres agentes con su rol, sus permisos y su modelo, y comprueba con OpenCode que los permisos son los que querías.

**Criterios:** OA4 a

## El caso

Partes del proyecto del préstamo con las features A y B implementadas y C y D con la spec aprobada (`docs/specs/README.md`). Las situaciones están en [`situaciones.md`](./situaciones.md). Repasa antes los apartados 1.1 a 1.6 del tema 1 de la unidad.

## Entorno de trabajo

Abre la carpeta en su **Dev Container**, que trae OpenCode (no hace falta conectar ningún proveedor: solo vas a comprobar la configuración, no a lanzar sesiones). Escribe tus respuestas en el `README.md`.

## Requisitos

1. **Situaciones.** Para cada una de las ocho de `situaciones.md`, en la tabla «Situaciones» del README:
   - si **compensa** un agente aparte (**sí**, **no** o **depende**, y de qué);
   - qué **problema** resuelve de los del apartado 1.1.2 del tema (contexto, permisos, revisión independiente, coste, paralelismo, privacidad) o, si no compensa, por qué la coordinación cuesta más que el beneficio;
   - en las que sí, **qué agente** haría el trabajo.
2. **Tres agentes.** Crea en `.opencode/agents/` estos ficheros, con la descripción y las instrucciones en español:
   - `arquitecto.md` (`mode: primary`): el rol *Architect*. Solo puede editar el `plan.md` y el `tasks.md` de las features, solo lee en Git y solo puede encargar trabajo a *explore*.
   - `implementador.md` (`mode: subagent`): el rol *Builder*. Solo puede editar `src/`; no puede tocar los tests, las specs ni la configuración; ejecuta los tests y el lint sin preguntar y pregunta antes de cualquier otro comando; no encarga trabajo a nadie.
   - `artesano.md` (`mode: subagent`): el rol *Craftsman*. No edita nada, no encarga trabajo, y solo ejecuta los tests, el lint y `git log`.

   Ningún agente tiene acceso a la web. No pongas `model:` en los ficheros: la elección del modelo va en el README.
3. **Roles y modelo.** En la tabla «Agentes y roles» del README: rol, qué edita, qué terminal tiene, a quién encarga trabajo y **qué tipo de modelo** le darías (el más capaz, intermedio, económico o local) con la razón, usando los criterios de capacidad, coste y privacidad del apartado 1.6.
4. **Comprobación.** Ejecuta para cada agente
   ```bash
   opencode debug agents | node herramientas/permisos.mjs <nombre>
   ```
   y pega la salida en «Comprobación». Después responde: (a) ¿puede el implementador modificar `tests/servicio-carros.test.js`? ¿Y `src/servicios/servicio-carros.js`? (b) ¿Puede el artesano modificar un fichero a través de otro agente? ¿Por qué? (c) Si al arquitecto le dejaras `subagent` en `allow` para `*`, ¿qué agravaría y a quién podría encargar trabajo?
5. **Topología.** En «Topología», un diagrama Mermaid con la persona, los tres agentes y *explore*, y una frase que diga **qué topología** es y **quién coordina**.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `situaciones.md` | Sin cambios: es el material que analizas |
| `.opencode/agents/arquitecto.md`, `implementador.md`, `artesano.md` | Con estos nombres exactos y con la cabecera (`description`, `mode`, `permissions`) |
| `README.md` | Secciones «Situaciones», «Agentes y roles», «Comprobación» y «Topología», con las tablas de la plantilla |

## Comprueba tu solución

- Ninguno de los tres agentes tiene `subagent` abierto a `general` ni a `*`.
- El implementador no puede editar nada fuera de `src/`, y el artesano y el arquitecto no pueden editar código.
- La salida de `permisos.mjs` de cada agente coincide con lo que dice tu tabla de roles.
- En las situaciones en las que has dicho que no compensa, la razón es concreta (no «es mejor hacerlo uno mismo»).
- Hay al menos una situación con «depende» y dices de qué.
- La situación 7 no se resuelve con un agente: es un punto de control de una persona.

## Al terminar

Haz un commit con los tres agentes y el README. Si has abierto el Dev Container, ciérralo cuando termines.
