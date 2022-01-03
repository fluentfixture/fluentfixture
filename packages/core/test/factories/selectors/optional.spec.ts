import { MockFactory } from '../../mocks/mock-factory';
import { Optional } from '../../../src/factories/selectors/optional';
import { ValueAdapter } from '../../../src/factories/adapters/value-adapter';

describe('Optional', () => {

  describe('.constructor()', () => {

    it('should create a selector with given tokenEvaluatorFactory and value adapter with undefined', () => {
      const percentage = 0.5;
      const factory = new MockFactory({});
      const optional = new Optional(factory, percentage);

      const valueAdapter = optional.getFactory2() as ValueAdapter;
      expect(optional.getFactory1()).toBe(factory);
      expect(optional.getPercentage()).toBe(percentage);
      expect(valueAdapter).toBeInstanceOf(ValueAdapter);
      expect(valueAdapter.getValue()).toBeUndefined();
    });
  });
});
