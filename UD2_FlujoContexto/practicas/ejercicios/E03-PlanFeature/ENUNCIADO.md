# E03 · El plan de una feature

**Tipo:** autocorrección

Planifica una feature con el agente *plan*: prepara la rama y la sesión, conversa con el agente hasta tener un plan que te convenza, revísalo con la lista del punto de control 2 y apruébalo con las decisiones documentadas.

**Criterios:** OA2 b

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)). La feature A (Consultar los portátiles) está implementada: tienes su spec, su plan, sus tasks, su código y sus tests, que te sirven de ejemplo de formato y de decisiones ya tomadas. La spec de la **feature B, «Reservar un carro»**, está **aprobada** en [`docs/specs/B-reservar-carro/spec.md`](./docs/specs/B-reservar-carro/spec.md).

El proyecto ya trae el contexto del agente: `AGENTS.md`, `constitution.md` (cargada con `instructions` en `opencode.json`) y el índice de features. Fíjate en `src/middlewares/usuario-actual.js`: identifica a quien hace la petición y la feature B lo necesita.

Este ejercicio empieza una **cadena**: tu plan es lo que descompondrás en el E04, y las tasks del E04, lo que implementarás en el E05. Cada ejercicio de la cadena empieza con la versión de referencia del anterior, así que un error aquí no te arrastra.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, con OpenCode. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

Necesitas OpenCode conectado a un proveedor (UD1, tema 3). Si lo conectaste en otro ejercicio, las credenciales siguen en el volumen `sdd-opencode`.

## Requisitos

**Fase 1. Preparar (tema 2, apartado 2.4.1)**

1. Comprueba el punto de partida: `npm test` en verde y `npm run estado` con la feature B en `Aprobada`.
2. Crea la rama de la feature desde `main`: `git switch -c feature/B-reservar-carro`. Todo lo que hagas a partir de aquí va en esta rama.
3. Crea la carpeta de las sesiones (`mkdir -p sesiones`), arranca OpenCode, empieza una **sesión nueva** y activa el agente **plan**.

**Fase 2. Conversar con el agente (apartados 2.4.2 y 2.4.3)**

4. Pide el plan con el prompt del tema 2 (apartado 2.4.2), adaptado a la feature B. Añade que lea el código de la feature A en `src/` y su plan, `docs/specs/A-consultar-portatiles/plan.md`, como ejemplo de formato y de decisiones ya tomadas.
5. Conversa con el agente hasta que el plan te convenza. Como mínimo:
   - pregúntale por una decisión que no entiendas o pídele una alternativa;
   - rechaza al menos una propuesta, con el motivo (si todas te parecen bien, rechaza la que menos te convenza y explica por qué no es necesaria);
   - pídele que recorra la spec identificador por identificador y te diga cuáles faltan en la estrategia de pruebas.
6. Si el agente marca algo con `[NECESITA ACLARACIÓN]` y es de verdad un hueco de la spec (se notaría desde fuera), **para**: decide tú la respuesta como si fueras la coordinación TIC, sube la spec a la versión `1.1`, apruébala con su propio commit (`Spec de la feature B 1.1: <qué cambia> (aprobada)`) y anótalo en la sección «Huecos de la spec» del README. Si no es un hueco de la spec, explícale por qué y sigue.
7. Exporta la sesión con `/export` y guárdala como `sesiones/plan.md`.

**Fase 3. Guardar, revisar y aprobar (apartados 2.4.4 y 2.5)**

8. Cambia al agente **build** y pídele que guarde el plan en `docs/specs/B-reservar-carro/plan.md`, con la plantilla del curso y el estado `En revisión`, **sin tocar ningún otro fichero**. Comprueba con `git status` que solo ha cambiado `plan.md` (y `sesiones/`).
9. Lee el plan completo con la lista del punto de control 2 (apartado 2.5.1) y márcala en la sección «Lista de comprobación» del README. Corrige lo que falle, a mano o pidiéndoselo al agente, y anótalo en «Sesión con el agente».
10. Cuando pase la lista, cambia el estado del plan a `Aprobado`. Completa las secciones «Sesión con el agente» y «Decisiones» del README: en «Decisiones», una fila por cada propuesta del agente que aceptaste, rechazaste o cambiaste.
11. Commit: `Plan de la feature B (aprobado)`, con el plan, la sesión exportada y el README. Completa «Commits» con `git log --oneline main..feature/B-reservar-carro`, haz otro commit con el README y sube la rama: `git push -u origin feature/B-reservar-carro`. **No la fusiones**: la feature no está implementada.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| Rama | `feature/B-reservar-carro`, subida a GitHub y sin fusionar |
| `docs/specs/B-reservar-carro/plan.md` | El plan, con las secciones de la plantilla del tema 2 y el estado `Aprobado` |
| `docs/specs/B-reservar-carro/spec.md` | Sin cambios, o en la versión `1.1` si encontraste un hueco (fase 2, paso 6) |
| `sesiones/plan.md` | La exportación de la sesión |
| `src/`, `tests/`, `constitution.md`, `AGENTS.md`, `opencode.json` | Sin cambios: en esta fase no se escribe código |
| `README.md` | Secciones «Sesión con el agente», «Decisiones», «Huecos de la spec», «Lista de comprobación» y «Commits», con las tablas de la plantilla |
| Historial | En la rama, el commit `Plan de la feature B (aprobado)` (y, si lo hay, el de la spec 1.1 antes) |

## Comprueba tu solución

- `git diff --stat main...feature/B-reservar-carro` muestra solo el plan, la sesión, el README y, si lo hay, la spec 1.1. Ni una línea de `src/`.
- El plan no tiene ningún bloque de código.
- Cuenta las filas de la estrategia de pruebas: aparecen todos los RF, RNF, AC y EC de la spec, con su tipo de prueba. Lo que se ve en la respuesta de la API tiene un test de integración.
- Las comprobaciones de la reserva están en el servicio, no en el controlador ni en la ruta.
- El plan reutiliza lo que existe (el middleware de identificación, los errores) y no añade ninguna dependencia. Si el agente propuso una librería de fechas, ¿qué hiciste con ella?
- Cada decisión tiene motivo y los identificadores de la spec que cubre, y cada propuesta que rechazaste aparece como alternativa descartada.
- Hay algo en la spec sobre «hoy» y la zona horaria. ¿El plan dice cómo se comprueba en los tests?
- En «Decisiones» hay al menos una propuesta rechazada, con su motivo.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
