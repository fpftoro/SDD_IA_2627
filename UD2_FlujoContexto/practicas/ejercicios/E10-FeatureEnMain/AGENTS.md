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

## Estructura

- `src/`: una carpeta por capa (controladores, servicios, repositorios),
  más `rutas/` y `errores/`.
- `public/`: la página.
- `tests/`: un fichero de tests por módulo.
- `docs/specs/<letra>-<nombre>/`: spec, plan y tasks de cada feature.
- `.github/workflows/calidad.yml`: la integración continua. No se
  modifica.

## Convenciones

- JavaScript con módulos ES. Identificadores en español.
- Comillas simples y punto y coma.

## Prohibiciones

- No añadas dependencias sin consultarlo.
- No escribas claves ni contraseñas en ningún fichero.
- No modifiques una spec aprobada sin que se te pida: propón el cambio.
- No cambies el estado de una spec ni del índice: lo cambia una persona.
