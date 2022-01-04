import { createTransformerFactory } from '../../../src/transformers/factory/transformer-factory';
import { getNoopTransformer } from '../../../src/transformers/noop-transformer';

describe('transformer-factory', () => {

  const factory = createTransformerFactory();

  beforeAll(() => {
    factory.setTransformer('transformer-1', () => '');
  });

  describe('.getTransformer()', () => {

    it('should return transformer', () => {

      const transformer = factory.getTransformer('transformer-1');

      expect(transformer).toBeInstanceOf(Function);
    });

    it('should throw error when transformer not found', () => {

      const thrown = () => factory.getTransformer('invalid-transformer');

      expect(thrown).toThrowError('Cannot find transformer with name: invalid-transformer!');
    });
  });

  describe('.setTransformer()', () => {

    test.each([null, undefined, ''])('should throw error when name is invalid', (name) => {

      const thrown = () => factory.setTransformer(name, getNoopTransformer());

      expect(thrown).toThrowError(`Cannot register transformer with name: ${name}!`);
    });

    test.each([null, undefined])('should throw error when transformer is invalid', (transformer) => {

      const thrown = () => factory.setTransformer('transformer-2', transformer);

      expect(thrown).toThrowError('Transformer must be a function!');
    });

    it('should throw error when transformer is already registered', () => {
      const name = 'transformer-1';
      const thrown = () => factory.setTransformer(name, getNoopTransformer());

      expect(thrown).toThrowError(`Transformer with name: ${name} already registered!`);
    });

    it('should register given transformer with given name with error boundary', () => {
      const name = 'transformer-3';
      const transformer = getNoopTransformer();

      factory.setTransformer(name, transformer);

      const notThrown = () => factory.getTransformer(name);

      expect(notThrown()).not.toThrowError();
    });
  });
});
