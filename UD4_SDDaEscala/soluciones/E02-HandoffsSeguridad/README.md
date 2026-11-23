# E02-HandoffsSeguridad

## Handoffs y seguridad

### Descripción

Solución del **Ejercicio 2** (autocorrección). El alumno reescribe tres encargos, escribe un *handoff* entre roles y detecta el hueco del plan que lo obligaría a explicar una decisión, corrige los permisos de cinco agentes y decide qué acciones del flujo son de las personas.

- Enunciado y material de partida: [`practicas/ejercicios/E02-HandoffsSeguridad`](../../practicas/ejercicios/E02-HandoffsSeguridad/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 2 | Handoffs y seguridad | Encargos, *handoffs*, mínimo privilegio y trazabilidad (OA4 b) |

### Estructura

```text
E02-HandoffsSeguridad/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md     ← respuesta modelo
    └── .opencode/agents/   ← los cinco agentes corregidos
```

### Clave

| Agente | Agujeros |
|--------|----------|
| `revisor` | `subagent` abierto |
| `documentador` | Orden de las reglas de `edit` y `subagent` sin cerrar |
| `implementador` | `edit` y `shell` abiertos |
| `consultor` | Web abierta (el orden de `edit` no abre nada) |
| `arquitecto` | Puede editar todo `docs/specs/` (también el estado) |

Las cinco versiones originales y las cinco corregidas se han comprobado con OpenCode 2.3.2 (`opencode debug agents` y `permisos.mjs`). El revisor corregido cierra también `websearch`, que la regla de serie le dejaba abierta.

### Errores frecuentes

- **No ver el agujero de `subagent`.** Es el menos visible: «solo lectura» no vale si el agente puede llamar a *general*. Si un agente no tiene una regla de `subagent`, la de serie (`*` con `*` en `allow`) se lo deja abierto.
- **Corregir el orden a medias.** Poner la regla de `*` en `deny` primero pero dejar el `allow` de `docs/**` después de los `deny` de las specs: gana la última regla que coincide.
- **Convertir en `ask` lo que debe ser `deny`** (la web del consultor, o `subagent`).
- **Marcar el orden del `consultor` como agujero real.** Aquí la regla final de `*` en `deny` lo anula todo; es confuso, no peligroso.
- **Meter la decisión en el *handoff*.** Si falta algo en el plan, se corrige el plan.
- **Dejar que un agente fusione o apruebe** «para ahorrar tiempo».

### Otras soluciones válidas

- Encargos con otro formato (lista, párrafo) mientras lleven objetivo, dónde mirar, límites y qué devolver.
- Un *handoff* más corto, o con un enlace a los documentos en lugar de la ruta.
- En el `documentador`, permitir solo `README.md` y `docs/api.md` en vez de `docs/**`.
- En el `consultor`, dejar `webfetch: ask` si se justifica con una lista de dominios (más permisivo, pero razonado).
- Acción 2 como «agente» si se explica que la persona revisa cada ciclo; acción 6, igual.
