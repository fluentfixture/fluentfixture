import { getNoopTransformer } from '../../../src/transformers/noop-transformer';
import { errorBoundary } from '../../../src/transformers/decorators/error-boundary';

describe('error-boundary', () => {

  describe('errorBoundary()', () => {

    it('should decorate given transformer and return without any change when there is no error', () => {
      const source = 'string';
      const transformer = getNoopTransformer();
      const decorated = errorBoundary(transformer);

      expect(decorated(source)).toBe(source);
    });

    it('should decorate given transformer and return undefined when there is an error', () => {
      const source = 'string';
      const transformer = () => { throw new Error('Error'); };
      const decorated = errorBoundary(transformer);

      expect(decorated(source)).toBeUndefined();
    });
  });
});
