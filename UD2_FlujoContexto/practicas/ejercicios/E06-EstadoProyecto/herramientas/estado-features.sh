#!/bin/sh
# Compara el estado de cada spec con el del índice de features.
# Uso: sh herramientas/estado-features.sh (desde la raíz del proyecto)

INDICE=docs/specs/README.md
errores=0

for spec in docs/specs/*/spec.md; do
  carpeta=$(basename "$(dirname "$spec")")
  en_spec=$(grep -m1 '^| Estado' "$spec" | cut -d'|' -f3 | xargs)
  en_indice=$(grep -F "| $carpeta/ |" "$INDICE" | cut -d'|' -f5 | xargs)

  case "$en_indice" in
    *"${en_spec:-sin estado}")
      echo "✅ $carpeta: $en_spec"
      ;;
    *)
      echo "❌ $carpeta: la spec dice «${en_spec:-nada}» y el índice, «${en_indice:-nada}»"
      errores=$((errores + 1))
      ;;
  esac
done

exit "$errores"
