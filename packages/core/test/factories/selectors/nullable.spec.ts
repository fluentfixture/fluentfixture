import { MockFactory } from '../../mocks/mock-factory';
import { ValueAdapter } from '../../../src/factories/adapters/value-adapter';
import { Nullable } from '../../../src/factories/selectors/nullable';

describe('Nullable', () => {

  describe('.constructor()', () => {

    it('should create a selector with given factory and value adapter with null', () => {
      const percentage = 0.5;
      const factory = new MockFactory({});
      const nullable = new Nullable(factory, percentage);

      const valueAdapter = nullable.getFactory2() as ValueAdapter;
      expect(nullable.getFactory1()).toBe(factory);
      expect(nullable.getPercentage()).toBe(percentage);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBeNull();
    });
  });
});
