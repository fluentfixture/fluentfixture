import { Serializer } from './serializer';

export interface Serializers {
  null?: Serializer<null>;
  undefined?: Serializer<undefined>;
  number?: Serializer<number>;
  string?: Serializer<string>;
  boolean?: Serializer<boolean>;
  date?: Serializer<Date>;
  symbol?: Serializer<Symbol>;
  array?: Serializer<Array<any>>;
  function?: Serializer<Function>;
  object?: Serializer<object>;
  unknown?: Serializer<unknown>;
}
