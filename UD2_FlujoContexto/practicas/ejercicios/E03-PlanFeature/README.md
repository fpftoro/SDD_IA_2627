# El plan de una feature

<!-- Completa cada sección. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución. -->

Plan: [`docs/specs/B-reservar-carro/plan.md`](./docs/specs/B-reservar-carro/plan.md)

## Sesión con el agente

<!-- Los prompts que usaste, qué produjo el agente y qué corregiste.
     Proveedor y modelo, en la primera línea. -->

Proveedor y modelo:

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | plan | Prompt de planificar (tema 2) | | |
| 2 | plan | | | |
| 3 | plan | Cobertura de la estrategia de pruebas | | |
| 4 | build | Guardar el plan | | |

Sesión exportada: [`sesiones/plan.md`](./sesiones/plan.md)

## Decisiones

<!-- Una fila por cada propuesta del agente que aceptaste, rechazaste o cambiaste.
     «Aceptada o rechazada»: aceptada, rechazada o aceptada con cambios. -->

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| | | |

## Huecos de la spec

<!-- Si el agente (o tú) encontró algo que la spec no decide y se nota desde fuera:
     qué era, qué decidiste y cómo quedó en la spec 1.1.
     Si no encontraste ninguno, explica qué marcas del agente descartaste y por qué. -->

## Lista de comprobación

<!-- Marca con [x] lo que cumple el plan aprobado (tema 2, apartado 2.5.1). -->

**Respeto a la constitución**

- [ ] La sección «Comprobación de la constitución» recorre todos sus principios.
- [ ] La arquitectura y la tecnología son las de la constitución.
- [ ] Los errores siguen el formato acordado.

**Cobertura de la spec**

- [ ] Cada requisito, criterio y *edge case* aparece en la estrategia de pruebas, con un tipo de prueba que lo ve.
- [ ] El plan no añade comportamiento que no esté en la spec.
- [ ] El plan no contradice nada de la spec (códigos, mensajes, límites).

**Decisiones**

- [ ] Cada decisión tiene motivo y alternativa descartada.
- [ ] Cada dependencia nueva está justificada y no la cubre algo que ya hay.
- [ ] No hay sobreingeniería: nada que la spec no necesite.

**Viabilidad**

- [ ] La secuencia respeta las dependencias entre ficheros.
- [ ] El plan no supone cosas falsas sobre el código existente.
- [ ] No hay código en el plan.

## Commits

<!-- Pega aquí la salida de: git log --oneline main..feature/B-reservar-carro -->

```text
```
