import { lowerCase } from 'lower-case';
import { upperCase } from 'upper-case';
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  paramCase,
  pascalCase,
  snakeCase,
} from 'change-case';
import { TransformerFactory } from '../../types/transformer-factory';
import { asString } from '../decorators/as-string';

export const addBuiltInStringTransformers = (factory: TransformerFactory): void => {
  factory.setTransformer('capital-case',asString(capitalCase));
  factory.setTransformer('camel-case',asString(camelCase));
  factory.setTransformer('constant-case',asString(constantCase));
  factory.setTransformer('dot-case',asString(dotCase));
  factory.setTransformer('header-case',asString(headerCase));
  factory.setTransformer('param-case',asString(paramCase));
  factory.setTransformer('pascal-case',asString(pascalCase));
  factory.setTransformer('snake-case',asString(snakeCase));
  factory.setTransformer('lower-case',asString(lowerCase));
  factory.setTransformer('upper-case',asString(upperCase));
  factory.setTransformer('trim',asString((str: string) => str.trim()));
  factory.setTransformer('trim-start',asString((str: string) => str.trimStart()));
  factory.setTransformer('trim-end',asString((str: string) => str.trimEnd()));
}
