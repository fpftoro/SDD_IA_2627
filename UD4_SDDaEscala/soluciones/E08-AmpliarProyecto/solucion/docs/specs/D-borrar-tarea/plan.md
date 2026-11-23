# Plan: Borrar una tarea

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Borrar una tarea     |
| Spec    | spec.md, versión 1.0 |
| Estado  | Aprobado (1.1)       |

## Visión general

La feature añade `DELETE /tareas/:id`. Sigue las capas de A y B. La búsqueda por id y el error de «no encontrada» **ya existen** (feature C): esta feature los reutiliza y solo añade el borrado.

## Comprobación de la constitución

- [x] Capas respetadas; la comprobación, en el servicio (D-02).
- [x] Errores `{ error: "mensaje" }`; la respuesta 204 no lleva cuerpo, como admite la constitución.
- [x] Sin dependencias nuevas.
- [x] Reutiliza lo que ya hay de la feature C antes de crear nada (D-03, D-04).

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-tareas.js | Modificado | Añade eliminar |
| src/servicios/servicio-tareas.js | Modificado | Añade borrarTarea |
| src/controladores/controlador-tareas.js | Modificado | Añade borrarTareaHttp y traduce ErrorNoEncontrado a 404 |
| src/rutas/tareas.js | Modificado | Añade DELETE /:id |
| tests/api-borrar.test.js | Nuevo | Pruebas de la feature (ya revisadas) |

## Decisiones técnicas

- **D-01: Ruta `DELETE /tareas/:id`.** *Cubre:* RF-01, RF-02.
- **D-02: El servicio busca la tarea, la elimina y no devuelve nada**; si no existe, lanza `ErrorNoEncontrado`. *Cubre:* RF-01, EC-01, EC-02.
- **D-03: Se reutiliza `ErrorNoEncontrado` de la feature C**, que el controlador ya traduce a 404 con `{ error: "La tarea no existe" }`. No se crea ninguna clase nueva. *Cubre:* EC-01, EC-02. *Alternativa descartada:* una clase propia (duplicaría la de C).
- **D-04: Se reutiliza `buscarPorId(id)` de la feature C** y el repositorio solo añade `eliminar(id)`. *Cubre:* RF-01.

## Estrategia de pruebas

| Identificador | Prueba |
|---------------|--------|
| RF-01, RF-02, AC-01, AC-02 | Integración con supertest |
| EC-01, EC-02 | Integración |
