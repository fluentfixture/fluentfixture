import { ICstVisitor, ILexingResult, Lexer } from 'chevrotain';
import { TypeUtils } from '@fluentfixture/shared';
import { FormatterLexer } from './lexer';
import { FormatterParser } from './parser';
import { createFormatterVisitor } from './visitor';
import { SyntaxDefinition } from './types/syntax-definition';

export class Engine {
  private static singletonInstance: Engine;
  private readonly lexer: Lexer;
  private readonly parser: FormatterParser;
  private readonly visitor: ICstVisitor<any, any>;

  private constructor() {
    this.lexer = FormatterLexer;
    this.parser = new FormatterParser();
    this.visitor = createFormatterVisitor(this.parser);
  }

  public static instance(): Engine {
    return Engine.singletonInstance || (Engine.singletonInstance = new Engine());
  }

  public parse(expression: string): SyntaxDefinition {
    return TypeUtils.isNonBlankString(expression) ? this.parseExpression(expression) : this.parseEmptyExpression();
  }

  private tokenize(expression: string): ILexingResult {
    const lexingResult = this.lexer.tokenize(expression);
    if (lexingResult.errors.length > 0) {
      throw new Error(`Parsing error: ${lexingResult.errors[0].message}`);
    }
    return lexingResult;
  }

  private parseEmptyExpression(): SyntaxDefinition {
    return {
      pipes: [],
    };
  }

  private parseExpression(expression: string): SyntaxDefinition {
    const result = this.tokenize(expression);
    this.parser.reset();
    this.parser.input = result.tokens;
    const cst = this.parser.expression();
    if (!cst || this.parser.errors.length > 0) {
      throw new Error(`Parsing error: ${this.parser.errors[0].message}`);
    }
    return this.visitor.visit(cst) as SyntaxDefinition;
  }
}
