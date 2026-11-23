# Plan · D · Registrar la devolución

| Campo | Valor |
|-------|-------|
| Spec | spec.md 1.0 |
| Estado | Aprobado |

## Decisiones

- **D-01:** La devolución es `POST /prestamos/:id/devolucion` con un cuerpo `{ fecha, cargador }`.
- **D-02:** El servicio `registrarDevolucion(idPrestamo, datos)` valida la fecha y llama al repositorio de préstamos. Lanza `ErrorValidacion` y `ErrorNoEncontrado`.
- **D-03:** El repositorio de préstamos añade `marcarDevuelto(id, datos)` y `buscarPorId(id)`. El portátil queda disponible a través del repositorio de portátiles.
- **D-04:** `ErrorNoEncontrado` ya existe en `src/errores/`: se reutiliza.

## Estrategia de pruebas

| Identificador | Prueba |
|---------------|--------|
| RF-01, RF-02, RF-03 | Integración con supertest |
| EC-01 | Unitaria del servicio e integración |
| EC-03 | Unitaria del servicio |
