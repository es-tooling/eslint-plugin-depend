# Detects possibly redundant polyfills of natively available functionality

This rule detects imports of dependencies which provide functionality now
available natively.

If your package has an `engines` constraint for `node`, it will be taken
into account (i.e. polyfills of functionality your version doesn't yet have
will be allowed).

## Rule Details

This rule detects possibly redundant polyfills.

The following patterns are considered warnings:

```ts
// With no `engines` or `engines.node` is `>=7.0.0`
const entries = require('object.entries');
entries({foo: 'bar'});
```

The following patterns are not warnings:

```ts
// With no `engines` or `engines.node` is `>=7.0.0`
Object.entries({foo: 'bar'});
```

## When Not To Use It

If you need to support much older JS runtimes (node, browsers, etc), this
rule may not be of much use as the polyfills are probably still useful there.
