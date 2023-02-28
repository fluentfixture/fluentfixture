import { PathFinder } from '../../../src/formatter/path/path-finder';
import { NON_STRING_DATA_SET } from '../data/type-sets';
import { PathDefinition } from '../../../src/formatter/syntax/types/path-definition';

describe('PathFinder', () => {

  describe('.get()', () => {

    test.each([null as any, undefined])('should throw an error when path null or undefined, %p', (path: PathDefinition) => {

      const thrown = () => PathFinder.get({}, path);

      expect(thrown).toThrowError('Path must not be null or undefined!');
    });

    test.each(NON_STRING_DATA_SET)('should throw an error when path is not a non-null string, %p', (path: string) => {

      const thrown = () => PathFinder.get({}, {
        type: 'PROPERTY',
        value: path,
        parameters: [],
      });

      expect(thrown).toThrowError('Path must be a non-empty string!');
    });

    describe('property paths', () => {

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

      describe('simple paths', () => {

        const cases = [
          ['id', 1],
          ['user.name', 'John'],
          ['topics', ['productivity', 'programming']],
          ['topics.1', 'programming'],
          ['topics.1.3', 'g'],
          ['articles.0.comments.0', 'Great!'],
        ];
        test.each(cases)('should get sub-objects with the given paths, %p', (path: string, result: any) => {
          expect(PathFinder.get(source, { type: 'PROPERTY', value: path, parameters: [] })).toStrictEqual(result);
        });
      });

      describe('undefined and nulls', () => {

        const cases = [
          ['user-id', undefined],
          ['user.name.12', undefined],
          ['topics.featured-topic', undefined],
          ['status', null],
          ['status.id', undefined],
        ];
        test.each(cases)('should handle the null and undefined paths, %p', (path: string, result: any) => {
          expect(PathFinder.get(source, { type: 'PROPERTY', value: path, parameters: [] })).toStrictEqual(result);
        });
      });

      describe('invalid source types', () => {

        const cases = [
          [null, 'id', undefined],
          [12, 'id', undefined],
          [new Date(), 'id', undefined],
          [undefined, 'id', undefined],
          [true, 'id', undefined],
          [Symbol.for('id'), 'id', undefined],
          [/[a-z]/g, 'id', undefined],
        ];
        test.each(cases)('should handle the different source types, %p', (invalidSource: any, path: string, result: any) => {
          expect(PathFinder.get(invalidSource, { type: 'PROPERTY', value: path, parameters: [] })).toStrictEqual(result);
        });
      });
    });

    describe('function paths', () => {

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

      it('should throw error when target property is not a function', () => {

        const path = 'balance.currency';

        const thrown = () => PathFinder.get(source, { type: 'FUNCTION', value: path, parameters: [] });

        expect(thrown).toThrowError('The property balance.currency is not a function!');
      });

      it('should execute the function by using the given parameters', () => {

        const path = 'balance.summary';
        const parameters = [true, 12];

        expect(PathFinder.get(source, { type: 'FUNCTION', value: path, parameters})).toStrictEqual('SUMMARY');

        expect(summary).toBeCalledWith(...parameters);
      });
    });
  });
});
