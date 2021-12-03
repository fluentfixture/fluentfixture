import { MersenneTwister19937, integer } from 'random-js';

export class Random {
  private static readonly engine = MersenneTwister19937.autoSeed();

  public static integer(min: number, max: number): number {
    return integer(min, max)(Random.engine);
  }
}
