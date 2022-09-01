import { from, nil, pick, shuffle, take, undef, val } from '@fluentfixture/core';

console.log(
  val(12).many(3),
);

console.log(
  pick([1, 2, 3]).single(),
);

console.log(
  take([1, 2, 3], 2).single(),
);

console.log(
  shuffle([1, 2, 3]).single(),
);

console.log(
  from(() => false).single(),
);

console.log(
  undef().single(),
);

console.log(
  nil().single(),
);
