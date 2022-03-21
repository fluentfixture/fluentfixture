import { instance, mock, verify, when } from 'ts-mockito';
import { Pipe } from '../../src/pipes/pipe'
import { Flow } from '../../src/pipes/flow';

describe('Flow', () => {

  describe('.handle()', () => {

    it('should handle the input by using the given pipes', () => {
      const mockPipe1 = mock<Pipe>();
      const mockPipe2 = mock<Pipe>();
      const input = 'input';
      const output1 = 'output-1';
      const output2 = 'output-2';

      when(mockPipe1.handle(input)).thenReturn(output1);
      when(mockPipe2.handle(output1)).thenReturn(output2);

      const pipe = new Flow([instance(mockPipe1), instance(mockPipe2)]);

      expect(pipe.handle(input)).toBe(output2);
      verify(mockPipe1.handle(input)).once();
      verify(mockPipe2.handle(output1)).once();
    });
  });
});
