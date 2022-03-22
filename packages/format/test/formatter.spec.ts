import { Formatter } from '../src/formatter';

describe('Formatter', () => {

  describe('only templates and fallbacks without any pipes', () => {

    const formatter = Formatter.empty();

    const source = {
      id: 123,
      isAdmin: true,
      detail: {
        name: 'John',
        surname: 'Doe',
      },
      types: ['user', 'elite']
    };

    const cases = [
      ['User=({detail.name} {detail.surname})',
        'User=(John Doe)'],
      ['User=({detail.first-name:Unknown} {detail.last-name:Unknown})',
        'User=(Unknown Unknown)'],
      ['ID={id:0}, TYPE={types.0:user}, IS-ADMIN={isAdmin:false}',
        'ID=123, TYPE=user, IS-ADMIN=true'],
      ['ID={id:0}, TYPE={types.3:unknown}, IS-ADMIN={is-admin:false}',
        'ID=123, TYPE=unknown, IS-ADMIN=false'],
    ];

    describe('.format()', () => {

      test.each(cases)('should format templates correctly: %p', (template, result) => {
        expect(formatter.format(template, source)).toBe(result);
      });
    });

    describe('.compile()', () => {
      test.each(cases)('should compile templates correctly: %p', (template, result) => {
        expect(formatter.compile(template).format(source)).toBe(result);
      });
    });
  });
});
