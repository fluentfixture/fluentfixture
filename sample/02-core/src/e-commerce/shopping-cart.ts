import { alphabetic, alphanumeric, bool, hex, int, obj, pick, val } from '@fluentfixture/core';

// Defines a price generator with amount and the currency fields.
const price = obj({
  amount: int(100, 1000),
  currency: pick(['USD', 'EUR', 'GBP', 'TRY']),
});

// Defines a color generator. (hex + pad + uppercase)
const color = hex(6).padStart(7, '#').upperCase();

// Defines a category with constant id.
const category = obj({
  id: val(5),
  code: alphanumeric().upperCase()
})

// Defines a product generator.
const product = obj({
  id: int(1, 999),
  name: alphabetic(10, 20).capitalCase(),
  category: category.memo(),
  description: alphabetic(20, 40).optional(),
  color: color,
  price: price,
  hasStock: bool(0.5),
});

// Adds 'code' field using generated values.
// Iterates the model.
// Sorts the generated models.
const products = product
  .lazy('code', (p) => `${p.id}-${p.color}`)
  .array(10)
  .sort((a, b) => a.price.amount - b.price.amount);

console.log(products.single());
