# Bans a list of dependencies from being used

This rule bans dependencies based on a preset list or a user defined list.

## Options

### `presets`

You may choose a preset list of dependencies (or none). The following are
available:

- `microutilities` - micro utilities (e.g. one liners)
- `native` - redundant packages with native equivalents
  - Note that this preset will take into account `engines` in your
`package.json` if it is set. In that only native functionality available in your
defined `engines.node` version range will be considered (or all if it isn't
set)
- `preferred` - an opinionated list of packages with better maintained and
lighter alternatives
  - Note the list for this is sourced from
[`module-replacements`](https://github.com/es-tooling/module-replacements)

Example config:

```json
{
  "rules": {
    "depend/ban-dependencies": ["error", {
      "presets": ["native"]
    }]
  }
}
```

The **default** is `['native', 'microutilities', 'preferred']`.

### `modules`

You may specify your own list of packages which will be disallowed
in code.

For example:

```json
{
  "rules": {
    "depend/ban-dependencies": ["error", {
      "modules": ["im-a-banned-package"]
    }]
  }
}
```

### `allowed`

You may specify your own list of packages that will be allowed in code
even if they are in presets.

For example:

```json
{
  "rules": {
    "depend/ban-dependencies": ["error", {
      "allowed": ["is-nan"]
    }]
  }
}
```

## Rule Details

This rule bans certain dependencies from being used.

The following patterns are considered warnings:

```ts
// with `presets: ['native']`
const isNaN = require('is-nan');
isNaN(v);
```

The following patterns are not warnings:

```ts
// with `presets: ['native']`
Number.isNaN(v);

// with `presets: ['native'], allowed: ['is-nan']`
const isNaN = require('is-nan');
isNaN(v);
```

## When Not To Use It

If you prefer not to restrict which dependencies are used, this rule should
be disabled.
