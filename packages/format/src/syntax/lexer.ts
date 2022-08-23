import { createToken, Lexer } from 'chevrotain';

/**
 * WhiteSpace
 */
export const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

/**
 * JSON Grammar
 */
export const True = createToken({
  name: 'True',
  pattern: /true/,
});

export const False = createToken({
  name: 'False',
  pattern: /false/,
});

export const Null = createToken({
  name: 'Null',
  pattern: /null/,
});

export const LeftCurly = createToken({
  name: 'LeftCurly',
  pattern: '{',
  start_chars_hint: ['{'],
});

export const RightCurly = createToken({
  name: 'RightCurly',
  pattern: '}',
  start_chars_hint: ['}'],
});

export const LeftSquare = createToken({
  name: 'LeftSquare',
  pattern: '[',
  start_chars_hint: ['['],
});

export const RightSquare = createToken({
  name: 'RightSquare',
  pattern: ']',
  start_chars_hint: [']'],
});

export const Comma = createToken({
  name: 'Comma',
  pattern: ',',
  start_chars_hint: [','],
});

export const JsonColon = createToken({
  name: 'JsonColon',
  pattern: ':',
  start_chars_hint: [':'],
});

export const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(?:[^"\\]|\\(?:["/\\bfnrtv]|u[\dA-Fa-f]{4}))*"/,
  start_chars_hint: ['"'],
});

export const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([Ee][+-]?\d+)?/,
});

/**
 * Expression Grammar
 */
export const FunctionLiteral = createToken({
  name: 'FunctionLiteral',
  pattern: /[$_a-z][\w$]*/i,
});

export const LeftParenthesis = createToken({
  name: 'LeftParenthesis',
  pattern: '(',
  start_chars_hint: ['('],
  push_mode: 'args_mode',
});

export const RightParenthesis = createToken({
  name: 'RightParenthesis',
  pattern: ')',
  start_chars_hint: [')'],
  pop_mode: true,
});

export const Colon = createToken({
  name: 'Colon',
  pattern: ':',
  start_chars_hint: [':'],
  push_mode: 'pipe_mode',
});

export const Path = createToken({
  name: 'Path',
  pattern: /([\w$\-]+)(\.[\w$\-]+)*/,
});

export const Pipe = createToken({
  name: 'Pipe',
  pattern: '|',
  start_chars_hint: ['|'],
});

export const MultiModeLexerDefinition = {
  modes: {
    args_mode: [
      WhiteSpace,
      LeftCurly,
      LeftSquare,
      RightCurly,
      StringLiteral,
      RightSquare,
      Comma,
      JsonColon,
      True,
      False,
      Null,
      NumberLiteral,
      RightParenthesis,
    ],
    path_mode: [
      Path,
      Colon,
      WhiteSpace,
    ],
    pipe_mode: [
      WhiteSpace,
      FunctionLiteral,
      LeftParenthesis,
      Pipe,
    ],
  },
  defaultMode: 'path_mode',
};

export const FormatterLexer = new Lexer(MultiModeLexerDefinition, { ensureOptimizations: true });
