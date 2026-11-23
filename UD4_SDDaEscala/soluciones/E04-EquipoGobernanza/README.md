# E04-EquipoGobernanza

## Equipo y gobernanza

### Descripción

Solución del **Ejercicio 4** (autocorrección). El alumno reparte los puntos de control de la feature F entre cuatro roles, escribe `CODEOWNERS` y la plantilla de PR de las specs, añade un principio a la constitución con su PR y análisis de impacto, y clasifica ocho cambios según dónde se gobiernan.

- Enunciado y material de partida: [`practicas/ejercicios/E04-EquipoGobernanza`](../../practicas/ejercicios/E04-EquipoGobernanza/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 4 | Equipo y gobernanza | Roles, `CODEOWNERS`, gobernanza de la constitución (OA4 c) |

### Estructura

```text
E04-EquipoGobernanza/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md     ← respuesta modelo
    ├── constitution.md
    └── .github/
        ├── CODEOWNERS
        └── PULL_REQUEST_TEMPLATE/spec.md
```

### Clave

- **Producto** aprueba la spec; **arquitectura**, el plan; **desarrollo**, las tasks y los ciclos; **calidad** añade *edge cases* en la spec y revisa las tasks de tests.
- **A la constitución** van los cambios 2, 6 y 7. El 4 y el 5 se gobiernan como la memoria del agente (arquitectura, en una PR).
- **La trampa del principio:** la frase inicial de producto («solo lo que ha creado él») chocaría con su propia nota: devolver el portátil de un compañero es normal. La sección tiene que recoger la excepción de la devolución.
- **Ramas afectadas:** D (cita el principio en su plan) y E (producto decide quién anota incidencias); F nace con el principio.

### Errores frecuentes

- **`*` al final de `CODEOWNERS`**: anula todas las excepciones.
- **Creer que producto y calidad deben aprobar los dos** si aparecen en la misma línea.
- **Poner la constitución y el resto de la memoria del agente a desarrollo**, o los permisos de los agentes sin propietario.
- **Una sección de «Permisos» que explica cómo se implementa** (`if (usuario.id === reserva.profesor)`): eso es del plan.
- **Aplicar la frase literal de producto** y olvidar su nota sobre la devolución.
- **Una PR de constitución sin la pregunta «a qué afecta»** o que no mira las ramas abiertas.
- **Llevar a la constitución una decisión de una sola feature** (el campo `motivo`) o una preferencia personal.
- **Pedir revisión de arquitectura para todo**: la arquitectura se convierte en cuello de botella.

### Otras soluciones válidas

- Poner solo a producto en la línea de las specs y dejar a calidad en la lista de la PR.
- Dar `/docs/api/` a desarrollo y producto, o `/herramientas/` solo a calidad.
- Que arquitectura revise la fusión de las features que cambian los principios, si se razona.
- Añadir una versión mayor si se razona que se redefine un principio (no es el caso aquí).
- Poner el cambio 4 como «CI + calidad»: lo importante es que lo revisa arquitectura.
