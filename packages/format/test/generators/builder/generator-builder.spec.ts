import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { GeneratorFactory } from '../../../src/generators/factory/generator-factory';
import { TokenParser } from '../../../src/parsers/token-parser';
import { Options } from '../../../src/parsers/types/options';
import { GeneratorBuilder } from '../../../src/generators/builder/generator-builder';
import { Fixed } from '../../../src/generators/fixed';
import { Flow } from '../../../src/generators/flow';
import { Extractor } from '../../../src/generators/extractor';
import { Identity } from '../../../src/generators/identity';
import { Fallback } from '../../../src/generators/fallback';
import { MockGenerator } from '../../mocks/mock-generator';
import { ErrorBoundary } from '../../../src/generators/error-boundary';

describe('GeneratorBuilder', () => {
  const mockParser = mock(TokenParser);
  const mockFactory = mock(GeneratorFactory);
  const mockOptions = mock<Options>();
  const generatorBuilder = new GeneratorBuilder(instance(mockParser), instance(mockFactory), instance(mockOptions));

  afterEach(() => {
    reset(mockParser);
    reset(mockFactory);
    reset(mockOptions);
  });

  describe('.fixed()', () => {

    it('should build a static generator', () => {
      const value = 'value';

      const generator = generatorBuilder.fixed(value);

      const fixed = generator as Fixed;

      expect(fixed).toBeInstanceOf(Fixed);
      expect(fixed.getValue()).toBe(value);
    });
  });

  describe('.flow()', () => {

    it('should select extractor generator when token has a path', () => {
      const token = 'token';
      const path = 'path';

      when(mockParser.parse(token)).thenReturn({ path, generators: [] } as any);

      const generator = generatorBuilder.flow(token);

      const flow = generator as Flow;

      expect(flow).toBeInstanceOf(Flow);

      const extractor = flow.getGenerators()[0] as Extractor;

      expect(extractor).toBeInstanceOf(Extractor);
      expect(extractor.getPath()).toBe(path);
      verify(mockParser.parse(token)).once();
      verify(mockFactory.get(anything())).never();
    });

    it('should select extractor identity when token has not a path', () => {
      const token = 'token';
      const path = undefined;

      when(mockParser.parse(token)).thenReturn({ path, generators: [] } as any);

      const generator = generatorBuilder.flow(token);

      const flow = generator as Flow;

      const identity = flow.getGenerators()[0] as Extractor;

      expect(identity).toBeInstanceOf(Identity);
      verify(mockParser.parse(token)).once();
      verify(mockFactory.get(anything())).never();
    });

    it('should add a fallback when token has a fallback', () => {
      const token = 'token';
      const value = 'fallback';

      when(mockParser.parse(token)).thenReturn({ fallback: value, generators: [] } as any);

      const generator = generatorBuilder.flow(token);

      const flow = generator as Flow;

      const fallbacks = flow.getGenerators().filter(g => g instanceof Fallback);

      expect(fallbacks).toHaveLength(1);

      const fallback = fallbacks[0] as Fallback;

      expect(fallback).toBeInstanceOf(Fallback);
      expect(fallback.getFallback()).toBe(value);
      verify(mockParser.parse(token)).once();
      verify(mockFactory.get(anything())).never();
    });

    it('should not add fallback when token has not a fallback', () => {
      const token = 'token';

      when(mockParser.parse(token)).thenReturn({ generators: [] } as any);

      const generator = generatorBuilder.flow(token);

      const flow = generator as Flow;

      const hasFallback = flow.getGenerators().some(g => g instanceof Fallback);

      expect(hasFallback).toBe(false);
      verify(mockParser.parse(token)).once();
      verify(mockFactory.get(anything())).never();
    });

    it('should wrap generators with the error boundary if options.ignoreErrors is true', () => {
      const token = 'token';
      const generatorName = 'generator';
      const mockGenerator = new MockGenerator();

      when(mockParser.parse(token)).thenReturn({ generators: [generatorName] } as any);
      when(mockFactory.get(generatorName)).thenReturn(mockGenerator);
      when(mockOptions.ignoreErrors).thenReturn(true);

      const generator = generatorBuilder.flow(token);

      const flow = generator as Flow;

      const addedGenerator = flow.getGenerators().find(g => [Identity, Extractor, Fallback].every(i => !(g instanceof i)));

      const errorBoundary = addedGenerator as ErrorBoundary;

      expect(errorBoundary).toBeInstanceOf(ErrorBoundary);
      expect(errorBoundary.getGenerator()).toBe(mockGenerator);
      verify(mockParser.parse(token)).once();
      verify(mockFactory.get(generatorName)).once();
      verify(mockOptions.ignoreErrors).called();
    });

    it('should not wrap generators with the error boundary if options.ignoreErrors is false', () => {
      const token = 'token';
      const generatorName = 'generator';
      const mockGenerator = new MockGenerator();

      when(mockParser.parse(token)).thenReturn({ generators: [generatorName] } as any);
      when(mockFactory.get(generatorName)).thenReturn(mockGenerator);
      when(mockOptions.ignoreErrors).thenReturn(false);

      const generator = generatorBuilder.flow(token);

      const flow = generator as Flow;

      const addedGenerator = flow.getGenerators().find(g => [Identity, Extractor, Fallback].every(i => !(g instanceof i)));

      expect(addedGenerator).toBe(mockGenerator);
      verify(mockParser.parse(token)).once();
      verify(mockFactory.get(generatorName)).once();
      verify(mockOptions.ignoreErrors).called();
    });
  });
});
