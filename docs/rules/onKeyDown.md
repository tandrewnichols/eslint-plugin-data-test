# Requires the `data-test` attribute on elements with the `onKeyDown` attribute.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Foo onKeyDown={ this.handleKeyDown } />
```

Examples of **correct** code for this rule:

```js
<Foo onKeyDown={ this.handleKeyDown } dataTest="name-selector" />
```

