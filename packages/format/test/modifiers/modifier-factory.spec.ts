import { createModifierFactory } from '../../src/modifiers/modifier-factory';
import { getNoopExpressionModifier } from '../../src/modifiers/noop-modifier';

describe('modifier-factory', () => {

  const factory = createModifierFactory();

  describe('.getModifier()', () => {

    it('should return modifier', () => {

      const modifier = factory.getModifier('lower-case');

      expect(modifier).toBeInstanceOf(Function);
    });

    it('should throw error when modifier not found', () => {

      const thrown = () => factory.getModifier('invalid-modifier');

      expect(thrown).toThrowError('Cannot find modifier with name: invalid-modifier!');
    });
  });

  describe('.setModifier()', () => {

    test.each([null, undefined, ''])('should throw error when name is invalid', (name) => {

      const thrown = () => factory.setModifier(name, getNoopExpressionModifier());

      expect(thrown).toThrowError(`Cannot register modifier with name: ${name}!`);
    });

    test.each([null, undefined])('should throw error when modifier is invalid', (modifier) => {

      const thrown = () => factory.setModifier('modifier', modifier);

      expect(thrown).toThrowError('Modifier must be a function!');
    });

    it('should throw error when modifier is already registered', () => {
      const name = 'lower-case';
      const thrown = () => factory.setModifier(name, getNoopExpressionModifier());

      expect(thrown).toThrowError(`Modifier with name: ${name} already registered!`);
    });

    it('should register given modifier with given name', () => {
      const name = 'modifier';
      const modifier = getNoopExpressionModifier();

      factory.setModifier(name, modifier);

      expect(factory.getModifier(name)).toBe(modifier);
    });
  });
});
