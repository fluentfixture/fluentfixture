import { PathFinder } from '../../src/path/path-finder';
import { NON_STRING_DATA_SET } from '../data/type-sets';

describe('PathFinder', () => {

  describe('.constructor()', () => {

    test.each(NON_STRING_DATA_SET)('should throw an error when path s not a string, %p', (path: string) => {

      const thrown = () => PathFinder.get({}, path);

      expect(thrown).toThrowError('Path must be a string!');
    });
  });

  describe('.get()', () => {

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
      status: null
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
        expect(PathFinder.get(source, path)).toStrictEqual(result);
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
        expect(PathFinder.get(source, path)).toStrictEqual(result);
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
        expect(PathFinder.get(invalidSource, path)).toStrictEqual(result);
      });
    });
  });
});
