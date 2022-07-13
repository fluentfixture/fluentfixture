import { Formatter } from '../src/formatter';
import { Pipes } from '../src/pipes/factory/pipes';

describe('Formatter', () => {

  describe('templates and fallbacks without any pipes', () => {

    const formatter = Formatter.empty();

    const source = {
      id: 123,
      isAdmin: true,
      detail: {
        name: 'John',
        surname: 'Doe',
      },
      types: ['user', 'elite'],
    };

    const cases = [
      ['User=(${detail.name} ${detail.surname})',
        'User=(John Doe)'],
      ['User=(${detail.first-name:Unknown} ${detail.last-name:Unknown})',
        'User=(Unknown Unknown)'],
      ['ID=${id:0}, TYPE=${types.0:user}, IS-ADMIN=${isAdmin:false}',
        'ID=123, TYPE=user, IS-ADMIN=true'],
      ['ID=${id:0}, TYPE=${types.3:unknown}, IS-ADMIN=${is-admin:false}',
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

  describe('templates and string pipes', () => {

    const formatter = Formatter.create(Pipes.withDefaults());

    const source = {
      detail: {
        name: 'john ',
        surname: ' doe',
      },
      type: 'elite user',
    };

    const cases = [
      ['User=(${detail.name|trim-end|pascal-case} ${detail.surname|trim-start|upper-case})',
        'User=(John DOE)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|lower-case})',
        'User=(John DOE) TYPE=(elite user)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|upper-case})',
        'User=(John DOE) TYPE=(ELITE USER)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|constant-case})',
        'User=(John DOE) TYPE=(ELITE_USER)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|dot-case})',
        'User=(John DOE) TYPE=(elite.user)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|header-case})',
        'User=(John DOE) TYPE=(Elite-User)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|param-case})',
        'User=(John DOE) TYPE=(elite-user)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|pascal-case})',
        'User=(John DOE) TYPE=(EliteUser)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|path-case})',
        'User=(John DOE) TYPE=(elite/user)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|snake-case})',
        'User=(John DOE) TYPE=(elite_user)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|capital-case})',
        'User=(John DOE) TYPE=(Elite User)'],
      ['User=(${detail.name|trim|pascal-case} ${detail.surname|trim|upper-case}) TYPE=(${type|camel-case})',
        'User=(John DOE) TYPE=(eliteUser)'],
    ];

    describe('.format()', () => {

      test.each(cases)('should format templates with string pipes correctly: %p', (template, result) => {
        expect(formatter.format(template, source)).toBe(result);
      });
    });

    describe('.compile()', () => {
      test.each(cases)('should compile templates with string pipes correctly: %p', (template, result) => {
        expect(formatter.compile(template).format(source)).toBe(result);
      });
    });
  });

  describe('templates and date pipes', () => {

    const formatter = Formatter.create(Pipes.withDefaults());

    const source = {
      detail: {
        name: 'john ',
        surname: ' doe',
        birthday: new Date(1_617_258_460_000) // GMT: Thursday, 1 April 2021 06:27:40
      },
    };

    const cases = [
      ['BIRTH_DATE=${detail.birthday|DD-MM-YY}', 'BIRTH_DATE=01-04-21'],
      ['BIRTH_DATE=${detail.birthday|DD-MM-YYYY}', 'BIRTH_DATE=01-04-2021'],
      ['BIRTH_DATE=${detail.birthday|MM-DD-YY}', 'BIRTH_DATE=04-01-21'],
      ['BIRTH_DATE=${detail.birthday|MM-DD-YYYY}', 'BIRTH_DATE=04-01-2021'],
      ['BIRTH_DATE=${detail.birthday|DD/MM/YY}', 'BIRTH_DATE=01/04/21'],
      ['BIRTH_DATE=${detail.birthday|DD/MM/YYYY}', 'BIRTH_DATE=01/04/2021'],
      ['BIRTH_DATE=${detail.birthday|MM/DD/YY}', 'BIRTH_DATE=04/01/21'],
      ['BIRTH_DATE=${detail.birthday|MM/DD/YYYY}', 'BIRTH_DATE=04/01/2021'],
    ];

    describe('.format()', () => {

      test.each(cases)('should format templates with date pipes correctly: %p', (template, result) => {
        expect(formatter.format(template, source)).toBe(result);
      });
    });

    describe('.compile()', () => {
      test.each(cases)('should compile templates with date pipes correctly: %p', (template, result) => {
        expect(formatter.compile(template).format(source)).toBe(result);
      });
    });
  });

  describe('templates and default pipes', () => {

    const formatter = Formatter.create(Pipes.withDefaults(), {
      serializers: {
        boolean: (val: boolean) => val ? 'TRUE' : 'FALSE',
        string: 'upper-case',
        date: 'DD-MM-YYYY',
        array: (val: Array<any>) => val.join(' and ')
      }
    });

    const source = {
      detail: {
        name: 'john doe',
        birthday: new Date(1_617_258_460_000) // GMT: Thursday, 1 April 2021 06:27:40
      },
      topics: ['productivity', 'programming'],
      isAdmin: false,
      isMember: true
    };

    const cases = [
      ['DETAIL=${detail.name} / ${detail.birthday}', 'DETAIL=JOHN DOE / 01-04-2021'],
      ['ADMIN=${isAdmin}', 'ADMIN=FALSE'],
      ['MEMBER=${isMember}', 'MEMBER=TRUE'],
      ['TOPICS=${topics}', 'TOPICS=productivity and programming'],
    ];

    describe('.format()', () => {

      test.each(cases)('should format templates with default pipes correctly: %p', (template, result) => {
        expect(formatter.format(template, source)).toBe(result);
      });
    });

    describe('.compile()', () => {
      test.each(cases)('should compile templates with default pipes correctly: %p', (template, result) => {
        expect(formatter.compile(template).format(source)).toBe(result);
      });
    });
  });
});
