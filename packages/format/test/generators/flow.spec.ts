import { instance, mock, verify, when } from 'ts-mockito';
import { Generator } from '../../src/generators/generator'
import { Flow } from '../../src/generators/flow';

describe('Flow', () => {

  describe('.process()', () => {

    it('should generate the result by using the given generators and the given input', () => {
      const mockGenerator1 = mock<Generator>();
      const mockGenerator2 = mock<Generator>();
      const input = 'input';
      const output1 = 'output-1';
      const output2 = 'output-2';

      when(mockGenerator1.process(input)).thenReturn(output1);
      when(mockGenerator2.process(output1)).thenReturn(output2);

      const generator = new Flow([instance(mockGenerator1), instance(mockGenerator2)]);

      expect(generator.process(input)).toBe(output2);
      verify(mockGenerator1.process(input)).once();
      verify(mockGenerator2.process(output1)).once();
    });
  });
});
