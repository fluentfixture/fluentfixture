import { MockFactory } from '../mocks/mock-factory';
import { ObjectStream } from '../../src/streams/object-stream';
import { PropertyDecorator } from '../../src/core/decorators/property-decorator';

describe('ObjectStream', () => {

  describe('.with()', () => {

    it('should create a stream with property decorator that wraps itself', () => {
      const property = 'id';
      const factory = new MockFactory(1);
      const stream = new ObjectStream(new MockFactory({ key: 'value' }));

      const result = stream.with(property, factory);

      expect(result).toBeInstanceOf(ObjectStream);

      const propertyDecorator = result.getFactory() as PropertyDecorator<'id', { key: string }, number>;
      expect(propertyDecorator).toBeInstanceOf(PropertyDecorator);
      expect(propertyDecorator.getSource()).toBe(stream);
      expect(propertyDecorator.getFactory()).toBe(factory);
      expect(propertyDecorator.getProperty()).toBe(property);
    });
  });
});
