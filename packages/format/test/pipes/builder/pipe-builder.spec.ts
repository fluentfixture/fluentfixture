import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { Pipes } from '../../../src/pipes/factory/pipes';
import { TokenParser } from '../../../src/parsers/token-parser';
import { PipeBuilder } from '../../../src/pipes/builder/pipe-builder';
import { Constant } from '../../../src/pipes/constant';
import { Flow } from '../../../src/pipes/flow';
import { Query } from '../../../src/pipes/query';
import { Noop } from '../../../src/pipes/noop';
import { Fallback } from '../../../src/pipes/fallback';
import { MockPipe } from '../../mocks/mock-pipe';
import { ErrorBoundary } from '../../../src/pipes/error-boundary';
import { OptionsWrapper } from '../../../src/option/options-wrapper';

describe('PipeBuilder', () => {
  const mockParser = mock(TokenParser);
  const mockPipes = mock(Pipes);
  const mockOptions = mock<OptionsWrapper>();
  const pipeBuilder = new PipeBuilder(instance(mockParser), instance(mockPipes), instance(mockOptions));

  afterEach(() => {
    reset(mockParser);
    reset(mockPipes);
    reset(mockOptions);
  });

  describe('.constant()', () => {

    it('should build a constant pipe', () => {
      const value = 'value';

      const pipe = pipeBuilder.constant(value);

      const constant = pipe as Constant;

      expect(constant).toBeInstanceOf(Constant);
      expect(constant.getValue()).toBe(value);
    });
  });

  describe('.flow()', () => {

    it('should add query pipe to flow when token has a path', () => {
      const token = 'token';
      const queryValue = 'query';

      when(mockParser.parse(token)).thenReturn({ query: queryValue, pipes: [], fallback: undefined });

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      expect(flow).toBeInstanceOf(Flow);

      const query = flow.getPipes()[0] as Query;

      expect(query).toBeInstanceOf(Query);
      expect(query.getQuery()).toBe(queryValue);
      verify(mockParser.parse(token)).once();
      verify(mockPipes.resolve(anything())).never();
    });

    it('should add noop pipe to flow when token has not a path', () => {
      const token = 'token';
      const query = undefined;

      when(mockParser.parse(token)).thenReturn({ query, fallback: undefined, pipes: [] });

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const noop = flow.getPipes()[0] as Noop;

      expect(noop).toBeInstanceOf(Noop);
      verify(mockParser.parse(token)).once();
      verify(mockPipes.resolve(anything())).never();
    });

    it('should add fallback pipe to flow when token has a fallback', () => {
      const token = 'token';
      const value = 'fallback';

      when(mockParser.parse(token)).thenReturn({ query: undefined, fallback: value, pipes: [] });

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const fallbacks = flow.getPipes().filter(g => g instanceof Fallback);

      expect(fallbacks).toHaveLength(1);

      const fallback = fallbacks[0] as Fallback;

      expect(fallback).toBeInstanceOf(Fallback);
      expect(fallback.getFallback()).toBe(value);
      verify(mockParser.parse(token)).once();
      verify(mockPipes.resolve(anything())).never();
    });

    it('should not add fallback pipe to flow when token has not a fallback', () => {
      const token = 'token';

      when(mockParser.parse(token)).thenReturn({ query: undefined, fallback: undefined, pipes: [] });

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const hasFallback = flow.getPipes().some(g => g instanceof Fallback);

      expect(hasFallback).toBe(false);
      verify(mockParser.parse(token)).once();
      verify(mockPipes.resolve(anything())).never();
    });

    it('should decorate pipes with the error boundary if options.ignoreErrors is true', () => {
      const token = 'token';
      const pipeName = 'pipe';
      const mockPipe = new MockPipe();

      when(mockParser.parse(token)).thenReturn({ query: undefined, fallback: undefined, pipes: [pipeName] });
      when(mockPipes.resolve(pipeName)).thenReturn(mockPipe);
      when(mockOptions.ignoreErrors()).thenReturn(true);

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const newPipe = flow.getPipes().find(g => [Noop, Query, Fallback].every(i => !(g instanceof i)));

      const errorBoundary = newPipe as ErrorBoundary;

      expect(errorBoundary).toBeInstanceOf(ErrorBoundary);
      expect(errorBoundary.getPipe()).toBe(mockPipe);
      verify(mockParser.parse(token)).once();
      verify(mockPipes.resolve(pipeName)).once();
      verify(mockOptions.ignoreErrors()).called();
    });

    it('should not decorate pipes with the error boundary if options.ignoreErrors is false', () => {
      const token = 'token';
      const pipeName = 'pipe';
      const mockPipe = new MockPipe();

      when(mockParser.parse(token)).thenReturn({ query: undefined, fallback: undefined, pipes: [pipeName] });
      when(mockPipes.resolve(pipeName)).thenReturn(mockPipe);
      when(mockOptions.ignoreErrors()).thenReturn(false);

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const newPipe = flow.getPipes().find(g => [Noop, Query, Fallback].every(i => !(g instanceof i)));

      expect(newPipe).toBe(mockPipe);
      verify(mockParser.parse(token)).once();
      verify(mockPipes.resolve(pipeName)).once();
      verify(mockOptions.ignoreErrors()).called();
    });
  });
});
