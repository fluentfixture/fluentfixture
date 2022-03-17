import { StringUtils } from '@fluentfixture/shared';
import { TemplateParser } from './parsers/template-parser';
import { GeneratorBuilder } from './generators/builder/generator-builder';
import { TokenParser } from './parsers/token-parser';
import { GeneratorFactory } from './generators/factory/generator-factory';
import { Stringifier } from './generators/stringifier';
import { GeneratorFunction } from './types/generator-function';
import { Generator } from './generators/generator';
import { asGenerator, combine } from './helpers/generators';

const tokenParser = new TokenParser();
const generatorFactory = new GeneratorFactory();
const generatorBuilder = new GeneratorBuilder(tokenParser, generatorFactory);
const templateParser = new TemplateParser(generatorBuilder);
const stringifier = new Stringifier();

const createStringGenerator = (generator: GeneratorFunction<any, string>): Generator<any, string> => {
  return combine(stringifier, asGenerator(generator));
};

generatorFactory.setGenerator('lower-case', createStringGenerator(StringUtils.lowerCase));
generatorFactory.setGenerator('upper-case', createStringGenerator(StringUtils.upperCase));
generatorFactory.setGenerator('constant-case', createStringGenerator(StringUtils.constantCase));
generatorFactory.setGenerator('dot-case', createStringGenerator(StringUtils.dotCase));
generatorFactory.setGenerator('header-case', createStringGenerator(StringUtils.headerCase));
generatorFactory.setGenerator('param-case', createStringGenerator(StringUtils.paramCase));
generatorFactory.setGenerator('pascal-case', createStringGenerator(StringUtils.pascalCase));
generatorFactory.setGenerator('snake-case', createStringGenerator(StringUtils.snakeCase));
generatorFactory.setGenerator('capital-case', createStringGenerator(StringUtils.capitalCase));
generatorFactory.setGenerator('camel-case', createStringGenerator(StringUtils.camelCase));
generatorFactory.setGenerator('trim', createStringGenerator(StringUtils.trim));
generatorFactory.setGenerator('trim-start', createStringGenerator(StringUtils.trimStart));
generatorFactory.setGenerator('trim-end', createStringGenerator(StringUtils.trimEnd));
generatorFactory.setGenerator('iso-date', asGenerator((i: Date) => i.toISOString()));

export const parser = templateParser;
