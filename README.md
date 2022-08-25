<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible tool for generating customizable mock data with fluent interface.</p>

[![CircleCI](https://circleci.com/gh/fluentfixture/fluentfixture/tree/main.svg?style=svg)](https://circleci.com/gh/fluentfixture/fluentfixture/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/fluentfixture/fluentfixture/badge.svg?branch=main)](https://coveralls.io/github/fluentfixture/fluentfixture?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/fluentfixture/fluentfixture/badge.svg)](https://snyk.io/test/github/fluentfixture/fluentfixture)
[![CodeFactor](https://www.codefactor.io/repository/github/fluentfixture/fluentfixture/badge)](https://www.codefactor.io/repository/github/fluentfixture/fluentfixture)

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

| Package                                       | Description                | Status                                                                                                                   |
|-----------------------------------------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------|
| [@fluentfixture/core][fluentfixture-core]     | Core modules and packages  | [![npm version](https://badge.fury.io/js/@fluentfixture%2Fcore.svg)](https://badge.fury.io/js/@fluentfixture%2Fcore)     |
| [@fluentfixture/format][fluentfixture-format] | String format library      | [![npm version](https://badge.fury.io/js/@fluentfixture%2Fformat.svg)](https://badge.fury.io/js/@fluentfixture%2Fformat) |

## Follow Us!

- Project [@fluentfixture](https://github.com/fluentfixture)

## License

@fluentfixture is [MIT](https://github.com/fluentfixture/fluentfixture/blob/main/LICENSE) licensed.

[fluentfixture]: https://github.com/fluentfixture
[fluentfixture-core]: https://github.com/fluentfixture/fluentfixture/tree/main/packages/core
[fluentfixture-format]: https://github.com/fluentfixture/fluentfixture/tree/main/packages/format
