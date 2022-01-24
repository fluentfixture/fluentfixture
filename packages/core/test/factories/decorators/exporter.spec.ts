import { instance, mock, spy, verify, when } from 'ts-mockito';
import { NON_FUNCTION_DATA_SET } from '../../data/type-sets';
import { MockFactory } from '../../mocks/mock-factory';
import { Factory } from '../../../src/factories/factory';
import { Exporter } from '../../../src/factories/decorators/exporter';

describe('Exporter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (fn)', () => {

      test.each(NON_FUNCTION_DATA_SET)('should throw an error when consumer is not a function, given: %s', (fn: any) => {

        const thrown = () => new Exporter(new MockFactory({}), fn);

        expect(thrown).toThrow('[Exporter.constructor(factory, fn)].[fn]: Parameter must be a function!');
      });
    });
  });

  describe('.single()', () => {

    it('should call given consumer with result of the given factory', () => {
      const mockFactory = mock(Factory);
      const consumer = { consume: (value: any) => console.log(value) };
      const spyConsumer = spy(consumer);
      const out = 2;
      const factory = new Exporter(instance(mockFactory), consumer.consume)

      when(mockFactory.single()).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.single()).once();
      verify(spyConsumer.consume(out)).once();
    });
  });
});
