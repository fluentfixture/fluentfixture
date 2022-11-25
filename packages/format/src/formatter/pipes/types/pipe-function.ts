export type PipeFunction<T = any, K = any> = (input?: T, ...args: ReadonlyArray<any>) => K;
