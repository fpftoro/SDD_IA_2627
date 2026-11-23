#!/usr/bin/env bash
# Comprueba que cada identificador de las specs en implementación o
# implementadas tiene un test con la letra de su feature. Los que el plan
# comprueba «a mano» se avisan, pero no hacen fallar la comprobación.
# Uso: bash herramientas/comprobar-trazabilidad.sh (desde la raíz del proyecto)

errores=0

for spec in docs/specs/*/spec.md; do
  carpeta=$(dirname "$spec")
  letra=$(basename "$carpeta" | cut -d- -f1)
  estado=$(grep -m1 '^| Estado' "$spec" | cut -d'|' -f3 | xargs)

  case "$estado" in
    "En implementación" | Implementada) ;;
    *) continue ;;
  esac

  a_mano=$(grep -i 'a mano' "$carpeta/plan.md" 2>/dev/null |
    grep -oE '(RF|RNF|AC|EC)-[0-9]+' | sed "s/^/$letra-/")

  sin_test=$(comm -23 \
    <(grep -oE '(RF|RNF|AC|EC)-[0-9]+' "$spec" | sed "s/^/$letra-/" | sort -u) \
    <(grep -rohE "$letra-(RF|RNF|AC|EC)-[0-9]+" tests/ e2e/ 2>/dev/null | sort -u))

  for id in $sin_test; do
    if grep -qx "$id" <<< "$a_mano"; then
      echo "⚠️  $id: se comprueba a mano, según el plan"
    else
      echo "❌ $id: sin test"
      errores=$((errores + 1))
    fi
  done
done

if [ "$errores" -eq 0 ]; then
  echo "✅ Trazabilidad: ningún identificador sin test ni comprobación a mano"
fi
exit "$errores"
