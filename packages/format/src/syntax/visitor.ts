import { ICstVisitor, IToken, tokenMatcher } from 'chevrotain';
import { FormatterParser } from './parser';
import { False, Null, NumberLiteral, StringLiteral, True } from './lexer';
import { PipeDefinition } from './types/pipe-definition';
import { KeyValuePair } from './types/key-value-pair';
import { SyntaxDefinition } from './types/syntax-definition';

export const createFormatterVisitor = (parser: FormatterParser): ICstVisitor<any, any> => {
  const BaseFormatterCstVisitor = parser.getBaseCstVisitorConstructorWithDefaults();

  class FormatterVisitor extends BaseFormatterCstVisitor {
    public constructor() {
      super();
      this.validateVisitor();
    }

    public expression(cst: any): SyntaxDefinition {
      if (cst.expressionWithPath) {
        return this.visit(cst.expressionWithPath[0]);
      }
      return {
        pipes: this.visit(cst.pipes[0]),
      };
    }

    public expressionWithPath(cst: any): SyntaxDefinition {
      const path = cst.Path[0].image;
      const pipes = cst.pipes ? this.visit(cst.pipes[0]) : [];
      return {
        path,
        pipes,
      };
    }

    public pipes(cst: any): ReadonlyArray<PipeDefinition> {
      return cst.pipe.map(node => this.visit(node));
    }

    public pipe(cst: any): PipeDefinition {
      const name = cst.FunctionLiteral[0].image;
      const parameters = this.visit(cst.parameters[0]);
      return {
        name,
        parameters,
      };
    }

    public parameters(cst: any): ReadonlyArray<any> {
      return Array.isArray(cst.value)
        ? cst.value.map(node => this.visit(node))
        : [];
    }

    public value(cst: any): any {
      if (cst.value) {
        return FormatterVisitor.extractValue(cst.value[0]);
      }

      if (cst.array) {
        return this.visit(cst.array[0]);
      }

      if (cst.object) {
        return this.visit(cst.object[0]);
      }

      throw new Error(`Unknown token entity: ${cst}`);
    }

    public array(cst: any): ReadonlyArray<any> {
      return Array.isArray(cst.value)
        ? cst.value.map(node => this.visit(node))
        : [];
    }

    public object(cst: any): Object {
      const result = {};
      if (!Array.isArray(cst.objectEntity)) {
        return result;
      }
      for (let i = 0; i < cst.objectEntity.length; i++) {
        const objectEntity = this.visit(cst.objectEntity[i]);
        result[objectEntity.key] = objectEntity.value;
      }
      return result;
    }

    public objectEntity(cst: any): KeyValuePair {
      const key = FormatterVisitor.extractString(cst.StringLiteral[0]);
      const value = this.visit(cst.value);
      return { key, value };
    }

    private static extractString(token: IToken): string {
      return token.image.slice(1, -1);
    }

    private static extractNumber(token: IToken): number {
      return Number(token.image);
    }

    private static extractValue(token: IToken): any {
      if (tokenMatcher(token, True)) {
        return true;
      }

      if (tokenMatcher(token, False)) {
        return true;
      }

      if (tokenMatcher(token, Null)) {
        return null;
      }

      if (tokenMatcher(token, StringLiteral)) {
        return FormatterVisitor.extractString(token);
      }

      if (tokenMatcher(token, NumberLiteral)) {
        return FormatterVisitor.extractNumber(token);
      }

      throw new Error(`Unknown object entity: ${token.image}`);
    }
  }

  return new FormatterVisitor();
};




