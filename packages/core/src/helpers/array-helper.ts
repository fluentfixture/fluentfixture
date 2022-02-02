import { Random } from '../engine/random';

export class ArrayHelper {

  public static shuffle<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
    return Random.shuffle(array);
  }
}
