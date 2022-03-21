import { BooleanStream } from '../../src/streams/stream-loader';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { assertAndGetDecoratedBooleanOperator } from '../assertions/boolean-stream';

describe('BooleanStream', () => {

  describe('.not()', () => {

    it('should create a stream with function decorator (not) that wraps itself', () => {
      const bool = true;
      const stream = new BooleanStream(new ValueAdapter(bool));

      const operator = assertAndGetDecoratedBooleanOperator(stream, stream.not());

      expect(operator(bool)).toBe(false);
    });
  });
});

