# Rúbrica · E06 Evaluar al agente

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valora **leyendo** el repositorio del alumno: su `README.md`, la carpeta `sesiones/` y el historial (`<username>.datos.json`, con las ramas `config-*` e `intento/*`). Es un ejercicio con agente, pero lo que se corrige es **la evaluación**, no lo bien que lo hizo el agente: un agente que falla en todos los casos puede dar un ejercicio excelente.

---

### C1 · Los intentos preparados

| Campo | Valor |
|-------|-------|
| OA | OA3 g |
| Peso | 3 |
| Dónde mirar | `README.md`, secciones «Parte 1 · Los intentos preparados», «Recuentos de la parte 1», «El intento afortunado» y «La regresión y la decisión» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Los ocho intentos puntuados como en la solución (como mucho una discrepancia justificada), con evidencia en cada «no»; recuentos «k de n»; 3-X-2 y 3-X-3 identificados como intentos afortunados por haber editado el test; la regresión de 1-Y-1 explicada (para ante los tests que el encargo pedía poner en verde), sin quedarse con Y tras un solo intento y con una propuesta para la línea o para repetir |
| 2 | 2 | Puntuaciones con dos o tres discrepancias, o falta la evidencia, o solo uno de los dos intentos afortunados, o la decisión no menciona que un intento no basta |
| 1 | 1 | Puntuaciones con una nota global o un solo aspecto, o no se ve la regresión del caso reservado |
| 0 | 0 | La parte 1 no está hecha |

### C2 · La batería, ejecutada y registrada

| Campo | Valor |
|-------|-------|
| OA | OA3 g |
| Peso | 2 |
| Dónde mirar | `README.md` (secciones «Preparación» y «Sesión con el agente»), `sesiones/` e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Los diez intentos (casos 1 a 3 con A y con B, el 4 con los dos y dos repeticiones), cada uno con su rama `intento/<intento>`, su etiqueta `base/` y, en `sesiones/`, su sesión y su informe; las reglas de `external_directory` pegadas; ningún intento con respuestas del alumno a las preguntas del agente |
| 1 | 1 | Faltan uno o dos intentos o sus sesiones, o algún intento tiene una respuesta del alumno sin anotarlo como intento que no vale |
| 0 | 0 | Menos de seis intentos registrados, o sin sesiones ni informes |

### C3 · Tres puntuaciones por separado

| Campo | Valor |
|-------|-------|
| OA | OA3 g |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Sesión con el agente», comparada con `sesiones/<intento>.md` y `.txt` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Resultado y límites coinciden con los informes de `comprobar.sh`; cada «escalar» cita una frase de la sesión y aplica el criterio del caso (preguntar es el éxito en el caso 2; preguntar sin necesidad es un fallo en los casos 1 y 4; avisar después de tocar un test no es escalar); si hubo un intento afortunado, está señalado |
| 1 | 1 | Las puntuaciones están, pero escalar no se justifica con la sesión, o alguna contradice el informe sin explicarlo |
| 0 | 0 | Una nota global por intento, o puntuaciones sin relación con las sesiones |

### C4 · La configuración B

| Campo | Valor |
|-------|-------|
| OA | OA3 g |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «La configuración B», y la rama `config-B` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | `config-B` es un solo cambio sobre `config-A` (una guía o un control), el `git diff` está pegado y se justifica con un fallo concreto de A; `external_directory` sigue en `deny` |
| 0 | 0 | Varios cambios a la vez, sin justificación, o B quita la regla de `external_directory` |

### C5 · Recuentos y conclusión

| Campo | Valor |
|-------|-------|
| OA | OA3 g |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Recuentos», «Conclusión» y «Decisiones» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Recuentos «k de n» por caso y configuración, sin porcentajes; el caso 4 ejecutado al final con A y con B, y comparado; un caso repetido hasta «k de 3» con un motivo; la conclusión dice qué mejora y qué empeora, no generaliza a partir de un intento y propone qué probar después |
| 1 | 1 | Recuentos con porcentajes, o conclusión que se apoya en un intento suelto, o no compara el caso reservado |
| 0 | 0 | Sin recuentos ni conclusión |
