#!/usr/bin/env bash
# Comprueba que ninguna spec aprobada, en implementación o implementada
# tiene marcadores [NECESITA ACLARACIÓN].
# Uso: bash herramientas/comprobar-marcadores.sh (desde la raíz del proyecto)

errores=0

for spec in docs/specs/*/spec.md; do
  estado=$(grep -m1 '^| Estado' "$spec" | cut -d'|' -f3 | xargs)

  case "$estado" in
    Aprobada | "En implementación" | Implementada) ;;
    *) continue ;;
  esac

  while IFS= read -r linea; do
    echo "❌ $spec ($estado): $linea"
    errores=$((errores + 1))
  done < <(grep -n 'NECESITA ACLARACIÓN' "$spec")
done

if [ "$errores" -eq 0 ]; then
  echo "✅ Marcadores: ninguna spec aprobada tiene dudas sin resolver"
fi
exit "$errores"
