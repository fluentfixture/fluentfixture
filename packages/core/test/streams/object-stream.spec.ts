import { MockFactory } from '../mocks/mock-factory';
import { ObjectStream } from '../../src/streams/object-stream';
import { Property } from '../../src/factories/converters/property';

describe('ObjectStream', () => {

  describe('.with()', () => {

    it('should create a stream with property decorator that wraps itself', () => {
      const propertyName = 'id';
      const factory = new MockFactory(1);
      const stream = new ObjectStream(new MockFactory({ key: 'value' }));

      const result = stream.with(propertyName, factory);

      expect(result).toBeInstanceOf(ObjectStream);

      const property = result.getFactory() as Property<'id', { key: string }, number>;
      expect(property).toBeInstanceOf(Property);
      expect(property.getFactory()).toBe(stream);
      expect(property.getDecorator()).toBe(factory);
      expect(property.getProperty()).toBe(propertyName);
    });
  });
});
