import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { Pipes } from '../../../../src/formatter/pipes/factory/pipes';
import { PipeBuilder } from '../../../../src/formatter/pipes/builder/pipe-builder';
import { Constant } from '../../../../src/formatter/pipes/constant';
import { Flow } from '../../../../src/formatter/pipes/flow';
import { Query } from '../../../../src/formatter/pipes/query';
import { Noop } from '../../../../src/formatter/pipes/noop';
import { ErrorBoundary } from '../../../../src/formatter/pipes/error-boundary';
import { OptionsWrapper } from '../../../../src/formatter/option/options-wrapper';
import { Engine } from '../../../../src/formatter/syntax/engine';
import { Functional } from '../../../../src/formatter/pipes/functional';
import { PathDefinition } from '../../../../src/formatter/syntax/types/path-definition';

describe('PipeBuilder', () => {
  const mockEngine = mock(Engine);
  const mockPipes = mock(Pipes);
  const mockOptions = mock<OptionsWrapper>();
  const pipeBuilder = new PipeBuilder(instance(mockEngine), instance(mockPipes), instance(mockOptions));

  afterEach(() => {
    reset(mockEngine);
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
      const path: PathDefinition = { type: 'PROPERTY', value: 'path', parameters: [] };

      when(mockEngine.parse(token)).thenReturn({ path, pipes: [] });

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      expect(flow).toBeInstanceOf(Flow);

      const query = flow.getPipes()[0] as Query;

      expect(query).toBeInstanceOf(Query);
      expect(query.getQuery()).toBe(path);
      verify(mockEngine.parse(token)).once();
      verify(mockPipes.resolve(anything())).never();
    });

    it('should add noop pipe to flow when token has not a path', () => {
      const token = 'token';
      const path = undefined;

      when(mockEngine.parse(token)).thenReturn({ path, pipes: [] });

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const noop = flow.getPipes()[0] as Noop;

      expect(noop).toBeInstanceOf(Noop);
      verify(mockEngine.parse(token)).once();
      verify(mockPipes.resolve(anything())).never();
    });

    it('should decorate pipes with the error boundary if options.ignoreErrors is true', () => {
      const token = 'token';
      const pipeName = 'pipe';
      const mockPipe = () => true;

      when(mockEngine.parse(token)).thenReturn({ pipes: [{ name: pipeName, parameters: [] }]});
      when(mockPipes.resolve(pipeName)).thenReturn(mockPipe);
      when(mockOptions.ignoreErrors()).thenReturn(true);

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const newPipe = flow.getPipes().find(g => [Noop, Query].every(i => !(g instanceof i)));

      const errorBoundary = newPipe as ErrorBoundary;

      expect(errorBoundary).toBeInstanceOf(ErrorBoundary);

      const decoratedPipe = errorBoundary.getPipe() as Functional;

      expect(decoratedPipe).toBeInstanceOf(Functional);
      expect(decoratedPipe.getPipe().fn).toBe(mockPipe);
      verify(mockEngine.parse(token)).once();
      verify(mockPipes.resolve(pipeName)).once();
      verify(mockOptions.ignoreErrors()).called();
    });

    it('should not decorate pipes with the error boundary if options.ignoreErrors is false', () => {
      const token = 'token';
      const pipeName = 'pipe';
      const mockPipe = () => true;

      when(mockEngine.parse(token)).thenReturn({ pipes: [{ name: pipeName, parameters: [] }]});
      when(mockPipes.resolve(pipeName)).thenReturn(mockPipe);
      when(mockOptions.ignoreErrors()).thenReturn(false);

      const pipe = pipeBuilder.flow(token);

      const flow = pipe as Flow;

      const newPipe = flow.getPipes().find(g => [Noop, Query].every(i => !(g instanceof i)));

      expect(newPipe).toBeInstanceOf(Functional);
      expect((newPipe as Functional).getPipe().fn).toBe(mockPipe);
      verify(mockEngine.parse(token)).once();
      verify(mockPipes.resolve(pipeName)).once();
      verify(mockOptions.ignoreErrors()).called();
    });
  });
});
