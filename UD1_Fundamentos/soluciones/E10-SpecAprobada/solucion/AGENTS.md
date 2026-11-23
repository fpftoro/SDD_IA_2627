# AGENTS.md

Lista de tareas compartida: API en Node.js y una página web para que un
equipo pequeño comparta sus tareas. Por ahora el repositorio tiene las
specs; el código llegará en la UD2. Los principios están en
`constitution.md`, y el porqué del producto, en `docs/prd.md`.

## Comandos

- Instalar las dependencias: `npm install`
- Comprobar la sintaxis de los escenarios de Gherkin: `npm run validar`

## Estructura

- `docs/prd.md`: el PRD del producto.
- `docs/specs/README.md`: índice de features con su orden y su estado.
- `docs/specs/<prefijo>-<nombre>/spec.md`: la spec de cada feature. El
  prefijo (`A`, `B`…) indica el orden de implementación; el nombre va en
  minúsculas y con guiones (`C-marcar-hecha`).
- `herramientas/`: scripts de comprobación.

## Convenciones

- Todo en español: specs, mensajes de error e identificadores.
- Las specs siguen la plantilla del curso y la notación de la constitución.

## Prohibiciones

- No modifiques una spec aprobada sin que se te pida: propón el cambio.
- No modifiques `constitution.md` ni `docs/prd.md`.
- No añadas dependencias sin preguntar antes.
- No escribas claves, contraseñas ni tokens en ningún fichero.
