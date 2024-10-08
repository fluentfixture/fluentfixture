import { ICstVisitor, ILexingResult, Lexer } from 'chevrotain';
import { TypeUtils } from '@fluentfixture/shared';
import { FormatterLexer } from './lexer';
import { FormatterParser } from './parser';
import { createFormatterVisitor } from './visitor';
import { Expression } from './types/expression';

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

  public parse(token: string): Expression {
    return TypeUtils.isNonBlankString(token) ? this.parseExpression(token) : this.parseEmptyExpression();
  }

  private tokenize(token: string): ILexingResult {
    const lexingResult = this.lexer.tokenize(token);
    if (lexingResult.errors.length > 0) {
      throw new Error(`Cannot parse statement '${token}': ${lexingResult.errors[0].message}`);
    }
    return lexingResult;
  }

  private parseEmptyExpression(): Expression {
    return {
      pipes: [],
    };
  }

  private parseExpression(token: string): Expression {
    const result = this.tokenize(token);
    this.parser.reset();
    this.parser.input = result.tokens;
    const cst = this.parser.expression();
    if (!cst || this.parser.errors.length > 0) {
      throw new Error(`Cannot parse statement '${token}': ${this.parser.errors[0].message}`);
    }
    return this.visitor.visit(cst) as Expression;
  }
}
