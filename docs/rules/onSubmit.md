# Requires the `data-test` attribute on elements with the `onSubmit` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Foo onSubmit={ this.handleSubmit } />
```

Examples of **correct** code for this rule:

```js
<Foo onSubmit={ this.handleSubmit } dataTest="name-selector" />
```

