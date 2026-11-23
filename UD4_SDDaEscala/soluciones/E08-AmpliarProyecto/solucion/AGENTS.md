# AGENTS.md

Lista de tareas compartida: API en Node.js con Express y una página web
sin framework. Los principios están en `constitution.md`, y el porqué
del producto, en `docs/prd.md`.

## Al empezar una sesión

- Lee `docs/specs/README.md` para saber qué features están
  implementadas y cuál es la siguiente.

## Comandos

- Instalar: `npm install`
- Tests: `npm test`
- Arrancar: `npm start` (en http://localhost:3000)
- Comprobar que el índice coincide con el estado de cada spec:
  `npm run estado`
- Buscar trampas en la rama (controles apagados, borrados, marcadores):
  `npm run trampas`

## Estructura

- `src/`: una carpeta por capa (controladores, servicios, repositorios),
  más `rutas/` y `errores/`.
- `public/`: la página.
- `tests/`: un fichero de tests por módulo.
- `docs/specs/<letra>-<nombre>/`: spec, plan y tasks de cada feature.

## Flujo

- Las features nuevas siguen el flujo de `docs/specs/`, cada una en su
  rama `feature/<carpeta>` y, si hay varias a la vez, en su *worktree*.
- El plan y las tasks los escribe el agente `arquitecto` con
  `/planificar`, en estado `Borrador`. Los aprueba una persona.
- Antes de aprobar un plan, se compara con el de las demás features en
  curso.
- Un cambio sobre una feature ya implementada sube la versión de su spec
  en `docs/specs/`, en el mismo commit que el código.

## Convenciones

- JavaScript con módulos ES. Identificadores en español.
- Comillas simples y punto y coma.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No modifiques una spec aprobada sin que se te pida: propón el cambio.
- No cambies el estado de una spec ni del índice: lo cambia una persona.
- No modifiques los tests para que pasen.
