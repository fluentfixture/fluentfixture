import { bool, falsy, truthy } from '@fluentfixture/core';

/**
 * Create a boolean mostly true
 */

const stream1 = bool(0.8);

console.log(stream1.single());

/**
 * Create ten boolean mostly false
 */

const stream2 = bool(0.2);

console.log(stream2.many(10));

/**
 * Create true
 */

const stream3 = truthy();

console.log(stream3.single());

/**
 * Create false
 */

const stream4 = falsy();

console.log(stream4.single());
