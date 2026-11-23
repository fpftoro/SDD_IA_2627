# Notas para replanificar tras la feature C

La feature C ya está implementada y fusionada en `main` (esta vez, bien
hecha). Antes de empezar la siguiente, repasas lo que ha pasado. Estas son
tus notas:

**N1.** La coordinación TIC dice que este trimestre hay muchas averías y que
necesita poder anotarlas cuanto antes. En el índice, la siguiente feature es
la D (Registrar la devolución) y la E (Anotar una incidencia) va después.
La E solo necesita la A, que ya está implementada.

**N2.** En los planes de B y de C tuviste que corregir lo mismo: la hora
actual se obtiene con la función `ahora()` de `src/utilidades/reloj.js`,
nunca con `new Date()` directamente, para que los tests puedan fijarla.

**N3.** En tres sesiones de implementación, el agente buscó los tests en
una carpeta `test/`, que no existe. Están en `tests/`.

**N4.** Has escrito cuatro veces, casi igual, el prompt para que el agente
*plan* revise un plan con la lista del punto de control 2.

**N5.** Mientras implementabas C se te ocurrió que estaría bien exportar los
préstamos del día a un fichero CSV para la coordinación TIC. Son unas diez
líneas de código y te apetece hacerlo ahora, antes de la D.

**N6.** En el plan de C, el agente propuso guardar los préstamos en un
fichero JSON. Lo rechazaste porque ninguna spec pide todavía que los datos
sobrevivan a un reinicio, y quedó como alternativa descartada en el plan.
Es la primera vez que lo propone.
