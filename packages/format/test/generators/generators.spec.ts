import { MockGenerator } from '../mocks/mock-generator';
import { Flow } from '../../src/generators/flow';
import { Functional } from '../../src/generators/functional';
import { combine } from '../../src/generators/generators';

describe('generators', () => {

  describe('combine()', () => {

    it('should create a flow with the given generators', () => {
      const mockGenerator1 = new MockGenerator();
      const mockGenerator2 = new MockGenerator();

      const generator = combine(mockGenerator1, mockGenerator2);

      expect(generator).toBeInstanceOf(Flow);
      expect((generator as Flow).getGenerators()).toStrictEqual([mockGenerator1, mockGenerator2]);
    });
  });

  describe('asGenerator()', () => {

    it('should create a functional generator with the given generator function', () => {
      const generatorFunction = () => true;

      const generator = new Functional(generatorFunction);

      expect(generator).toBeInstanceOf(Functional);
      expect((generator as Functional).getGeneratorFunction()).toBe(generatorFunction);
    });
  });
});
