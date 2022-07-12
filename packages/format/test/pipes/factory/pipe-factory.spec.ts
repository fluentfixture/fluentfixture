import { PipeFactory } from '../../../src/pipes/factory/pipe-factory';
import { MockPipe } from '../../mocks/mock-pipe';
import { NON_FUNCTION_DATA_SET, NON_NON_BLANK_STRING_DATA_SET, NON_OBJECT_DATA_SET } from '../../data/type-sets';

describe('PipeFactory', () => {

  describe('.registerInstance()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new PipeFactory();

      const thrown = () => factory.registerInstance(name, new MockPipe());

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    test.each(NON_OBJECT_DATA_SET)('should throw error when pipe is not an object', (pipe: any) => {
      const factory = new PipeFactory();

      const thrown = () => factory.registerInstance('pipe', pipe);

      expect(thrown).toThrowError('Pipe must be an object!');
    });

    it('should throw error when a pipe already registered with the given name', () => {
      const factory = new PipeFactory();
      const name = 'pipe';

      factory.registerInstance(name, new MockPipe());

      const thrown = () => factory.registerInstance(name, new MockPipe());

      expect(thrown).toThrowError('Pipe with name "pipe" already registered!');
    });

    it('should register pipe with the given name', () => {
      const factory = new PipeFactory();
      const name = 'pipe';
      const pipe = new MockPipe();

      factory.registerInstance(name, pipe);

      const result = factory.get(name);

      expect(result).toEqual(pipe);
    });
  });

  describe('.registerFunction()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new PipeFactory();

      const thrown = () => factory.registerFunction(name, () => true);

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    test.each(NON_FUNCTION_DATA_SET)('should throw error when pipe is not a function', (pipe: any) => {
      const factory = new PipeFactory();

      const thrown = () => factory.registerFunction('pipe', pipe);

      expect(thrown).toThrowError('Pipe must be a function!');
    });

    it('should throw error when a pipe already registered with the given name', () => {
      const factory = new PipeFactory();
      const name = 'pipe';

      factory.registerFunction(name, () => true);

      const thrown = () => factory.registerFunction(name, () => true);

      expect(thrown).toThrowError('Pipe with name "pipe" already registered!');
    });

    it('should register pipe with the given name', () => {
      const factory = new PipeFactory();
      const name = 'pipe';
      const pipe = () => true;

      factory.registerFunction(name, pipe);

      const result = factory.get(name);

      expect(result).toBeDefined();
    });
  });

  describe('.unregister()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new PipeFactory();

      const thrown = () => factory.unregister(name);

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    it('should not throw error when given pipe is not registered before', () => {
      const factory = new PipeFactory();
      const name = 'pipe';

      const thrown = () => factory.unregister(name);

      expect(thrown).not.toThrowError();
    });

    it('should remove given pipe', () => {
      const factory = new PipeFactory();
      const name = 'pipe';

      factory.registerInstance(name, new MockPipe());

      factory.unregister(name);

      const thrown = () => factory.get(name);

      expect(thrown).toThrowError('Pipe with name "pipe" could not be found!');
    });
  });

  describe('.get()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new PipeFactory();

      const thrown = () => factory.get(name);

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    it('should throw error when a pipe not found with the given name', () => {
      const factory = new PipeFactory();

      const thrown = () => factory.get('pipe');

      expect(thrown).toThrowError('Pipe with name "pipe" could not be found!');
    });

    it('should return the pipe with the given name', () => {
      const factory = new PipeFactory();
      const name = 'pipe';
      const pipe = new MockPipe();

      factory.registerInstance(name, pipe);

      const result = factory.get(name);

      expect(result).toBe(pipe);
    });
  });

  describe('.clearAll()', () => {

    it('should clear all pipes', () => {
      const factory = new PipeFactory();
      const name = 'pipe';

      factory.registerInstance(name, new MockPipe());

      factory.clearAll();

      const thrown = () => factory.get(name);

      expect(thrown).toThrowError('Pipe with name "pipe" could not be found!');
    });
  });
});
