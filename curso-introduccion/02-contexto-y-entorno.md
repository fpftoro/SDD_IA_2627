# 2. El contexto y el entorno

[⬅️ Volver al curso](README.md)

## Qué aprenderás

- Qué es la **ventana de contexto** y por qué más contexto no es mejor.
- Las **tres capas de contexto** de un proyecto: `AGENTS.md`, constitución y spec.
- Lo esencial de **OpenCode**: agentes *plan* y *build*, permisos y sesiones.
- Cómo se prepara el repositorio de trabajo con la **plantilla** del curso.

## 2.1. La ventana de contexto

Un modelo de lenguaje **no recuerda nada** entre una petición y la siguiente. Cada vez que el agente le pregunta algo, le envía **todo lo que necesita saber en ese momento**: las instrucciones, los ficheros que ha leído, la conversación hasta ahí y tu último mensaje. A eso se le llama **contexto**; el máximo que cabe se llama **ventana de contexto**.

Tres consecuencias:

- **Lo que no está en la ventana, no existe** para el modelo: ni lo que hablasteis ayer ni el fichero que no ha leído.
- **Todo lo que está compite por la atención**, sea útil o no. **Más contexto no es mejor:** una sesión larga se llena de propuestas descartadas, errores ya arreglados y ficheros que ya no importan, y el agente empeora.
- **El contexto cuesta** (cuota, dinero o equipo, según el entorno): una sesión larga reenvía su historial en cada petición.

Por eso la regla de oro es dar **lo justo para esta tarea** y escribir en **ficheros** lo que importa para después: la conversación se pierde; el repositorio, no.

## 2.2. Tres capas de contexto

Un proyecto con SDD organiza lo que el agente debe saber en tres capas, de lo más estable a lo más concreto:

| Capa | Pregunta que responde | Alcance | Cambia… |
|------|-----------------------|---------|---------|
| **`AGENTS.md`** | ¿Cómo se trabaja aquí? (comandos, estructura, prohibiciones) | Todo el proyecto | Muy poco |
| **Constitución** | ¿Qué principios no se rompen? (capas, formato de errores, pruebas) | Todo el proyecto | Poco, con acuerdo |
| **Spec** | ¿Qué debe hacer esta funcionalidad? | Una feature | En cada feature |

`AGENTS.md` y la constitución se cargan **siempre**, al empezar cada sesión; la spec la lee el agente cuando trabaja en esa feature. Así el agente recibe lo general sin que tú lo repitas, y lo específico solo cuando hace falta.

| Pregunta del agente | Dónde está la respuesta |
|---------------------|-------------------------|
| ¿Para qué sirve esta aplicación? | `docs/prd.md` |
| ¿Cómo se ejecutan los tests? | `AGENTS.md` |
| ¿Qué formato tienen los errores? | `constitution.md` |
| ¿Qué pasa si la sala no existe? | La spec (un *edge case*) |
| ¿Qué hago ahora? | Tu prompt |

> Si una pregunta no tiene respuesta en ningún artefacto, el agente **la responde por su cuenta**.

Tres reglas para los ficheros que se cargan siempre: **cortos** (cada línea ocupa contexto en todas las sesiones), **concretos** («identificadores en español», no «escribe buen código») y **verdaderos** (una regla falsa es peor que ninguna: «Tests: `npm test`» si no existe ese comando).

## 2.3. Lo esencial de OpenCode

**OpenCode** es el agente que usaremos: el programa que rodea al modelo, prepara su contexto, le da herramientas y decide qué puede hacer. A ese programa también se le llama **arnés (*harness*)**: el modelo pone el razonamiento, y el arnés (*harness*), todo lo demás. Se instala siguiendo su documentación oficial y se conecta **directamente** a tu proveedor de modelos (en el [tema 3 de la UD1](../UD1_Fundamentos/03-entorno-opencode.md) tienes el proceso con detalle). Lo que necesitas ahora:

- **Conectar un modelo:** `/connect` (eliges proveedor y pegas la clave) y `/models` (eliges el modelo). **Las claves nunca van al repositorio.**
- **Dos agentes de serie:** ***plan***, que analiza y propone **sin poder editar** ficheros, y ***build***, que lo puede todo. Se alterna con `Mayús+Tab`. Primero se planifica; después se construye.
- **Mencionar ficheros** con `@`: `@docs/prd.md`. Mejor dar la ruta que pegar el contenido: el agente lee la versión actual.
- **Sesiones:** `/new` empieza una conversación con la ventana vacía; `/undo` deshace el último mensaje y los cambios que hizo. Cuando el agente se desvía por culpa de **tu** mensaje, `/undo` y reescríbelo es mejor que corregir encima.
- **Permisos:** en `opencode.json` y en cada agente se dice qué puede hacer con `allow`, `ask` o `deny`. **Gana la última regla que coincide**, así que lo general va primero y las excepciones, después. Un permiso es una **garantía**; una frase en el prompt, solo una petición.
- **Fuera del proyecto:** OpenCode deja por defecto que el agente lea y edite carpetas que no son las del proyecto. En este curso trabajas en tu propio equipo, sin un contenedor que lo aísle, así que la plantilla se lo prohíbe en `opencode.json` con la acción `external_directory` en `deny`. La única excepción es la carpeta donde *plan* guarda sus notas (`~/.opencode/plan/`).
- **Comprobar la configuración:** `opencode debug agents` muestra todos los agentes con sus permisos finales, en el orden en que se aplican.

## 2.4. La plantilla del curso

Tienes una [plantilla](plantilla/README.md) sin tecnología fija, con todo lo de este curso ya montado:

| Fichero | Para qué |
|---------|----------|
| `constitution.md` | Capas, errores, tiempo, pruebas, seguridad y lista de revisión. **Se rellena con tu tecnología** |
| `AGENTS.md` | Comandos, estructura, flujo y prohibiciones |
| `opencode.json` | Carga la constitución, limita la terminal y no deja salir del proyecto |
| `.opencode/agents/` y `commands/` | Tres agentes y cinco comandos (sesiones 5 y 6) |
| `docs/` | PRD, índice de features y plantillas de spec, plan y tasks |

## Ejercicio: preparar el repositorio y comprobar el efecto del contexto

**Formato:** individual, **con agente** (necesitas OpenCode conectado).

### En clase

**Parte A · El repositorio del ejemplo.**

1. Crea un repositorio nuevo para el ejemplo y copia dentro la carpeta `plantilla/`. `git init` y primer commit: «Plantilla del curso».
2. Abre `constitution.md` y rellena **Tecnología** con la de tu módulo (lenguaje, marco, comando de tests, carpeta de tests, dónde se guardan los datos). **Usa lo que tenga tu módulo.**
3. En `AGENTS.md`, rellena **Comandos** (instalar, arrancar y tests).
4. Copia el [PRD del ejemplo](ejemplo-reservas/docs/prd.md) a `docs/prd.md`. **No copies todavía ninguna spec.** Commit: «Constitución y PRD».

**Parte B · El mismo encargo, con y sin contexto.**

1. En una **carpeta vacía** (sin constitución ni PRD), abre OpenCode con el agente *plan* y pide:

   ```text
   Propón la estructura de ficheros y las funciones principales para
   crear una reserva de una sala del centro. No escribas código.
   ```

   Guarda la respuesta en un fichero aparte.
2. En **tu repositorio**, con una **sesión nueva** (`/new`) y el agente *plan*, pide lo mismo, añadiendo `Lee @docs/prd.md`.
3. Compara las dos respuestas con esta tabla y rellénala:

   | Decisión | Sin contexto | Con contexto |
   |----------|--------------|--------------|
   | Capas (¿separa entrada, lógica y almacenamiento?) | | |
   | Formato de los errores | | |
   | Qué salas y qué horario supone | | |
   | Cómo trata la fecha de hoy | | |
   | Lenguaje y herramientas elegidos | | |

**Parte C · Permisos.** Ejecuta `opencode debug agents` y busca el agente `implementador`. Localiza la regla que le impide editar la carpeta de tests y comprueba qué ocurre si la carpeta de tus tests **no** es `tests/` (tendrás que cambiarla en la sesión 5). Localiza también la regla que impide a todos los agentes salir del proyecto.

### En casa

1. **Parte B, conclusión.** Escribe tres líneas: **qué cambió por tener contexto** y **qué sigue decidiendo el agente por su cuenta** (eso es lo que resolverá la spec en la sesión 3).
2. **Parte D · ¿En qué capa va?** ¿En qué capa o artefacto pondrías cada frase? **(a)** «Usa siempre el comando X para los tests». **(b)** «Si la sala no existe, devuelve el error `sala_desconocida`». **(c)** «La lógica no lee la hora del sistema». **(d)** «Arregla el error de la línea 40».
3. **Parte E · Reglas que se pueden comprobar.** Una regla de constitución vale si alguien (o algo) puede **comprobar** que se cumple. Reescribe estas seis reglas vagas como reglas verificables, y di cómo se comprobaría cada una (revisando el código, con un test o con un comando): **(a)** «El código debe ser limpio». **(b)** «Se validan bien los datos». **(c)** «Los errores se tratan de forma consistente». **(d)** «La aplicación es rápida». **(e)** «Hay buenas pruebas». **(f)** «No se repite código».

**Está hecho cuando:** el repositorio del ejemplo tiene dos commits con la constitución rellena, tienes la tabla y las respuestas, y tienes las seis reglas reescritas con su forma de comprobarlas. (Solución en `soluciones/02-contexto-y-entorno.md`.)

## Quédate con esto

1. La ventana de contexto es **limitada**: más contexto no es mejor; lo justo, y lo importante en ficheros.
2. Tres capas: **`AGENTS.md`** (cómo se trabaja), **constitución** (qué no se negocia) y **spec** (qué hace una feature).
3. En OpenCode: *plan* analiza, *build* construye; `/new` y `/undo` cuidan la ventana; los **permisos** garantizan.
4. Lo que el agente decide por su cuenta cuando falta contexto es lo que la spec tiene que decidir.

**Siguiente:** [3. Escribir buenas especificaciones](03-escribir-especificaciones.md)
