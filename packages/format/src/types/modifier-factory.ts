import { ExpressionModifier } from './expression-modifier';

export type ModifierFactory = {
  getModifier(name: string): ExpressionModifier;
  setModifier(name: string, modifier: ExpressionModifier): void;
};
