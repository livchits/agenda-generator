import removePropertiesWithFalsyValues from './removePropertiesWithFalsyValues';

describe('removePropertiesWithFalsyValues', () => {
  test('return untouched object if all properties has truthy values', () => {
    const mockedObject = {
      dependencia: 'Desarrollo Territorial y Hábitat',
      '11:00':
        'El ministro Jorge Ferraresi responde consultas ante la Comisión de Vivienda de la Cámara de Diputados en el Congreso de la Nación.',
      '14:30': 'El ministro entrega lotes con servicios en Berazategui',
      '16:00': 'El ministro entrega viviendas en Avellaneda.',
      '18:00':
        'El ministro mantiene una videoconferencia junto a la secretaria general de la Federación de Sindicatos de Trabajadores Judiciales y diputada nacional, Vanesa Siley.',
    };

    const sanitizedObject = removePropertiesWithFalsyValues(mockedObject);
    expect(sanitizedObject).toEqual(mockedObject);
  });

  test('remove properties with falsy values', () => {
    const mockedObject = {
      dependencia: 'Desarrollo Territorial y Hábitat',
      '11:00': '',
      '14:30': 'El ministro entrega lotes con servicios en Berazategui',
      '16:00': null,
      '18:00':
        'El ministro mantiene una videoconferencia junto a la secretaria general de la Federación de Sindicatos de Trabajadores Judiciales y diputada nacional, Vanesa Siley.',
    };
    const truthyValues = Object.values(mockedObject).filter(Boolean);
    const sanitizedObject = removePropertiesWithFalsyValues(mockedObject);
    const sanitizedMockedObjectValues = Object.values(sanitizedObject);
    expect(sanitizedMockedObjectValues).toEqual(truthyValues);
  });

  test('return an empty object if an empty object is received', () => {
    const emptyObject = {};
    expect(removePropertiesWithFalsyValues(emptyObject)).toEqual(emptyObject);
  });
});
