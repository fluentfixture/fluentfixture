import { alphabetic, alphanumeric, binary, hex, octal, text } from '@fluentfixture/core';

// Create an alphabetic string with 10 characters and pad from start.
const stream1 = alphabetic(10).upperCase().padStart(15, '#');

console.log(stream1.single());

// Create an alphanumeric string with 10 characters.
const stream2 = alphanumeric(10).upperCase();

console.log(stream2.single());

// Create a http header name from text.
const stream3 = text('content type').headerCase();

console.log(stream3.single());

// Create hex, binary and octal strings with 10 items.
console.log(hex(10).single());
console.log(binary(10).single());
console.log(octal(10).single());
