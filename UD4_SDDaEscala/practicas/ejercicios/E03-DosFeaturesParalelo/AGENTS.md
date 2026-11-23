# AGENTS.md

API del préstamo de portátiles del centro, en Node.js con Express. Los
principios están en `constitution.md`, y el porqué del producto, en
`docs/prd.md`.

## Al empezar una sesión

- Lee `docs/specs/README.md` para saber qué features están
  implementadas y cuál es la siguiente.

## Comandos

- Instalar: `npm install`
- Tests: `npm test`
- Arrancar: `npm start` (en http://localhost:3000)
- Comprobar que el índice coincide con el estado de cada spec:
  `npm run estado`

## Estructura

- `src/`: `rutas/`, `controladores/`, `servicios/`, `repositorios/` y
  `errores/`, más `middlewares/usuario-actual.js`, que identifica a quien
  hace la petición.
- `tests/`: un fichero de tests por módulo.
- `docs/specs/<letra>-<nombre>/`: spec, plan y tasks de cada feature.

## Flujo de una feature

- Cada feature se trabaja en su rama (`feature/<carpeta>`) y, si hay varias a
  la vez, en su propio *worktree*.
- El plan y las tasks los escribe el agente `arquitecto` con `/planificar`,
  en estado `Borrador`. Los aprueba una persona.
- Antes de aprobar un plan, se compara con el de las demás features en curso.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No modifiques una spec aprobada sin que se te pida: propón el cambio.
- No cambies el estado de una spec ni del índice: lo cambia una persona.
