export interface Factory<T = any> {

  single(): T;

  many(count: number): ReadonlyArray<T>;
}
