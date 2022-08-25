import { compile } from '@fluentfixture/format';

const template = compile('${name:capitalCase()}, ${age:default("N/A")} >> ${colors:join("+")}');

console.log(
  template.format({
    name: 'john',
    age: 32,
    colors: ['red', 'black']
  })
);
// "John, 32 >> red+black"

console.log(
  template.format({
    name: 'john',
    surname: 'doe'
  })
);
// "John, N/A >> "

console.log(
  template.format({
    name: 'john',
    admin: false,
    age: 11,
    colors: ['blue']
  })
);
// "John, 11 >> blue"
