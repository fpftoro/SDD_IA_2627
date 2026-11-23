# E04 · Del plan a las tasks

**Tipo:** autocorrección

Descompón un plan aprobado en tasks pequeñas, ordenadas y verificables, y revisa con la lista del punto de control 3 unas tasks con errores sembrados.

**Criterios:** OA2 c

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada. El plan de la **feature B, «Reservar un carro»**, está aprobado en [`docs/specs/B-reservar-carro/plan.md`](./docs/specs/B-reservar-carro/plan.md): es la versión de referencia del E03, así que empiezas desde el mismo punto aunque tu plan del E03 fuera distinto. Las tasks que escribas aquí son el punto de partida del E05.

En el proyecto real, el plan estaría solo en la rama de B. Aquí lo tienes también en `main` para que el repositorio de partida sirva igual a todo el mundo.

Para la segunda parte, en [`material/`](./material/) tienes la spec 1.1 y el plan aprobado de la **feature D, «Registrar la devolución»**, y las tasks que ha generado un compañero, [`material/tasks-con-errores.md`](./material/tasks-con-errores.md).

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Necesitas Git. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

## Requisitos

**Parte 1. Las tasks de la feature B**

1. Crea la rama de la feature: `git switch -c feature/B-reservar-carro`.
2. Escribe `docs/specs/B-reservar-carro/tasks.md` con la plantilla del tema 3 (apartado 3.1.5), a partir de la **secuencia de implementación** y la **estrategia de pruebas** del plan:
   - identificadores `T-01`, `T-02`…, en grupos de dos tasks como máximo, con un punto de control al final de cada grupo;
   - en cada task: los ficheros (uno o dos; si son más, justifícalo en la propia task), las decisiones o los identificadores de la spec que cubre, de qué depende y un criterio de terminado que se pueda comprobar sin opinar;
   - las tasks de tests van antes que su implementación y dicen qué identificadores de la spec comprueban;
   - entre todas, cubren todas las filas de la estrategia de pruebas del plan y todos los ficheros de su sección «Ficheros»;
   - marca con `[P]` lo que se pueda hacer en paralelo, si hay algo.
3. Revisa tus tasks con la lista del punto de control 3 (apartado 3.3.1) y márcala en la sección «Lista de comprobación» del README.
4. Completa la tabla «Cobertura» del README: cada fila de la estrategia de pruebas del plan, con la task de tests que la cubre.
5. Cambia el estado a `Aprobadas` y haz el commit `Tasks de la feature B (aprobadas)`.

**Parte 2. Tasks con errores**

6. Revisa `material/tasks-con-errores.md` con la lista del punto de control 3 y los errores típicos del tema 3 (apartado 3.3.2), comparándolas con el plan y la spec de D. Anota en la tabla «Errores» del README **al menos ocho** errores: dónde está, qué error es y cómo se corrige.
7. Responde en «Por qué importa el orden» a esta pregunta: si el compañero implementa sus tasks tal cual, en el orden en que están, ¿qué tres problemas encontrará en sus puntos de control?
8. Commit: `Revisión de las tasks de la feature D`. Sube la rama: `git push -u origin feature/B-reservar-carro`. **No la fusiones**: la feature no está implementada.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| Rama | `feature/B-reservar-carro`, subida a GitHub y sin fusionar |
| `docs/specs/B-reservar-carro/tasks.md` | Tus tasks, con la plantilla del tema 3 y el estado `Aprobadas` |
| `docs/specs/B-reservar-carro/plan.md` y `spec.md`, `material/` | Sin cambios |
| `src/`, `tests/` | Sin cambios: en esta fase no se escribe código |
| `README.md` | Secciones «Lista de comprobación», «Cobertura», «Errores» y «Por qué importa el orden», con las tablas de la plantilla |
| Historial | En la rama, los commits `Tasks de la feature B (aprobadas)` y `Revisión de las tasks de la feature D`, en ese orden |

## Comprueba tu solución

- Lee tus tasks **en orden** y pregúntate en cada una: ¿lo que necesita ya existe?
- Ninguna task de implementación va antes que la de sus tests.
- Cada criterio de terminado dice qué tests pasan (o fallan), qué comando funciona o qué se ve. «Funciona» o «está hecho» no valen.
- El plan dice cómo se fija el día de hoy en los tests. ¿Está en el criterio de terminado de alguna task?
- Cuenta las filas de tu tabla «Cobertura»: son todas las de la estrategia de pruebas del plan.
- Ninguna task añade algo que no esté en el plan, y ningún fichero de «Ficheros» se queda sin task.
- En la parte 2, compara cada task del compañero con el plan de D: ¿viene de una decisión?, ¿cubre lo que dice?, ¿contradice la spec?
- Mira también lo que **falta**: identificadores de la estrategia de pruebas que ninguna task cubre y puntos de control.

## Al terminar

Haz los commits y sube la rama. No hay contenedor que borrar.
