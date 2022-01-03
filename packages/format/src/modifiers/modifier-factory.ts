import {
  capitalCase,
  camelCase,
  constantCase,
  dotCase,
  headerCase,
  paramCase,
  pascalCase,
  snakeCase,
} from 'change-case';
import { ExpressionModifier } from '../types/expression-modifier';
import { ModifierFactory } from '../types/modifier-factory';

export const createModifierFactory = (): ModifierFactory => {
  const modifiers = new Map<string, ExpressionModifier>([
    ['capital-case', capitalCase],
    ['camel-case', camelCase],
    ['constant-case', constantCase],
    ['dot-case', dotCase],
    ['header-case', headerCase],
    ['param-case', paramCase],
    ['pascal-case', pascalCase],
    ['snake-case', pascalCase],
    ['snake-case', snakeCase],
    ['lower-case', (str: string) => str.toLowerCase()],
    ['upper-case', (str: string) => str.toUpperCase()],
    ['trim', (str: string) => str.trim()],
    ['trim-start', (str: string) => str.trimStart()],
    ['trim-end', (str: string) => str.trimEnd()],
  ]);

  const getModifier = (name: string): ExpressionModifier => {
    if (modifiers.has(name)) {
      return modifiers.get(name);
    }
    throw new Error(`Cannot find modifier with name: ${name}!`);
  };

  const setModifier = (name: string, modifier: ExpressionModifier): void => {
    if (!name || typeof name !== 'string') {
      throw new Error(`Cannot register modifier with name: ${name}!`);
    }
    if (!modifier || typeof modifier !== 'function') {
      throw new Error('Modifier must be a function!');
    }
    if (modifiers.has(name)) {
      throw new Error(`Modifier with name: ${name} already registered!`);
    }
    modifiers.set(name, modifier);
  };

  return {
    getModifier, setModifier
  };
};

export const modifiers = createModifierFactory();
