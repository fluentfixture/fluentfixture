import { Formatter } from '@fluentfixture/format';

const source = {
  name: 'John',
  surname: 'Doe',
  age: 21
};

const compiled = Formatter.create().compile('I am {name} {surname} ({age})');

console.log(compiled.format(source));
