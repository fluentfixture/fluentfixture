import { Formatter } from '../../src/formatter/formatter';
import { Pipes } from '../../src/formatter/pipes/pipes';

describe('Formatter (E2E)', () => {

  describe('simple templates', () => {

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
      ['ID=<${id}=${types.1}>',
        'ID=<123=elite>'],
      ['${detail.name}.${detail.surname}@example.com',
        'John.Doe@example.com'],
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

  describe('exceptional templates', () => {

    const formatter = Formatter.empty();

    const source = {
      x: 'x',
      y: 'y',
      z: 'z',
    };

    const cases = [
      ['', ''],
      ['a${x}${y}${z}b', 'axyzb'],
      ['a${x}.${y}.${z}b', 'ax.y.zb'],
      ['${x}.${y}.${z}', 'x.y.z'],
      [' ${x}.${y}.${z} ', ' x.y.z '],
      ['$${x}.${y}.${z}}', '$x.y.z}'],
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

  describe('simple templates with default pipes', () => {

    const formatter = Formatter.create(Pipes.withDefaults());

    const source = {
      id: 123,
      isAdmin: true,
      detail: {
        name: 'John',
        surname: 'Doe',
        nickname: 'john.doe'
      },
      types: ['user', 'elite'],
    };

    const cases = [
      ['User=(${detail.name:lowerCase()} ${detail.surname:upperCase()})',
        'User=(john DOE)'],
      ['ID=<${id}=${types.1:upperCase()}>',
        'ID=<123=ELITE>'],
      ['${detail.name:lowerCase()}.${detail.surname:lowerCase()}@example.com',
        'john.doe@example.com'],
      ['${detail.surname:upperCase()|padStart(7, "#")|padEnd(12, "#")}',
        '####DOE#####'],
      ['TYPES=${types:reverse()|join("-")|upperCase()}',
        'TYPES=ELITE-USER'],
      ['PARTS=${detail.nickname:split(".")|sort()|join("-")}',
        'PARTS=doe-john'],
      ['User=(${detail.name:lowerCase()} ${detail.surname:upperCase()}), Age=${detail.age:default("N/A")}',
        'User=(john DOE), Age=N/A'],
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

  describe('function invocation', () => {

    const formatter = Formatter.create(Pipes.withDefaults());

    const source = {
      detail: {
        name: 'John',
        surname: 'Doe',
        summary: () => 'John Doe',
        getMail: (domain: string) => `john.doe@${domain}`,
      },
      orders: {
        items: [1, 2, 3, 4],
        getPrice: (count) => count * 2
      }
    };

    const cases = [
      ['User=(${detail.summary():upperCase()})',
        'User=(JOHN DOE)'],
      ['PRICE=${orders.getPrice(100)}',
        'PRICE=200'],
      ['MAIL=${detail.getMail("example.com")}',
        'MAIL=john.doe@example.com'],
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

  describe('custom pipes', () => {

    const pipes = Pipes.withDefaults()
      .register('join', (arr: Array<any>, char: string) => arr.join(char))
      .register('reverse', (arr: Array<any>) => [...arr].reverse())
      .register('add', (num: number, addition: number) => num + addition);

    const formatter = Formatter.create(pipes);

    const source = {
      barcodes: ['aaa', 'bbb'],
      count: 12
    };

    const cases = [
      ['BARCODES = ${barcodes:reverse()|join("+")}',
        'BARCODES = bbb+aaa'],
      ['STOCK = ${count:add(10)}',
        'STOCK = 22']
    ];

    describe('.compile()', () => {
      test.each(cases)('should compile templates correctly: %p', (template, result) => {
        expect(formatter.compile(template).format(source)).toBe(result);
      });
    });

    describe('.format()', () => {
      test.each(cases)('should format templates correctly: %p', (template, result) => {
        expect(formatter.format(template, source)).toBe(result);
      });
    });
  });
});
