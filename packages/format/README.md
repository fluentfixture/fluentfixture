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
formatting and compiling functionalities with extensible transformation capabilities. Sample codes can be found in the [samples](https://github.com/fluentfixture/fluentfixture/tree/main/sample/format) folder.

```bash
> npm install @fluentfixture/format
```

## Usage

### Syntax

Formatting syntax consist of three parts:`"${path:fallback|pipe-1|pipe-n}"`
- the `path` is the descriptor of the target property. When the `path` is empty, the target is the whole source object.
- the `fallback` is the default value used when the target property is not defined.
- the `pipe-1` and `pipe-n` are transformation functions.

| Syntax                                    | Target      | Fallback    | Transformations      |
|-------------------------------------------|-------------|-------------|----------------------|
| ${name:no-name&#124;trim&#124;upper-case} | source.name | no-name     | `trim`, `upper-case` |
| ${name:no-name}                           | source.name | no-name     |                      |
| ${name&#124;trim&#124;upper-case}         | source.name |             | `trim`, `upper-case` |
| ${name}                                   | source.name |             |                      |
| ${:n/a&#124;upper-case}                   | source      | n/a         | `upper-case`         |
| ${&#124;upper-case}                       | source      |             | `upper-case`         |

### Simple Formatting

Format library provides two global methods available with default configurations: `format` and `compile`. The `format` method produces 
the formatted string immediately. Differently, `compile` methods returns a pre-compiled template for reusing.

> Using the `compile` method is extremely fast according to the `format` method for repeating usages.

```typescript
import { format, compile } from '@fluentfixture/format';

const source = {
  name: 'john',
  surname: 'doe',
  balance: {
    amount: 120,
    currency: 'USD'
  },
  memberships: ['regular user', 'pro user']
};

format('${surname}, ${name} <${balance.amount} ${balance.currency}>', source);
// returns "doe, john <120 USD>"

format('${name|capital-case}.${surname|upper-case} > MEMBERSHIP=${memberships.0|dot-case}', source);
// returns "John.DOE > MEMBERSHIP=regular.user"

const template = compile('${surname}, ${name} <${balance.amount} ${balance.currency}>');

template(source);
// returns "doe, john <120 USD>"
```

### Custom Transformations

Format library supports custom transformation functions. When customization is needed, a new instance can be used.

```typescript
import { Formatter, Pipes } from '@fluentfixture/format';

const reverse = (str: string): string =>
  [...str].reverse().join('');

const amount = (value: any): string => 
  `[${value.amount} ${value.currency}]`;

const pipes = Pipes.withDefaults()
  .register('reverse', reverse)
  .register('amount', amount);

const formatter = Formatter.create(pipes);

formatter.format('TEXT=${text:unknown|reverse|upper-case}', { text: 'lorem' });
// returns "TEXT=MEROL"

formatter.format('TEXT=${text:unknown|reverse|upper-case}', { });
// returns "TEXT=NWONKNU"

formatter.format('AMOUNT=${balance|amount}', { balance: { amount: 12, currency: 'TRY' }});
// returns "AMOUNT=[12 TRY]"
```

### Serializers

By default, when formatting is completed, the result will be converted to a string using the standard conversions in javascript. In addition, the format library supports custom conversions functions (serializers) for each data type.

```typescript
import { Formatter } from '@fluentfixture/format';

const formatter = Formatter.empty({
  serializers: {
    boolean: (value: boolean) => value ? 'YES' : 'NO',
    array: (value: Array<any>) => value.join('&')
  }
});

const source = {
  name: 'john',
  surname: 'doe',
  admin: true,
  memberships: ['regular', 'pro']
};

formatter.format('ADMIN=${admin:false} AND MEMBERSHIPS=${memberships}', source);
// prints "ADMIN=YES AND MEMBERSHIPS=regular&pro"

formatter.format('ADMIN=${is-admin:false} > MEMBERSHIPS=${memberships}', source);
// prints "ADMIN=FALSE AND MEMBERSHIPS=regular&pro"
```

> Serializer methods invoke at the end of all transformations. The second example above will be 
> `ADMIN=FALSE AND MEMBERSHIPS=regular&pro` because the key `is-admin` is missing and the fallback is `false`, 
> but all fallbacks are strings. So the boolean serializer don't work.

### Default Transformations

| Name            | Type   | Description            | Docs                       |
|-----------------|--------|------------------------|----------------------------|
| `trim`          | string | Trim string            | [mdn][mdn-string]          |
| `trim-end`      | string | Trim string from end   | [mdn][mdn-string]          |
| `trim-start`    | string | Trim string from start | [mdn][mdn-string]          |
| `lower-case`    | string | To lower case          | [mdn][mdn-string]          |
| `upper-case`    | string | To upper case          | [mdn][mdn-string]          |
| `constant-case` | string | To constant case       | [change-case][change-case] |
| `dot-case`      | string | To dot case            | [change-case][change-case] |
| `header-case`   | string | To header case         | [change-case][change-case] |
| `param-case`    | string | To param case          | [change-case][change-case] |
| `pascal-case`   | string | To pascal case         | [change-case][change-case] |
| `path-case`     | string | To path case           | [change-case][change-case] |
| `snake-case`    | string | To snake case          | [change-case][change-case] |
| `capital-case`  | string | To capital case        | [change-case][change-case] |
| `camel-case`    | string | To camel case          | [change-case][change-case] |

### Other Options

| Options              | Description                                                                          |
|----------------------|--------------------------------------------------------------------------------------|
| options.ignoreErrors | When set to `false`, all transformation errors will be ignored. (default is `false`) |

## Follow Us!

- Project [@fluentfixture](https://github.com/fluentfixture)

## License

@fluentfixture is [MIT](https://github.com/fluentfixture/fluentfixture/blob/main/LICENSE) licensed.

[change-case]: https://www.npmjs.com/package/change-case
[mdn-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
