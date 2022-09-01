import { int, num, one, real, zero } from '@fluentfixture/core';

const integer = int(0, 10);

console.log(
  integer.single(),
);

console.log(
  integer.add(0.5).many(3),
);

console.log(
  real(10, 100).multiply(1.25).nullable().single(),
);

console.log(
  num(200).many(3),
);

console.log(
  one().single(),
);

console.log(
  zero().single(),
);
