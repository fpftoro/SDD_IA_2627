# Tests

- Vitest. Un fichero por módulo: `tests/servicio-<nombre>.test.js` para los
  unitarios y `tests/api-<nombre>.test.js` para los de integración.
- El nombre de cada test empieza por el identificador de la spec que
  comprueba: `test('EC-02: responde 404 si el portátil no existe', …)`.
- Los mensajes de error se comprueban con el texto exacto de la spec.
- Los tests de la API usan supertest contra `app`, sin arrancar el
  servidor, y envían la identificación con las cabeceras `X-Usuario` y
  `X-Papel` cuando la ruta la pide.
- Para provocar un fallo, `vi.spyOn` sobre el repositorio y
  `vi.restoreAllMocks()` en `afterEach`.
- Nunca cambies un test para que pase: si crees que está mal, dilo.
