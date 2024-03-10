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
  configs.recommended,

  // or if you want to specify `files`, or other options
  {
    ...configs.recommended,
    files: ['test/**/*.js']
  }
];
```

## Rules

- [`depend/redundant-polyfills`](./docs/rules/redundant-polyfills.md)
- [`depend/avoid-micro-utilities`](./docs/rules/avoid-micro-utilities.md)
- [`depend/prefer-light-dependencies`](./docs/rules/prefer-light-dependencies.md)

## License

MIT
