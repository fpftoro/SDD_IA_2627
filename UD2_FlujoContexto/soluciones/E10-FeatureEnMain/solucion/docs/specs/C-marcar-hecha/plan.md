# Plan: Marcar una tarea como hecha

## Metadatos

| Campo   | Valor                       |
|---------|-----------------------------|
| Feature | Marcar una tarea como hecha |
| Spec    | spec.md, versión 1.1        |
| Estado  | Aprobado                    |
| Fecha   | AAAA-MM-DD                  |
| Autor   | <nombre>                    |

## Visión general

La feature añade PATCH /tareas/:id y una casilla por tarea en la página.
Reutiliza el repositorio, el servicio, el controlador y la página de las
features A y B. Se construye de dentro afuera: repositorio y servicio,
API y, al final, la página.

## Contexto técnico

El de la sección Tecnología de la constitución. Datos en memoria, en el
repositorio de la feature A.

## Comprobación de la constitución

- [x] Capas controladores → servicios → repositorios; las comprobaciones,
  en el servicio (D-01).
- [x] Respuestas JSON y errores { error: "mensaje" } en español (D-02).
- [x] Fechas en ISO 8601 (D-03).
- [x] Página en HTML y JavaScript sin framework (D-06).
- [x] Sin dependencias nuevas.
- [x] Tests antes que el código, y cada identificador con su test o su
  comprobación a mano.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/errores/error-no-encontrado.js | Nuevo | Clase ErrorNoEncontrado (404) |
| src/repositorios/repositorio-tareas.js | Modificado | buscarPorId y actualizar |
| src/servicios/servicio-tareas.js | Modificado | marcarTarea |
| src/controladores/controlador-tareas.js | Modificado | marcarTareaHttp |
| src/rutas/tareas.js | Modificado | Ruta PATCH /:id |
| public/app.js | Modificado | Casilla por tarea y PATCH al cambiarla |
| public/index.html | Modificado | Estilo del texto tachado |
| tests/servicio-tareas.test.js | Modificado | Tests unitarios de marcarTarea |
| tests/api-tareas.test.js | Modificado | Tests de integración de PATCH /tareas/:id |

## Decisiones técnicas

- D-01: Comprobaciones (EC-01 a EC-04, EC-08). En el servicio, primero el
  campo hecha y después la tarea. Marcar una tarea que ya tiene ese estado
  la devuelve sin cambios.
  - Descartado: comprobar el estado en el controlador.
- D-02: Errores. ErrorNoEncontrado nuevo para el 404; el controlador
  traduce ErrorValidacion a 400, ErrorNoEncontrado a 404 y el resto a 500
  con el mensaje de EC-07.
- D-03: Fecha (RF-02, RNF-02). new Date().toISOString() en el servicio,
  nunca del cuerpo.
- D-04: Sin cambios a medias (EC-07). El servicio construye una tarea
  nueva y el repositorio la sustituye en un solo paso: si falla, la
  guardada no ha cambiado.
- D-05: Campos (EC-06). El controlador solo lee hecha.
- D-06: Página (RF-06, RF-07, AC-05). Una casilla por tarea, con una
  etiqueta accesible; al cambiarla, PATCH y se repinta la tarea con la
  respuesta. La clase hecha tacha el texto con CSS. Si falla, el mensaje
  en el párrafo de errores y la casilla vuelve a su estado.
  - Descartado: recargar la lista entera tras cada cambio. RF-07 pide
    no recargar, y una petición basta.
- D-07: Peticiones a la vez (EC-05). Con los datos en memoria y un solo
  proceso, Node atiende las peticiones de una en una: gana la última.

## Dependencias

Ninguna.

## Secuencia de implementación

1. Tests unitarios de marcarTarea.
2. ErrorNoEncontrado, repositorio y servicio (D-01, D-03, D-04).
3. Tests de integración de PATCH /tareas/:id.
4. Controlador y ruta (D-02, D-05).
5. Página (D-06), con su comprobación a mano.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, RF-02, AC-01 | Unitario e integración: estado hecha y fecha en ISO 8601 | Los dos ficheros |
| RF-03, RF-04, AC-02 | Unitario e integración: pendiente y fechaCompletado null | Los dos ficheros |
| RF-05 | Integración: 200 con la tarea actualizada | tests/api-tareas.test.js |
| AC-03, EC-03 | Unitario e integración: la fecha no cambia | Los dos ficheros |
| EC-04 | Unitario: desmarcar una pendiente no cambia nada | tests/servicio-tareas.test.js |
| AC-04, EC-02 | Unitario e integración: "sí", 1 y null → 400, y la tarea sigue pendiente | Los dos ficheros |
| EC-01 | Unitario e integración: 404 | Los dos ficheros |
| EC-06 | Integración: un text en el cuerpo no cambia el texto | tests/api-tareas.test.js |
| EC-07 | Integración: el repositorio falla → 500 y la tarea sigue pendiente | tests/api-tareas.test.js |
| EC-08 | Unitario: tarea inexistente y hecha no válido → error de EC-02 | tests/servicio-tareas.test.js |
| RNF-01 | Integración: con 1.000 tareas, menos de 200 ms | tests/api-tareas.test.js |
| RNF-02 | Unitario: la fecha es la del reloj del servidor, fijado en el test | tests/servicio-tareas.test.js |
| EC-05 | No se prueba: D-07 explica por qué gana la última petición | — |
| RF-06, RF-07, AC-05 | A mano en el navegador | Lista de comprobación de T-05 |

## Riesgos y dudas

- EC-05 depende de que haya un solo proceso con los datos en memoria. Si
  una spec pide persistencia, habrá que revisarlo.
