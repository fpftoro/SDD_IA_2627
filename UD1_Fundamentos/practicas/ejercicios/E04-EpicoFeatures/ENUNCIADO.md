# E04 · Del épico a las features

**Tipo:** autocorrección

Separa épicos, features, historias de usuario y tasks en una lista de ideas mezcladas, propón las features del préstamo de portátiles, ordénalas y escribe el índice de features del proyecto.

**Criterios:** OA1 d

## El caso

El equipo del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)) tiene un PRD en [`docs/prd.md`](./docs/prd.md) y una lista de ideas que salió de una reunión, en [`lista.md`](./lista.md). Antes de escribir ninguna spec, hay que decidir **qué features** tiene el proyecto y **en qué orden** se van a hacer. Esa decisión es tuya, no del agente (tema 4, apartado 4.5).

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md` y crea el índice en `docs/specs/README.md`.

## Requisitos

1. **Clasificación.** Clasifica cada idea L1–L16 de `lista.md` en la tabla «Clasificación» del README como **épico**, **feature**, **historia**, **task** o **requisito** (un requisito de una feature que se ha apuntado como si fuera otra cosa). Para las que no son una feature, di qué hacer con ellas:
   - un épico: **dividirlo** (en qué features);
   - una historia: a qué feature pertenece (irá en el **contexto** de su spec);
   - una task: a qué feature pertenece (irá en su **plan**);
   - un requisito: en la **spec** de qué feature va.
2. **Features.** En la tabla «Features» del README, propón las features del épico «Gestión del préstamo de portátiles del centro». Tienen que cubrir los casos de uso del PRD **excepto los que el PRD deja fuera de alcance**, y ninguna puede ser un épico, una task ni una feature técnica sin valor propio. Para cada una indica:
   - el prefijo de orden (`A`, `B`, `C`…) y el nombre,
   - el valor que aporta por sí misma,
   - de qué otras features depende (o «—»),
   - una historia de usuario con la forma *Como…, quiero…, para…*. Puedes aprovechar las de `lista.md`.
3. **Orden.** En la sección «Orden», justifica el orden de tus features con los tres criterios del tema 4: **dependencias**, **valor** y **riesgo**. Di al menos qué feature va primero y por qué, cuál adelantas por su riesgo y cuál dejas para el final.
4. **Índice.** Crea `docs/specs/README.md` con la tabla de features del proyecto, con el mismo formato que el ejemplo integrador del tema 4: columnas `#`, `Feature`, `Carpeta` y `Estado`. La carpeta de cada feature lleva su prefijo y su nombre en minúsculas con guiones (`B-reservar-carro/`), y todas están en `⏳ Pendiente`.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `lista.md` y `docs/prd.md` | Sin cambios |
| `docs/specs/README.md` | Índice con la tabla `# \| Feature \| Carpeta \| Estado`, una fila por feature |
| `README.md` | Secciones «Clasificación», «Features» y «Orden», con las tablas de la plantilla |
| Valores de la columna «Nivel» | `épico`, `feature`, `historia`, `task` o `requisito` |

## Comprueba tu solución

- Pasa cada idea por las preguntas de diagnóstico del tema 4 (apartado 4.4): ¿cabe su comportamiento en una spec de una o dos páginas?, ¿aporta valor por sí misma?, ¿tiene criterios de aceptación objetivos?, ¿podrías revisar el código que generará?
- Las ideas que hablan de tablas, botones, configuración o tests no son features, aunque lleven trabajo.
- Todo lo que clasificas como historia, task o requisito apunta a una feature de tu tabla «Features». Si apunta a una feature que no existe en tu tabla, te falta una feature o la has clasificado mal.
- Cada caso de uso del PRD tiene su feature, y ningún punto del «Fuera de alcance» del PRD tiene una.
- Si una feature depende de otra, va **después** en el orden. Revisa tus prefijos: ninguna feature depende de otra con una letra posterior.
- Las carpetas del índice siguen el formato `<prefijo>-<nombre-en-minusculas>/`, con el mismo prefijo que en tu tabla «Features».

## Al terminar

Haz un commit con tus respuestas y el índice. No hay contenedor que borrar.
