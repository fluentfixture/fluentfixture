<p align="center">
  <a href="https://github.com/fluentfixture" target="blank"><img src="https://i.imgur.com/qLGGhTh.jpg" width="120" alt="Fluent Fixture Logo" /></a>
</p>

<p align="center">A flexible string format library that is a part of <a href="https://github.com/fluentfixture">@fluentfixture</a> project.</p>

[![CircleCI](https://circleci.com/gh/fluentfixture/fluentfixture/tree/main.svg?style=svg)](https://circleci.com/gh/fluentfixture/fluentfixture/tree/main)
[![npm version](https://badge.fury.io/js/@fluentfixture%2Fformat.svg)](https://badge.fury.io/js/@fluentfixture%2Fformat)
[![Coverage Status](https://coveralls.io/repos/github/fluentfixture/fluentfixture/badge.svg?branch=main)](https://coveralls.io/github/fluentfixture/fluentfixture?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/fluentfixture/fluentfixture/badge.svg)](https://snyk.io/test/github/fluentfixture/fluentfixture)
[![CodeFactor](https://www.codefactor.io/repository/github/fluentfixture/fluentfixture/badge)](https://www.codefactor.io/repository/github/fluentfixture/fluentfixture)

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
| `${key:trim()&#124;padLeft(5)}` | obj.key   | `trim()`, `padLeft(5)` |
| `${:trim()&#124;split(",")}`    | obj       | `trim()`, `split(",")` |

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

format('${name|capitalCase()}.${surname|upperCase()} > MEMBERSHIP=${memberships.0|dotCase()}', source);
// returns "John.DOE > MEMBERSHIP=regular.user"

const template = compile('${name|capitalCase()}.${surname|upperCase()} > MEMBERSHIP=${memberships.0|dotCase()}');

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

formatter.format('BALANCE=${balance|amount()}', source);
// returns "BALANCE=12 TRY"

formatter.format('NEXT AMOUNT=${balance.amount|inc(10)}', source);
// returns "NEXT AMOUNT="22
```

### Default Transformations

| Name            | Type   | Docs                       | Name             | Type     | Docs                       |
|-----------------|--------|----------------------------|------------------|----------|----------------------------|
| `lowerCase()`   | string | [mdn][mdn-string]          | `constantCase()` | string   | [change-case][change-case] |
| `upperCase()`   | string | [mdn][mdn-string]          | `dotCase()`      | string   | [change-case][change-case] |
| `trim()`        | string | [mdn][mdn-string]          | `headerCase()`   | string   | [change-case][change-case] |
| `trimStart()`   | string | [mdn][mdn-string]          | `paramCase()`    | string   | [change-case][change-case] |
| `trimEnd()`     | string | [mdn][mdn-string]          | `pascalCase()`   | string   | [change-case][change-case] |
| `padStart()`    | string | [mdn][mdn-string]          | `pathCase()`     | string   | [change-case][change-case] |
| `padEnd()`      | string | [mdn][mdn-string]          | `snakeCase()`    | string   | [change-case][change-case] |
| `split()`       | string | [mdn][mdn-string]          | `capitalCase()`  | string   | [change-case][change-case] |
| `camelCase()`   | string | [change-case][change-case] | `date(FORMAT)`   | date     | [format][day-js]           |
| `default(VAL)`  | any    | Returns the default value  | `reverse()`      | array    | [mdn][mdn-array]           |
| `join()`        | array  | [mdn][mdn-array]           | `sort()`         | array    | [mdn][mdn-array]           |

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
