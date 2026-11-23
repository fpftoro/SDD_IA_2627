# AGENTS.md

Préstamo de portátiles del centro: API REST en Node.js con Express. Los
principios del proyecto están en `constitution.md`, y el porqué del
producto, en `docs/prd.md`.

## Comandos

- Instalar las dependencias: `npm install`
- Arrancar la API: `npm start` (puerto 3000; otro con `PUERTO=3100 npm start`)
- Ejecutar los tests: `npm test`

## Estructura

- `src/app.js`: crea la aplicación de Express y monta las rutas.
- `src/servidor.js`: arranca el servidor.
- `src/rutas/`: rutas de la API. Reciben la petición, llaman a un servicio y responden.
- `src/servicios/`: lógica de negocio. Son los únicos que acceden a los datos.
- `src/datos/`: datos de la aplicación (por ahora, en memoria).
- `test/`: tests de Vitest, un fichero por servicio.
- `docs/`: PRD y, más adelante, las specs (`docs/specs/`).

## Convenciones

- JavaScript con módulos ES (`import` y `export`).
- Identificadores en español (`listarPortatiles`, `buscarPortatil`).
- Comillas simples, punto y coma y dos espacios de sangría.
- JSDoc (`@param`, `@returns`) en todas las funciones de los servicios.

## Prohibiciones

- No añadas dependencias sin preguntar antes.
- No escribas claves, contraseñas ni tokens en ningún fichero del repositorio.
- No modifiques `constitution.md`: si una tarea la contradice, avisa.
- No borres ni desactives tests para que pasen.

## Al terminar una tarea

Ejecuta `npm test` y comprueba que pasan todos los tests.
