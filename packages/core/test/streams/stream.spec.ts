import { instance, mock, verify, when } from 'ts-mockito';
import { NON_FACTORY_LIKE_DATA_SET } from '../data/type-sets';
import { Factory } from '../../src/factories/factory';
import { MockFactory } from '../mocks/mock-factory';
import { Optional } from '../../src/factories/selectors/optional';
import { DEFAULT_ARRAY_SIZE, DEFAULT_PERCENTAGE } from '../../src/constants/limits';
import { Nullable } from '../../src/factories/selectors/nullable';
import { Functional } from '../../src/factories/decorators/functional';
import { Exporter } from '../../src/factories/decorators/exporter';
import { Stream, ArrayStream, StringStream } from '../../src/streams/stream-loader';
import { Iterator } from '../../src/factories/decorators/iterator';
import { Formatter } from '../../src/factories/decorators/formatter';
import { Memo } from '../../src/factories/decorators/memo';

describe('Stream', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (factory)', () => {

      test.each(NON_FACTORY_LIKE_DATA_SET)('should throw an error when factory is not a factory-like, given: %s', (factory: any) => {

        const thrown = () => new Stream(factory);

        expect(thrown).toThrow('[Stream.constructor(factory)].[factory]: Parameter must be a factory-like!');
      });
    });
  });

  describe('.optional()', () => {

    it('should create a stream with optional converter that wraps itself', () => {
      const percentage = 0.2;
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.optional(percentage);

      expect(result).toBeInstanceOf(Stream);

      const optional = result.getFactory() as Optional;
      expect(optional).toBeInstanceOf(Optional);
      expect(optional.getFactory1()).toBe(stream);
      expect(optional.getPercentage()).toBe(percentage);
    });

    it('should use default percentage when percentage is not provided', () => {
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.optional();

      expect(result).toBeInstanceOf(Stream);

      const optional = result.getFactory() as Optional;
      expect(optional).toBeInstanceOf(Optional);
      expect(optional.getFactory1()).toBe(stream);
      expect(optional.getPercentage()).toBe(DEFAULT_PERCENTAGE);
    });
  });

  describe('.nullable()', () => {

    it('should create a stream with nullable converter that wraps itself', () => {
      const percentage = 0.2;
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.nullable(percentage);

      expect(result).toBeInstanceOf(Stream);

      const nullable = result.getFactory() as Nullable;
      expect(nullable).toBeInstanceOf(Nullable);
      expect(nullable.getFactory1()).toBe(stream);
      expect(nullable.getPercentage()).toBe(percentage);
    });

    it('should use default percentage when percentage is not provided', () => {
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.nullable();

      expect(result).toBeInstanceOf(Stream);

      const nullable = result.getFactory() as Nullable;
      expect(nullable).toBeInstanceOf(Nullable);
      expect(nullable.getFactory1()).toBe(stream);
      expect(nullable.getPercentage()).toBe(DEFAULT_PERCENTAGE);
    });
  });

  describe('.convert()', () => {

    it('should create a stream with functional converter that wraps itself', () => {
      const fn = () => true;
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.convert(fn);

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);
      expect(functional.getFunction()).toBe(fn);
    });
  });

  describe('.apply()', () => {

    it('should create a stream with functional converter that wraps itself', () => {
      const fn = () => 2;
      const factory = new MockFactory(1);
      const stream = Stream.from(factory);

      const result = stream.apply(fn);

      expect(result).toBeInstanceOf(Stream);

      const functional = result.getFactory() as Functional;
      expect(functional).toBeInstanceOf(Functional);
      expect(functional.getFactory()).toBe(stream);
      expect(functional.getFunction()).toBe(fn);
    });
  });

  describe('.dump()', () => {

    it('should create a stream with exporter converter that wraps itself', () => {
      const fn = () => true;
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.dump(fn);

      expect(result).toBeInstanceOf(Stream);

      const exporter = result.getFactory() as Exporter;
      expect(exporter).toBeInstanceOf(Exporter);
      expect(exporter.getFactory()).toBe(stream);
      expect(exporter.getFunction()).toBe(fn);
    });
  });

  describe('.memo()', () => {

    it('should create a stream with memo converter that wraps itself', () => {
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.memo();

      expect(result).toBeInstanceOf(Stream);

      const memo = result.getFactory() as Memo;
      expect(memo).toBeInstanceOf(Memo);
      expect(memo.getFactory()).toBe(stream);
    });
  });

  describe('.format()', () => {

    it('should create a string stream with formatter converter that wraps itself', () => {
      const template = '{}';
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.format(template);

      expect(result).toBeInstanceOf(StringStream);

      const formatter = result.getFactory() as Formatter;
      expect(formatter).toBeInstanceOf(Formatter);
      expect(formatter.getFactory()).toBe(stream);
      expect(formatter.getTemplate()).toBe(template);
    });
  });

  describe('.array()', () => {

    it('should create an array stream that wraps itself', () => {
      const count = 5;
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.array(count);

      expect(result).toBeInstanceOf(ArrayStream);

      const iterator = result.getFactory() as Iterator;
      expect(iterator).toBeInstanceOf(Iterator);
      expect(iterator.getFactory()).toBe(stream);
      expect(iterator.getCount()).toBe(count);
    });

    it('should use default count when count is not provided', () => {
      const factory = new MockFactory({});
      const stream = Stream.from(factory);

      const result = stream.array();

      expect(result).toBeInstanceOf(ArrayStream);

      const iterator = result.getFactory() as Iterator;
      expect(iterator).toBeInstanceOf(Iterator);
      expect(iterator.getFactory()).toBe(stream);
      expect(iterator.getCount()).toBe(DEFAULT_ARRAY_SIZE);
    });
  });

  describe('.single()', () => {

    it('should create a value by using given factory', () => {
      const mockFactory = mock(Factory);
      const out = 1;
      const factory = new Stream(instance(mockFactory));

      when(mockFactory.single()).thenReturn(out);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.single()).once();
    });
  });
});
