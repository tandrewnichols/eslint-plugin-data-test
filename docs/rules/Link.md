# Requires the `data-test` attribute on Link elements from React Router or Next.

Note that this test requires the Link to have a `to` attribute (React Router) or `href` attribute (Next).

## Rule Details

Examples of **incorrect** code for this rule:

```js
<Link to="/somewhere" />
<Link href="/somewhere" />
```

Examples of **correct** code for this rule:

```js
<Link to="/somewhere" data-test="name-selector" />
<Link href="/somewhere" data-test="name-selector" />
```
