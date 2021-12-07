import { MersenneTwister19937, integer, bool, date, real, picker, sample} from 'random-js';

export class Random {
  private static readonly engine = MersenneTwister19937.autoSeed();

  public static pick<T>(list: ReadonlyArray<T>): T {
    return picker(list)(this.engine);
  }

  public static sample<T>(list: ReadonlyArray<T>, size: number): ReadonlyArray<T> {
    return sample(this.engine, list, size);
  }

  public static bool(percentage: number): boolean {
    return bool(percentage)(Random.engine);
  }

  public static date(min: Date, max: Date): Date {
    return date(min, max)(Random.engine);
  }

  public static float(min: number, max: number): number {
    return real(min, max, true)(Random.engine);
  }

  public static integer(min: number, max: number): number {
    return integer(min, max)(Random.engine);
  }
}
