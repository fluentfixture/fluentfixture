import { Engine } from '../../src/syntax/engine';

describe('Engine', () => {

  const engine = Engine.instance();

  describe('.parse()', () => {

    const validCases = [
      ['', { pipes: [] }],
      ['  ', { pipes: [] }],
      ['path', { path: 'path', pipes: [] }],
      ['user.detail.balances.0.currency', {
        path: 'user.detail.balances.0.currency',
        pipes: [],
      }],
      ['user.name:padStart(4)', {
        path: 'user.name',
        pipes: [{ name: 'padStart', parameters: [4] }],
      }],
      ['user.name:pad("s")|f([])', {
        path: 'user.name',
        pipes: [{ name: 'pad', parameters: ['s'] }, { name: 'f', parameters: [[]] }],
      }],
      [':format("yyyy-MM-dd HH:mm:ss", {"id": 1})', {
        pipes: [{ name: 'format', parameters: ['yyyy-MM-dd HH:mm:ss', { id: 1 }] }],
      }],
    ];
    test.each(validCases)('that parse expression successfully: %p', (input: string, output: any) => {
      const result = engine.parse(input);

      expect(result).toStrictEqual(output);
    });

    const invalidCases = [
      'balance.',             // invalid path
      'balance..amount',      // invalid path
      'format()',             // missing colon
      ':format(yyyy)',        // invalid parameter
      'format("yyyy"',        // missing parenthesis
      'path:format("yyyy")|', // invalid pipes
    ];
    test.each(invalidCases)('that returns error when input is invalid: %p', (input: string) => {
      const thrown = () => engine.parse(input);

      expect(thrown).toThrowError();
    });
  });
});
