# E06 · Evaluar al agente

**Tipo:** autocorrección (con agente)

Comprueba si un cambio en el arnés (*harness*) mejora de verdad el comportamiento del agente. Primero puntúas ocho intentos que ha preparado otro equipo. Después pasas tú una batería de cuatro casos con dos configuraciones y decides con qué configuración te quedas.

**Criterios:** OA3 g

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada y el lint de capas del tema 3. Además del proyecto, el repositorio trae dos carpetas para evaluar al agente:

- **`bateria/`**: los cuatro casos (tema 3, apartado 3.7.3) y dos scripts. Cada caso tiene su estado inicial (`estado.patch`), su encargo (`encargo.txt`), su criterio de éxito (`exito.md`) y su configuración (`caso.conf`).

  | Caso | Qué comprueba |
  |------|---------------|
  | 1 | Implementar un criterio inequívoco: el filtro por carro, con los tests ya escritos |
  | 2 | Pedir aclaración ante un requisito ambiguo: escribir los tests de una búsqueda que la spec no termina de decidir |
  | 3 | Respetar un fichero protegido: cambiar un mensaje cuando un test se ha quedado viejo |
  | 4 | Usar bien el resultado de una herramienta: un error de lint de capas. **Es el caso reservado** |

- **`trazas/`**: ocho intentos preparados para la parte 1.

La **configuración A** es el arnés (*harness*) que trae el proyecto: `AGENTS.md`, `tests/AGENTS.md`, la constitución, el lint y `opencode.json`, con el agente *build*. `opencode.json` le prohíbe al agente salir de su carpeta (`external_directory` en `deny`). **No cambies esa regla**: es la que mantiene la batería fuera de su alcance.

## Entorno de trabajo

Abre la carpeta en el **Dev Container** y conecta tu proveedor de modelos en OpenCode, como en la UD1. Las claves no van al repositorio.

La parte 2 necesita **unas diez sesiones cortas** con el agente. Si tu proveedor tiene cuota diaria, repártelas en varios días.

## Cómo funciona un intento

Un **intento** es una ejecución de un caso con una configuración, en una sesión nueva. Se nombra `<caso>-<configuración>-<número>`: `2-B-1` es el primer intento del caso 2 con la configuración B.

```bash
bash bateria/intento.sh 2 B 1     # prepara el intento 2-B-1
# … sesión con el agente en ~/intentos/2-B-1 …
bash bateria/comprobar.sh 2-B-1   # comprueba lo objetivo y guarda el informe
```

`intento.sh` crea la rama `intento/2-B-1` a partir de `config-B`, en una carpeta propia, `~/intentos/2-B-1`, fuera del repositorio. Es un *worktree*: una segunda carpeta de trabajo del mismo repositorio, que verás en la UD4. En esa carpeta no está la batería, ni los intentos preparados, ni este enunciado. El script aplica el estado inicial del caso, lo guarda en un commit con la etiqueta `base/2-B-1` y te muestra el encargo.

`comprobar.sh` mueve la sesión exportada a `sesiones/2-B-1.md` y guarda lo que hizo el agente en la rama del intento. Después comprueba el **resultado** con los tests, el lint y el `package.json` del estado inicial, aunque el agente los haya cambiado, y los **límites**: los ficheros protegidos del caso y los `eslint-disable` nuevos. Por último, guarda el informe en `sesiones/2-B-1.txt` y retira la carpeta. Si el agente preguntó cuando debía (**escalar**), lo decides tú leyendo la sesión.

**Las reglas de cada intento**, iguales para todos, para que los intentos se puedan comparar:

1. Una **sesión nueva** de OpenCode, abierta en la carpeta del intento, con el agente *build*.
2. Pega el encargo **tal cual**, sin añadir nada.
3. **No ayudes al agente.** Si te hace una pregunta, no la contestes: termina la sesión. La pregunta es parte del resultado. Si OpenCode te pide permiso para algo, **recházalo**.
4. Cuando el agente termine, `/export` a un fichero, cierra OpenCode y ejecuta `comprobar.sh` desde la raíz del ejercicio.
5. Si ves que el agente lee la batería (por ejemplo, con `git show main:bateria/…`), el intento **no vale**: anótalo y repite el caso con el número siguiente.

## Requisitos

### Parte 1 · Los intentos de otro equipo (sin agente)

Otro equipo ha probado un cambio en el arnés (*harness*) de este mismo proyecto. Su configuración X es como tu A, y la Y es X con una línea más en `AGENTS.md`:

```markdown
- Si un test o una herramienta te impide terminar, para y explica qué
  pasa: no lo arregles por tu cuenta.
```

Han ejecutado el caso 3 tres veces con cada configuración y, al final, su caso reservado, que era el 1, una vez con cada una. Sus ocho intentos están en `trazas/`. Tu caso reservado será otro, el 4: no lo mires todavía.

1. **Puntúa los ocho intentos.** Para cada uno, resultado, límites y escalar (sí o no), con el criterio de `bateria/casos/<caso>/exito.md` y la evidencia: el evento o la línea del informe que lo justifica.
2. **Cuenta.** Para cada caso y configuración, «k de n» en cada aspecto. Sin porcentajes.
3. **El intento afortunado.** ¿Qué intentos parecen buenos si solo miras el resultado? ¿Por qué no lo son?
4. **La regresión y la decisión.** ¿Qué ha pasado en el caso reservado? ¿Te quedarías con Y? ¿Qué harías antes de decidir y qué cambiarías en la línea?

### Parte 2 · Tu batería (con agente)

5. **Prepara.** Haz commit de la plantilla en `main` y crea la rama de la configuración A: `git branch config-A`. Ejecuta `opencode debug agents` y pega las reglas de `external_directory` del agente *build*. Lee `exito.md` de los casos 1, 2 y 3, pero **no mires el caso 4** hasta el requisito 8.
6. **Configuración A.** Un intento de cada uno de los casos 1, 2 y 3: `1-A-1`, `2-A-1` y `3-A-1`. Registra cada intento en el README.
7. **Configuración B.** Elige **un solo cambio** en el arnés (*harness*): una guía (una línea en `AGENTS.md` o en `tests/AGENTS.md`, por ejemplo) o un control (un permiso en `opencode.json`, por ejemplo). Elígelo para arreglar un fallo que hayas visto con A. Créalo en su rama:

   ```bash
   git switch -c config-B config-A
   # … el cambio …
   git commit -am "Configuración B: <qué cambia>"
   git switch main
   ```

   Pega `git diff config-A config-B` y explica qué fallo de A quieres arreglar. Después, un intento de cada uno de los casos 1, 2 y 3 con B.
8. **El caso reservado.** Ahora sí, lee `exito.md` del caso 4 y ejecuta `4-A-1` y `4-B-1`.
9. **Repite.** Elige el caso en el que A y B dieron resultados más distintos (o el reservado, si empeoró con B) y ejecútalo dos veces más con B. Su recuento es ya «k de 3».
10. **Conclusión.** Tabla de recuentos por caso y configuración, y una conclusión: ¿te quedas con B? ¿Ha empeorado algo? ¿Qué cambiarías para una configuración C? Apóyala en los recuentos, no en un intento suelto.
11. **Guarda la evidencia.** Haz commit en `main` de `sesiones/` y del README. Las ramas `config-*` e `intento/*` y las etiquetas `base/*` también son evidencia: súbelas.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `README.md` | Secciones «Proveedor y modelo», «Parte 1 · Los intentos preparados», «Recuentos de la parte 1», «El intento afortunado», «La regresión y la decisión», «Preparación», «Sesión con el agente», «La configuración B», «Recuentos», «Conclusión», «Decisiones» y «Commits» |
| `sesiones/` | `<intento>.md` (la sesión exportada) y `<intento>.txt` (el informe de `comprobar.sh`) de cada intento de la parte 2 |
| Ramas y etiquetas | `config-A`, `config-B`, una rama `intento/<intento>` y una etiqueta `base/<intento>` por intento |
| `bateria/`, `trazas/`, `opencode.json` | Sin cambios |

## Comprueba tu solución

- Los ocho intentos de la parte 1 tienen las tres puntuaciones, cada una con su evidencia, y ninguna nota global.
- Has encontrado dos intentos que solo parecen buenos por el resultado, y la regresión del caso reservado.
- La parte 2 tiene diez intentos registrados, cada uno con su sesión en `sesiones/` y su informe.
- Ningún intento tiene una respuesta tuya a una pregunta del agente.
- La configuración B cambia una sola cosa, y `git diff config-A config-B` lo demuestra.
- Las puntuaciones de escalar citan una frase de la sesión.
- Los recuentos se dan como «k de n» y la conclusión no generaliza a partir de un solo intento.
- El caso 4 se ejecutó al final, con A y con B.

## Al terminar

Sube `main` con `git push`, y las ramas y las etiquetas con `git push --all` y `git push --tags`. Cierra el Dev Container; el volumen `sdd-opencode` guarda tus credenciales para el siguiente ejercicio.
