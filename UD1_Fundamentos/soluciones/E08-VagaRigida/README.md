# E08-VagaRigida

## Ni vaga ni rígida

### Descripción

Solución del **Ejercicio 8** (autocorrección, con agente). El alumno clasifica quince líneas como vagas, rígidas o adecuadas y decide si van en la spec, el plan o la constitución. Después revisa con el agente *plan* la spec de «Cancelar una reserva», que tiene problemas de granularidad y de notación sembrados; le pide además detalles técnicos para provocar propuestas rígidas; acepta o rechaza cada propuesta con el criterio del tema 6, y deja la spec revisada y aprobada. Cada fase acaba en un commit.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E08-VagaRigida`](../../practicas/ejercicios/E08-VagaRigida/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 8 | Ni vaga ni rígida | Granularidad de una spec, spec frente a plan y revisión con el agente (OA1 f) |

### Estructura

```text
E08-VagaRigida/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── .devcontainer/devcontainer.json
    ├── AGENTS.md, constitution.md, opencode.json   ← contexto del agente, sin cambios
    ├── README.md           ← entrega modelo
    ├── lineas.md           ← material de la parte A, sin cambios
    ├── package.json, herramientas/validar-gherkin.mjs
    └── docs/specs/
        ├── README.md       ← F en 🔜 Aprobada
        └── F-cancelar-reserva/spec.md   ← versión 1.1, Aprobada
```

La solución no incluye `sesiones/revision.md`: es la exportación de la sesión de cada alumno. Las respuestas del agente que aparecen en la entrega modelo son un ejemplo de lo que suele proponer; cambian con el modelo y con cada ejecución.

### Ejecutar

Dentro del Dev Container del ejercicio:

```bash
npm run validar     # ✅ 1 documento de Gherkin sin errores
```

### Problemas sembrados en la spec

| Dónde | Tipo | Problema |
|-------|------|----------|
| RF-02 | Vaga | «Liberar el hueco de forma eficiente» |
| RF-03 | Rígida | Código: `reservas.get(id).estado = …` y `guardarReservas()` |
| RF-04 | Notación | No sigue EARS |
| RNF-01 | Vaga | «Debe ser rápida» |
| RNF-02 | Rígida | `Map` de JavaScript y coste O(1) |
| AC-02 | Rígida | Escenario imperativo: URL, botón rojo, ventana emergente, casilla gris |
| AC-03 | Vaga | «Se gestiona correctamente» |
| EC-03 | Vaga | «Deberá avisar al usuario» |
| EC-04 | Vaga y sin decidir | «Última hora… se gestionará adecuadamente» (la decisión está en el enunciado) |

Bien escritos, para que el alumno no lo cambie todo: RF-01, AC-01, EC-01, EC-02, el contexto con la ruta `DELETE /api/reservas/:id` y el fuera de alcance.

### Clave de la parte A

| Tipo | Líneas | Dónde van |
|------|--------|-----------|
| Vaga | L1, L5, L12 | Spec, reescritas |
| Rígida | L2, L6, L11, L13 | Plan |
| Adecuada | L3, L7, L8, L9, L14 | Spec |
| Adecuada | L4, L10, L15 | Constitución |

### Conceptos aprendidos

- Una spec **vaga** deja al agente decidir comportamiento; una **rígida** le dicta el código. La spec fija qué y en qué condiciones; el plan, cómo.
- Lo técnico que se ve desde fuera (una ruta, un código de error, un formato) va en la spec; lo interno (funciones, estructuras, librerías) va en el plan.
- Lo que vale para todo el proyecto va en la constitución, no en cada spec.
- El agente es un buen revisor, pero tiende a añadir detalle de implementación: cada propuesta se acepta o se rechaza con criterio, y la decisión es humana.
- Una spec solo se aprueba cuando pasa la lista de comprobación y no le quedan dudas.

### Errores frecuentes

- Clasificar L8 como rígida porque «es técnica». La ruta es el contrato de la API.
- Poner L4, L10 o L15 en la spec de la feature: valen para todo el proyecto.
- Clasificar L13 como adecuada porque «hace falta comparar fechas». Lo que hace falta comparar es comportamiento (EC-04); la librería es del plan.
- Aceptar todas las propuestas del agente, incluidas las del segundo prompt, sin aplicar el criterio de granularidad.
- Rechazar propuestas correctas solo por venir del agente, sin motivo.
- Dejar en la spec revisada el `[NECESITA ACLARACIÓN]` de EC-04, cuando la respuesta estaba en el enunciado.
- Mantener AC-02 con detalles de la interfaz, o quitarlos sin dejar un resultado comprobable.
- Olvidar cambiar el estado en `docs/specs/README.md`, o aprobar la spec sin subir la versión.
- Dejar que el agente *build* reescriba la spec entera sin decirle qué cambios aplicar, y no revisar lo que ha hecho.

### Otras soluciones válidas

- **L9 en la constitución**, si se justifica como regla general («no se borra nada»). La constitución ya lo dice para préstamos y reservas; en la spec también es válido porque es el comportamiento de esta feature.
- **L13 en la constitución**, si el alumno argumenta que el equipo quiere fijar esa librería para todo el proyecto. Lo que no es válido es dejarla en la spec.
- **L12 al fuera de alcance** o como pregunta abierta, si se razona que la interfaz es de otra feature. Lo importante es no dejar «clara».
- Otras propuestas del agente, aceptadas o rechazadas: cada modelo propone cosas distintas. Se valora que cada decisión tenga un motivo con el criterio del tema 6 y que haya al menos un rechazo razonado.
- Otra redacción de los requisitos y escenarios, otra organización (por ejemplo, sin antecedentes) y más *edge cases*, siempre que cumplan la lista de comprobación.
