# E09-CambioOpenSpec

## Un cambio con OpenSpec

### Descripción

Solución del **Ejercicio 9** (autocorrección, con agente). El alumno instala OpenSpec en el proyecto del préstamo de portátiles, propone con el agente un cambio sobre la feature A ya implementada (filtrar la lista por carro), revisa los artefactos que genera, lo implementa, lo archiva para que la spec vigente se actualice y compara OpenSpec con el flujo a mano del curso.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E09-CambioOpenSpec`](../../practicas/ejercicios/E09-CambioOpenSpec/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 9 | Un cambio con OpenSpec | Estado y artefactos de un cambio sobre una feature implementada: specs vigentes, deltas y archivo (OA2 d) |

### Estructura

```text
E09-CambioOpenSpec/
├── README.md       ← este fichero
├── rubrica.md
└── solucion/       ← el proyecto en main, con el cambio fusionado
    ├── README.md   ← ejemplo comentado
    ├── openspec/
    │   ├── specs/portatiles/spec.md                       ← vigente, con los requisitos nuevos
    │   └── changes/archive/<fecha>-filtrar-por-carro/     ← el cambio de referencia, archivado
    ├── .opencode/  ← lo que instala openspec init
    ├── docs/specs/A-consultar-portatiles/spec.md          ← versión 1.1
    └── src/, tests/
```

**Comprobado** con OpenSpec 1.16 (`@fission-ai/openspec`, MIT) en Docker con `node:24-alpine`: `openspec init --tools opencode --language es` respeta la spec vigente que trae la plantilla y crea seis comandos (`/opsx-propose`, `/opsx-apply`, `/opsx-archive`, `/opsx-explore`, `/opsx-update`, `/opsx-sync`) y seis skills; el cambio de referencia pasa `openspec validate --strict`; `openspec archive filtrar-por-carro -y` aplica la delta («+ 2 added») y lo mueve a `archive/` con la fecha delante; `openspec validate --all --strict` sigue en verde; y los 37 tests pasan (26 de partida y 11 nuevos). OpenCode 2.3.2 carga el `opencode.json` con los permisos de `openspec` y los seis comandos y las seis skills que genera OpenSpec. Las sesiones con modelo no se han probado: los comandos `/opsx-*` dependen del agente.

La carpeta del archivo lleva la fecha del día en que se archiva: la del alumno será distinta.

### Lo que la revisión tiene que encontrar

Lo habitual en lo que genera el agente, y lo que un buen alumno corrige:

| Artefacto | Fallo frecuente |
|-----------|-----------------|
| Propuesta | Crea una capacidad nueva (`filtro-carro`) en lugar de modificar `portatiles`; no menciona la spec de `docs/specs/` |
| Delta | No decide qué pasa con carro y estado no válidos a la vez, ni con minúsculas; usa `MODIFIED` copiando solo parte del requisito |
| Diseño | Deduce los carros de los datos; valida en el controlador |
| Tasks | Tests en un grupo final; falta la task de la spec 1.1 |

### Conceptos aprendidos

- OpenSpec separa lo **vigente** (`openspec/specs/`) de los **cambios** (`openspec/changes/`), y el estado de un cambio es dónde está: en curso o archivado.
- Una delta describe solo la diferencia, con `ADDED`, `MODIFIED`, `REMOVED` o `RENAMED`, y se aplica a la spec vigente al archivar.
- La herramienta automatiza el flujo, pero no la revisión: lo que genera el agente se revisa igual que una spec, un plan y unas tasks a mano.
- Si conviven dos sitios de specs, hace falta una regla escrita para que no se separen.

### Errores frecuentes

- Aceptar los artefactos tal cual, sin revisión documentada.
- Implementar en la misma sesión de la propuesta.
- No subir la spec de `docs/specs/` a 1.1, o subirla en un commit aparte del código.
- Modificar tests de la feature A en lugar de añadir los del cambio.
- Archivar con tasks sin marcar, o no comprobar la spec vigente después de archivar.
- Editar a mano `openspec/specs/portatiles/spec.md` en lugar de dejar que lo haga el archivo.
- Una comparación de la fase 5 genérica («OpenSpec es más cómodo»), sin decir para qué trabajo usaría cada uno.

### Otras soluciones válidas

- Otro nombre de capacidad o de requisitos en la delta, si modifica `portatiles` y valida en modo estricto.
- `MODIFIED` del requisito «Filtro por estado» para que incluya el carro, en lugar de dos `ADDED`, si copia el requisito completo.
- Otra decisión sobre las minúsculas o los dos errores a la vez, si está en la delta y en la spec 1.1, y tiene su test.
- Archivar con `/opsx-archive` o con la CLI.
- No crear `design.md`: OpenSpec lo considera opcional en cambios pequeños. Entonces las decisiones tienen que estar en otro artefacto.
