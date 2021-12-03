export interface Factory<OUT = any> {
  single(): OUT;

  many(count: number): ReadonlyArray<OUT>;
}
