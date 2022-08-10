# pretty-mass

Print grams in different measurements and in a readable form: `1234567` -> `1.234 tonne`, `123456` -> `123.456 kg`.

## Install

```sh
npm install pretty-mass
```

## Usage

```js
import { prettyMetric } from 'pretty-mass';

prettyMetric(10000000); // 10 t

prettyMetric(123456); // 123.456 kg

prettyMetric(123); // 123 g

// `verbose` option
prettyMetric(123456, { verbose: true }); // 123.456 kilogram

// `maxFractionDigits` option
prettyMetric(1234567, { maxFractionDigits: 0 }); //1 t
prettyMetric(1234567, { maxFractionDigits: 5 }); //1.23456 t
prettyMetric(1234567.89, { maxFractionDigits: false }); // 1.23456789 t

// `targetUnit` option
prettyMetric(1000, { targetUnit: Units.T }); // 0.001 t

// `formatResult` option
prettyMetric(1234567890, { formatResult: true }); // 1,234.56789 t
prettyMetric(1234567890, { formatResult: false }); // 1234.56789 t

```

## API

### prettyMetric(grams, options?)

#### grams

Type: `number`

Number of grams to pretty print.

#### options

Type: `object`

##### verbose

Type: `boolean`\
Default: `false`

Use full-length units: `100 t` -> `100 tonne`

##### targetUnit

Type: `Unit`\
Default: `undefined`

Convert the amount of grams to a specific unit.\
Leave `undefined` to automatically convert to the lowest readable unit.

##### formatResult

Type: `boolean`\
Default: `true`

Format the result with commas to make larger numbers more readable: `10000000 t` -> `10,000,000 t`

##### maxFractionDigits

Type: `number` or `false`\
Default: `3`

Set the maximal number of digits to be displayed after the decimal point.\
Set to `false` to unlimit it.

## Related

- [pretty-ms](https://github.com/sindresorhus/pretty-ms) - A very cool package that converts milliseconds to a human readable string, which inspired this package