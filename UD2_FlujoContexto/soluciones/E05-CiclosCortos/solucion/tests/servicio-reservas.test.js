import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { repositorioReservas } from '../src/repositorios/repositorio-reservas.js';
import {
  crearReserva,
  listarReservasDelDia,
} from '../src/servicios/servicio-reservas.js';
import { reloj } from '../src/utilidades/reloj.js';

const ANA = { id: 'ana', papel: 'profesor' };
const LUIS = { id: 'luis', papel: 'profesor' };

beforeEach(() => {
  repositorioReservas.vaciar();
  vi.spyOn(reloj, 'hoy').mockReturnValue('2027-03-01');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('crearReserva', () => {
  test('RF-01, RF-02, RNF-03: guarda y devuelve la reserva con sus campos', () => {
    const reserva = crearReserva({ carro: 'A', dia: '2027-03-02', hora: 3 }, ANA);

    expect(reserva).toEqual({
      id: expect.any(String),
      carro: 'A',
      dia: '2027-03-02',
      hora: 3,
      profesor: 'ana',
    });
    expect(repositorioReservas.obtenerPorDia('2027-03-02')).toEqual([reserva]);
  });

  test('RF-04, AC-04: el mismo profesor puede reservar dos carros a la misma hora', () => {
    crearReserva({ carro: 'A', dia: '2027-03-02', hora: 3 }, ANA);

    expect(() =>
      crearReserva({ carro: 'B', dia: '2027-03-02', hora: 3 }, ANA),
    ).not.toThrow();
  });

  test.each([
    [{ dia: '2027-03-02', hora: 3 }],
    [{ carro: 'A', hora: 3 }],
    [{ carro: 'A', dia: '2027-03-02' }],
  ])('EC-02: rechaza %o, al que le falta un campo', (datos) => {
    expect(() => crearReserva(datos, ANA)).toThrow(
      'Los campos carro, dia y hora son obligatorios',
    );
  });

  test.each([
    [{ carro: 5, dia: '2027-03-02', hora: 3 }],
    [{ carro: 'A', dia: '2027-03-02', hora: 2.5 }],
    [{ carro: 'A', dia: '2027-03-02', hora: '3' }],
    [{ carro: 'A', dia: '02/03/2027', hora: 3 }],
  ])('EC-03: rechaza %o, con un formato incorrecto', (datos) => {
    expect(() => crearReserva(datos, ANA)).toThrow(
      'Los datos de la reserva no tienen el formato correcto',
    );
  });

  test('EC-04: rechaza un carro que no existe', () => {
    expect(() =>
      crearReserva({ carro: 'Z', dia: '2027-03-02', hora: 3 }, ANA),
    ).toThrow('El carro no existe');
  });

  test.each([0, 7])('EC-05: rechaza la hora %i', (hora) => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-02', hora }, ANA),
    ).toThrow('La hora debe ser un número del 1 al 6');
  });

  test.each([1, 6])('EC-05: acepta la hora %i', (hora) => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-02', hora }, ANA),
    ).not.toThrow();
  });

  test('EC-06: rechaza un día que no existe', () => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-02-30', hora: 3 }, ANA),
    ).toThrow('El día no es una fecha válida');
  });

  test('EC-07: rechaza el sábado', () => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-06', hora: 3 }, ANA),
    ).toThrow('Solo se puede reservar de lunes a viernes');
  });

  test('EC-08: rechaza un día que ya ha pasado', () => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-02-26', hora: 3 }, ANA),
    ).toThrow('No se puede reservar un día que ya ha pasado');
  });

  test('EC-08: acepta el día de hoy', () => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-01', hora: 3 }, ANA),
    ).not.toThrow();
  });

  test('EC-09: rechaza más de 14 días de antelación y acepta 14', () => {
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-16', hora: 3 }, ANA),
    ).toThrow('Solo se puede reservar con 14 días de antelación como máximo');
    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-15', hora: 3 }, ANA),
    ).not.toThrow();
  });

  test('EC-10: rechaza un carro ya reservado a esa hora', () => {
    crearReserva({ carro: 'A', dia: '2027-03-02', hora: 3 }, LUIS);

    expect(() =>
      crearReserva({ carro: 'A', dia: '2027-03-02', hora: 3 }, ANA),
    ).toThrow('El carro ya está reservado a esa hora');
  });

  test('EC-16: con varios errores, gana el primero de la lista', () => {
    expect(() =>
      crearReserva({ carro: 'Z', dia: '2027-03-02', hora: 9 }, ANA),
    ).toThrow('El carro no existe');
  });
});

describe('listarReservasDelDia', () => {
  test('RF-03, AC-05: devuelve las reservas del día y ninguna más', () => {
    const deAna = crearReserva({ carro: 'A', dia: '2027-03-02', hora: 3 }, ANA);
    const deLuis = crearReserva({ carro: 'B', dia: '2027-03-02', hora: 1 }, LUIS);
    crearReserva({ carro: 'A', dia: '2027-03-03', hora: 2 }, LUIS);

    const reservas = listarReservasDelDia('2027-03-02');

    expect(reservas).toHaveLength(2);
    expect(reservas).toContainEqual(deAna);
    expect(reservas).toContainEqual(deLuis);
  });

  test('RF-03: las ordena por hora y, a la misma hora, por carro', () => {
    crearReserva({ carro: 'B', dia: '2027-03-02', hora: 3 }, ANA);
    crearReserva({ carro: 'A', dia: '2027-03-02', hora: 3 }, LUIS);
    crearReserva({ carro: 'C', dia: '2027-03-02', hora: 1 }, LUIS);

    const reservas = listarReservasDelDia('2027-03-02');

    expect(reservas.map((reserva) => `${reserva.hora}${reserva.carro}`)).toEqual([
      '1C',
      '3A',
      '3B',
    ]);
  });

  test.each([undefined, '02/03/2027', ['2027-03-02', '2027-03-03']])(
    'EC-13: rechaza el día %o',
    (dia) => {
      expect(() => listarReservasDelDia(dia)).toThrow(
        'Indica el día con el formato AAAA-MM-DD',
      );
    },
  );
});
