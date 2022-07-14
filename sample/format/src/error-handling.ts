import { Formatter, Pipes } from '@fluentfixture/format';

const amount = (value: any): string => `[${value.amount} ${value.currency}]`;

const pipes = Pipes.withDefaults()
  .register('amount', amount);

const safeFormatter = Formatter.create(pipes);
const unsafeFormatter = Formatter.create(pipes, { ignoreErrors: false });

console.log(
  safeFormatter.format('BALANCE=${balance|amount}', { balance: null})
);
// "BALANCE="

try {
  unsafeFormatter.format('BALANCE=${balance|amount}', { balance: null});
} catch (error) {
  console.log(error);
  // "TypeError: Cannot read property 'amount' of null"
}
