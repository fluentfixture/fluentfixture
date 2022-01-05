# @fluentfixture/format

```@fluentfixture/format``` is a small string interpolation library that supports default values and transforms.

## Installation

```
$ npm install @fluentfixture/format
```

## Example

```typescript
import { format, compile } from '@fluentfixture/format';

const product = {
  id: 100,
  name: 'Dress',
  price: {
    amount: 9.99,
    currency: 'USD'
  },
  categories: ['fashion', 'dress']
};

// format function formats the given object with the given template directly into a string.
const output = format('Name={name|upper-case}, Price={price.amount} {price.currency:EUR}, Category={categories.0:no-cat}', product);

// ompile function returns precompiled expression that highly optimized way for repeating operations.
const compiled = compile('Name={name|upper-case}, Price={price.amount} {price.currency:EUR}, Category={categories.0:no-cat}');

console.log(output);
// > 'Name=DRESS, Price=9.99 USD, Category=fashion'

console.log(compiled(product));
// > 'Name=DRESS, Price=9.99 USD, Category=fashion'
```

## Syntax

```@fluentfixture/format``` supports default values and transforms. Library parses the expression according to the following syntax:

```{selector:default-value|transform-1|transform-n|}```

After the calculation and default value checks, the given transforms are executed synchronously. Each transform accepts the result of the previous one.

| Expression                   | Selector   | Default | Transforms |
|------------------------------|------------|---------|------------|
| { exp : def &#124; t1 }      | PATH (exp) | def     | t1         |
| { exp  &#124; t1 &#124; t2 } | PATH (exp) | *N/A*   | t1, t2     |
| { exp : def }                | PATH (exp) | def     | *N/A*      |
| { exp : &#124; t1 }          | PATH (exp) |         | t1         |
| { : &#124; t1 }              | SELF       |         | t1         |

### Selector Syntax

```@fluentfixture/format``` supports two types of selectors:
- Path: [Object-Path][3] as a selector library. So, any valid [Object-Path][3] selector is allowed.
- Self: If the selector is empty, whole object is used. In this way, any primitive objects are supported.

### Transforms

```@fluentfixture/format``` supports lots of built-in transforms.

| Transform         | Operation                | Documentation |
|-------------------|--------------------------|---------------|
| **lower-case**    | lower case conversion    | [source][1]   |
| **upper-case**    | upper case conversion    | [source][1]   |
| **constant-case** | constant case conversion | [source][2]   |
| **dot-case**      | dot case conversion      | [source][2]   |
| **header-case**   | header case conversion   | [source][2]   |
| **param-case**    | param case conversion    | [source][2]   |
| **pascal-case**   | pascal case conversion   | [source][2]   |
| **snake-case**    | snake case conversion    | [source][2]   |
| **capital-case**  | capital case conversion  | [source][2]   |
| **camel-case**    | camel case conversion    | [source][2]   |
| **trim**          | trim string              | [source][1]   |
| **trim-start**    | trim string from start   | [source][1]   |
| **trim-end**      | trim string from end     | [source][1]   |
| **iso-date**      | ISO date conversion      | [source][4]   |

## Compile vs Format

Benchmarks show that ```compile()``` is much faster than ```format()``` method for repeating operations.

| Input Length | Format                    | Compile                  |
|--------------|---------------------------|--------------------------|
| 100          | x 48,454 ops/sec ±29.97%  | x 160,238 ops/sec ±6.53% |
| 500          | x 22,094 ops/sec ±2.72%   | x 33,938 ops/sec ±6.30%  | 
| 1000         | x 8,392 ops/sec ±13.74%   | x 20,805 ops/sec ±3.55%  |

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[2]: https://github.com/blakeembrey/change-case
[3]: https://github.com/mariocasciaro/object-path
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
