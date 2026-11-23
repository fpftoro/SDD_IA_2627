# El equipo

El centro ha ampliado el equipo del préstamo de portátiles. Ahora trabajan seis personas, cada una con un rol, y todas usan agentes de OpenCode con la configuración del repositorio.

| Rol | Personas | Equipo de GitHub | Qué hace |
|-----|---------:|------------------|----------|
| Producto (coordinación TIC) | 1 | `@centro/producto` | Decide qué necesita el centro. Conoce al profesorado y sus horarios |
| Arquitectura | 1 | `@centro/arquitectura` | Decide cómo se construye y cuida la constitución y la memoria del agente |
| Desarrollo | 2 | `@centro/desarrollo` | Implementa las features y revisa el código de los demás |
| Calidad | 1 | `@centro/calidad` | Cuida que todo lo que dice una spec se pueda comprobar |

## Cómo trabajan

- Todo llega a `main` por una *pull request* (PR). La rama `main` está protegida: nadie sube directamente, la CI tiene que estar en verde y los propietarios del código tienen que aprobar.
- Arquitectura es **una sola persona** y revisa todo lo que toca los principios del proyecto. Si además tiene que revisar cada plan y cada PR de código, no llega.
- Desarrollo son dos personas: pueden revisarse entre sí.
- El centro tiene la costumbre de que producto apruebe las specs y de que calidad añada sus *edge cases* antes de aprobarlas.
