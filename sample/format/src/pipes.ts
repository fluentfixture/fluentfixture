import { Formatter, Pipes } from '@fluentfixture/format';

const reverse = (str: string): string => [...str].reverse().join('');
const amount = (value: any): string => `[${value.amount} ${value.currency}]`;

const pipes = Pipes.withDefaults()
  .register('reverse', reverse)
  .register('amount', amount);

const formatter = Formatter.create(pipes);

console.log(
  formatter.format('TEXT=${text:unknown|reverse|upper-case}', { text: 'lorem' })
);
// "TEXT=MEROL"

console.log(
  formatter.format('TEXT=${text:unknown|reverse|upper-case}', { })
);
// "TEXT=NWONKNU"

console.log(
  formatter.format('AMOUNT=${balance|amount}', { balance: { amount: 12, currency: 'TRY' }})
);
// "AMOUNT=[12 TRY]"
