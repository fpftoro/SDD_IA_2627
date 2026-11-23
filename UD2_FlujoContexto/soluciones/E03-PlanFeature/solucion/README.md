# El plan de una feature

Plan: [`docs/specs/B-reservar-carro/plan.md`](./docs/specs/B-reservar-carro/plan.md)

> Esta respuesta es un **ejemplo comentado**: cada sesión con el agente es distinta, así que la tuya no tiene que coincidir. Lo que importa es el proceso (qué pediste, qué revisaste, qué decidiste y por qué) y el plan aprobado. La sesión exportada no se incluye por eso mismo.

## Sesión con el agente

Proveedor y modelo: <proveedor>/<modelo>

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | plan | El prompt del tema 2 para la feature B, con la indicación de leer el código de A y su plan | Un plan con todas las secciones, nueve decisiones y una estrategia de pruebas de veinte filas | Nada todavía: primero leerlo entero |
| 2 | plan | «¿Por qué D-04 usa dayjs? Dame una alternativa sin dependencias y compáralas.» | Explica que dayjs simplifica sumar días y la zona horaria; la alternativa con Date e Intl.DateTimeFormat | Rechazo dayjs (decisión 1): la constitución no deja añadir dependencias sin acordarlo, y Date e Intl bastan |
| 3 | plan | «Rechazo D-02: las comprobaciones del cuerpo van en el servicio, no en un middleware de la ruta. Rehazla y anota la alternativa descartada.» | D-02 rehecha, con el middleware como alternativa descartada | Aceptada la nueva versión |
| 4 | plan | «Recorre la spec identificador por identificador y dime cuáles no aparecen en la estrategia de pruebas.» | Faltaban RNF-04, EC-15 y EC-16 | Le pido las tres filas; para RNF-04, una hora en la que la fecha en UTC y la peninsular sean distintas |
| 5 | plan | «¿Cómo vas a fijar el día de hoy en los tests?» | Propone sustituir reloj.hoy() con vi.spyOn | Aceptada: es D-05 |
| 6 | build | El prompt de guardar del tema 2, con el estado `En revisión` | `plan.md` guardado; `git status` muestra solo ese fichero | Nada |
| 7 | — | Revisión con la lista del punto de control 2 | Dos fallos: D-03 sin alternativa descartada y la secuencia sin el porqué | Los corrijo a mano y paso el plan a `Aprobado` |

Sesión exportada: `sesiones/plan.md` (no incluida en la solución).

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| dayjs para las fechas | Rechazada | Dependencia que la constitución no recoge; Date e Intl cubren la validación, el día de la semana y la zona horaria |
| Validar el cuerpo con un middleware en la ruta | Rechazada | La constitución pone la lógica de negocio en el servicio |
| Sacar los carros de los datos de los portátiles | Rechazada | La spec fija A, B y C, y el carro C no tiene portátiles en los datos de A |
| Paginación en GET /api/reservas «por si hay muchas» | Rechazada | Sobreingeniería: la spec no la pide y un día tiene como mucho 18 reservas (3 carros × 6 horas) |
| Reutilizar el middleware usuarioActual | Aceptada | Ya responde 401 con el mensaje de EC-01 |
| ErrorConflicto nuevo para el 409 | Aceptada | No existía; sigue el patrón de los otros errores |
| reloj.hoy() en un módulo propio, sustituible en los tests | Aceptada | Sin él, los tests de EC-08 y EC-09 dependerían del día en que se ejecuten |
| crypto.randomUUID() para el id | Aceptada | Viene con Node; un contador no aporta nada |

## Huecos de la spec

El agente marcó una duda: «¿qué responde la consulta si el repositorio falla al leer?». No es un hueco: lo decide EC-15. Se lo indiqué y lo recogió en D-08.

No encontré ningún hueco de la spec, así que no hay versión 1.1.

## Lista de comprobación

**Respeto a la constitución**

- [x] La sección «Comprobación de la constitución» recorre todos sus principios.
- [x] La arquitectura y la tecnología son las de la constitución.
- [x] Los errores siguen el formato acordado.

**Cobertura de la spec**

- [x] Cada requisito, criterio y *edge case* aparece en la estrategia de pruebas, con un tipo de prueba que lo ve.
- [x] El plan no añade comportamiento que no esté en la spec.
- [x] El plan no contradice nada de la spec (códigos, mensajes, límites).

**Decisiones**

- [x] Cada decisión tiene motivo y alternativa descartada.
- [x] Cada dependencia nueva está justificada y no la cubre algo que ya hay.
- [x] No hay sobreingeniería: nada que la spec no necesite.

**Viabilidad**

- [x] La secuencia respeta las dependencias entre ficheros.
- [x] El plan no supone cosas falsas sobre el código existente.
- [x] No hay código en el plan.

## Commits

```text
<hash> README del E03: sesión, decisiones y lista de comprobación
<hash> Plan de la feature B (aprobado)
```
