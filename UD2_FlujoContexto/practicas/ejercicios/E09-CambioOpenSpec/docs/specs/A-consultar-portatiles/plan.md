# Plan: Consultar los portátiles

## Metadatos

| Campo   | Valor                    |
|---------|--------------------------|
| Feature | Consultar los portátiles |
| Spec    | spec.md, versión 1.0     |
| Estado  | Aprobado                 |
| Fecha   | AAAA-MM-DD               |
| Autor   | <nombre>                 |

## Visión general

La feature crea los dos primeros endpoints de la API, de solo lectura:
GET /api/portatiles y GET /api/portatiles/:id. Se construye de dentro
afuera: el repositorio con los datos, el servicio con las validaciones y
el orden, y la capa HTTP (controlador, rutas y aplicación).

## Contexto técnico

El de la sección Tecnología de la constitución: Node.js con módulos ES,
Express 5, Vitest y supertest. Datos en memoria (D-05).

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios; las
  validaciones, en el servicio (D-01, D-02).
- [x] Respuestas JSON y errores { error: "mensaje" } en español (D-01,
  D-02, D-04).
- [x] Rutas bajo /api/ y en español.
- [x] Sin datos personales del alumnado.
- [x] Datos en memoria, en el repositorio (D-05).
- [x] Sin dependencias fuera de la sección Tecnología.
- [x] Tests antes que el código, y una fila de pruebas por identificador.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| package.json | Nuevo | Dependencias y scripts: npm start y npm test |
| .gitignore | Nuevo | Deja node_modules/ fuera del repositorio |
| src/errores/error-validacion.js | Nuevo | Clase ErrorValidacion (400) |
| src/errores/error-no-encontrado.js | Nuevo | Clase ErrorNoEncontrado (404) |
| src/repositorios/repositorio-portatiles.js | Nuevo | Datos en memoria: obtenerTodos y obtenerPorId |
| src/servicios/servicio-portatiles.js | Nuevo | listarPortatiles y buscarPortatil, con las validaciones y el orden |
| src/controladores/controlador-portatiles.js | Nuevo | Traduce la petición al servicio y los errores a respuestas |
| src/rutas/portatiles.js | Nuevo | Rutas GET / y GET /:id |
| src/app.js | Nuevo | Crea la aplicación de Express sin arrancarla |
| src/servidor.js | Nuevo | Arranca la aplicación en un puerto |
| tests/servicio-portatiles.test.js | Nuevo | Tests unitarios del servicio |
| tests/api-portatiles.test.js | Nuevo | Tests de integración de la API, con supertest |

## Decisiones técnicas

- D-01: Validaciones (EC-01, EC-03). En el servicio: lanza un
  ErrorValidacion con el mensaje de la spec y el controlador responde
  400.
  - Descartado: validar en el controlador. Pone lógica de negocio en la
    capa HTTP.
- D-02: Portátil que no existe (EC-02). El servicio lanza un
  ErrorNoEncontrado y el controlador responde 404.
- D-03: Orden (RF-01, RF-02). El servicio ordena por código; el
  repositorio no garantiza ningún orden.
- D-04: Errores inesperados (EC-05). Cualquier otro error termina en el
  controlador como 500 { error: "Error al consultar los portátiles" }.
- D-05: Almacenamiento. Un array en memoria con los seis portátiles de
  los criterios de aceptación; el repositorio devuelve copias, para que
  nadie cambie los datos desde fuera.
  - Descartado: un fichero JSON. Ninguna spec pide todavía que los datos
    sobrevivan a un reinicio.
- D-06: Aplicación y servidor separados. app.js exporta la aplicación sin
  ponerla a escuchar, para que los tests de la API no abran puertos.

## Dependencias

| Paquete | Producción o desarrollo | Para qué |
|---------|-------------------------|----------|
| express | Producción | La API |
| vitest | Desarrollo | Tests |
| supertest | Desarrollo | Tests de la API sin abrir puertos |

## Secuencia de implementación

1. Tests del servicio (todas las filas «Unitario» de la estrategia de
   pruebas).
2. Errores, repositorio y servicio (D-01, D-02, D-03, D-05).
3. Tests de la API (todas las filas «Integración»).
4. Controlador, rutas, aplicación y servidor (D-04, D-06).

El controlador llama al servicio y el servicio, al repositorio. Los tests
de cada parte van antes que su código, como pide la constitución.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, AC-01 | Unitario e integración: los 6, ordenados por código | Los dos ficheros |
| RF-02, AC-02 | Unitario e integración: filtro por estado, en el mismo orden | Los dos ficheros |
| RF-03, AC-03 | Unitario e integración: el portátil 3 | Los dos ficheros |
| EC-01 | Unitario e integración: estados no válidos → 400 | Los dos ficheros |
| EC-02 | Unitario e integración: id 99 → 404 | Los dos ficheros |
| EC-03 | Unitario e integración: ids no válidos → 400 | Los dos ficheros |
| EC-04 | Integración: ningún portátil con ese estado → 200 [] | tests/api-portatiles.test.js |
| EC-05 | Integración: el repositorio falla → 500 | tests/api-portatiles.test.js |
| RNF-01 | Integración: con 500 portátiles, menos de 200 ms | tests/api-portatiles.test.js |

## Riesgos y dudas

- Los datos se pierden al reiniciar el servidor (D-05). Se acepta
  mientras ninguna spec pida otra cosa.
