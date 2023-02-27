<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible string format library that is a part of the <a href="https://github.com/fluentfixture">@fluentfixture</a> project.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fluentfixture/format" target="_blank"><img src="https://img.shields.io/npm/v/@fluentfixture/format.svg" alt="NPM Version"/></a>
  <a href="https://www.npmjs.com/package/@fluentfixture/format" target="_blank"><img src="https://img.shields.io/npm/l/@fluentfixture/format.svg" alt="Package License" /></a>
  <a href="https://dl.circleci.com/status-badge/redirect/gh/fluentfixture/fluentfixture/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/gh/fluentfixture/fluentfixture/tree/main.svg?style=svg" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/fluentfixture/fluentfixture?branch=main" target="_blank"><img src="https://coveralls.io/repos/github/fluentfixture/fluentfixture/badge.svg?branch=main#9" alt="Coverage" /></a>
  <a href="https://snyk.io/test/github/fluentfixture/fluentfixture" target="_blank"><img src="https://snyk.io/test/github/fluentfixture/fluentfixture/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://www.codefactor.io/repository/github/fluentfixture/fluentfixture" target="_blank"><img src="https://www.codefactor.io/repository/github/fluentfixture/fluentfixture/badge" alt="CodeFactor"/></a>
  <a href="https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/01-format" target="_blank"><img src="https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox" alt="Open in CodeSandbox"/></a>
  <a href="https://docs.fluentfixture.com" target="_blank"><img src="https://img.shields.io/badge/Open%20in-GitBook-yellow?style=flat-square&logo=gitbook" alt="Open in CodeSandbox"/></a>
</p>

## Introduction

A flexible string format library that is a part of the [@fluentfixture](https://github.com/fluentfixture) project. Provides
formatting and compiling functionalities with extensible transformation capabilities.

## Installation

```bash
$ npm install @fluentfixture/format
```

## Usage

The @fluentfixture/format utilities can be used with global `format` and `compile` methods or a new `Formatter` instance. The following code snippet shows an example usage of global `compile` method.

> The more example can be found on [How To Use](https://docs.fluentfixture.com/packages/fluentfixture-format/how-to-use) section.

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
