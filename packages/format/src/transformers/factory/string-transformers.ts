import { StringUtils } from '@fluentfixture/shared';
import { TransformerFactory } from '../../types/transformer-factory';
import { asString } from '../decorators/as-string';

export const addBuiltInStringTransformers = (factory: TransformerFactory): void => {
  factory.setTransformer('capital-case',asString((i) => StringUtils.capitalCase(i)));
  factory.setTransformer('camel-case',asString((i) => StringUtils.camelCase(i)));
  factory.setTransformer('constant-case',asString((i) => StringUtils.constantCase(i)));
  factory.setTransformer('dot-case',asString((i) => StringUtils.dotCase(i)));
  factory.setTransformer('header-case',asString((i) => StringUtils.headerCase(i)));
  factory.setTransformer('param-case',asString((i) => StringUtils.paramCase(i)));
  factory.setTransformer('pascal-case',asString((i) => StringUtils.pascalCase(i)));
  factory.setTransformer('snake-case',asString((i) => StringUtils.snakeCase(i)));
  factory.setTransformer('lower-case',asString((i) => StringUtils.lowerCase(i)));
  factory.setTransformer('upper-case',asString((i) => StringUtils.upperCase(i)));
  factory.setTransformer('trim',asString((str: string) => str.trim()));
  factory.setTransformer('trim-start',asString((str: string) => str.trimStart()));
  factory.setTransformer('trim-end',asString((str: string) => str.trimEnd()));
}
