import { Random } from '../engine/random';

export class ArrayHelper {

  public static pick<T>(array: ReadonlyArray<T>): T {
    return Random.pick(array);
  }

  public static shuffle<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
    return Random.shuffle(array);
  }
}
