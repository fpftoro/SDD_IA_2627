#!/usr/bin/env bash
# Prepara un intento de la batería en su propia carpeta, fuera del repositorio.
#
# Uso, desde la raíz del ejercicio:
#   bash bateria/intento.sh <caso> <configuración> <n>
#
#   bash bateria/intento.sh 2 A 1   → intento 2-A-1: caso 2, rama config-A, primer intento
#
# Crea la rama intento/<caso>-<configuración>-<n> desde config-<configuración>
# en la carpeta ~/intentos/<intento> (un worktree de Git), quita de ella la
# batería, los intentos preparados, el enunciado y la entrega, aplica el estado
# inicial del caso y lo guarda en un commit con la etiqueta base/<intento>.
# Después instala las dependencias y muestra el encargo.
set -euo pipefail

if [ $# -ne 3 ]; then
  sed -n '4,8p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

CASO="$1"
CONFIG="$2"
N="$3"
ID="$CASO-$CONFIG-$N"
RAIZ="$(git rev-parse --show-toplevel)"
cd "$RAIZ"

DIR_CASO=$(find bateria/casos -maxdepth 1 -type d -name "$CASO-*" | head -1)
[ -n "$DIR_CASO" ] || { echo "❌ No existe el caso $CASO en bateria/casos/"; exit 1; }
git rev-parse --verify -q "config-$CONFIG" >/dev/null ||
  { echo "❌ No existe la rama config-$CONFIG (créala antes, ENUNCIADO.md)"; exit 1; }
if git rev-parse --verify -q "intento/$ID" >/dev/null; then
  echo "❌ El intento $ID ya existe. Usa el número siguiente."
  exit 1
fi

CARPETA="$HOME/intentos/$ID"
[ ! -e "$CARPETA" ] || { echo "❌ Ya existe la carpeta $CARPETA"; exit 1; }
mkdir -p "$HOME/intentos"

autor=(-c user.name="$(git config user.name || echo 'Batería del E06')"
       -c user.email="$(git config user.email || echo 'bateria@e06.local')")

git worktree add -q -b "intento/$ID" "$CARPETA" "config-$CONFIG"
cd "$CARPETA"

# Lo que el agente no debe ver: la batería, los intentos preparados y la entrega
git rm -r -q --ignore-unmatch bateria trazas sesiones README.md ENUNCIADO.md
git apply "$RAIZ/$DIR_CASO/estado.patch"

echo "Instalando las dependencias del intento…"
npm install --no-audit --no-fund --no-update-notifier --loglevel=error

git add -A
git "${autor[@]}" commit -q -m "Intento $ID: estado inicial"
git tag "base/$ID"
date +%s > "$HOME/intentos/.$ID.inicio"

cat <<EOF

✅ Intento $ID preparado en $CARPETA

1. Abre una terminal en esa carpeta y arranca OpenCode:
     cd $CARPETA && opencode
2. Con el agente build, pega este encargo tal cual:

$(sed 's/^/     /' "$RAIZ/$DIR_CASO/encargo.txt")

3. Sigue las reglas de cada intento (ENUNCIADO.md): no ayudes al agente, no
   contestes sus preguntas y rechaza sus peticiones de permiso.
4. Al terminar, /export a un fichero, cierra OpenCode y, desde $RAIZ:
     bash bateria/comprobar.sh $ID
EOF
