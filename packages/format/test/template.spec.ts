import { instance, mock, verify, when } from 'ts-mockito';
import { Template } from '../src/template';
import { Pipe } from '../src/pipes/pipe';

describe('Template', () => {

  describe('.format()', () => {

    it('should format the given source object by using the given generators', () => {
      const mockPipe1 = mock<Pipe>();
      const mockPipe2 = mock<Pipe>();
      const source = { key: 'value' };
      const value1 = 'value-1';
      const value2 = 'value-2';

      when(mockPipe1.handle(source)).thenReturn(value1);
      when(mockPipe2.handle(source)).thenReturn(value2);

      const template = new Template([instance(mockPipe1), instance(mockPipe2)]);

      expect(template.format(source)).toBe(`${value1}${value2}`);
      verify(mockPipe1.handle(source)).once();
      verify(mockPipe2.handle(source)).once();
    });
  });
});
