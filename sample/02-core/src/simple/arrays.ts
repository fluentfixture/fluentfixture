import { pick, shuffle, sample } from '@fluentfixture/core';

const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

/**
 * Get a sample set from the alphabet and converts to uppercase.
 */

const stream1 = sample(alphabet, 5).map(i => i.toUpperCase());

console.log(stream1.single());

/**
 * Pick an item from the alphabet or return null.
 */

const stream2 = pick(alphabet).nullable();

console.log(stream2.single());

/**
 * Shuffle the alphabet.
 */

const stream3 = shuffle(alphabet);

console.log(stream3.single());
