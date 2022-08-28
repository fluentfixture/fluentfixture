<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible string format library that is a part of <a href="https://github.com/fluentfixture">@fluentfixture</a> project.</p>

[![CircleCI](https://circleci.com/gh/fluentfixture/fluentfixture/tree/main.svg?style=svg)](https://circleci.com/gh/fluentfixture/fluentfixture/tree/main)
[![npm version](https://badge.fury.io/js/@fluentfixture%2Fformat.svg)](https://badge.fury.io/js/@fluentfixture%2Fformat)
[![Coverage Status](https://coveralls.io/repos/github/fluentfixture/fluentfixture/badge.svg?branch=main)](https://coveralls.io/github/fluentfixture/fluentfixture?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/fluentfixture/fluentfixture/badge.svg)](https://snyk.io/test/github/fluentfixture/fluentfixture)
[![CodeFactor](https://www.codefactor.io/repository/github/fluentfixture/fluentfixture/badge)](https://www.codefactor.io/repository/github/fluentfixture/fluentfixture)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@fluentfixture/format)](https://bundlephobia.com/package/@fluentfixture/format)

## @fluentfixture/format

A flexible string format library that is a part of [@fluentfixture](https://github.com/fluentfixture) project. Provides
formatting and compiling functionalities with extensible transformation capabilities. Sample codes can be found in
the [samples](https://github.com/fluentfixture/fluentfixture/tree/main/sample/format) folder.

```bash
> npm install @fluentfixture/format
```

## Usage

### Syntax

Formatting syntax consist of two parts:`"${path:pipe-1|pipe-n}"`

- the `path` is the descriptor of the target property. When the `path` is empty, the target is the whole source object.
- the `pipe-1` and `pipe-n` are transformation functions.

| Syntax                          | Target    | Transformations        |
|---------------------------------|-----------|------------------------|
| `${}`                           | obj       |                        |
| `${key}`                        | obj.key   |                        |
| `${key:trim()\|padLeft(5)}`     | obj.key   | `trim()`, `padLeft(5)` |
| `${:trim()\|split(",")}`        | obj       | `trim()`, `split(",")` |

### Simple Formatting

`@fluentfixture/format` provides two global methods and one default instance with default configurations: `format`
, `compile`, and the `formatter`. The `format` method produces
the formatted string immediately. Differently, `compile` methods returns a pre-compiled template for reusing.

> Using the `compile` method is extremely fast according to the `format` method for repeating usages.

```typescript
import { format, compile, formatter } from '@fluentfixture/format';

const source = {
  name: 'john',
  surname: 'doe',
  balance: {
    amount: 120,
    currency: 'USD'
  },
  memberships: ['regular user', 'pro user']
};

format('${name:capitalCase()}.${surname:upperCase()} > MEMBERSHIP=${memberships.0:dotCase()}', source);
// returns "John.DOE > MEMBERSHIP=regular.user"

const template = compile('${name:capitalCase()}.${surname:upperCase()} > MEMBERSHIP=${memberships.0:dotCase()}');

template(source);
// returns "John.DOE > MEMBERSHIP=regular.user"
```

### Custom Transformations

`@fluentfixture/format` supports custom transformation functions. When customization is needed, a new instance can be
used.

```typescript
import { Formatter, Pipes } from '@fluentfixture/format';

const source = {
  balance: {
    amount: 12, 
    currency: 'TRY'
  }
};

const pipes = Pipes.withDefaults()
  .register('inc', (val: number, arg: number) => val + arg)
  .register('amount', (val: any) => `[${value.amount} ${value.currency}]`);

const formatter = Formatter.create(pipes);

formatter.format('BALANCE=${balance:amount()}', source);
// returns "BALANCE=12 TRY"

formatter.format('NEXT AMOUNT=${balance.amount:inc(10)}', source);
// returns "NEXT AMOUNT="22
```

### Default Transformations

| Name                  | Type   | Docs                       | Name             | Type   | Docs                       |
|-----------------------|--------|----------------------------|------------------|--------|----------------------------|
| `lowerCase()`         | String | [mdn][mdn-string]          | `constantCase()` | String | [change-case][change-case] |
| `upperCase()`         | String | [mdn][mdn-string]          | `dotCase()`      | String | [change-case][change-case] |
| `trim()`              | String | [mdn][mdn-string]          | `headerCase()`   | String | [change-case][change-case] |
| `trimStart()`         | String | [mdn][mdn-string]          | `paramCase()`    | String | [change-case][change-case] |
| `trimEnd()`           | String | [mdn][mdn-string]          | `pascalCase()`   | String | [change-case][change-case] |
| `padStart(LEN, CH)`   | String | [mdn][mdn-string]          | `pathCase()`     | String | [change-case][change-case] |
| `padEnd(LEN, CH)`     | String | [mdn][mdn-string]          | `snakeCase()`    | String | [change-case][change-case] |
| `split(CH)`           | String | [mdn][mdn-string]          | `capitalCase()`  | String | [change-case][change-case] |
| `camelCase()`         | String | [change-case][change-case] | `date(FORMAT)`   | Date   | [format][day-js]           |
| `default(VAL)`        | *      | Returns the default value  | `reverse()`      | Array  | [mdn][mdn-array]           |
| `join(CH)`            | Array  | [mdn][mdn-array]           | `sort()`         | Array  | [mdn][mdn-array]           |

### Options

| Options              | Description                                                                                                |
|----------------------|------------------------------------------------------------------------------------------------------------|
| options.ignoreErrors | When set to `true`, all transformation errors (not the syntax errors) will be ignored. (default is `true`) |

## Follow Us!

- Project [@fluentfixture](https://github.com/fluentfixture)

## License

@fluentfixture is [MIT](https://github.com/fluentfixture/fluentfixture/blob/main/LICENSE) licensed.

[change-case]: https://www.npmjs.com/package/change-case
[day-js]: https://day.js.org/docs/en/display/format
[mdn-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[mdn-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
