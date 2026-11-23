# Análisis de impacto

Arquitectura quiere llevar a la constitución un principio nuevo, a petición de producto:

> **Permisos.** Cada profesor solo puede cancelar o modificar lo que ha creado él (sus reservas, sus préstamos). La coordinación TIC puede cancelar o modificar lo de cualquiera.

Antes de escribir la PR ha encargado a *explore* que busque en `src/` qué partes del código incumplirían el principio, y ha consultado el índice y las ramas abiertas. Esto es lo que ha devuelto.

## Código

| Fichero | Función | ¿Cumpliría el principio? |
|---------|---------|--------------------------|
| `src/middlewares/usuario-actual.js` | `usuarioActual` | Sí. Pone `peticion.usuario` con `id` y `papel` (`profesor` o `coordinacion`), que es lo que el principio necesita |
| `src/servicios/servicio-reservas.js` | `crearReserva`, `listarReservasDelDia` | Sí. Solo crean y leen; ninguna cancela ni modifica |
| `src/servicios/servicio-prestamos.js` | `registrarPrestamo` | Sí. Solo crea, a nombre de quien lo hace |
| `src/servicios/servicio-prestamos.js` | `registrarDevolucion` | **No decide nada sobre quién devuelve**: cualquiera puede registrar la devolución de cualquier préstamo. Está en implementación |
| `src/repositorios/*` | todas | Sí. No conocen a los usuarios |

## Índice y ramas abiertas

| Feature | Estado | Rama | Qué hay en ella |
|---------|--------|------|-----------------|
| D · Registrar la devolución | 🔜 Aprobada | `feature/D-registrar-devolucion` | Plan aprobado, ciclo 2 de 4. La spec dice en «Fuera de alcance»: «Devolver un portátil que no estaba prestado a quien lo devuelve» |
| E · Anotar una incidencia | 🔜 Aprobada | `feature/E-anotar-incidencia` | Plan en `Borrador`. Cualquier profesor puede anotar una incidencia de cualquier portátil |
| F · Cancelar una reserva | ⏳ Pendiente | — | Todavía sin spec. Es la feature que regula este principio |

## Nota de producto

La coordinación TIC dice: «Que un profesor devuelva el portátil de otro compañero es normal: se lo ha dejado en la sala. Lo que no debería poder hacer es cancelar su reserva».
