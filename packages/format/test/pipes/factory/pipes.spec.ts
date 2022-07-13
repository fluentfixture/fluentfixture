import { Pipes } from '../../../src/pipes/factory/pipes';
import { MockPipe } from '../../mocks/mock-pipe';
import {
  NON_NON_BLANK_STRING_DATA_SET,
  NON_OBJECT_OR_FUNCTION_DATA_SET,
} from '../../data/type-sets';

describe('Pipes', () => {

  describe('.resolve()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const pipes = Pipes.empty();

      const thrown = () => pipes.resolve(name);

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    it('should throw error when a pipe not found with the given name', () => {
      const pipes = Pipes.empty();

      const thrown = () => pipes.resolve('pipe');

      expect(thrown).toThrowError('Pipe with name "pipe" could not be found!');
    });

    it('should return the pipe with the given name', () => {
      const pipes = Pipes.empty();
      const name = 'pipe';
      const pipe = new MockPipe();

      pipes.register(name, pipe);

      const result = pipes.resolve(name);

      expect(result).toBe(pipe);
    });
  });

  describe('.register()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const pipes = Pipes.empty();

      const thrown = () => pipes.register(name, new MockPipe());

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    test.each(NON_OBJECT_OR_FUNCTION_DATA_SET)('should throw error when pipe is not a instance of Pipe or function', (pipe: any) => {
      const pipes = Pipes.empty();

      const thrown = () => pipes.register('pipe', pipe);

      expect(thrown).toThrowError('Pipe must be an instance of Pipe or a function!');
    });

    it('should throw error when a pipe already registered with the given name', () => {
      const pipes = Pipes.empty();
      const name = 'pipe';

      pipes.register(name, new MockPipe());

      const thrown = () => pipes.register(name, new MockPipe());

      expect(thrown).toThrowError('Pipe with name "pipe" already registered!');
    });

    it('should register pipe with the given name', () => {
      const pipes = Pipes.empty();
      const name = 'pipe';
      const pipe = new MockPipe();

      pipes.register(name, pipe);

      const result = pipes.resolve(name);

      expect(result).toEqual(pipe);
    });
  });

  describe('.unregister()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should not throw error when name is not non-blank string', (name: string) => {
      const pipes = Pipes.empty();

      const thrown = () => pipes.unregister(name);

      expect(thrown).not.toThrowError();
    });

    it('should not throw error when given pipe is not registered before', () => {
      const pipes = Pipes.empty();
      const name = 'pipe';

      const thrown = () => pipes.unregister(name);

      expect(thrown).not.toThrowError();
    });

    it('should remove given pipe', () => {
      const pipes = Pipes.empty();
      const name = 'pipe';

      pipes.register(name, new MockPipe());

      pipes.unregister(name);

      const thrown = () => pipes.resolve(name);

      expect(thrown).toThrowError('Pipe with name "pipe" could not be found!');
    });
  });

  describe('.clearAll()', () => {

    it('should clear all pipes', () => {
      const pipes = Pipes.empty();
      const name = 'pipe';

      pipes.register(name, new MockPipe());

      pipes.clearAll();

      const thrown = () => pipes.resolve(name);

      expect(thrown).toThrowError('Pipe with name "pipe" could not be found!');
    });
  });
});
