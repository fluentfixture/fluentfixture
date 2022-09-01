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

console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} <${balance.amount} ${balance.currency}>', source),
);

console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} BIRTH_DATE=${birthdate:date("MM-DD-YYYY")}', source),
);

console.log(
  format('${name}.${surname} > MEMBERSHIP=${memberships.0:dotCase()|upperCase()}', source),
);

console.log(
  format('NICKNAME=${name:padStart(7, "#")|padEnd(10,"#")}', source),
);
