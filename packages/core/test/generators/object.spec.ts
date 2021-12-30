import { obj } from '../../src/generators/generators';
import { ObjectStream } from '../../src/streams/stream-loader';
import { MockFactory } from '../mocks/mock-factory';
import { ObjectFactory } from '../../src/factories/object-factory';

describe('object', () => {

  describe('obj()', () => {

    it('should create an object stream with given model', () => {
      const model = {
        'key': new MockFactory('key')
      }
      const result = obj(model);
      const objectFactory = result.getFactory() as ObjectFactory<any>;

      expect(result).toBeInstanceOf(ObjectStream);
      expect(objectFactory).toBeInstanceOf(ObjectFactory);
      expect(objectFactory.getModel()).toBe(model);
    });
  });
});
