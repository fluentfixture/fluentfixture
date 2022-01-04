import { getNoopTransformer } from '../../../src/transformers/noop-transformer';
import { asString } from '../../../src/transformers/decorators/as-string';

describe('as-string', () => {

  describe('asString()', () => {

    it('should decorate given transformer and pass any string parameter', () => {
      const source = 'string';
      const transformer = getNoopTransformer();
      const decorated = asString(transformer);

      expect(decorated(source)).toBe(source);
    });

    it('should decorate given transformer and pass string result of given parameter', () => {
      const source = 1;
      const transformer = getNoopTransformer();
      const decorated = asString(transformer);

      expect(decorated(source)).toBe('1');
    });

    test.each([null, undefined])('should decorate given transformer and pass empty when parameter is %p', (source: any) => {
      const transformer = getNoopTransformer();
      const decorated = asString(transformer);

      expect(decorated(source)).toBe('');
    });
  });
});
