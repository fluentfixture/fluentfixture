import { MockFactory } from '../mocks/mock-factory';
import { NumberStream } from '../../src/streams/number-stream';
import { assertNumberSteamWithOperator } from '../assertions/number-stream-assertions';

describe('NumberStream', () => {
  const value = 10;
  const operand = 2;
  const stream = new NumberStream(new MockFactory(value));

  describe('.mode()', () => {

    it('should create a stream with function decorator (mode) that wraps itself', () => {
      assertNumberSteamWithOperator(stream, stream.mode(operand), value, 0);
    });
  });

  describe('.add()', () => {

    it('should create a stream with function decorator (add) that wraps itself', () => {
      assertNumberSteamWithOperator(stream, stream.add(operand), value, 12);
    });
  });

  describe('.multiply()', () => {

    it('should create a stream with function decorator (multiply) that wraps itself', () => {
      assertNumberSteamWithOperator(stream, stream.multiply(operand), value, 20);
    });
  });

  describe('.subtract()', () => {

    it('should create a stream with function decorator (subtract) that wraps itself', () => {
      assertNumberSteamWithOperator(stream, stream.subtract(operand), value, 8);
    });
  });

  describe('.divide()', () => {

    it('should create a stream with function decorator (divide) that wraps itself', () => {
      assertNumberSteamWithOperator(stream, stream.divide(operand), value, 5);
    });
  });
});
