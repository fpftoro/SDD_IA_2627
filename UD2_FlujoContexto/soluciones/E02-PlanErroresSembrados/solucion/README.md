# Plan con errores sembrados

Plan corregido: [`docs/specs/D-registrar-devolucion/plan.md`](./docs/specs/D-registrar-devolucion/plan.md)

## Errores

| # | Dónde | Error | Qué pasaría | Corrección | Se corrige en |
|---|-------|-------|-------------|------------|---------------|
| 1 | Metadatos | El plan responde a la **versión 0.3** de la spec, y la aprobada es la 1.0 | Nadie sabe si el plan cubre la spec aprobada; el agente podría implementar requisitos de un borrador | Spec 1.0 | Plan |
| 2 | Metadatos | Estado `Aprobado` y autor «Agente plan»: el plan no ha pasado el punto de control 2 y no lo aprueba el agente | El compañero implementaría un plan que nadie ha revisado | Estado `Borrador` (o `En revisión`) y una persona como autora | Plan |
| 3 | Visión general | **Relleno**: historia del centro y principios genéricos (SOLID, código limpio…) | Gasta contexto del agente en frases que no deciden nada | Un párrafo con el enfoque | Plan |
| 4 | Contexto técnico y Dependencias | **Dependencias innecesarias**: dayjs y express-validator | Dos paquetes que la constitución no permite sin acordarlo, para cosas que ya resuelven `Date` y el servicio | Quitarlas: «Dependencias: ninguna» | Plan |
| 5 | Comprobación de la constitución | **Incompleta**: dos principios de diez, y la casilla de las capas marcada aunque D-03 la incumple | Los choques con los datos, las pruebas y las dependencias pasarían sin que nadie los vea | Recorrer todos los principios y citar la decisión que cumple cada uno | Plan |
| 6 | Ficheros y D-05 | **Supone código que no existe**: servicio-usuarios.js y esCoordinacion() | El agente crearía un servicio de usuarios entero o se pararía sin saber qué hacer | Usar peticion.usuario.papel, que deja el middleware usuario-actual | Plan |
| 7 | D-01 | **Decide algo que se nota desde fuera**: los nombres de los campos de la respuesta (fechaDevolucion, conCargador, tarde) | Quien use la API dependerá de unos nombres que nadie ha aprobado, y la siguiente feature podría elegir otros | Marcarlo y proponer el cambio a la spec (hueco H1) | Spec |
| 8 | D-02 | **Cambia la spec en silencio**: usa la fecha de la petición si viene | Incumple RNF-02 y EC-07: un profesor podría poner la fecha que quisiera y evitar el retraso | Siempre reloj.ahora(); lo propuesto, como alternativa descartada | Plan |
| 9 | D-03 | **Contradice la constitución**: el controlador comprueba si el préstamo ya está devuelto | Lógica de negocio repartida entre capas; el servicio dejaría de ser el sitio de las reglas | La comprobación va en el servicio (ErrorConflicto) | Plan |
| 10 | D-04 | **Contradice la constitución y RNF-03**: el préstamo devuelto se saca de la lista | Los préstamos dejarían de estar donde los buscan las demás features; además es sobreingeniería para RNF-01 | Actualizar el préstamo con estado devuelto; no se borra | Plan |
| 11 | D-05 | **Contradice la spec**: 401 { error: "No autorizado" } en vez de 403 con el mensaje de EC-05 | El test de EC-05 fallaría o, peor, se cambiaría para que pasase | 403 { error: "No puedes registrar esta devolución" }, con un ErrorPermiso nuevo | Plan |
| 12 | D-06 | **Inventa comportamiento**: un campo aviso en la respuesta | Un comportamiento que nadie ha decidido y que habría que mantener | Quitarlo. Si la coordinación TIC lo quiere, va primero a la spec | Plan |
| 13 | D-07 | **Sobreingeniería** y contra el fuera de alcance: devolución en lote | Código que nadie ha pedido y que la spec excluye expresamente | Quitarlo | Plan |
| 14 | D-08 | **Contradice EC-08**: cambia primero el portátil y lo deja disponible aunque falle el préstamo | Un portátil disponible con un préstamo abierto: justo lo que EC-08 prohíbe | Guardar el préstamo primero y deshacerlo si falla el cambio del portátil (D-09) | Plan |
| 15 | D-09 | **Decisión sin motivo**, sin alternativa descartada ni identificadores de la spec | No se puede revisar ni trazar; el agente elegiría qué validar y dónde | Validación de conCargador en el servicio (D-02 corregida), con su motivo y lo descartado | Plan |
| 16 | D-10 | **Código en el plan** | El agente lo copiaría tal cual (con dayjs) en lugar de decidir con el código real | Dejar la decisión en una frase (D-07 corregida) | Plan |
| 17 | Secuencia de implementación | **Orden imposible** y tests al final: el controlador antes que el servicio que llama, y los tests en el último paso | El controlador no se podría probar; los tests se escribirían para que pase el código ya hecho, contra la constitución | Servicio y después controlador, cada uno con sus tests antes | Plan |
| 18 | Estrategia de pruebas | **Pruebas incompletas**: faltan RF-03, RF-06, RNF-01, RNF-02, RNF-03 y EC-05 a EC-08 | Ocho identificadores que nadie comprobaría; EC-08, el más delicado, sin test | Una fila por cada identificador de la spec | Plan |
| 19 | Estrategia de pruebas | **Tipo equivocado**: AC-04 a mano y AC-03 solo unitario, aunque los dos se ven en la respuesta de la API | AC-04 se comprobaría una vez y nunca más; nada comprobaría que la API devuelve el retraso | Integración para los dos (y unitario además en AC-03) | Plan |

## Huecos de la spec

**H1. Los nombres de los campos de la devolución.** RF-05 dice que se responde «con el préstamo actualizado», pero la spec no dice cómo se llaman los campos nuevos (fecha de devolución, cargador y retraso) ni el estado del préstamo devuelto. Quien use la API los verá, así que no es una decisión del plan, aunque el plan original la tomaba en D-01. Propuesta para la spec 1.1:

> RF-05: Cuando se registre una devolución, el sistema deberá responder 200 con el préstamo actualizado, que incluye `estado: "devuelto"`, `fechaDevolucion`, `conCargador` y `conRetraso`.

**H2. Varios errores a la vez.** La spec no dice qué se responde si una petición tiene más de un problema (por ejemplo, un préstamo que no existe y sin `conCargador`: ¿404 o 400?). Se nota en la respuesta. Propuesta para la spec 1.1: «Si una petición incumple varios *edge cases*, el sistema deberá responder el primero en este orden: EC-03 y EC-04, EC-01, EC-05, EC-02».

Los dos están marcados en «Riesgos y dudas» del plan. La spec aprobada no la cambio yo: lo decide quien la aprueba.

## Estado del plan

`Borrador`. He corregido todos los errores, pero el plan tiene dos marcadores que dependen de la spec. Mientras la spec no suba a 1.1 y se vuelva a aprobar, el plan no puede pasar el punto de control 2. Cuando esté aprobada, el plan citará la versión 1.1, recogerá los nombres de los campos en D-06 y pasará a `En revisión`.
