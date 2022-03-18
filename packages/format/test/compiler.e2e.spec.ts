import { compile } from '../src/compiler';

describe('compiler', () => {

  describe('compile()', () => {

    describe('simple types', () => {
      const template = 'My name is {name:no-name|trim|upper-case}. I am {age}.';
      const compiled = compile(template);

      const cases = [
        [{ name: 'name' }, 'My name is NAME. I am .'],
        [{ name: ' name ', age: 23 }, 'My name is NAME. I am 23.'],
        [{ age: 24 }, 'My name is NO-NAME. I am 24.'],
      ];

      test.each(cases)('should render template with given source, %p', (source: any, output: any) => {
        expect(compiled.format(source)).toBe(output);
      });
    });

    describe('nested types', () => {

      const source = {
        id: 1,
        price: {
          amount: 9.99,
          currency: 'USD',
        },
        categories: ['fashion', 'book'],
        updateDate: new Date(1_641_306_927_000),
      };

      const cases = [
        ['', ''],
        [null, ''],
        [undefined, ''],
        ['id={id}, currency={price.currency:EUR}, second-category={categories.1|upper-case}',
          'id=1, currency=USD, second-category=BOOK'],
        ['is-in-stock={isInStock:false}, amount={price.amount:0}, primary-category={categories.0|upper-case}',
          'is-in-stock=false, amount=9.99, primary-category=FASHION'],
        ['is-in-stock={isInStock:false}, amount={price.amount:0}, updated-at={updateDate|iso-date}',
          'is-in-stock=false, amount=9.99, updated-at=2022-01-04T14:35:27.000Z'],
      ];

      test.each(cases)('should render template with given source, %p', (template: string, output: string) => {
        expect(compile(template).format(source)).toBe(output);
      });
    });
  });
});
