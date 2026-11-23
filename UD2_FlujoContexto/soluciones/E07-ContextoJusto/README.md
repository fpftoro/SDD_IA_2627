# E07-ContextoJusto

## El contexto justo

### Descripción

Solución del **Ejercicio 7** (autocorrección, con una parte opcional con agente). El alumno diagnostica siete problemas de contexto en fragmentos de sesiones, prepara el contexto de cada fase de la feature D del préstamo de portátiles, escribe un prompt de planificar con el contexto justo y clasifica diez elementos en los cuatro tipos de memoria. En la parte opcional compara un plan hecho al final de una sesión larga con otro hecho en una sesión nueva.

- Enunciado y material: [`practicas/ejercicios/E07-ContextoJusto`](../../practicas/ejercicios/E07-ContextoJusto/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 7 | El contexto justo | Limitaciones de la ventana de contexto y estrategias para gestionarla (OA2 e) |

### Estructura

```text
E07-ContextoJusto/
├── README.md          ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md      ← respuesta modelo
    └── fragmentos.md  ← material de partida, sin cambios
```

### Material sembrado

| Fragmento | Causa principal | Estrategia esperada |
|-----------|-----------------|---------------------|
| F1 | Degradación del contexto (propuesta rechazada que vuelve) | Sesión nueva por fase y ciclo; el rechazo, al plan |
| F2 | Instrucciones que se apagan | La regla, en `tests/AGENTS.md` o en una skill |
| F3 | Presupuesto de atención (todo el proyecto) | Lo justo, con `@` y *explore* |
| F4 | Contexto de otra task (implementa más de lo pedido) | Sesión nueva por ciclo |
| F5 | Copia desactualizada | Referencias con `@` |
| F6 | Compactación que pierde una decisión solo hablada | Escribir la decisión en la spec |
| F7 | Corregir encima de un intento fallido | `/undo` y reescribir el mensaje |

### Conceptos aprendidos

- Más contexto no es mejor: lo justo para la tarea, en el orden adecuado.
- La conversación se degrada; los ficheros no. Lo que importa se escribe en la spec, el plan, `tasks.md` o `AGENTS.md`.
- Cada fase necesita su contexto, y el historial de la fase anterior no es uno de ellos.
- Las cuatro memorias del agente: de trabajo (la ventana), procedimental (`AGENTS.md`), semántica (constitución, PRD, specs) y episódica (lo que se hizo antes, usado como ejemplo).

### Errores frecuentes

- Responder «decirle al agente que tenga cuidado» o «repetírselo» como estrategia.
- Confundir F1 con F2: en F1 vuelve una **propuesta**; en F2 se apaga una **instrucción**.
- En F6, proponer solo «desactivar la compactación», sin escribir la decisión en la spec.
- Dar el código a la fase de especificar o «todo el proyecto» a la de planificar.
- Un prompt de planificar sin ejemplo, sin *explore* o con las reglas al principio.
- Clasificar la constitución como procedimental (es «qué es verdad», no «cómo se hace»), o el plan de C como semántica (en D se usa como ejemplo: episódica).
- Clasificar la propuesta rechazada como episódica: está en la ventana de la sesión, es de trabajo.

### Otras soluciones válidas

- Varias causas en una fila (por ejemplo, F1 como degradación y perdido en el medio, o F3 como presupuesto de atención y falta del fichero clave), si son coherentes con el síntoma.
- En F2, la regla en `AGENTS.md` raíz en lugar de `tests/AGENTS.md`, o en una skill; lo que no vale es dejarla en el primer mensaje.
- Leer los ficheros que D va a cambiar con `@` en lugar de con *explore*, si el prompt los nombra uno a uno.
- Clasificar el PRD como semántica que entra «siempre» si el alumno lo ha puesto en `instructions`; lo habitual es que entre solo al especificar.
- En la parte 4, cualquier resultado documentado con honestidad, aunque los dos planes salgan parecidos: lo que se valora es la comparación.
