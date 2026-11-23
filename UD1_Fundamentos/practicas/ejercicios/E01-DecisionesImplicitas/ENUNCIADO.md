# E01 · Las decisiones que nadie tomó

**Tipo:** autocorrección

Analiza el código que generó un agente a partir de un prompt vago, encuentra las decisiones que tomó por su cuenta y decide cuándo conviene especificar antes de construir.

**Criterios:** OA1 a

## El caso

La aplicación de préstamo de portátiles del centro (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)) ya está en marcha. Esto es lo que el equipo tiene acordado, aunque **no se lo dijo al agente**:

- Todas las rutas de la API empiezan por `/api/` y están en español (`/api/portatiles`, `/api/prestamos`).
- Los mensajes que ve el usuario están en español. Los errores se devuelven como `{ error: "mensaje" }` con su código HTTP.
- Cada **portátil** tiene un `id`, un `codigo` (`"P-07"`) y un `estado`: `disponible`, `prestado` o `averiado`.
- Cada **préstamo** tiene un `id`, el `portatilId`, el `usuario` que se lo llevó, la `fechaLimite` de devolución y la `fechaDevolucion`, que vale `null` mientras el portátil no se ha devuelto. Los préstamos **no se borran nunca**: son el historial que consulta la coordinación TIC cuando falta un portátil.

Un compañero le pidió al agente:

```text
Haz un endpoint para registrar la devolución de un portátil.
```

El agente generó [`codigo-generado/devoluciones.js`](./codigo-generado/devoluciones.js). En la demo funciona: se devuelve el portátil `P-01` y responde con un 200. No necesitas saber Express para leerlo: cada línea hace lo que dicen sus nombres, y en la UD2 verás cómo se organiza una API.

## Entorno de trabajo

Las partes obligatorias son de lectura y escritura: no necesitas ejecutar nada. Escribe tus respuestas en el `README.md`.

La parte opcional (requisito 5) necesita OpenCode con un proveedor conectado (tema 3). El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, el mismo del tema 3 (apartado 3.3.1). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si ya conectaste el proveedor en otro ejercicio, no hace falta repetirlo: las credenciales están en el volumen `sdd-opencode`.

## Requisitos

1. **Decisiones implícitas.** Lee el código y localiza al menos **seis decisiones** que el agente tomó sin que nadie se las pidiera. Para cada una, en la tabla «Decisiones implícitas» del README:
   - la línea o líneas del código,
   - qué decide el código,
   - una **consecuencia concreta**: qué le pasa a quién y en qué situación (no vale «puede dar problemas»),
   - quién debería haberlo decidido: el **equipo** (cómo se programa), la **coordinación TIC** (cómo se gestionan los portátiles) o la **dirección del centro** (normas que afectan a las personas).
2. **Por qué pasa.** En la sección «Por qué el agente decide», explica con tus palabras, en un párrafo de cinco a ocho líneas:
   - por qué el agente tomó esas decisiones en lugar de preguntar,
   - qué quiere decir que el código se ha convertido en la **especificación de facto**,
   - cuál de los tres principios del tema 1 se ha saltado tu compañero y qué habría cambiado si lo hubiera seguido.
3. **¿*Vibe coding*, prompt cuidado o SDD?** Para cada situación de la tabla del README, elige el enfoque adecuado y justifícalo con un motivo del tema 1 (si el código tiene que durar, si lo mantendrán varias personas, si es un cambio pequeño y localizado, si todavía no se conocen los requisitos…).
4. **Niveles de SDD.** Lee cómo trabajan tres equipos de otros centros (tabla del README) y, para cada uno, indica su nivel de SDD, quién es la fuente de verdad y la frase del texto que te lo indica. Después, en dos o tres líneas, di qué nivel recomendarías para la aplicación de préstamos y por qué.
5. **(Opcional) El mismo prompt, dos veces.** Comprueba que un agente no responde siempre igual:
   1. En la terminal del contenedor, crea una carpeta **fuera** del repositorio (para que el agente no vea el código de este ejercicio) y abre OpenCode en ella:

      ```bash
      mkdir -p ~/prueba-1 && cd ~/prueba-1 && opencode
      ```

   2. Con el agente *build*, pega el prompt de tu compañero tal cual. Cuando termine, sal de OpenCode.
   3. Repite los pasos 1 y 2 en `~/prueba-2`, en una sesión nueva.
   4. Copia el código de cada carpeta a `prueba-agente/ejecucion-1/` y `prueba-agente/ejecucion-2/` del ejercicio (sin `node_modules`, si el agente lo ha creado).
   5. Completa la sección «El mismo prompt, dos veces» del README.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `codigo-generado/devoluciones.js` | Sin cambios: es el material que analizas |
| `README.md` | Secciones «Decisiones implícitas», «Por qué el agente decide», «¿Vibe coding, prompt cuidado o SDD?», «Niveles de SDD» y, si haces la parte opcional, «El mismo prompt, dos veces», con las tablas de la plantilla |
| Parte opcional | El código de cada ejecución en `prueba-agente/ejecucion-1/` y `prueba-agente/ejecucion-2/` |

## Comprueba tu solución

- Tienes al menos seis decisiones y cada una indica sus **líneas**. Si una decisión no tiene línea porque es algo que el código **no hace**, escribe «—» y di qué falta.
- Repasa lo acordado por el equipo en «El caso»: cada punto que el código no respeta es una decisión implícita. Hay al menos cuatro.
- Sigue el código a mano con estos casos y comprueba si los has tenido en cuenta:
  - Se devuelve `P-02`, que está **averiado** y no tiene ningún préstamo abierto. ¿En qué estado queda? ¿Qué pasa en la línea 23 cuando `indice` vale `-1`?
  - La petición llega **sin** `fecha` y la devolución es tardía. ¿Se aplica el bloqueo?
  - La petición llega **sin** `portatilId`. ¿Qué responde el servidor?
- Cada consecuencia nombra a alguien (un profesor, la coordinación TIC, otro usuario) y una situación concreta.
- En la tabla de enfoques no has elegido SDD para todo: algunas situaciones no lo necesitan.
- En «Niveles de SDD», la frase que copias del texto es la que **demuestra** el nivel, no una cualquiera.

## Al terminar

Si has abierto el Dev Container, **borra su contenedor** al acabar: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```

Tus credenciales de OpenCode no se borran: están en el volumen `sdd-opencode`.
