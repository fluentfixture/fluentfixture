import { MockFactory } from '../mocks/mock-factory';
import { StringStream } from '../../src/streams/stream-loader';
import { assertStringStreamDecorator } from '../assertions/string-stream-assertions';

describe('StringStream', () => {
  const value = ' Lorem Ipsum ';
  const stream = new StringStream(new MockFactory(value));

  describe('.trim()', () => {

    it('should create a stream with function decorator (trim) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.trim(), value, 'Lorem Ipsum');
    });
  });

  describe('.trimStart()', () => {

    it('should create a stream with function decorator (trim-start) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.trimStart(), value, 'Lorem Ipsum ');
    });
  });

  describe('.trimEnd()', () => {

    it('should create a stream with function decorator (trim-end) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.trimEnd(), value, ' Lorem Ipsum');
    });
  });

  describe('.padStart()', () => {

    it('should create a stream with function decorator (pad-start) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.padStart(20, '*'), value, '******* Lorem Ipsum ');
    });
  });

  describe('.padEnd()', () => {

    it('should create a stream with function decorator (pad-end) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.padEnd(20, '*'), value, ' Lorem Ipsum *******');
    });
  });

  describe('.lowerCase()', () => {

    it('should create a stream with function decorator (lower-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.lowerCase(), value, ' lorem ipsum ');
    });
  });

  describe('.upperCase()', () => {

    it('should create a stream with function decorator (upper-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.upperCase(), value, ' LOREM IPSUM ');
    });
  });

  describe('.camelCase()', () => {

    it('should create a stream with function decorator (camel-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.camelCase(), value, 'loremIpsum');
    });
  });

  describe('.capitalCase()', () => {

    it('should create a stream with function decorator (capital-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.capitalCase(), value, 'Lorem Ipsum');
    });
  });

  describe('.constantCase()', () => {

    it('should create a stream with function decorator (constant-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.constantCase(), value, 'LOREM_IPSUM');
    });
  });

  describe('.pathCase()', () => {

    it('should create a stream with function decorator (path-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.pathCase(), value, 'lorem/ipsum');
    });
  });

  describe('.dotCase()', () => {

    it('should create a stream with function decorator (dot-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.dotCase(), value, 'lorem.ipsum');
    });
  });

  describe('.headerCase()', () => {

    it('should create a stream with function decorator (header-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.headerCase(), value, 'Lorem-Ipsum');
    });
  });

  describe('.paramCase()', () => {

    it('should create a stream with function decorator (param-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.paramCase(), value, 'lorem-ipsum');
    });
  });

  describe('.pascalCase()', () => {

    it('should create a stream with function decorator (pascal-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.pascalCase(), value, 'LoremIpsum');
    });
  });

  describe('.snakeCase()', () => {

    it('should create a stream with function decorator (snake-case) that wraps itself', () => {
      assertStringStreamDecorator(stream, stream.snakeCase(), value, 'lorem_ipsum');
    });
  });
});

