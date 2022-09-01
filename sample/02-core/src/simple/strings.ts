import { alphabetic, alphanumeric, binary, hex, text } from '@fluentfixture/core';

console.log(
  alphabetic(10).upperCase().padStart(15, '#').single(),
);

console.log(
  hex(6).single(),
);

console.log(
  binary(8).many(4),
);

console.log(
  text('Constant Test').dotCase().upperCase().single(),
);

console.log(
  text('Constant Test').split(',').map(i => i.toLowerCase()).join('+').single(),
);

console.log(
  alphanumeric(3).single()
);
