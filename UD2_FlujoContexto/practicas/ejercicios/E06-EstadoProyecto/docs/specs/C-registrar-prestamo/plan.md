# Plan: Registrar el préstamo

## Metadatos

| Campo   | Valor                 |
|---------|-----------------------|
| Feature | Registrar el préstamo |
| Spec    | spec.md, versión 1.0  |
| Estado  | Aprobado              |
| Fecha   | AAAA-MM-DD            |
| Autor   | <nombre>              |

## Visión general

La feature añade POST /api/prestamos. Reutiliza el middleware
usuario-actual y amplía el repositorio de portátiles para buscar por
código y cambiar el estado.

## Contexto técnico

El de la sección Tecnología de la constitución. Datos en memoria.

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios (D-01).
- [x] Errores { error: "mensaje" } en español (D-01).
- [x] Fechas en ISO 8601 y UTC (D-02).
- [x] Sin dependencias nuevas (D-02).
- [x] Tests antes que el código.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/utilidades/reloj.js | Nuevo | ahora() y limiteDeHoy() |
| src/errores/error-conflicto.js | Nuevo | Clase ErrorConflicto (409) |
| src/repositorios/repositorio-portatiles.js | Modificado | buscarPorCodigo y cambiarEstado |
| src/repositorios/repositorio-prestamos.js | Nuevo | Préstamos en memoria |
| src/servicios/servicio-prestamos.js | Nuevo | registrarPrestamo |
| src/controladores/controlador-prestamos.js | Nuevo | Traduce la petición y los errores |
| src/rutas/prestamos.js | Nuevo | POST / con usuario-actual |
| src/app.js | Modificado | Monta /api/prestamos |
| tests/servicio-prestamos.test.js | Nuevo | Tests unitarios |
| tests/api-prestamos.test.js | Nuevo | Tests de integración |

## Decisiones técnicas

- D-01: Comprobaciones en el servicio (EC-02 a EC-05), con
  ErrorValidacion, ErrorNoEncontrado y ErrorConflicto.
  - Descartado: comprobar el estado en el controlador.
- D-02: Fecha límite (RF-04, RNF-01). reloj.limiteDeHoy() construye las
  14:30 de hoy en Europe/Madrid con el desfase de Intl y la devuelve en
  UTC.
  - Descartado: una librería de fechas.
- D-03: Sin cambios a medias (EC-06). Primero se guarda el préstamo y
  después se cambia el portátil.

## Dependencias

Ninguna.

## Secuencia de implementación

1. Tests unitarios del servicio.
2. Reloj, error, repositorios y servicio (D-01, D-02, D-03).
3. Tests de integración.
4. Controlador, ruta y montaje.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, RF-03, AC-01 | Unitario e integración | Los dos ficheros |
| RF-02 | Unitario: el portátil pasa a prestado | tests/servicio-prestamos.test.js |
| RF-04, RNF-01 | Unitario: 14:30 en invierno y en verano | tests/servicio-prestamos.test.js |
| RNF-02, EC-01 | Integración | tests/api-prestamos.test.js |
| EC-02, EC-03 | Unitario e integración | Los dos ficheros |
| EC-04, AC-02 | Unitario e integración | Los dos ficheros |
| EC-05, AC-03 | Unitario e integración | Los dos ficheros |
| EC-06 | Unitario e integración | Los dos ficheros |

## Riesgos y dudas

- Los datos se pierden al reiniciar el servidor.
