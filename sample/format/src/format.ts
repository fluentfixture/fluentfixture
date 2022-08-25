import { format } from '@fluentfixture/format';

const source = {
  name: 'john',
  surname: 'doe',
  email: 'doe@example.com',
  birthdate: new Date(1_617_258_460_000), // GMT: Thursday, 1 April 2021 06:27:40
  balance: {
    amount: 120,
    currency: 'USD',
  },
  memberships: ['regular user', 'pro user'],
};

console.log(
  format('${surname}, ${name} <${balance.amount} ${balance.currency}>', source),
);
// "doe, john <120 USD>"

console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} <${balance.amount} ${balance.currency}>', source),
);
// "DOE, John <120 USD>"

console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} BIRTH_DATE=${birthdate:date("MM-DD-YYYY")}', source),
);
// "DOE, John BIRTH_DATE=04-01-2021"

console.log(
  format('${name}.${surname} > MEMBERSHIP=${memberships.0:dotCase()|upperCase()}', source),
);
// "john.doe > MEMBERSHIP=REGULAR.USER"

console.log(
  format('NICKNAME=${name:padStart(7, "#")|padEnd(10,"#")}', source),
);
// "NICKNAME=###john####"
