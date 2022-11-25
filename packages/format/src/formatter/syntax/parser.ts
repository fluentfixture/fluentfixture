import { CstParser } from 'chevrotain';
import { IOrAlt, OrMethodOpts } from '@chevrotain/types';
import {
  JsonColon,
  Comma, False,
  FunctionLiteral,
  LeftCurly, LeftParenthesis,
  LeftSquare, MultiModeLexerDefinition, Null,
  NumberLiteral, Path, Pipe,
  RightCurly, RightParenthesis,
  RightSquare,
  StringLiteral, True, Colon,
} from './lexer';

export class FormatterParser extends CstParser {

  private valueSyntaxCache: IOrAlt<any>[] | OrMethodOpts<any>;
  private expressionSyntaxCache: IOrAlt<any>[] | OrMethodOpts<any>;

  public constructor() {
    super(MultiModeLexerDefinition, { recoveryEnabled: false });
    this.performSelfAnalysis();
  }

  public expression = this.RULE('expression', () => {
    this.OR(this.expressionSyntaxCache || (
      this.expressionSyntaxCache = [
        { ALT: () => this.SUBRULE(this.expressionWithPath) },
        { ALT: () => this.SUBRULE(this.pipes) },
      ]
    ));
  });

  private expressionWithPath = this.RULE('expressionWithPath', () => {
    this.CONSUME(Path);
    this.OPTION({
      DEF: () => {
        this.SUBRULE(this.pipes);
      }
    });
  });

  private pipes = this.RULE('pipes', () => {
    this.CONSUME(Colon);
    this.MANY_SEP({
      SEP: Pipe, DEF: () => {
        this.SUBRULE(this.pipe);
      },
    });
  });

  private pipe = this.RULE('pipe', () => {
    this.CONSUME(FunctionLiteral);
    this.CONSUME(LeftParenthesis);
    this.SUBRULE(this.parameters);
    this.CONSUME(RightParenthesis);
  });

  private parameters = this.RULE('parameters', () => {
    this.MANY_SEP({
      SEP: Comma, DEF: () => {
        this.SUBRULE(this.value);
      },
    });
  });

  private value = this.RULE('value', () => {
    this.OR(this.valueSyntaxCache || (
      this.valueSyntaxCache = [
        { ALT: () => this.CONSUME(StringLiteral, { LABEL: 'value' }) },
        { ALT: () => this.CONSUME(NumberLiteral, { LABEL: 'value' }) },
        { ALT: () => this.SUBRULE(this.object, { LABEL: 'object' }) },
        { ALT: () => this.SUBRULE(this.array, { LABEL: 'array' }) },
        { ALT: () => this.CONSUME(True, { LABEL: 'value' }) },
        { ALT: () => this.CONSUME(False, { LABEL: 'value' }) },
        { ALT: () => this.CONSUME(Null, { LABEL: 'value' }) },
      ]
    ));
  });

  private object = this.RULE('object', () => {
    this.CONSUME(LeftCurly);
    this.MANY_SEP({
      SEP: Comma, DEF: () => {
        this.SUBRULE(this.objectEntity);
      },
    });
    this.CONSUME(RightCurly);
  });

  private objectEntity = this.RULE('objectEntity', () => {
    this.CONSUME(StringLiteral);
    this.CONSUME(JsonColon);
    this.SUBRULE(this.value);
  });

  private array = this.RULE('array', () => {
    this.CONSUME(LeftSquare);
    this.MANY_SEP({
      SEP: Comma, DEF: () => {
        this.SUBRULE(this.value);
      },
    });
    this.CONSUME(RightSquare);
  });
}
