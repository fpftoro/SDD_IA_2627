# Tasks: Marcar una tarea como hecha

| Campo   | Valor                       |
|---------|-----------------------------|
| Feature | Marcar una tarea como hecha |
| Plan    | plan.md (aprobado)          |
| Estado  | Aprobadas                   |

## Grupo 1 · Servicio (D-01, D-03, D-04)

- [x] T-01: Tests de marcarTarea
  - Fichero: tests/servicio-tareas.test.js
  - Cubre: RF-01 a RF-04, AC-01 a AC-04, EC-01 a EC-04, EC-08, RNF-02
  - Terminada cuando: los tests existen y fallan, porque marcarTarea aún
    no existe

- [x] T-02: Error, repositorio y servicio
  - Ficheros: src/errores/error-no-encontrado.js,
    src/repositorios/repositorio-tareas.js, src/servicios/servicio-tareas.js
  - Depende de: T-01
  - Terminada cuando: los tests de T-01 pasan y los anteriores siguen en
    verde
  - Tres ficheros: el error y las dos funciones del repositorio son de
    pocas líneas y solo los usa el servicio.

> Punto de control: revisar los cambios, ejecutar los tests, hacer commit y subir la rama.

## Grupo 2 · API (D-02, D-05)

- [x] T-03: Tests de PATCH /tareas/:id
  - Fichero: tests/api-tareas.test.js
  - Cubre: RF-01 a RF-05, AC-01 a AC-04, EC-01, EC-02, EC-03, EC-06,
    EC-07, RNF-01
  - Depende de: T-02
  - Terminada cuando: los tests existen y fallan, porque la ruta aún no
    existe

- [x] T-04: Controlador y ruta
  - Ficheros: src/controladores/controlador-tareas.js, src/rutas/tareas.js
  - Depende de: T-03
  - Terminada cuando: todos los tests pasan

> Punto de control: revisar los cambios, ejecutar los tests, hacer commit y subir la rama.

## Grupo 3 · Página (D-06)

- [x] T-05: Casilla por tarea y texto tachado
  - Ficheros: public/app.js, public/index.html
  - Cubre: RF-06, RF-07, AC-05
  - Depende de: T-04
  - Terminada cuando: con el servidor arrancado, al marcar una tarea su
    texto se tacha y dice «(hecha)» sin recargar; al desmarcarla vuelve a
    «(pendiente)»; al recargar la página, se conserva el estado

> Punto de control: revisar los cambios, comprobar la página a mano, hacer commit y subir la rama.
