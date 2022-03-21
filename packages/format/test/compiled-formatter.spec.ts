import { instance, mock, verify, when } from 'ts-mockito';
import { CompiledFormatter } from '../src/compiled-formatter';
import { Pipe } from '../src/pipes/pipe';

describe('CompiledFormatter', () => {

  describe('.format()', () => {

    it('should format the given source object by using the given generators', () => {
      const mockPipe1 = mock<Pipe>();
      const mockPipe2 = mock<Pipe>();
      const source = { key: 'value' };
      const value1 = 'value-1';
      const value2 = 'value-2';

      when(mockPipe1.handle(source)).thenReturn(value1);
      when(mockPipe2.handle(source)).thenReturn(value2);

      const compiledFormatter = new CompiledFormatter([instance(mockPipe1), instance(mockPipe2)]);

      expect(compiledFormatter.format(source)).toBe(`${value1}${value2}`);
      verify(mockPipe1.handle(source)).once();
      verify(mockPipe2.handle(source)).once();
    });
  });
});
