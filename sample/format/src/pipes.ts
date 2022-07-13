import { Formatter, Pipes } from '@fluentfixture/format';

const reverse = (str: string): string => [...str].reverse().join('');

const pipes = Pipes.withDefaults().register('reverse', reverse);

const formatter = Formatter.create(pipes);

console.log(
  formatter.format('TEXT=${text:unknown|reverse|upper-case}', { text: 'lorem' })
);
// "TEXT=MEROL"

console.log(
  formatter.format('TEXT=${text:unknown|reverse|upper-case}', { })
);
// "TEXT=NWONKNU"
