import { NumberStream } from '../../src/streams/stream-loader';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { assertAndGetDecoratedNumberOperator } from '../assertions/number-stream';

describe('NumberStream', () => {

  describe('.mode()', () => {

    it('should create a stream with function decorator (mode) that wraps itself', () => {
      const num = 10;
      const value = 3;
      const stream = new NumberStream(new ValueAdapter(num));

      const operator = assertAndGetDecoratedNumberOperator(stream, stream.mode(value));

      expect(operator(num)).toBe(1);
    });
  });

  describe('.add()', () => {

    it('should create a stream with function decorator (add) that wraps itself', () => {
      const num = 10;
      const value = 3;
      const stream = new NumberStream(new ValueAdapter(num));

      const operator = assertAndGetDecoratedNumberOperator(stream, stream.add(value));

      expect(operator(num)).toBe(13);
    });
  });

  describe('.multiply()', () => {

    it('should create a stream with function decorator (multiply) that wraps itself', () => {
      const num = 10;
      const value = 3;
      const stream = new NumberStream(new ValueAdapter(num));

      const operator = assertAndGetDecoratedNumberOperator(stream, stream.multiply(value));

      expect(operator(num)).toBe(30);
    });
  });

  describe('.subtract()', () => {

    it('should create a stream with function decorator (subtract) that wraps itself', () => {
      const num = 10;
      const value = 3;
      const stream = new NumberStream(new ValueAdapter(num));

      const operator = assertAndGetDecoratedNumberOperator(stream, stream.subtract(value));

      expect(operator(num)).toBe(7);
    });
  });

  describe('.divide()', () => {

    it('should create a stream with function decorator (divide) that wraps itself', () => {
      const num = 10;
      const value = 2;
      const stream = new NumberStream(new ValueAdapter(num));

      const operator = assertAndGetDecoratedNumberOperator(stream, stream.divide(value));

      expect(operator(num)).toBe(5);
    });
  });
});

