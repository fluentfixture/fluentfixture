import { ICstVisitor, ILexingResult, Lexer } from 'chevrotain';
import { FormatterLexer } from './lexer';
import { FormatterParser } from './parser';
import { createFormatterVisitor } from './visitor';
import { SyntaxDefinition } from './types/syntax-definition';

export class SyntaxEngine {
  private readonly lexer: Lexer;
  private readonly parser: FormatterParser;
  private readonly visitor: ICstVisitor<any, any>;

  public constructor() {
    this.lexer = FormatterLexer;
    this.parser = new FormatterParser();
    this.visitor = createFormatterVisitor(this.parser);
  }

  public parse(expression: string): SyntaxDefinition {
    const result = this.tokenize(expression);
    this.parser.reset();
    this.parser.input = result.tokens;
    const cst = this.parser.expression();
    if (!cst || this.parser.errors.length > 0) {
      throw new Error(`Parsing error: ${this.parser.errors[0].message}`);
    }

    return this.visitor.visit(cst) as SyntaxDefinition;
  }

  private tokenize(expression: string): ILexingResult {
    const lexingResult = this.lexer.tokenize(expression);
    if (lexingResult.errors.length > 0) {
      throw new Error(`Parsing error: ${lexingResult.errors[0].message}`);
    }
    return lexingResult;
  }
}
