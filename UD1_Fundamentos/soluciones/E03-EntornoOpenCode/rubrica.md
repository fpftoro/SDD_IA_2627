# Rúbrica · E03 Mi entorno con OpenCode

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el repositorio del alumno y su historial, sin ejecutar nada. Es un ejercicio con agente: se valoran la configuración, el proceso documentado y las decisiones, no lo que respondió el modelo. El [`README.md`](./README.md) de este ejercicio recoge los errores frecuentes y las otras soluciones válidas.

---

### C1 · Proveedor y claves

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Proveedor y modelo»; todo el repositorio y el historial, buscando claves |

**Requisito previo:** si hay una clave de un proveedor en cualquier fichero o commit, el nivel es 0 y se anota en «Dudas para el profesor» para avisar al alumno de que la cambie.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Indica la versión 2.3.2, el proveedor, el tipo de acceso y el modelo, sin ninguna clave en el repositorio |
| 0 | 0 | Falta la sección o algún dato, o hay una clave en el repositorio |

### C2 · AGENTS.md revisado

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 3 |
| Dónde mirar | `AGENTS.md` del último commit |

Elementos que debe cumplir (requisito 5 del enunciado): (1) comandos de instalar, arrancar y tests; (2) estructura de `src/` y `test/`; (3) convenciones: módulos ES, identificadores en español, comillas simples, punto y coma y JSDoc en servicios; (4) al menos tres prohibiciones, entre ellas no añadir dependencias sin preguntar y no escribir claves; (5) ninguna regla que contradiga la constitución (en particular, nada de errores con `msg`); (6) nada sobre el ejercicio ni repetición de la constitución; (7) unas 40 líneas como mucho.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Cumple los siete elementos |
| 2 | 2 | Cumple los elementos 1, 4 y 5, y falla uno o dos de los demás |
| 1 | 1 | Cumple el elemento 5, pero le faltan comandos o prohibiciones, o falla tres o más elementos |
| 0 | 0 | No existe, es la versión de `/init` sin revisar o contiene la regla de errores con `msg` |

### C3 · Revisión documentada

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Revisión del AGENTS.md»; commits «AGENTS.md generado con /init» y «AGENTS.md revisado» en el historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Existen los dos commits por separado y la tabla tiene al menos cuatro cambios, cada uno con un motivo que coincide con lo que cambia entre esos commits |
| 0 | 0 | Falta uno de los dos commits, la tabla tiene menos de cuatro cambios o los motivos no explican nada («porque sí», «para mejorarlo») |

### C4 · Configuración de OpenCode

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 2 |
| Dónde mirar | `opencode.json`; `README.md`, sección «Configuración de OpenCode» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | `opencode.json` es JSON válido, tiene `constitution.md` en `instructions` y en `permissions` la regla de `shell` con `*` en `ask` **antes** que las excepciones (`npm test`, `git status`, `git diff`, `git log` con `allow` y `rm` con `deny`), sin ninguna regla de `edit`; y la tabla del README explica cada regla |
| 1 | 1 | Tiene `instructions` y las reglas de terminal, pero falla una de estas cosas: el orden de las reglas, alguna excepción, una regla de `edit` o la explicación del README |
| 0 | 0 | Falta el fichero, no es JSON válido, no carga la constitución o no tiene reglas de terminal |

### C5 · Comprobaciones

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Comprobaciones» y «Decisiones»; `sesiones/comprobaciones.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Las seis pruebas tienen «Qué esperaba» coherente con su configuración (4 sin preguntar, 5 pregunta, 6 rechazada) y «Qué pasó»; la exportación existe y contiene los seis prompts; y lo que encontró el agente en la prueba 3 está en «Decisiones» |
| 1 | 1 | Faltan una o dos pruebas, o las expectativas no son coherentes con su configuración, o falta la exportación |
| 0 | 0 | Falta la sección o tiene menos de cuatro pruebas |

### C6 · Proceso e historial

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 1 |
| Dónde mirar | Historial de commits; `README.md`, secciones «Sesión con el agente» y «Commits» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Al menos cuatro commits propios, en el orden de las fases 2 a 5 y con mensajes descriptivos; «Sesión con el agente» recoge al menos `/init` con lo que produjo y lo que se corrigió; y «Commits» coincide con el historial |
| 0 | 0 | Un único commit con todo, commits fuera de orden o sección de sesión vacía |
