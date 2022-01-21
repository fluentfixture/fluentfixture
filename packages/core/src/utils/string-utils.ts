import {
  capitalCase,
  camelCase,
  constantCase,
  dotCase,
  headerCase,
  paramCase,
  pascalCase,
  snakeCase,
  pathCase,
} from 'change-case';

/**
 * @todo Support all unicode letters.
 * @body change-case not support all unicode letters by default.
 */

export class StringUtils {

  public static pathCase(str: string): string {
    return pathCase(str);
  }

  public static headerCase(str: string): string {
    return headerCase(str);
  }

  public static paramCase(str: string): string {
    return paramCase(str);
  }

  public static snakeCase(str: string): string {
    return snakeCase(str);
  }

  public static pascalCase(str: string): string {
    return pascalCase(str);
  }

  public static capitalCase(str: string): string {
    return capitalCase(str);
  }

  public static camelCase(str: string): string {
    return camelCase(str);
  }

  public static constantCase(str: string): string {
    return constantCase(str);
  }

  public static dotCase(str: string): string {
    return dotCase(str);
  }
}
