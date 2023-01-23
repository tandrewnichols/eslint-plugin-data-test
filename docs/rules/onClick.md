# Requires the `data-test` attribute on elements with the `onClick` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Foo onClick={ this.handleNameClick } />
```

Examples of **correct** code for this rule:

```js
<Foo onClick={ this.handleNameClick } dataTest="name-selector" />
```

