import * as path from 'object-path';
import { spy, verify, when } from 'ts-mockito';
import { Query } from '../../src/pipes/query';

describe('Query', () => {

  describe('.handle()', () => {

    it('should extracts data from the given source with the given path query', () => {
      const value = 'value';
      const source = { key: value };
      const query = 'key';
      const pipe = new Query(query);
      const spyPath = spy(path);

      when(spyPath.get(source, query, undefined)).thenReturn(value);

      const result = pipe.handle(source);

      expect(result).toBe(value);
      verify(spyPath.get(source, query, undefined)).once();
    });
  });
});
