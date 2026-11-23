#!/usr/bin/env bash
# Comprueba que una rama que cambia el código cambia también algún
# documento de una feature (spec, plan o tasks).
# Uso: bash herramientas/comprobar-spec.sh <rama-base>  (por defecto, origin/main)

base=${1:-origin/main}
cambios=$(git -c core.quotePath=false diff --name-only "$base"...HEAD)

if ! grep -qE '^(src|public)/' <<< "$cambios"; then
  echo "✅ Spec: la rama no cambia el código"
  exit 0
fi

if grep -qE '^docs/specs/[^/]+/(spec|plan|tasks)\.md$' <<< "$cambios"; then
  echo "✅ Spec: el código cambia junto con los documentos de su feature"
  exit 0
fi

echo "❌ Spec: la rama cambia src/ o public/ sin cambiar ninguna spec, plan o tasks de docs/specs/"
exit 1
