import { GeneratorFactory } from '../../../src/generators/factory/generator-factory';
import { MockGenerator } from '../../mocks/mock-generator';
import { NON_NON_BLANK_STRING_DATA_SET, NON_OBJECT_DATA_SET } from '../../data/type-sets';

describe('GeneratorFactory', () => {

  describe('.set()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new GeneratorFactory();

      const thrown = () => factory.set(name, new MockGenerator());

      expect(thrown).toThrowError('Generator name must be a non-blank string!');
    });

    test.each(NON_OBJECT_DATA_SET)('should throw error when generator is not an object', (generator: any) => {
      const factory = new GeneratorFactory();

      const thrown = () => factory.set('generator', generator);

      expect(thrown).toThrowError('Generator must be an object!');
    });

    it('should throw error when a generator already registered with the given name', () => {
      const factory = new GeneratorFactory();
      const name = 'generator';

      factory.set(name, new MockGenerator());

      const thrown = () => factory.set('generator', new MockGenerator());

      expect(thrown).toThrowError('Generator with name "generator" already registered!');
    });
  });

  describe('.get()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new GeneratorFactory();

      const thrown = () => factory.get(name);

      expect(thrown).toThrowError('Generator name must be a non-blank string!');
    });

    it('should throw error when a generator not found with the given name', () => {
      const factory = new GeneratorFactory();

      const thrown = () => factory.get('generator');

      expect(thrown).toThrowError('Generator with name "generator" could not be found!');
    });

    it('should return the generator with the given name', () => {
      const factory = new GeneratorFactory();
      const name = 'generator';
      const generator = new MockGenerator();

      factory.set(name, generator);

      const result = factory.get(name);

      expect(result).toBe(generator);
    });
  });
});
