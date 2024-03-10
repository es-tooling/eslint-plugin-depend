# Prefers lighter alternatives over certain dependencies

This rule prefers lighter alternatives over possibly problematic dependencies.

For example, dependencies known to be bloated, no longer maintained or
have security issues may be detected by this rule.

Note this is an _opinionated_ rule, in that the dependencies detected are
driven by those in the
[module-replacements](https://github.com/es-tooling/module-replacements)
project.

## Rule Details

This rule detects possibly problematic dependencies.

The following patterns are considered warnings:

```ts
const runAll = require('npm-run-all');
```

The following patterns are not warnings:

```ts
const runAll = require('npm-run-all2');
```

## When Not To Use It

If you disagree with the opinionated list of dependencies this rule detects,
you should not use this rule.
