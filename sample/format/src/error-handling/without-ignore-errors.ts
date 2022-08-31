import { Formatter, Pipes } from '@fluentfixture/format';

const amount = (value: any, capital: boolean): string =>
  `[${value.amount} ${capital ? value.currency.toUpperCase() : value.currency}]`;

const pipes = Pipes.withDefaults()
  .register('amount', amount);

const formatter = Formatter.create(pipes, { ignoreErrors: false });

/**
 * Working example
 */
console.log(
  formatter.format('BALANCE=${balance:amount(true)}', { balance: { amount: 10, currency: 'usd' } })
);
// BALANCE=[100 USD]

/**
 * `balance` is null.
 */
try {
  formatter.format('BALANCE=${balance:amount(true)}', { balance: null});
} catch (error) {
  console.log(error);
  // TypeError: Cannot read property 'amount' of null
}

/**
 * Syntax error.
 */
try {
  formatter.format('BALANCE=${balance:amount}', { balance: null});
} catch (error) {
  console.log(error);
  // Parsing error: Expecting token of type --> LeftParenthesis <-- but found --> '' <--
}
