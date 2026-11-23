# E01-SubagentesPrestamo

## Subagentes del préstamo

### Descripción

Solución del **Ejercicio 1** (autocorrección). El alumno decide qué trabajo compensa repartir entre agentes, define el arquitecto, el implementador y el artesano con sus permisos y comprueba la configuración con `opencode debug agents`.

- Enunciado y material de partida: [`practicas/ejercicios/E01-SubagentesPrestamo`](../../practicas/ejercicios/E01-SubagentesPrestamo/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 1 | Subagentes del préstamo | Cuándo compensa repartir, roles, permisos y modelo por rol (OA4 a) |

### Estructura

```text
E01-SubagentesPrestamo/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md     ← respuesta modelo
    └── .opencode/agents/
        ├── arquitecto.md
        ├── implementador.md
        └── artesano.md
```

### Clave

| Situación | ¿Compensa? |
|-----------|-----------|
| 1 | Sí (contexto) |
| 2 | No |
| 3 | Sí (revisión independiente) |
| 4 | No |
| 5 | Sí (coste y permisos) |
| 6 | Depende (de si los planes se pisan) |
| 7 | No (lo aprueba una persona) |
| 8 | Sí (privacidad, modelo local) |

Los permisos de los tres agentes se han comprobado con OpenCode 2.3.2 (`opencode debug agents` y `permisos.mjs`).

### Errores frecuentes

- **Dejar `subagent` sin cerrar.** Un agente de «solo lectura» con `subagent` abierto puede editar a través de *general*. Es el fallo más grave del ejercicio.
- **Una regla `edit` en `allow` y después los `deny`.** Gana la **última** regla que coincide, así que el orden importa: primero `edit` con `*` en `deny` y después los `allow`.
- **Poner `src/**` en el arquitecto o `plan.md` en el implementador**, mezclando roles.
- **Decir «sí» a todo.** Repartir tiene un coste de coordinación; las situaciones 2, 4 y 7 no mejoran con otro agente.
- **Nombrar modelos concretos**: el material no depende de un proveedor.

### Otras soluciones válidas

- Situación 3: el `revisor` de la UD3 en lugar del `artesano`.
- Situación 8: «depende» si se razona que, con permisos de lectura, el riesgo sigue siendo que el código salga del centro, de modo que hace falta un modelo local.
- El implementador puede tener la terminal (`shell` con `*`) en `deny` en vez de `ask`, si lo justifica (más estricto que lo pedido).
- El artesano puede tener `ask` para otros comandos de lectura.
- El diagrama puede dibujar al arquitecto como coordinador de *explore* y a la persona como coordinadora de todos; basta con que diga quién decide.
