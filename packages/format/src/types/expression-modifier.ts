import { TokenMetadata } from './token-metadata';

export type ExpressionModifier = (output: string, source: any, metadata: TokenMetadata) => string;
