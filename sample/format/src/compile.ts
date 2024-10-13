import { compile } from '@fluentfixture/format';

const template = compile('${name:capitalCase()}, ${age:default("N/A")} >> ${colors:join("+")}');

console.log(
  template.format({
    name: 'john',
    age: 32,
    colors: ['red', 'black']
  })
);

console.log(
  template.format({
    name: 'john',
    surname: 'doe'
  })
);

console.log(
  template.format({
    name: 'john',
    admin: false,
    age: 11,
    colors: ['blue']
  })
);
