import { bool, falsy, truthy } from '@fluentfixture/core';

console.log(
  bool(0.2).single()
);

console.log(
  bool(0.8).many(3)
);

console.log(
  truthy().array(3).single()
);

console.log(
  falsy().single()
);
