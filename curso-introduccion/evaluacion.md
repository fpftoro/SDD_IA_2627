# Seguimiento y evaluación

[⬅️ Volver al curso](README.md)

Este curso **no tiene proyecto final**: se aprende el método con ejercicios sobre un ejemplo común. El proyecto en el que se aplicará (que dependerá del módulo) se trabaja fuera de este curso.

## Qué se recoge

El repositorio del ejemplo (reserva de salas) que cada persona va construyendo en los ejercicios, con **un commit por documento aprobado**, y las respuestas de los ejercicios de casa.

| Sesión | Se recoge |
|--------|-----------|
| 1 | Decisiones implícitas del código y del encargo de los portátiles; tres frases de spec |
| 2 | Repositorio con constitución y `AGENTS.md`; tabla sin y con contexto; seis reglas verificables |
| 3 | Spec de la feature A aprobada; tabla de diferencias con la referencia; tres requisitos reescritos |
| 4 | Plan, tasks, tests y código de A; tabla de problemas; los cuatro casos de «¿dónde se corrige?» |
| 5 | Feature B hecha con tres roles; tabla de hallazgos; agente `revisor`; los seis intentos de «¿Funciona el permiso?» con sus recuentos y la conclusión |
| 6 | Feature C hecha en paralelo; diagnóstico; las cuatro parejas serie/paralelo; informe de una página |

## Lista de comprobación (10 puntos)

| Criterio | Puntos | Se valora |
|----------|-------:|-----------|
| Contexto y entorno | 1 | Constitución con tecnología real, `AGENTS.md` verdadero, reglas verificables |
| Spec de A | 3 | `RF` atómicos, `AC` binarios con valores concretos, `EC` con respuesta exacta y prioridad, fuera de alcance, sin marcadores |
| Plan y flujo de A | 2 | Plan con decisiones, alternativas y firmas; tests antes que el código; tabla de problemas |
| Roles y paralelo (B y C) | 2 | Permisos comprobados, tests que no toca el `implementador`, intentos de «¿Funciona el permiso?» puntuados por separado (resultado, límites y escalar) con recuentos «k de n», diagnóstico de las discrepancias |
| Proceso | 1 | Un commit por documento aprobado |
| Informe | 1 | Decisiones propias y propuestas del agente aceptadas o rechazadas con motivo |

## Defensa (opcional)

Tres preguntas posibles: **(1)** «Elige un *edge case* de tu spec: ¿qué habría hecho el agente sin él?». **(2)** «¿Por qué el `implementador` no puede editar los tests?». **(3)** «¿Qué pondrías en paralelo y qué comprobarías antes?».
