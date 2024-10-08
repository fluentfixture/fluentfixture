import { ErrorBoundary } from '../../../src/formatter/pipes/error-boundary';
import { Constant } from '../../../src/formatter/pipes/constant';
import { Functional } from '../../../src/formatter/pipes/functional';

describe('ErrorBoundary', () => {

  describe('.handle()', () => {

    it('should return the result of the decorated pipe when no error occurred', () => {
      const input = 'input';
      const output = 'output';
      const decoratedPipe = new Constant(output);

      const pipe = new ErrorBoundary(decoratedPipe);

      expect(pipe.handle(input)).toBe(output);
    });

    it('should return undefined when the decorated pipe throws an error', () => {
      const input = 'input';
      const thrown = () => { throw new Error('error'); };
      const decoratedPipe = new Functional({
        fn: thrown,
        parameters: [],
      });

      const pipe = new ErrorBoundary(decoratedPipe);

      expect(pipe.handle(input)).toBeUndefined();
    });
  });
});
