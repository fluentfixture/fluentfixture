import { MockFactory } from '../mocks/mock-factory';
import { ValueStream } from '../../src/streams/value-stream';
import { Optional } from '../../src/core/selectors/optional';
import { Nullable } from '../../src/core/selectors/nullable';
import { FactoryDecorator } from '../../src/core/decorators/factory-decorator';
import { Exporter } from '../../src/core/exporters/exporter';
import { Iterator } from '../../src/core/collectios/iterator';
import { ArrayStream } from '../../src/streams/array-stream';
import { DEFAULT_ARRAY_SIZE, DEFAULT_PERCENTAGE } from '../../src/constants/limits';

describe('ValueStream', () => {

  describe('.optional()', () => {

    it('should create a stream with optional decorator that wraps itself', () => {
      const percentage = 0.2;
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.optional(percentage);

      expect(result).toBeInstanceOf(ValueStream);

      const optional = result.getFactory() as Optional;
      expect(optional).toBeInstanceOf(Optional);
      expect(optional.getFactory1()).toBe(stream);
      expect(optional.getPercentage()).toBe(percentage);
    });

    it('should use default percentage when percentage is not provided', () => {
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.optional();

      expect(result).toBeInstanceOf(ValueStream);

      const optional = result.getFactory() as Optional;
      expect(optional).toBeInstanceOf(Optional);
      expect(optional.getFactory1()).toBe(stream);
      expect(optional.getPercentage()).toBe(DEFAULT_PERCENTAGE);
    });
  });

  describe('.nullable()', () => {

    it('should create a stream with nullable decorator that wraps itself', () => {
      const percentage = 0.2;
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.nullable(percentage);

      expect(result).toBeInstanceOf(ValueStream);

      const nullable = result.getFactory() as Nullable;
      expect(nullable).toBeInstanceOf(Nullable);
      expect(nullable.getFactory1()).toBe(stream);
      expect(nullable.getPercentage()).toBe(percentage);
    });

    it('should use default percentage when percentage is not provided', () => {
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.nullable();

      expect(result).toBeInstanceOf(ValueStream);

      const nullable = result.getFactory() as Nullable;
      expect(nullable).toBeInstanceOf(Nullable);
      expect(nullable.getFactory1()).toBe(stream);
      expect(nullable.getPercentage()).toBe(DEFAULT_PERCENTAGE);
    });
  });

  describe('.convert()', () => {

    it('should create a stream with function decorator that wraps itself', () => {
      const fn = () => true;
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.convert(fn);

      expect(result).toBeInstanceOf(ValueStream);

      const factoryDecorator = result.getFactory() as FactoryDecorator;
      expect(factoryDecorator).toBeInstanceOf(FactoryDecorator);
      expect(factoryDecorator.getFactory()).toBe(stream);
      expect(factoryDecorator.getDecorator()).toBe(fn);
    });
  });

  describe('.dump()', () => {

    it('should create a stream with exporter decorator that wraps itself', () => {
      const fn = () => true;
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.dump(fn);

      expect(result).toBeInstanceOf(ValueStream);

      const exporter = result.getFactory() as Exporter;
      expect(exporter).toBeInstanceOf(Exporter);
      expect(exporter.getFactory()).toBe(stream);
      expect(exporter.getConsumer()).toBe(fn);
    });
  });

  describe('.array()', () => {

    it('should create an array stream that wraps itself', () => {
      const count = 5;
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.array(count);

      expect(result).toBeInstanceOf(ArrayStream);

      const iterator = result.getFactory() as Iterator;
      expect(iterator).toBeInstanceOf(Iterator);
      expect(iterator.getFactory()).toBe(stream);
      expect(iterator.getCount()).toBe(count);
    });

    it('should use default count when count is not provided', () => {
      const factory = new MockFactory({});
      const stream = ValueStream.from(factory);

      const result = stream.array();

      expect(result).toBeInstanceOf(ArrayStream);

      const iterator = result.getFactory() as Iterator;
      expect(iterator).toBeInstanceOf(Iterator);
      expect(iterator.getFactory()).toBe(stream);
      expect(iterator.getCount()).toBe(DEFAULT_ARRAY_SIZE);
    });
  });
});
