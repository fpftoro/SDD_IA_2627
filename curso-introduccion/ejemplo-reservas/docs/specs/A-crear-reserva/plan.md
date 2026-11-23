# Plan: Crear una reserva

## Metadatos

| Campo   | Valor |
|---------|-------|
| Feature | Crear una reserva |
| Spec    | spec.md, versión 1.0 |
| Estado  | Aprobado |

> Plan de **referencia**, escrito sin tecnología concreta: las firmas usan una notación neutra que cada persona traduce a su lenguaje.

## Visión general

Se construye de dentro hacia fuera: el almacenamiento de reservas, la lógica que valida y crea, y al final la entrada, el adaptador mínimo que usa la tecnología del módulo (consola, ruta de una API o formulario). Los tests de la feature van primero y prueban la lógica, que es donde están las reglas.

## Comprobación de la constitución

- [x] Tres capas: la entrada no contiene reglas, la lógica no sabe cómo se guardan los datos (D-01, D-06).
- [x] Errores con código estable y mensaje (D-02).
- [x] La fecha de hoy no se lee dentro de la lógica (D-03).
- [x] Tests desde la spec y antes que el código (secuencia de implementación).

## Ficheros

| Fichero (nombre orientativo) | Responsabilidad |
|------------------------------|-----------------|
| Módulo de errores | El tipo de error con código y mensaje |
| Módulo de almacenamiento de reservas | Guardar y buscar reservas |
| Módulo de lógica de reservas | Validar y crear la reserva |
| Entrada | Convertir lo que pide quien usa el sistema en una llamada a la lógica |
| Tests de la lógica | Un test por AC y por EC |

## Decisiones técnicas

- D-01: Capas (todas). La lógica y el almacenamiento son módulos separados; la lógica recibe el almacenamiento y no sabe si guarda en memoria, en fichero o en base de datos.
  - Descartado: guardar desde la propia lógica. Mezcla reglas y datos.
- D-02: Errores (EC-01 a EC-10). Un único tipo de error con `codigo` y `mensaje`; los tests comprueban el código y el mensaje de la spec.
- D-03: Fecha de hoy (EC-03). La lógica recibe `hoy` (AAAA-MM-DD) como parámetro; la entrada la obtiene del sistema. Así los tests fijan el día.
  - Descartado: leer la fecha del sistema dentro de la lógica. Los tests dependerían del día en que se ejecutan.
- D-04: Orden de las validaciones (EC-11). Se comprueba en el orden de la lista de EC-11 y se devuelve el primer error. Los formatos (EC-09 y EC-10) van antes que las reglas que comparan fechas y horas.
- D-05: Solapamiento (EC-08). Las horas se convierten a minutos desde medianoche y dos franjas se solapan si `inicio < finAjeno` y `fin > inicioAjeno`. Solo cuentan las reservas activas de la misma sala y fecha. Las franjas consecutivas (11:00 y 11:00) no se solapan.
- D-06: Identificador (RF-01, RNF-01). Lo genera el almacenamiento al guardar (un contador o un identificador único, según la tecnología). Quien solicita no lo envía.
- D-07: Almacenamiento (constitución, «Cómo se guardan los datos»). En memoria, si la constitución no dice otra cosa: las reservas se pierden al reiniciar, y se acepta porque la spec no pide conservarlas.
  - Descartado: una base de datos que la constitución no prevé. Añade una dependencia que nada de la spec necesita.
- D-08: Formatos (RNF-02, EC-09, EC-10). La lógica comprueba que la fecha tiene el formato AAAA-MM-DD y existe en el calendario, y que las horas son HH:MM de 00:00 a 23:59. La entrada solo convierte lo que recibe en datos.
  - Descartado: comprobar los formatos en la entrada. Cada tecnología lo haría a su manera y los tests de la lógica no lo verían.

## Firmas

```text
ErrorReserva(codigo, mensaje)

almacenamiento.guardar(datosReserva) -> Reserva         (asigna id y estado "activa")
almacenamiento.reservasActivas(sala, fecha) -> lista de Reserva
almacenamiento.vaciar()                                  (solo para los tests)

logica.crearReserva(datos, hoy) -> Reserva
    datos = { sala, fecha, inicio, fin, nombre }
    lanza ErrorReserva con uno de: datos_incompletos, sala_desconocida,
    fecha_invalida, hora_invalida, fecha_pasada, franja_invalida,
    franja_no_alineada, duracion_no_permitida, fuera_de_horario,
    sala_ocupada

Reserva = { id, sala, fecha, inicio, fin, nombre, estado }
```

## Secuencia de implementación

1. Tests de la lógica (T-01), en rojo.
2. Errores y almacenamiento (T-02).
3. Lógica: validaciones y creación (T-03).
4. Entrada (T-04).

Cada paso usa el anterior; los tests primero, como pide la constitución.

## Estrategia de pruebas

| Spec | Cómo se comprueba |
|------|-------------------|
| RF-01, RF-02, RF-03, AC-01 | Lógica: crear una reserva válida; datos devueltos; nombre recortado |
| RNF-01, AC-04 | Lógica: dos reservas tienen identificadores distintos |
| AC-02, AC-03, EC-08 | Lógica: otra sala, franja consecutiva y solapamientos (los dos lados del límite) |
| EC-01 a EC-07, EC-09, EC-10 | Lógica: un test por error, con el código y el mensaje exactos |
| RNF-02 | Lógica: los tests de EC-09 y EC-10 (fecha inexistente, hora «25:90», hora «9:5») |
| EC-11 | Lógica: una petición con dos errores devuelve el primero de la lista |

## Riesgos y dudas

- La entrada depende de la tecnología: es la parte que cada alumno resuelve a su manera y la única que no se prueba con los tests de la lógica.
