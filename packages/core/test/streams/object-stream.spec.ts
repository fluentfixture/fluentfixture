import { MockFactory } from '../mocks/mock-factory';
import { ObjectStream } from '../../src/streams/stream-loader';
import { Property } from '../../src/factories/converters/property';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import { Lazy } from '../../src/factories/converters/lazy';

describe('ObjectStream', () => {

  describe('.dynamic()', () => {

    it('should create a stream with property decorator that wraps itself', () => {
      const propertyName = 'id';
      const factory = new MockFactory(1);
      const stream = new ObjectStream(new MockFactory({ key: 'value' }));

      const result = stream.dynamic(propertyName, factory);

      expect(result).toBeInstanceOf(ObjectStream);

      const property = result.getFactory() as Property<'id', { key: string }, number>;
      expect(property).toBeInstanceOf(Property);
      expect(property.getFactory()).toBe(stream);
      expect(property.getDecorator()).toBe(factory);
      expect(property.getProperty()).toBe(propertyName);
    });
  });

  describe('.static()', () => {

    it('should create a stream with property decorator with value adapter that wraps itself', () => {
      const propertyName = 'id';
      const value = 1;
      const stream = new ObjectStream(new MockFactory({ key: 'value' }));

      const result = stream.static(propertyName, value);

      expect(result).toBeInstanceOf(ObjectStream);

      const property = result.getFactory() as Property<'id', { key: string }, number>;
      const valueAdapter = property.getDecorator() as ValueAdapter;
      expect(property).toBeInstanceOf(Property);
      expect(property.getFactory()).toBe(stream);
      expect(property.getProperty()).toBe(propertyName);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBe(value);
    });
  });

  describe('.lazy()', () => {

    it('should create a stream with lazy property that wraps itself', () => {
      type MockModel = { key: string };
      const propertyName = 'id';
      const stream = new ObjectStream(new MockFactory<MockModel>({ key: 'value' }));
      const converter = (obj: MockModel) => obj.key.toUpperCase();

      const result = stream.lazy(propertyName, converter);

      expect(result).toBeInstanceOf(ObjectStream);

      const lazy = result.getFactory() as Lazy<'id', MockModel, string>;

      expect(lazy).toBeInstanceOf(Lazy);
      expect(lazy.getFactory()).toBe(stream);
      expect(lazy.getProperty()).toBe(propertyName);
      expect(lazy.getConverter()).toBe(converter);
    });
  });
});
