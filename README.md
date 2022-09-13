<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible tool for generating customizable mock data with fluent interface.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fluentfixture/core" target="_blank"><img src="https://img.shields.io/npm/v/@fluentfixture/core.svg" alt="NPM Version"/></a>
  <a href="https://www.npmjs.com/package/@fluentfixture/core" target="_blank"><img src="https://img.shields.io/npm/l/@fluentfixture/core.svg" alt="Package License" /></a>
  <a href="https://dl.circleci.com/status-badge/redirect/gh/fluentfixture/fluentfixture/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/gh/fluentfixture/fluentfixture/tree/main.svg?style=svg" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/fluentfixture/fluentfixture?branch=main" target="_blank"><img src="https://coveralls.io/repos/github/fluentfixture/fluentfixture/badge.svg?branch=main#9" alt="Coverage" /></a>
  <a href="https://snyk.io/test/github/fluentfixture/fluentfixture" target="_blank"><img src="https://snyk.io/test/github/fluentfixture/fluentfixture/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://www.codefactor.io/repository/github/fluentfixture/fluentfixture" target="_blank"><img src="https://www.codefactor.io/repository/github/fluentfixture/fluentfixture/badge" alt="CodeFactor"/></a>
  <a href="https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/02-core" target="_blank"><img src="https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox" alt="Open in CodeSandbox"/></a>
</p>

## Introduction

The [@fluentfixture][fluentfixture] is a flexible tool for generating customizable mock data with a fluent interface.

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

| Package                                       | Version                                                                                                                   | Live Demo                                                                                       |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| [@fluentfixture/core][fluentfixture-core]     | [![npm version](https://badge.fury.io/js/@fluentfixture%2Fcore.svg)](https://badge.fury.io/js/@fluentfixture%2Fcore)      | [Link](https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/02-core)    |
| [@fluentfixture/format][fluentfixture-format] | [![npm version](https://badge.fury.io/js/@fluentfixture%2Fformat.svg)](https://badge.fury.io/js/@fluentfixture%2Fformat)  | [Link](https://codesandbox.io/s/github/fluentfixture/fluentfixture/tree/main/sample/01-format)  |

## Documentation

To check out the guide, visit [https://docs.fluentfixture.com/](https://docs.fluentfixture.com/)

## Follow Us!

- Project [@fluentfixture](https://github.com/fluentfixture)

## License

@fluentfixture is [MIT](https://github.com/fluentfixture/fluentfixture/blob/main/LICENSE) licensed.

[fluentfixture]: https://github.com/fluentfixture
[fluentfixture-core]: https://github.com/fluentfixture/fluentfixture/tree/main/packages/core
[fluentfixture-format]: https://github.com/fluentfixture/fluentfixture/tree/main/packages/format
