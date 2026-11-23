# Equipo y gobernanza

## Puntos de control

| Punto de control | Aprueba | Participa | Qué mira | Agente con el que trabaja |
|------------------|---------|-----------|----------|---------------------------|
| 1 · Spec | Producto | Calidad (añade *edge cases*) | ¿Qué ve el profesorado si algo falla? ¿Está decidido quién puede cancelar y qué pasa con una reserva ajena? | *plan* (entrevista y ronda de aclaración) |
| 2 · Plan | Arquitectura | Desarrollo (comenta) | ¿Cumple la constitución, incluida «Permisos»? ¿Reutiliza lo que hay? ¿Hay una prueba por identificador? | `arquitecto` |
| 3 · Tasks | Desarrollo | Calidad (revisa las de tests) | ¿Hay un test por cada *edge case*, antes del código, y cada task es pequeña y verificable? | `arquitecto` |
| 4 · Ciclos | Desarrollo (otra persona distinta de quien implementó) | — | ¿Hace esto la task y nada más? Ficheros, tests y `git diff` | `implementador`, `revisor` |
| Fusión | Desarrollo, con la CI en verde | Calidad (trazabilidad) | ¿Pasan los tests de todas las features y no queda ningún identificador sin test? | `revisor` |

## Cuello de botella

| Cambio | Revisa |
|--------|--------|
| Constitución, `AGENTS.md`, `opencode.json`, agentes, comandos y permisos, CI | Arquitectura, siempre |
| Plan con una decisión que toca varias capas o añade una dependencia | Arquitectura |
| Plan que sigue el patrón de una feature anterior (como el de F, parecido al de B) | Otra persona de desarrollo |
| Tasks y ciclos | Otra persona de desarrollo |
| Spec | Producto, con los *edge cases* revisados por calidad |
| Tests y scripts de los gates | Calidad (y arquitectura en los gates) |

La constitución reparte el trabajo: cuantas más decisiones recoge, menos planes tiene que revisar arquitectura.

## Propietarios

- **(a) El orden de las líneas:** si un fichero encaja con varias líneas, **gana la última que coincide**. Con `*` la última, desarrollo sería el propietario de todo y arquitectura dejaría de ser pedida para la constitución, `AGENTS.md`, `.opencode/` y `.github/`: se anularían todas las excepciones.
- **(b) Producto y calidad en una spec:** GitHub **no** exige que aprueben los dos: basta con uno de los propietarios de la línea. Para que calidad revise los *edge cases* se acuerda en el equipo y se refuerza con una casilla en la plantilla de la PR de la spec, que calidad marca.
- **(c) Quién revisa `.opencode/agents/implementador.md`:** arquitectura, por la línea `/.opencode/`. Un permiso de más en el implementador (por ejemplo, poder editar los tests) cambia cómo trabajan todos los agentes del equipo, igual que la constitución.

## PR de la constitución

### Descripción

```markdown
## Cambio de la constitución

- **Qué cambia:** sección nueva «Permisos». Cada profesor solo cancela o
  modifica sus reservas; la coordinación TIC, las de cualquiera; cualquier
  persona identificada puede registrar una devolución.
- **Por qué:** la feature F (cancelar una reserva) regula quién puede
  cancelar, y la decisión afecta a otras features (producto, nota de
  explore-impacto.md).
- **A qué afecta:** al código existente, a nada: el análisis de impacto
  no encuentra código que lo incumpla. A las features en curso: la D (la
  devolución ya cumple el principio, pero su plan debe citarlo) y la E (el
  plan en Borrador no dice quién puede anotar una incidencia).
- **Qué hay que hacer:** traer main a feature/D-registrar-devolucion y a
  feature/E-anotar-incidencia y revisar sus planes con la sección
  «Permisos»; producto decide si cualquier profesor puede anotar una
  incidencia de cualquier portátil; la spec de F nace con el principio.
```

### Después de fusionar

| Rama o feature | Quién actúa | Qué hace |
|----------------|-------------|----------|
| D · `feature/D-registrar-devolucion` | Desarrollo (quien implementa D) | Trae `main`, añade al plan la comprobación de «Permisos» (la devolución la puede hacer cualquiera) y sigue con los ciclos. La spec no cambia |
| E · `feature/E-anotar-incidencia` | Producto y desarrollo | Producto decide quién puede anotar una incidencia; si cambia algo, spec 1.1. Desarrollo trae `main` y revisa el plan en `Borrador` |
| F · cancelar una reserva | Producto y calidad | La spec nace con el principio: cancelar la reserva ajena responde con un error y calidad añade ese *edge case* |
| Todo el equipo | Arquitectura | Avisa de qué cambia y qué hay que hacer, aprueba y fusiona |

- **Versión:** menor (por ejemplo, `1.0.0` → `1.1.0`): se añade un principio sin romper ninguno.

## Clasificación

| # | ¿Constitución? | Dónde se gobierna | Revisa | Por qué |
|---|----------------|-------------------|--------|---------|
| 1 | No | Plan (y spec) de la feature F | Desarrollo (plan) y producto (spec) | Es una decisión de una sola feature |
| 2 | Sí | Constitución, con PR propia | Arquitectura | Una decisión que se repite en varios planes se lleva a la constitución |
| 3 | No | Configuración personal (`~/.config/opencode/AGENTS.md`) | Nadie: es de esa persona | Es una preferencia personal; no se sube |
| 4 | No | CI (`.github/workflows/`) | Arquitectura | Es un gate; se gobierna como la memoria del agente, en una PR |
| 5 | No | Agente `implementador` (`.opencode/agents/`) | Arquitectura | Es un permiso: cambia lo que puede hacer el agente en todo el equipo |
| 6 | Sí | Constitución (sección Tecnología), con PR propia | Arquitectura, avisando al equipo | La constitución ya exige acordar las dependencias; es una decisión de todo el proyecto |
| 7 | Sí | Constitución (aclaración, versión de parche) | Arquitectura | Precisa un principio sin cambiar el comportamiento |
| 8 | No | Una feature normal o un cambio pequeño | Otra persona de desarrollo | No cambia ningún principio ni comportamiento del flujo |
