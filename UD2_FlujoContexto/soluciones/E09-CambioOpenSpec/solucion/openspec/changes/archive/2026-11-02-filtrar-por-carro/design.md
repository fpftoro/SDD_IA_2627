## Context

El servicio de portátiles ya filtra por estado y ordena por código
(feature A, decisiones D-01 y D-03 de su plan). El controlador pasa al
servicio el parámetro estado.

## Goals / Non-Goals

**Goals:** filtrar por carro en el mismo sitio que por estado, con la
misma forma de validar.

**Non-Goals:** filtrar por varios carros a la vez u ordenar de otra forma.

## Decisions

- **El filtro va en el servicio**, junto al de estado: listarPortatiles
  recibe también el carro. Alternativa descartada: filtrar en el
  controlador, que pondría lógica de negocio en la capa HTTP.
- **Los carros válidos son una constante** con A, B y C, como en la
  feature B. Alternativa descartada: deducirlos de los portátiles
  guardados, porque el carro C no tiene ninguno y la spec lo da por
  válido.
- **El estado se valida antes que el carro**, como pide la spec.

## Risks / Trade-offs

- [La lista de carros está repetida en dos servicios] → Si cambia, se
  cambia en los dos; si aparece un tercer uso, se lleva a un módulo
  común.
