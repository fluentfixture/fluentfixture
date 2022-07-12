import { instance, mock, spy, verify, when } from 'ts-mockito';
import { Template } from '@fluentfixture/format';
import { NON_NON_EMPTY_STRING_DATA_SET } from '../../data/type-sets';
import { MockFactory } from '../../mocks/mock-factory';
import { Factory } from '../../../src/factories/factory';
import { Formatter } from '../../../src/factories/decorators/formatter';
import { FormatHelper } from '../../../src/helpers/format-helper';

describe('Formatter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (template)', () => {

      test.each(NON_NON_EMPTY_STRING_DATA_SET)('should throw an error when template is not a non-empty string, given: %s', (template: any) => {

        const thrown = () => new Formatter(new MockFactory({}), template);

        expect(thrown).toThrow('[Formatter.constructor(factory, template)].[template]: Parameter must be a non-empty string!');
      });
    });
  });

  describe('.single()', () => {

    it('should create a string by using given template with the result of the given factory', () => {
      const out = 'KEY=value';
      const template = 'KEY={key}';
      const factoryOut = { 'key': 'value' };
      const mockFactory = mock(Factory);
      const mockTemplate = mock<Template>();
      const spyFormatUtils = spy(FormatHelper);

      when(mockFactory.single()).thenReturn(factoryOut);
      when(spyFormatUtils.compile(template)).thenReturn(instance(mockTemplate));
      when(mockTemplate.format(factoryOut)).thenReturn(out);

      const factory = new Formatter(instance(mockFactory), template);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.single()).once();
      verify(spyFormatUtils.compile(template)).once();
      verify(mockTemplate.format(factoryOut)).once();
    });
  });
});
