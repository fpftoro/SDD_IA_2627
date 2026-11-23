# Fragmentos del proyecto de préstamo de portátiles

Material de partida del ejercicio E02. No modifiques este fichero: escribe tus respuestas en el `README.md`.

---

## Parte A. Documentos

**A1.**

```text
Cambia el color del botón «Reservar» a verde.
```

**A2.**

```markdown
## Objetivo
Que el profesorado deje de reservar los carros de portátiles en papel.

## Problema
Hay reservas duplicadas y portátiles que nadie sabe quién tiene.

## Métricas de éxito
Ninguna reserva duplicada durante un trimestre.
```

**A3.**

```markdown
RF-12. El sistema permitirá registrar reservas, préstamos, devoluciones
e incidencias de todos los carros del centro.

RNF-04. Todas las pantallas se cargarán en menos de 2 segundos con
100 usuarios simultáneos.

RNF-05. Los datos se guardarán en una base de datos relacional.
```

**A4.**

```markdown
## Requisitos funcionales

- RF-01: El sistema deberá registrar la fecha de devolución de un
  préstamo abierto con la fecha y la hora del servidor.
- RF-02: El sistema deberá pasar el portátil devuelto al estado
  "disponible", salvo que se registre una incidencia.

## Fuera de alcance

- Penalizaciones por devolución tardía (las decide la dirección).
```

**A5.**

```text
Quiero que hagas la pantalla de reservas. Tiene que tener un calendario
con las seis horas de clase de cada día y los carros en columnas, y que
al pulsar en un hueco libre se reserve con el nombre del profesor.

Ojo, que no se pueda reservar dos veces el mismo carro a la misma hora,
que eso pasa mucho con la hoja de papel. Y que se vea en rojo lo que ya
está reservado.

Si te da tiempo, que mande un correo de confirmación. Usa los colores
del instituto, que son azul y blanco.
```

**A6.**

```markdown
## Usuarios
Profesorado (unas 60 personas) y coordinación TIC.

## Casos de uso
- Reservar un carro para una hora de clase.
- Registrar el préstamo y la devolución.
- Anotar una incidencia.

## Fuera de alcance
Préstamos al alumnado para llevar a casa.
```

**A7.**

```markdown
# Spec: Reservar un carro

## Contexto
El profesorado reserva un carro de portátiles para una hora de clase.
**Historia de usuario:** como profesor, quiero reservar un carro desde
el móvil para no tener que ir a la sala de profesores.

## Criterios de aceptación
- AC-01: Dado un carro libre el martes a 3.ª hora, cuando un profesor lo
  reserva, entonces la reserva aparece a su nombre en el calendario.
- AC-02: Dado un carro ya reservado el martes a 3.ª hora, cuando otro
  profesor intenta reservarlo para la misma hora, entonces recibe el
  mensaje "El carro ya está reservado a esa hora".
```

**A8.**

```text
Explícame qué hace la función calcularRetraso.
```

**A9.**

```markdown
3.2. Interfaces externas. El sistema se autenticará contra el directorio
LDAP del centro.

3.3. Arquitectura. Cliente web, API REST y base de datos PostgreSQL,
desplegados en el servidor del centro.

3.4. Restricciones. El sistema funcionará en los navegadores de las
aulas sin instalar extensiones.
```

**A10.**

```markdown
# Devolver un portátil

1. Crear la tabla `devoluciones` en la base de datos.
2. Crear el endpoint `POST /api/prestamos/:id/devolucion`.
3. Añadir el botón «Devolver» en la ficha del préstamo.
4. Escribir los tests del endpoint.
```

---

## Parte B. Líneas de contexto

| # | Línea |
|---|-------|
| B1 | Los tests se ejecutan con `npm test`. |
| B2 | La aplicación no guarda datos personales del alumnado: los préstamos se asocian solo al profesorado. |
| B3 | Si el portátil que se devuelve está marcado como averiado, la API responde 409 con `{ error: "El portátil está averiado" }`. |
| B4 | Identificadores en español, comillas simples y punto y coma. |
| B5 | Toda la API responde en JSON, y los errores siguen el formato `{ error: "mensaje" }` con su código HTTP. |
| B6 | No instales dependencias nuevas sin preguntar antes. |
| B7 | Un carro solo puede tener una reserva por hora de clase. |
| B8 | Capas: rutas → servicios → repositorios. Solo los repositorios acceden a la base de datos. |
| B9 | En esta tarea, cambia solo el fichero `src/rutas/devoluciones.js`. |
| B10 | Las fechas se guardan y se devuelven siempre en formato ISO 8601, en UTC. |
| B11 | Un carro se puede reservar como máximo con dos semanas de antelación. |
| B12 | Antes de dar una tarea por terminada, ejecuta `npm run lint` y corrige los avisos. |

---

## Parte C. Primitivas

| # | Situación |
|---|-----------|
| C1 | Cada vez que se publica una versión hay que seguir siete pasos (subir el número de versión, actualizar el registro de cambios, crear la etiqueta…). El agente debe saber hacerlo, pero solo cuando se le pida. |
| C2 | El agente tiene que poder consultar las incidencias abiertas en el gestor de incidencias del centro, que está fuera del repositorio. |
| C3 | El agente debe saber siempre, en cualquier tarea, que los tests se ejecutan con `npm test`. |
| C4 | Hay que describir cómo debe comportarse «Reservar un carro»: qué hace, cómo se comprueba y qué queda fuera. |
| C5 | Pedirle una vez al agente que renombre la variable `p` a `portatil` en un fichero. |
| C6 | El programa que lee todo lo anterior, prepara el contexto y edita los ficheros del proyecto. |
