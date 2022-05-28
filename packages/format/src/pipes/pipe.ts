export abstract class Pipe<T = any, K = any> {

  public abstract handle(input?: T): K;
}
