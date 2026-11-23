# Plan: Marcar una tarea como hecha

## Metadatos

| Campo   | Valor                       |
|---------|-----------------------------|
| Feature | Marcar una tarea como hecha |
| Spec    | spec.md, versión 1.0        |
| Estado  | Aprobado                    |

## Visión general

La feature añade `POST /tareas/:id/hecha`. Sigue las capas de A y B. Es la primera feature que **busca una tarea por su id**, así que añade esa búsqueda al repositorio y el error de «no encontrada», que la feature D necesitará también.

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios; la comprobación, en el servicio (D-02).
- [x] Respuestas JSON y errores `{ error: "mensaje" }` con el código HTTP adecuado (D-03).
- [x] Sin dependencias nuevas.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/errores/error-no-encontrado.js | Nuevo | Clase ErrorNoEncontrado |
| src/repositorios/repositorio-tareas.js | Modificado | Añade buscarPorId y actualizar |
| src/servicios/servicio-tareas.js | Modificado | Añade completarTarea |
| src/controladores/controlador-tareas.js | Modificado | Añade completarTareaHttp y traduce ErrorNoEncontrado a 404 |
| src/rutas/tareas.js | Modificado | Añade POST /:id/hecha |
| tests/api-completar.test.js | Nuevo | Pruebas de la feature (ya revisadas) |

## Decisiones técnicas

- **D-01: Ruta `POST /tareas/:id/hecha`.** *Cubre:* RF-01, RF-02. *Alternativa descartada:* `PATCH /tareas/:id` con un cuerpo; la spec fija la ruta.
- **D-02: El servicio busca la tarea y la actualiza**; si no existe, lanza `ErrorNoEncontrado`. *Cubre:* RF-01, RF-03, EC-01, EC-02. *Alternativa descartada:* hacerlo en el controlador (rompe la constitución).
- **D-03: Clase `ErrorNoEncontrado`** nueva, traducida a 404 con `{ error: "La tarea no existe" }`. *Cubre:* EC-01.
- **D-04: El repositorio** añade `buscarPorId(id)` y `actualizar(tarea)`. *Cubre:* RF-01.

## Estrategia de pruebas

| Identificador | Prueba |
|---------------|--------|
| RF-01, RF-02, AC-01 | Integración con supertest |
| RF-03, AC-02 | Integración |
| EC-01, EC-02 | Integración |

## Riesgos

- La feature D necesita la misma búsqueda y el mismo error: D trae `main` antes de planificar su parte.
