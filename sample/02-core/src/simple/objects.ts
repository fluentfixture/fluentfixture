import { alphabetic, int, obj, pick } from '@fluentfixture/core';

const balance = obj({
  price: int(1, 100),
  currency: pick(['USD', 'EUR', 'GBP', 'TRY']),
});

console.log(
  balance.single(),
);

const product = obj({
  name: alphabetic(10).capitalCase(),
  balance,
});

console.log(
  product.array(3).sort((p1, p2) => p1.balance.price - p2.balance.price).single(),
);

const extendedProduct = product
  .static('category', 'FASHION')
  .dynamic('stock', int(1, 3));

console.log(
  extendedProduct.single(),
);
