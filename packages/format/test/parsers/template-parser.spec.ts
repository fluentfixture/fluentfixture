import { anything, instance, mock, verify, when } from 'ts-mockito';
import { PipeBuilder } from '../../src/pipes/builder/pipe-builder';
import { TemplateParser } from '../../src/parsers/template-parser';
import { NON_NON_EMPTY_STRING_DATA_SET } from '../data/type-sets';
import { MockPipe } from '../mocks/mock-pipe';

describe('TemplateParser', () => {

  describe('.parse()', () => {

    test.each(NON_NON_EMPTY_STRING_DATA_SET)('should return empty token list when expression is empty: %p', (expression: string) => {
      const mockPipes = mock(PipeBuilder);
      const templateParser = new TemplateParser(instance(mockPipes));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(0);
      verify(mockPipes.constant(anything())).never();
      verify(mockPipes.flow(anything())).never();
    });

    it('should parse static tokens correctly', () => {
      const expression = 'lorem ipsum.';
      const mockPipeBuilder = mock(PipeBuilder);
      const templateParser = new TemplateParser(instance(mockPipeBuilder));

      when(mockPipeBuilder.constant(expression)).thenReturn(new MockPipe(expression));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(1);

      expect((result[0] as MockPipe).getValue()).toBe(expression);

      verify(mockPipeBuilder.constant(expression)).once();
      verify(mockPipeBuilder.flow(anything())).never();
    });

    it('should parse dynamic tokens correctly', () => {
      const expression = '${key:fallback|op}';
      const rawExpression = 'key:fallback|op';
      const mockPipeBuilder = mock(PipeBuilder);
      const templateParser = new TemplateParser(instance(mockPipeBuilder));

      when(mockPipeBuilder.flow(rawExpression)).thenReturn(new MockPipe(expression));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(1);

      expect((result[0] as MockPipe).getValue()).toBe(expression);

      verify(mockPipeBuilder.constant(anything())).never();
      verify(mockPipeBuilder.flow(rawExpression)).once();
    });

    it('should parse combined tokens correctly (static, dynamic, static)', () => {
      const expression = 'lorem ${key:fallback|op} ipsum.';
      const staticTokens = ['lorem ', ' ipsum.'];
      const dynamicTokens = ['key:fallback|op'];

      const mockPipeBuilder = mock(PipeBuilder);
      const templateParser = new TemplateParser(instance(mockPipeBuilder));

      when(mockPipeBuilder.constant(staticTokens[0])).thenReturn(new MockPipe(staticTokens[0]));
      when(mockPipeBuilder.constant(staticTokens[1])).thenReturn(new MockPipe(staticTokens[1]));
      when(mockPipeBuilder.flow(dynamicTokens[0])).thenReturn(new MockPipe(dynamicTokens[0]));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(3);

      expect((result[0] as MockPipe).getValue()).toBe(staticTokens[0]);
      expect((result[1] as MockPipe).getValue()).toBe(dynamicTokens[0]);
      expect((result[2] as MockPipe).getValue()).toBe(staticTokens[1]);

      verify(mockPipeBuilder.constant(anything())).twice();
      verify(mockPipeBuilder.flow(dynamicTokens[0])).once();
    });

    it('should parse combined tokens correctly (dynamic, static, dynamic)', () => {
      const expression = '${key.0:fallback|op} lorem ${key.1:fallback|op}';
      const staticTokens = [' lorem '];
      const dynamicTokens = ['key.0:fallback|op', 'key.1:fallback|op'];

      const mockPipes = mock(PipeBuilder);
      const templateParser = new TemplateParser(instance(mockPipes));

      when(mockPipes.constant(staticTokens[0])).thenReturn(new MockPipe(staticTokens[0]));
      when(mockPipes.flow(dynamicTokens[0])).thenReturn(new MockPipe(dynamicTokens[0]));
      when(mockPipes.flow(dynamicTokens[1])).thenReturn(new MockPipe(dynamicTokens[1]));

      const result = templateParser.parse(expression);

      expect(result).toHaveLength(3);

      expect((result[0] as MockPipe).getValue()).toBe(dynamicTokens[0]);
      expect((result[1] as MockPipe).getValue()).toBe(staticTokens[0]);
      expect((result[2] as MockPipe).getValue()).toBe(dynamicTokens[1]);

      verify(mockPipes.constant(anything())).once();
      verify(mockPipes.flow(dynamicTokens[0])).once();
      verify(mockPipes.flow(dynamicTokens[1])).once();
    });
  });
});
