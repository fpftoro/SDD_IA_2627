# Cuestionario: Fundamentos del desarrollo guiado por especificaciones

- [Cuestionario: Fundamentos del desarrollo guiado por especificaciones](#cuestionario-fundamentos-del-desarrollo-guiado-por-especificaciones)
  - [Qué es el desarrollo guiado por especificaciones](#qué-es-el-desarrollo-guiado-por-especificaciones)
  - [Artefactos y capas de contexto](#artefactos-y-capas-de-contexto)
  - [El entorno de trabajo: OpenCode](#el-entorno-de-trabajo-opencode)
  - [Features: la unidad de trabajo de una spec](#features-la-unidad-de-trabajo-de-una-spec)
  - [Anatomía de una spec](#anatomía-de-una-spec)
  - [Notaciones y granularidad](#notaciones-y-granularidad)

Responde con tus palabras, justificando cada respuesta. Cuando se pida investigar, cita las fuentes consultadas e indica la fecha de consulta: las herramientas de este campo cambian deprisa.

---

## Qué es el desarrollo guiado por especificaciones

> Criterios: OA1 a

1. **Decisiones invisibles:** Piensa en una aplicación que hayas programado (en clase o por tu cuenta). Elige una funcionalidad y enumera al menos cinco decisiones que tomaste sin escribirlas en ningún sitio. Si se la hubieras pedido a un agente con una sola frase, ¿cuáles crees que habría decidido de otra forma? ¿Qué consecuencias tendría cada una?

2. **¿Vibe coding o SDD?:** Describe un proyecto personal o de clase en el que el *vibe coding* sería la mejor opción y otro en el que sería un error. Justifica cada caso con los criterios del tema 1 (duración, número de personas, consecuencias de un fallo, si se conocen los requisitos).

3. **La inversión de Spec Kit:** Lee el documento de metodología de GitHub Spec Kit (`spec-driven.md`, enlazado en la portada de la unidad). Explica con tus palabras qué es la «inversión» y por qué la mayoría de los equipos, en la práctica, trabajan en el nivel *spec-first*. ¿Qué haría falta en un proyecto para pasar a *spec-anchored*?

4. **Los tres principios:** Elige uno de los tres principios para trabajar con agentes (humano en el bucle, reglas antes que herramientas, especificar antes de construir) y describe una situación concreta en la que saltárselo cause un problema. ¿Cómo lo habría evitado aplicarlo?

---

## Artefactos y capas de contexto

> Criterios: OA1 b

5. **De un PRD a una spec:** Busca o inventa un PRD breve de una aplicación sencilla (una biblioteca, un gimnasio, una agenda). Explica qué información del PRD pasaría a la spec de una de sus funcionalidades, qué información le faltaría a esa spec para que un agente pudiera programarla y de dónde la sacarías.

6. **AGENTS.md:** Investiga el formato abierto `AGENTS.md` (enlazado en la portada de la unidad). ¿Qué problema resuelve tener un formato común para varios agentes? Busca un repositorio público que lo use y comenta tres cosas que incluye y una que, según el tema 2, no debería estar ahí.

7. **Reglas o constitución:** El tema 2 dice que la diferencia entre reglas y constitución es sutil y que, en proyectos pequeños, pueden ir en el mismo fichero. Argumenta a favor y en contra de separarlas en un proyecto de cuatro personas que va a durar dos cursos.

---

## El entorno de trabajo: OpenCode

> Criterios: OA1 c

8. **Comparar agentes:** Investiga otro agente de codificación (por ejemplo, Claude Code, Cursor, GitHub Copilot o Kiro) y compáralo con OpenCode en: dónde se ejecuta, a qué modelos se conecta, cómo se llama su fichero de reglas, si separa planificar de implementar y cómo controla los permisos. Indica la fecha de consulta.

9. **Privacidad y modelos:** Todo lo que escribes en OpenCode llega al proveedor del modelo. Compara un proveedor en la nube con un modelo local en privacidad, capacidad y coste. ¿Qué usarías para el código de un proyecto de clase? ¿Y para el de una empresa con datos de clientes?

10. **Permisos:** Diseña la lista `permissions` de `opencode.json` para un proyecto en el que el agente pueda ejecutar los tests y el linter sin preguntar, tenga que preguntar antes de instalar dependencias y no pueda nunca hacer `git push` ni borrar ficheros. Explica el orden de las reglas.

11. **Planificar antes de implementar:** ¿Qué ventajas tiene separar el trabajo en un agente que planifica sin modificar el proyecto (*plan*) y otro que implementa (*build*)? Relaciónalo con el principio del humano en el bucle.

---

## Features: la unidad de trabajo de una spec

> Criterios: OA1 d

12. **Dividir un épico:** Elige una aplicación que uses a menudo (un servicio de música, una plataforma educativa, una aplicación de mensajería) y elige un épico suyo. Divídelo en al menos cinco features con valor propio, indica sus dependencias y propón un orden de implementación justificado con dependencias, valor y riesgo.

13. **El tamaño de una feature:** ¿Por qué el criterio **revisable** cobra tanta importancia cuando el código lo genera un agente? Explica qué harías con una feature cuyo cambio tocaría treinta ficheros.

14. **Historias de usuario:** Escribe tres historias de usuario para una misma feature desde el punto de vista de tres tipos de usuario distintos. ¿Qué aporta cada una al contexto de la spec? ¿En qué se diferencian de un requisito?

---

## Anatomía de una spec

> Criterios: OA1 e

15. **Edge cases de una feature cotidiana:** Elige una funcionalidad sencilla (subir una foto de perfil, apuntarse a una actividad, pagar con tarjeta) y escribe al menos ocho *edge cases* de tipos distintos, con la respuesta exacta del sistema. Señala cuáles son decisiones de diseño que no te corresponderían a ti.

16. **Decisiones de diseño:** En el ejemplo de JWT del tema 5, ¿qué harías si Redis no responde: rechazar la petición o aceptarla sin comprobar si el token está revocado? Justifica la respuesta para una aplicación bancaria y para un blog. ¿Quién debería tomar esa decisión en cada caso?

17. **Plantillas de otras herramientas:** Compara la plantilla de spec del curso con la de GitHub Spec Kit (en su repositorio) o con los ficheros de una spec de Kiro (en su documentación). ¿Qué secciones coinciden, cuáles cambian de nombre y cuáles faltan o sobran? Indica la fecha de consulta.

---

## Notaciones y granularidad

> Criterios: OA1 f

18. **EARS en otro dominio:** Escribe un requisito de cada uno de los cinco patrones de EARS para un sistema que no sea software de gestión (un ascensor, una lavadora, un semáforo, un termostato). Después, combina dos de ellos en un requisito *Mientras…, cuando…*.

19. **Gherkin ejecutable:** Investiga qué es Cucumber y cómo convierte un escenario de Gherkin en un test que se ejecuta. ¿Qué ventaja tiene escribir los criterios de aceptación de forma que una herramienta los pueda ejecutar? ¿Qué riesgo tiene escribirlos como guiones de clics?

20. **¿Spec, plan o constitución?:** Un compañero quiere añadir a la spec de una feature que las tareas se guardan en SQLite, que se usa la librería `zod` para validar y que los mensajes de error van en español. Decide dónde va cada una de las tres cosas y justifícalo con la pregunta del tema 6: ¿lo notaría alguien desde fuera o rompe una restricción acordada?

21. **El agente como revisor:** El tema 6 avisa de que los agentes tienden a añadir detalle de implementación cuando revisan una spec. ¿Por qué crees que ocurre? Propón una instrucción para el prompt de revisión (o para `AGENTS.md`) que lo reduzca, y explica por qué la decisión final sigue siendo tuya.
