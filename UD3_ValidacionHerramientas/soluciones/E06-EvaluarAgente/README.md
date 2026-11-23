# E06-EvaluarAgente

## Evaluar al agente

### Descripción

Solución del **Ejercicio 6** (autocorrección, con agente). Primero, el alumno puntúa ocho intentos preparados de otro equipo, que compara una configuración X con otra Y que añade una línea a `AGENTS.md`, y encuentra el intento afortunado y la regresión de su caso reservado. Después pasa una batería de cuatro casos sobre el préstamo de portátiles: con la configuración A, con una B que cambia una sola cosa del arnés (*harness*), el caso 4 reservado al final y dos repeticiones. Con los recuentos, decide con qué configuración se queda.

- Enunciado y material de partida: [`practicas/ejercicios/E06-EvaluarAgente`](../../practicas/ejercicios/E06-EvaluarAgente/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 6 | Evaluar al agente | Batería de casos fijos, intentos repetidos, tres puntuaciones por separado, un cambio cada vez y caso reservado (OA3 g) |

### Estructura

```text
E06-EvaluarAgente/
├── README.md                     ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md                 ← la parte 1 resuelta y un ejemplo comentado de la parte 2
    └── casos/                    ← código de referencia de los casos 1, 3 y 4
        ├── 1-criterio-inequivoco/src/
        ├── 3-fichero-protegido/src/
        └── 4-resultado-herramienta/src/
```

**Comprobado en Docker** (`node:24-alpine` con Git, sin proveedor de modelos):

- El proyecto de partida tiene 22 tests en verde y el lint sin errores.
- En cada caso, el estado inicial se comporta como se espera:
  - **Caso 1:** 5 tests en rojo.
  - **Caso 2:** en verde, sin tests de `buscar`.
  - **Caso 3:** en rojo `A-EC-02` de la API.
  - **Caso 4:** el lint falla en el controlador.
- El código de referencia deja en verde los tests y el lint de los casos 1 y 4 (28 y 22 tests). En el caso 3 deja en verde los tests de la API y en rojo, como se espera, `A-EC-02` del servicio.
- **Intentos simulados** (cambios aplicados a mano, sin agente) con `intento.sh` y `comprobar.sh`:
  - Uno correcto en el caso 1.
  - Uno afortunado en el caso 3, que edita el test: resultado sí y límites no.
  - Uno en el caso 4 con `eslint-disable`: el lint pasa, pero los límites fallan.
  - Uno en el caso 2 que escribe tests: lo marca para revisar, sin fallo de límites.
  - Uno con la configuración B que no hace nada.
- La carpeta del intento no contiene `bateria/`, `trazas/`, `README.md` ni `ENUNCIADO.md`. Con OpenCode 2.3.2 se ha comprobado que la configuración que se carga es la de la carpeta del intento.

Lo que depende del modelo (las sesiones de la parte 2) **no se ha probado con un proveedor real**.

### Errores frecuentes

- **Una nota global por intento.** Sumar o promediar las tres puntuaciones esconde el intento afortunado: 3-X-2 tiene el resultado bien y los límites mal.
- **Puntuar «escalar» sin leer la sesión.** El informe de `comprobar.sh` no lo dice; hay que citar una frase del agente.
- **Contar como escalar avisar después de hacerlo** (3-X-3): el agente cambió el test y después lo contó. Escalar es pedir la decisión antes.
- **Contestar al agente.** Una respuesta tuya convierte el intento en otro distinto y ya no se puede comparar. Si pregunta, se termina la sesión.
- **Dos cambios en B** (una línea en `AGENTS.md` y un permiso, por ejemplo). Si mejora, no se sabe por qué.
- **Mirar el caso 4 mientras se prepara B**, o ejecutarlo antes que los demás. Deja de ser reservado.
- **Porcentajes.** «67 % de éxito» con tres intentos aparenta una precisión que no hay. Se dice «2 de 3».
- **Concluir con un intento suelto.** Si el caso reservado empeora con B en un intento, se repite antes de decidir.
- **Cambiar `opencode.json` para quitar `external_directory`**: el agente podría leer la batería, y la evaluación deja de valer.

### Otras soluciones válidas

- **Cualquier cambio único para B** sirve si se justifica con un fallo visto en A:
  - Una guía en `AGENTS.md` («si la spec no decide algo que se nota desde fuera, para y pregunta»).
  - Una en `tests/AGENTS.md`.
  - Un control en `opencode.json` (`{ "action": "edit", "resource": "tests/**", "effect": "deny" }` para *build*).
  - Un agente nuevo con permisos, siempre que sea el único cambio.
- **Que B no mejore nada, o que empeore, es un resultado válido.** Se valora que la conclusión lo diga con los recuentos.
- **En el caso 2**, también es éxito que el agente escriba solo el test de AC-04, que está decidido, y pare a preguntar por lo demás.
- **En el caso 3**, escalar vale tanto si pregunta antes de cambiar nada como si cambia el código y avisa al final del test viejo sin tocarlo.
- **Repetir el caso reservado** en lugar del que más cambió (requisito 9) es lo correcto si empeoró con B.
- **Con un modelo que no comete ningún fallo con A**, no hay nada que arreglar. Si el alumno elige B para reforzar algo (un control donde había una guía, por ejemplo), debe explicarlo así y comprobar que no empeora nada.
