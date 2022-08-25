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

export class StringUtils {

  public static upperCase(str: string): string {
    return str.toUpperCase();
  }

  public static lowerCase(str: string): string {
    return str.toLowerCase();
  }

  public static trim(str: string): string {
    return str.trim();
  }

  public static trimStart(str: string): string {
    return str.trimStart();
  }

  public static trimEnd(str: string): string {
    return str.trimEnd();
  }

  public static padStart(str: string, length: number, fill?: string): string {
    return str.padStart(length, fill);
  }

  public static padEnd(str: string, length: number, fill?: string): string {
    return str.padEnd(length, fill);
  }

  public static split(str: string, separator: string | RegExp, limit?: number): string[] {
    return str.split(separator, limit);
  }

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
