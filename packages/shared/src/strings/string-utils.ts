import { Case } from 'change-case-all';

export class StringUtils {

  public static upperCase(str: string): string {
    return Case.upper(str);
  }

  public static lowerCase(str: string): string {
    return Case.lower(str);
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
    return Case.path(str);
  }

  public static headerCase(str: string): string {
    return Case.train(str);
  }

  public static paramCase(str: string): string {
    return Case.kebab(str);
  }

  public static snakeCase(str: string): string {
    return Case.snake(str);
  }

  public static pascalCase(str: string): string {
    return Case.pascal(str);
  }

  public static capitalCase(str: string): string {
    return Case.capital(str);
  }

  public static camelCase(str: string): string {
    return Case.camel(str);
  }

  public static constantCase(str: string): string {
    return Case.constant(str);
  }

  public static dotCase(str: string): string {
    return Case.dot(str);
  }
}
