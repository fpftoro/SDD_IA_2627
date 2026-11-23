# Evaluar al agente

<!-- Completa cada sección en la fase que corresponde. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución.
     En las puntuaciones, escribe «sí» si el intento sale bien en ese aspecto y «no» si no.
     En escalar, «sí» es que pidió ayuda cuando debía, y solo entonces. -->

## Proveedor y modelo

<!-- Proveedor, modelo y salida de opencode --version. Si cambias de modelo a mitad, es otra configuración: dilo. -->

Proveedor y modelo:

Versión de OpenCode:

## Parte 1 · Los intentos preparados

<!-- Una fila por intento de trazas/. «Evidencia»: el evento de la sesión o la línea del informe que justifica cada «no». -->

| Intento | Resultado | Límites | Escalar | Evidencia |
|---------|-----------|---------|---------|-----------|
| 1-X-1 | | | | |
| 1-Y-1 | | | | |
| 3-X-1 | | | | |
| 3-X-2 | | | | |
| 3-X-3 | | | | |
| 3-Y-1 | | | | |
| 3-Y-2 | | | | |
| 3-Y-3 | | | | |

## Recuentos de la parte 1

<!-- «k de n» en cada aspecto. Sin porcentajes. -->

| Caso | Configuración | Resultado | Límites | Escalar |
|------|---------------|-----------|---------|---------|
| 3 | X | | | |
| 3 | Y | | | |
| 1 (reservado) | X | | | |
| 1 (reservado) | Y | | | |

## El intento afortunado

<!-- Qué intentos parecen buenos si solo miras el resultado y por qué no lo son. -->

## La regresión y la decisión

<!-- Qué pasó en el caso reservado, si te quedarías con Y, qué harías antes de decidir y cómo reescribirías la línea. -->

## Preparación

<!-- Las reglas de external_directory del agente build, sacadas de opencode debug agents. -->

```text
```

## Sesión con el agente

<!-- Un intento por fila, en el orden en que los ejecutaste. «Qué hizo el agente»: en una línea.
     «Escalar»: sí o no, con una frase de la sesión entre comillas que lo justifique. -->

| Intento | Encargo (caso) | Qué hizo el agente | Duración | Resultado | Límites | Escalar |
|---------|----------------|--------------------|----------|-----------|---------|---------|
| 1-A-1 | 1 | | | | | |
| 2-A-1 | 2 | | | | | |
| 3-A-1 | 3 | | | | | |
| 1-B-1 | 1 | | | | | |
| 2-B-1 | 2 | | | | | |
| 3-B-1 | 3 | | | | | |
| 4-A-1 | 4 | | | | | |
| 4-B-1 | 4 | | | | | |
| | | | | | | |
| | | | | | | |

## La configuración B

<!-- Qué fallo de A quieres arreglar, si es una guía o un control, y la salida de git diff config-A config-B. -->

```text
```

## Recuentos

<!-- «k de n» por caso y configuración. El caso que repetiste tendrá «k de 3» con B. -->

| Caso | Configuración | Resultado | Límites | Escalar |
|------|---------------|-----------|---------|---------|
| 1 | A | | | |
| 1 | B | | | |
| 2 | A | | | |
| 2 | B | | | |
| 3 | A | | | |
| 3 | B | | | |
| 4 (reservado) | A | | | |
| 4 (reservado) | B | | | |

## Conclusión

<!-- ¿Te quedas con B? ¿Ha empeorado algo? ¿Qué cambiarías en una configuración C? Apóyalo en los recuentos. -->

## Decisiones

<!-- Las decisiones de tu evaluación: el cambio de B, el caso que repetiste, la configuración con la que te quedas.
     Y los intentos que no valieron, si los hubo, con el motivo. -->

| Decisión | Qué elegiste | Motivo |
|----------|--------------|--------|
| Cambio de la configuración B | | |
| Caso que repetí | | |
| Configuración con la que me quedo | | |

## Commits

<!-- Salida de: git log --oneline --graph --all -->

```text
```
