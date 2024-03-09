# Detects possibly redundant micro-utilities, preferring local/inline functionality instead

This rule detects imports of "micro utilities" - very small packages which
provide utilities you could replace with native functionality or your own
code.

## Rule Details

This rule detects possibly redundant micro-utilities.

The following patterns are considered warnings:

```ts
const isNaN = require('is-nan');
isNaN(v);
```

The following patterns are not warnings:

```ts
Number.isNaN(v);
```

## When Not To Use It

If you prefer the cost of pulling in many utility dependencies over
the cost of writing the equivalent snippet yourself, it may be worth disabling
this rule.
