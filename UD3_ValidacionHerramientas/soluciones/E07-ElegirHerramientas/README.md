# E07-ElegirHerramientas

## Elegir herramientas

### Descripción

Solución del **Ejercicio 6** (autocorrección). El alumno elige herramientas para tres proyectos empezando por sus restricciones, con una matriz de decisión con pesos justificados, una prueba piloto y lo que guardaría en formatos abiertos; investiga dos herramientas en su documentación oficial y decide qué se conserva al cambiar de agente.

- Enunciado y material de partida: [`practicas/ejercicios/E07-ElegirHerramientas`](../../practicas/ejercicios/E07-ElegirHerramientas/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 6 | Elegir herramientas | Comparar herramientas del ecosistema y justificar combinaciones según el proyecto (OA3 e) |

### Estructura

```text
E07-ElegirHerramientas/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    └── README.md     ← una respuesta modelo (no la única)
```

### Lo esencial de cada escenario

| Escenario | La restricción que manda | Lo razonable |
|-----------|--------------------------|--------------|
| 1 · Biblioteca | Datos personales del alumnado y código abierto | Agente de código abierto y multiproveedor con un modelo **local** en el servidor del centro; el método a mano, porque es la primera vez; specs en el repositorio |
| 2 · Facturación | Código existente y trabajo hecho de cambios | Un método de **specs de cambios** (OpenSpec o deltas a mano), cada persona con su agente leyendo `AGENTS.md`, y los gates en la CI desde el principio |
| 3 · Banco | Entorno y modelos **impuestos**; auditoría | Usar lo impuesto y adaptar el método: specs, plan y tasks en el repositorio, identificadores en los tests y en los commits, gates en la CI como evidencia para la auditoría |

### Errores frecuentes

- Puntuar en el escenario 1 opciones que mandan los datos del alumnado a un proveedor sin condiciones claras, en lugar de descartarlas como restricción.
- En el escenario 3, poner como opciones otros entornos o proveedores que la organización no permite.
- Pesos sin explicar o iguales para todos los criterios: la matriz no ayuda a decidir.
- Decidir por la herramienta «más completa» sin relacionarla con el escenario.
- Herramientas investigadas sin fecha de consulta, con datos de comparativas en lugar de la documentación oficial, o con precios.
- Dar por buenos los agentes traducidos sin comprobar sus permisos.

### Otras soluciones válidas

- En el escenario 1, Spec Kit con un agente abierto es válido si se justifica que el flujo guiado ayuda a quien empieza (y se tiene en cuenta que su CLI necesita Python).
- En el escenario 2, el método a mano con deltas escritas en Markdown, sin framework, es igual de válido que OpenSpec.
- En el escenario 3, cualquier entorno: lo que se valora es cómo se garantiza la trazabilidad dentro de él.
- Las dos herramientas investigadas pueden ser cualesquiera que no se hayan visto en detalle en el tema 4 (por ejemplo, Aider, Cline, Continue, Codex CLI o Gemini CLI).
