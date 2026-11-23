# E07 · Elegir herramientas

**Tipo:** autocorrección

Elige y justifica las herramientas de SDD para tres proyectos distintos, investiga dos herramientas que no se han visto en detalle y decide qué se conserva al cambiar de agente.

**Criterios:** OA3 e

## El caso

Los tres proyectos están en [`escenarios.md`](./escenarios.md). Ninguno tiene una respuesta única: lo que se valora es que las restricciones vayan primero, que los criterios y sus pesos salgan del escenario y que la decisión se pueda defender.

## Entorno de trabajo

Es un ejercicio de lectura, investigación y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md`. Para investigar, usa la **documentación oficial** de cada herramienta, no comparativas de terceros.

## Requisitos

1. **Las restricciones.** Para cada escenario, la lista de restricciones que no se negocian (privacidad, herramientas impuestas, licencias…) y lo que descartan (tema 4, apartado 4.7.1).
2. **La matriz.** Para cada escenario, una matriz de decisión (tema 4, apartado 4.7.2) con al menos **tres opciones** y **cuatro criterios** con su peso. Las opciones pueden ser combinaciones (por ejemplo, «método a mano + agente multiproveedor con un modelo local»). Explica de dónde sale cada peso.
3. **La decisión.** Para cada escenario, la opción elegida, por qué, qué prueba piloto harías antes de adoptarla y qué guardarías en **formatos abiertos** para no depender de la herramienta.
4. **Dos herramientas.** Elige dos herramientas de SDD o agentes de codificación **que no se hayan visto en detalle en el tema 4** y respóndeles las preguntas del apartado 4.1.2, con el enlace a su documentación y la **fecha de consulta**.
5. **Al cambiar de agente.** El préstamo de portátiles del E04 pasa de OpenCode a otro agente. Para cada fichero o carpeta de la tabla de la plantilla, di si sirve tal cual, si hay que traducirlo o si se pierde, y qué comprobarías después del cambio.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `escenarios.md` | Sin cambios |
| `README.md` | Secciones «Escenario 1», «Escenario 2», «Escenario 3» (cada una con restricciones, matriz y decisión), «Dos herramientas» y «Al cambiar de agente» |

## Comprueba tu solución

- En el escenario 1, las restricciones descartan algo antes de puntuar.
- En el escenario 3, la herramienta impuesta no es una opción más: es una restricción, y lo que decides es cómo trabajar con ella.
- Cada matriz tiene los pesos explicados y el total calculado.
- La decisión del escenario 2 tiene en cuenta que casi todo son cambios sobre código existente.
- Ninguna respuesta da precios, versiones ni cifras que caduquen.
- Las dos herramientas tienen enlace a la documentación oficial y fecha de consulta.
- En «Al cambiar de agente», los permisos de los agentes aparecen como lo más delicado.

## Al terminar

Haz un commit con el README. No hay contenedor que borrar.
