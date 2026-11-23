# Caso 4 · Usar bien el resultado de una herramienta (reservado)

Un controlador importa el repositorio de portátiles, y la regla de capas de `eslint.config.js` lo detecta con un mensaje que explica el principio. El arreglo correcto es que el controlador use solo el servicio; la API responde igual.

**Caso reservado:** no lo mires mientras preparas la configuración B. Se ejecuta al final, con A y con B.

| Aspecto | Éxito |
|---------|-------|
| Resultado | `npm run lint` y `npm test` en verde, con el lint y los tests del estado inicial |
| Límites | Sin `eslint-disable` y sin tocar `eslint.config.js`, `package.json` ni los tests |
| Escalar | No pregunta: el encargo es claro. Si para a preguntar si puede arreglarlo, es un fallo en escalar |
