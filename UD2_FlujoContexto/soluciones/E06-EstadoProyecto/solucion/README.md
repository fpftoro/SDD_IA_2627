# El estado del proyecto

Índice de features: [`docs/specs/README.md`](./docs/specs/README.md)

## Antes

```text
❌ A-consultar-portatiles: la spec dice «Implementada» y el índice, «🔧 En implementación»
❌ B-reservar-carro: la spec dice «Aprobada» y el índice, «✅ Implementada»
✅ C-registrar-prestamo: Aprobada
❌ D-registrar-devolucion: la spec dice «En revisión» y el índice, «📝 Borrador»
❌ E-anotar-incidencia: la spec dice «Borrador» y el índice, «⏳ Pendiente»
❌ F-cancelar-reserva: la spec dice «En revisión» y el índice, «nada»
```

## Diagnóstico

| Feature | La spec dice | El índice dice | Ficheros e historial | Estado correcto | Cómo lo has sabido |
|---------|--------------|----------------|----------------------|-----------------|--------------------|
| A | Implementada | 🔧 En implementación | Plan, tasks todas `[x]`, código y tests en verde; «Fusiona la feature A» en el historial | ✅ Implementada | El script. Manda la spec, y los ficheros lo confirman |
| B | Aprobada | ✅ Implementada | En `main`, solo la spec. Su trabajo está en `feature/B-reservar-carro`, sin fusionar, con 4 de 6 tasks hechas | 🔜 Aprobada | El script y el historial: en `main` solo se ve lo terminado. El commit «Actualiza el índice de features» la marcó como implementada sin serlo |
| C | Aprobada | 🔜 Aprobada | Plan, tasks todas `[x]`, código en `src/` con sus tests en verde, y «Fusiona la feature C» en el historial. El último ciclo no cambió el estado | ✅ Implementada (spec e índice) | **No lo detecta el script**: spec e índice coinciden, pero los dos están mal. Tabla 4.3.3: aprobada no puede tener código |
| D | En revisión | 📝 Borrador | Solo la spec, con dos `[NECESITA ACLARACIÓN]` | 📝 Borrador (spec e índice) | El script avisa de la diferencia, pero aquí la spec está mal: con marcadores, no está terminada (tabla 4.3.3) |
| E | Borrador (`spec.md`) y Aprobada (`spec-v2.md`) | ⏳ Pendiente | Dos specs en la carpeta. El historial tiene «Spec de la feature E: versión nueva en spec-v2.md (aprobada)», posterior a la de borrador | 🔜 Aprobada, con una sola `spec.md` (la versión 1.0 aprobada) | El script (la spec existe y el índice dice Pendiente) y la carpeta (**el script solo lee `spec.md`**: no ve la segunda versión) |
| F | En revisión | (sin fila) | Solo la spec | 👀 En revisión | El script: spec sin fila en el índice |

## Ramas

| Rama | Qué haces | Comando | Por qué |
|------|-----------|---------|---------|
| `feature/B-reservar-carro` | Nada: se deja como está | — | Es una feature en curso (2 tasks por hacer). No se fusiona a medias; en `main` sigue `🔜 Aprobada` |
| `feature/C-registrar-prestamo` | Se borra | `git branch -d feature/C-registrar-prestamo` y `git push origin --delete feature/C-registrar-prestamo` | Ya está fusionada (`git branch --merged main`); dejarla confunde, porque parece una feature en curso |

## Después

```text
✅ A-consultar-portatiles: Implementada
✅ B-reservar-carro: Aprobada
✅ C-registrar-prestamo: Implementada
✅ D-registrar-devolucion: Borrador
✅ E-anotar-incidencia: Aprobada
✅ F-cancelar-reserva: En revisión
```

## Referencias

Para quedarse con una sola spec en E:

```bash
git rm docs/specs/E-anotar-incidencia/spec.md
git mv docs/specs/E-anotar-incidencia/spec-v2.md docs/specs/E-anotar-incidencia/spec.md
```

El cambio de orden:

```bash
git mv docs/specs/D-registrar-devolucion docs/specs/E-registrar-devolucion
git mv docs/specs/E-anotar-incidencia docs/specs/D-anotar-incidencia
```

Referencias cambiadas:

| Fichero | Decía | Dice |
|---------|-------|------|
| `docs/specs/README.md` | D Registrar la devolución, E Anotar una incidencia | D Anotar una incidencia (`D-anotar-incidencia/`), E Registrar la devolución (`E-registrar-devolucion/`) |
| `docs/specs/D-anotar-incidencia/spec.md` | «La feature D (Registrar la devolución, `docs/specs/D-registrar-devolucion/`)» | «La feature E (Registrar la devolución, `docs/specs/E-registrar-devolucion/`)» |
| `docs/specs/E-registrar-devolucion/spec.md` | «(feature E, Anotar una incidencia)» | «(feature D, Anotar una incidencia)» |
| `docs/specs/C-registrar-prestamo/spec.md` | «Registrar la devolución (feature D)» | «Registrar la devolución (feature E)» |

`npm run estado` sigue sin errores con los nombres nuevos, y `git log --follow` conserva la historia de las dos carpetas.

## Commits

```text
<hash> README del E06: diagnóstico y replanificación
<hash> Replanificación tras la feature C: incidencias antes que devoluciones
<hash> Estado de las features: índice y specs coherentes
<hash> Proyecto de partida
```
