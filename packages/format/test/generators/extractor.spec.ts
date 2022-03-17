import * as path from 'object-path';
import { spy, verify, when } from 'ts-mockito';
import { Extractor } from '../../src/generators/extractor';

describe('Extractor', () => {

  describe('.process()', () => {

    it('should extracts data from the given source with the given path by using object-path', () => {
      const value = 'value:';
      const source = { key: value };
      const expression = 'key';
      const generator = new Extractor(expression);
      const spyPath = spy(path);

      when(spyPath.get(source, expression)).thenReturn(value);

      const result = generator.process(source);

      expect(result).toBe(value);
      verify(spyPath.get(source, expression)).once();
    });
  });
});
