# Plan: Añadir una tarea

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Añadir una tarea     |
| Spec    | spec.md, versión 1.3 |
| Estado  | Aprobado             |

## Decisiones técnicas

- D-01: Validación del texto (EC-01, EC-02, EC-05): en el servicio; el
  controlador traduce ErrorValidacion a 400.
- D-02: Errores inesperados (EC-03): 500 { error: "Error al guardar la
  tarea" }.
- D-03: Identificador (RNF-03): crypto.randomUUID(), en el servicio.
- D-04: Almacenamiento: un array en memoria dentro del repositorio.
- D-05: Texto recortado (RF-04, RNF-02) antes de comprobar.
- D-06: Campos extra (EC-04): el controlador solo lee text.
- D-07: app.js exporta la aplicación sin arrancarla.
- D-08: Página (RF-03, AC-01, AC-02): fetch y la tarea al final, sin
  recargar.
- D-09: Cuerpo que no es JSON (EC-05): manejador de errores al final de
  src/app.js.
- D-10: Errores en la página (EC-06, AC-04): párrafo con role="alert".

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, RNF-03 | Unitario | tests/servicio-tareas.test.js |
| RF-02, AC-03 | Integración: 201 con la tarea completa y la fecha en ISO 8601 | tests/api-tareas.test.js |
| RF-04 | Unitario | tests/servicio-tareas.test.js |
| EC-01 | Unitario e integración | Los dos ficheros |
| EC-02, RNF-02 | Unitario e integración: 280 se aceptan, 281 no | Los dos ficheros |
| EC-03 | Integración: el repositorio falla → 500 | tests/api-tareas.test.js |
| EC-04 | Integración: un campo extra no aparece | tests/api-tareas.test.js |
| EC-05 | Unitario e integración, también el cuerpo que no es JSON | Los dos ficheros |
| RNF-01 | Integración: 1.000 tareas, menos de 200 ms | tests/api-tareas.test.js |
| RF-03, AC-01, AC-02, AC-04, EC-06 | A mano en el navegador | Lista de comprobación de la task de la página |
