import { PipeFactory } from '../../../src/pipes/factory/pipe-factory';
import { MockPipe } from '../../mocks/mock-pipe';
import { NON_NON_BLANK_STRING_DATA_SET, NON_OBJECT_DATA_SET } from '../../data/type-sets';

describe('PipeFactory', () => {

  describe('.set()', () => {

    test.each(NON_NON_BLANK_STRING_DATA_SET)('should throw error when name is not non-blank string', (name: string) => {
      const factory = new PipeFactory();

      const thrown = () => factory.set(name, new MockPipe());

      expect(thrown).toThrowError('Pipe name must be a non-blank string!');
    });

    test.each(NON_OBJECT_DATA_SET)('should throw error when pipe is not an object', (pipe: any) => {
      const factory = new PipeFactory();

      const thrown = () => factory.set('pipe', pipe);

      expect(thrown).toThrowError('Pipe must be an object!');
    });

    it('should throw error when a pipe already registered with the given name', () => {
      const factory = new PipeFactory();
      const name = 'pipe';

      factory.set(name, new MockPipe());

      const thrown = () => factory.set(name, new MockPipe());

      expect(thrown).toThrowError('Pipe with name "pipe" already registered!');
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

      factory.set(name, pipe);

      const result = factory.get(name);

      expect(result).toBe(pipe);
    });
  });
});
