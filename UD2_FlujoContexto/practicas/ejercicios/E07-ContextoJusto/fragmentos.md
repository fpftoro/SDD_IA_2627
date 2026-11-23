# Fragmentos de sesiones

Siete momentos de sesiones con OpenCode en el préstamo de portátiles. En
cada uno, lo que se ve en la conversación y un poco de lo que había pasado
antes.

---

**F1.** Sesión larga de la feature B. Al principio, en la fase del plan,
rechazaste usar dayjs: «nada de librerías de fechas, la constitución no
deja añadir dependencias». Después, en la misma sesión, se aprobó el plan,
se escribieron las tasks y se hicieron dos ciclos. Dos horas más tarde:

```text
Agente: Para comprobar los 14 días de antelación propongo instalar dayjs,
que simplifica mucho sumar días a una fecha. ¿Lo instalo?
```

---

**F2.** Primer mensaje de la sesión: «Los tests llevan siempre el
identificador de la spec al principio del nombre, por ejemplo
`EC-04: rechaza un carro que no existe`». Los primeros tests del ciclo 1
lo cumplen. Tras muchos mensajes, en el mismo ciclo:

```javascript
test('rechaza un día que ya ha pasado', () => {
```

---

**F3.** Sesión nueva para planificar la feature D. Prompt completo:

```text
Lee todo el proyecto, todas las specs y todo el código, y planifica la
feature D.
```

El agente tarda mucho y propone un plan que no usa el middleware
`usuario-actual` (crea otro para leer el usuario) y que repite
decisiones de la feature B que no tienen que ver con D.

---

**F4.** Has hecho el ciclo 2 de la feature B y, sin cambiar de sesión,
pides el ciclo 3 (controlador y rutas). En el `git diff` del ciclo 3
aparecen, además de los ficheros de sus tasks, cambios en
`src/servicios/servicio-reservas.js`: el agente ha «mejorado» una función
que revisaste y aprobaste en el ciclo 2.

---

**F5.** Para planificar, pegaste en el primer mensaje el texto completo de
la spec de B. Una hora después, en otra pestaña, subiste la spec a la
versión 1.1 (la lista del día ahora va ordenada). Sigues en la misma
sesión:

```text
Agente: Según la spec, la consulta devuelve las reservas del día sin un
orden concreto, así que no añado ninguna ordenación.
```

---

**F6.** En mitad del ciclo 2, decidiste en la conversación que la lista
del día se ordena por hora y carro, pero todavía no lo habías escrito en
ningún sitio. Poco después, OpenCode avisó de que la sesión se había
compactado automáticamente. En el ciclo siguiente, en la misma sesión:

```text
Agente: He escrito el test de AC-05 comprobando que la lista tiene las
dos reservas, sin importar el orden, como dice la spec.
```

---

**F7.** El agente ha escrito el repositorio de reservas como una clase,
cuando el plan dice un objeto como el de los portátiles. Le corriges:
«no, un objeto». Lo cambia, pero deja un método de la clase. Le corriges
otra vez, y otra. Al cuarto mensaje, el fichero mezcla las dos versiones
y el agente cita en su respuesta la clase del primer intento como si
siguiera existiendo.
