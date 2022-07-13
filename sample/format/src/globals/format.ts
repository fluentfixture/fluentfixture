import { format } from '@fluentfixture/format';

const source = {
  name: 'john',
  surname: 'doe',
  email: 'doe@example.com',
  birthdate: new Date(1_617_258_460_000), // GMT: Thursday, 1 April 2021 06:27:40
  balance: {
    amount: 120,
    currency: 'USD'
  },
  memberships: ['regular user', 'pro user']
};

console.log(
  format('${surname}, ${name} <${balance.amount} ${balance.currency}>', source)
);
// "doe, john <120 USD>"

console.log(
  format('${surname|upper-case}, ${name|capital-case} <${balance.amount} ${balance.currency}>', source)
);
// "DOE, John <120 USD>"

console.log(
  format('${surname|upper-case}, ${name|capital-case} BIRTH_DATE=${birthdate|MM-DD-YYYY}', source)
);
// "DOE, John BIRTH_DATE=04-01-2021"

console.log(
  format('${name}.${surname} > MEMBERSHIP=${memberships.0:unknown|dot-case|upper-case}', source)
);
// "john.doe > MEMBERSHIP=REGULAR.USER"
