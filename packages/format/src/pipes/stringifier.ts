import { TypeEnum, TypeUtils } from '@fluentfixture/shared';
import { Serializer } from '../option/types/serializer';
import { Serializers } from '../option/types/serializers';
import { PipeFactory } from './factory/pipe-factory';
import { Pipe } from './pipe';

/**
 * `Stringifier` pipe converts any input into string.
 * @class
 * @template T
 * @extends Pipe.<T,string>
 */
export class Stringifier<T = any> extends Pipe<T, string> {
  private readonly factory: PipeFactory;
  private readonly serializers: Serializers;

  /**
   * Creates an instance of `Stringifier`.
   * @constructor
   * @param {PipeFactory} [factory] - pipe factory
   * @param {Serializers} [serializers] - serializers
   */
  public constructor(factory: PipeFactory, serializers: Serializers) {
    super();
    this.factory = factory;
    this.serializers = serializers;
  }

  /**
   * Converts the given input into string.
   * @public
   * @param {T} [input] - input
   * @returns {string}
   */
  public handle(input: T): string {
    const type = TypeUtils.getType(input);

    switch (type) {
      case TypeEnum.NULL:
        return this.stringify(input, this.serializers.null);
      case TypeEnum.UNDEFINED:
        return this.stringify(input, this.serializers.undefined);
      case TypeEnum.DATE:
        return this.stringify(input, this.serializers.date);
      case TypeEnum.NUMBER:
        return this.stringify(input, this.serializers.number);
      case TypeEnum.STRING:
        return this.stringify(input, this.serializers.string);
      case TypeEnum.BOOLEAN:
        return this.stringify(input, this.serializers.boolean);
      case TypeEnum.SYMBOL:
        return this.stringify(input, this.serializers.symbol);
      case TypeEnum.ARRAY:
        return this.stringify(input, this.serializers.array);
      case TypeEnum.OBJECT:
        return this.stringify(input, this.serializers.object);
      case TypeEnum.FUNCTION:
        return this.stringify(input, this.serializers.object);
      case TypeEnum.UNKNOWN:
        return this.stringify(input, this.serializers.unknown);
    }

    return this.stringify(input, null);
  }

  private stringify(input: T, serializer: Serializer): string {
    if (!!serializer) {
      return TypeUtils.isString(serializer) ? this.factory.get(serializer).handle(input) : serializer(input);
    }

    return TypeUtils.isString(input) ? input : TypeUtils.isAssigned(input) ? input.toString() : '';
  }
}
