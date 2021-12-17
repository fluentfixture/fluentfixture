export type ExtendedObjectModel<S extends keyof any, T = any, K = any> = { [P in S]: K } & Omit<T, S>;
