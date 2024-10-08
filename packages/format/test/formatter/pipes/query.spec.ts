import { Query } from '../../../src/formatter/pipes/query';

describe('Query', () => {

  describe('.handle()', () => {

    describe('should extract properties', () => {

      const source = {
        id: 1,
        user: {
          name: 'John',
          surname: 'Doe',
          email: 'doe@example.com',
        },
        topics: ['productivity', 'programming'],
        articles: [{
          id: 3,
          title: 'Introduction to Programming',
          comments: ['Great!'],
          publishDate: new Date(),
        }],
        status: null,
      };

      describe('simple properties', () => {

        const cases = [
          ['id', 1],
          ['user.name', 'John'],
          ['topics', ['productivity', 'programming']],
          ['topics.1', 'programming'],
          ['topics.1.3', 'g'],
          ['articles.0.comments.0', 'Great!'],
        ];
        test.each(cases)('should get sub-objects with the given paths: %p', (path: string, result: any) => {
          const pipe = new Query({ type: 'PROPERTY', value: path, parameters: [] });
          expect(pipe.handle(source)).toStrictEqual(result);
        });
      });

      describe('undefined and null values', () => {

        const cases = [
          ['user-id', undefined],
          ['user.name.12', undefined],
          ['topics.featured-topic', undefined],
          ['status', null],
          ['status.id', undefined],
        ];
        test.each(cases)('should handle null and undefined paths: %p', (path: string, result: any) => {
          const pipe = new Query({ type: 'PROPERTY', value: path, parameters: [] });
          expect(pipe.handle(source)).toStrictEqual(result);
        });
      });

      describe('invalid source objects', () => {

        const cases = [
          [null, 'id', undefined],
          [12, 'id', undefined],
          [new Date(), 'id', undefined],
          [undefined, 'id', undefined],
          [true, 'id', undefined],
          [Symbol.for('id'), 'id', undefined],
          [/[a-z]/g, 'id', undefined],
        ];
        test.each(cases)('should handle the different source types: %p', (invalidSource: any, path: string, result: any) => {
          const pipe = new Query({ type: 'PROPERTY', value: path, parameters: [] });
          expect(pipe.handle(invalidSource)).toStrictEqual(result);
        });
      });
    });

    describe('should extract and invoke functions', () => {

      const summary = jest.fn();

      beforeEach(() => {
        summary.mockReturnValue('SUMMARY');
      });

      afterEach(() => {
        summary.mockReset();
      });

      const source = {
        name: 'Jon',
        surname: 'Doe',
        balance: {
          amount: 12,
          currency: 'EUR',
          summary: summary
        }
      };

      it('should execute the function by using the given parameters', () => {
        const path = 'balance.summary';
        const parameters = [true, 12];
        const pipe = new Query({ type: 'FUNCTION', value: path, parameters});

        expect(pipe.handle(source)).toStrictEqual('SUMMARY');
        expect(summary).toBeCalledWith(...parameters);
      });

      describe('should return undefined when target property cannot be found or not a function', () => {

        const cases = [
          ['user-id'],
          ['user.name.12'],
          ['topics.featured-topic'],
          ['status'],
          ['status.id'],
          ['name'],
          ['surname'],
          ['balance'],
          ['balance.amount'],
        ];
        test.each(cases)('should handle null and undefined paths: %p', (path: string) => {
          const parameters = [true, 12];
          const pipe = new Query({ type: 'FUNCTION', value: path, parameters});

          expect(pipe.handle(source)).toBeUndefined()
          expect(summary).not.toBeCalled();
        });
      });
    });
  });
});
