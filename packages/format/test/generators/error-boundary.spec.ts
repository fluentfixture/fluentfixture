import { instance, mock, verify, when } from 'ts-mockito';
import { Generator } from '../../src/generators/generator';
import { ErrorBoundary } from '../../src/generators/error-boundary';

describe('ErrorBoundary', () => {

  describe('.process()', () => {

    it('should return the returned value of the given generator when no error occurs', () => {
      const input = 'input';
      const output = 'output';
      const mockGenerator = mock<Generator>();

      when(mockGenerator.process(input)).thenReturn(output);

      const generator = new ErrorBoundary(instance(mockGenerator));

      expect(generator.process(input)).toBe(output);
      verify(mockGenerator.process(input)).once();
    });

    it('should return undefined when the given generator throw error', () => {
      const input = 'input';
      const mockGenerator = mock<Generator>();

      when(mockGenerator.process(input)).thenThrow(new Error('error'));

      const generator = new ErrorBoundary(instance(mockGenerator));

      expect(generator.process(input)).toBeUndefined();
      verify(mockGenerator.process(input)).once();
    });
  });
});
