import { buildExpressionEvaluator } from '../../src/evaluators/expression-evaluator-builder';
import { createModifierFactory } from '../../src/modifiers/modifier-factory';

describe('expression-evaluator-builder', () => {

  describe('buildExpressionEvaluator()', () => {

    const modifiers = createModifierFactory();

    beforeAll(() => {
      modifiers.setModifier('noop', (output: string) => output);
    });

    describe('static', () => {

      it('should build an expression evaluator for static tokens', () => {
        const metadata = {
          expression: 'expression',
          fallback: 'fallback',
          modifiers: [],
          dynamic: false,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator({ 'key': 'value' })).toBe('expression');
      });

      it('should use given fallback value', () => {
        const metadata = {
          expression: '',
          fallback: 'fallback',
          modifiers: [],
          dynamic: false,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator({ 'key': 'value' })).toBe('fallback');
      });

      it('should use default fallback value when fallback is null', () => {
        const metadata = {
          expression: '',
          fallback: null,
          modifiers: [],
          dynamic: false,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator({ 'key': 'value' })).toBe('');
      });
    });

    describe('identity', () => {

      it('should build an expression evaluator for identity tokens', () => {
        const metadata = {
          expression: '',
          fallback: 'fallback',
          modifiers: [],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator('source')).toBe('source');
      });

      it('should use given fallback value', () => {
        const metadata = {
          expression: '',
          fallback: 'fallback',
          modifiers: [],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator('')).toBe('fallback');
      });

      it('should use default fallback value when fallback is null', () => {
        const metadata = {
          expression: '',
          fallback: null,
          modifiers: [],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator('')).toBe('');
      });

      it('should use given modifier', () => {
        const metadata = {
          expression: '',
          fallback: 'fallback',
          modifiers: ['upper-case'],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator('')).toBe('FALLBACK');
      });
    });

    describe('dynamic', () => {

      const source = { key: 'value' };

      it('should build an expression evaluator for dynamic tokens', () => {
        const metadata = {
          expression: 'key',
          fallback: 'fallback',
          modifiers: [],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator(source)).toBe('value');
      });

      it('should use given fallback value', () => {
        const metadata = {
          expression: 'invalid-key',
          fallback: 'fallback',
          modifiers: [],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator(source)).toBe('fallback');
      });

      it('should use default fallback value when fallback is null', () => {
        const metadata = {
          expression: 'invalid-key',
          fallback: null,
          modifiers: [],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator(source)).toBe('');
      });

      it('should use given modifier', () => {
        const metadata = {
          expression: 'key',
          fallback: 'fallback',
          modifiers: ['upper-case'],
          dynamic: true,
        };

        const evaluator = buildExpressionEvaluator(metadata, modifiers);

        expect(evaluator(source)).toBe('VALUE');
      });
    });
  });
});
