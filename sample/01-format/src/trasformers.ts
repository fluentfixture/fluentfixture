import { Formatter, Pipes } from '@fluentfixture/format';

const email = (value: any, domain: string = 'example.com'): string => `${value}@${domain}`;

const pipes = Pipes.withDefaults()
  .register('email', email);

const source = {
  name: 'John',
  surname: 'DOE',
  username: 'John.DOE'
};

const formatter = Formatter.create(pipes);

console.log(
  formatter.format('USER=${name}, ${surname} > ${username:email()|lowerCase()}', source)
);

console.log(
  formatter.format('USER=${name}, ${surname} > ${username:email("test.com")|lowerCase()}', source)
);
