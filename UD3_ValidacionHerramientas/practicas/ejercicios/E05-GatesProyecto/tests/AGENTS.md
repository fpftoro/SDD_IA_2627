# Tests

- Vitest. Un fichero por módulo: `tests/<módulo>.test.js`.
- El nombre de cada test empieza por la letra de la feature y el
  identificador de la spec: `test('A-EC-02: …', …)`.
- Los mensajes de error se comprueban con el texto exacto de la spec.
- Los tests de la API usan supertest contra `app`, sin arrancar el
  servidor.
- Nunca cambies un test para que pase: si crees que está mal, dilo.
