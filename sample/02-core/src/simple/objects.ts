import { int, obj, pick } from '@fluentfixture/core';

// Create a price object.
const stream1 = obj({
  amount: int(1, 100),
  currency: pick(['USD', 'EUR', 'GBP', 'TRY']),
});

console.log(stream1.single());

// Create ten price and sort by amount.
const stream2 = stream1.array(10).sort((a, b) => a.amount - b.amount);

console.log(stream2.single());

// Add a label field to price by using the created fields.
const stream3 = stream1.lazy('label', (p) => `[${p.amount} ${p.currency}]`);

console.log(stream3.single());
