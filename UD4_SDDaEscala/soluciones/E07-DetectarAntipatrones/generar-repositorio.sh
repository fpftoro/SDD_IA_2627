#!/bin/sh
# Genera practicas/ejercicios/E07-DetectarAntipatrones/repositorio.bundle:
# un repositorio con `main` (el proyecto del préstamo con las features A y B) y la
# rama feature/F-cancelar-reserva con el historial de una feature mal llevada.
# Uso (desde la raíz del repositorio del profesor): sh UD4_SDDaEscala/soluciones/E07-DetectarAntipatrones/generar-repositorio.sh
# Los hashes salen siempre iguales (autor y fechas fijos).
set -e
RAIZ=$(pwd)
BASE=$RAIZ/UD4_SDDaEscala/practicas/ejercicios/E03-DosFeaturesParalelo
SALIDA=$RAIZ/UD4_SDDaEscala/practicas/ejercicios/E07-DetectarAntipatrones/repositorio.bundle
T=$(mktemp -d)
cd "$T"
git init -q -b main repo && cd repo
git config user.name "Equipo del préstamo" && git config user.email "equipo@centro.example"
fecha() { export GIT_AUTHOR_DATE="$1T10:00:00+0100" GIT_COMMITTER_DATE="$1T10:00:00+0100"; }

# --- main: el proyecto con las features A y B ---
for f in AGENTS.md constitution.md opencode.json package.json package-lock.json .gitignore src tests herramientas; do cp -r "$BASE/$f" .; done
mkdir -p docs/specs && cp -r "$BASE/docs/specs/A-consultar-portatiles" "$BASE/docs/specs/B-reservar-carro" docs/specs/ && cp "$BASE/docs/prd.md" docs/
cat > docs/specs/README.md <<'E'
# Features

| # | Feature | Carpeta | Estado |
|---|---------|---------|--------|
| A | Consultar los portátiles | A-consultar-portatiles/ | ✅ Implementada |
| B | Reservar un carro | B-reservar-carro/ | ✅ Implementada |
| F | Cancelar una reserva | F-cancelar-reserva/ | ⏳ Pendiente |
E
cat > LEEME-arranque.md <<'E'
# Cómo arrancar el proyecto

`npm install` y `npm start`. La API queda en http://localhost:3000.
E
git add -A; fecha 2027-03-01; git commit -qm "Fusiona la feature B: reservar un carro"

# --- la rama de la feature F ---
git switch -q -c feature/F-cancelar-reserva
mkdir -p docs/specs/F-cancelar-reserva

cat > docs/specs/F-cancelar-reserva/spec.md <<'E'
# Spec: Cancelar una reserva

| Campo   | Valor         |
|---------|---------------|
| Feature | Cancelar una reserva |
| Estado  | 🔜 Aprobada   |
| Versión | 1.0           |

## Contexto

El profesorado necesita cancelar una reserva cuando ya no usará el carro.

[NECESITA ACLARACIÓN] ¿Se puede cancelar una reserva de otro profesor?

## Requisitos funcionales

- RF-01: El sistema deberá actualizar la tabla `reservas`, poniendo la columna `cancelada` a `true`, mediante la función `cancelarReserva(id)`.
- RF-02: El sistema deberá cancelar rápido.
- RF-03: Cuando se cancele una reserva, el sistema deberá responder 200 con la reserva.

## Edge cases

- EC-01: Si la reserva no existe, entonces el sistema deberá responder 404.
E
sed -i 's#| F | Cancelar una reserva | F-cancelar-reserva/ | ⏳ Pendiente |#| F | Cancelar una reserva | F-cancelar-reserva/ | 🔜 Aprobada |#' docs/specs/README.md
git add -A; fecha 2027-03-02; git commit -qm "Spec de la feature F (aprobada)"

cat > docs/specs/F-cancelar-reserva/plan.md <<'E'
# Plan: Cancelar una reserva

| Campo | Valor |
|-------|-------|
| Spec  | spec.md, versión 1.0 |
| Estado | Aprobado |

## Decisiones

- D-01: Se crea una clase de error nueva para las reservas que no existen:

```javascript
export class NoEncontrado extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'NoEncontrado';
  }
}
```

- D-02: El repositorio busca la reserva y la quita de la lista:

```javascript
cancelar(id) {
  const posicion = reservas.findIndex((r) => r.id === id);
  if (posicion === -1) return undefined;
  return reservas.splice(posicion, 1)[0];
}
```

- D-03: El controlador llama al repositorio y responde.
E
cat > docs/specs/F-cancelar-reserva/tasks.md <<'E'
# Tasks: Cancelar una reserva

## Grupo 1 · Repositorio
- [ ] T-01: Repositorio de reservas
  - Ficheros: src/repositorios/repositorio-reservas.js
  - Terminada cuando: funciona

## Grupo 2 · Servicio
- [ ] T-02: Servicio de cancelación
  - Ficheros: src/servicios/servicio-reservas.js
  - Terminada cuando: funciona

## Grupo 3 · API
- [ ] T-03: Ruta y controlador
  - Ficheros: src/rutas/reservas.js, src/controladores/controlador-reservas.js
  - Terminada cuando: funciona

## Grupo 4 · Tests
- [ ] T-04: Tests de la cancelación
  - Ficheros: tests/cancelar-reserva.test.js
  - Terminada cuando: funciona
E
git add -A; fecha 2027-03-03; git commit -qm "Plan y tasks de la feature F"

# commit grande: toda la implementación a la vez
cat > src/errores/no-encontrado.js <<'E'
export class NoEncontrado extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'NoEncontrado';
  }
}
E
python3 - <<'P'
import re
p='src/repositorios/repositorio-reservas.js'
s=open(p,encoding='utf-8').read()
s=s.replace("  vaciar() {","""  buscarPorId(id) {
    const reserva = reservas.find((candidata) => candidata.id === id);
    return reserva ? { ...reserva } : undefined;
  },

  cancelar(id) {
    const posicion = reservas.findIndex((r) => r.id === id);
    if (posicion === -1) return undefined;
    return reservas.splice(posicion, 1)[0];
  },

  vaciar() {""")
open(p,'w',encoding='utf-8').write(s)
p='src/servicios/servicio-reservas.js'
s=open(p,encoding='utf-8').read()
s=s.rstrip('\n')+"""

export function cancelarReserva(id, usuario) {
  const reserva = repositorioReservas.buscarPorId(id);
  if (!reserva) {
    throw new NoEncontrado('La reserva no existe');
  }
  if (usuario.papel !== 'coordinacion' && reserva.profesor !== usuario.id) {
    throw new ErrorValidacion('Solo puedes cancelar tus reservas');
  }
  return repositorioReservas.cancelar(id);
}
"""
s=s.replace("import { ErrorValidacion } from '../errores/error-validacion.js';","import { ErrorValidacion } from '../errores/error-validacion.js';\nimport { NoEncontrado } from '../errores/no-encontrado.js';",1)
open(p,'w',encoding='utf-8').write(s)
P
cat > src/controladores/controlador-cancelacion.js <<'E'
import { repositorioReservas } from '../repositorios/repositorio-reservas.js';
import { cancelarReserva } from '../servicios/servicio-reservas.js';

export function cancelarReservaHttp(peticion, respuesta) {
  try {
    const reserva = cancelarReserva(peticion.params.id, peticion.usuario);
    respuesta.status(200).json({ ...reserva, quedan: repositorioReservas.obtenerPorDia(reserva.dia).length });
  } catch (error) {
    if (error.name === 'NoEncontrado') {
      respuesta.status(404).json({ error: error.message });
      return;
    }
    if (error.name === 'ErrorValidacion') {
      respuesta.status(403).json({ error: error.message });
      return;
    }
    respuesta.status(500).json({ error: 'No se ha podido cancelar la reserva' });
  }
}
E
cat >> src/rutas/reservas.js <<'E'

rutasReservas.delete('/:id', usuarioActual, cancelarReservaHttp);
E
sed -i "1i import { cancelarReservaHttp } from '../controladores/controlador-cancelacion.js';" src/rutas/reservas.js
cat > tests/cancelar-reserva.test.js <<'E'
import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';
import { app } from '../src/app.js';
import { repositorioReservas } from '../src/repositorios/repositorio-reservas.js';

beforeEach(() => repositorioReservas.vaciar());

describe('DELETE /api/reservas/:id', () => {
  test('cancela una reserva', async () => {
    repositorioReservas.guardar({ id: 'r1', carro: 'A', dia: '2027-03-02', hora: 3, profesor: 'ana' });
    const respuesta = await request(app)
      .delete('/api/reservas/r1')
      .set('X-Usuario', 'ana')
      .set('X-Papel', 'profesor');
    expect(respuesta.status).toBe(200);
  });

  test('responde 404 si no existe', async () => {
    const respuesta = await request(app)
      .delete('/api/reservas/zzz')
      .set('X-Usuario', 'ana')
      .set('X-Papel', 'profesor');
    expect(respuesta.status).toBe(404);
  });
});
E
git add -A; fecha 2027-03-05; git commit -qm "Feature F: cancelar reservas"

# decoys: lockfile regenerado y fichero movido
sed -i 's/"lockfileVersion": 3/"lockfileVersion": 3/' package-lock.json
python3 - <<'P'
import json
d=json.load(open('package-lock.json'))
# reordena las claves de paquetes: ruido típico de regenerar el lock
paquetes=d['packages']
d['packages']={k:paquetes[k] for k in sorted(paquetes, reverse=True)}
json.dump(d,open('package-lock.json','w'),indent=2,ensure_ascii=False)
open('package-lock.json','a').write('\n')
P
git add -A; fecha 2027-03-05; git commit -qm "Regenera package-lock.json"
mkdir -p docs && git mv LEEME-arranque.md docs/arranque.md
git add -A; fecha 2027-03-05; git commit -qm "Mueve la guía de arranque a docs/"

# wip: borra un test, salta otro, fichero fuera de las tasks, desactiva una regla
python3 - <<'P'
import re
p='tests/servicio-reservas.test.js'
s=open(p,encoding='utf-8').read()
i=s.index("  test('RF-03: las ordena por hora y, a la misma hora, por carro'")
j=s.index("\n  });\n",i)+len("\n  });\n")
s=s[:i].rstrip('\n')+"\n"+s[j:]
open(p,'w',encoding='utf-8').write(s)
p='tests/cancelar-reserva.test.js'
s=open(p,encoding='utf-8').read()
s=s.replace("  test('responde 404 si no existe'","  test.skip('un profesor no puede cancelar la reserva de otro', async () => {\n    expect(true).toBe(true);\n  });\n\n  test('responde 404 si no existe'")
open(p,'w',encoding='utf-8').write(s)
p='src/controladores/controlador-cancelacion.js'
s=open(p,encoding='utf-8').read()
s=s.replace("import { repositorioReservas }","// eslint-disable-next-line no-restricted-imports\nimport { repositorioReservas }")
open(p,'w',encoding='utf-8').write(s)
P
mkdir -p src/utilidades && cat > src/utilidades/formato.js <<'E'
export function primeraMayuscula(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
E
sed -i "s#throw new NoEncontrado('La reserva no existe');#throw new NoEncontrado('La reserva no existe');\n    // TODO revisar#" src/servicios/servicio-reservas.js
git add -A; fecha 2027-03-08; git commit -qm "wip"

# arreglos: el índice a Implementada (lo cambia una persona) y la spec sin tocar
sed -i 's#| F | Cancelar una reserva | F-cancelar-reserva/ | 🔜 Aprobada |#| F | Cancelar una reserva | F-cancelar-reserva/ | ✅ Implementada |#' docs/specs/README.md
sed -i 's/- \[ \]/- [x]/' docs/specs/F-cancelar-reserva/tasks.md
git add -A; fecha 2027-03-09; git commit -qm "Arreglos"

git switch -q main
git bundle create "$SALIDA" main feature/F-cancelar-reserva >/dev/null 2>&1
echo "Creado $SALIDA"
git log --oneline --all --graph
rm -rf "$T"
