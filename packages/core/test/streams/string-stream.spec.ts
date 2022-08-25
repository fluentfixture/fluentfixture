import { spy, verify, when } from 'ts-mockito';
import { StringUtils } from '@fluentfixture/shared';
import { StringStream } from '../../src/streams/stream-loader';
import { ValueAdapter } from '../../src/factories/adapters/value-adapter';
import {
  assertAndGetDecoratedStringOperator,
  assertAndGetDecoratedStringOperatorFromArray,
} from '../assertions/string-stream';

describe('StringStream', () => {

  describe('.trim()', () => {

    it('should create a stream with function decorator (trim) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.trim(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.trim());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.trim(str)).once();
    });
  });

  describe('.trimStart()', () => {

    it('should create a stream with function decorator (trim-start) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.trimStart(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.trimStart());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.trimStart(str)).once();
    });
  });

  describe('.trimEnd()', () => {

    it('should create a stream with function decorator (trim-end) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.trimEnd(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.trimEnd());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.trimEnd(str)).once();
    });
  });

  describe('.padStart()', () => {

    it('should create a stream with function decorator (pad-start) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const length = 30;
      const padChar = '*';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.padStart(str, length, padChar)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.padStart(length, padChar));

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.padStart(str, length, padChar)).once();
    });
  });

  describe('.padEnd()', () => {

    it('should create a stream with function decorator (pad-end) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const length = 30;
      const padChar = '*';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.padEnd(str, length, padChar)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.padEnd(length, padChar));

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.padEnd(str, length, padChar)).once();
    });
  });

  describe('.lowerCase()', () => {

    it('should create a stream with function decorator (lower-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.lowerCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.lowerCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.lowerCase(str)).once();
    });
  });

  describe('.split()', () => {

    it('should create an array stream with function decorator (split) that wraps itself', () => {
      const str = 'str1,str2';
      const output = ['str1', 'str2'];
      const separator = ',';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.split(str, separator, null)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperatorFromArray(stream, stream.split(separator, null));

      expect(operator(str)).toStrictEqual(output);

      verify(spyStringUtils.split(str, separator, null)).once();
    });
  });

  describe('.upperCase()', () => {

    it('should create a stream with function decorator (upper-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.upperCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.upperCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.upperCase(str)).once();
    });
  });

  describe('.camelCase()', () => {

    it('should create a stream with function decorator (camel-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.camelCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.camelCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.camelCase(str)).once();
    });
  });

  describe('.capitalCase()', () => {

    it('should create a stream with function decorator (capital-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.capitalCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.capitalCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.capitalCase(str)).once();
    });
  });

  describe('.constantCase()', () => {

    it('should create a stream with function decorator (constant-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.constantCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.constantCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.constantCase(str)).once();
    });
  });

  describe('.pathCase()', () => {

    it('should create a stream with function decorator (path-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.pathCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.pathCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.pathCase(str)).once();
    });
  });

  describe('.dotCase()', () => {

    it('should create a stream with function decorator (dot-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.dotCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.dotCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.dotCase(str)).once();
    });
  });

  describe('.headerCase()', () => {

    it('should create a stream with function decorator (header-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.headerCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.headerCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.headerCase(str)).once();
    });
  });

  describe('.paramCase()', () => {

    it('should create a stream with function decorator (param-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.paramCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.paramCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.paramCase(str)).once();
    });
  });

  describe('.pascalCase()', () => {

    it('should create a stream with function decorator (pascal-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.pascalCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.pascalCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.pascalCase(str)).once();
    });
  });

  describe('.snakeCase()', () => {

    it('should create a stream with function decorator (snake-case) that wraps itself', () => {
      const str = 'string';
      const output = 'output';
      const stream = new StringStream(new ValueAdapter(str));
      const spyStringUtils = spy(StringUtils);

      when(spyStringUtils.snakeCase(str)).thenReturn(output);

      const operator = assertAndGetDecoratedStringOperator(stream, stream.snakeCase());

      expect(operator(str)).toBe(output);

      verify(spyStringUtils.snakeCase(str)).once();
    });
  });
});

