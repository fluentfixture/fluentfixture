import { NON_FACTORY_LIKE_DATA_SET, NON_FUNCTION_DATA_SET } from '../../data/type-sets';
import { FactoryDecorator } from '../../../src/core/decorators/factory-decorator';
import { MockFactory } from '../../mocks/mock-factory';
import { instance, mock, spy, verify, when } from 'ts-mockito';
import { AbstractFactory } from '../../../src/core/abstract-factory';
import { Exporter } from '../../../src/core/exporters/exporter';

describe('Exporter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new Exporter(factory, () => true);

        expect(thrown).toThrow('Parameter must be a factory-like.');
      });
    });

    describe('parameter assertions (consumer)', () => {

      test.each(NON_FUNCTION_DATA_SET)('should throw an error when consumer is not a function, given: %s', (consumer: any) => {

        const thrown = () => new FactoryDecorator(new MockFactory({}), consumer);

        expect(thrown).toThrow('Parameter must be a function.');
      });
    });
  });

  describe('.single()', () => {

    it('should call given consumer with result of the given factory', () => {
      const mockFactory = mock(AbstractFactory);
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
