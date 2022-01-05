import { instance, mock, spy, verify, when } from 'ts-mockito';
import { NON_NON_EMPTY_STRING_DATA_SET } from '../../data/type-sets';
import { MockFactory } from '../../mocks/mock-factory';
import { Factory } from '../../../src/factories/factory';
import { Formatter } from '../../../src/factories/converters/formatter';
import { FormatUtils } from '../../../src/utils/format-utils';

describe('Formatter', () => {

  describe('.constructor()', () => {

    describe('parameter assertions (template)', () => {

      test.each(NON_NON_EMPTY_STRING_DATA_SET)('should throw an error when template is not a non-empty string, given: %s', (template: any) => {

        const thrown = () => new Formatter(new MockFactory({}), template);

        expect(thrown).toThrow('Parameter must be a non-empty string.');
      });
    });
  });

  describe('.single()', () => {

    it('should create a string by using given template with the result of the given factory', () => {
      const out = 'KEY=value';
      const template = 'KEY={key}';
      const factoryOut = { 'key': 'value' };
      const mockFactory = mock(Factory);
      const compiledFormatter = { format: (source: any) => null };
      const spyFormatUtils = spy(FormatUtils);
      const spyCompiledFormatter = spy(compiledFormatter);

      when(mockFactory.single()).thenReturn(factoryOut);
      when(spyFormatUtils.compile(template)).thenReturn(compiledFormatter.format);
      when(spyCompiledFormatter.format(factoryOut)).thenReturn(out);

      const factory = new Formatter(instance(mockFactory), template);

      const result = factory.single();

      expect(result).toBe(out);
      verify(mockFactory.single()).once();
      verify(spyFormatUtils.compile(template)).once();
      verify(spyCompiledFormatter.format(factoryOut)).once();
    });
  });
});
