import { Serializer } from './serializer';

/**
 * `Serializers` options of formatter.
 * @interface
 */
export interface Serializers {
  /**
   * Serializer pipe name or function for null values.
   */
  null?: Serializer<null>;

  /**
   * Serializer pipe name or function for undefined values.
   */
  undefined?: Serializer<undefined>;

  /**
   * Serializer pipe name or function for numeric values.
   */
  number?: Serializer<number>;

  /**
   * Serializer pipe name or function for string values.
   */
  string?: Serializer<string>;

  /**
   * Serializer pipe name or function for boolean values.
   */
  boolean?: Serializer<boolean>;

  /**
   * Serializer pipe name or function for date values.
   */
  date?: Serializer<Date>;

  /**
   * Serializer pipe name or function for symbol values.
   */
  symbol?: Serializer<Symbol>;

  /**
   * Serializer pipe name or function for array values.
   */
  array?: Serializer<Array<any>>;

  /**
   * Serializer pipe name or function for function values.
   */
  function?: Serializer<Function>;

  /**
   * Serializer pipe name or function for object values.
   */
  object?: Serializer<object>;

  /**
   * Serializer pipe name or function for unknown values.
   */
  unknown?: Serializer<unknown>;
}
