#!/bin/sh
# Falla si la rama tiene trampas: controles apagados, borrados en los repositorios
# o specs con marcadores sin resolver.
# Uso: sh comprobar-trampas.sh [rama-base]   (desde la raíz del repositorio; por defecto, main)
base=${1:-main}
errores=0

trampas=$(git diff "$base"...HEAD -U0 -- src tests |
  grep -E '^\+[^+].*(eslint-disable|\.skip\(|\.only\()')
if [ -n "$trampas" ]; then
  echo "❌ Controles apagados o tests desactivados:"
  echo "$trampas"
  errores=$((errores + 1))
fi

borrados=$(git diff "$base"...HEAD -U0 -- src | grep -E '^\+[^+].*splice\(')
if [ -n "$borrados" ]; then
  echo "❌ Borrados en src/ (la constitución dice que no se borra):"
  echo "$borrados"
  errores=$((errores + 1))
fi

marcadores=$(grep -rn "NECESITA ACLARACIÓN" docs/specs 2>/dev/null)
if [ -n "$marcadores" ]; then
  echo "❌ Specs con marcadores sin resolver:"
  echo "$marcadores"
  errores=$((errores + 1))
fi

if [ "$errores" -eq 0 ]; then
  echo "✅ Sin trampas"
fi
exit $((errores > 0))
