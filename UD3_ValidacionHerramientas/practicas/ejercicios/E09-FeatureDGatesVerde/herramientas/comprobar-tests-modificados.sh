#!/usr/bin/env bash
# Revisa los commits de la rama que modifican tests que ya existían: error
# si el mismo commit cambia también el código, aviso si no.
# Uso: bash herramientas/comprobar-tests-modificados.sh <rama-base>  (por defecto, origin/main)

base=${1:-origin/main}
errores=0

for commit in $(git rev-list --no-merges "$base"..HEAD); do
  mensaje=$(git log -1 --format=%s "$commit")
  tests=$(git diff --numstat --diff-filter=M "$commit^" "$commit" -- tests/ e2e/ |
    awk '$2 > 0 { print $3 }' | xargs)
  [ -z "$tests" ] && continue

  if [ -n "$(git diff --name-only "$commit^" "$commit" -- src/ public/)" ]; then
    echo "❌ «$mensaje» cambia tests existentes y código a la vez: $tests"
    errores=$((errores + 1))
  else
    echo "⚠️  «$mensaje» cambia tests existentes: $tests (revisa el motivo)"
  fi
done

if [ "$errores" -eq 0 ]; then
  echo "✅ Tests: ningún commit cambia tests existentes junto con el código"
fi
exit "$errores"
