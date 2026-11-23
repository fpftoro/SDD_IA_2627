# Plan: Consultar los portátiles

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Consultar los portátiles |
| Spec    | spec.md, versión 1.0 |
| Estado  | Aprobado             |

## Visión general

Dos endpoints de lectura, GET /api/portatiles y GET /api/portatiles/:id,
con las capas de la constitución. Los datos, en memoria.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-portatiles.js | Nuevo | Datos en memoria: obtenerTodos y obtenerPorId |
| src/servicios/servicio-portatiles.js | Nuevo | listarPortatiles y buscarPortatil, con las validaciones |
| src/controladores/controlador-portatiles.js | Nuevo | Traduce peticiones y errores a respuestas HTTP |
| src/rutas/portatiles.js | Nuevo | Rutas GET / y GET /:id |
| src/app.js, src/servidor.js | Nuevos | Aplicación y arranque |
| tests/servicio-portatiles.test.js | Nuevo | Tests unitarios del servicio |
| tests/api-portatiles.test.js | Nuevo | Tests de la API con supertest |

## Decisiones técnicas

- D-01: Validación en el servicio (EC-01, EC-03): lanza ErrorValidacion
  con el mensaje de la spec; el controlador responde 400.
- D-02: Portátil que no existe (EC-02): el servicio lanza
  ErrorNoEncontrado; el controlador responde 404.
- D-03: Orden (RF-01): el servicio ordena por codigo; el repositorio no
  garantiza ningún orden.
- D-04: Errores inesperados (EC-05): el controlador responde 500 con el
  mensaje de la spec.
- D-05: El repositorio devuelve copias, para que nadie cambie los datos
  desde fuera.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| A-RF-01, A-AC-01 | Unitario e integración: los 6, ordenados por código | Los dos ficheros |
| A-RF-02, A-AC-02 | Unitario e integración: filtro por estado | Los dos ficheros |
| A-RF-03, A-AC-03 | Unitario e integración: el portátil 3 | Los dos ficheros |
| A-EC-01 | Unitario e integración: estados no válidos → 400 | Los dos ficheros |
| A-EC-02 | Unitario e integración: id 99 → 404 | Los dos ficheros |
| A-EC-03 | Unitario e integración: ids no válidos → 400 | Los dos ficheros |
| A-EC-04 | Integración: ningún portátil con ese estado → 200 [] | tests/api-portatiles.test.js |
| A-EC-05 | Integración: el repositorio falla → 500 | tests/api-portatiles.test.js |
| A-RNF-01 | Integración: 500 portátiles, menos de 200 ms | tests/api-portatiles.test.js |
