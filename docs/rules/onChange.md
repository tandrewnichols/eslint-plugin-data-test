# Requires the `data-test` attribute on elements with the `onChange` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Foo onChange={ this.handleNameChange } />
```

Examples of **correct** code for this rule:

```js
<Foo onChange={ this.handleNameChange } dataTest="name-input" />
```

