# E02 · Seis diagnósticos

**Tipo:** autocorrección

Doce fallos del préstamo de portátiles. Para cada uno, decide qué ha pasado (hueco en la spec, spec ambigua, error del plan, error de implementación, test que no comprueba lo que dice o petición nueva), dónde se corrige y cuál es el primer paso.

**Criterios:** OA3 d

## El caso

Los fallos están en [`casos.md`](./casos.md), con los fragmentos de spec, plan, código o tests que necesitas. El préstamo de portátiles lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro).

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md`.

## Requisitos

1. **Diagnóstico.** Para cada caso, en la tabla «Diagnósticos» del README:
   - el **diagnóstico**, con los nombres del tema 1 (apartado 1.5.2). Si concluyes que **no hay fallo**, dilo;
   - **por qué**: la pregunta del diagrama del apartado 1.5.4 que lo decide y su respuesta, citando el fragmento que lo demuestra;
   - **dónde se corrige**: spec, plan, código, test o índice de features;
   - el **primer paso** concreto: qué harías antes que nada.
2. **Dos casos, de cerca.** Elige un caso de error de implementación y uno de hueco en la spec. Para cada uno, escribe la secuencia completa de la corrección (tema 1, apartado 1.5.5), con el texto que añadirías a la spec o el test que escribirías primero.
3. **Lo que no se hace.** En uno de los casos, alguien propone «cambiar la spec para que diga lo que hace el código». Di en cuál podría pasar, por qué es un error y qué se hace en su lugar.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `casos.md` | Sin cambios: es el material que analizas |
| `README.md` | Secciones «Diagnósticos», «Dos casos, de cerca» y «Lo que no se hace», con las tablas de la plantilla |

## Comprueba tu solución

- Has respondido a la primera pregunta del diagrama («¿la spec o la constitución deciden ese comportamiento?») antes que a ninguna otra.
- En los casos con plan, has comparado la decisión del plan con la spec, no solo el código con el plan.
- En los casos con tests, has distinguido si el código está bien (el problema es solo el test) o mal.
- Hay al menos un caso en el que no hay que tocar nada de la feature.
- Ningún primer paso es «arreglar el código» en un caso cuyo origen es la spec o el plan.
- En los errores de implementación, el primer paso es un test que reproduce el fallo.

## Al terminar

Haz un commit con el README. No hay contenedor que borrar.
