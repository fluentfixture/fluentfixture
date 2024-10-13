import { alphabetic, bool, hex, int, obj, pick } from '@fluentfixture/core';

// Defines a price generator with amount and the currency fields.
const price = obj({
  amount: int(100, 1000).add(0.95),
  currency: pick(['USD', 'EUR', 'GBP', 'TRY']),
});

// Defines a color generator. (hex + pad + uppercase)
const color = hex(6).padStart(7, '#').upperCase();

// Defines a category with constant id.
const category = obj({
  id: int(1, 100),
  name: alphabetic().headerCase(),
  type: alphabetic(4, 8).memo()
})

// Defines a product generator.
const product = obj({
  id: int(1, 999),
  name: alphabetic(10, 20).capitalCase(),
  category: category,
  description: alphabetic(20, 40).optional(),
  hasStock: bool(0.5),
  color: color,
  price: price,
});

// 1) Adds 'code' field using generated values.
// 2) Iterates the model.
// 3) Sorts the generated models by their prices.
const products = product
  .lazy('code', (p) => `${p.id}-${p.color}`)
  .array(10)
  .sort((a, b) => a.price.amount - b.price.amount);

// Print all products
console.log(products.single());

// Print details of the first product.
console.log(product.format('[${id}] ${name:titleCase()} => ${price.amount}'));
