import { int } from '@fluentfixture/core';

const format = int(1, 100).format('NUM#{}');

console.log(format.single());
