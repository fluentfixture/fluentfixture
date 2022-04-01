import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { PipeFactory } from '../../src/pipes/factory/pipe-factory';
import { Stringifier } from '../../src/pipes/stringifier';
import { Pipe } from '../../src/pipes/pipe';

describe('Stringifier', () => {

  const cases = [
    [null], [undefined], [1], [''], [true],
    [Symbol.for('')], [new Date()],
    [() => true], [[]], [{}], [/[A-Z]/g]
  ];
  const pipe = 'PIPE';
  const output = 'OUTPUT';
  const pipeFunction = () => output;
  const mockPipe = mock<Pipe>();

  describe('.handle()', () => {

    describe('with string pipes', () => {

      const mockPipeFactory = mock<PipeFactory>();
      const serializers = {
        null: pipe,
        undefined: pipe,
        number: pipe,
        string: pipe,
        boolean: pipe,
        date: pipe,
        symbol: pipe,
        array: pipe,
        function: pipe,
        object: pipe,
        unknown: pipe
      };

      const stringifier = new Stringifier(instance(mockPipeFactory), serializers);

      afterEach(() => {
        reset(mockPipe);
        reset(mockPipeFactory);
      });

      test.each(cases)('should use string pipe for the given data type: %p', (input: unknown) => {

        when(mockPipeFactory.get(pipe)).thenReturn(instance(mockPipe));
        when(mockPipe.handle(input)).thenReturn(output);

        const result = stringifier.handle(input);

        expect(result).toBe(output);
        verify(mockPipeFactory.get(pipe)).once();
        verify(mockPipe.handle(input)).once();
      });
    });

    describe('with function pipes', () => {

      const mockPipeFactory = mock<PipeFactory>();
      const serializers = {
        null: pipeFunction,
        undefined: pipeFunction,
        number: pipeFunction,
        string: pipeFunction,
        boolean: pipeFunction,
        date: pipeFunction,
        symbol: pipeFunction,
        array: pipeFunction,
        function: pipeFunction,
        object: pipeFunction,
        unknown: pipeFunction
      };

      const stringifier = new Stringifier(instance(mockPipeFactory), serializers);

      afterEach(() => {
        reset(mockPipe);
        reset(mockPipeFactory);
      });

      test.each(cases)('should use function pipe for the given data type: %p', (input: unknown) => {

        const result = stringifier.handle(input);

        expect(result).toBe(output);
        verify(mockPipeFactory.get(anything())).never();
        verify(mockPipe.handle(anything())).never();
      });
    });

    describe('without pipes', () => {

      const mockPipeFactory = mock<PipeFactory>();
      const serializers = {
        null: null,
        undefined: null,
        number: null,
        string: null,
        boolean: null,
        date: null,
        symbol: null,
        array: null,
        function: null,
        object: null,
        unknown: null
      };

      const stringifier = new Stringifier(instance(mockPipeFactory), serializers);

      afterEach(() => {
        reset(mockPipe);
        reset(mockPipeFactory);
      });

      test.each(cases)('should not use any pipe for the given data type: %p', (input: unknown) => {

        const result = stringifier.handle(input);
        const expected = input === undefined || input === null ? '' : input.toString();

        expect(result).toBe(expected);
        verify(mockPipeFactory.get(anything())).never();
        verify(mockPipe.handle(anything())).never();
      });
    });
  });
});
