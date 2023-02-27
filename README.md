<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible tool for generating customizable mock data with fluent interface 🚀</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fluentfixture/core" target="_blank"><img src="https://img.shields.io/npm/v/@fluentfixture/core.svg" alt="NPM Version"/></a>
  <a href="https://www.npmjs.com/package/@fluentfixture/core" target="_blank"><img src="https://img.shields.io/npm/l/@fluentfixture/core.svg" alt="Package License" /></a>
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

In software development, generating mock data is a crucial necessity. In most cases, the test data quality directly impacts the development quality and velocity.
But when it comes to generating conditional and complex mock data, things get a little more challenging. There are many dummy / mock / fixture data generators in the javascript ecosystem,
but most have an unclean interface and limited capabilities.

The [@fluentfixture][fluentfixture] aims to provide a fluent interface and an extensible architecture.
For this reason, the core of the package focuses on programmability, fluent interface, and extensibility.

> The [@fluentfixture][fluentfixture] does not provide predefined data like FakerJS for now. However, realistic data features will plan after the stable version of the core package, no-code support, and CLI.

## Packages

- [@fluentfixture/core](https://github.com/fluentfixture/fluentfixture/tree/main/packages/core)
- [@fluentfixture/format](https://github.com/fluentfixture/fluentfixture/tree/main/packages/format)

## Core (@fluentfixture/core)

[@fluentfixture/core][fluentfixture-core] provides core modules and components for generating mock data.

### Installation

```bash
$ npm install @fluentfixture/core
```

### Usage

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/02-core)
[![Open in GitHub](https://img.shields.io/badge/Open%20in-Github-green?style=flat-square&logo=github)](https://github.com/fluentfixture/fluentfixture/tree/main/sample/02-core)
[![Open in GitBook](https://img.shields.io/badge/Open%20in-GitBook-yellow?style=flat-square&logo=gitbook)](https://docs.fluentfixture.com/packages/fluentfixture-core)

```typescript
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
```

## Format (@fluentfixture/format)

[@fluentfixture/format][fluentfixture-format] provides formatting and compiling functionalities with extensible transformation capabilities.

### Installation

```bash
$ npm install @fluentfixture/format
```

### Usage

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/01-format)
[![Open in GitHub](https://img.shields.io/badge/Open%20in-Github-green?style=flat-square&logo=github)](https://github.com/fluentfixture/fluentfixture/tree/main/sample/01-format)
[![Open in GitBook](https://img.shields.io/badge/Open%20in-GitBook-yellow?style=flat-square&logo=gitbook)](https://docs.fluentfixture.com/packages/fluentfixture-format)

```typescript
import { format } from '@fluentfixture/format';

const source = {
  name: 'john',
  surname: 'doe',
  birthdate: new Date(1_617_258_460_000), // GMT: Thursday, 1 April 2021 06:27:40
};

// format() returns a formatted string immediately.
console.log(
  format('${surname:upperCase()}, ${name:capitalCase()} BIRTH_DATE=${birthdate:date("MM-DD-YYYY")}', source),
);

// compile() returns a pre-compiled template for reusing.
const template = compile('${name:capitalCase()}, ${age:default("N/A")} >> ${colors:join("+")}');

console.log(
  template.format({
    name: 'john',
    age: 32,
    colors: ['red', 'black']
  })
);
```

## Documentation

To check out the guide, visit [https://docs.fluentfixture.com/](https://docs.fluentfixture.com/)

## License

@fluentfixture is [MIT](https://github.com/fluentfixture/fluentfixture/blob/main/LICENSE) licensed.

[fluentfixture]: https://github.com/fluentfixture
[fluentfixture-core]: https://github.com/fluentfixture/fluentfixture/tree/main/packages/core
[fluentfixture-format]: https://github.com/fluentfixture/fluentfixture/tree/main/packages/format
