import { instance, mock, verify, when } from 'ts-mockito';
import { CompiledFormatter } from '../src/compiled-formatter';
import { Generator } from '../src/generators/generator';

describe('CompiledFormatter', () => {

  describe('.format()', () => {

    it('should format the given source object by using the given generators', () => {
      const mockGenerator1 = mock<Generator>();
      const mockGenerator2 = mock<Generator>();
      const source = { key: 'value' };
      const value1 = 'value-1';
      const value2 = 'value-2';

      when(mockGenerator1.process(source)).thenReturn(value1);
      when(mockGenerator2.process(source)).thenReturn(value2);

      const compiledFormatter = new CompiledFormatter([instance(mockGenerator1), instance(mockGenerator2)]);

      expect(compiledFormatter.format(source)).toBe(`${value1}${value2}`);
      verify(mockGenerator1.process(source)).once();
      verify(mockGenerator2.process(source)).once();
    });
  });
});
