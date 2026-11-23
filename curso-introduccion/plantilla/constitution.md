# Constitución del proyecto

Las reglas que **no se negocian** en este proyecto. Todos los agentes las leen en cada sesión. Cámbiala solo con una decisión tuya, y en un commit propio.

> **Rellena las secciones marcadas con «RELLENA».** Es lo único que tienes que adaptar a tu módulo.

## Tecnología (RELLENA)

- **Lenguaje y entorno:** <por ejemplo, el de tu módulo>.
- **Marco o librerías principales:** <o «ninguna»>.
- **Cómo se ejecutan los tests:** `<comando>`.
- **Dónde viven los tests:** `<carpeta>/` (los agentes de `.opencode/agents/` usan esta carpeta en sus permisos).
- **Cómo se guardan los datos:** <memoria, fichero o base de datos, según lo que vea tu módulo>.
- No se añaden dependencias sin acordarlo antes.

## Arquitectura

Tres capas. Cada una solo llama a la de abajo:

1. **Entrada:** recibe lo que pide quien usa el sistema (consola, API, formulario…), lo convierte a datos y devuelve la respuesta. **No contiene reglas de negocio.**
2. **Lógica:** aplica las reglas de la spec. No sabe nada de la entrada ni de cómo se guardan los datos.
3. **Almacenamiento:** guarda y devuelve los datos. No contiene reglas de negocio.

## Errores

- Un error de las reglas de negocio se devuelve con un **código estable** (`sala_ocupada`) y un **mensaje** para personas. Los tests comprueban el código.
- Los errores inesperados no muestran detalles internos a quien usa el sistema.

## Tiempo y datos externos

- La lógica **no lee la hora del sistema directamente**: la recibe o la pide a un componente que los tests puedan fijar. Sin esto, los tests dependen del día en que se ejecutan.

## Pruebas

- Los tests salen de la **spec**, no del código, y se escriben **antes** que el código.
- Cada criterio de aceptación y cada *edge case* tiene al menos un test.
- El nombre de cada test empieza por el identificador de la spec y la letra de la feature: `A-EC-08: rechaza una reserva que se solapa`.
- Los tests comprueban los **valores exactos** de la spec (códigos de error, mensajes, orden).
- Quien implementa no modifica los tests: si cree que uno está mal, para y lo explica.

## Seguridad

- No se escriben claves ni contraseñas en el código ni en el repositorio.
- Los datos que llegan de fuera se validan antes de usarlos.

## Notación de las specs

- Requisitos y *edge cases* en **EARS** (*El sistema deberá…*, *Cuando…*, *Si… entonces…*). Criterios de aceptación también en EARS: **Mientras** (situación), **cuando** (acción), el sistema **deberá** (resultado observable).
- Identificadores: `RF-nn`, `RNF-nn`, `AC-nn`, `EC-nn`; `D-nn` en el plan y `T-nn` en las tasks.

## Lista de comprobación de la revisión

- [ ] Los controladores o la entrada no contienen reglas de negocio.
- [ ] Cada RF, AC y EC de la spec tiene un test con su identificador.
- [ ] Los tests comprueban valores exactos, no solo que «no falla».
- [ ] No hay código ni dependencias que no pida la spec.
- [ ] Ningún test se ha modificado para que pase.
