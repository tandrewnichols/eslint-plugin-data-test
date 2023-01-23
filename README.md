# eslint-plugin-data-test

![Build Status](https://github.com/tandrewnichols/eslint-plugin-data-test/actions/workflows/ci.yml/badge.svg)

Enforces that a `data-test` attribute is present on interactive DOM elements to help with UI testing.

- ❌ `<button>Download</button>`
- ✅ `<button data-test="download-button">Download</button>`

## Installation

You'll first need to install [ESLint](http://eslint.org), which requires [Node.js](https://nodejs.org). Note that `eslint-plugin-data-test` requires a version of node that supports object spread syntax (>= 5.12.0, but hopefully, no one is using v5 at this point).

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-data-test`:

```
$ npm install eslint-plugin-data-test --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-data-test` globally.

## Usage

Add `data-test` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["data-test"]
}
```

If you want to use all the recommended default rules, you can simply add this line to the `extends` section of your `.eslintrc` configuration:

```json
{
  "extends": ["plugin:data-test/recommended"]
}
```

By default, this will run all [Supported Rules](#supported-rules) and emit eslint errors.

Another option: you can also selectively enable and disable individual rules in the `rules` section of your `.eslintrc` configuration. For instance, if you only want to enable the `data-test/button` rule, skip the `extends` addition above and simply add the following to the `rules` section of your `.eslintrc` configuration:

```json
{
  "rules": {
    "data-test/button": ["warn", "always"]
  }
}
```

If you like most of the recommended rules by adding the `extends` option above, but find one in particular to be bothersome, you can simply disable it:

```json
{
  "rules": {
    "data-test/anchor": "off"
  }
}
```

Note: see [Supported Rules](#supported-rules) below for a full list.

## Custom rule options

All tests can be customized individually by passing an object with one or more of the following properties.

### domAttribute

The default test attribute expected is `data-test` for raw dom nodes, but you can override it with whatever you like. Here is how you would use `data-test-id` instead:

```json
{
  "rules": {
    "data-test/onChange": [
      "error",
      "always",
      { "domAttribute": "data-test-id" }
    ]
  }
}
```

### componentAttribute

Since `data-test` is not a valid javascript variable name, handling this value at the component level can be a nuisance, so you can speficy a _separate_ attribute name for components that pass a `data-test` down to an underlying dom node. Note that this is mutually exclusive with `domAttribute` since you can't render a node that is both a dom node and a component at the same time, nor would you typically apply both attributes to the same node. The default value for this is `dataTest`, but as with `domAttribute`, you can customize it to whatever you want. For example:

```json
{
  "rules": {
    "data-test/onChange": [
      "error",
      "always",
      { "componentAttribute": "dataTestId" }
    ]
  }
}
```

Note that this property can only be set on the handler rules (onClick, onChange, etc.) and not on the element rules (button, anchor, etc.) since those rules only apply to dom elements already.

### readonly

By default all inputs with the `readonly` attribute are ignored, e.g. `<input readonly />`. If you don't want to ignore this attribute, set `readonly` to `true`:

```json
{
  "rules": {
    "data-test/input": ["error", "always", { "readonly": true }]
  }
}
```

This property is only valid on inputs (since `readonly` is only valid on inputs).

## Supported Rules

- [data-test/anchor](./docs/rules/anchor)
- [data-test/button](./docs/rules/button)
- [data-test/input](./docs/rules/input)
- [data-test/onChange](./docs/rules/onChange)
- [data-test/onClick](./docs/rules/onClick)
- [data-test/onKeyDown](./docs/rules/onKeyDown)
- [data-test/onKeyUp](./docs/rules/onKeyUp)
- [data-test/onSubmit](./docs/rules/onSubmit)
- [data-test/Link](./docs/rules/Link)

## Further Reading

If you don't want these test attributes added in production, you can use something like [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

Why `data` attributes and not `id` or `class`? Check out some of the following:

- [Decoupling CSS Selectors From Your Tests](https://mixandgo.com/learn/decoupling-css-selectors-from-your-tests)
- [Test your DOM with Data Attributes](https://medium.com/@colecodes/test-your-dom-with-data-attributes-44fccc43ed4b)
- [Something Better than IDs for Identifying Elements in Selenium Tests](https://techblog.constantcontact.com/software-development/a-better-way-to-id-elements-in-selenium-tests/)
