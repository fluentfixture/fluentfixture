<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible tool for generating customizable mock data with fluent interface 🚀</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fluentfixture/core" target="_blank"><img src="https://img.shields.io/npm/v/@fluentfixture/core.svg" alt="NPM Version"/></a>
  <a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank"><img src="https://img.shields.io/npm/l/@fluentfixture/core.svg" alt="Package License" /></a>
  <a href="https://dl.circleci.com/status-badge/redirect/gh/fluentfixture/fluentfixture/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/gh/fluentfixture/fluentfixture/tree/main.svg?style=svg" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/fluentfixture/fluentfixture?branch=main" target="_blank"><img src="https://coveralls.io/repos/github/fluentfixture/fluentfixture/badge.svg?branch=main#9" alt="Coverage" /></a>
  <a href="https://snyk.io/test/github/fluentfixture/fluentfixture" target="_blank"><img src="https://snyk.io/test/github/fluentfixture/fluentfixture/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://www.codefactor.io/repository/github/fluentfixture/fluentfixture" target="_blank"><img src="https://www.codefactor.io/repository/github/fluentfixture/fluentfixture/badge" alt="CodeFactor"/></a>
  <a href="https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/02-core" target="_blank"><img src="https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox" alt="Open in CodeSandbox"/></a>
  <a href="https://docs.fluentfixture.com" target="_blank"><img src="https://img.shields.io/badge/Open%20in-GitBook-yellow?style=flat-square&logo=gitbook" alt="Open in CodeSandbox"/></a>
</p>

## Philosophy

> In Informatics, dummy data is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present.
> Dummy data can be used as a placeholder for both testing and operational purposes.
> For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. (↪[wiki](https://en.wikipedia.org/wiki/Dummy_data))

Generating dummy data is crucial in software development. The quality of test data directly impacts development quality and velocity. 
There are many dummy data generators in the JavaScript ecosystem. However, creating complex objects and responding to real-world use cases can be challenging.

The [@fluentfixture][fluentfixture] aims to provide a fluent interface and an extensible architecture for generating dummy data.

> The [@fluentfixture][fluentfixture] doesn't provide predefined data like FakerJS but offers multiple adapters for integration with external libraries.

## Documentation

Visit [https://docs.fluentfixture.com](https://docs.fluentfixture.com) to view the full documentation.

## Introduction

### Core (@fluentfixture/core)

The [@fluentfixture/core][fluentfixture-core] package offers various data generators for various use cases. Each of them supports a fluent interface with standard manipulation, sorting, and debugging features.

**Installation**

```bash
$ npm install @fluentfixture/core
```

**Example**

Let us consider the following requirements. We need;
- 100 products that are ordered by their prices.
- Each product has a code field with the "id-color" format calculated using generated values.
- Each product has the same category with "id" is 5.
- Half of them have stock.

```ts
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
```

### Format (@fluentfixture/format)

The [@fluentfixture/format][fluentfixture-format] is a flexible string format library.
Provides formatting and compiling functionalities with extensible transformation capabilities.

**Installation**

```bash
$ npm install @fluentfixture/format
```

**Example**

```ts
import { format } from '@fluentfixture/format';

const source = {
  name: 'john',
  surname: 'doe',
  email: 'doe@example.com',
  birthdate: new Date(1_617_258_460_000), // GMT: Thursday, 1 April 2021 06:27:40
  balance: {
    amount: 120,
    currency: 'USD',
  },
  memberships: ['regular user', 'pro user'],
};

console.log(
  format('${surname}, ${name} <${balance.amount} ${balance.currency}>', source),
);

console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} <${balance.amount} ${balance.currency}>', source),
);

console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} BIRTH_DATE=${birthdate:date("MM-DD-YYYY")}', source),
);

console.log(
  format('${name}.${surname} > MEMBERSHIP=${memberships.0:dotCase()|upperCase()}', source),
);

console.log(
  format('NICKNAME=${name:padStart(7, "#")|padEnd(10,"#")}', source),
);
```

## License

@fluentfixture is [MIT](https://github.com/fluentfixture/fluentfixture/blob/main/LICENSE) licensed.

[fluentfixture]: https://docs.fluentfixture.com
[fluentfixture-core]: https://docs.fluentfixture.com/packages/fluentfixture-core
[fluentfixture-format]: https://docs.fluentfixture.com/packages/fluentfixture-format
