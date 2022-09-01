import { date, now, tomorrow, yesterday } from '@fluentfixture/core';

console.log(
  date(new Date(), new Date()).single(),
);

console.log(
  now().addDays(2).many(3),
);

console.log(
  tomorrow().addYears(1).single(),
);

console.log(
  yesterday().subtractMilliseconds(100).optional().single(),
);
