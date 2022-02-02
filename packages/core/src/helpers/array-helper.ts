import { Random } from '../engine/random';

export class ArrayHelper {

  public static shuffle<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
    return Random.shuffle(array);
  }

  public static sample<T>(array: ReadonlyArray<T>, size: number): ReadonlyArray<T> {
    return Random.sample(array, size);
  }
}
