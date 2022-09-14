import { from, nil, undef, val } from '@fluentfixture/core';

const fn = () => Math.random() > 0.5 ? 'TRUE': 'FALSE';

/**
 * Create ten item from the given function.
 */

const stream1 = from(fn);

console.log(stream1.many(10));

/**
 * Create item from the given function or return undefined.
 */

const stream2 = stream1.optional();

console.log(stream2.single());

/**
 * Create null, undefined or the given value.
 */

console.log(nil().single());
console.log(undef().single());
console.log(val(5).single());
