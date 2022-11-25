import { spy, verify, when } from 'ts-mockito';
import { Query } from '../../../src/formatter/pipes/query';
import { PathFinder } from '../../../src/formatter/path/path-finder';

describe('Query', () => {

  describe('.handle()', () => {

    it('should extracts data from the given source with the given path query', () => {
      const value = 'value';
      const source = { key: value };
      const query = 'key';
      const pipe = new Query(query);
      const spyPathFinder = spy(PathFinder);

      when(spyPathFinder.get(source, query)).thenReturn(value);

      const result = pipe.handle(source);

      expect(result).toBe(value);
      verify(spyPathFinder.get(source, query)).once();
    });
  });
});
