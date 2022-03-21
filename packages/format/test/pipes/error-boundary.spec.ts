import { instance, mock, verify, when } from 'ts-mockito';
import { Pipe } from '../../src/pipes/pipe';
import { ErrorBoundary } from '../../src/pipes/error-boundary';

describe('ErrorBoundary', () => {

  describe('.handle()', () => {

    it('should return the result of the decorated pipe when no error occurred', () => {
      const input = 'input';
      const output = 'output';
      const mockPipe = mock<Pipe>();

      when(mockPipe.handle(input)).thenReturn(output);

      const pipe = new ErrorBoundary(instance(mockPipe));

      expect(pipe.handle(input)).toBe(output);
      verify(mockPipe.handle(input)).once();
    });

    it('should return undefined when the decorated pipe throws an error', () => {
      const input = 'input';
      const mockPipe = mock<Pipe>();

      when(mockPipe.handle(input)).thenThrow(new Error('error'));

      const pipe = new ErrorBoundary(instance(mockPipe));

      expect(pipe.handle(input)).toBeUndefined();
      verify(mockPipe.handle(input)).once();
    });
  });
});
