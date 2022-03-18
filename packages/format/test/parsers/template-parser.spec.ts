import { anything, instance, mock, verify, when } from 'ts-mockito';
import { GeneratorBuilder } from '../../src/generators/builder/generator-builder';
import { TemplateParser } from '../../src/parsers/template-parser';
import { NON_NON_EMPTY_STRING_DATA_SET } from '../data/type-sets';
import { MockGenerator } from '../mocks/mock-generator';

describe('TemplateParser', () => {

  describe('.parse()', () => {

    test.each(NON_NON_EMPTY_STRING_DATA_SET)('should return empty token list when expression is empty: %p', (expression: string) => {
      const mockTokenFactory = mock(GeneratorBuilder);
      const templateParser = new TemplateParser(instance(mockTokenFactory));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(0);
      verify(mockTokenFactory.fixed(anything())).never();
      verify(mockTokenFactory.flow(anything())).never();
    });

    it('should parse static tokens correctly', () => {
      const expression = 'lorem ipsum.';
      const mockTokenFactory = mock(GeneratorBuilder);
      const templateParser = new TemplateParser(instance(mockTokenFactory));

      when(mockTokenFactory.fixed(expression)).thenReturn(new MockGenerator(expression));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(1);

      expect((result[0] as MockGenerator).getValue()).toBe(expression);

      verify(mockTokenFactory.fixed(expression)).once();
      verify(mockTokenFactory.flow(anything())).never();
    });

    it('should parse dynamic tokens correctly', () => {
      const expression = '{key:fallback|op}';
      const mockTokenFactory = mock(GeneratorBuilder);
      const templateParser = new TemplateParser(instance(mockTokenFactory));

      when(mockTokenFactory.flow(expression)).thenReturn(new MockGenerator(expression));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(1);

      expect((result[0] as MockGenerator).getValue()).toBe(expression);

      verify(mockTokenFactory.fixed(anything())).never();
      verify(mockTokenFactory.flow(expression)).once();
    });

    it('should parse combined tokens correctly (static, dynamic, static)', () => {
      const expression = 'lorem {key:fallback|op} ipsum.';
      const staticTokens = ['lorem ', ' ipsum.'];
      const dynamicTokens = ['{key:fallback|op}'];

      const mockTokenFactory = mock(GeneratorBuilder);
      const templateParser = new TemplateParser(instance(mockTokenFactory));

      when(mockTokenFactory.fixed(staticTokens[0])).thenReturn(new MockGenerator(staticTokens[0]));
      when(mockTokenFactory.fixed(staticTokens[1])).thenReturn(new MockGenerator(staticTokens[1]));
      when(mockTokenFactory.flow(dynamicTokens[0])).thenReturn(new MockGenerator(dynamicTokens[0]));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(3);

      expect((result[0] as MockGenerator).getValue()).toBe(staticTokens[0]);
      expect((result[1] as MockGenerator).getValue()).toBe(dynamicTokens[0]);
      expect((result[2] as MockGenerator).getValue()).toBe(staticTokens[1]);

      verify(mockTokenFactory.fixed(anything())).twice();
      verify(mockTokenFactory.flow(anything())).once();
    });

    it('should parse combined tokens correctly (dynamic, static, dynamic)', () => {
      const expression = '{key.0:fallback|op} lorem {key.1:fallback|op}';
      const staticTokens = [' lorem '];
      const dynamicTokens = ['{key.0:fallback|op}', '{key.1:fallback|op}'];

      const mockTokenFactory = mock(GeneratorBuilder);
      const templateParser = new TemplateParser(instance(mockTokenFactory));

      when(mockTokenFactory.fixed(staticTokens[0])).thenReturn(new MockGenerator(staticTokens[0]));
      when(mockTokenFactory.flow(dynamicTokens[0])).thenReturn(new MockGenerator(dynamicTokens[0]));
      when(mockTokenFactory.flow(dynamicTokens[1])).thenReturn(new MockGenerator(dynamicTokens[1]));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(3);

      expect((result[0] as MockGenerator).getValue()).toBe(dynamicTokens[0]);
      expect((result[1] as MockGenerator).getValue()).toBe(staticTokens[0]);
      expect((result[2] as MockGenerator).getValue()).toBe(dynamicTokens[1]);

      verify(mockTokenFactory.fixed(anything())).once();
      verify(mockTokenFactory.flow(anything())).twice();
    });
  });
});
