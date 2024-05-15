# eslint-plugin-depend

This is an ESLint plugin to help suggest alternatives to various dependencies.

Primarily, it will help detect dependency tree bloat and redundant
polyfills.

## Install

```sh
npm i -D eslint-plugin-depend
```

## Usage

Add to your `.eslintrc.json`:

```json
{
  "extends": [
    "plugin:depend/recommended"
  ]
}
```

Or if you're using (flat) config files, add to your `eslint.config.js`:

```ts
import {configs} from 'eslint-plugin-depend';

export default [
  configs['flat/recommended'],

  // or if you want to specify `files`, or other options
  {
    ...configs['flat/recommended'],
    files: ['test/**/*.js']
  }
];
```

### With `package.json`

Some rules (e.g. `ban-dependencies`) can be used against your `package.json`.

You can achieve this by using `jsonc-eslint-parser`.

For example, in your `.eslintrc.json`:

```json
{
  "overrides": [
    {
      "files": ["package.json"],
      "parser": "jsonc-eslint-parser",
      "plugins": ["depend"],
      "rules": {
        "depend/ban-dependencies": "error"
      }
    }
  ]
}
```

Read more at the
[`jsonc-eslint-parser` docs](https://github.com/ota-meshi/jsonc-eslint-parser).

## Rules

- [`depend/ban-dependencies`](./docs/rules/ban-dependencies.md)

## License

MIT
