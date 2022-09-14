import { int, num, one, real, zero } from '@fluentfixture/core';

/**
 * Create ten integer between 1 and 100.
 */

const stream1 = int(0, 100);

console.log(stream1.many(10));

/**
 * Create ten number between 1.5 and 100.5
 */

const stream2 = int(1, 100).add(0.5);

console.log(stream2.many(10));

/**
 * Create ten number between 1.5 and 100.5 and sort ascending.
 */

const stream3 = stream2.array(10).sort((a, b) => a - b);

console.log(stream3.single());

/**
 * Create ten float between 1 and 100.
 */

const stream4 = real(0, 100);

console.log(stream4.many(10));

/**
 * Create zero, one and the given number
 */

console.log(zero().single());
console.log(one().single());
console.log(num(10).single());
