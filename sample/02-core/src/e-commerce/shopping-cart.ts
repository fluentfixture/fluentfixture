import { alphabetic, bool, hex, int, obj, pick } from '@fluentfixture/core';

// Defines a price generator with amount and the currency fields.
const price = obj({
  amount: int(1, 100), // generates an integer between 1 and 100
  currency: pick(['USD', 'EUR', 'GBP', 'TRY']), // picks one of them
});

// Defines a color generator. (hex + pad + uppercase)
const color = hex(6).padStart(7, '#').upperCase();

// Defines a product generator.
const product = obj({
  id: int(1, 999), // generates an integer between 1 and 999
  name: alphabetic(20).capitalCase(), // generates a name with capital case
  color: color, // generates color by using the color generator
  price: price, // generates price by using the price generator
  discount: price.optional(), // generates price by using the price generator or undefined
  featured: bool(0.7), // generates a boolean that mostly true
});

// Introduces the 'code' field using the previously generated id and the color.
// By doing this, all mock products are consistent within themselves.
const productWithCode = product
  .lazy('code', (p) => `${p.id}-${p.color}`);

// Converts productWithCode generator to an array and sort them by using the id field.
const products = productWithCode
  .array(10)
  .sort((a, b) => a.id - b.id);

// Executes the model.
console.log(products.single());
