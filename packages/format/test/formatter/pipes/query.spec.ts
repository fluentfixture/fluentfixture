import { spy, verify, when } from 'ts-mockito';
import { Query } from '../../../src/formatter/pipes/query';
import { PathFinder } from '../../../src/formatter/path/path-finder';
import { PathDefinition } from '../../../src/formatter/syntax/types/path-definition';

describe('Query', () => {

  describe('.handle()', () => {

    it('should extracts data from the given source with the given path query', () => {
      const value = 'value';
      const source = { key: value };
      const path: PathDefinition = { type: 'PROPERTY', value: 'key', parameters: [] };
      const pipe = new Query(path);
      const spyPathFinder = spy(PathFinder);

      when(spyPathFinder.get(source, path)).thenReturn(value);

      const result = pipe.handle(source);

      expect(result).toBe(value);
      verify(spyPathFinder.get(source, path)).once();
    });
  });
});
