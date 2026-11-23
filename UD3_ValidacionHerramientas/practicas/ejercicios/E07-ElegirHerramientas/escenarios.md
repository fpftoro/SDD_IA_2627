# Tres escenarios

## Escenario 1: la biblioteca del instituto

Un ciclo de grado superior va a desarrollar, como proyecto de curso, la
aplicación de préstamos de la biblioteca del centro. La aplicación
guarda el nombre, el curso y el historial de préstamos del alumnado, y
los datos de prueba son una copia anonimizada a medias de los reales.

- Equipo: 20 alumnos en grupos de 4, y dos profesores.
- El centro tiene un servidor con una tarjeta gráfica que puede ejecutar
  modelos abiertos de tamaño medio, y cuentas educativas de un proveedor
  de modelos cuyas condiciones no aclaran qué hace con el código.
- El departamento quiere que todo lo que se use sea de código abierto.
- Cada grupo usa el editor que quiere.
- Es la primera vez que trabajan con SDD.

## Escenario 2: la facturación de la pyme

Una pyme de cuatro personas mantiene una aplicación de facturación de
diez años, sin specs y con pocos tests. Casi todo el trabajo son cambios
pequeños sobre lo que ya existe: un campo nuevo en la factura, un
impuesto que cambia, un informe más.

- Tienen una cuenta de empresa con un proveedor de modelos y no les
  importa que el código salga a ese proveedor.
- Cada persona usa un editor distinto, y dos prefieren la terminal.
- Quieren empezar a usar agentes sin parar el trabajo diario.
- Han tenido varios errores por cambios que nadie documentó.

## Escenario 3: el banco

Un equipo de 30 personas de una entidad financiera empieza un producto
nuevo. La organización tiene un contrato con un gran proveedor de nube
que incluye su entorno de desarrollo con agente y sus modelos, y no
permite usar otros proveedores de modelos.

- Proyecto nuevo, con varias features en paralelo.
- Auditoría: cada cambio tiene que poder seguirse desde el requisito
  hasta el código.
- El equipo ya trabaja con integración continua y revisiones de código.
- Algunas personas no han usado nunca un agente.
