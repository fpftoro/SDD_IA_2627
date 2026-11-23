# E05-GatesProyecto

## Los gates del proyecto

### Descripción

Solución del **Ejercicio 5** (autocorrección). El alumno monta en el préstamo de portátiles el lint con las reglas de las cuatro capas, la cobertura con un umbral escrito en la constitución, la trazabilidad y el estado, y un workflow de GitHub Actions con un *job* por gate. Comprueba que `main` está en verde y que una rama con una violación de capas sale en rojo, y explica qué no detectan sus gates.

- Enunciado y material de partida: [`practicas/ejercicios/E05-GatesProyecto`](../../practicas/ejercicios/E05-GatesProyecto/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 5 | Los gates del proyecto | *Quality gates* automatizados en integración continua (OA3 c) |

### Estructura

```text
E05-GatesProyecto/
├── README.md                          ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md                      ← respuesta modelo
    ├── eslint.config.js
    ├── vitest.config.js
    ├── package.json
    ├── herramientas/                  ← comprobar-trazabilidad.sh y comprobar-spec.sh
    └── .github/workflows/calidad.yml
```

Comprobado en Docker: lint sin errores en `main` y con el error de capas en el controlador del material; cobertura del 100 % de líneas y ramas con 22 tests; trazabilidad y estado en verde; `actionlint` sin avisos sobre el workflow. La ejecución real en GitHub depende del repositorio de cada alumno.

### Qué pasa en la rama `prueba-gates`

| Job | Resultado | Por qué |
|-----|-----------|---------|
| Lint y arquitectura | ❌ | `no-restricted-imports` en `src/controladores/controlador-portatiles.js:3` |
| Tests y cobertura | ✅ | El controlador hace lo mismo: los tests no ven la arquitectura |
| Trazabilidad y estado | ✅ | Nada cambia en specs ni tests |
| Spec existente | ❌ | La rama cambia `src/` sin tocar ningún documento de una feature |

Que los tests pasen y el lint no es justo lo que enseña el ejercicio: la arquitectura necesita su propio gate.

### Errores frecuentes

- Una sola regla para los controladores (la del tema) sin cubrir las demás capas, o reglas sin mensaje.
- Umbral del 100 % «porque ahora está al 100 %»: cualquier línea nueva difícil de probar bloquea el proyecto. Es válido si se justifica, pero el modelo deja margen.
- Un solo *job* con todos los gates.
- `npm install` en lugar de `npm ci`, o no subir `package-lock.json` (sin él, `npm ci` falla).
- Olvidar `fetch-depth: 0` en el *job* que compara con `main`: el gate de spec existente no encuentra `origin/main`.
- Fusionar la rama `prueba-gates`.
- «Lo que no detectan» genérico («la calidad del código»), sin un cambio concreto.

### Otras soluciones válidas

- Otra organización de las reglas de ESLint (por ejemplo, una función por capa) o sin el gate de spec existente si el resto está completo: el requisito 5 lo pide solo en las ramas, y su ausencia baja un nivel en un criterio, no lo anula.
- Umbrales distintos (por ejemplo, 95 % y 90 %), si están por debajo de la cobertura real y justificados.
- Ejemplos válidos de «Lo que no detectan»: cambiar el mensaje de EC-02 en el código y en su test a la vez (pasa todo salvo una revisión que compare con la spec; el gate de tests modificados del tema 3 lo avisaría en una rama), ordenar por carro ajustando los tests, aceptar mayúsculas con un test nuevo.
