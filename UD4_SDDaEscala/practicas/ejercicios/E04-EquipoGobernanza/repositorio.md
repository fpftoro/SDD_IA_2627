# El repositorio

```text
.github/
└── workflows/calidad.yml      ← la CI
.opencode/
├── agents/                    ← arquitecto, implementador, revisor, artesano
├── commands/                  ← /planificar, /implementar…
└── skills/
docs/
├── prd.md                     ← el producto
├── api/                       ← documentación de la API
└── specs/
    ├── README.md              ← índice de features
    └── <letra>-<nombre>/      ← spec.md, plan.md, tasks.md
e2e/                           ← pruebas de la página
herramientas/                  ← scripts de los gates (estado, trazabilidad…)
src/                           ← rutas, controladores, servicios, repositorios
tests/                         ← pruebas de Vitest
AGENTS.md
constitution.md
opencode.json
package.json
```
