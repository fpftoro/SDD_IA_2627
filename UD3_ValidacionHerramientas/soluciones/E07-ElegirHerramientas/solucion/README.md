# Elegir herramientas

Puntuación de 1 a 3; el total es puntuación × peso. Una respuesta modelo, no la única.

## Escenario 1

### Restricciones

- **Datos personales del alumnado** en los datos de prueba: el código y los datos no pueden ir a un proveedor cuyas condiciones no aclaran qué hace con ellos. Descarta usar las cuentas educativas con este proyecto y cualquier agente atado a un proveedor.
- **Código abierto** por decisión del departamento: descarta agentes y entornos propietarios.
- Mejor aún: anonimizar del todo los datos de prueba, aunque eso no cambia la elección.

### Matriz

| Criterio | Peso | Opción 1: método a mano + agente abierto y multiproveedor + modelo local | Opción 2: Spec Kit + agente abierto + modelo local | Opción 3: OpenSpec + agente abierto + modelo local |
|----------|------|-----------|-----------|-----------|
| Aprender el método (primera vez con SDD) | 3 | 3 → 9 | 2 → 6 | 2 → 6 |
| Funciona con el modelo local, de capacidad media | 3 | 3 → 9 | 2 → 6 | 2 → 6 |
| Proyecto nuevo, por features | 2 | 3 → 6 | 3 → 6 | 1 → 2 |
| Poco que instalar en los equipos del aula | 1 | 3 → 3 | 1 → 1 | 2 → 2 |
| **Total** | | **27** | **19** | **16** |

Pesos: el objetivo es didáctico (aprender el método) y el modelo local es una restricción práctica: las plantillas largas de un framework se aprovechan peor con un modelo de capacidad media. Proyecto nuevo pesa menos porque las tres opciones lo admiten. La instalación pesa poco, pero el aula tiene muchos equipos.

### Decisión

Opción 1: el método del curso, con un agente de código abierto y multiproveedor conectado al modelo del servidor del centro. Prueba piloto: un grupo hace una feature pequeña (consultar un libro) con el modelo local y se mira si sigue la spec y los permisos. En formatos abiertos: specs, plan y tasks en Markdown en el repositorio, `AGENTS.md`, skills en el formato abierto y los gates en la CI.

## Escenario 2

### Restricciones

- Ninguna de privacidad: el código puede ir al proveedor contratado.
- Cada persona usa un editor distinto: descarta imponer un entorno integrado a todos.
- No pueden parar el trabajo diario: la adopción tiene que ser gradual.

### Matriz

| Criterio | Peso | Opción 1: OpenSpec + el agente de cada persona | Opción 2: Spec Kit + un agente para todos | Opción 3: un entorno integrado con specs |
|----------|------|-----------|-----------|-----------|
| Trabajo hecho de cambios sobre código existente | 3 | 3 → 9 | 1 → 3 | 2 → 6 |
| Cada persona con su editor o su terminal | 2 | 3 → 6 | 2 → 4 | 1 → 2 |
| Adopción gradual, sin parar | 2 | 3 → 6 | 1 → 2 | 1 → 2 |
| Evita los cambios sin documentar | 3 | 3 → 9 | 2 → 6 | 2 → 6 |
| **Total** | | **30** | **15** | **16** |

Pesos: lo que más se repite (cambios) y el problema que tienen (cambios sin documentar) pesan 3.

### Decisión

Opción 1. Cada cambio pasa por una propuesta con su delta y se archiva al terminar, así que las specs vigentes se construyen poco a poco, solo de lo que se toca. Gates en la CI desde el primer día, con el de spec existente adaptado a `openspec/changes/`. Prueba piloto: el próximo cambio de impuestos, de principio a fin. En formatos abiertos: las specs de OpenSpec (Markdown), `AGENTS.md` y los tests.

## Escenario 3

### Restricciones

- **Entorno y modelos impuestos**: no se elige agente ni proveedor. Lo que se decide es cómo trabajar dentro.
- **Auditoría**: trazabilidad del requisito al código, demostrable.

### Matriz

| Criterio | Peso | Opción 1: el entorno impuesto con sus specs integradas | Opción 2: el entorno impuesto con el método del curso en Markdown | Opción 3: el entorno impuesto con Spec Kit |
|----------|------|-----------|-----------|-----------|
| Trazabilidad auditable (requisito → test → commit) | 3 | 2 → 6 | 3 → 9 | 3 → 9 |
| Varias features en paralelo, 30 personas | 2 | 2 → 4 | 2 → 4 | 3 → 6 |
| Independencia del entorno si el contrato cambia | 2 | 1 → 2 | 3 → 6 | 3 → 6 |
| Curva para quien no ha usado agentes | 2 | 3 → 6 | 2 → 4 | 2 → 4 |
| **Total** | | **18** | **23** | **25** |

### Decisión

Opción 3, si el entorno impuesto admite los comandos de Spec Kit; si no, la 2. Spec Kit da un flujo uniforme a 30 personas y numera las features con su rama. La auditoría se apoya en lo que no depende del entorno: identificadores en las specs, en los tests y en los mensajes de commit, y los gates de la CI (trazabilidad, spec existente, tests modificados) como evidencia. Prueba piloto: dos features en paralelo con dos equipos. En formatos abiertos: todo el flujo en el repositorio.

## Dos herramientas

### Herramienta 1: (por ejemplo, Aider)

Documentación: (enlace oficial) · Fecha de consulta: AAAA-MM-DD

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué papel cumple? | Agente de codificación de terminal |
| ¿Dónde guarda las specs y el contexto? | En el repositorio: ficheros que se le indican y un fichero de convenciones |
| ¿Qué fases del flujo cubre y con qué artefactos? | Ninguna fase propia: el flujo se lleva con ficheros |
| ¿Con qué modelos funciona? | Muchos proveedores y modelos locales |
| ¿Qué licencia tiene? | Abierta |
| ¿Qué control da? | Revisión de los cambios y commits automáticos que se pueden deshacer |
| ¿Dónde trabaja? | Terminal |

### Herramienta 2: (otra, con la misma tabla)

## Al cambiar de agente

| Fichero o carpeta | ¿Sirve? | Qué compruebo después |
|-------------------|---------|-----------------------|
| `docs/specs/` | Tal cual | Que el agente nuevo las lee al empezar |
| `constitution.md` y `docs/prd.md` | Tal cual | Que se cargan como instrucciones (el equivalente a `instructions`) |
| `AGENTS.md` y `tests/AGENTS.md` | Tal cual o importados desde el fichero propio del agente | Que el agente los carga, también el de la carpeta de tests |
| `.opencode/skills/tests-desde-spec/` | Traducir la ubicación (el formato es abierto) | Que el agente la encuentra por su descripción |
| `.opencode/commands/` | Traducir el formato; el texto del prompt sirve | Que cada comando lanza el agente correcto |
| `.opencode/agents/implementador.md` | Traducir, con cuidado | **Los permisos**: que no puede editar `tests/**` ni `package.json`, ni delegar, ni usar la terminal libremente |
| `opencode.json` | Se pierde | Rehacer las instrucciones y los permisos en la configuración del agente nuevo |
| `tests/` y `src/` | Tal cual | `npm test` en verde |
