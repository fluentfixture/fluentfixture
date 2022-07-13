import { Formatter } from '@fluentfixture/format';

const formatter = Formatter.empty({
  serializers: {
    boolean: (value: boolean) => value ? 'YES' : 'NO',
    array: (value: Array<any>) => value.join('&')
  }
});

const source = {
  name: 'john',
  surname: 'doe',
  admin: true,
  memberships: ['regular', 'pro']
};

console.log(
  formatter.format('ADMIN=${admin:false} > MEMBERSHIPS=${memberships}', source)
);
// "ADMIN=YES > MEMBERSHIPS=regular&pro"

