import { compile } from '@fluentfixture/format';

const template = compile('FULL_NAME=${surname:n/a|upper-case}, ${name:n/a|capital-case} >> AGE=${age:n/a} ADMIN=${admin:false}');

console.log(
  template.format({
    name: 'john',
    surname: 'doe',
    admin: true,
    age: 32
  })
);
// "FULL_NAME=DOE, John >> AGE=32 ADMIN=true"

console.log(
  template.format({
    name: 'john',
    surname: 'doe'
  })
);
// "FULL_NAME=DOE, John >> AGE=n/a ADMIN=false"

console.log(
  template.format({
    name: 'john',
    admin: false,
    age: 11
  })
);
// "FULL_NAME=N/A, John >> AGE=11 ADMIN=false"
