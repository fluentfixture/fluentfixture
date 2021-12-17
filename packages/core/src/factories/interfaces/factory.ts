export interface IFactory<T = any> {

  single(): T;

  many(count: number): ReadonlyArray<T>;
}
